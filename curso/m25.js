/* Módulo 25: Construir uma API com FastAPI. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 25, fase: 5, titulo: "Construir uma API com FastAPI",
  objetivo: "Do primeiro endpoint a um CRUD testado, com as camadas separadas.",
  licoes: [
      {
        id: "25.1", titulo: "Primeiro endpoint e validação com Pydantic", min: 20, estado: "pronta",
        meta: "No fim: percebes o que uma rota faz, e escreves a validação que separa um 422 de um 500.",
        blocos: [
          ["p", "Uma API é uma função com um endereço. O FastAPI trata do resto: descodifica o pedido, valida os dados, chama a tua função e converte o resultado em JSON. O teu trabalho continua a ser Python normal."],
          ["code", String.raw`pip install "fastapi[standard]"
fastapi dev main.py`],
          ["code", String.raw`# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/saude")
def saude():
    return {"estado": "ok"}

@app.get("/produtos/{produto_id}")
def obter_produto(produto_id: int):
    return {"id": produto_id, "nome": "teclado"}`],
          ["p", "Repara na anotação `produto_id: int`. Não é decoração: é o que faz o FastAPI converter o texto do URL para inteiro e responder 422 automaticamente se alguém pedir `/produtos/abc`. As anotações do aula 8.4 passaram a ter efeito em execução."],
          ["h", "Pydantic: o contrato dos dados"],
          ["code", String.raw`from pydantic import BaseModel, Field

class ProdutoNovo(BaseModel):
    nome: str = Field(min_length=1, max_length=80)
    preco: float = Field(gt=0)
    quantidade: int = Field(default=1, ge=0)

@app.post("/produtos", status_code=201)
def criar_produto(produto: ProdutoNovo):
    return {"id": 1, **produto.model_dump()}`],
          ["p", "Uma `BaseModel` parece-se com a `dataclass` do aula 14.3, com uma diferença decisiva: valida. Se o corpo do pedido trouxer `preco` a zero ou `nome` vazio, o cliente recebe 422 com a lista exata dos campos errados, e a tua função nem chega a correr."],
          ["obra", "Esta é a fronteira de que falámos no aula 10.3: dados de fora entram por um sítio, são validados uma vez, e a partir daí o resto do código confia. Sem essa fronteira, cada função passa a ter de se defender, e nenhuma o faz bem."],
          ["h", "Os códigos de resposta que tens de acertar"],
          ["lista", [
            "200 para uma leitura com sucesso, 201 para uma criação.",
            "400 para um pedido mal formado, 422 quando a validação falhou.",
            "401 sem autenticação, 403 autenticado mas sem permissão.",
            "404 quando o recurso não existe.",
            "500 quando o erro é teu. Um 500 que devia ser 400 é um bug de desenho."
          ]],
          ["code", String.raw`from fastapi import HTTPException

@app.get("/produtos/{produto_id}")
def obter_produto(produto_id: int):
    produto = repositorio.obter(produto_id)
    if produto is None:
        raise HTTPException(status_code=404, detail="produto não existe")
    return produto`],
          ["h", "Documentação de graça"],
          ["p", "Com o servidor a correr, `/docs` mostra a API inteira, com os campos, os tipos e um botão para experimentar. Não é um extra: é o que a equipa de frontend vai abrir em vez de te perguntar a ti."],
          ["aviso", "Devolver o objeto interno diretamente expõe campos que ninguém devia ver: hashes de password, notas internas, identificadores de sistemas terceiros. Define um modelo de saída separado do modelo de entrada. É a fuga de dados mais comum em APIs feitas à pressa."]
        ],
        quiz: [
          { p: "Um cliente envia `preco` como texto e a tua API responde 500. Onde está o erro de desenho?", o: ["No cliente, que enviou mal","Na tua API, que devia validar à entrada e responder 422","Em lado nenhum, 500 serve"], c: 1,
            e: "500 significa 'a culpa é minha'. Dados inválidos do cliente são 4xx, com a indicação do campo. É o que a validação à entrada te dá sem escreveres código." }
        ],
        exercicio: {
          ficheiro: "endpoint_produtos.py",
          enunciado: "Escreve `criar_produto(dados)`, o miolo de um endpoint, sem FastAPI. Devolve `(201, produto)` com os campos `nome`, `preco` e `quantidade` (por omissão 1) quando os dados são válidos, ou `(422, {\"erros\": [...]})` com `\"nome\"` e `\"preco\"` na lista, por esta ordem, quando faltam ou são inválidos. `nome` tem de ser texto não vazio e `preco` um número maior que zero. Depois, no teu computador, instala `fastapi` e liga esta função a uma rota `POST /produtos`.",
          inicio: String.raw`def criar_produto(dados):
    pass
`,
          testes: String.raw`from endpoint_produtos import criar_produto


def test_cria_com_201():
    codigo, produto = criar_produto({"nome": "teclado", "preco": 39.9})
    assert codigo == 201
    assert produto == {"nome": "teclado", "preco": 39.9, "quantidade": 1}


def test_respeita_a_quantidade_dada():
    assert criar_produto({"nome": "rato", "preco": 12.5, "quantidade": 3})[1]["quantidade"] == 3


def test_rejeita_com_422_e_aponta_os_campos():
    assert criar_produto({"nome": "", "preco": 0}) == (422, {"erros": ["nome", "preco"]})


def test_campos_em_falta():
    assert criar_produto({}) == (422, {"erros": ["nome", "preco"]})


def test_preco_em_texto_e_invalido():
    assert criar_produto({"nome": "cabo", "preco": "4"}) == (422, {"erros": ["preco"]})
`
        }
      },
      {
        id: "25.2", titulo: "CRUD completo com base de dados", min: 22, estado: "pronta",
        meta: "No fim: organizas uma API em camadas e devolves o erro certo quando o recurso não existe.",
        blocos: [
          ["p", "CRUD é criar, ler, atualizar e apagar. É o esqueleto de quase todas as aplicações de gestão, e é o que te vão pedir para escrever na primeira semana de trabalho."],
          ["code", String.raw`POST   /produtos          criar          201
GET    /produtos          listar         200
GET    /produtos/{id}     ler um         200 ou 404
PUT    /produtos/{id}     substituir     200 ou 404
PATCH  /produtos/{id}     alterar campos 200 ou 404
DELETE /produtos/{id}     apagar         204 ou 404`],
          ["h", "Camadas, e porquê"],
          ["lista", [
            "Rotas: falam HTTP. Recebem, validam, chamam o serviço e traduzem erros em códigos.",
            "Serviço: as regras de negócio. Não sabe o que é um pedido HTTP.",
            "Repositório: fala com a base de dados. Não sabe o que é uma regra de negócio.",
            "Modelos: as formas dos dados, com Pydantic à entrada e à saída."
          ]],
          ["p", "Parece burocracia num projeto de trezentas linhas e é o que o salva às três mil. A prova prática: se testar a tua regra de negócio obriga a arrancar um servidor HTTP, as camadas estão coladas."],
          ["code", String.raw`# repositorio.py
class NaoEncontrado(Exception):
    pass

class RepositorioProdutos:
    def __init__(self, sessao):
        self.sessao = sessao

    def obter(self, produto_id):
        produto = self.sessao.get(Produto, produto_id)
        if produto is None:
            raise NaoEncontrado(f"produto {produto_id}")
        return produto`],
          ["code", String.raw`# rotas.py
@app.get("/produtos/{produto_id}", response_model=ProdutoSaida)
def ler(produto_id: int, repo: RepositorioProdutos = Depends(obter_repo)):
    try:
        return repo.obter(produto_id)
    except NaoEncontrado:
        raise HTTPException(status_code=404, detail="produto não existe")`],
          ["p", "O `Depends` é injeção de dependências, o mesmo padrão do aula 14.5, agora dado pelo framework. No teste, substitui-se o repositório por um falso e testa-se a rota sem base de dados nenhuma."],
          ["h", "Erros que se transformam em respostas"],
          ["p", "As exceções de domínio do aula 10.3 sobem até à camada web e são traduzidas ali, num sítio só. Sem isso, cada rota repete o mesmo `try` e uma delas há de esquecer-se."],
          ["code", String.raw`@app.exception_handler(NaoEncontrado)
def tratar_nao_encontrado(pedido, exc):
    return JSONResponse(status_code=404, content={"detalhe": str(exc)})`],
          ["aviso", "PUT substitui o recurso inteiro, PATCH altera só os campos enviados. Implementar PUT como se fosse PATCH é o bug silencioso que apaga os campos que o cliente não mandou. Decide qual suportas e documenta."],
          ["h", "Alterações de esquema"],
          ["p", "A tabela vai mudar. Migrações com Alembic geram e aplicam essas alterações de forma versionada, com o histórico no git ao lado do código. Alterar a base de dados à mão em produção é a origem daquele momento em que o ambiente de testes deixa de se parecer com o real."],
          ["obra", "Numa entrevista para júnior de backend, o exercício mais comum é exatamente isto: um CRUD com validação, 404 tratado e um teste. Fá-lo uma vez de raiz, sem copiar, e ficas com a resposta pronta para o resto do ano."]
        ],
        quiz: [
          { p: "A tua regra de negócio só se consegue testar arrancando o servidor HTTP. O que isso indica?", o: ["Que os testes estão mal escritos","Que a lógica está dentro da camada de rotas em vez de estar num serviço","Que falta uma base de dados de teste"], c: 1,
            e: "Regras de negócio devem correr em memória, em milissegundos. Se precisam de HTTP para existir, ficaram coladas ao transporte." }
        ],
        exercicio: {
          ficheiro: "repositorio.py",
          enunciado: "Escreve a exceção `NaoEncontrado` e a classe `Repositorio`, em memória, com `criar(produto)` (devolve uma cópia do produto com um `id` novo, a começar em 1), `obter(id)` (levanta `NaoEncontrado` se não existir), `listar()` e `apagar(id)` (também levanta `NaoEncontrado`). Os ids nunca se reutilizam, mesmo depois de apagar.",
          inicio: String.raw`class Repositorio:
    def __init__(self):
        pass
`,
          testes: String.raw`import pytest

from repositorio import NaoEncontrado, Repositorio


@pytest.fixture
def repo():
    r = Repositorio()
    r.criar({"nome": "teclado"})
    r.criar({"nome": "rato"})
    return r


def test_ids_comecam_em_1():
    r = Repositorio()
    assert r.criar({"nome": "teclado"})["id"] == 1
    assert r.criar({"nome": "rato"})["id"] == 2


def test_nao_altera_o_dicionario_recebido():
    produto = {"nome": "cabo"}
    Repositorio().criar(produto)
    assert produto == {"nome": "cabo"}


def test_obter(repo):
    assert repo.obter(1)["nome"] == "teclado"


def test_listar(repo):
    assert [p["nome"] for p in repo.listar()] == ["teclado", "rato"]


def test_apagar(repo):
    repo.apagar(1)
    with pytest.raises(NaoEncontrado):
        repo.obter(1)


def test_apagar_inexistente(repo):
    with pytest.raises(NaoEncontrado):
        repo.apagar(99)


def test_ids_nao_se_reutilizam(repo):
    repo.apagar(2)
    assert repo.criar({"nome": "monitor"})["id"] == 3
`
        }
      },
      {
        id: "25.3", titulo: "Testar a API", min: 16, estado: "pronta",
        meta: "No fim: testas rotas de ponta a ponta, com base de dados de teste, em segundos.",
        blocos: [
          ["p", "Testar uma API não obriga a arrancar servidor nem a abrir portas. O `TestClient` do FastAPI chama a aplicação diretamente em memória e devolve respostas a sério, com código de estado e corpo."],
          ["code", String.raw`from fastapi.testclient import TestClient
from main import app

cliente = TestClient(app)

def test_saude():
    resposta = cliente.get("/saude")
    assert resposta.status_code == 200
    assert resposta.json() == {"estado": "ok"}`],
          ["h", "O teste que interessa: criar e voltar a ler"],
          ["code", String.raw`def test_criar_e_ler_produto():
    criado = cliente.post("/produtos", json={"nome": "teclado", "preco": 39.9})
    assert criado.status_code == 201
    produto_id = criado.json()["id"]

    lido = cliente.get(f"/produtos/{produto_id}")
    assert lido.status_code == 200
    assert lido.json()["nome"] == "teclado"

def test_produto_inexistente_da_404():
    assert cliente.get("/produtos/999999").status_code == 404

def test_preco_invalido_da_422():
    resposta = cliente.post("/produtos", json={"nome": "x", "preco": -1})
    assert resposta.status_code == 422`],
          ["p", "Três testes, três caminhos: o feliz, o inexistente e o inválido. É o mínimo por recurso, e já apanha a maioria das regressões que um júnior introduz."],
          ["h", "Base de dados de teste"],
          ["p", "Os testes não podem tocar na base de dados real. Substitui-se a dependência que dá a sessão por uma que aponta para SQLite em memória, criada e destruída por teste. É a fixture do aula 19.2 aplicada a uma API."],
          ["code", String.raw`@pytest.fixture
def cliente():
    motor = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(motor)

    def sessao_de_teste():
        with Session(motor) as s:
            yield s

    app.dependency_overrides[obter_sessao] = sessao_de_teste
    yield TestClient(app)
    app.dependency_overrides.clear()`],
          ["p", "`dependency_overrides` é o FastAPI a deixar-te trocar qualquer dependência no teste. Sem esse gancho, terias de mexer em variáveis globais, que é como se escrevem suites que só passam à primeira execução."],
          ["h", "A pirâmide, sem religião"],
          ["lista", [
            "Muitos testes de unidade às regras de negócio, rápidos e sem infraestrutura.",
            "Alguns testes de API a cada rota, com base de dados em memória.",
            "Pouquíssimos testes contra sistemas externos a sério, a correr à parte da suite normal.",
            "Se a tua suite demora mais de um minuto, deixas de a correr, e uma suite que não corres não existe."
          ]],
          ["obra", "Um projeto de portefólio com uma API pequena, testes destes e CI verde responde de uma vez a testes, HTTP, base de dados e ferramentas. Vale mais numa candidatura do que quatro tutoriais seguidos, e dá conversa para vinte minutos de entrevista."],
          ["aviso", "Testes que dependem uns dos outros, em que o segundo usa o produto criado pelo primeiro, passam localmente e falham na CI, onde a ordem pode mudar. Cada teste cria o que precisa. Sem exceções."]
        ],
        quiz: [
          { p: "Os teus testes de API passam localmente e falham na CI, com erros de 'produto não existe'. Causa mais provável?", o: ["A CI é lenta","Os testes dependem da ordem e do estado deixado por outros testes","Falta um sleep"], c: 1,
            e: "Estado partilhado outra vez. Base de dados nova por teste, e cada teste cria os dados de que precisa." }
        ],
        exercicio: {
          ficheiro: "criar_e_ler.py",
          enunciado: "Escreve `criar_e_ler(cliente, produto)`, que faz `cliente.post(\"/produtos\", produto)`, tira o `id` do corpo devolvido e faz `cliente.get(f\"/produtos/{id}\")`, devolvendo o tuplo `(codigo_do_get, corpo_do_get)`. Se o post não devolver 201, devolve `(codigo_do_post, None)` sem fazer o get. O cliente devolve sempre o par `(codigo, corpo)`.",
          inicio: String.raw`def criar_e_ler(cliente, produto):
    pass
`,
          testes: String.raw`from criar_e_ler import criar_e_ler


class ClienteFalso:
    def __init__(self, codigo_post=201):
        self.codigo_post = codigo_post
        self.pedidos = []
        self.guardados = {}

    def post(self, caminho, corpo):
        self.pedidos.append(("POST", caminho))
        if self.codigo_post != 201:
            return self.codigo_post, {"erros": ["preco"]}
        self.guardados[1] = {**corpo, "id": 1}
        return 201, self.guardados[1]

    def get(self, caminho):
        self.pedidos.append(("GET", caminho))
        chave = int(caminho.rsplit("/", 1)[1])
        if chave not in self.guardados:
            return 404, None
        return 200, self.guardados[chave]


def test_cria_e_le_o_produto():
    codigo, corpo = criar_e_ler(ClienteFalso(), {"nome": "teclado", "preco": 39.9})
    assert codigo == 200
    assert corpo["nome"] == "teclado"


def test_faz_post_e_depois_get_do_id_certo():
    cliente = ClienteFalso()
    criar_e_ler(cliente, {"nome": "teclado"})
    assert cliente.pedidos == [("POST", "/produtos"), ("GET", "/produtos/1")]


def test_post_falhado_devolve_o_codigo_e_none():
    assert criar_e_ler(ClienteFalso(codigo_post=422), {}) == (422, None)


def test_post_falhado_nao_faz_get():
    cliente = ClienteFalso(codigo_post=422)
    criar_e_ler(cliente, {})
    assert cliente.pedidos == [("POST", "/produtos")]
`
        }
      }
  ]
});
