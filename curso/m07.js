/* Módulo 7: Dicionários e conjuntos. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 7, fase: 2, titulo: "Dicionários e conjuntos",
  objetivo: "Guardar coisas por nome, contar e agrupar, e responder depressa a 'isto existe?'.",
  licoes: [
      {
        id: "7.1", titulo: "Dicionários: o básico", min: 14, estado: "pronta",
        meta: "No fim: crias dicionários, lês, acrescentas, alteras e apagas entradas, e percorres chaves, valores e pares.",
        blocos: [
          ["p", "Uma lista guarda coisas por posição. Um dicionário guarda coisas por nome. Quase todos os dados que vais tocar no trabalho (respostas de APIs, linhas de base de dados, configuração) chegam como dicionários."],
          ["py", String.raw`aluno = {
    "nome": "Rui",
    "turma": "7A",
    "notas": [4, 3, 5],
}

print(aluno["nome"])
print(len(aluno["notas"]))`],
          ["p", "Cada entrada tem uma chave, antes dos dois pontos, e um valor. Vais buscar o valor pela chave, entre parênteses retos."],
          ["h", "Acrescentar, alterar, apagar"],
          ["py", String.raw`stock = {"pão": 10, "leite": 4}
stock["ovos"] = 12
stock["pão"] = 8
del stock["leite"]
print(stock)
print(len(stock))`],
          ["p", "Atribuir a uma chave que já existe substitui o valor; a uma que não existe, cria-a. As chaves são únicas. Para uma cópia independente, `stock.copy()` ou `dict(stock)`, como nas listas."],
          ["h", "Existe?"],
          ["py", String.raw`stock = {"pão": 10}
print("pão" in stock)
print(10 in stock)
print(stock["queijo"])`],
          ["p", "`in` procura nas chaves, não nos valores. Pedir uma chave que não existe dá `KeyError`, que é o assunto da próxima aula."],
          ["h", "Percorrer"],
          ["py", String.raw`precos = {"pão": 1.2, "leite": 0.9}
for produto in precos:
    print(produto)
for preco in precos.values():
    print(preco)
for produto, preco in precos.items():
    print(f"{produto}: {preco:.2f}")`],
          ["p", "Percorrer o dicionário dá as chaves; `.values()` dá os valores; `.items()` dá pares chave e valor, que se desempacotam como os tuplos da aula 6.6. A ordem é a ordem em que as chaves foram criadas."],
          ["aviso", "Acrescentar ou apagar chaves enquanto percorres o próprio dicionário dá `RuntimeError: dictionary changed size during iteration`. Percorre uma cópia das chaves, `for k in list(d):`, ou constrói um dicionário novo."],
          ["obra", "Um dicionário é a estrutura certa sempre que vais procurar coisas por nome: um produto pelo código, um cliente pelo email, uma definição pela chave. Numa lista tens de percorrer tudo; num dicionário vais direto."]
        ],
        quiz: [
          { p: "O que dá `{\"a\": 1, \"a\": 2}`?", o: ["{\"a\": 1}","{\"a\": 2}","Dá erro"], c: 1,
            e: "As chaves são únicas. A segunda atribuição substitui a primeira, sem aviso." },
          { p: "O que dá `2 in {\"a\": 2}`?", o: ["True","False"], c: 1,
            e: "`in` num dicionário procura nas chaves. Para os valores, `2 in d.values()`." }
        ],
        exercicio: {
          ficheiro: "stock.py",
          enunciado: "Escreve três funções sobre um stock guardado como dicionário de produto para quantidade. `quantidade(stock, produto)` devolve a quantidade, ou 0 se o produto não existir. `repor(stock, produto, n)` devolve um dicionário novo com a quantidade aumentada em n (o produto é criado se não existir) e não altera o recebido. `esgotados(stock)` devolve a lista, ordenada, dos produtos com quantidade 0.",
          inicio: String.raw`def quantidade(stock, produto):
    pass


def repor(stock, produto, n):
    pass


def esgotados(stock):
    pass
`,
          testes: String.raw`from stock import esgotados, quantidade, repor

STOCK = {"pão": 10, "leite": 0, "ovos": 12, "arroz": 0}


def test_quantidade_existente():
    assert quantidade(STOCK, "ovos") == 12


def test_quantidade_de_produto_desconhecido():
    assert quantidade(STOCK, "queijo") == 0


def test_repor_produto_existente():
    assert repor(STOCK, "pão", 5)["pão"] == 15


def test_repor_cria_produto_novo():
    assert repor(STOCK, "queijo", 3)["queijo"] == 3


def test_repor_nao_altera_o_original():
    stock = {"pão": 1}
    repor(stock, "pão", 5)
    repor(stock, "sal", 1)
    assert stock == {"pão": 1}


def test_esgotados_ordenados():
    assert esgotados(STOCK) == ["arroz", "leite"]


def test_nada_esgotado():
    assert esgotados({"pão": 1}) == []
`
        }
      },
      {
        id: "7.2", titulo: "Dicionários no dia a dia: get, contar e agrupar", min: 15, estado: "pronta",
        meta: "No fim: acedes a chaves que podem não existir, contas ocorrências e agrupas registos, que são as três tarefas mais comuns com dicionários.",
        blocos: [
          ["h", "Aceder sem rebentar"],
          ["p", "`aluno[\"email\"]` levanta `KeyError` se a chave não existir. `aluno.get(\"email\")` devolve `None`. `aluno.get(\"email\", \"sem email\")` devolve o valor por omissão. Escolhe conscientemente: às vezes queres mesmo que rebente."],
          ["py", String.raw`aluno = {"nome": "Rui"}
print(aluno.get("email"))
print(aluno.get("email", "sem email"))
print("email" in aluno)`],
          ["h", "Contar"],
          ["py", String.raw`palavras = "o rato roeu a rolha do rei".split()
contagem = {}
for p in palavras:
    contagem[p] = contagem.get(p, 0) + 1
print(contagem)`],
          ["p", "`contagem.get(p, 0) + 1` lê-se: o que já havia, ou zero se ainda não havia nada, mais um. É provavelmente a linha que mais vezes vais escrever com dicionários."],
          ["h", "Agrupar"],
          ["py", String.raw`alunos = [("Ana", "7A"), ("Rui", "7B"), ("Bea", "7A")]
turmas = {}
for nome, turma in alunos:
    if turma not in turmas:
        turmas[turma] = []
    turmas[turma].append(nome)
print(turmas)`],
          ["p", "Para cada chave, uma lista que começa vazia e vai crescendo. A aula 17.1 mostra o `defaultdict`, que esconde o `if`."],
          ["obra", "Contar coisas é a tarefa mais frequente de um júnior. Faz-se com `collections.Counter`, não com um `if chave in dic` escrito à mão. Saber que a biblioteca padrão já resolve o problema é metade do valor de um programador."],
          ["py", String.raw`from collections import Counter

palavras = "o rato roeu a rolha da garrafa do rei da russia".split()
c = Counter(palavras)
print(c.most_common(3))`],
          ["aviso", "Chaves de dicionário têm de ser imutáveis. `str`, `int` e `tuple` servem. Uma `list` como chave dá `TypeError: unhashable type`."]
        ],
        quiz: [
          { p: "O que devolve `{\"a\": 1}.get(\"b\", 0)`?", o: ["None","0","KeyError"], c: 1,
            e: "O segundo argumento de `get` é o valor por omissão quando a chave não existe." },
          { p: "Qual destas linhas conta ocorrências sem rebentar na primeira vez que aparece uma chave?", o: ["c[p] += 1","c[p] = c.get(p, 0) + 1","c[p] = c[p] + 1"], c: 1,
            e: "As outras duas leem `c[p]` antes de ele existir e dão `KeyError` na primeira ocorrência." }
        ],
        exercicio: {
          ficheiro: "contagens.py",
          enunciado: "Escreve três funções. `total_por_loja(vendas)` recebe uma lista de dicionários com `loja` e `valor` e devolve um dicionário com a soma de cada loja. `contar_palavras(texto)` devolve quantas vezes aparece cada palavra, sem distinguir maiúsculas. `agrupar_por_inicial(nomes)` devolve um dicionário da inicial (em maiúscula) para a lista de nomes com essa inicial, pela ordem original.",
          inicio: String.raw`def total_por_loja(vendas):
    pass


def contar_palavras(texto):
    pass


def agrupar_por_inicial(nomes):
    pass
`,
          testes: String.raw`from contagens import agrupar_por_inicial, contar_palavras, total_por_loja

VENDAS = [
    {"loja": "Lisboa", "valor": 120},
    {"loja": "Porto", "valor": 80},
    {"loja": "Lisboa", "valor": 45},
    {"loja": "Faro", "valor": 200},
]


def test_total_por_loja():
    assert total_por_loja(VENDAS) == {"Lisboa": 165, "Porto": 80, "Faro": 200}


def test_sem_vendas():
    assert total_por_loja([]) == {}


def test_contar_palavras_ignora_maiusculas():
    assert contar_palavras("O rato e o Gato") == {"o": 2, "rato": 1, "e": 1, "gato": 1}


def test_contar_texto_vazio():
    assert contar_palavras("") == {}


def test_agrupar_por_inicial():
    assert agrupar_por_inicial(["ana", "Rui", "Alice", "rita"]) == {"A": ["ana", "Alice"], "R": ["Rui", "rita"]}
`
        }
      },
      {
        id: "7.3", titulo: "Listas de dicionários: dados como chegam do mundo", min: 15, estado: "pronta",
        meta: "No fim: filtras, somas, procuras e agrupas registos guardados como listas de dicionários, incluindo dados encaixados.",
        blocos: [
          ["p", "Um registo é um dicionário, com um campo por chave. Muitos registos são uma lista de dicionários. É assim que ficam as linhas de uma folha de cálculo depois de lidas, e é assim que chegam as respostas de quase todos os serviços web."],
          ["py", String.raw`alunos = [
    {"nome": "Ana", "turma": "7A", "nota": 17},
    {"nome": "Rui", "turma": "7B", "nota": 9},
    {"nome": "Bea", "turma": "7A", "nota": 14},
]
for a in alunos:
    print(a["nome"], a["nota"])`],
          ["h", "Filtrar e somar"],
          ["py", String.raw`aprovados = [a["nome"] for a in alunos if a["nota"] >= 10]
media = sum(a["nota"] for a in alunos) / len(alunos)
print(aprovados, round(media, 1))`],
          ["h", "Procurar um registo"],
          ["py", String.raw`def procurar(alunos, nome):
    for a in alunos:
        if a["nome"] == nome:
            return a
    return None


print(procurar(alunos, "Bea"))
print(procurar(alunos, "Zé"))`],
          ["p", "Se vais procurar muitas vezes, constrói primeiro um dicionário que te leve direto ao registo, um índice: `por_nome[a[\"nome\"]] = a` para cada aluno. A aula 7.5 mostra como fazê-lo numa linha."],
          ["h", "Dados encaixados"],
          ["py", String.raw`encomenda = {
    "id": 7,
    "cliente": {"nome": "Ana", "email": "ana@exemplo.pt"},
    "linhas": [{"produto": "rato", "qtd": 2}, {"produto": "cabo", "qtd": 1}],
}
print(encomenda["cliente"]["email"])
print(encomenda["linhas"][0]["produto"])
print(sum(l["qtd"] for l in encomenda["linhas"]))`],
          ["p", "Lê-se da esquerda para a direita, um passo de cada vez: a encomenda, a chave `linhas`, que é uma lista, o elemento 0, que é um dicionário, a chave `produto`."],
          ["aviso", "Nos dados reais, alguns registos não têm todas as chaves. Decide de propósito o que fazer: ignorar o registo com `.get` e um `if`, ou rebentar com uma mensagem clara. O que não se faz é deixar um `KeyError` a meio de um relatório de mil linhas."],
          ["obra", "É exatamente assim que chegam as respostas de quase todos os serviços web, em JSON: listas de dicionários, com dicionários lá dentro. Saber andar nesta estrutura sem te perderes é metade do trabalho de integrar sistemas."]
        ],
        quiz: [
          { p: "Como chegas ao email do cliente em `{\"cliente\": {\"email\": \"a@b.pt\"}}`?", o: ["d[\"email\"]","d[\"cliente\"][\"email\"]","d.cliente.email"], c: 1,
            e: "Um passo por nível: primeiro a chave `cliente`, que devolve outro dicionário, e depois a chave `email` desse." }
        ],
        exercicio: {
          ficheiro: "turmas.py",
          enunciado: "Os alunos vêm numa lista de dicionários com `nome`, `turma` e `nota`. Escreve `media_da_turma(alunos, turma)`, arredondada a uma casa, ou `None` se a turma não tiver alunos; `aprovados(alunos)`, os nomes dos que têm nota 10 ou mais, por ordem alfabética; e `nomes_por_turma(alunos)`, um dicionário da turma para a lista de nomes, pela ordem em que aparecem.",
          inicio: String.raw`def media_da_turma(alunos, turma):
    pass


def aprovados(alunos):
    pass


def nomes_por_turma(alunos):
    pass
`,
          testes: String.raw`from turmas import aprovados, media_da_turma, nomes_por_turma

ALUNOS = [
    {"nome": "Rui", "turma": "7B", "nota": 9},
    {"nome": "Ana", "turma": "7A", "nota": 17},
    {"nome": "Bea", "turma": "7A", "nota": 14},
    {"nome": "Zé", "turma": "7B", "nota": 10},
]


def test_media_da_turma():
    assert media_da_turma(ALUNOS, "7A") == 15.5


def test_media_arredondada():
    assert media_da_turma(ALUNOS, "7B") == 9.5


def test_turma_sem_alunos():
    assert media_da_turma(ALUNOS, "9C") is None


def test_aprovados_por_ordem_alfabetica():
    assert aprovados(ALUNOS) == ["Ana", "Bea", "Zé"]


def test_nomes_por_turma():
    assert nomes_por_turma(ALUNOS) == {"7B": ["Rui", "Zé"], "7A": ["Ana", "Bea"]}


def test_sem_alunos():
    assert aprovados([]) == []
    assert nomes_por_turma([]) == {}
`
        }
      },
      {
        id: "7.4", titulo: "Conjuntos: únicos, pertence e diferenças", min: 12, estado: "pronta",
        meta: "No fim: usas conjuntos para tirar repetidos, perguntar se algo existe depressa e comparar duas coleções.",
        blocos: [
          ["p", "Um conjunto, `set`, guarda valores sem ordem e sem repetidos. Responde a 'isto está cá?' quase instantaneamente, por maior que seja."],
          ["py", String.raw`cores = {"azul", "verde", "azul"}
print(cores, len(cores))
cores.add("preto")
cores.discard("verde")
print("azul" in cores)`],
          ["p", "`set(lista)` tira os repetidos de uma lista, mas perde a ordem. O conjunto vazio escreve-se `set()`: `{}` é um dicionário vazio."],
          ["h", "Sets: pertence, únicos, diferenças"],
          ["py", String.raw`inscritos = {"ana", "rui", "bea"}
presentes = {"rui", "zeca"}

print("ana" in inscritos)
print(inscritos - presentes)
print(inscritos & presentes)
print(inscritos | presentes)`],
          ["p", "`-` dá o que está no primeiro e não no segundo, `&` o que está nos dois, `|` o que está em pelo menos um."],
          ["obra", "Comparar duas listas de identificadores para ver o que falta de um lado é trabalho de rotina em integrações. Faz-se com `set(a) - set(b)` numa linha, e não com dois ciclos aninhados. Quem escreve os dois ciclos aninhados escreve também o bug."],
          ["aviso", "Um conjunto não tem ordem nem posições: `cores[0]` dá `TypeError`, e a ordem em que aparece no `print` pode mudar. Para mostrar a alguém, `sorted(conjunto)`."]
        ],
        quiz: [
          { p: "Tens 50 mil nomes e precisas de verificar se um nome existe, milhares de vezes. Lista ou conjunto?", o: ["Lista, é mais simples","Conjunto, a procura é praticamente instantânea","Não faz diferença"], c: 1,
            e: "Procurar numa lista percorre elemento a elemento. Num conjunto, ou nas chaves de um dicionário, é acesso direto. Com 50 mil elementos a diferença é enorme, e esta pergunta cai em entrevistas." },
          { p: "Que tipo tem `{}`?", o: ["set","dict","list"], c: 1,
            e: "As chavetas vazias são um dicionário, por razões históricas. O conjunto vazio é `set()`." }
        ],
        exercicio: {
          ficheiro: "conjuntos.py",
          enunciado: "Escreve três funções. `sem_repetidos(valores)` devolve uma lista sem repetidos, mantendo a ordem da primeira aparição (usa um conjunto para saber o que já viste). `em_falta(inscritos, presentes)` devolve, ordenados, os inscritos que não estão nos presentes. `em_comum(a, b)` devolve, ordenados, os elementos que estão nas duas listas.",
          inicio: String.raw`def sem_repetidos(valores):
    pass


def em_falta(inscritos, presentes):
    pass


def em_comum(a, b):
    pass
`,
          testes: String.raw`from conjuntos import em_comum, em_falta, sem_repetidos


def test_remove_repetidos():
    assert sem_repetidos([3, 1, 3, 2, 1]) == [3, 1, 2]


def test_mantem_a_ordem():
    assert sem_repetidos(["b", "a", "b"]) == ["b", "a"]


def test_sem_repetidos_vazio():
    assert sem_repetidos([]) == []


def test_em_falta():
    assert em_falta(["rui", "ana", "bea"], ["bea", "zeca"]) == ["ana", "rui"]


def test_ninguem_em_falta():
    assert em_falta(["ana"], ["ana", "rui"]) == []


def test_em_comum():
    assert em_comum([3, 1, 2, 3], [2, 3, 9]) == [2, 3]
`
        }
      },
      {
        id: "7.5", titulo: "Compreensões de dicionário e conjunto", min: 11, estado: "pronta",
        meta: "No fim: constróis dicionários e conjuntos numa expressão, incluindo índices para procurar registos depressa.",
        blocos: [
          ["p", "As compreensões da aula 6.8 também constroem dicionários e conjuntos. Trocas os parênteses retos por chavetas: com `chave: valor` é um dicionário, só com um valor é um conjunto."],
          ["py", String.raw`precos = {"teclado": 39.9, "rato": 12.5, "cabo": 0}

com_iva = {nome: round(p * 1.23, 2) for nome, p in precos.items() if p > 0}
iniciais = {nome[0] for nome in precos}

print(com_iva)
print(iniciais)`],
          ["h", "Índices"],
          ["py", String.raw`alunos = [
    {"id": 17, "nome": "Ana"},
    {"id": 23, "nome": "Rui"},
]
por_id = {a["id"]: a for a in alunos}
print(por_id[23]["nome"])

nomes_por_id = {a["id"]: a["nome"] for a in alunos}
id_por_nome = {nome: i for i, nome in nomes_por_id.items()}
print(id_por_nome)`],
          ["aviso", "Se duas entradas derem a mesma chave, a compreensão de dicionário fica com a última e não avisa. Antes de construir um índice, pergunta-te se a chave é mesmo única."],
          ["obra", "Construir um índice com `{c[\"id\"]: c for c in clientes}` e depois procurar por id, em vez de percorrer a lista para cada pesquisa, é das otimizações mais baratas e mais frequentes que vais fazer. Transforma um relatório de minutos num de segundos."]
        ],
        quiz: [
          { p: "O que dá `{x % 3 for x in range(10)}`?", o: ["Uma lista de 10 elementos","{0, 1, 2}","Um dicionário"], c: 1,
            e: "Chavetas sem dois pontos: é um conjunto, e os repetidos desaparecem. Os restos da divisão por 3 são só 0, 1 e 2." }
        ],
        exercicio: {
          ficheiro: "indices.py",
          enunciado: "Escreve três funções, cada uma com uma compreensão. `com_iva(precos)` recebe um dicionário de produto para preço e devolve outro só com os preços maiores que zero, multiplicados por 1.23 e arredondados a duas casas. `indice_por_id(registos)` devolve um dicionário do `id` de cada registo para o registo. `inverter(dicionario)` troca chaves com valores.",
          inicio: String.raw`def com_iva(precos):
    pass


def indice_por_id(registos):
    pass


def inverter(dicionario):
    pass
`,
          testes: String.raw`from indices import com_iva, indice_por_id, inverter


def test_com_iva():
    assert com_iva({"teclado": 10, "oferta": 0, "cabo": 5}) == {"teclado": 12.3, "cabo": 6.15}


def test_com_iva_vazio():
    assert com_iva({}) == {}


def test_indice_por_id():
    registos = [{"id": 7, "nome": "Ana"}, {"id": 3, "nome": "Rui"}]
    indice = indice_por_id(registos)
    assert indice[3]["nome"] == "Rui"
    assert indice[7] is registos[0]


def test_inverter():
    assert inverter({"pt": "Portugal", "es": "Espanha"}) == {"Portugal": "pt", "Espanha": "es"}
`
        }
      }
  ]
});
