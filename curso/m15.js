/* Módulo 15: Iteradores e geradores. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 15, fase: 3, titulo: "Iteradores e geradores",
  objetivo: "Perceber o que o for faz por dentro e processar dados que não cabem em memória.",
  licoes: [
      {
        id: "15.1", titulo: "Como o for funciona: iteráveis e iteradores", min: 15, estado: "pronta",
        meta: "No fim: sabes o que o for faz por dentro, usas iter e next, percebes porque é que alguns objetos só se percorrem uma vez e escreves uma classe iterável.",
        blocos: [
          ["p", "O `for` funciona com listas, strings, dicionários, ficheiros, `range`, `zip`... Todos têm uma coisa em comum: são iteráveis. Um iterável sabe dar um iterador, com `iter()`, e um iterador sabe dar o elemento seguinte, com `next()`, até se acabarem."],
          ["py", String.raw`numeros = [10, 20]
it = iter(numeros)
print(next(it))
print(next(it))
print(next(it))`],
          ["p", "Quando não há mais elementos, `next` levanta `StopIteration`. É assim que o `for` sabe que acabou. Por dentro, faz isto:"],
          ["code", String.raw`it = iter(coisa)
while True:
    try:
        item = next(it)
    except StopIteration:
        break
    ...  # o corpo do teu for`],
          ["h", "Iteradores esgotam-se"],
          ["py", String.raw`pares = zip("ab", [1, 2])
print(list(pares))
print(list(pares))

numeros = [1, 2, 3]
print(list(numeros))
print(list(numeros))`],
          ["p", "Uma lista é iterável mas não é um iterador: cada `for` pede-lhe um iterador novo, e por isso podes percorrê-la as vezes que quiseres. `zip`, `enumerate`, `map` e os ficheiros abertos devolvem iteradores, que se gastam: a segunda volta já não tem nada."],
          ["h", "Uma classe iterável"],
          ["py", String.raw`class Contagem:
    def __init__(self, ate):
        self.atual = 0
        self.ate = ate

    def __iter__(self):
        return self

    def __next__(self):
        if self.atual >= self.ate:
            raise StopIteration
        self.atual += 1
        return self.atual


for n in Contagem(3):
    print(n)
print(sum(Contagem(4)))`],
          ["p", "`__iter__` devolve o iterador, aqui o próprio objeto, e `__next__` dá o elemento seguinte ou levanta `StopIteration`. Escrever isto à mão é raro: a próxima aula mostra o `yield`, que faz o mesmo em três linhas. Mas é este protocolo que explica todo o resto."],
          ["aviso", "Guardar um `zip`, um `map` ou um ficheiro aberto numa variável e percorrê-la duas vezes dá zero resultados na segunda, sem erro. Se precisas de duas passagens, guarda numa lista com `list(...)`."],
          ["obra", "O `for`, o `sum`, o `sorted`, o `list`, o `in` e o desempacotamento aceitam qualquer iterável. Uma função escrita para 'qualquer iterável' em vez de 'uma lista' funciona igual com ficheiros, geradores e resultados de uma base de dados, sem mudar uma linha."]
        ],
        quiz: [
          { p: "`z = zip([1, 2], \"ab\")`. Chamas `list(z)` duas vezes. O que dá a segunda?", o: ["O mesmo que a primeira","[]","StopIteration"], c: 1,
            e: "`zip` devolve um iterador, que a primeira chamada gastou. O `list` apanha o `StopIteration` e devolve uma lista vazia." }
        ],
        exercicio: {
          ficheiro: "iteracao.py",
          enunciado: "Escreve três coisas. A classe `ContagemDecrescente(inicio)`, um iterador que produz `inicio`, `inicio - 1`, ..., até 1. `primeiros(iteravel, n)`, que devolve a lista dos primeiros n elementos usando `iter` e `next`, sem fatias, parando mais cedo se o iterável acabar e sem consumir mais do que n elementos. `pares_consecutivos(iteravel)`, que devolve a lista dos pares de elementos seguidos: `[1, 2, 3]` dá `[(1, 2), (2, 3)]`, e tem de funcionar também com iteradores.",
          inicio: String.raw`class ContagemDecrescente:
    def __init__(self, inicio):
        pass


def primeiros(iteravel, n):
    pass


def pares_consecutivos(iteravel):
    pass
`,
          testes: String.raw`import itertools

from iteracao import ContagemDecrescente, pares_consecutivos, primeiros


def test_contagem_decrescente():
    assert list(ContagemDecrescente(3)) == [3, 2, 1]


def test_contagem_de_zero():
    assert list(ContagemDecrescente(0)) == []


def test_contagem_funciona_com_next():
    it = iter(ContagemDecrescente(2))
    assert next(it) == 2
    assert next(it) == 1


def test_primeiros():
    assert primeiros([5, 6, 7, 8], 2) == [5, 6]


def test_primeiros_de_um_infinito():
    assert primeiros(itertools.count(10), 3) == [10, 11, 12]


def test_primeiros_quando_ha_menos():
    assert primeiros("ab", 5) == ["a", "b"]


def test_primeiros_nao_consome_a_mais():
    it = iter([1, 2, 3, 4])
    primeiros(it, 2)
    assert next(it) == 3


def test_pares_consecutivos():
    assert pares_consecutivos([1, 2, 3]) == [(1, 2), (2, 3)]


def test_pares_de_um_iterador():
    assert pares_consecutivos(iter("abc")) == [("a", "b"), ("b", "c")]


def test_pares_de_menos_de_dois():
    assert pares_consecutivos([1]) == []
    assert pares_consecutivos([]) == []
`
        }
      },
      {
        id: "15.2", titulo: "yield e avaliação preguiçosa", min: 16, estado: "pronta",
        meta: "No fim: processas um ficheiro maior do que a memória da máquina sem o carregar todo.",
        blocos: [
          ["p", "Uma função com `yield` não devolve um valor: devolve um gerador. O corpo só corre quando alguém pede o próximo elemento, e pára exatamente na linha do `yield` até lhe pedirem outro."],
          ["py", String.raw`def contar(ate):
    print("comecei")
    for n in range(1, ate + 1):
        print("vou produzir", n)
        yield n
    print("acabei")

g = contar(3)
print("ainda não correu nada")
print(next(g))
print(next(g))
print(list(g))`],
          ["p", "Repara na ordem das mensagens. O 'comecei' só apareceu no primeiro `next`. Um gerador é uma receita, não um tabuleiro de bolos."],
          ["h", "Porque é que isto importa"],
          ["p", "Uma lista com 40 milhões de linhas ocupa gigabytes. Um gerador ocupa uma linha de cada vez. É a diferença entre um script que corre num portátil e um script que morre com `MemoryError`."],
          ["code", String.raw`# carrega o ficheiro todo para memória
def linhas_ma(caminho):
    with open(caminho, encoding="utf-8") as f:
        return f.readlines()

# produz linha a linha
def linhas_boa(caminho):
    with open(caminho, encoding="utf-8") as f:
        for linha in f:
            yield linha.rstrip("\n")`],
          ["h", "Encadear geradores"],
          ["p", "Cada passo é um gerador e nenhum guarda nada. Os dados atravessam a cadeia um a um, como numa linha de montagem. Este padrão é o que se usa para processar ficheiros grandes e fluxos de eventos."],
          ["py", String.raw`def numeros():
    for n in range(1, 11):
        yield n

def so_pares(fonte):
    for n in fonte:
        if n % 2 == 0:
            yield n

def ao_quadrado(fonte):
    for n in fonte:
        yield n * n

print(list(ao_quadrado(so_pares(numeros()))))
print(sum(ao_quadrado(so_pares(numeros()))))`],
          ["p", "`yield from` delega noutro iterável e evita um ciclo de repetição. Vais encontrá-lo na aula 23.1, na função que percorre as páginas de uma API."],
          ["py", String.raw`def tudo(*colecoes):
    for c in colecoes:
        yield from c

print(list(tudo([1, 2], (3, 4), "ab")))`],
          ["aviso", "Um gerador esgota-se: depois de o percorrer uma vez fica vazio, sem aviso nenhum. Se precisas de percorrer duas vezes, guarda numa lista com `list(...)` e assume o custo em memória, conscientemente."],
          ["py", String.raw`g = (n * n for n in range(4))
print(list(g))
print(list(g))`],
          ["obra", "Em código de dados vais ver funções que devolvem geradores como convenção. O sinal de aviso é quando alguém escreve `len(gerador)`, que rebenta, ou percorre o mesmo gerador em dois sítios e recebe zero resultados no segundo. Sabendo isto, poupas uma tarde."]
        ],
        quiz: [
          { p: "Um colega diz que o script dele rebenta com MemoryError a ler um CSV de 6 GB. Que mudança propões primeiro?", o: ["Comprar mais memória","Ler linha a linha com um gerador em vez de carregar tudo","Dividir o ficheiro à mão"], c: 1,
            e: "Streaming em vez de carregamento. Quase todo o processamento de ficheiros é sequencial e não precisa de ter tudo em memória ao mesmo tempo." }
        ],
        exercicio: {
          ficheiro: "geradores.py",
          enunciado: "Escreve o gerador `linhas_validas(linhas)`, que produz, uma a uma, as linhas sem espaços nas pontas, ignorando as vazias e as que começam por `#` (depois de tirados os espaços). Tem de ser um gerador, não uma função que devolve uma lista.",
          inicio: String.raw`def linhas_validas(linhas):
    pass
`,
          testes: String.raw`import inspect

from geradores import linhas_validas

LINHAS = ["  olá  ", "", "# comentário", "mundo", "   ", "  # outro"]


def test_e_uma_funcao_geradora():
    assert inspect.isgeneratorfunction(linhas_validas)


def test_limpa_e_filtra():
    assert list(linhas_validas(LINHAS)) == ["olá", "mundo"]


def test_entrada_vazia():
    assert list(linhas_validas([])) == []


def test_produz_uma_de_cada_vez():
    assert next(linhas_validas(LINHAS)) == "olá"


def test_nao_le_mais_do_que_precisa():
    lidas = []

    def fonte():
        for linha in ["a", "b", "c"]:
            lidas.append(linha)
            yield linha

    next(linhas_validas(fonte()))
    assert lidas == ["a"]
`
        }
      },
      {
        id: "15.3", titulo: "itertools útil", min: 12, estado: "pronta",
        meta: "No fim: resolves agrupamentos e cortes com a biblioteca padrão em vez de ciclos à mão.",
        blocos: [
          ["p", "`itertools` é um conjunto de ferramentas que trabalham sobre iteráveis sem construir listas. Não precisas de as saber todas: quatro resolvem quase tudo o que vais encontrar."],
          ["h", "groupby: agrupar em sequência"],
          ["aviso", "`groupby` agrupa elementos consecutivos, não iguais em todo o lado. Se os dados não estiverem ordenados pela mesma chave, o resultado vem partido em pedaços e ninguém te avisa. Ordena primeiro, sempre."],
          ["py", String.raw`from itertools import groupby

vendas = [
    {"loja": "Porto", "valor": 80},
    {"loja": "Lisboa", "valor": 120},
    {"loja": "Porto", "valor": 20},
]

chave = lambda v: v["loja"]
for loja, grupo in groupby(sorted(vendas, key=chave), key=chave):
    itens = list(grupo)
    print(loja, len(itens), sum(i["valor"] for i in itens))`],
          ["p", "Repara no `list(grupo)`: o grupo também é um iterador preguiçoso e desaparece assim que avanças para o grupo seguinte. É a pegadela clássica desta função."],
          ["h", "chain: juntar sem copiar"],
          ["py", String.raw`from itertools import chain

semana1 = [10, 12]
semana2 = [8]
semana3 = [15, 3]

print(sum(chain(semana1, semana2, semana3)))
print(list(chain.from_iterable([semana1, semana2, semana3])))`],
          ["h", "islice: cortar um iterador"],
          ["p", "Não podes fatiar um gerador com `[:5]`. `islice` faz isso, e é a forma de espreitar as primeiras linhas de um ficheiro enorme sem o ler todo."],
          ["py", String.raw`from itertools import islice

def infinito():
    n = 0
    while True:
        yield n
        n += 1

print(list(islice(infinito(), 5)))
print(list(islice(infinito(), 10, 15)))`],
          ["h", "count e cycle, com cuidado"],
          ["py", String.raw`from itertools import count, cycle, islice

print(list(islice(count(100, 10), 4)))
print(list(islice(cycle("ABC"), 7)))`],
          ["p", "São infinitos. Sem `islice` ou um `break`, o teu programa nunca mais acaba. Usa-os para gerar identificadores ou distribuir trabalho de forma rotativa."],
          ["h", "Alternativas fora do itertools"],
          ["lista", [
            "`collections.Counter` para contar ocorrências.",
            "`collections.defaultdict(list)` para agrupar sem ordenar, que é o que eu escolho em código de todos os dias.",
            "`zip(*lista)` para transpor pares em duas listas.",
            "`enumerate` para posição e valor, da aula 6.5."
          ]],
          ["py", String.raw`from collections import defaultdict

vendas = [("Porto", 80), ("Lisboa", 120), ("Porto", 20)]

por_loja = defaultdict(list)
for loja, valor in vendas:
    por_loja[loja].append(valor)

print(dict(por_loja))`],
          ["obra", "Em revisão de código, um ciclo de quinze linhas a agrupar dicionários vai receber o comentário 'isto é um defaultdict'. Não é pedantismo: menos código escrito à mão é menos código onde esconder um erro de contagem."]
        ],
        quiz: [
          { p: "`groupby` sobre uma lista de vendas devolve a mesma loja em três grupos separados. Porquê?", o: ["Bug do itertools","A lista não estava ordenada pela chave de agrupamento","Faltou converter para lista"], c: 1,
            e: "`groupby` só junta elementos consecutivos. Ou ordenas antes pela mesma chave, ou usas `defaultdict`, que não se importa com a ordem." }
        ],
        exercicio: {
          ficheiro: "agrupar_vendas.py",
          enunciado: "Escreve duas funções. `agrupar(vendas)` recebe uma lista de dicionários com `loja` e `valor` e devolve um dicionário normal (não um `defaultdict`) de loja para a lista de valores, pela ordem em que aparecem. `primeiras_linhas(linhas, n)` devolve a lista das primeiras n linhas de um iterável que pode ser enorme ou infinito, usando `islice`.",
          inicio: String.raw`from collections import defaultdict
from itertools import islice


def agrupar(vendas):
    pass


def primeiras_linhas(linhas, n):
    pass
`,
          testes: String.raw`import itertools

from agrupar_vendas import agrupar, primeiras_linhas

VENDAS = [
    {"loja": "Porto", "valor": 80},
    {"loja": "Lisboa", "valor": 120},
    {"loja": "Porto", "valor": 20},
]


def test_agrupa_por_loja():
    assert agrupar(VENDAS)["Porto"] == [80, 20]


def test_mantem_as_outras_lojas():
    assert agrupar(VENDAS) == {"Porto": [80, 20], "Lisboa": [120]}


def test_devolve_um_dict_normal():
    assert type(agrupar(VENDAS)) is dict


def test_lista_vazia():
    assert agrupar([]) == {}


def test_primeiras_linhas_de_um_infinito():
    assert primeiras_linhas(itertools.count(1), 3) == [1, 2, 3]


def test_primeiras_linhas_quando_ha_menos():
    assert primeiras_linhas(["a"], 5) == ["a"]
`
        }
      }
  ]
});
