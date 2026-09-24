/* Módulo 9: Os tipos por dentro. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 9, fase: 2, titulo: "Os tipos por dentro",
  objetivo: "Saber o que cada tipo garante e onde cada um te trai, agora que já os usas todos os dias.",
  licoes: [
      {
        id: "9.1", titulo: "Números: int, float e dinheiro", min: 16, estado: "pronta",
        meta: "No fim: sabes porque é que não se guarda dinheiro em float e o que faz `//` com números negativos.",
        blocos: [
          ["p", "Python tem dois tipos numéricos que vais usar sempre: `int` e `float`. Parecem a mesma coisa com e sem vírgula. Não são, e a diferença já custou dinheiro a muita gente."],
          ["h", "int não tem limite"],
          ["p", "Um inteiro em Python cresce até à memória acabar. Não há estouro, não há `long`, não há nada para configurar. Isto é raro entre linguagens e é uma vantagem tua."],
          ["py", String.raw`print(2 ** 200)
print(len(str(2 ** 10000)))`],
          ["h", "As três divisões"],
          ["py", String.raw`print(7 / 2)      # sempre float
print(7 // 2)     # divisão inteira, arredonda para baixo
print(7 % 2)      # resto
print(divmod(7, 2))`],
          ["p", "`//` não corta a parte decimal: arredonda para baixo, para o lado do menos infinito. Com números positivos parece a mesma coisa. Com negativos, não é."],
          ["py", String.raw`print(-7 // 2)
print(int(-7 / 2))
print(-7 % 2)`],
          ["aviso", "`-7 // 2` dá `-4`, não `-3`. E `-7 % 2` dá `1`, não `-1`: em Python o resto tem o sinal do divisor. Quem escreve paginação ou reparte lotes com números que podem ser negativos leva com isto pelo menos uma vez."],
          ["h", "float é binário, e por isso é aproximado"],
          ["p", "Um `float` são 64 bits em base 2. Números como 0.1 não têm representação exata em base 2, tal como 1/3 não tem representação exata em base 10. O resultado é o clássico:"],
          ["py", String.raw`print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)

import math
print(math.isclose(0.1 + 0.2, 0.3))`],
          ["p", "Regra: nunca compares floats com `==`. Usa `math.isclose`, ou compara arredondado, ou, melhor ainda, não uses floats para aquilo."],
          ["h", "Dinheiro"],
          ["p", "Duas soluções corretas, e a escolha é da equipa. Ou guardas cêntimos em `int` e divides por 100 só para mostrar, ou usas `Decimal` com um número de casas definido. A errada é `float`."],
          ["py", String.raw`from decimal import Decimal, ROUND_HALF_UP

print(Decimal("0.1") + Decimal("0.2"))

preco = Decimal("19.99")
iva = (preco * Decimal("0.23")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
print(preco, iva, preco + iva)`],
          ["aviso", "`Decimal(0.1)` com um float lá dentro já traz o erro do float agarrado. Constrói sempre a partir de texto: `Decimal(\"0.1\")`."],
          ["h", "round não faz o que julgas"],
          ["py", String.raw`print(round(0.5), round(1.5), round(2.5), round(3.5))`],
          ["p", "Isto chama-se arredondamento bancário: os empates vão para o par mais próximo. Existe para não enviesar somas grandes e é o que a norma manda. Se o negócio exige meio para cima, é `Decimal` com `ROUND_HALF_UP`, explicitamente."],
          ["obra", "Um cêntimo de diferença entre o teu total e o do sistema de contabilidade é um bilhete de bug, e em faturação pode ser uma coima. Quando te pedirem um cálculo com dinheiro, a primeira pergunta é: em que unidade guardamos isto, e com que regra de arredondamento?"],
          ["aviso", "`int(\"3.5\")` rebenta com `ValueError`. `int(3.9)` dá `3`: trunca, não arredonda. Para converter texto com decimais é `int(float(\"3.5\"))`, e mais vale decidires de propósito o que queres."]
        ],
        quiz: [
          { p: "Estás a somar 5000 preços em euros guardados em `float`. Que risco corres?", o: ["Nenhum, o erro é pequeno demais","Erros de arredondamento que se acumulam e dão um total diferente do da contabilidade","O programa fica lento"], c: 1,
            e: "Cada soma acrescenta um erro minúsculo. Ao fim de milhares de operações, a diferença aparece nas casas dos cêntimos, que é exatamente onde alguém está a olhar." }
        ],
        exercicio: {
          ficheiro: "repartir.py",
          enunciado: "Escreve `dividir_conta(total_cent, pessoas)`, que reparte um total em cêntimos. Devolve uma lista de inteiros cuja soma é exatamente o total; os cêntimos que sobram vão, um a um, para as primeiras pessoas. Se `pessoas` for menor que 1, levanta `ValueError`.",
          inicio: String.raw`def dividir_conta(total_cent, pessoas):
    pass
`,
          testes: String.raw`import pytest

from repartir import dividir_conta


def test_divisao_exata():
    assert dividir_conta(1000, 4) == [250, 250, 250, 250]


def test_a_soma_e_sempre_o_total():
    assert sum(dividir_conta(1001, 3)) == 1001


def test_a_sobra_vai_para_os_primeiros():
    assert dividir_conta(1001, 3) == [334, 334, 333]


def test_uma_pessoa_paga_tudo():
    assert dividir_conta(777, 1) == [777]


def test_total_zero():
    assert dividir_conta(0, 2) == [0, 0]


def test_devolve_inteiros():
    assert all(type(x) is int for x in dividir_conta(100, 3))


def test_zero_pessoas_e_recusado():
    with pytest.raises(ValueError):
        dividir_conta(100, 0)
`
        }
      },
      {
        id: "9.2", titulo: "Texto: strings por dentro", min: 18, estado: "pronta",
        meta: "No fim: limpas e transformas texto com os métodos certos e percebes de onde vêm os erros de acentos.",
        blocos: [
          ["p", "Uma string é uma sequência imutável de caracteres. Imutável quer dizer que nenhum método altera a string: todos devolvem uma nova. `texto.strip()` sozinho numa linha não faz nada de útil, e é um erro que toda a gente comete uma vez."],
          ["py", String.raw`texto = "  Ana Silva  "
texto.strip()
print(repr(texto))

texto = texto.strip()
print(repr(texto))`],
          ["h", "Índices e fatias"],
          ["py", String.raw`nome = "relatorio.csv"
print(nome[0], nome[-1])
print(nome[:9])
print(nome[-3:])
print(nome[::-1])
print(len(nome))`],
          ["h", "Os métodos que usas todos os dias"],
          ["lista", [
            "`strip()`, `lstrip()`, `rstrip()`: tiram espaços (ou os caracteres que indicares) das pontas.",
            "`lower()`, `upper()`, `casefold()`: caixa. Para comparar, `casefold()` é o mais correto.",
            "`split(\";\")` e `\"; \".join(lista)`: partir e juntar. São inversos um do outro.",
            "`replace(a, b)`: substitui todas as ocorrências.",
            "`startswith()`, `endswith()`: aceitam um tuplo de hipóteses.",
            "`removeprefix()`, `removesuffix()`: tiram só se lá estiver, sem o risco de `replace`.",
            "`zfill(5)`: enche com zeros à esquerda, útil para códigos postais e números de fatura.",
            "`isdigit()`, `isalpha()`: testam o conteúdo, mas cuidado, `\"-3\".isdigit()` é `False`."
          ]],
          ["py", String.raw`linha = " TECLADO ; 39,90 ; 2 "
produto, preco, qtd = [p.strip() for p in linha.split(";")]
print(produto.capitalize(), float(preco.replace(",", ".")), int(qtd))`],
          ["aviso", "Construir texto com `texto += linha` dentro de um ciclo cria uma string nova em cada volta e copia tudo outra vez. Com 100 mil linhas isso é lentidão a sério. Junta numa lista e faz `\"\".join(lista)` no fim."],
          ["h", "Acentos, bytes e o dia em que o ficheiro rebenta"],
          ["p", "Uma `str` são caracteres. Um ficheiro no disco são bytes. A tradução entre os dois chama-se codificação, e hoje a resposta certa é quase sempre UTF-8. `UnicodeDecodeError` significa que estás a ler bytes com a tabela errada."],
          ["py", String.raw`palavra = "olá"
print(len(palavra))
print(palavra.encode("utf-8"))
print(len(palavra.encode("utf-8")))
print(b"ol\xc3\xa1".decode("utf-8"))`],
          ["obra", "O ficheiro que o cliente exportou do Excel vem em `cp1252` ou `latin-1` e traz um BOM à cabeça. Abre-se com `encoding=\"utf-8-sig\"` quando há BOM, e pede-se a origem do ficheiro quando há acentos partidos. Escreve sempre `encoding=` explícito: o valor por omissão muda de sistema para sistema e o teu código deixa de funcionar na máquina do colega."],
          ["h", "Formatar"],
          ["py", String.raw`produto, valor, n = "teclado", 39.9, 7
print(f"{produto:>12} | {valor:8.2f} | {n:03d}")
print(f"{valor:,.2f}")
print(f"valor bruto: {produto!r}")`],
          ["aviso", "`\"Ana\" == \"ana\"` é `False`, e `\"ana\"` não é igual a `\"aña\"` nem a `\"a n a\"`. Antes de comparar texto escrito por pessoas, normaliza: `casefold()` e `strip()` no mínimo."]
        ],
        quiz: [
          { p: "Estás a construir um relatório de 200 mil linhas com `texto += linha` dentro do ciclo. Qual é o problema?", o: ["Nenhum, é assim que se faz","As strings são imutáveis: cada volta copia tudo outra vez e o custo cresce ao quadrado","Falta usar f-strings"], c: 1,
            e: "Acumula as linhas numa lista e junta uma vez com `\"\\n\".join(linhas)`. É a diferença entre segundos e minutos." }
        ],
        exercicio: {
          ficheiro: "nomes.py",
          enunciado: "Escreve `normalizar(nome)`, que limpa um nome escrito por uma pessoa: tira os espaços das pontas, reduz espaços repetidos (e mudanças de linha) a um só espaço, e põe cada palavra com a primeira letra maiúscula e o resto minúsculo.",
          inicio: String.raw`def normalizar(nome):
    pass
`,
          testes: String.raw`from nomes import normalizar


def test_espacos_nas_pontas():
    assert normalizar("  ana silva  ") == "Ana Silva"


def test_espacos_repetidos():
    assert normalizar("ana    maria") == "Ana Maria"


def test_maiusculas_a_mais():
    assert normalizar("JOAO PEDRO") == "Joao Pedro"


def test_acentos_preservados():
    assert normalizar("joão") == "João"


def test_so_espacos_da_texto_vazio():
    assert normalizar("   ") == ""


def test_nome_ja_correto_nao_muda():
    assert normalizar("Ana Silva") == "Ana Silva"


def test_mudancas_de_linha_contam_como_espaco():
    assert normalizar("ana\nsilva") == "Ana Silva"
`
        }
      },
      {
        id: "9.3", titulo: "Verdadeiro, falso e None", min: 13, estado: "pronta",
        meta: "No fim: percebes porque é que o desconto de 0 por cento desapareceu do sistema.",
        blocos: [
          ["p", "Em Python, qualquer valor pode ser usado numa condição. Há uma lista curta de coisas falsas e tudo o resto é verdadeiro."],
          ["lista", [
            "Falsos: `False`, `None`, `0`, `0.0`, `\"\"`, `[]`, `{}`, `set()`, `()`.",
            "Verdadeiros: tudo o resto, incluindo `\"0\"`, `\"False\"`, `[0]` e `-1`."
          ]],
          ["py", String.raw`for valor in [0, "", [], "0", [0], -1, None]:
    print(repr(valor), "->", bool(valor))`],
          ["p", "Isto torna o código agradável: `if not lista:` em vez de `if len(lista) == 0:`. E torna-o perigoso exatamente no mesmo sítio."],
          ["h", "O bug do zero"],
          ["py", String.raw`pedido = {"produto": "teclado", "desconto": 0}

desconto = pedido.get("desconto") or 10
print("com or:", desconto)

desconto = pedido["desconto"] if pedido.get("desconto") is not None else 10
print("com is not None:", desconto)`],
          ["p", "O `or` para valores por omissão só está certo quando `0`, `\"\"` e `False` não são valores legítimos. Como raramente sabes isso de antemão, a forma segura é perguntar por `None`."],
          ["h", "None é ausência, não é zero"],
          ["p", "`None` significa 'não há valor'. Serve para dizer que um campo não foi preenchido, que uma pesquisa não encontrou nada, que um argumento não foi dado. É diferente de zero, de vazio e de falso, e essa diferença costuma ser informação de negócio."],
          ["lista", [
            "Preço `None`: ainda não sabemos o preço.",
            "Preço `0`: é grátis.",
            "Guardar os dois como `0` é perder informação que alguém vai pedir."
          ]],
          ["h", "is e =="],
          ["p", "`==` compara valores. `is` pergunta se são exatamente o mesmo objeto na memória. Usa-se `is` com `None`, `True` e `False`, e com mais nada."],
          ["py", String.raw`a = [1, 2]
b = [1, 2]
print(a == b, a is b)

x = None
print(x is None)`],
          ["aviso", "`a is b` com números pequenos às vezes dá `True` porque o Python reutiliza objetos para inteiros pequenos e textos curtos. É um detalhe da implementação e não é para contar com ele. Compara números com `==`, sempre."],
          ["obra", "'O campo de desconto a zero está a ser ignorado' e 'a quantidade 0 aparece como 1 na fatura' são bilhetes de bug reais, e são quase sempre a mesma linha: um `or` a servir de valor por omissão. Quando fores rever código, procura `or` à direita de um `get`."]
        ],
        quiz: [
          { p: "`quantidade = linha.get('quantidade') or 1`. Que bug tem?", o: ["Nenhum","Uma quantidade de 0 passa a valer 1","Rebenta se a chave não existir"], c: 1,
            e: "`0` é falso, por isso o `or` avança para o `1`. Uma encomenda com quantidade zero passa a ter um item. A versão correta pergunta por `None`." }
        ],
        exercicio: {
          ficheiro: "omissao.py",
          enunciado: "Escreve `com_omissao(valor, omissao)`, que devolve `omissao` apenas quando `valor` é `None`. Qualquer outro valor, incluindo `0`, `\"\"`, `False` e listas vazias, é devolvido tal e qual.",
          inicio: String.raw`def com_omissao(valor, omissao):
    pass
`,
          testes: String.raw`import pytest

from omissao import com_omissao


def test_none_e_substituido():
    assert com_omissao(None, 10) == 10


@pytest.mark.parametrize("valor", [0, "", False, [], 0.0])
def test_valores_falsos_sao_mantidos(valor):
    assert com_omissao(valor, "omissão") is valor


def test_valor_normal_e_mantido():
    assert com_omissao(5, 10) == 5


def test_omissao_none_tambem_funciona():
    assert com_omissao(None, None) is None
`
        }
      },
      {
        id: "9.4", titulo: "Mutável, imutável e referências", min: 16, estado: "pronta",
        meta: "No fim: percebes porque é que alterar uma lista dentro de uma função mudou os dados de quem a chamou.",
        blocos: [
          ["p", "Uma variável não é uma caixa com um valor lá dentro: é um nome colado a um objeto. `b = a` não copia o objeto, cola outro nome ao mesmo objeto. Enquanto o objeto for imutável, isto nunca te incomoda. Quando é mutável, é a origem de uma família inteira de bugs."],
          ["py", String.raw`a = [1, 2, 3]
b = a
b.append(4)
print(a)
print(a is b)

c = a[:]      # cópia
c.append(5)
print(a, c)`],
          ["lista", [
            "Imutáveis: `int`, `float`, `str`, `bool`, `tuple`, `frozenset`, `bytes`.",
            "Mutáveis: `list`, `dict`, `set`, e praticamente todos os objetos que escreveres."
          ]],
          ["h", "Passar a uma função"],
          ["py", String.raw`def acrescentar_iva(precos):
    for i in range(len(precos)):
        precos[i] = round(precos[i] * 1.23, 2)
    return precos

originais = [100.0, 50.0]
com_iva = acrescentar_iva(originais)
print(com_iva)
print(originais)`],
          ["p", "Os preços originais desapareceram. A função recebeu o mesmo objeto, não uma cópia. A versão correta constrói uma lista nova e não toca no que recebeu."],
          ["py", String.raw`def com_iva(precos):
    return [round(p * 1.23, 2) for p in precos]

originais = [100.0, 50.0]
print(com_iva(originais), originais)`],
          ["h", "O argumento por omissão mutável"],
          ["py", String.raw`def registar(evento, historico=[]):
    historico.append(evento)
    return historico

print(registar("a"))
print(registar("b"))`],
          ["p", "A lista por omissão é criada uma vez, quando a função é definida, e fica a ser partilhada por todas as chamadas. Nunca é o que queres. O padrão correto usa `None`:"],
          ["py", String.raw`def registar(evento, historico=None):
    historico = list(historico) if historico is not None else []
    historico.append(evento)
    return historico

print(registar("a"))
print(registar("b"))`],
          ["h", "Copiar em profundidade"],
          ["py", String.raw`import copy

original = {"cliente": "Ana", "linhas": [{"produto": "teclado"}]}
rasa = dict(original)
funda = copy.deepcopy(original)

rasa["linhas"][0]["produto"] = "rato"
print(original["linhas"][0]["produto"])
print(funda["linhas"][0]["produto"])`],
          ["p", "`dict(x)`, `list(x)` e `x[:]` copiam um nível. O que está lá dentro continua a ser partilhado. Para estruturas encaixadas é `copy.deepcopy`, que é mais lento e às vezes é exatamente o que precisas."],
          ["h", "Porque é que uma lista não pode ser chave de dicionário"],
          ["py", String.raw`d = {}
d[(1, 2)] = "tuplo serve"
print(d)
try:
    d[[1, 2]] = "lista nao"
except TypeError as e:
    print("TypeError:", e)`],
          ["p", "Uma chave precisa de um código de dispersão estável. Se o objeto pudesse mudar, mudaria de sítio na tabela e o dicionário perdia-o. Por isso só objetos imutáveis servem de chave."],
          ["obra", "A regra da casa em quase todas as equipas: ou a função devolve uma coisa nova e não toca no que recebeu, ou altera o que recebeu e devolve `None`. Fazer as duas ao mesmo tempo é como se criam bugs que aparecem a três ficheiros de distância. O `.sort()` e o `sorted()` do Python são esta regra aplicada."],
          ["aviso", "Alterar uma lista enquanto a percorres salta elementos. `for x in lista: lista.remove(x)` deixa metade lá dentro. Percorre uma cópia (`for x in list(lista)`) ou constrói uma lista nova com os que ficam."]
        ],
        quiz: [
          { p: "`def registar(evento, historico=[])`. Porque é que isto está errado?", o: ["Porque listas não podem ser argumentos","Porque a lista é criada uma vez e fica partilhada entre todas as chamadas","Porque devia ser um tuplo"], c: 1,
            e: "O valor por omissão é avaliado quando a função é definida, não a cada chamada. Usa `None` e cria a lista lá dentro." }
        ],
        exercicio: {
          ficheiro: "carrinho_seguro.py",
          enunciado: "Escreve `adicionar(item, carrinho=None)`, que devolve um carrinho com o item acrescentado no fim. Sem carrinho, começa um novo. Nunca altera o carrinho recebido nem partilha estado entre chamadas.",
          inicio: String.raw`def adicionar(item, carrinho=[]):
    carrinho.append(item)
    return carrinho
`,
          testes: String.raw`from carrinho_seguro import adicionar


def test_comeca_um_carrinho_novo():
    assert adicionar("pão") == ["pão"]


def test_chamadas_nao_partilham_estado():
    adicionar("pão")
    assert adicionar("leite") == ["leite"]


def test_acrescenta_ao_carrinho_recebido():
    assert adicionar("leite", ["pão"]) == ["pão", "leite"]


def test_nao_altera_o_carrinho_recebido():
    carrinho = ["pão"]
    novo = adicionar("leite", carrinho)
    assert carrinho == ["pão"]
    assert novo is not carrinho


def test_carrinho_vazio_explicito():
    assert adicionar("pão", []) == ["pão"]
`
        }
      }
  ]
});
