/* Módulo 18: Algoritmos e complexidade. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 18, fase: 3, titulo: "Algoritmos e complexidade",
  objetivo: "Perceber quanto custa o teu código e resolver os problemas clássicos das entrevistas.",
  licoes: [
      {
        id: "18.1", titulo: "Contar operações: ler O(n) sem matemática", min: 16, estado: "pronta",
        meta: "No fim: olhas para um ciclo e dizes como é que ele se porta com mil vezes mais dados.",
        blocos: [
          ["p", "Complexidade não é matemática, é um hábito: contar quantas vezes a linha de dentro corre, em função do tamanho dos dados. Chama-se `n` ao tamanho e escreve-se o resultado como O de qualquer coisa. É tudo."],
          ["py", String.raw`dados = list(range(200))

operacoes = 0
for a in dados:
    for b in dados:
        operacoes += 1

print("n =", len(dados))
print("operações =", operacoes)
print("ou seja, n ao quadrado:", len(dados) ** 2)`],
          ["p", "Duplica o `200` para `400` e o número de operações fica quatro vezes maior. É isso, e só isso, que a notação captura: como é que o custo cresce quando os dados crescem."],
          ["h", "A tabela que interessa"],
          ["lista", [
            "**O(1)**, constante: aceder a `lista[5]`, a `dicionario[\"chave\"]`, fazer `append`. O tamanho não importa.",
            "**O(log n)**, logarítmico: pesquisa binária. Duplicar os dados acrescenta **um** passo.",
            "**O(n)**, linear: percorrer tudo uma vez. `sum`, `max`, `x in lista`.",
            "**O(n log n)**: ordenar. É o custo de `sorted` e é difícil de evitar.",
            "**O(n²)**, quadrático: um ciclo dentro de outro sobre os mesmos dados. É aqui que os scripts morrem.",
            "**O(2ⁿ)**: experimentar todas as combinações. Só serve para `n` muito pequeno."
          ]],
          ["code", String.raw`n = 1 000          n = 1 000 000
O(1)          1                    1
O(log n)     10                   20
O(n)      1 000            1 000 000
O(n log n) 10 000           20 000 000
O(n²)  1 000 000  1 000 000 000 000`],
          ["p", "Olha para a última célula. Um algoritmo quadrático sobre um milhão de registos não é lento: é impossível. Nenhuma máquina melhor te salva disso."],
          ["h", "O custo das operações que já usas"],
          ["lista", [
            "`lista[i]`: constante. `lista.append(x)`: constante.",
            "`x in lista`: linear, percorre até encontrar.",
            "`x in set` e `x in dicionario`: constante, vai direto por dispersão.",
            "`lista.insert(0, x)` e `lista.pop(0)`: lineares, empurram tudo o resto. Para uma fila usa `collections.deque`.",
            "`sorted(lista)`: n log n.",
            "`\"abc\" in texto`: proporcional ao tamanho do texto."
          ]],
          ["h", "A memória também conta"],
          ["p", "`[x * 2 for x in milhao]` constrói uma lista com um milhão de elementos na memória. O gerador equivalente, com parênteses curvos, guarda um de cada vez. A complexidade de espaço é a mesma conversa, aplicada à memória, e é a diferença entre um script que corre e um que é morto pelo sistema."],
          ["obra", "A pergunta quase garantida numa entrevista é 'qual é a complexidade da tua solução?'. Não querem uma demonstração: querem 'é linear, porque percorro a lista uma vez e cada consulta ao dicionário é constante'. Uma frase. Treina-a em voz alta nos exercícios deste módulo."],
          ["aviso", "A complexidade conta operações, não segundos. Um ciclo linear com uma consulta à base de dados em cada volta é muito pior do que um ciclo quadrático em memória sobre cem elementos. Usa a notação para escolher algoritmos e o relógio para decidir se vale a pena (aula 22.5)."]
        ],
        quiz: [
          { p: "Tens duas listas de dez mil elementos e, para cada elemento de A, verificas `if x in B`. Quantas comparações no pior caso?", o: ["Vinte mil","Cem milhões","Dez mil"], c: 1,
            e: "Dez mil elementos vezes uma procura linear de dez mil. Transformar B num `set` uma vez custa dez mil e faz as procuras caírem para constantes: cem milhões passam a vinte mil." }
        ],
        exercicio: {
          ficheiro: "duplicados.py",
          enunciado: "Escreve `tem_duplicados(itens)`, que diz se há algum elemento repetido. Tem de ser linear: há um teste com vinte mil elementos e limite de tempo que a solução com um ciclo dentro de outro não passa.",
          inicio: String.raw`def tem_duplicados(itens):
    pass
`,
          testes: String.raw`import time

import pytest

from duplicados import tem_duplicados


@pytest.mark.parametrize("itens, esperado", [
    ([1, 2, 3], False),
    ([1, 2, 1], True),
    ([], False),
    ([7], False),
    (["a", "b", "a"], True),
    ([1, 2, 3, 3], True),
])
def test_casos(itens, esperado):
    assert tem_duplicados(itens) is esperado


def test_linear_e_nao_quadratico():
    grande = list(range(20000))
    inicio = time.perf_counter()
    assert tem_duplicados(grande) is False
    assert time.perf_counter() - inicio < 0.5
`
        }
      },
      {
        id: "18.2", titulo: "Pesquisa: linear, binária e índices", min: 17, estado: "pronta",
        meta: "No fim: escolhes entre percorrer, cortar ao meio e perguntar diretamente, e sabes justificar a escolha.",
        blocos: [
          ["p", "Há três maneiras de encontrar uma coisa, e a escolha entre elas é metade das decisões de desempenho que vais tomar: percorrer tudo, cortar ao meio, ou ir direto."],
          ["h", "Percorrer: simples e linear"],
          ["py", String.raw`def procurar(itens, alvo):
    for i, item in enumerate(itens):
        if item == alvo:
            return i
    return -1

print(procurar(["ana", "rui", "eva"], "eva"))`],
          ["p", "Não precisa de nada: nem ordem, nem preparação. Para cem elementos é a resposta certa e não se fala mais nisso."],
          ["h", "Cortar ao meio: pesquisa binária"],
          ["p", "Se a lista estiver **ordenada**, comparas com o elemento do meio e deitas fora metade. Depois outra metade. Um milhão de elementos resolve-se em vinte comparações."],
          ["py", String.raw`def binaria(ordenados, alvo):
    baixo, alto = 0, len(ordenados) - 1
    passos = 0
    while baixo <= alto:
        passos += 1
        meio = (baixo + alto) // 2
        if ordenados[meio] == alvo:
            return meio, passos
        if ordenados[meio] < alvo:
            baixo = meio + 1
        else:
            alto = meio - 1
    return -1, passos

milhao = list(range(1000000))
print(binaria(milhao, 999999))
print(binaria(milhao, -1))`],
          ["aviso", "Os três bugs clássicos da pesquisa binária: usar `while baixo < alto` e falhar o último elemento; escrever `alto = meio` em vez de `meio - 1` e ficar num ciclo infinito; e esquecer que a lista tem de estar ordenada, o que devolve respostas erradas em silêncio, que é o pior tipo de erro."],
          ["h", "O módulo bisect, que já faz isto"],
          ["py", String.raw`import bisect

datas = [1, 3, 5, 7, 9, 11]
print(bisect.bisect_left(datas, 7))
print(bisect.bisect_left(datas, 6))

# todos os valores entre 3 e 9, inclusive
i = bisect.bisect_left(datas, 3)
j = bisect.bisect_right(datas, 9)
print(datas[i:j])

bisect.insort(datas, 6)
print(datas)`],
          ["p", "Repara no último exemplo: pesquisa binária serve para intervalos, não só para 'existe ou não'. Encontrar todos os registos entre duas datas numa lista ordenada é isto, e é a razão de existir dos índices das bases de dados (aula 24.1)."],
          ["h", "Ir direto: o dicionário como índice"],
          ["py", String.raw`clientes = [{"id": 3, "nome": "Ana"}, {"id": 7, "nome": "Rui"}]

# construído uma vez, custa n
por_id = {c["id"]: c for c in clientes}

# cada consulta passa a ser constante
print(por_id[7]["nome"])
print(por_id.get(99, "não existe"))`],
          ["h", "A regra de decisão"],
          ["lista", [
            "Uma procura só, dados que mudam sempre: **linear**. Não construas nada.",
            "Muitas procuras pelos mesmos dados: **dicionário de índice**, construído uma vez.",
            "Precisas de ordem, intervalos, ou do vizinho mais próximo: **lista ordenada com `bisect`**.",
            "Ordenar custa n log n. Só compensa se vais procurar muitas vezes, ou se já precisavas da ordem por outra razão."
          ]],
          ["obra", "A correção mais frequente que um júnior faz no primeiro mês é esta: um ciclo que procura numa lista dentro de outro ciclo, trocado por um dicionário construído antes. Quatro horas passam a dois minutos com quinze linhas. Sabe reconhecer o padrão e vais parecer mágico."],
          ["aviso", "Construir um índice para o usar duas vezes é trabalho a mais. Custa memória e uma passagem pelos dados. A pergunta é sempre a mesma: quantas vezes é que eu vou procurar aqui dentro?"]
        ],
        quiz: [
          { p: "Lista ordenada com um milhão de elementos. Quantos passos no pior caso com pesquisa binária?", o: ["Cerca de mil","Cerca de vinte","Um milhão"], c: 1,
            e: "Cada passo deita metade fora. Dois elevado a vinte é mais de um milhão, portanto vinte cortes chegam. É por isso que O(log n) é praticamente de graça." }
        ],
        exercicio: {
          ficheiro: "pesquisa_binaria.py",
          enunciado: "Implementa `busca_binaria(ordenados, alvo)`, que devolve o índice do alvo numa lista ordenada, ou `-1` se não existir. Não podes usar `.index()`, `in` nem o módulo `bisect`: há um teste com uma lista grande e limite de tempo que uma procura linear não passa.",
          inicio: String.raw`def busca_binaria(ordenados, alvo):
    pass
`,
          testes: String.raw`import inspect
import time

import pytest

from pesquisa_binaria import busca_binaria


@pytest.mark.parametrize("lista, alvo, esperado", [
    ([1, 3, 5, 7, 9], 5, 2),
    ([1, 3, 5], 1, 0),
    ([1, 3, 5], 5, 2),
    ([1, 3, 5], 4, -1),
    ([1, 3, 5], 0, -1),
    ([1, 3, 5], 9, -1),
    ([], 1, -1),
    ([2], 2, 0),
    ([2], 3, -1),
])
def test_casos(lista, alvo, esperado):
    assert busca_binaria(lista, alvo) == esperado


def test_nao_percorre_a_lista_toda():
    grande = list(range(0, 2_000_000, 2))
    inicio = time.perf_counter()
    for _ in range(100):
        assert busca_binaria(grande, 1_999_998) == 999_999
    assert time.perf_counter() - inicio < 0.2


def test_sem_atalhos():
    codigo = inspect.getsource(busca_binaria)
    assert "bisect" not in codigo and ".index(" not in codigo
`
        }
      },
      {
        id: "18.3", titulo: "Ordenar: estabilidade, custo e chaves", min: 15, estado: "pronta",
        meta: "No fim: sabes quanto custa ordenar, o que é uma ordenação estável e porque é que nunca escreves a tua.",
        blocos: [
          ["p", "Já sabes usar `sorted` com `key` (aula 8.3). Esta aula é sobre o que está por baixo, que é o que te perguntam em entrevista e o que decide se o teu relatório demora um segundo ou um minuto."],
          ["h", "Quanto custa"],
          ["p", "Ordenar por comparações custa n log n, e está provado que não dá para fazer melhor. O `sorted` do Python usa Timsort, que é n log n no pior caso e quase linear quando os dados já vêm parcialmente ordenados, o que acontece muito na vida real."],
          ["lista", [
            "Mil elementos: cerca de dez mil comparações.",
            "Um milhão: cerca de vinte milhões. Segundos, não horas.",
            "Ordenar duas vezes os mesmos dados custa o dobro. Ordena uma vez e guarda."
          ]],
          ["h", "Estável quer dizer que os empates não se mexem"],
          ["p", "Uma ordenação estável mantém a ordem original entre elementos com a mesma chave. O `sorted` do Python é estável, e isso dá-te um truque que quase ninguém conhece: para ordenar por vários critérios, podes ordenar várias vezes, do critério menos importante para o mais importante."],
          ["py", String.raw`pessoas = [
    {"nome": "Rui", "dept": "vendas"},
    {"nome": "Ana", "dept": "tecnico"},
    {"nome": "Bea", "dept": "vendas"},
]

por_nome = sorted(pessoas, key=lambda p: p["nome"])
final = sorted(por_nome, key=lambda p: p["dept"])
print([(p["dept"], p["nome"]) for p in final])`],
          ["p", "Dentro de cada departamento, os nomes ficaram por ordem, porque a segunda ordenação não desfez a primeira. Com um tuplo na chave fazias o mesmo numa linha; com duas passagens consegues misturar critérios que não cabem num tuplo, como um que precise de `reverse=True` sobre texto."],
          ["h", "A chave é calculada uma vez por elemento"],
          ["py", String.raw`import time

registos = [{"nome": f"n{i}", "valor": (i * 7919) % 1000} for i in range(20000)]

t = time.perf_counter()
sorted(registos, key=lambda r: r["valor"])
print(f"com key: {time.perf_counter() - t:.4f}s")`],
          ["p", "Isto chama-se decorate-sort-undecorate e o Python já o faz por ti: a função `key` corre n vezes, não n log n vezes. É por isso que `key` é sempre melhor do que uma função de comparação, e é por isso que `functools.cmp_to_key` só se usa para código antigo que já tinha um comparador."],
          ["h", "Porque é que escreves uma ordenação uma vez na vida"],
          ["p", "Para perceber o custo. Depois nunca mais: o `sorted` está escrito em C, é estável, e já viu mais casos limite do que tu alguma vez verás. Escrever a tua ordenação em código de produção é um sinal de alarme numa revisão."],
          ["py", String.raw`def ordenacao_por_insercao(itens):
    resultado = list(itens)
    for i in range(1, len(resultado)):
        atual = resultado[i]
        j = i - 1
        while j >= 0 and resultado[j] > atual:
            resultado[j + 1] = resultado[j]
            j -= 1
        resultado[j + 1] = atual
    return resultado

print(ordenacao_por_insercao([5, 2, 9, 1]))`],
          ["p", "É quadrática: cada elemento pode ter de recuar até ao princípio. Para listas pequenas é rápida na prática, e é por isso que o Timsort a usa lá dentro, em pedaços curtos."],
          ["obra", "Em entrevista, 'implementa uma ordenação' é quase sempre um teste de raciocínio, não de memória. A melhor resposta começa por 'em produção usava `sorted`, que é Timsort, n log n e estável; se quer ver-me implementar uma, faço inserção, que é quadrática mas simples'. Dizes as duas coisas e mostras que sabes escolher."],
          ["aviso", "Ordenar uma lista de dicionários por uma chave que às vezes é `None` rebenta com `TypeError`. Trata a ausência na própria `key`, por exemplo `key=lambda r: (r[\"data\"] is None, r[\"data\"])`, que põe os vazios todos no fim."]
        ],
        quiz: [
          { p: "O que ganhas com uma ordenação estável?", o: ["É mais rápida","Elementos com a mesma chave mantêm a ordem que tinham, o que te deixa ordenar por critérios em passagens sucessivas","Usa menos memória"], c: 1,
            e: "Estabilidade é uma garantia de comportamento, não de velocidade. Sem ela, o resultado dos empates seria arbitrário e o teu relatório mudava de ordem entre execuções." }
        ],
        exercicio: {
          ficheiro: "ordenacao.py",
          enunciado: "Implementa `ordenar_por(registos, chave)`, que devolve uma lista nova ordenada pelo valor dessa chave, sem alterar a recebida. Tem de ser estável: os empates mantêm a ordem original. Escreve o algoritmo à mão, por inserção: o `sorted` está bloqueado nos testes e o `.sort()` também não vale.",
          inicio: String.raw`def ordenar_por(registos, chave):
    pass
`,
          testes: String.raw`import inspect
from unittest import mock

import pytest

from ordenacao import ordenar_por


@pytest.fixture(autouse=True)
def sem_sorted():
    with mock.patch("builtins.sorted", side_effect=AssertionError("escreve o algoritmo à mão")):
        yield


def test_ordena_pela_chave():
    assert ordenar_por([{"n": 3}, {"n": 1}], "n") == [{"n": 1}, {"n": 3}]


def test_estavel_nos_empates():
    registos = [{"n": 1, "id": "a"}, {"n": 1, "id": "b"}, {"n": 0, "id": "c"}]
    assert [r["id"] for r in ordenar_por(registos, "n")] == ["c", "a", "b"]


@pytest.mark.parametrize("lista", [[], [{"n": 5}], [{"n": 1}, {"n": 2}]])
def test_casos_pequenos(lista):
    assert ordenar_por(lista, "n") == lista


def test_ordem_inversa():
    assert ordenar_por([{"n": 3}, {"n": 2}, {"n": 1}], "n") == [{"n": 1}, {"n": 2}, {"n": 3}]


def test_ordena_texto():
    assert ordenar_por([{"x": "b"}, {"x": "a"}], "x") == [{"x": "a"}, {"x": "b"}]


def test_nao_altera_a_lista_recebida():
    original = [{"n": 2}, {"n": 1}]
    ordenar_por(original, "n")
    assert original == [{"n": 2}, {"n": 1}]


def test_sem_sort():
    assert ".sort(" not in inspect.getsource(ordenar_por)
`
        }
      },
      {
        id: "18.4", titulo: "Recursão, e quando não usar", min: 16, estado: "pronta",
        meta: "No fim: percorres estruturas encaixadas com recursão e sabes converter para ciclo quando o limite aperta.",
        blocos: [
          ["p", "Uma função recursiva chama-se a si própria. Precisa de duas coisas e falha sempre pela falta de uma delas: um caso base, que devolve sem chamar mais ninguém, e um passo que se aproxima do caso base."],
          ["py", String.raw`def fatorial(n):
    if n <= 1:        # caso base
        return 1
    return n * fatorial(n - 1)   # passo que aproxima

print(fatorial(5))`],
          ["h", "Onde a recursão é mesmo a resposta certa"],
          ["p", "Estruturas em árvore: JSON encaixado, pastas dentro de pastas, categorias com subcategorias, expressões. São coisas definidas em termos de si próprias, e o código que as percorre fica igual à definição."],
          ["py", String.raw`def recolher(estrutura, campo):
    encontrados = []
    if isinstance(estrutura, dict):
        for chave, valor in estrutura.items():
            if chave == campo:
                encontrados.append(valor)
            encontrados.extend(recolher(valor, campo))
    elif isinstance(estrutura, list):
        for item in estrutura:
            encontrados.extend(recolher(item, campo))
    return encontrados

dados = {"nome": "raiz", "filhos": [{"nome": "a", "filhos": [{"nome": "b", "filhos": []}]}]}
print(recolher(dados, "nome"))`],
          ["h", "O limite"],
          ["p", "Cada chamada ocupa uma entrada na pilha e o Python corta a partir de cerca de mil. Não há otimização de chamada final como noutras linguagens: `RecursionError` é o que recebes, e num servidor é o que mata o pedido."],
          ["code", String.raw`import sys
print(sys.getrecursionlimit())   # 1000, tipicamente

def contar(n):
    return 0 if n == 0 else 1 + contar(n - 1)

contar(10000)   # RecursionError: maximum recursion depth exceeded`],
          ["aviso", "Aumentar o limite com `sys.setrecursionlimit` é a solução errada em quase todos os casos: continuas a gastar pilha a sério e o que ganhas é um estouro do interpretador em vez de uma exceção. Converte para ciclo."],
          ["h", "Converter para ciclo com uma pilha explícita"],
          ["py", String.raw`def recolher_iterativo(estrutura, campo):
    encontrados = []
    por_ver = [estrutura]
    while por_ver:
        atual = por_ver.pop()
        if isinstance(atual, dict):
            for chave, valor in atual.items():
                if chave == campo:
                    encontrados.append(valor)
                por_ver.append(valor)
        elif isinstance(atual, list):
            por_ver.extend(atual)
    return encontrados

dados = {"nome": "raiz", "filhos": [{"nome": "a", "filhos": []}]}
print(recolher_iterativo(dados, "nome"))`],
          ["p", "É a mesma ideia: a lista `por_ver` faz o papel da pilha de chamadas. Fica um pouco mais feio e deixa de ter limite de profundidade."],
          ["h", "Memoização: recursão que repete trabalho"],
          ["py", String.raw`import functools, time

def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

@functools.cache
def fib_rapido(n):
    return n if n < 2 else fib_rapido(n - 1) + fib_rapido(n - 2)

t = time.perf_counter(); fib(27); print(f"sem cache: {time.perf_counter() - t:.3f}s")
t = time.perf_counter(); fib_rapido(27); print(f"com cache: {time.perf_counter() - t:.5f}s")`],
          ["p", "A versão sem cache recalcula os mesmos valores milhares de vezes: é exponencial. O decorador `functools.cache` guarda o resultado de cada argumento e transforma-a em linear. Serve para qualquer função pura e cara."],
          ["obra", "Em produção, a recursão aparece em três sítios: percorrer JSON de APIs, percorrer árvores de pastas ou de categorias, e escrever pequenos interpretadores. Tudo o resto costuma ficar mais claro com um ciclo, e o teu revisor vai preferir o ciclo."],
          ["aviso", "Recursão sobre dados que vêm de fora é um risco de segurança: um JSON com dez mil níveis de encaixe rebenta o teu serviço sem esforço nenhum. Se percorres dados de terceiros, ou limitas a profundidade, ou usas a versão iterativa."]
        ],
        quiz: [
          { p: "A tua função recursiva rebenta com `RecursionError` numa árvore de pastas muito funda. O que fazes?", o: ["Aumentas o limite com sys.setrecursionlimit","Converte-la para um ciclo com uma pilha explícita","Apanhas a exceção e ignoras"], c: 1,
            e: "A pilha explícita não tem limite prático e o código fica quase igual. Aumentar o limite empurra o problema até o interpretador estoirar, e aí já não há exceção para apanhar." }
        ],
        exercicio: {
          ficheiro: "recursao.py",
          enunciado: "Escreve `soma_profunda(estrutura)`, que soma todos os números dentro de listas encaixadas a qualquer profundidade. Valores que não sejam números são ignorados, e `True` não conta como número.",
          inicio: String.raw`def soma_profunda(estrutura):
    pass
`,
          testes: String.raw`import pytest

from recursao import soma_profunda


@pytest.mark.parametrize("estrutura, esperado", [
    ([1, 2, 3], 6),
    ([1, [2, [3, [4]]]], 10),
    ([1, "dois", [3]], 4),
    ([], 0),
    ([[], [[]]], 0),
    ([1.5, [2.5]], 4.0),
    ([True, 1], 1),
    ([[-2], 2], 0),
])
def test_casos(estrutura, esperado):
    assert soma_profunda(estrutura) == esperado
`
        }
      },
      {
        id: "18.5", titulo: "Os cinco padrões que caem em entrevistas", min: 20, estado: "pronta",
        meta: "No fim: reconheces a forma do problema em vez de tentares lembrar-te da solução.",
        blocos: [
          ["p", "A maioria dos exercícios técnicos para júnior de Python são cinco formas com roupas diferentes. Não se trata de decorar soluções: trata-se de reconhecer a forma nos primeiros trinta segundos."],
          ["h", "1. Contar com um dicionário"],
          ["py", String.raw`from collections import Counter

palavras = ["a", "b", "a", "c", "a"]
print(Counter(palavras))
print(Counter(palavras).most_common(2))

# à mão, que é o que te podem pedir
contagens = {}
for p in palavras:
    contagens[p] = contagens.get(p, 0) + 1
print(contagens)`],
          ["p", "Aparece como: elemento mais frequente, verificar anagramas, contar ocorrências, detetar duplicados. É linear e resolve quase sempre."],
          ["h", "2. Conjunto de vistos"],
          ["py", String.raw`def primeiro_repetido(itens):
    vistos = set()
    for item in itens:
        if item in vistos:
            return item
        vistos.add(item)
    return None

print(primeiro_repetido([1, 2, 3, 2, 1]))`],
          ["p", "Troca uma procura linear por uma constante à custa de memória. É o truque mais rentável que existe."],
          ["h", "3. Dois ponteiros"],
          ["py", String.raw`def par_com_soma(ordenados, alvo):
    esquerda, direita = 0, len(ordenados) - 1
    while esquerda < direita:
        soma = ordenados[esquerda] + ordenados[direita]
        if soma == alvo:
            return (ordenados[esquerda], ordenados[direita])
        if soma < alvo:
            esquerda += 1
        else:
            direita -= 1
    return None

print(par_com_soma([1, 3, 4, 7, 11], 11))`],
          ["p", "Serve em listas ordenadas: encontrar pares, juntar duas listas ordenadas, verificar palíndromos. Linear e sem memória extra."],
          ["h", "4. Janela deslizante"],
          ["py", String.raw`def maior_soma(numeros, k):
    soma = sum(numeros[:k])
    melhor = soma
    for i in range(k, len(numeros)):
        soma += numeros[i] - numeros[i - k]   # entra um, sai um
        melhor = max(melhor, soma)
    return melhor

print(maior_soma([1, 2, 5, 1, 3], 2))`],
          ["p", "Sempre que o enunciado disser 'consecutivos', 'seguidos' ou 'num intervalo de tempo', é isto. A ideia é não recalcular: ajusta a soma com o que entra e o que sai."],
          ["h", "5. Agrupar por chave"],
          ["py", String.raw`from collections import defaultdict

vendas = [("ana", 10), ("rui", 5), ("ana", 7)]
por_pessoa = defaultdict(list)
for nome, valor in vendas:
    por_pessoa[nome].append(valor)
print(dict(por_pessoa))`],
          ["p", "É o mais útil dos cinco no trabalho a sério: agrupar linhas por cliente, por dia, por categoria. `defaultdict(list)` poupa-te o `if chave not in dicionario`."],
          ["h", "Como responder, em voz alta"],
          ["lista", [
            "Repete o enunciado por palavras tuas e confirma. Metade dos erros nasce aqui.",
            "Dá um exemplo pequeno e a resposta esperada. Escreve-o.",
            "Diz a solução de força bruta e a sua complexidade. Mostra que sabes que existe.",
            "Propõe a melhoria e diz qual dos cinco padrões vais usar e porquê.",
            "Escreve. Depois corre os casos limite em voz alta: vazio, um elemento, tudo igual."
          ]],
          ["obra", "Quase nenhuma empresa portuguesa pede a um júnior de Python para inverter árvores binárias. O que pedem é contar, agrupar, filtrar, e cruzar duas fontes de dados que não combinam. Os cinco padrões acima cobrem isso e cobrem o teu primeiro ano de trabalho."],
          ["aviso", "Decorar duzentas soluções não funciona: numa entrevista dão-te a duzentas e uma. Reconhecer cinco formas funciona, porque a forma é o que se repete."]
        ],
        quiz: [
          { p: "'Encontra o maior total de vendas em sete dias seguidos.' Que padrão é este?", o: ["Dois ponteiros","Janela deslizante","Agrupar por chave"], c: 1,
            e: "'Seguidos' e um tamanho fixo é sempre janela deslizante. Somar cada janela do zero é quadrático; ajustar com o que entra e o que sai é linear." }
        ],
        exercicio: {
          ficheiro: "janela.py",
          enunciado: "Escreve `maior_soma_janela(numeros, k)`, que devolve a maior soma de `k` elementos consecutivos. Se `k` for menor que 1 ou maior que a lista, levanta `ValueError`. Tem de ser linear: somar cada janela do princípio não passa o teste de tempo.",
          inicio: String.raw`def maior_soma_janela(numeros, k):
    pass
`,
          testes: String.raw`import time

import pytest

from janela import maior_soma_janela


@pytest.mark.parametrize("numeros, k, esperado", [
    ([1, 2, 5, 1], 2, 7),
    ([3, -1, 4], 1, 4),
    ([1, 2], 2, 3),
    ([-5, -1, -3], 2, -4),
    ([9, 9, 1, 1], 2, 18),
])
def test_casos(numeros, k, esperado):
    assert maior_soma_janela(numeros, k) == esperado


@pytest.mark.parametrize("k", [0, -1, 3])
def test_k_invalido(k):
    with pytest.raises(ValueError):
        maior_soma_janela([1, 2], k)


def test_linear_e_nao_quadratico():
    grande = list(range(30000))
    inicio = time.perf_counter()
    assert maior_soma_janela(grande, 3000) == sum(range(27000, 30000))
    assert time.perf_counter() - inicio < 0.5
`
        }
      },
      {
        id: "18.6", titulo: "Pilhas, filas e heaps", min: 16, estado: "pronta",
        meta: "No fim: escolhes entre pilha, fila e heap pelo que o problema pede, e resolves com elas os clássicos dos parênteses, dos k maiores e das prioridades.",
        blocos: [
          ["p", "Três estruturas aparecem uma e outra vez, em código de produção e em entrevistas. Não são tipos novos: são formas de usar os que já conheces."],
          ["h", "Pilha: o último a entrar é o primeiro a sair"],
          ["py", String.raw`pilha = []
pilha.append("a")
pilha.append("b")
pilha.append("c")
print(pilha.pop(), pilha.pop(), pilha)`],
          ["p", "Uma lista com `append` e `pop()` é uma pilha, e as duas operações são instantâneas. Serve para desfazer ações, para percorrer árvores sem recursão (aula 18.4) e para verificar se os parênteses de uma expressão estão bem fechados, que é o exercício desta aula."],
          ["h", "Fila: o primeiro a entrar é o primeiro a sair"],
          ["py", String.raw`from collections import deque

fila = deque()
fila.append("Ana")
fila.append("Rui")
print(fila.popleft(), list(fila))`],
          ["p", "Para filas usa-se a `deque` da aula 17.1. Numa lista, `pop(0)` obriga a deslocar todos os outros elementos, e com uma fila grande isso passa de instantâneo a lento."],
          ["h", "Heap: o mais pequeno sempre à mão"],
          ["py", String.raw`import heapq

tarefas = []
heapq.heappush(tarefas, (2, "responder a emails"))
heapq.heappush(tarefas, (1, "corrigir o bug em produção"))
heapq.heappush(tarefas, (3, "arrumar a secretária"))
print(heapq.heappop(tarefas))
print(heapq.nsmallest(2, [7, 1, 9, 3]), heapq.nlargest(2, [7, 1, 9, 3]))`],
          ["p", "Um heap é uma lista organizada de forma que o menor elemento está sempre na posição 0. Acrescentar e tirar custam O(log n), muito menos do que reordenar a lista inteira de cada vez. `nlargest(k, ...)` dá os k maiores sem ordenar tudo. Com tuplos `(prioridade, coisa)`, o heap é uma fila de prioridades."],
          ["aviso", "Com prioridades iguais, o `heapq` compara o segundo elemento do tuplo, e se forem dicionários ou objetos sem ordem, rebenta com `TypeError`. A solução habitual é meter um contador no meio, `(prioridade, ordem_de_chegada, coisa)`, que também garante que os empates saem pela ordem de chegada."],
          ["obra", "'Os dez clientes com mais encomendas de um ficheiro de dez milhões de linhas' resolve-se com um `Counter` e um `nlargest`, sem ordenar os dez milhões. Filas de tarefas por prioridade, agendadores e o algoritmo de caminhos mais curtos usam heaps por dentro."]
        ],
        quiz: [
          { p: "Precisas de processar pedidos pela ordem em que chegaram, com muitos pedidos. Que estrutura usas?", o: ["Uma lista com pop(0)","Uma deque com popleft()","Um heap"], c: 1,
            e: "A `deque` tira do início em tempo constante. A lista funciona, e fica mais lenta quanto maior for a fila." }
        ],
        exercicio: {
          ficheiro: "estruturas.py",
          enunciado: "Escreve três funções. `parenteses_equilibrados(texto)` diz se os `()`, `[]` e `{}` do texto abrem e fecham pela ordem certa, ignorando os outros caracteres, com uma pilha. `k_maiores(valores, k)` devolve os k maiores, do maior para o menor, com o `heapq`. `por_prioridade(tarefas)` recebe pares `(prioridade, nome)` e devolve os nomes pela ordem em que se fazem: a prioridade mais baixa primeiro e, entre iguais, a que chegou primeiro, usando um heap.",
          inicio: String.raw`import heapq


def parenteses_equilibrados(texto):
    pass


def k_maiores(valores, k):
    pass


def por_prioridade(tarefas):
    pass
`,
          testes: String.raw`import pytest

from estruturas import k_maiores, parenteses_equilibrados, por_prioridade


@pytest.mark.parametrize("texto", ["", "()", "([]{})", "f(a[1], {b: 2})", "sem parenteses"])
def test_equilibrados(texto):
    assert parenteses_equilibrados(texto) is True


@pytest.mark.parametrize("texto", ["(", ")", "(]", "([)]", "{{}", "())("])
def test_desequilibrados(texto):
    assert parenteses_equilibrados(texto) is False


def test_k_maiores():
    assert k_maiores([5, 1, 9, 3, 7], 3) == [9, 7, 5]


def test_k_maior_que_a_lista():
    assert k_maiores([2, 1], 5) == [2, 1]


def test_por_prioridade():
    tarefas = [(2, "emails"), (1, "bug"), (3, "arrumar"), (1, "cliente")]
    assert por_prioridade(tarefas) == ["bug", "cliente", "emails", "arrumar"]


def test_por_prioridade_vazio():
    assert por_prioridade([]) == []
`
        }
      }
  ]
});
