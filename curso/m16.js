/* Módulo 16: Funções avançadas. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 16, fase: 3, titulo: "Funções avançadas",
  objetivo: "Closures, decoradores e gestores de contexto: o Python que se lê nas bibliotecas, e que passas a escrever.",
  licoes: [
      {
        id: "16.1", titulo: "Funções dentro de funções e closures", min: 15, estado: "pronta",
        meta: "No fim: escreves funções que criam e devolvem funções, usas nonlocal e reconheces a armadilha das funções criadas num ciclo.",
        blocos: [
          ["p", "Uma função pode definir outra dentro dela. A de dentro vê as variáveis da de fora e, se for devolvida, leva-as consigo: continua a lembrar-se delas depois de a de fora ter acabado. A isto chama-se closure."],
          ["py", String.raw`def multiplicador(fator):
    def multiplicar(n):
        return n * fator

    return multiplicar


dobro = multiplicador(2)
triplo = multiplicador(3)
print(dobro(10), triplo(10))`],
          ["p", "Cada chamada a `multiplicador` cria uma função `multiplicar` nova, com o seu próprio `fator`. A `dobro` lembra-se de 2, a `triplo` de 3. Juntas com a aula 8.2, onde passaste funções como argumento, fechas o círculo: funções também podem ser o resultado."],
          ["h", "nonlocal: alterar a variável de fora"],
          ["py", String.raw`def contador():
    total = 0

    def mais_um():
        nonlocal total
        total += 1
        return total

    return mais_um


c = contador()
print(c(), c(), c())
outro = contador()
print(outro())`],
          ["p", "Sem o `nonlocal`, o `total += 1` dava `UnboundLocalError`, pela mesma regra da aula 3.4: uma atribuição torna o nome local. O `nonlocal` diz que o `total` é o da função de fora. Cada contador tem o seu."],
          ["h", "A armadilha do ciclo"],
          ["py", String.raw`funcoes = []
for i in range(3):
    funcoes.append(lambda: i)
print([f() for f in funcoes])`],
          ["p", "Aparece `[2, 2, 2]`, e não `[0, 1, 2]`. A closure guarda a variável, não o valor que ela tinha: quando as funções são chamadas, o ciclo já acabou e o `i` vale 2. A correção é criar cada função numa chamada própria, com uma fábrica como o `multiplicador` acima. A aula 22.3 tem este erro no catálogo."],
          ["aviso", "`nonlocal` só serve para variáveis de uma função de fora. Para variáveis do módulo seria `global`, e a aula 3.4 explica porque é quase sempre má ideia."],
          ["obra", "As closures são a base dos decoradores das próximas duas aulas, e aparecem em callbacks, em configuração e em fábricas de validadores. Quando uma classe só teria um `__init__` e um método, muitas vezes uma closure diz o mesmo em metade das linhas."]
        ],
        quiz: [
          { p: "O que mostra `print([f() for f in funcoes])` no exemplo do ciclo?", o: ["[0, 1, 2]","[2, 2, 2]","Dá erro"], c: 1,
            e: "As três funções partilham o mesmo `i`, que no fim do ciclo vale 2." }
        ],
        exercicio: {
          ficheiro: "fabricas.py",
          enunciado: "Escreve três fábricas de funções. `multiplicador(fator)` devolve uma função que multiplica pelo fator. `contador(inicio=0)` devolve uma função que, em cada chamada, soma um e devolve o novo valor, e cada contador é independente. `validador_intervalo(minimo, maximo)` devolve uma função que diz se um valor está no intervalo, inclusive.",
          inicio: String.raw`def multiplicador(fator):
    pass


def contador(inicio=0):
    pass


def validador_intervalo(minimo, maximo):
    pass
`,
          testes: String.raw`from fabricas import contador, multiplicador, validador_intervalo


def test_multiplicadores_independentes():
    dobro, triplo = multiplicador(2), multiplicador(3)
    assert (dobro(10), triplo(10)) == (20, 30)


def test_multiplicadores_criados_num_ciclo():
    funcoes = [multiplicador(f) for f in [1, 2, 3]]
    assert [f(1) for f in funcoes] == [1, 2, 3]


def test_contador():
    c = contador()
    assert [c(), c(), c()] == [1, 2, 3]


def test_contadores_independentes():
    a, b = contador(), contador(10)
    a()
    a()
    assert b() == 11
    assert a() == 3


def test_validador():
    e_nota = validador_intervalo(0, 20)
    assert e_nota(0) is True
    assert e_nota(20) is True
    assert e_nota(21) is False
`
        }
      },
      {
        id: "16.2", titulo: "Decoradores: o básico", min: 16, estado: "pronta",
        meta: "No fim: escreves decoradores que embrulham qualquer função, com functools.wraps, e percebes o que o @ faz.",
        blocos: [
          ["p", "Um decorador é uma função que recebe uma função e devolve outra, que a embrulha: faz alguma coisa antes, chama a original, faz alguma coisa depois. O `@` por cima de um `def` é só uma forma curta de o aplicar."],
          ["py", String.raw`def anunciar(funcao):
    def embrulho(*args, **kwargs):
        print(f"a chamar {funcao.__name__}{args}")
        resultado = funcao(*args, **kwargs)
        print(f"devolveu {resultado}")
        return resultado

    return embrulho


@anunciar
def somar(a, b):
    return a + b


print(somar(2, 3))`],
          ["p", "`@anunciar` por cima do `def somar` é exatamente o mesmo que escrever `somar = anunciar(somar)` a seguir. Daí em diante, `somar` é o embrulho, que se lembra da original graças à closure da aula anterior. O `*args, **kwargs` da aula 8.1 deixa o embrulho aceitar qualquer assinatura e passá-la tal e qual."],
          ["h", "functools.wraps"],
          ["py", String.raw`import functools


def anunciar(funcao):
    @functools.wraps(funcao)
    def embrulho(*args, **kwargs):
        return funcao(*args, **kwargs)

    return embrulho


@anunciar
def somar(a, b):
    """Soma dois números."""
    return a + b


print(somar.__name__, somar.__doc__)`],
          ["p", "Sem `wraps`, a função decorada passava a chamar-se `embrulho` e perdia a docstring: os tracebacks, o `help` e os registos ficavam a mentir. Com `@functools.wraps(funcao)` no embrulho, copia o nome e a documentação da original. Põe-no sempre."],
          ["h", "Guardar estado no embrulho"],
          ["py", String.raw`import functools


def contar(funcao):
    @functools.wraps(funcao)
    def embrulho(*args, **kwargs):
        embrulho.chamadas += 1
        return funcao(*args, **kwargs)

    embrulho.chamadas = 0
    return embrulho


@contar
def ola():
    return "olá"


ola()
ola()
print(ola.chamadas)`],
          ["aviso", "Dois esquecimentos clássicos. Sem `return resultado` no embrulho, a função decorada passa a devolver `None`. Sem `return embrulho` no decorador, o nome da função passa a ser `None`, e chamá-la dá `TypeError: 'NoneType' object is not callable`."],
          ["obra", "Vais usar muitos mais decoradores do que escrever: `@pytest.fixture`, `@dataclass`, `@property`, as rotas do FastAPI com `@app.get(\"/\")`, o `@functools.cache`. Saber escrevê-los tira-lhes a magia e deixa-te ler o que fazem quando alguma coisa corre mal."]
        ],
        quiz: [
          { p: "`@d` por cima de `def f(): ...` é equivalente a quê?", o: ["f = d","f = d(f)","d(f())"], c: 1,
            e: "O decorador recebe a função e o nome passa a apontar para o que ele devolver." }
        ],
        exercicio: {
          ficheiro: "decoradores.py",
          enunciado: "Escreve dois decoradores, ambos com `functools.wraps`. `contar_chamadas` conta as chamadas no atributo `chamadas` da função decorada. `memorizar` guarda os resultados num dicionário pelos argumentos posicionais, e numa segunda chamada com os mesmos argumentos devolve o resultado guardado sem voltar a chamar a função original.",
          inicio: String.raw`import functools


def contar_chamadas(funcao):
    pass


def memorizar(funcao):
    pass
`,
          testes: String.raw`from decoradores import contar_chamadas, memorizar


def test_conta_as_chamadas():
    @contar_chamadas
    def ola(nome):
        return f"olá {nome}"

    assert ola.chamadas == 0
    assert ola("Ana") == "olá Ana"
    ola("Rui")
    assert ola.chamadas == 2


def test_mantem_o_nome_e_a_docstring():
    @contar_chamadas
    def somar(a, b):
        """Soma."""
        return a + b

    assert somar.__name__ == "somar"
    assert somar.__doc__ == "Soma."


def test_aceita_argumentos_por_nome():
    @contar_chamadas
    def potencia(base, expoente=2):
        return base**expoente

    assert potencia(3, expoente=3) == 27


def test_memorizar_nao_repete_o_calculo():
    chamadas = []

    @memorizar
    def lento(n):
        chamadas.append(n)
        return n * n

    assert lento(4) == 16
    assert lento(4) == 16
    assert lento(5) == 25
    assert chamadas == [4, 5]


def test_memorizar_mantem_o_nome():
    @memorizar
    def quadrado(n):
        return n * n

    assert quadrado.__name__ == "quadrado"
`
        }
      },
      {
        id: "16.3", titulo: "Decoradores com argumentos e o functools", min: 16, estado: "pronta",
        meta: "No fim: escreves decoradores configuráveis, como um que tenta outra vez, e usas cache e partial da biblioteca padrão.",
        blocos: [
          ["p", "`@repetir(3)` tem parênteses: `repetir(3)` é chamado primeiro e devolve o decorador, que só depois recebe a função. São três funções encaixadas, e lê-se de fora para dentro."],
          ["py", String.raw`import functools


def repetir(vezes):
    def decorador(funcao):
        @functools.wraps(funcao)
        def embrulho(*args, **kwargs):
            for _ in range(vezes):
                resultado = funcao(*args, **kwargs)
            return resultado

        return decorador

    return decorador


@repetir(3)
def ola():
    print("olá")


ola()`],
          ["p", "Encontraste o erro? O `decorador` devolve-se a si próprio em vez do `embrulho`, por isso `ola` passa a ser o `decorador`, e `ola()` rebenta com `TypeError: decorador() missing 1 required positional argument: 'funcao'`. Com três níveis, cada um tem de devolver o seguinte: `repetir` devolve `decorador`, `decorador` devolve `embrulho`, `embrulho` devolve o resultado. Corrige-o no REPL e confirma."],
          ["h", "O caso real: tentar outra vez"],
          ["code", String.raw`import functools
import time


def tentar_de_novo(tentativas=3, espera=0.5):
    def decorador(funcao):
        @functools.wraps(funcao)
        def embrulho(*args, **kwargs):
            for tentativa in range(1, tentativas + 1):
                try:
                    return funcao(*args, **kwargs)
                except ConnectionError:
                    if tentativa == tentativas:
                        raise
                    time.sleep(espera)

        return embrulho

    return decorador


@tentar_de_novo(tentativas=5)
def obter_cotacao(moeda):
    ...`],
          ["h", "O que já vem no functools"],
          ["py", String.raw`from functools import cache, partial


@cache
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)


print(fib(80))

de_binario = partial(int, base=2)
print(de_binario("1010"))`],
          ["p", "`@cache` guarda os resultados pelos argumentos, como o `memorizar` da aula anterior, e transforma o `fib(80)`, que de outra forma não acabava, em instantâneo. `@lru_cache(maxsize=128)` faz o mesmo com um limite de memória. `partial` fixa alguns argumentos de uma função e devolve uma função nova."],
          ["aviso", "Só se põe `@cache` em funções puras. Numa função que lê a hora, consulta uma base de dados ou depende de um ficheiro, o cache devolve para sempre o primeiro resultado. E com argumentos mutáveis, como listas, rebenta com `TypeError: unhashable type`."],
          ["obra", "Um `tentar_de_novo` existe em quase todos os projetos que falam com serviços externos, às vezes escrito à mão, às vezes de uma biblioteca como a `tenacity`. As decisões que importam são as do exercício: quantas vezes, que erros merecem nova tentativa, e o que acontece quando elas se esgotam."]
        ],
        quiz: [
          { p: "Em `@tentar_de_novo(tentativas=3)`, quando é que `tentar_de_novo` corre?", o: ["Em cada chamada da função decorada","Uma vez, quando o def é lido, e devolve o decorador","Nunca"], c: 1,
            e: "O que está depois do `@` é avaliado na definição. É a função que ele devolve que embrulha a tua." }
        ],
        exercicio: {
          ficheiro: "tentativas.py",
          enunciado: "Escreve o decorador `tentar_de_novo(tentativas=3, excecoes=(ConnectionError,))`. A função decorada é chamada até `tentativas` vezes no total enquanto levantar uma das exceções indicadas; se esgotar as tentativas, levanta a última exceção. Qualquer outra exceção sobe logo, sem nova tentativa. Com `tentativas` menor que 1, o próprio `tentar_de_novo` levanta `ValueError`. Usa `functools.wraps`. (Sem esperas entre tentativas, para os testes serem rápidos.)",
          inicio: String.raw`import functools


def tentar_de_novo(tentativas=3, excecoes=(ConnectionError,)):
    pass
`,
          testes: String.raw`import pytest

from tentativas import tentar_de_novo


def falha_primeiro(vezes, excecao=ConnectionError):
    chamadas = []

    def funcao(x):
        chamadas.append(x)
        if len(chamadas) <= vezes:
            raise excecao("falhou")
        return x * 2

    return funcao, chamadas


def test_resulta_a_primeira():
    funcao, chamadas = falha_primeiro(0)
    assert tentar_de_novo()(funcao)(5) == 10
    assert len(chamadas) == 1


def test_tenta_outra_vez_ate_resultar():
    funcao, chamadas = falha_primeiro(2)
    assert tentar_de_novo(tentativas=3)(funcao)(5) == 10
    assert len(chamadas) == 3


def test_desiste_e_levanta_o_ultimo_erro():
    funcao, chamadas = falha_primeiro(10)
    with pytest.raises(ConnectionError):
        tentar_de_novo(tentativas=4)(funcao)(5)
    assert len(chamadas) == 4


def test_outros_erros_sobem_logo():
    funcao, chamadas = falha_primeiro(1, ValueError)
    with pytest.raises(ValueError):
        tentar_de_novo()(funcao)(5)
    assert len(chamadas) == 1


def test_excecoes_configuraveis():
    funcao, chamadas = falha_primeiro(1, TimeoutError)
    assert tentar_de_novo(excecoes=(TimeoutError,))(funcao)(1) == 2


def test_com_arroba_e_nome_preservado():
    @tentar_de_novo(tentativas=2)
    def obter():
        """Vai buscar."""
        return "ok"

    assert obter() == "ok"
    assert obter.__name__ == "obter"


def test_tentativas_invalidas():
    with pytest.raises(ValueError):
        tentar_de_novo(tentativas=0)
`
        }
      },
      {
        id: "16.4", titulo: "Gestores de contexto próprios", min: 15, estado: "pronta",
        meta: "No fim: escreves os teus próprios gestores de contexto, com uma classe ou com @contextmanager, que garantem a limpeza mesmo quando há erros.",
        blocos: [
          ["p", "Desde a aula 12.1 que usas `with open(...)`. O `with` chama `__enter__` à entrada e `__exit__` à saída, e garante a saída mesmo que o bloco rebente. Qualquer classe com esses dois métodos serve."],
          ["py", String.raw`import time


class Cronometro:
    def __enter__(self):
        self.inicio = time.perf_counter()
        return self

    def __exit__(self, tipo, valor, rastreio):
        self.duracao = time.perf_counter() - self.inicio
        return False


with Cronometro() as c:
    sum(range(1_000_000))
print(f"{c.duracao:.4f} s")`],
          ["p", "O que o `__enter__` devolver é o que fica no nome depois do `as`. O `__exit__` recebe o tipo, o valor e o traceback da exceção, se houver, ou três `None`. Devolver `False` deixa a exceção continuar; devolver `True` engoli-la-ia, e quase nunca é o que queres."],
          ["h", "@contextmanager: o mesmo com um gerador"],
          ["py", String.raw`import os
from contextlib import contextmanager


@contextmanager
def na_pasta(caminho):
    antiga = os.getcwd()
    os.chdir(caminho)
    try:
        yield
    finally:
        os.chdir(antiga)


with na_pasta("/"):
    print(os.getcwd())
print(os.getcwd())`],
          ["p", "O que está antes do `yield` é a entrada; o que está depois é a saída; o que o `yield` produz é o que vai para o `as`. O `try` e `finally` à volta do `yield` são o que garante a saída quando o bloco rebenta."],
          ["h", "Os que já existem"],
          ["lista", [
            "`open(...)`: fecha o ficheiro.",
            "`contextlib.suppress(FileNotFoundError)`: ignora esse erro, e só esse, naquele bloco.",
            "`tempfile.TemporaryDirectory()`: cria uma pasta e apaga-a no fim.",
            "`pytest.raises(...)`: é um gestor de contexto, e agora sabes como está feito.",
            "Ligações a bases de dados, na aula 24.2: confirmam ou desfazem a transação."
          ]],
          ["aviso", "Num `@contextmanager` sem `try` e `finally`, a limpeza depois do `yield` não corre quando o bloco levanta uma exceção. É o erro mais comum ao escrevê-los, e só se nota no dia em que alguma coisa falha."],
          ["obra", "Sempre que há um antes e um depois que têm de acontecer os dois, abrir e fechar, bloquear e libertar, começar e confirmar uma transação, é um gestor de contexto. O `with` torna impossível esquecer o depois, e é isso que se procura numa revisão."]
        ],
        quiz: [
          { p: "Porque é que o `yield` de um `@contextmanager` deve estar dentro de `try` e `finally`?", o: ["Por estilo","Para a limpeza correr mesmo que o bloco do with levante uma exceção","Porque o yield não funciona fora de um try"], c: 1,
            e: "A exceção do bloco reaparece no sítio do `yield`. Sem `finally`, o que vem depois não chega a correr." }
        ],
        exercicio: {
          ficheiro: "contextos.py",
          enunciado: "Escreve dois gestores de contexto. A classe `Cronometro`, que guarda em `duracao` os segundos que o bloco demorou (medidos com `time.perf_counter`) e não engole exceções. E `variaveis_de_ambiente(**valores)`, com `@contextmanager`, que define essas variáveis em `os.environ` durante o bloco e, no fim, repõe o que lá estava: os valores antigos voltam, e as variáveis que não existiam desaparecem, mesmo que o bloco rebente.",
          inicio: String.raw`import os
import time
from contextlib import contextmanager


class Cronometro:
    pass


def variaveis_de_ambiente(**valores):
    pass
`,
          testes: String.raw`import os
import time

import pytest

from contextos import Cronometro, variaveis_de_ambiente


def test_cronometro_mede_a_duracao():
    with Cronometro() as c:
        time.sleep(0.02)
    assert 0.015 <= c.duracao < 1


def test_cronometro_nao_engole_erros():
    c = Cronometro()
    with pytest.raises(ZeroDivisionError):
        with c:
            1 / 0
    assert c.duracao >= 0


def test_define_durante_o_bloco(monkeypatch):
    monkeypatch.delenv("CADERNO_MODO", raising=False)
    with variaveis_de_ambiente(CADERNO_MODO="teste"):
        assert os.environ["CADERNO_MODO"] == "teste"
    assert "CADERNO_MODO" not in os.environ


def test_repoe_o_valor_antigo(monkeypatch):
    monkeypatch.setenv("CADERNO_MODO", "producao")
    with variaveis_de_ambiente(CADERNO_MODO="teste"):
        pass
    assert os.environ["CADERNO_MODO"] == "producao"


def test_repoe_mesmo_com_erro(monkeypatch):
    monkeypatch.delenv("CADERNO_CHAVE", raising=False)
    with pytest.raises(RuntimeError):
        with variaveis_de_ambiente(CADERNO_CHAVE="x"):
            raise RuntimeError("falhou a meio")
    assert "CADERNO_CHAVE" not in os.environ
`
        }
      }
  ]
});
