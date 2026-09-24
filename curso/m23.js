/* Módulo 23: Consumir APIs. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 23, fase: 5, titulo: "Consumir APIs",
  objetivo: "Falar com serviços externos e testar esse código sem depender deles.",
  licoes: [
      {
        id: "23.1", titulo: "HTTP, httpx e o que fazer quando corre mal", min: 20, estado: "pronta",
        meta: "No fim: consomes uma API paginada com autenticação e tratamento de falhas.",
        blocos: [
          ["p", "Uma API é um servidor que responde a pedidos. Tu envias um método (`GET`, `POST`), um caminho e cabeçalhos. Ele responde com um código de estado e normalmente JSON. Todo o resto é detalhe."],
          ["p", "Os códigos que precisas de reconhecer sem pensar: 200 correu bem, 201 criado, 400 o teu pedido está mal formado, 401 não te autenticaste, 403 autenticaste-te mas não podes, 404 não existe, 429 excedeste o limite de pedidos, 500 o problema é do lado deles."],
          ["code", String.raw`import httpx

resposta = httpx.get("https://api.exemplo.pt/v1/alunos", timeout=10)
resposta.raise_for_status()
dados = resposta.json()
print(len(dados["resultados"]))`],
          ["p", "Três coisas nesse bloco que separam código de trabalho de código de tutorial: o `timeout` (sem ele o teu programa pode ficar pendurado para sempre), o `raise_for_status()` (sem ele um 404 passa despercebido e rebenta 20 linhas à frente) e não haver segredos escritos no código."],
          ["h", "Autenticação e segredos"],
          ["code", String.raw`import os
import httpx

chave = os.environ["API_KEY"]  # rebenta já se faltar, e é isso que queremos
cabecalhos = {"Authorization": f"Bearer {chave}"}

with httpx.Client(headers=cabecalhos, timeout=10) as cliente:
    r = cliente.get("https://api.exemplo.pt/v1/alunos")`],
          ["aviso", "Uma chave de API dentro de um commit é uma chave comprometida, mesmo que apagues no commit seguinte. Fica no histórico. Usa variáveis de ambiente e um `.env` que está no `.gitignore`. Recrutadores olham para isto."],
          ["h", "Paginação"],
          ["code", String.raw`def todos_os_alunos(cliente):
    pagina = 1
    while True:
        r = cliente.get("/v1/alunos", params={"page": pagina})
        r.raise_for_status()
        corpo = r.json()
        if not corpo["resultados"]:
            return
        yield from corpo["resultados"]
        pagina += 1`],
          ["p", "Repara no `yield`: quem chama esta função recebe alunos um a um e nunca tem a coleção inteira em memória. É o módulo 15 a pagar-se a si próprio."],
          ["obra", "Numa equipa vão pedir-te para tentar de novo quando a API devolve 429 ou 500, com espera crescente entre tentativas. Chama-se retry com backoff exponencial. Sabe o nome, mesmo antes de saber implementar."]
        ],
        quiz: [
          { p: "O teu script corre bem no teu portátil e falha no servidor com KeyError: 'API_KEY'. O que aconteceu?", o: ["O código está errado","A variável de ambiente não está definida nesse servidor","A API mudou"], c: 1,
            e: "Configuração não é código. A parte mais comum de um primeiro dia num emprego é descobrir onde é que a equipa guarda estas variáveis." }
        ],
        exercicio: {
          ficheiro: "utilizadores_api.py",
          enunciado: "Escreve `nomes_ativos(utilizadores)`, que recebe uma lista de dicionários como vem de uma API e devolve os nomes dos que têm `ativo` verdadeiro, por ordem alfabética. Alguns registos não têm a chave `nome` ou a chave `ativo`: ignora-os sem rebentar. Depois, no teu computador, instala o `httpx` no ambiente e experimenta os exemplos da aula contra uma API pública.",
          inicio: String.raw`def nomes_ativos(utilizadores):
    pass
`,
          testes: String.raw`from utilizadores_api import nomes_ativos

DADOS = [
    {"nome": "Rui", "ativo": True},
    {"nome": "Ana", "ativo": False},
    {"ativo": True},
    {"nome": "Bea", "ativo": True},
    {"nome": "Zé"},
]


def test_filtra_e_ordena():
    assert nomes_ativos(DADOS) == ["Bea", "Rui"]


def test_lista_vazia():
    assert nomes_ativos([]) == []
`
        }
      },
      {
        id: "23.2", titulo: "Dublês de teste para chamadas externas", min: 14, estado: "pronta",
        meta: "No fim: testas código que fala com a rede, sem rede, em milissegundos.",
        blocos: [
          ["p", "Um teste que chama uma API a sério é lento, falha quando a internet falha e devolve dados diferentes amanhã. Um dublê é um objeto que finge ser essa dependência e responde o que tu mandares."],
          ["h", "O mais simples: uma classe falsa"],
          ["py", String.raw`class RespostaFalsa:
    def __init__(self, dados, estado=200):
        self.dados = dados
        self.status_code = estado

    def raise_for_status(self):
        if self.status_code >= 400:
            raise RuntimeError(f"HTTP {self.status_code}")

    def json(self):
        return self.dados

class ClienteFalso:
    def __init__(self, resposta):
        self.resposta = resposta
        self.pedidos = []

    def get(self, caminho):
        self.pedidos.append(caminho)
        return self.resposta

def nomes(cliente):
    r = cliente.get("/utilizadores")
    r.raise_for_status()
    return [u["nome"] for u in r.json()["resultados"]]

falso = ClienteFalso(RespostaFalsa({"resultados": [{"nome": "Ana"}]}))
print(nomes(falso))
print(falso.pedidos)`],
          ["p", "Repara em duas coisas. A função recebe o cliente como argumento, que é a injeção de dependências da aula 14.5, e o dublê guarda o que lhe pediram, para poderes verificar o pedido além do resultado."],
          ["h", "unittest.mock, quando não te apetece escrever a classe"],
          ["py", String.raw`from unittest.mock import Mock

def nomes(cliente):
    r = cliente.get("/utilizadores")
    r.raise_for_status()
    return [u["nome"] for u in r.json()["resultados"]]

resposta = Mock()
resposta.json.return_value = {"resultados": [{"nome": "Ana"}, {"nome": "Rui"}]}
cliente = Mock()
cliente.get.return_value = resposta

print(nomes(cliente))
cliente.get.assert_called_once_with("/utilizadores")
print(resposta.raise_for_status.called)`],
          ["p", "Um `Mock` aceita qualquer atributo e qualquer chamada, e regista tudo. Isso é conveniente e é também o perigo: um erro de escrita no nome do método não rebenta, devolve outro `Mock`. Por isso existe `autospec`, que copia a assinatura do objeto real."],
          ["h", "Simular falhas, que é o que interessa"],
          ["py", String.raw`from unittest.mock import Mock

def nomes_seguros(cliente):
    try:
        r = cliente.get("/utilizadores")
        r.raise_for_status()
    except RuntimeError:
        return []
    return [u["nome"] for u in r.json()["resultados"]]

resposta = Mock()
resposta.raise_for_status.side_effect = RuntimeError("HTTP 500")
cliente = Mock()
cliente.get.return_value = resposta

print(nomes_seguros(cliente))`],
          ["p", "`side_effect` faz o dublê levantar uma exceção. É assim que testas o caminho do 500, do tempo esgotado e do JSON inválido, que na vida real acontecem e que quase ninguém testa."],
          ["obra", "Em entrevista, 'como testarias isto se depende de uma API externa' é pergunta frequente. A resposta completa tem três partes: injetar a dependência, substituí-la por um dublê no teste, e ter um teste de integração separado, que corre poucas vezes, contra a API a sério."],
          ["aviso", "Não testes o dublê. Um teste que só verifica que o mock foi chamado, sem verificar o resultado, passa sempre e não prova nada. Verifica o que a tua função devolve e, se for relevante, também o pedido que fez."],
          ["h", "Onde pôr a fronteira"],
          ["p", "Isola no ponto mais estreito: uma função que faz o pedido e devolve dados, e outra que trata os dados. A segunda não precisa de dublê nenhum, testa-se com dicionários à mão. Bom desenho reduz a quantidade de mocks necessários, e um teste cheio de mocks é um sinal de que o desenho pode melhorar."]
        ],
        quiz: [
          { p: "O teu teste com `Mock` passa, mas em produção rebenta com AttributeError num método que não existe. Porquê?", o: ["O mock estava mal configurado","Um Mock aceita qualquer atributo, mesmo os que o objeto real não tem","A biblioteca mudou"], c: 1,
            e: "Um `Mock` diz sim a tudo. Usa `create_autospec` ou `autospec=True` para o dublê ter a mesma superfície do objeto real, e o erro de escrita aparece no teste." }
        ],
        exercicio: {
          ficheiro: "cliente_api.py",
          enunciado: "Escreve `nomes_de_utilizadores(cliente)`, que chama `cliente.get(\"/utilizadores\")`, valida a resposta com `raise_for_status()` e devolve a lista de nomes que vem em `resposta.json()[\"resultados\"]`. Os erros da resposta propagam-se. Os testes usam `Mock` no lugar do cliente real.",
          inicio: String.raw`def nomes_de_utilizadores(cliente):
    pass
`,
          testes: String.raw`from unittest.mock import Mock

import pytest

from cliente_api import nomes_de_utilizadores


@pytest.fixture
def cliente():
    resposta = Mock()
    resposta.json.return_value = {"resultados": [{"nome": "Ana"}, {"nome": "Rui"}]}
    falso = Mock()
    falso.get.return_value = resposta
    return falso


def test_devolve_os_nomes(cliente):
    assert nomes_de_utilizadores(cliente) == ["Ana", "Rui"]


def test_pede_o_caminho_certo(cliente):
    nomes_de_utilizadores(cliente)
    cliente.get.assert_called_once_with("/utilizadores")


def test_valida_o_estado_da_resposta(cliente):
    nomes_de_utilizadores(cliente)
    cliente.get.return_value.raise_for_status.assert_called_once()


def test_erro_da_resposta_propaga_se():
    falso = Mock()
    falso.get.return_value.raise_for_status.side_effect = RuntimeError("HTTP 500")
    with pytest.raises(RuntimeError):
        nomes_de_utilizadores(falso)
`
        }
      }
  ]
});
