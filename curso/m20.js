/* Módulo 20: Qualidade e ferramentas. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 20, fase: 4, titulo: "Qualidade e ferramentas",
  objetivo: "Configurar o que se verifica sozinho: estilo, tipos e integração contínua.",
  licoes: [
      {
        id: "20.1", titulo: "ruff, formatação automática e mypy", min: 15, estado: "pronta",
        meta: "No fim: configuras as três ferramentas num projeto e percebes o que cada aviso quer dizer.",
        blocos: [
          ["p", "Desde a aula 8.5 que corres o `ruff` com as regras de fábrica. Num projeto de equipa, as regras escolhem-se e escrevem-se no `pyproject.toml`, para toda a gente e para o servidor de integração contínua verificarem o mesmo. E junta-se-lhe um verificador de tipos."],
          ["p", "Três ferramentas, três trabalhos diferentes. O formatador arruma o código. O linter aponta problemas. O verificador de tipos prova que as peças encaixam. Nenhuma delas substitui testes, e as três juntas apanham antes da revisão o que faria perder tempo a um humano."],
          ["h", "ruff: linter e formatador"],
          ["code", String.raw`pip install ruff

ruff format .        # arruma indentação, aspas, linhas
ruff check .         # aponta problemas
ruff check --fix .   # corrige o que é seguro corrigir`],
          ["p", "O `ruff` substituiu num só programa o que antes eram quatro: black, isort, flake8 e pyupgrade. É escrito em Rust e corre um projeto inteiro em menos de um segundo, o que faz toda a diferença: uma ferramenta lenta acaba desligada."],
          ["code", String.raw`# pyproject.toml
[tool.ruff]
line-length = 88
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B"]
# E: estilo, F: erros reais, I: ordem dos imports,
# UP: sintaxe moderna, B: armadilhas conhecidas`],
          ["h", "O que os avisos querem dizer"],
          ["lista", [
            "`F401 imported but unused`: import a mais. Apaga, não comentes.",
            "`F841 local variable assigned but never used`: ou te esqueceste de a usar, ou há aqui um bug.",
            "`E501 line too long`: parte a linha. Quase sempre é uma expressão que devia ter nome.",
            "`B006 mutable default argument`: o bug da aula 9.4, apanhado automaticamente.",
            "`B008 function call in default argument`: chamada avaliada uma vez, na definição."
          ]],
          ["h", "Formatar não é opinião"],
          ["p", "Discussões sobre aspas simples ou duplas custam dinheiro e não produzem nada. O formatador decide, corre no gravar do editor, e a equipa passa a discutir o que interessa. Além disso, os diffs no git ficam limpos: só muda o que mudaste mesmo."],
          ["h", "mypy: os tipos verificados"],
          ["code", String.raw`pip install mypy
mypy vendas/`],
          ["code", String.raw`def desconto(preco: float, pct: float) -> float:
    return preco * (1 - pct / 100)

desconto("100", 20)
# error: Argument 1 has incompatible type "str"; expected "float"`],
          ["p", "Aquele erro apareceu sem correr o programa. Num projeto grande, o mypy apanha centenas de casos destes, sobretudo `None` onde ninguém esperava `None`. Começa por o correr só nos módulos novos: `strict` desde o dia um num projeto antigo é desmoralizante."],
          ["obra", "Numa candidatura, um repositório com `pyproject.toml` configurado, `ruff` limpo e testes a passar diz mais sobre ti do que qualquer linha do CV. Diz que já trabalhaste em equipa, mesmo que ainda não tenhas trabalhado."],
          ["aviso", "`# noqa` desliga um aviso naquela linha e serve para casos justificados, com comentário a explicar. Ficheiros cheios de `noqa` são a prova de que a configuração está errada, e é a configuração que se corrige."]
        ],
        quiz: [
          { p: "O linter aponta `F841: local variable 'resultado' is assigned to but never used`. O que investigas?", o: ["Nada, é só estilo","Se te esqueceste de devolver ou usar esse resultado, o que costuma ser um bug","Renomear a variável"], c: 1,
            e: "Este aviso apanha lógica esquecida a meio: cálculos cujo resultado se perde. É dos poucos avisos de estilo que denunciam bugs a sério." }
        ],
        exercicio: {
          ficheiro: "mini_linter.py",
          enunciado: "Escreve `verificar_estilo(linhas)`, um mini-linter. Devolve uma lista de tuplos `(numero_da_linha, problema)`, com `\"linha demasiado longa\"` para linhas com mais de 88 caracteres e `\"espaços no fim\"` para linhas que acabam em espaço. As linhas contam a partir de 1, e uma linha pode ter os dois problemas, por esta ordem.",
          inicio: String.raw`def verificar_estilo(linhas):
    pass
`,
          testes: String.raw`from mini_linter import verificar_estilo

LINHAS = ["ok", "x" * 89, "com espaco  ", "y" * 89 + " "]


def test_linha_longa():
    assert (2, "linha demasiado longa") in verificar_estilo(LINHAS)


def test_espacos_no_fim():
    assert (3, "espaços no fim") in verificar_estilo(LINHAS)


def test_linha_limpa_nao_aparece():
    assert all(n != 1 for n, _ in verificar_estilo(LINHAS))


def test_dois_problemas_na_mesma_linha_por_ordem():
    assert verificar_estilo(LINHAS)[-2:] == [(4, "linha demasiado longa"), (4, "espaços no fim")]


def test_88_caracteres_ainda_passa():
    assert verificar_estilo(["z" * 88]) == []


def test_ficheiro_limpo():
    assert verificar_estilo(["a", "b"]) == []
`
        }
      },
      {
        id: "20.2", titulo: "Tipos a sério: Optional, TypedDict, Protocol e genéricos", min: 17, estado: "pronta",
        meta: "No fim: anotas dicionários com forma fixa, objetos que só precisam de ter certos métodos e funções que funcionam com qualquer tipo, e o mypy verifica tudo.",
        blocos: [
          ["p", "As anotações da aula 8.4 chegam para funções simples. Em código de equipa aparecem quatro casos que pedem mais: o valor que pode faltar, o dicionário com chaves fixas, o 'qualquer coisa que tenha este método' e a função que funciona com qualquer tipo."],
          ["h", "O que pode faltar"],
          ["code", String.raw`def procurar(email: str) -> dict | None: ...

utilizador = procurar("ana@exemplo.pt")
print(utilizador["nome"])   # mypy: Value of type "dict | None" is not indexable`],
          ["p", "`X | None`, que em código antigo aparece como `Optional[X]`, obriga quem chama a tratar a ausência. O mypy recusa o acesso até haver um `if utilizador is None:` antes."],
          ["h", "TypedDict: a forma de um dicionário"],
          ["code", String.raw`from typing import TypedDict


class Utilizador(TypedDict):
    nome: str
    email: str
    ativo: bool


def ativos(utilizadores: list[Utilizador]) -> list[str]:
    return [u["email"] for u in utilizadores if u["ativo"]]`],
          ["p", "Continua a ser um dicionário normal em execução, sem custo nenhum. Mas o mypy e o editor passam a saber que chaves existem e de que tipo, e apanham `u[\"mail\"]` antes de o programa correr. É a forma de anotar as respostas de serviços web da aula 7.3."],
          ["h", "Protocol: qualquer coisa que saiba fazer isto"],
          ["code", String.raw`from typing import Protocol, runtime_checkable


@runtime_checkable
class Canal(Protocol):
    def enviar(self, mensagem: str) -> bool: ...


class Email:
    def enviar(self, mensagem: str) -> bool:
        return True


print(isinstance(Email(), Canal))   # True, sem herdar de Canal`],
          ["p", "O `Notificador` da aula 14.5 precisava de um canal com um método `enviar`, fosse ele qual fosse. Um `Protocol` escreve essa exigência como tipo, sem obrigar os canais a herdar de nada. É a tipagem que combina com a forma como o Python sempre funcionou."],
          ["h", "Genéricos"],
          ["code", String.raw`from collections.abc import Sequence
from typing import TypeVar

T = TypeVar("T")


def primeiro(itens: Sequence[T]) -> T | None:
    return itens[0] if itens else None


nome = primeiro(["Ana", "Rui"])   # o mypy sabe que é str | None`],
          ["p", "`T` é 'o tipo que vier'. Com ele, o resultado de `primeiro` tem o tipo dos elementos que lhe deste, em vez de um `object` que não serve para nada. No Python 3.12 escreve-se mais curto, `def primeiro[T](itens: Sequence[T]) -> T | None`, e vais ver as duas formas."],
          ["aviso", "`Any` desliga a verificação para aquele valor e para tudo o que se calcular a partir dele. Às vezes é preciso, numa fronteira com uma biblioteca sem tipos. Um projeto cheio de `Any` tem o mypy a correr e a não verificar quase nada."],
          ["obra", "Num projeto com tipos, o mypy (ou o pyright, que o VS Code usa por trás) corre na integração contínua ao lado dos testes. Os erros que apanha são quase todos da mesma família: `None` onde ninguém esperava, e chaves de dicionário que mudaram de nome numa ponta e não na outra."]
        ],
        quiz: [
          { p: "Que tipo descreve 'qualquer objeto que tenha um método enviar(mensagem)'?", o: ["Uma classe base abstrata de que todos herdam","Um Protocol","Any"], c: 1,
            e: "O Protocol descreve a forma, e qualquer classe com esse método serve, sem herança." }
        ],
        exercicio: {
          ficheiro: "tipos_avancados.py",
          enunciado: "Escreve, com todas as anotações: `Utilizador`, um `TypedDict` com `nome` (str), `email` (str) e `ativo` (bool); `ativos(utilizadores)`, que devolve os emails dos ativos; `Canal`, um `Protocol` verificável com `isinstance`, com o método `enviar(self, mensagem: str) -> bool`; `notificar_todos(canais, mensagem)`, que envia por todos e devolve quantos responderam `True`; e `primeiro(itens)`, genérico com um `TypeVar` chamado `T`, que devolve o primeiro elemento ou `None`.",
          inicio: String.raw`from collections.abc import Sequence
from typing import Protocol, TypedDict, TypeVar, runtime_checkable
`,
          testes: String.raw`import typing

from tipos_avancados import Canal, Utilizador, ativos, notificar_todos, primeiro


class CanalQueFunciona:
    def enviar(self, mensagem: str) -> bool:
        return True


class CanalEmBaixo:
    def enviar(self, mensagem: str) -> bool:
        return False


def test_utilizador_tem_os_tres_campos():
    assert typing.get_type_hints(Utilizador) == {"nome": str, "email": str, "ativo": bool}


def test_ativos():
    utilizadores = [
        {"nome": "Ana", "email": "ana@x.pt", "ativo": True},
        {"nome": "Rui", "email": "rui@x.pt", "ativo": False},
    ]
    assert ativos(utilizadores) == ["ana@x.pt"]


def test_ativos_esta_anotada():
    dicas = typing.get_type_hints(ativos)
    assert dicas["utilizadores"] == list[Utilizador]
    assert dicas["return"] == list[str]


def test_qualquer_objeto_com_enviar_e_um_canal():
    assert isinstance(CanalQueFunciona(), Canal)
    assert not isinstance(object(), Canal)


def test_notificar_todos_conta_os_sucessos():
    canais = [CanalQueFunciona(), CanalEmBaixo(), CanalQueFunciona()]
    assert notificar_todos(canais, "servidor em baixo") == 2


def test_notificar_esta_anotada():
    assert typing.get_type_hints(notificar_todos)["return"] is int


def test_primeiro():
    assert primeiro(["a", "b"]) == "a"
    assert primeiro([]) is None


def test_primeiro_e_generico():
    argumentos = typing.get_args(typing.get_type_hints(primeiro)["return"])
    assert type(None) in argumentos
    assert any(isinstance(a, typing.TypeVar) for a in argumentos)
`
        }
      },
      {
        id: "20.3", titulo: "pre-commit e integração contínua", min: 14, estado: "pronta",
        meta: "No fim: pões as verificações a correr sozinhas antes do commit e em cada push.",
        blocos: [
          ["p", "Uma verificação que depende de alguém se lembrar de a correr não é uma verificação. Há dois sítios onde isto se automatiza: no teu computador, antes do commit, e no servidor, a cada push."],
          ["h", "pre-commit, no teu computador"],
          ["code", String.raw`pip install pre-commit
pre-commit install     # instala o gancho no .git
pre-commit run --all-files`],
          ["code", String.raw`# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.5.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files`],
          ["p", "A partir daqui, o commit é recusado se o formatador tiver mudado alguma coisa. Corres outra vez e o commit passa. Parece chato durante dois dias e depois deixas de pensar nisso."],
          ["aviso", "Não ponhas a suite de testes inteira no pre-commit. Um gancho que demora um minuto faz com que a equipa comece a usar `--no-verify`, e aí perdeste tudo. Ganchos rápidos localmente, testes completos no servidor."],
          ["h", "Integração contínua: o servidor não se esquece"],
          ["code", String.raw`# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  testes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: ruff check .
      - run: ruff format --check .
      - run: mypy vendas/
      - run: pytest -q`],
          ["p", "Isto corre numa máquina limpa, o que apanha a categoria de erros mais irritante de todas: 'na minha máquina funciona'. Se o teu projeto tem uma dependência que só tu tens instalada, é aqui que ela aparece."],
          ["h", "A ordem importa"],
          ["p", "Põe primeiro o que é rápido e falha mais: linter, depois formatação, depois tipos, e os testes no fim. Assim quem abriu o pull request tem a resposta em vinte segundos em vez de cinco minutos."],
          ["obra", "Um repositório de portefólio com um `ci.yml` e o crachá verde no README responde sozinho à pergunta 'este candidato já trabalhou com práticas de equipa'. Custa quinze minutos a montar e é o melhor retorno de tempo do curso inteiro."],
          ["h", "Quando a CI fica vermelha"],
          ["lista", [
            "Lê o registo de baixo para cima até à primeira falha real, tal como um traceback.",
            "Reproduz localmente o comando exato que falhou, sem inventar variações.",
            "Se falha na CI e passa localmente, suspeita de versões, variáveis de ambiente e ordem dos testes.",
            "Nunca desligues o teste para ficar verde. Corrige ou marca como falha conhecida com bilhete aberto."
          ]],
          ["aviso", "Segredos não vão para o ficheiro de configuração da CI. Vão para os segredos do repositório e chegam como variáveis de ambiente. Um token num ficheiro YAML é público a partir do momento em que o commit existe."]
        ],
        quiz: [
          { p: "A CI falha e localmente passa tudo. Que hipótese testas primeiro?", o: ["A CI está avariada","Diferença de ambiente: versão de Python, dependências ou variáveis em falta","O código está errado na mesma"], c: 1,
            e: "A máquina da CI arranca limpa. Costuma faltar uma dependência que só tens instalada globalmente, ou uma variável de ambiente que só existe no teu ficheiro `.env`." }
        ],
        exercicio: {
          ficheiro: "pipeline.py",
          enunciado: "Escreve `resumo_pipeline(passos)`, que recebe uma lista de tuplos `(nome, passou)` pela ordem de execução. Devolve `\"verde\"` se passaram todos, `\"vermelho: nome\"` com o nome do primeiro passo que falhou, e `\"sem passos\"` para a lista vazia. Depois, põe o teu caderno numa CI a sério: publica-o no GitHub e acrescenta um `.github/workflows/ci.yml`, como o da aula, que corre `ruff check`, `ruff format --check` e `pytest`.",
          inicio: String.raw`def resumo_pipeline(passos):
    pass
`,
          testes: String.raw`from pipeline import resumo_pipeline


def test_tudo_a_passar():
    assert resumo_pipeline([("ruff", True), ("pytest", True)]) == "verde"


def test_primeiro_a_falhar():
    passos = [("ruff", True), ("mypy", False), ("pytest", False)]
    assert resumo_pipeline(passos) == "vermelho: mypy"


def test_falha_logo_no_inicio():
    assert resumo_pipeline([("ruff", False)]) == "vermelho: ruff"


def test_sem_passos():
    assert resumo_pipeline([]) == "sem passos"
`
        }
      }
  ]
});
