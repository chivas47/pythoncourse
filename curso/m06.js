/* Módulo 6: Listas. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 6, fase: 2, titulo: "Listas",
  objetivo: "Guardar muitos valores numa variável, percorrê-los, alterá-los e transformá-los.",
  licoes: [
      {
        id: "6.1", titulo: "Listas: criar, ler e percorrer", min: 14, estado: "pronta",
        meta: "No fim: crias listas, lês os elementos pela posição, percorres-las com for e constróis listas novas dentro de um ciclo.",
        blocos: [
          ["p", "Uma lista guarda vários valores por ordem, numa só variável. Escreve-se entre parênteses retos, com os elementos separados por vírgulas."],
          ["py", String.raw`compras = ["pão", "leite", "ovos"]
print(compras)
print(len(compras))
print(compras[0], compras[-1])`],
          ["p", "Os índices funcionam como nas strings da aula 5.3: o primeiro é o 0, o último é o -1."],
          ["h", "Percorrer"],
          ["py", String.raw`precos = [2.5, 0.99, 3.2]
total = 0
for p in precos:
    total += p
print(round(total, 2))`],
          ["h", "Acrescentar"],
          ["py", String.raw`nomes = []
nomes.append("Ana")
nomes.append("Rui")
print(nomes, len(nomes))`],
          ["p", "`[]` é a lista vazia. `append` acrescenta um elemento no fim. Ao contrário das strings, as listas podem ser alteradas depois de criadas, e isso vai ter consequências que vais conhecer nas próximas aulas."],
          ["p", "Juntando `for`, `if` e `append` tens o padrão para filtrar: uma lista nova, só com os elementos que interessam."],
          ["py", String.raw`notas = [12, 8, 15, 9, 17]
positivas = []
for n in notas:
    if n >= 10:
        positivas.append(n)
print(positivas)`],
          ["h", "in, sum, max e min"],
          ["py", String.raw`notas = [12, 8, 15, 9, 17]
print(15 in notas)
print(sum(notas), max(notas), min(notas))`],
          ["p", "`sum`, `max` e `min` fazem o que escreveste à mão na aula 5.4. `max([])` rebenta com `ValueError`: numa lista vazia não há maior."],
          ["aviso", "Uma lista pode misturar tipos e o Python não se queixa. Não o faças: uma lista de preços deve ter só preços. Texto e números misturados acabam num `TypeError` dentro de um `sum` ou de um `sorted`, longe de onde a mistura aconteceu."],
          ["obra", "Os dados do trabalho chegam quase sempre em listas: as linhas de um ficheiro, os resultados de uma consulta, os registos de uma resposta de um serviço. Percorrer, filtrar e acumular é o dia a dia."]
        ],
        quiz: [
          { p: "O que dá `[3, 1, 2][-1]`?", o: ["3","2","1"], c: 1,
            e: "`-1` é o último elemento, seja qual for o tamanho da lista." },
          { p: "O que dá `max([])`?", o: ["0","None","ValueError"], c: 2,
            e: "Numa lista vazia não há maior. Se a lista pode estar vazia, verifica antes, ou usa `max(lista, default=None)`." }
        ],
        exercicio: {
          ficheiro: "compras.py",
          enunciado: "Escreve três funções. `resumo(valores)` soma os valores positivos, ignora os negativos e pára assim que encontrar `None`. `acima_de(precos, limite)` devolve uma lista nova com os preços maiores do que o limite, pela ordem original. `mais_caro(precos)` devolve o maior preço, ou `None` se a lista estiver vazia.",
          inicio: String.raw`def resumo(valores):
    pass


def acima_de(precos, limite):
    pass


def mais_caro(precos):
    pass
`,
          testes: String.raw`from compras import acima_de, mais_caro, resumo


def test_resumo_ignora_negativos():
    assert resumo([1, -2, 3]) == 4


def test_resumo_para_no_none():
    assert resumo([1, -2, 3, None, 100]) == 4


def test_resumo_vazio_e_so_none():
    assert resumo([]) == 0
    assert resumo([None]) == 0


def test_acima_de_mantem_a_ordem():
    assert acima_de([5, 20, 3, 15], 10) == [20, 15]


def test_acima_de_nao_inclui_o_limite():
    assert acima_de([10, 11], 10) == [11]


def test_acima_de_nao_altera_a_lista():
    precos = [5, 20]
    acima_de(precos, 10)
    assert precos == [5, 20]


def test_mais_caro():
    assert mais_caro([2.5, 9.9, 3.0]) == 9.9


def test_mais_caro_de_lista_vazia():
    assert mais_caro([]) is None
`
        }
      },
      {
        id: "6.2", titulo: "Fatias e cópias", min: 13, estado: "pronta",
        meta: "No fim: cortas listas e strings com fatias e sabes a diferença entre copiar uma lista e dar-lhe outro nome.",
        blocos: [
          ["p", "Uma fatia tira um pedaço de uma lista: `lista[inicio:fim]`. Inclui o início e exclui o fim, com a mesma lógica do `range`."],
          ["py", String.raw`letras = ["a", "b", "c", "d", "e"]
print(letras[1:3])
print(letras[:2])
print(letras[3:])
print(letras[-2:])
print(letras[::2])
print(letras[::-1])`],
          ["p", "Sem início, começa no princípio; sem fim, vai até ao fim. O terceiro número é o passo, e um passo de -1 dá a lista ao contrário. Tudo isto funciona também com strings."],
          ["py", String.raw`nome = "relatorio.csv"
print(nome[:9], nome[-3:])`],
          ["p", "Ao contrário dos índices, as fatias nunca dão erro: `letras[10:20]` é simplesmente uma lista vazia."],
          ["h", "Copiar não é o mesmo que dar outro nome"],
          ["aviso", "`lista_b = lista_a` não copia nada: são dois nomes para a mesma lista, e alterar uma altera a outra. Para copiar usa `lista_a.copy()` ou `list(lista_a)`. Isto apanha toda a gente uma vez, e há de te apanhar num argumento por omissão no módulo 6."],
          ["py", String.raw`a = [1, 2]
b = a
b.append(3)
print(a)

c = a.copy()
c.append(4)
print(a, c)`],
          ["p", "`b = a` dá um segundo nome à mesma lista. Para ter uma lista nova, independente, copia: `a.copy()`, `list(a)` ou `a[:]`. A aula 9.4 mostra onde isto morde a sério: quando passas uma lista a uma função."],
          ["aviso", "`lista[-n:]` dá os últimos n elementos, exceto quando n é 0: `-0` é `0`, e `lista[0:]` é a lista inteira. É um bug clássico em funções como 'os últimos n registos'. Trata o zero à parte."],
          ["obra", "Paginação é uma fatia: a página 3, com 20 resultados por página, é `resultados[40:60]`. Quando alguém se queixa de que a página 2 repete o último da página 1, há um `+ 1` ou um `- 1` a mais numa fatia."]
        ],
        quiz: [
          { p: "O que dá `[1, 2, 3, 4][1:3]`?", o: ["[1, 2, 3]","[2, 3]","[2, 3, 4]"], c: 1,
            e: "Do índice 1 inclusive ao 3 exclusive: os elementos nas posições 1 e 2." },
          { p: "`b = a` e depois `b.append(9)`. O que acontece a `a`?", o: ["Nada","Também ganha o 9","Dá erro"], c: 1,
            e: "`a` e `b` são dois nomes para a mesma lista. Para uma lista independente, `b = a.copy()`." }
        ],
        exercicio: {
          ficheiro: "fatias.py",
          enunciado: "Escreve quatro funções com fatias, sem ciclos. `primeiros(lista, n)` e `ultimos(lista, n)` devolvem os primeiros e os últimos n elementos (com n igual a 0, lista vazia). `pagina(itens, numero, por_pagina)` devolve a página pedida, contando a partir de 1. `sem_pontas(lista)` devolve a lista sem o primeiro e o último elemento.",
          inicio: String.raw`def primeiros(lista, n):
    pass


def ultimos(lista, n):
    pass


def pagina(itens, numero, por_pagina):
    pass


def sem_pontas(lista):
    pass
`,
          testes: String.raw`from fatias import pagina, primeiros, sem_pontas, ultimos


def test_primeiros():
    assert primeiros([1, 2, 3, 4], 2) == [1, 2]


def test_primeiros_mais_do_que_ha():
    assert primeiros([1, 2], 5) == [1, 2]


def test_ultimos():
    assert ultimos([1, 2, 3, 4], 2) == [3, 4]


def test_ultimos_zero_e_vazio():
    assert ultimos([1, 2, 3], 0) == []


def test_primeira_pagina():
    assert pagina(list(range(1, 11)), 1, 4) == [1, 2, 3, 4]


def test_ultima_pagina_incompleta():
    assert pagina(list(range(1, 11)), 3, 4) == [9, 10]


def test_pagina_depois_do_fim():
    assert pagina(list(range(1, 11)), 5, 4) == []


def test_sem_pontas():
    assert sem_pontas([1, 2, 3, 4]) == [2, 3]
    assert sem_pontas([1, 2]) == []


def test_nao_alteram_a_lista_recebida():
    lista = [1, 2, 3]
    primeiros(lista, 1)
    sem_pontas(lista)
    assert lista == [1, 2, 3]
`
        }
      },
      {
        id: "6.3", titulo: "Alterar listas: inserir, remover, ordenar", min: 14, estado: "pronta",
        meta: "No fim: alteras listas com os métodos certos, ordenas com sort e sorted e sabes quais devolvem None.",
        blocos: [
          ["py", String.raw`tarefas = ["escrever", "testar"]
tarefas.append("publicar")
tarefas.insert(0, "planear")
tarefas.remove("testar")
print(tarefas)
print(tarefas[0], tarefas[-1])
print(tarefas[1:3])`],
          ["lista", [
            "`append(x)` acrescenta no fim, `insert(i, x)` acrescenta na posição i.",
            "`remove(x)` tira a primeira ocorrência de x, e dá `ValueError` se não estiver lá.",
            "`pop()` tira e devolve o último, `pop(0)` o primeiro.",
            "`index(x)` diz a posição de x, `count(x)` quantas vezes aparece.",
            "`lista[i] = novo` substitui o elemento na posição i."
          ]],
          ["py", String.raw`numeros = [5, 3, 8]
numeros[1] = 30
ultimo = numeros.pop()
print(numeros, ultimo)`],
          ["h", "Ordenar"],
          ["py", String.raw`notas = [14, 9, 20, 11]
print(sorted(notas))
print(sorted(notas, reverse=True))
print(notas)

notas.sort()
print(notas)`],
          ["p", "`sorted(lista)` devolve uma lista nova, ordenada, e deixa a original como estava. `lista.sort()` ordena a própria lista e não devolve nada. As duas aceitam `reverse=True`."],
          ["aviso", "Os métodos que alteram a lista devolvem `None`. `x = lista.sort()` deixa `x` a `None`, e `lista = lista.append(4)` perde a lista inteira. Ou chamas o método sozinho numa linha, ou usas a versão que devolve uma coisa nova, como `sorted`."],
          ["obra", "A regra que vais encontrar em quase todas as equipas: uma função ou altera a lista que recebe e devolve `None`, ou deixa-a em paz e devolve uma lista nova. As duas coisas ao mesmo tempo é como se criam surpresas a três ficheiros de distância. `sort` e `sorted` são esta regra aplicada."]
        ],
        quiz: [
          { p: "O que faz `[\"a\", \"b\"].remove(\"x\")`?", o: ["Nada","ValueError","Devolve False"], c: 1,
            e: "`remove` exige que o elemento exista. Se pode não existir, pergunta antes com `in`." },
          { p: "`x = [3, 1, 2].sort()`. Quanto vale `x`?", o: ["[1, 2, 3]","None","[3, 1, 2]"], c: 1,
            e: "`sort` ordena no sítio e devolve `None`. Para receber a lista ordenada, `sorted([3, 1, 2])`." }
        ],
        exercicio: {
          ficheiro: "editar_listas.py",
          enunciado: "Escreve três funções que devolvem listas novas e nunca alteram a que recebem. `remover_todos(lista, valor)` devolve a lista sem nenhuma ocorrência do valor. `inserir_ordenado(lista, valor)` recebe uma lista ordenada e devolve-a com o valor no sítio certo. `mediana(valores)` devolve o valor do meio depois de ordenar (com um número par de valores, a média dos dois do meio); lista vazia levanta `ValueError`.",
          inicio: String.raw`def remover_todos(lista, valor):
    pass


def inserir_ordenado(lista, valor):
    pass


def mediana(valores):
    pass
`,
          testes: String.raw`import pytest

from editar_listas import inserir_ordenado, mediana, remover_todos


def test_remover_todos():
    assert remover_todos([1, 2, 1, 3, 1], 1) == [2, 3]


def test_remover_o_que_nao_existe():
    assert remover_todos([1, 2], 9) == [1, 2]


def test_remover_nao_altera_a_original():
    lista = [1, 2, 1]
    remover_todos(lista, 1)
    assert lista == [1, 2, 1]


def test_inserir_no_meio_e_nas_pontas():
    assert inserir_ordenado([1, 3, 5], 4) == [1, 3, 4, 5]
    assert inserir_ordenado([1, 3], 0) == [0, 1, 3]
    assert inserir_ordenado([1, 3], 9) == [1, 3, 9]
    assert inserir_ordenado([], 2) == [2]


def test_inserir_nao_altera_a_original():
    lista = [1, 3]
    inserir_ordenado(lista, 2)
    assert lista == [1, 3]


def test_mediana_impar():
    assert mediana([7, 1, 3]) == 3


def test_mediana_par():
    assert mediana([4, 1, 3, 2]) == 2.5


def test_mediana_nao_altera_a_original():
    valores = [7, 1, 3]
    mediana(valores)
    assert valores == [7, 1, 3]


def test_mediana_de_lista_vazia():
    with pytest.raises(ValueError):
        mediana([])
`
        }
      },
      {
        id: "6.4", titulo: "Texto e listas: split e join", min: 14, estado: "pronta",
        meta: "No fim: partes texto em listas com split, juntas listas em texto com join e limpas os pedaços pelo caminho.",
        blocos: [
          ["p", "`split` parte um texto numa lista de pedaços, cortando num separador. `join` faz o contrário: junta uma lista de textos num só."],
          ["py", String.raw`linha = "Ana;17;Lisboa"
partes = linha.split(";")
print(partes)
print(partes[1])`],
          ["p", "Sem argumento, `split()` corta em qualquer espaço, tabulação ou mudança de linha, e ignora os repetidos. Com um separador, corta exatamente nele, mesmo que fique um pedaço vazio."],
          ["py", String.raw`print("  uma   frase  com espaços ".split())
print("a,b,,c".split(","))`],
          ["h", "join"],
          ["py", String.raw`palavras = ["olá", "mundo"]
print(" ".join(palavras))
print(", ".join(["pão", "leite", "ovos"]))`],
          ["p", "O separador é a string antes do ponto. Todos os elementos têm de ser texto: `\", \".join([1, 2])` dá `TypeError`, por isso converte primeiro."],
          ["h", "Linhas"],
          ["py", String.raw`texto = "linha 1\nlinha 2\nlinha 3"
for linha in texto.splitlines():
    print(linha.upper())`],
          ["h", "Partir e limpar"],
          ["py", String.raw`linha = " TECLADO ; 39,90 ; 2 "
limpas = []
for pedaco in linha.split(";"):
    limpas.append(pedaco.strip())
print(limpas)
print(float(limpas[1].replace(",", ".")))`],
          ["aviso", "`\"a, b\".split(\",\")` dá `[\"a\", \" b\"]`, com o espaço colado ao segundo pedaço. Depois de partir texto escrito por pessoas, faz `strip` a cada pedaço."],
          ["obra", "Ler um ficheiro de texto, partir cada linha no separador, limpar os pedaços e juntar o resultado noutro formato: é assim que começa metade das integrações com sistemas antigos. Os módulos 12 e 28 fazem isto com ficheiros a sério."]
        ],
        quiz: [
          { p: "O que dá `\"a b  c\".split()`?", o: ["[\"a\", \"b\", \"\", \"c\"]","[\"a\", \"b\", \"c\"]","[\"a b  c\"]"], c: 1,
            e: "Sem argumento, os espaços repetidos contam como um só." },
          { p: "O que dá `\"-\".join(\"abc\")`?", o: ["\"abc-\"","\"a-b-c\"","Dá erro"], c: 1,
            e: "Uma string também é uma sequência de textos, um por carácter, por isso `join` aceita-a." }
        ],
        exercicio: {
          ficheiro: "caminhos.py",
          enunciado: "Lembras-te do `cd` da aula 1.2? Escreve `resolver(atual, caminho)`, que devolve o caminho absoluto onde ficas depois de fazer `cd caminho` a partir de `atual`. Trata `.`, `..` e caminhos absolutos (começados por `/`). O resultado nunca acaba em barra, a raiz é `/`, e subir acima da raiz fica na raiz. Escreve também `iniciais(nome)`, que devolve as iniciais em maiúsculas: `\"ana maria silva\"` dá `\"AMS\"`.",
          inicio: String.raw`def resolver(atual, caminho):
    pass


def iniciais(nome):
    pass
`,
          testes: String.raw`from caminhos import iniciais, resolver


def test_caminho_relativo():
    assert resolver("/home/ana", "projetos") == "/home/ana/projetos"


def test_sobe_um_nivel():
    assert resolver("/home/ana/projetos", "..") == "/home/ana"


def test_caminho_absoluto_ignora_o_atual():
    assert resolver("/home/ana", "/etc") == "/etc"


def test_ponto_fica_no_sitio():
    assert resolver("/home/ana", ".") == "/home/ana"


def test_varios_saltos():
    assert resolver("/home/ana/projetos/curso", "../../documentos") == "/home/ana/documentos"


def test_subir_acima_da_raiz_fica_na_raiz():
    assert resolver("/", "..") == "/"


def test_varias_pastas_de_uma_vez():
    assert resolver("/home", "ana/projetos/curso") == "/home/ana/projetos/curso"


def test_iniciais():
    assert iniciais("ana maria silva") == "AMS"


def test_iniciais_com_espacos_a_mais():
    assert iniciais("  rui   costa ") == "RC"
`
        }
      },
      {
        id: "6.5", titulo: "enumerate e zip", min: 11, estado: "pronta",
        meta: "No fim: percorres uma lista com a posição e o valor ao mesmo tempo, e duas listas em paralelo.",
        blocos: [
          ["p", "Em Python percorre-se a coleção, não os índices. `for item in lista` é a forma normal. Se vieres de outra linguagem, a vontade de escrever `for i in range(len(lista))` vai passar e deve passar."],
          ["py", String.raw`nomes = ["Ana", "Rui", "Bea"]

for nome in nomes:
    print(nome.upper())

for posicao, nome in enumerate(nomes, start=1):
    print(posicao, nome)`],
          ["p", "`enumerate` dá-te posição e valor ao mesmo tempo. `zip` percorre duas coleções em paralelo e pára na mais curta."],
          ["py", String.raw`produtos = ["teclado", "rato", "cabo"]
precos = [39.9, 12.5, 4.0]

for produto, preco in zip(produtos, precos):
    print(f"{produto:<10}{preco:>6.2f}")`],
          ["p", "`enumerate(lista, start=1)` começa a contar no 1, que é o que queres quando mostras posições a pessoas."],
          ["aviso", "`zip` com listas de tamanhos diferentes pára na mais curta, sem avisar, e os elementos a mais desaparecem. Se os tamanhos têm de ser iguais, escreve `zip(a, b, strict=True)`, que levanta `ValueError` quando não são."],
          ["obra", "`for i in range(len(lista)):` seguido de `lista[i]` numa revisão de código recebe quase sempre o mesmo comentário: usa `enumerate`. Não é só estética: sem índices à mão, não há índices errados."]
        ],
        quiz: [
          { p: "Precisas do índice e do valor ao percorrer uma lista. Qual é a forma idiomática?", o: ["`for i in range(len(lista))` e depois `lista[i]`","`for i, v in enumerate(lista)`","Um `while` com contador"], c: 1,
            e: "`enumerate` diz a intenção e não deixa espaço para errar o limite. As outras duas funcionam e denunciam quem aprendeu Python a traduzir de outra linguagem." }
        ],
        exercicio: {
          ficheiro: "pauta.py",
          enunciado: "Escreve três funções. `numerar(nomes)` devolve a lista `[\"1. Ana\", \"2. Rui\"]` a partir de `[\"Ana\", \"Rui\"]`. `juntar_notas(nomes, notas)` devolve `[\"Ana: 14\", \"Rui: 9\"]`, e levanta `ValueError` se as listas tiverem tamanhos diferentes. `posicoes_de(lista, valor)` devolve todas as posições onde o valor aparece.",
          inicio: String.raw`def numerar(nomes):
    pass


def juntar_notas(nomes, notas):
    pass


def posicoes_de(lista, valor):
    pass
`,
          testes: String.raw`import pytest

from pauta import juntar_notas, numerar, posicoes_de


def test_numerar():
    assert numerar(["Ana", "Rui"]) == ["1. Ana", "2. Rui"]


def test_numerar_vazio():
    assert numerar([]) == []


def test_juntar_notas():
    assert juntar_notas(["Ana", "Rui"], [14, 9]) == ["Ana: 14", "Rui: 9"]


def test_tamanhos_diferentes_sao_recusados():
    with pytest.raises(ValueError):
        juntar_notas(["Ana", "Rui"], [14])


def test_posicoes_de():
    assert posicoes_de(["a", "b", "a", "c", "a"], "a") == [0, 2, 4]


def test_posicoes_de_valor_ausente():
    assert posicoes_de([1, 2], 9) == []
`
        }
      },
      {
        id: "6.6", titulo: "Tuplos e desempacotamento", min: 12, estado: "pronta",
        meta: "No fim: usas tuplos para valores que andam juntos, devolves dois valores de uma função e desempacotas sem índices.",
        blocos: [
          ["p", "Um tuplo é como uma lista que não pode mudar depois de criada. Escreve-se entre parênteses curvos."],
          ["py", String.raw`ponto = (38.7, -9.1)
print(ponto[0], len(ponto))
ponto[0] = 0`],
          ["h", "Tuplos e desempacotamento"],
          ["p", "Um tuplo usa-se quando a posição tem significado fixo: coordenadas, um par chave e valor, o retorno de uma função com duas coisas. Desempacota-se por atribuição múltipla."],
          ["py", String.raw`def dividir(a, b):
    return a // b, a % b

quociente, resto = dividir(17, 5)
print(quociente, resto)

primeiro, *resto_da_lista = [1, 2, 3, 4]
print(primeiro, resto_da_lista)`],
          ["p", "O `*` numa atribuição apanha o resto numa lista. Desempacotar também funciona num `for`, e é a forma mais limpa de trocar dois valores:"],
          ["py", String.raw`a, b = 1, 2
a, b = b, a
print(a, b)

alunos = [("Ana", 17), ("Rui", 12)]
for nome, nota in alunos:
    print(nome, nota)`],
          ["aviso", "Um tuplo de um elemento precisa de uma vírgula: `(5,)`. Sem ela, `(5)` é só o número 5 entre parênteses."],
          ["obra", "Uma função que devolve duas coisas relacionadas devolve um tuplo, e quem chama desempacota logo: `total, rejeitadas = processar(linhas)`. Vais ver este padrão em todo o lado, a começar pelas funções do próprio Python, como o `divmod`."]
        ],
        quiz: [
          { p: "O que faz `a, b = b, a`?", o: ["Dá erro","Troca os valores de a e b","Põe os dois iguais a b"], c: 1,
            e: "O lado direito cria um tuplo com os dois valores antigos, e só depois é desempacotado para a esquerda." },
          { p: "Que tipo tem `(5)`?", o: ["tuple","int","list"], c: 1,
            e: "Os parênteses sozinhos só agrupam. O tuplo faz-se com a vírgula: `(5,)`." }
        ],
        exercicio: {
          ficheiro: "estatisticas.py",
          enunciado: "Escreve três funções que trabalham com tuplos. `min_max(valores)` devolve o tuplo `(menor, maior)`, ou `None` se a lista estiver vazia. `dividir_com_resto(a, b)` devolve `(quociente, resto)`. `trocar_pares(pares)` recebe uma lista de tuplos `(a, b)` e devolve uma lista nova com cada tuplo trocado, `(b, a)`, usando desempacotamento no `for`.",
          inicio: String.raw`def min_max(valores):
    pass


def dividir_com_resto(a, b):
    pass


def trocar_pares(pares):
    pass
`,
          testes: String.raw`from estatisticas import dividir_com_resto, min_max, trocar_pares


def test_min_max():
    assert min_max([4, 9, 1, 7]) == (1, 9)


def test_min_max_de_um_so():
    assert min_max([5]) == (5, 5)


def test_min_max_vazio():
    assert min_max([]) is None


def test_devolve_um_tuplo():
    assert type(dividir_com_resto(17, 5)) is tuple


def test_dividir_com_resto():
    quociente, resto = dividir_com_resto(17, 5)
    assert (quociente, resto) == (3, 2)


def test_trocar_pares():
    assert trocar_pares([("a", 1), ("b", 2)]) == [(1, "a"), (2, "b")]


def test_trocar_pares_vazio():
    assert trocar_pares([]) == []
`
        }
      },
      {
        id: "6.7", titulo: "Listas de listas", min: 13, estado: "pronta",
        meta: "No fim: guardas tabelas como listas de listas, calculas totais por linha e por coluna e evitas a armadilha das linhas partilhadas.",
        blocos: [
          ["p", "Uma lista pode ter listas lá dentro. É a forma mais simples de guardar uma tabela: uma lista de linhas, cada linha uma lista de células. `tabela[linha][coluna]` vai buscar uma célula."],
          ["py", String.raw`vendas = [
    [10, 20, 30],
    [5, 0, 15],
]
print(vendas[1])
print(vendas[1][2])
for linha in vendas:
    print(sum(linha))`],
          ["p", "Totais por linha são um `for`. Totais por coluna precisam de percorrer as posições e, para cada uma, todas as linhas:"],
          ["py", String.raw`vendas = [[10, 20, 30], [5, 0, 15]]
for c in range(len(vendas[0])):
    total = 0
    for linha in vendas:
        total += linha[c]
    print("coluna", c, total)`],
          ["h", "Construir uma tabela"],
          ["py", String.raw`tabela = []
for i in range(3):
    linha = []
    for j in range(3):
        linha.append(i * j)
    tabela.append(linha)
print(tabela)`],
          ["p", "Uma lista nova para cada linha, criada dentro do ciclo de fora."],
          ["aviso", "`[[0] * 3] * 3` parece criar uma tabela 3 por 3 e cria três nomes para a mesma linha. Mudar uma célula muda a coluna inteira. Cria cada linha no seu ciclo, como acima."],
          ["py", String.raw`errada = [[0] * 3] * 3
errada[0][0] = 9
print(errada)`],
          ["obra", "Os dados de uma folha de cálculo, de um CSV ou de uma consulta a uma base de dados chegam muitas vezes assim: uma lista de linhas, cada linha uma lista de células. Totais por linha e por coluna são o primeiro relatório que alguém te pede."]
        ],
        quiz: [
          { p: "Com `t = [[1, 2], [3, 4]]`, quanto vale `t[0][1]`?", o: ["1","2","3"], c: 1,
            e: "`t[0]` é a primeira linha, `[1, 2]`, e `[1]` é o segundo elemento dessa linha." }
        ],
        exercicio: {
          ficheiro: "tabela.py",
          enunciado: "Escreve três funções sobre tabelas guardadas como listas de listas, todas com o mesmo número de colunas. `total_por_linha(tabela)` devolve a lista das somas de cada linha. `total_por_coluna(tabela)` devolve a lista das somas de cada coluna (tabela vazia dá lista vazia). `transpor(tabela)` devolve uma tabela nova em que as linhas passam a colunas.",
          inicio: String.raw`def total_por_linha(tabela):
    pass


def total_por_coluna(tabela):
    pass


def transpor(tabela):
    pass
`,
          testes: String.raw`from tabela import total_por_coluna, total_por_linha, transpor

VENDAS = [
    [10, 20, 30],
    [5, 0, 15],
]


def test_total_por_linha():
    assert total_por_linha(VENDAS) == [60, 20]


def test_total_por_coluna():
    assert total_por_coluna(VENDAS) == [15, 20, 45]


def test_tabela_vazia():
    assert total_por_linha([]) == []
    assert total_por_coluna([]) == []


def test_transpor():
    assert transpor(VENDAS) == [[10, 5], [20, 0], [30, 15]]


def test_transpor_nao_altera_a_original():
    tabela = [[1, 2], [3, 4]]
    transpor(tabela)
    assert tabela == [[1, 2], [3, 4]]


def test_linhas_da_transposta_sao_independentes():
    t = transpor([[1, 2], [3, 4]])
    t[0][0] = 99
    assert t[1][0] == 2
`
        }
      },
      {
        id: "6.8", titulo: "Compreensões de lista", min: 12, estado: "pronta",
        meta: "No fim: escreves transformações numa linha e sabes quando não o deves fazer.",
        blocos: [
          ["p", "Uma compreensão é um ciclo que constrói uma coleção, escrito numa expressão. Lê-se de dentro para fora: primeiro o `for`, depois o filtro, e o que fica à esquerda é o que entra na lista."],
          ["py", String.raw`numeros = [1, 2, 3, 4, 5, 6]

quadrados = [n * n for n in numeros]
pares = [n for n in numeros if n % 2 == 0]
rotulos = [f"n{n}" for n in numeros if n > 4]

print(quadrados)
print(pares)
print(rotulos)`],
          ["p", "O equivalente com ciclo é isto. Não é pior: é mais comprido, e é a forma certa quando o corpo tem mais do que uma instrução."],
          ["code", String.raw`quadrados = []
for n in numeros:
    quadrados.append(n * n)`],
          ["p", "Trocar as chavetas por parênteses dá um gerador: não constrói nada em memória, produz valor a valor. É o que queres dentro de `sum`, `any`, `max` e companhia."],
          ["py", String.raw`numeros = range(1, 1_000_001)
print(sum(n for n in numeros if n % 3 == 0))`],
          ["obra", "`any(...)` e `all(...)` com um gerador lá dentro substituem meia dúzia de linhas de ciclo com uma flag booleana. Sempre que vires uma variável chamada `encontrado = False`, há uma compreensão à espera de nascer."],
          ["py", String.raw`linhas = ["ok", "ok", "ERRO 500", "ok"]
print(any(l.startswith("ERRO") for l in linhas))
print(all(l == "ok" for l in linhas))`],
          ["aviso", "Compreensões aninhadas com dois `for` e um `if` cabem numa linha e não cabem numa cabeça. A regra prática das equipas: se não a lês em voz alta de uma vez, escreve o ciclo. Legibilidade ganha a esperteza."],
          ["h", "O erro clássico da variável"],
          ["p", "Em Python 3 a variável da compreensão vive só lá dentro. Isso é bom e é diferente do ciclo `for` normal, onde a variável sobrevive depois do fim."]
        ],
        quiz: [
          { p: "Precisas de somar 10 milhões de valores filtrados. Compreensão de lista ou gerador?", o: ["Lista, é mais rápido","Gerador, não constrói a lista intermédia em memória","É exatamente igual"], c: 1,
            e: "A lista aloca dez milhões de elementos só para os deitar fora a seguir. Dentro de `sum` escreve-se sem parênteses extra: `sum(n for n in ... if ...)`." }
        ],
        exercicio: {
          ficheiro: "compreensoes.py",
          enunciado: "Escreve três funções, cada uma com uma compreensão ou com `any` numa só expressão. `precos_com_iva(precos)` devolve os preços maiores que zero, multiplicados por 1.23 e arredondados a duas casas. `iniciais_maiusculas(palavras)` devolve a primeira letra de cada palavra não vazia, em maiúscula. `ha_negativos(valores)` diz se há algum valor negativo.",
          inicio: String.raw`def precos_com_iva(precos):
    pass


def iniciais_maiusculas(palavras):
    pass


def ha_negativos(valores):
    pass
`,
          testes: String.raw`import inspect

from compreensoes import ha_negativos, iniciais_maiusculas, precos_com_iva


def test_precos_com_iva():
    assert precos_com_iva([10, 0, 5, -2]) == [12.3, 6.15]


def test_precos_com_iva_vazio():
    assert precos_com_iva([]) == []


def test_iniciais_maiusculas():
    assert iniciais_maiusculas(["ana", "", "rui"]) == ["A", "R"]


def test_ha_negativos():
    assert ha_negativos([3, -1, 4]) is True
    assert ha_negativos([3, 1]) is False
    assert ha_negativos([]) is False


def test_sem_append():
    for funcao in (precos_com_iva, iniciais_maiusculas, ha_negativos):
        assert "append" not in inspect.getsource(funcao)
`
        }
      }
  ]
});
