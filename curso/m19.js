/* Módulo 19: Testes. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 19, fase: 4, titulo: "Testes",
  objetivo: "Escrever a tua própria suite: casos, fixtures, dublês e a decisão de quanto testar.",
  licoes: [
      {
        id: "19.1", titulo: "pytest: a tua própria suite", min: 18, estado: "pronta",
        meta: "No fim: escreves suites completas com pytest.raises e parametrize, e organizas os testes como nas equipas.",
        blocos: [
          ["p", "Desde a aula 1.6 que corres o pytest, e desde a 3.5 que escreves testes com `assert`. Esta aula junta o que falta para escreveres suites como as das equipas: testar erros, muitos casos de uma vez e as regras que toda a gente segue."],
          ["p", "Um teste é uma função que chama o teu código e verifica o resultado. Nada mais. O valor não está no teste em si, está em poderes mudar o código amanhã e saber em dois segundos se partiste alguma coisa."],
          ["h", "A estrutura mínima"],
          ["code", String.raw`# calculadora.py
def desconto(preco, percentagem):
    if percentagem < 0 or percentagem > 100:
        raise ValueError("percentagem tem de estar entre 0 e 100")
    return round(preco * (1 - percentagem / 100), 2)`],
          ["code", String.raw`# test_calculadora.py
import pytest
from calculadora import desconto

def test_desconto_normal():
    assert desconto(100, 20) == 80.0

def test_desconto_zero_nao_altera_preco():
    assert desconto(49.9, 0) == 49.9

def test_percentagem_invalida_levanta_erro():
    with pytest.raises(ValueError):
        desconto(100, 150)`],
          ["p", "Três regras que a equipa vai esperar de ti: o ficheiro começa por `test_`, a função começa por `test_`, e o nome da função descreve o comportamento esperado em vez de dizer `test_1`."],
          ["h", "Um teste, vários casos"],
          ["code", String.raw`@pytest.mark.parametrize("preco, pct, esperado", [
    (100, 20, 80.0),
    (100, 100, 0.0),
    (33.33, 10, 30.0),
])
def test_varios_descontos(preco, pct, esperado):
    assert desconto(preco, pct) == esperado`],
          ["obra", "Numa candidatura, um repositório com testes a passar vale mais do que três projetos sem testes. É a prova mais barata de que trabalhaste em equipa antes de teres trabalhado em equipa."],
          ["p", "Ordem de escrita que recomendo enquanto aprendes: escreve o caso normal, o caso limite (zero, vazio, negativo) e o caso de erro. Três testes por função chegam para começar."],
          ["aviso", "Testar que `1 + 1 == 2` não testa nada. Um teste tem de poder falhar. Se nunca viste o teu teste a falhar, não sabes se ele funciona: parte o código de propósito uma vez e confirma que fica vermelho."]
        ],
        quiz: [
          { p: "O teu teste chama uma API real na internet. Qual é o problema?", o: ["Nenhum, testa a sério","É lento e falha quando a rede ou a API falham, por razões que não são do teu código","Só é problema se for paga"], c: 1,
            e: "Testes têm de ser rápidos e determinísticos. Chamadas externas substituem-se por dublês (mocks), tema do aula 23.2." }
        ],
        exercicio: {
          ficheiro: "medias.py",
          enunciado: "Escreve `media(notas)`, que devolve a média arredondada a uma casa decimal e levanta `ValueError` se a lista estiver vazia, e `classificar(media)`, que devolve `\"reprovado\"` abaixo de 9.5 e `\"aprovado\"` a partir daí. Depois de os testes do curso passarem, escreve os teus em `test_minhas_medias.py`: pelo menos um com `parametrize`, um com `pytest.raises`, e confirma que ficam vermelhos quando estragas a função.",
          inicio: String.raw`def media(notas):
    pass


def classificar(media):
    pass
`,
          testes: String.raw`import pytest

from medias import classificar, media


def test_media_simples():
    assert media([10, 20]) == 15.0


def test_arredonda_a_uma_casa():
    assert media([1, 2, 2]) == 1.7


def test_lista_vazia_levanta_erro():
    with pytest.raises(ValueError):
        media([])


@pytest.mark.parametrize(
    "valor, esperado",
    [(0, "reprovado"), (9.4, "reprovado"), (9.5, "aprovado"), (20, "aprovado")],
)
def test_classificar(valor, esperado):
    assert classificar(valor) == esperado
`
        }
      },
      {
        id: "19.2", titulo: "Fixtures e organização da suite", min: 16, estado: "pronta",
        meta: "No fim: preparas dados de teste sem os repetir e mantens cada teste isolado dos outros.",
        blocos: [
          ["p", "Uma fixture é código que prepara o que o teste precisa: um objeto, uma base de dados temporária, um ficheiro. O pytest chama-a por ti quando o nome aparece como argumento do teste."],
          ["code", String.raw`import pytest
from loja import Carrinho

@pytest.fixture
def carrinho():
    c = Carrinho()
    c.adicionar("teclado", 39.9)
    return c

def test_total_com_um_item(carrinho):
    assert carrinho.total() == 39.9

def test_adicionar_soma(carrinho):
    carrinho.adicionar("rato", 12.5)
    assert carrinho.total() == 52.4`],
          ["p", "Os dois testes recebem carrinhos diferentes. A fixture corre uma vez por teste, e é isso que garante que o segundo teste não vê o que o primeiro fez. Isolamento é a propriedade que faz uma suite valer alguma coisa."],
          ["h", "conftest.py"],
          ["p", "Fixtures usadas por vários ficheiros vivem num `conftest.py` na pasta de testes. Não precisas de importar nada: o pytest encontra-as sozinho, incluindo nas subpastas."],
          ["code", String.raw`testes/
  conftest.py          # fixtures partilhadas
  test_carrinho.py
  test_relatorio.py
  dados/
    vendas_exemplo.csv`],
          ["h", "Preparar e limpar"],
          ["p", "Com `yield`, o que está antes corre para preparar e o que está depois corre para limpar, mesmo que o teste rebente. É o gerador do módulo 15 a servir de gestor de contexto."],
          ["code", String.raw`@pytest.fixture
def ficheiro_temporario(tmp_path):
    caminho = tmp_path / "vendas.csv"
    caminho.write_text("produto,valor\nteclado,39.9\n", encoding="utf-8")
    yield caminho
    # aqui limpava-se, se o tmp_path não o fizesse por nós`],
          ["p", "`tmp_path` é uma fixture que já vem no pytest: dá-te uma pasta temporária nova por teste e apaga-a no fim. Nunca escrevas ficheiros de teste na pasta do projeto."],
          ["h", "Âmbito"],
          ["lista", [
            "`scope=\"function\"`, o valor por omissão: uma instância nova por teste. É o que queres em 90 por cento dos casos.",
            "`scope=\"module\"` ou `scope=\"session\"`: partilhada, para coisas caras como arrancar um servidor.",
            "Partilhar estado alterável entre testes é como se cria uma suite que passa sozinha e falha em conjunto, ou pior, que só passa numa certa ordem."
          ]],
          ["obra", "Um sinal de suite doente: os testes passam quando corres o ficheiro sozinho e falham quando corres a suite toda. É quase sempre estado partilhado, uma base de dados que não é limpa, ou uma variável de módulo. Corre com `pytest -p no:randomly` desligado e vais ver."],
          ["h", "Construtores de dados"],
          ["p", "Mesmo sem pytest, o padrão mais útil é uma função que cria dados de teste com valores por omissão sensatos e deixa alterar só o que interessa ao teste. Torna cada teste legível: vê-se logo o que é relevante."],
          ["py", String.raw`def criar_utilizador(**alteracoes):
    base = {"nome": "Ana", "email": "ana@exemplo.pt", "ativo": True}
    base.update(alteracoes)
    return base

print(criar_utilizador())
print(criar_utilizador(ativo=False))`],
          ["aviso", "Fixtures que fazem cinco coisas escondem o que o teste precisa. Se ao ler um teste não percebes de onde vem o estado, a fixture está a ser esperta a mais. Explícito ganha a poupado."]
        ],
        quiz: [
          { p: "A tua suite passa a correr o ficheiro sozinho e falha ao correr tudo. Causa mais provável?", o: ["Falta de fixtures","Estado partilhado entre testes, como um ficheiro ou uma variável de módulo","Testes a mais"], c: 1,
            e: "Testes têm de ser independentes e poder correr em qualquer ordem. Cada um prepara o seu estado e limpa o que sujou." }
        ],
        exercicio: {
          ficheiro: "construtores.py",
          enunciado: "Escreve `criar_utilizador(**alteracoes)`, um construtor de dados de teste. Devolve um dicionário com `nome` `\"Ana\"`, `email` `\"ana@exemplo.pt\"` e `ativo` `True`, com os campos passados substituídos ou acrescentados. Cada chamada devolve um dicionário novo.",
          inicio: String.raw`def criar_utilizador(**alteracoes):
    pass
`,
          testes: String.raw`import pytest

from construtores import criar_utilizador


@pytest.fixture
def utilizador():
    return criar_utilizador()


def test_valores_por_omissao(utilizador):
    assert utilizador == {"nome": "Ana", "email": "ana@exemplo.pt", "ativo": True}


def test_substitui_um_campo():
    assert criar_utilizador(ativo=False)["ativo"] is False


def test_aceita_campos_novos():
    assert criar_utilizador(idade=30)["idade"] == 30


def test_cada_chamada_devolve_um_novo(utilizador):
    utilizador["nome"] = "alterado"
    assert criar_utilizador()["nome"] == "Ana"
`
        }
      },
      {
        id: "19.3", titulo: "Escrever o teste primeiro", min: 14, estado: "pronta",
        meta: "No fim: usas o ciclo vermelho, verde, limpar num problema real e percebes o que ele te dá.",
        blocos: [
          ["p", "Escrever o teste antes do código parece ao contrário e não é. O teste é a primeira utilização da função que vais escrever, e obriga-te a decidir a assinatura e o comportamento antes de te enterrares na implementação."],
          ["h", "O ciclo"],
          ["lista", [
            "Vermelho: escreve um teste do comportamento que falta. Corre-o e vê-o falhar, com a mensagem certa.",
            "Verde: escreve o mínimo de código que o faz passar. Feio é aceitável nesta fase.",
            "Limpar: arruma o código com os testes a passar a servir de rede."
          ]],
          ["p", "O passo que toda a gente salta é ver o teste falhar. Um teste que nunca falhou pode estar a testar coisa nenhuma: um `assert` com um nome mal escrito, uma função que não está a ser chamada."],
          ["h", "Um caso a sério"],
          ["p", "Requisito: uma password é válida se tiver pelo menos oito caracteres, um algarismo e uma maiúscula. Devolve a lista de problemas, vazia quando está tudo bem. Primeiro os testes:"],
          ["code", String.raw`def test_password_valida_nao_tem_problemas():
    assert validar("Segura123") == []

def test_password_curta():
    assert "curta" in validar("Ab1")

def test_password_sem_algarismo():
    assert "sem algarismo" in validar("Segurissima")

def test_acumula_varios_problemas():
    assert len(validar("abc")) == 3`],
          ["p", "Repara no que os testes já decidiram: o nome da função, que devolve uma lista, que os problemas são strings curtas, e que se acumulam. Isso é desenho, e aconteceu antes de escrever uma linha de implementação."],
          ["py", String.raw`def validar(password):
    problemas = []
    if len(password) < 8:
        problemas.append("curta")
    if not any(c.isdigit() for c in password):
        problemas.append("sem algarismo")
    if not any(c.isupper() for c in password):
        problemas.append("sem maiuscula")
    return problemas

print(validar("Segura123"))
print(validar("abc"))`],
          ["h", "Onde compensa mesmo"],
          ["lista", [
            "Regras de negócio com muitos casos limite, como esta.",
            "Correção de bugs: escreve primeiro o teste que reproduz o bug relatado. Se não o consegues escrever, ainda não percebeste o bug.",
            "Refatorações: os testes existentes dizem-te se partiste alguma coisa.",
            "Onde não compensa: exploração, protótipos, código de interface que vais deitar fora amanhã."
          ]],
          ["obra", "Numa entrevista técnica com código, começar pelos casos de teste em voz alta vale mais do que a solução ótima. Mostra que pensas em casos limite antes de escrever, que é literalmente o trabalho. Diz: 'antes de implementar, os casos que me interessam são vazio, um elemento e valores repetidos'."],
          ["aviso", "Testar a implementação em vez do comportamento é a armadilha. Um teste que verifica que uma função interna foi chamada parte-se na primeira refatoração, mesmo com o resultado certo. Testa o que entra e o que sai."]
        ],
        quiz: [
          { p: "Chega-te um relatório de bug de produção. Qual é o primeiro passo?", o: ["Corrigir depressa e publicar","Escrever um teste que falha por causa do bug","Pedir mais informação ao utilizador"], c: 1,
            e: "O teste prova que reproduziste o problema e fica a impedir que ele volte. Correções sem teste voltam, e voltam com o mesmo número de bilhete." }
        ],
        exercicio: {
          ficheiro: "palavras_passe.py",
          enunciado: "Implementa `validar(password)` para passar nos testes já escritos: devolve a lista de problemas, por esta ordem, com `\"curta\"` (menos de 8 caracteres), `\"sem algarismo\"` e `\"sem maiuscula\"`. Uma password válida devolve a lista vazia. Lê os testes primeiro e faz passar um de cada vez.",
          inicio: String.raw`def validar(password):
    pass
`,
          testes: String.raw`from palavras_passe import validar


def test_password_valida():
    assert validar("Segura123") == []


def test_password_curta():
    assert validar("Ab1") == ["curta"]


def test_oito_caracteres_ja_chega():
    assert validar("Segura12") == []


def test_sem_algarismo():
    assert validar("Segurissima") == ["sem algarismo"]


def test_sem_maiuscula():
    assert validar("segura123") == ["sem maiuscula"]


def test_acumula_os_tres_problemas_por_ordem():
    assert validar("abc") == ["curta", "sem algarismo", "sem maiuscula"]


def test_password_vazia():
    assert len(validar("")) == 3
`
        }
      },
      {
        id: "19.4", titulo: "Testar o que depende do tempo, do acaso e do sistema", min: 16, estado: "pronta",
        meta: "No fim: escreves testes que não falham às sextas-feiras nem no dia 1 de cada mês.",
        blocos: [
          ["p", "Três coisas partem suites de testes: o relógio, o acaso e tudo o que está fora do processo (ficheiros, rede, variáveis de ambiente). A solução é sempre a mesma ideia, com nomes diferentes: em vez de a função ir buscar essas coisas, recebe-as."],
          ["h", "O relógio"],
          ["py", String.raw`from datetime import datetime, timedelta

# difícil de testar: vai buscar a hora lá dentro
def expirou_mau(criado_em):
    return (datetime.now() - criado_em).days > 30

# fácil de testar: a hora entra como argumento
def expirou(criado_em, agora=None):
    agora = agora or datetime.now()
    return (agora - criado_em) > timedelta(days=30)

base = datetime(2026, 1, 1)
print(expirou(base, base + timedelta(days=10)))
print(expirou(base, base + timedelta(days=40)))`],
          ["p", "A segunda versão continua a funcionar igual em produção, onde ninguém passa `agora`. Mas no teste passas a hora que quiseres e testas o dia 31, o ano bissexto e a meia-noite sem esperar por eles."],
          ["p", "Isto tem um nome pomposo, injeção de dependências, e é só isto: o que a função precisa, entra pela porta em vez de ser ido buscar."],
          ["h", "O acaso"],
          ["py", String.raw`import random

def sortear(itens, aleatorio=None):
    aleatorio = aleatorio or random
    return aleatorio.choice(itens)

previsivel = random.Random(42)
print(sortear(["a", "b", "c"], previsivel))
print(sortear(["a", "b", "c"], random.Random(42)))`],
          ["p", "Com a mesma semente sai sempre o mesmo. O teste passa a ser determinístico sem deixar de exercitar o código a sério."],
          ["h", "monkeypatch, quando não podes mudar a assinatura"],
          ["code", String.raw`# codigo.py
import os

def destino():
    return os.environ.get("PASTA_SAIDA", "/tmp")

# test_codigo.py
def test_usa_a_variavel_de_ambiente(monkeypatch):
    monkeypatch.setenv("PASTA_SAIDA", "/dados")
    assert destino() == "/dados"

def test_sem_variavel_usa_o_valor_por_omissao(monkeypatch):
    monkeypatch.delenv("PASTA_SAIDA", raising=False)
    assert destino() == "/tmp"`],
          ["p", "O `monkeypatch` do pytest substitui uma coisa durante o teste e repõe o original no fim, mesmo que o teste rebente. Serve para variáveis de ambiente, atributos de módulos e funções. Usa-o quando não controlas o código; quando controlas, prefere passar por argumento."],
          ["h", "O sistema de ficheiros"],
          ["p", "Não inventes um sistema de ficheiros falso: usa a fixture `tmp_path` (aula 19.2), que te dá uma pasta a sério, nova por teste e apagada no fim. Ficheiros verdadeiros em sítio descartável são mais simples e mais fiéis."],
          ["h", "O que se substitui e o que não"],
          ["lista", [
            "Substitui o que não é teu e é lento, pago ou instável: rede, APIs externas, relógio, acaso, envio de emails.",
            "Não substituas a tua própria lógica de negócio. Um teste que substitui a função que devia estar a testar passa sempre e não prova nada.",
            "Para chamadas HTTP há uma aula inteira, com dublês a sério: aula 23.2."
          ]],
          ["obra", "Um teste que só falha no dia 1 de cada mês, ou depois das 23h, ou quando o computador está em Lisboa e não em São Paulo, existe em todas as empresas. Ninguém quer ser a pessoa que o escreveu, porque a suite perde credibilidade e a equipa começa a correr os testes com um encolher de ombros."],
          ["aviso", "Bibliotecas que congelam o relógio resolvem o sintoma e escondem a causa: o código continua a ir buscar a hora a meio da lógica. Passar o relógio como argumento não precisa de biblioteca nenhuma e deixa o código melhor."]
        ],
        quiz: [
          { p: "Um teste passa todo o ano e falha em dezembro. Qual é a causa mais provável?", o: ["Um bug do pytest","A função vai buscar a data atual lá dentro e o teste assume o mês","Falta de fixtures"], c: 1,
            e: "Qualquer coisa que dependa de `datetime.now()` dentro da lógica é uma bomba com relógio. Passa a data como argumento e o teste escolhe o dia que quer exercitar." }
        ],
        exercicio: {
          ficheiro: "expiracao.py",
          enunciado: "Torna `esta_expirado(criado_em, agora=None, dias=30)` testável. Devolve `True` se passaram mais de `dias` dias entre `criado_em` e `agora`. Quando `agora` não é dado, usa `datetime.now()`. Exatamente no limite ainda não expirou.",
          inicio: String.raw`from datetime import datetime, timedelta


def esta_expirado(criado_em, agora=None, dias=30):
    pass
`,
          testes: String.raw`from datetime import datetime, timedelta

from expiracao import esta_expirado

BASE = datetime(2026, 1, 1)


def test_ainda_valido():
    assert esta_expirado(BASE, BASE + timedelta(days=10)) is False


def test_expirado():
    assert esta_expirado(BASE, BASE + timedelta(days=31)) is True


def test_exatamente_no_limite_ainda_e_valido():
    assert esta_expirado(BASE, BASE + timedelta(days=30)) is False


def test_um_segundo_depois_ja_expirou():
    assert esta_expirado(BASE, BASE + timedelta(days=30, seconds=1)) is True


def test_prazo_configuravel():
    assert esta_expirado(BASE, BASE + timedelta(days=8), dias=7) is True


def test_sem_agora_usa_o_relogio():
    assert esta_expirado(datetime(2000, 1, 1)) is True
    assert esta_expirado(datetime.now()) is False
`
        }
      },
      {
        id: "19.5", titulo: "Quanto testar: limites, cobertura e o que não vale a pena", min: 16, estado: "pronta",
        meta: "No fim: decides o que testar pelo risco, e sabes ler um relatório de cobertura sem te deixares enganar por ele.",
        blocos: [
          ["p", "'Testámos tudo' não existe. Uma função com dois inteiros já tem mais combinações do que átomos no universo. A pergunta certa não é quanto, é onde está o risco."],
          ["h", "Os bugs vivem nas fronteiras"],
          ["p", "Quase nenhum bug está no meio do intervalo. Estão no zero, no um, no último, no vazio, no limite exato. Escolhe os casos de teste a partir das fronteiras e apanhas a maioria com meia dúzia de asserções."],
          ["lista", [
            "Quantidade: nenhum, um, muitos.",
            "Limites exatos: se a regra é 'mais de 30 dias', testa 29, 30 e 31. O erro está quase sempre entre `>` e `>=`.",
            "Valores: zero, negativo, `None`, string vazia, texto onde devia ir número.",
            "Coleções: vazia, com repetidos, já ordenada, ao contrário.",
            "Texto: acentos, espaços à volta, maiúsculas, muito comprido."
          ]],
          ["code", String.raw`regra: desconto para compras acima de 100 euros

99.99  -> sem desconto
100.00 -> ?               <- a fronteira. pergunta a quem pediu.
100.01 -> com desconto`],
          ["h", "Cobertura"],
          ["code", String.raw`python -m pip install pytest-cov
pytest --cov=meu_pacote --cov-report=term-missing`],
          ["p", "A cobertura diz-te que linhas correram durante os testes. Não diz que estão certas: um teste sem uma única asserção dá cem por cento de cobertura e zero de garantia. Lê o relatório ao contrário: os ficheiros a zero por cento é que são a informação útil."],
          ["lista", [
            "Perseguir cem por cento leva a testes escritos para o número, que ninguém lê e que travam refatorações.",
            "Oitenta por cento com asserções honestas vale mais do que cem por cento decorativos.",
            "A coluna `missing` é a mais útil: mostra os ramos de erro que nunca foram exercitados, que é onde os bugs se escondem."
          ]],
          ["h", "O que testar sempre"],
          ["lista", [
            "Regras de negócio e cálculos: descontos, IVA, prazos, elegibilidade.",
            "Validação e interpretação de dados que vêm de fora.",
            "Tudo o que já esteve mal uma vez: cada bug corrigido leva um teste com o número do bilhete no nome.",
            "Os caminhos de erro, não só o caminho feliz."
          ]],
          ["h", "O que não vale a pena"],
          ["lista", [
            "Getters e setters triviais, `dataclasses` sem lógica.",
            "Bibliotecas de terceiros: presume-se que o `json` funciona.",
            "Código gerado e migrações automáticas.",
            "Detalhes internos de implementação, que partem os testes a cada refatoração sem apanhar bug nenhum."
          ]],
          ["obra", "A pergunta de entrevista é 'como decides o que testar?'. A resposta que funciona é curta: 'pelo risco. O que custa dinheiro ou confiança se estiver errado, e o que já esteve errado uma vez'. Quem responde 'testo tudo' mostra que nunca manteve uma suite."],
          ["aviso", "Um teste que repete a fórmula da implementação passa sempre e não prova nada. Se o código faz `preco * 1.23` e o teste verifica `resultado == preco * 1.23`, testaste que o Python sabe multiplicar. Escreve o valor esperado à mão: `assert com_iva(100) == 123.0`."]
        ],
        quiz: [
          { p: "O relatório diz cem por cento de cobertura. O que é que isso garante?", o: ["Que não há bugs","Que todas as linhas correram durante os testes, nada mais","Que os casos limite estão testados"], c: 1,
            e: "Cobertura mede execução, não correção. Serve para encontrar zonas nunca exercitadas; não serve como prova de qualidade, e como objetivo de gestão produz testes vazios." }
        ],
        exercicio: {
          ficheiro: "intervalos.py",
          enunciado: "Escreve `interpretar_intervalo(texto)`, que transforma `\"3-7\"` na lista `[3, 4, 5, 6, 7]` e `\"5\"` em `[5]`. Os espaços à volta são ignorados. Se o início for maior que o fim, ou o texto não for válido, levanta `ValueError`. Repara nas fronteiras: os testes vão lá bater.",
          inicio: String.raw`def interpretar_intervalo(texto):
    pass
`,
          testes: String.raw`import pytest

from intervalos import interpretar_intervalo


@pytest.mark.parametrize(
    "texto, esperado",
    [
        ("3-7", [3, 4, 5, 6, 7]),
        ("5", [5]),
        ("4-4", [4]),
        ("  2-3 ", [2, 3]),
        ("0-1", [0, 1]),
    ],
)
def test_intervalos_validos(texto, esperado):
    assert interpretar_intervalo(texto) == esperado


@pytest.mark.parametrize("texto", ["7-3", "a-b", "", "1-", "-", "2--3", "1-2-3"])
def test_entradas_invalidas(texto):
    with pytest.raises(ValueError):
        interpretar_intervalo(texto)
`
        }
      }
  ]
});
