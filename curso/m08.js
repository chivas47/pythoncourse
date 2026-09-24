/* Módulo 8: Funções a sério. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 8, fase: 2, titulo: "Funções a sério",
  objetivo: "Escrever funções que outras pessoas conseguem usar, ler e confiar.",
  licoes: [
      {
        id: "8.1", titulo: "*args, **kwargs e argumentos só por nome", min: 13, estado: "pronta",
        meta: "No fim: escreves funções que aceitam um número variável de argumentos e obrigas a nomear os que se confundem.",
        blocos: [
          ["p", "Na aula 3.3 viste argumentos por nome e valores por omissão. Há mais três ferramentas para desenhar a assinatura de uma função, e vais encontrá-las em todo o código de bibliotecas."],
          ["h", "Número variável de argumentos"],
          ["p", "`*args` apanha os argumentos posicionais a mais num tuplo. `**kwargs` apanha os nomeados num dicionário. Os nomes não são obrigatórios, mas usa-os: toda a gente os reconhece."],
          ["py", String.raw`def total(*valores, moeda="euros", **extras):
    print("valores:", valores)
    print("extras:", extras)
    return f"{sum(valores)} {moeda}"

print(total(10, 20, 5, moeda="USD", cliente="Ana"))`],
          ["p", "O contrário também funciona: um asterisco espalha uma lista em argumentos, dois asteriscos espalham um dicionário em argumentos nomeados."],
          ["py", String.raw`def dividir(a, b):
    return a / b

par = [10, 4]
nomeados = {"a": 9, "b": 3}
print(dividir(*par))
print(dividir(**nomeados))`],
          ["h", "Obrigar a nomear"],
          ["p", "Tudo o que vier depois de um `*` sozinho na assinatura só pode ser passado por nome. Usa-o em booleanos: `enviar(email, forcar=True)` lê-se, `enviar(email, True)` não."],
          ["code", String.raw`def exportar(dados, *, formato="csv", comprimir=False):
    ...

exportar(dados, formato="json")     # ok
exportar(dados, "json")             # TypeError`],
          ["aviso", "Com um booleano posicional, `enviar(email, True)`, ninguém sabe o que o `True` quer dizer sem ir ler a definição, e trocar a ordem de dois booleanos não dá erro nenhum. Põe um `*` antes deles e obriga a nomear."],
          ["obra", "`**kwargs` a atravessar cinco funções é como se perde a noção do que uma API aceita. Usa-o em decoradores e camadas de compatibilidade; nas funções de negócio, escreve os argumentos com nome e tipo."]
        ],
        quiz: [
          { p: "`def f(*a): return a`. O que devolve `f(1, 2)`?", o: ["[1, 2]","(1, 2)","1"], c: 1,
            e: "Os argumentos posicionais a mais chegam num tuplo." },
          { p: "`def g(x, *, y): ...`. O que acontece com `g(1, 2)`?", o: ["y fica 2","TypeError","y fica None"], c: 1,
            e: "Depois do `*`, `y` só pode ser passado por nome: `g(1, y=2)`." }
        ],
        exercicio: {
          ficheiro: "assinaturas.py",
          enunciado: "Escreve três funções. `total(*valores, desconto=0)` soma os valores que receber, aplica a percentagem de desconto e arredonda a duas casas. `etiqueta(nome, **atributos)` devolve `\"camisola (cor=azul, tamanho=M)\"`, com os atributos por ordem alfabética, ou só o nome se não houver atributos. `exportar(dados, *, formato=\"csv\")` devolve `\"3 registos em csv\"` e só aceita o formato por nome.",
          inicio: String.raw`def total(valores, desconto=0):
    pass


def etiqueta(nome, atributos):
    pass


def exportar(dados, formato="csv"):
    pass
`,
          testes: String.raw`import pytest

from assinaturas import etiqueta, exportar, total


def test_total_de_varios_valores():
    assert total(10, 20, 5) == 35


def test_total_sem_valores():
    assert total() == 0


def test_total_com_desconto_por_nome():
    assert total(50, 50, desconto=10) == 90.0


def test_etiqueta_com_atributos_ordenados():
    assert etiqueta("camisola", tamanho="M", cor="azul") == "camisola (cor=azul, tamanho=M)"


def test_etiqueta_sem_atributos():
    assert etiqueta("meias") == "meias"


def test_exportar():
    assert exportar([1, 2, 3], formato="json") == "3 registos em json"
    assert exportar([]) == "0 registos em csv"


def test_formato_so_por_nome():
    with pytest.raises(TypeError):
        exportar([1], "json")
`
        }
      },
      {
        id: "8.2", titulo: "Funções como valores e lambda", min: 14, estado: "pronta",
        meta: "No fim: passas funções como argumento, escreves lambdas pequenas e usas key= em max, min e sorted.",
        blocos: [
          ["p", "Uma função é um valor como os outros. Pode ser guardada numa variável, posta numa lista, passada a outra função e devolvida por outra função."],
          ["py", String.raw`def dobro(n):
    return n * 2


f = dobro
print(f(21))
print(dobro)`],
          ["h", "Passar uma função a outra"],
          ["py", String.raw`def aplicar(funcao, valores):
    return [funcao(v) for v in valores]


print(aplicar(dobro, [1, 2, 3]))
print(aplicar(str.upper, ["a", "b"]))
print(aplicar(len, ["olá", "mundo"]))`],
          ["p", "Repara que se passa `dobro`, sem parênteses. Com parênteses estarias a chamá-la e a passar o resultado. `aplicar` não sabe que função recebeu: sabe só que a pode chamar com um valor."],
          ["h", "lambda"],
          ["py", String.raw`print(aplicar(lambda n: n + 1, [1, 2, 3]))
print(aplicar(lambda nome: nome.strip().title(), [" ana ", "RUI"]))`],
          ["p", "`lambda n: n + 1` é uma função sem nome, que recebe `n` e devolve `n + 1`. Só pode ter uma expressão. Serve para funções pequenas passadas como argumento; se precisa de nome ou de mais do que uma linha, é um `def`."],
          ["h", "Funções do Python que recebem funções"],
          ["py", String.raw`palavras = ["banana", "kiwi", "maçã"]
print(max(palavras, key=len))
print(sorted(palavras, key=len))
print(list(map(str.upper, palavras)))
print(list(filter(lambda p: len(p) > 4, palavras)))`],
          ["p", "O `key=` recebe uma função que é chamada para cada elemento: `max` compara os resultados dela, mas devolve o elemento original. `map` e `filter` existem e vais vê-los em código alheio; uma compreensão costuma ler-se melhor."],
          ["aviso", "`sorted(palavras, key=len())` dá `TypeError`: chamaste o `len` sem argumentos em vez de o passares. Funções passam-se sem parênteses."],
          ["obra", "Passar funções como argumento é como funcionam o `key=` das ordenações, os callbacks das interfaces, as rotas de um servidor web e os decoradores do módulo 16. Quando isto te for natural, metade da magia das bibliotecas deixa de o ser."]
        ],
        quiz: [
          { p: "O que dá `max([\"aa\", \"b\", \"ccc\"], key=len)`?", o: ["3","\"ccc\"","\"b\""], c: 1,
            e: "Compara pelo comprimento mas devolve o elemento, não o comprimento." },
          { p: "Qual é a diferença entre `aplicar(dobro, v)` e `aplicar(dobro(), v)`?", o: ["Nenhuma","A primeira passa a função; a segunda chama-a sem argumentos e dá erro","A segunda é mais rápida"], c: 1,
            e: "Com parênteses, a função corre ali mesmo. `dobro()` sem argumentos dá `TypeError`." }
        ],
        exercicio: {
          ficheiro: "funcoes_valor.py",
          enunciado: "Escreve três funções que recebem outras funções. `aplicar_a_todos(funcao, valores)` devolve a lista dos resultados. `contar_se(condicao, valores)` conta os valores para os quais `condicao(valor)` é verdadeira. `o_maior_por(valores, chave)` devolve o elemento com o maior `chave(elemento)`, ou `None` se a lista estiver vazia.",
          inicio: String.raw`def aplicar_a_todos(funcao, valores):
    pass


def contar_se(condicao, valores):
    pass


def o_maior_por(valores, chave):
    pass
`,
          testes: String.raw`from funcoes_valor import aplicar_a_todos, contar_se, o_maior_por


def test_aplicar_com_funcao_do_python():
    assert aplicar_a_todos(len, ["olá", "mundo"]) == [3, 5]


def test_aplicar_com_lambda():
    assert aplicar_a_todos(lambda n: n * n, [1, 2, 3]) == [1, 4, 9]


def test_contar_se():
    assert contar_se(lambda n: n % 2 == 0, [1, 2, 4, 7]) == 2


def test_contar_se_com_metodo():
    assert contar_se(str.isdigit, ["1", "a", "22"]) == 2


def test_o_maior_por():
    alunos = [{"nome": "Ana", "nota": 14}, {"nome": "Rui", "nota": 17}]
    assert o_maior_por(alunos, lambda a: a["nota"])["nome"] == "Rui"


def test_o_maior_de_lista_vazia():
    assert o_maior_por([], len) is None
`
        }
      },
      {
        id: "8.3", titulo: "Ordenar e filtrar dados", min: 14, estado: "pronta",
        meta: "No fim: ordenas listas de dicionários por vários campos sem escrever um único ciclo.",
        blocos: [
          ["p", "Na aula 6.3 ordenaste listas de números. Os dados reais são listas de registos, e ordenam-se por um dos campos. É aqui que o `key=` da aula anterior se paga."],
          ["h", "A chave é tudo"],
          ["p", "O argumento `key` recebe uma função que, para cada elemento, devolve o valor por que se ordena. Não ordena pelo que a função devolve para o mostrar: ordena por esse valor e devolve os elementos originais."],
          ["py", String.raw`alunos = [
    {"nome": "Rui", "nota": 14},
    {"nome": "Ana", "nota": 17},
    {"nome": "Bea", "nota": 14},
]

por_nota = sorted(alunos, key=lambda a: a["nota"], reverse=True)
for a in por_nota:
    print(a["nome"], a["nota"])`],
          ["p", "Uma `lambda` é uma função anónima de uma expressão. Serve para isto e pouco mais: se precisas de mais do que uma linha, dá-lhe um nome com `def`."],
          ["h", "Vários critérios"],
          ["p", "Devolve um tuplo na chave e ordena-se pelo primeiro elemento, desempatando pelo segundo. Para inverter só um dos critérios com números, põe-lhe um sinal menos."],
          ["py", String.raw`alunos = [
    {"nome": "Rui", "nota": 14},
    {"nome": "Ana", "nota": 17},
    {"nome": "Bea", "nota": 14},
]

ordenados = sorted(alunos, key=lambda a: (-a["nota"], a["nome"]))
print([a["nome"] for a in ordenados])`],
          ["obra", "Relatórios que mudam de ordem entre execuções são um pesadelo de depuração. Ordena sempre com um critério de desempate estável, tipicamente o identificador ou o nome. Um relatório reprodutível é um relatório em que se pode confiar."],
          ["h", "Filtrar, mínimo e máximo"],
          ["py", String.raw`alunos = [
    {"nome": "Rui", "nota": 14},
    {"nome": "Ana", "nota": 17},
    {"nome": "Zé", "nota": 8},
]

positivas = [a for a in alunos if a["nota"] >= 10]
melhor = max(alunos, key=lambda a: a["nota"])
print(len(positivas), melhor["nome"])`],
          ["aviso", "`sorted` em texto ordena por código de caracteres: as maiúsculas vêm antes das minúsculas e os acentos vêm depois de tudo. Para listas de nomes em português usa `key=str.lower` no mínimo, e `locale` ou `unicodedata` se a ordem tiver de aparecer ao utilizador."],
          ["py", String.raw`nomes = ["ana", "Álvaro", "Bruno", "zé"]
print(sorted(nomes))
print(sorted(nomes, key=str.lower))`]
        ],
        quiz: [
          { p: "`melhores = alunos.sort(key=lambda a: a['nota'])` e depois `len(melhores)` rebenta. Porquê?", o: ["A lambda está errada","`sort()` ordena no sítio e devolve None","Faltam parênteses"], c: 1,
            e: "Convenção de Python: métodos que alteram o objeto devolvem `None`. Querias `sorted(alunos, key=...)`, que devolve uma lista nova." }
        ],
        exercicio: {
          ficheiro: "ranking.py",
          enunciado: "Escreve `top(alunos, n)`, que recebe uma lista de dicionários com `nome` e `nota` e devolve os nomes dos `n` alunos com melhor nota, da mais alta para a mais baixa, desempatando pelo nome por ordem alfabética.",
          inicio: String.raw`def top(alunos, n):
    pass
`,
          testes: String.raw`from ranking import top

ALUNOS = [
    {"nome": "Rui", "nota": 14},
    {"nome": "Ana", "nota": 17},
    {"nome": "Bea", "nota": 14},
    {"nome": "Zé", "nota": 8},
]


def test_melhor_primeiro():
    assert top(ALUNOS, 1) == ["Ana"]


def test_desempata_por_nome():
    assert top(ALUNOS, 3) == ["Ana", "Bea", "Rui"]


def test_n_maior_do_que_a_lista():
    assert len(top(ALUNOS, 10)) == 4


def test_n_zero_devolve_vazio():
    assert top(ALUNOS, 0) == []


def test_nao_altera_a_lista():
    copia = list(ALUNOS)
    top(ALUNOS, 2)
    assert ALUNOS == copia
`
        }
      },
      {
        id: "8.4", titulo: "Anotações de tipo", min: 12, estado: "pronta",
        meta: "No fim: escreves assinaturas que o editor e a equipa conseguem ler sem abrir o corpo da função.",
        blocos: [
          ["p", "Uma anotação diz que tipo se espera. Python não a verifica em execução: quem verifica é o teu editor e uma ferramenta chamada mypy, no módulo 20. O valor é documentação que não fica desatualizada em silêncio."],
          ["py", String.raw`def area(largura: float, altura: float) -> float:
    return largura * altura

print(area(3, 4.5))
print(area.__annotations__)`],
          ["h", "Coleções"],
          ["p", "Desde o Python 3.9 escreve-se com os tipos normais: `list[str]`, `dict[str, int]`, `tuple[int, int]`. As versões antigas usavam `List` e `Dict` do módulo `typing` e ainda as vais encontrar em código com uns anos."],
          ["code", String.raw`def nomes_por_turma(alunos: list[dict]) -> dict[str, list[str]]:
    ...

def coordenadas() -> tuple[float, float]:
    ...

def primeiro(valores: list[int]) -> int | None:
    return valores[0] if valores else None`],
          ["p", "`int | None` significa inteiro ou nada. É a anotação mais útil de todas, porque obriga quem lê a lembrar-se de que o resultado pode não existir. Em código mais antigo aparece como `Optional[int]`."],
          ["h", "Onde vale mesmo a pena"],
          ["lista", [
            "Nas funções públicas de um módulo, que outras pessoas vão chamar.",
            "Em qualquer coisa que devolva `None` em certos casos.",
            "Em estruturas de dados que atravessam camadas, como as `dataclasses` do módulo 14.",
            "Em código que já te enganou uma vez sobre o que recebia."
          ]],
          ["obra", "Num projeto novo em 2026, uma função sem anotações levanta perguntas em revisão. Não porque falte rigor teórico: é porque sem elas ninguém sabe se `dados` é uma lista de dicionários, um dicionário de listas ou um objeto, sem ir ler três ficheiros."],
          ["aviso", "Anotar não valida. `def idade(n: int)` chamada com a string 'trinta' corre na mesma até rebentar mais à frente. Validação de dados que vêm de fora faz-se com código, ou com Pydantic, no módulo 25."],
          ["py", String.raw`def dobro(n: int) -> int:
    return n * 2

print(dobro("ab"))`],
          ["p", "Aquele resultado é 'abab'. Correu, não é o que querias, e nenhuma anotação te salvou. Foi mypy que ficou vermelho, no computador de quem correu mypy."]
        ],
        quiz: [
          { p: "Que anotação escolhes para uma função que procura um utilizador e pode não o encontrar?", o: ["`-> dict`","`-> dict | None`","`-> bool`"], c: 1,
            e: "O tipo tem de mostrar a ausência. Assim o editor avisa quem se esquecer de tratar o caso, que é exatamente onde nascem os `AttributeError: 'NoneType' object has no attribute`." }
        ],
        exercicio: {
          ficheiro: "anotacoes.py",
          enunciado: "Escreve `media(valores)`, anotada: recebe `list[float]` e devolve `float | None`, devolvendo `None` quando a lista está vazia. As anotações fazem parte do exercício, e os testes verificam-nas.",
          inicio: String.raw`def media(valores):
    pass
`,
          testes: String.raw`from anotacoes import media


def test_media():
    assert media([10.0, 20.0]) == 15.0


def test_lista_vazia_devolve_none():
    assert media([]) is None


def test_argumento_anotado_como_lista_de_floats():
    assert str(media.__annotations__.get("valores")) == "list[float]"


def test_retorno_anotado_com_float_e_none():
    retorno = str(media.__annotations__.get("return"))
    assert "float" in retorno and "None" in retorno
`
        }
      },
      {
        id: "8.5", titulo: "Código que outros leem: nomes, docstrings e ruff", min: 16, estado: "pronta",
        meta: "No fim: escolhes nomes que dispensam comentários, escreves docstrings e usas o ruff para formatar e apanhar problemas antes de guardar.",
        blocos: [
          ["p", "O código é lido muitas mais vezes do que é escrito, e quase sempre por outra pessoa, ou por ti daqui a seis meses, que é a mesma coisa. Três ferramentas fazem a maior parte da diferença: bons nomes, docstrings e um formatador com um linter."],
          ["h", "Nomes"],
          ["lista", [
            "Funções com um verbo: `calcular_total`, `enviar_fatura`, `ler_config`.",
            "Booleanos e funções que devolvem booleanos com cara de pergunta: `e_valido`, `tem_stock`.",
            "Coleções no plural e elementos no singular: `for aluno in alunos:`.",
            "Constantes em maiúsculas; as classes, que vêm no módulo 14, em `PalavrasJuntas`.",
            "Sem abreviaturas que só tu entendes: `qtd` passa, `q` e `tmp2` não."
          ]],
          ["obra", "Uma função com sete argumentos, cento e vinte linhas e três responsabilidades é o que vais encontrar em código antigo e o que não deves escrever. A regra que passa em revisão: um nome que descreve o que faz, e se o nome tiver um 'e' no meio, são duas funções."],
          ["h", "Docstrings"],
          ["aviso", "Docstring, entre três aspas, na primeira linha do corpo. Explica o que a função devolve e o que faz em casos limite, não como está implementada. É o que aparece no `help()` e no editor de quem te lê."],
          ["code", String.raw`def media(valores):
    """Devolve a média dos valores. Levanta ValueError se a lista estiver vazia."""
    if not valores:
        raise ValueError("lista vazia")
    return sum(valores) / len(valores)`],
          ["py", String.raw`def area(largura, altura):
    """Devolve a área de um retângulo com estas medidas."""
    return largura * altura


help(area)
print(area.__doc__)`],
          ["h", "PEP 8 e o ruff"],
          ["p", "O PEP 8 é o guia de estilo do Python: quatro espaços, duas linhas em branco entre funções, espaços à volta dos operadores, e muito mais. Ninguém o decora, porque há ferramentas que o aplicam. O `ruff`, que instalaste na aula 1.6, faz duas coisas: `ruff format` arruma o código, `ruff check` procura problemas."],
          ["code", "(.venv) $ ruff format m08\n1 file reformatted\n(.venv) $ ruff check m08\nm08/limpeza.py:1:8: F401 [*] `os` imported but unused\nm08/limpeza.py:9:5: F841 Local variable `total` is assigned to but never used\nFound 2 errors.\n[*] 1 fixable with the `--fix` option."],
          ["p", "Cada aviso diz o ficheiro, a linha, a coluna, o código da regra e a explicação. `F401` é um import que não serve para nada, `F841` uma variável calculada e nunca usada, que muitas vezes esconde um bug. `ruff check --fix` corrige os que são seguros de corrigir sozinho, e `ruff rule F841` explica uma regra."],
          ["p", "A partir desta aula, a rotina dos exercícios inclui `ruff format` e `ruff check` antes do commit."],
          ["aviso", "Não desligues um aviso só para ele se calar. Se achas que está errado, lê primeiro a explicação da regra. Na maioria das vezes, o aviso tem razão."],
          ["obra", "Nas equipas, o formatador corre sozinho antes de cada commit e no servidor de integração contínua, como vais ver na aula 20.3. As discussões sobre espaços e aspas nas revisões acabaram no dia em que alguém o ligou. O que sobra para ti é o que nenhuma ferramenta faz: nomes e estrutura."]
        ],
        quiz: [
          { p: "O que deve dizer uma docstring?", o: ["Como a função está implementada, passo a passo","O que a função devolve e o que faz nos casos limite","Quem a escreveu e quando"], c: 1,
            e: "Quem chama precisa de saber o quê, não o como. O como está no código, e o quem e quando estão no git." },
          { p: "O `ruff check` mostra `F401 'os' imported but unused`. O que fazes?", o: ["Desligo a regra","Apago o import, que não está a ser usado","Ignoro, não é um erro"], c: 1,
            e: "Um import inútil engana quem lê, que vai procurar onde é usado. `ruff check --fix` apaga-o por ti." }
        ],
        exercicio: {
          ficheiro: "limpeza.py",
          enunciado: "Este código funciona e é ilegível. Arruma-o sem mudar o que ele faz: a função passa a chamar-se `produtos_acima_de(produtos, limite)`, ganha uma docstring e nomes decentes lá dentro, o import inútil desaparece e a indentação passa a ser de quatro espaços. Corre o `ruff format` e o `ruff check` até não haver avisos. A função devolve os nomes dos produtos com preço acima do limite, pela ordem original.",
          inicio: String.raw`import os
def f(l,x):
  r=[]
  for i in l:
      if i['preco']>x: r.append(i['nome'])
  return r
`,
          testes: String.raw`import inspect

import limpeza
from limpeza import produtos_acima_de

PRODUTOS = [
    {"nome": "teclado", "preco": 39.9},
    {"nome": "cabo", "preco": 4.5},
    {"nome": "monitor", "preco": 180.0},
]


def test_filtra_pelo_limite():
    assert produtos_acima_de(PRODUTOS, 10) == ["teclado", "monitor"]


def test_nada_acima():
    assert produtos_acima_de(PRODUTOS, 1000) == []


def test_nomes_dos_parametros():
    assert list(inspect.signature(produtos_acima_de).parameters) == ["produtos", "limite"]


def test_tem_docstring():
    assert produtos_acima_de.__doc__ and produtos_acima_de.__doc__.strip()


def test_o_nome_antigo_desapareceu():
    assert not hasattr(limpeza, "f")


def test_sem_import_inutil():
    assert not hasattr(limpeza, "os")


def test_indentacao_de_quatro_espacos():
    for linha in inspect.getsource(limpeza).splitlines():
        espacos = len(linha) - len(linha.lstrip(" "))
        assert espacos % 4 == 0, linha
`
        }
      }
  ]
});
