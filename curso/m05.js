/* Módulo 5: Repetição. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 5, fase: 1, titulo: "Repetição",
  objetivo: "Pôr o computador a repetir o trabalho aborrecido, e saber seguir um ciclo à mão quando ele não faz o que devia.",
  licoes: [
      {
        id: "5.1", titulo: "while: repetir enquanto", min: 14, estado: "pronta",
        meta: "No fim: escreves ciclos while com início, condição e mudança, e sabes evitar o ciclo infinito.",
        blocos: [
          ["p", "`while` repete um bloco enquanto uma condição for verdadeira. Antes de cada volta, o Python volta a testar a condição; quando ela fica falsa, o ciclo acaba e o programa continua na linha seguinte."],
          ["py", String.raw`contador = 1
while contador <= 5:
    print(contador)
    contador += 1
print("fim")`],
          ["lista", [
            "Um valor inicial, antes do ciclo: `contador = 1`.",
            "Uma condição, que diz até quando: `contador <= 5`.",
            "Uma mudança, dentro do ciclo, que um dia torna a condição falsa: `contador += 1`."
          ]],
          ["p", "Esquece a terceira e tens um ciclo infinito: o programa nunca acaba. Carrega em Ctrl+C no terminal para o interromper."],
          ["h", "Quando não sabes quantas voltas"],
          ["py", String.raw`saldo = 1000
anos = 0
while saldo < 2000:
    saldo = saldo * 1.05
    anos += 1
print(anos, round(saldo, 2))`],
          ["p", "Aqui não sabes à partida quantos anos são precisos para duplicar o dinheiro a 5%. É exatamente para isto que serve o `while`: repetir até uma condição mudar."],
          ["py", String.raw`restante = 100
tentativas = 0

while restante > 0 and tentativas < 5:
    restante = restante // 3
    tentativas += 1
    print(tentativas, restante)`],
          ["aviso", "Todo o `while` precisa de algo que mude a condição dentro do corpo, e de um limite de segurança. Um ciclo infinito num script de produção é um servidor a 100 por cento de CPU e um telefonema às três da manhã."],
          ["h", "Perguntar até ter uma resposta válida"],
          ["code", String.raw`resposta = ""
while resposta != "s" and resposta != "n":
    resposta = input("Continuar? (s/n) ").strip().lower()`],
          ["obra", "`while` aparece no trabalho em sítios como: pedir páginas a um serviço até vir uma vazia, tentar de novo até uma ligação responder, ler um ficheiro até ao fim. Em todos, quem tem experiência põe um limite máximo de voltas, para o dia em que a condição nunca muda."]
        ],
        quiz: [
          { p: "`n = 0` e depois `while n < 3: n += 1`. Quantas voltas dá o ciclo?", o: ["2","3","4"], c: 1,
            e: "Com n a 0, 1 e 2 a condição é verdadeira. Quando n chega a 3, pára. Três voltas." },
          { p: "Um `while` nunca acaba. Qual é a causa mais provável?", o: ["O Python é lento","Nada dentro do ciclo altera a condição","Falta um else"], c: 1,
            e: "Se nada muda, a condição que era verdadeira antes da primeira volta continua verdadeira para sempre." }
        ],
        exercicio: {
          ficheiro: "poupanca.py",
          enunciado: "Escreve `anos_ate_objetivo(inicial, taxa, objetivo)`, que conta quantos anos são precisos para um depósito chegar ao objetivo, com juros compostos: todos os anos o saldo é multiplicado por `1 + taxa`. Se o depósito já atinge o objetivo, são 0 anos. Com `inicial` ou `taxa` menores ou iguais a zero o objetivo nunca seria atingido: levanta `ValueError` em vez de entrar num ciclo infinito.",
          inicio: String.raw`def anos_ate_objetivo(inicial, taxa, objetivo):
    pass
`,
          testes: String.raw`import pytest

from poupanca import anos_ate_objetivo


def test_duplicar_a_cinco_por_cento():
    assert anos_ate_objetivo(1000, 0.05, 2000) == 15


def test_um_ano_chega():
    assert anos_ate_objetivo(1000, 0.1, 1100) == 1


def test_objetivo_ja_atingido():
    assert anos_ate_objetivo(500, 0.02, 400) == 0


def test_exatamente_no_objetivo_sao_zero_anos():
    assert anos_ate_objetivo(400, 0.02, 400) == 0


def test_taxa_zero_nunca_chegaria():
    with pytest.raises(ValueError):
        anos_ate_objetivo(1000, 0, 2000)


def test_deposito_zero_nunca_chegaria():
    with pytest.raises(ValueError):
        anos_ate_objetivo(0, 0.05, 2000)
`
        }
      },
      {
        id: "5.2", titulo: "for e range", min: 13, estado: "pronta",
        meta: "No fim: repetes um bloco um número conhecido de vezes com for e range, e escolhes entre for e while.",
        blocos: [
          ["p", "`for` repete o bloco uma vez para cada valor de uma sequência. A sequência mais simples é a do `range`, que produz números inteiros."],
          ["py", String.raw`for i in range(5):
    print(i)`],
          ["p", "`range(5)` dá 0, 1, 2, 3 e 4: começa em zero e o fim fica de fora. Com dois números dizes onde começa, com três dizes também o passo."],
          ["py", String.raw`for n in range(1, 6):
    print(n, n * n)

for n in range(10, 0, -3):
    print(n)`],
          ["p", "Em cada volta, a variável do ciclo (`n`) passa a valer o número seguinte. Dá-lhe um nome que diga o que é. Se não a usares no corpo, o costume é chamar-lhe `_`: `for _ in range(3):`."],
          ["h", "for ou while?"],
          ["lista", [
            "`for` quando sabes quantas voltas são, ou tens uma sequência para percorrer.",
            "`while` quando o fim depende de alguma coisa que muda lá dentro e não sabes quando."
          ]],
          ["code", String.raw`# o contador da aula anterior, escrito com for
for contador in range(1, 6):
    print(contador)`],
          ["p", "Com o `for` não há contador para iniciar nem para incrementar, e por isso não há ciclo infinito possível."],
          ["aviso", "O fim do `range` fica de fora: `range(1, 10)` vai até 9. É assim de propósito e combina com o resto da linguagem, mas vais escrever `range(1, n)` quando querias `range(1, n + 1)` pelo menos uma vez. A aula 5.6 é sobre apanhar estes erros."],
          ["obra", "Um `while` com um contador feito à mão onde um `for` servia é dos comentários mais comuns em revisão de código de quem está a começar. No `for` escreves o que queres percorrer, e o Python trata do resto."]
        ],
        quiz: [
          { p: "Que números produz `range(2, 8, 2)`?", o: ["2, 4, 6, 8","2, 4, 6","2, 8"], c: 1,
            e: "Começa em 2, anda de 2 em 2 e pára antes do 8." },
          { p: "Quantas voltas dá `for i in range(5)`?", o: ["4","5","6"], c: 1,
            e: "De 0 a 4 são cinco números. `range(n)` dá sempre n voltas." }
        ],
        exercicio: {
          ficheiro: "tabuada.py",
          enunciado: "Escreve `soma_ate(n)`, que devolve 1 + 2 + ... + n com um ciclo `for` (0 quando n é menor que 1), e `tabuada(n)`, que devolve o texto da tabuada de n, de 1 a 10, com uma linha por multiplicação no formato `7 x 3 = 21` e cada linha terminada em `\\n`.",
          inicio: String.raw`def soma_ate(n):
    pass


def tabuada(n):
    pass
`,
          testes: String.raw`from tabuada import soma_ate, tabuada


def test_soma_ate_dez():
    assert soma_ate(10) == 55


def test_soma_ate_um():
    assert soma_ate(1) == 1


def test_soma_ate_zero_e_negativos():
    assert soma_ate(0) == 0
    assert soma_ate(-4) == 0


def test_primeira_e_ultima_linha_da_tabuada():
    linhas = tabuada(7).splitlines()
    assert linhas[0] == "7 x 1 = 7"
    assert linhas[-1] == "7 x 10 = 70"


def test_tabuada_completa():
    esperado = "".join(f"3 x {i} = {3 * i}\n" for i in range(1, 11))
    assert tabuada(3) == esperado
`
        }
      },
      {
        id: "5.3", titulo: "Percorrer texto letra a letra", min: 14, estado: "pronta",
        meta: "No fim: percorres uma string com for, vais buscar caracteres pela posição e usas in e os métodos que respondem a perguntas sobre texto.",
        blocos: [
          ["p", "Uma string é uma sequência de caracteres, e o `for` percorre-a um carácter de cada vez."],
          ["py", String.raw`for letra in "Ana":
    print(letra)`],
          ["h", "Posições"],
          ["py", String.raw`palavra = "python"
print(palavra[0])
print(palavra[5])
print(palavra[-1])
print(len(palavra))`],
          ["p", "Cada carácter tem uma posição, o índice, que começa em 0. O último está em `len(palavra) - 1`, que também se escreve `-1`. Índices negativos contam a partir do fim."],
          ["h", "Pertence?"],
          ["py", String.raw`print("a" in "banana")
print("nan" in "banana")
print("x" not in "banana")`],
          ["p", "`in` pergunta se um texto aparece dentro de outro, e devolve um booleano. Serve para uma letra ou para um pedaço maior."],
          ["h", "Percorrer com a posição"],
          ["py", String.raw`palavra = "casa"
for i in range(len(palavra)):
    print(i, palavra[i])`],
          ["p", "Quando precisas de saber onde estás, percorres as posições com `range(len(...))`. A aula 6.5 mostra uma forma mais limpa, o `enumerate`."],
          ["h", "Métodos que respondem a perguntas"],
          ["py", String.raw`print("7".isdigit(), "a".isalpha(), " ".isspace())
print("Olá".startswith("Ol"), "foto.png".endswith(".png"))
print("banana".count("a"), "banana".find("n"))`],
          ["aviso", "O primeiro carácter é `texto[0]` e o último é `texto[-1]`. Pedir `texto[len(texto)]` dá `IndexError: string index out of range`, porque essa posição já está depois do fim."],
          ["obra", "Validar um código postal, contar os separadores de uma linha, confirmar que uma palavra-passe tem algarismos: percorrer texto carácter a carácter aparece em todo o lado, mesmo quando há um método que já o faz por ti. Saber fazê-lo à mão é o que te deixa perceber o método."]
        ],
        quiz: [
          { p: "O que dá `\"python\"[1]`?", o: ["\"p\"","\"y\"","Dá erro"], c: 1,
            e: "O índice começa em 0: `p` é o 0, `y` é o 1." },
          { p: "O que dá `\"a\" in \"Ana\"`?", o: ["True","False"], c: 1,
            e: "`A` maiúsculo e `a` minúsculo são caracteres diferentes. Com `\"a\" in \"Ana\".lower()` seria `True`." }
        ],
        exercicio: {
          ficheiro: "letras.py",
          enunciado: "Escreve três funções com `for`. `contar_vogais(texto)` conta as vogais, maiúsculas ou minúsculas, incluindo as acentuadas `áàâãéêíóôõú`. `tem_algarismo(texto)` diz se há pelo menos um algarismo. `inverter(texto)` devolve o texto ao contrário, construído letra a letra.",
          inicio: String.raw`def contar_vogais(texto):
    pass


def tem_algarismo(texto):
    pass


def inverter(texto):
    pass
`,
          testes: String.raw`from letras import contar_vogais, inverter, tem_algarismo


def test_conta_vogais_simples():
    assert contar_vogais("banana") == 3


def test_maiusculas_e_acentos_contam():
    assert contar_vogais("ÁRVORE à janela") == 7


def test_sem_vogais():
    assert contar_vogais("xyz") == 0
    assert contar_vogais("") == 0


def test_tem_algarismo():
    assert tem_algarismo("rua 5 de outubro") is True


def test_sem_algarismos():
    assert tem_algarismo("sem numeros") is False
    assert tem_algarismo("") is False


def test_inverter():
    assert inverter("python") == "nohtyp"


def test_inverter_vazio_e_uma_letra():
    assert inverter("") == ""
    assert inverter("a") == "a"
`
        }
      },
      {
        id: "5.4", titulo: "Acumular: somas, contagens e o maior", min: 14, estado: "pronta",
        meta: "No fim: usas o padrão do acumulador para somar, contar, encontrar o maior e construir texto dentro de um ciclo.",
        blocos: [
          ["p", "Quase todos os ciclos úteis têm a mesma forma: uma variável criada antes do ciclo, atualizada em cada volta, e usada depois do fim. Chama-se acumulador."],
          ["py", String.raw`total = 0
for n in range(1, 11):
    total += n
print(total)`],
          ["h", "Contar"],
          ["py", String.raw`texto = "o rato roeu a rolha"
quantos_r = 0
for letra in texto:
    if letra == "r":
        quantos_r += 1
print(quantos_r)`],
          ["p", "Contar é somar 1 só quando uma condição se verifica."],
          ["h", "O maior"],
          ["py", String.raw`algarismos = "39481"
maior = None
for c in algarismos:
    d = int(c)
    if maior is None or d > maior:
        maior = d
print(maior)`],
          ["p", "Porque começar com `None` e não com 0? Porque com números negativos o 0 ganhava a todos sem estar lá. `None` quer dizer 'ainda não vi nenhum', e a primeira volta substitui-o sempre. Se não houver nenhum, a resposta fica `None`, o que também é honesto."],
          ["h", "Construir texto"],
          ["py", String.raw`frase = "olá mundo"
sem_vogais = ""
for letra in frase:
    if letra not in "aeiouá":
        sem_vogais += letra
print(sem_vogais)`],
          ["aviso", "Criar o acumulador dentro do ciclo: `for n in ...:` seguido de `total = 0` e `total += n` recomeça do zero em cada volta, e no fim só tens o último valor. O acumulador nasce antes do ciclo."],
          ["obra", "Somar vendas, contar erros num registo, encontrar a encomenda mais cara: a maioria dos relatórios que te vão pedir é este padrão com dados diferentes. Mais à frente vais usar atalhos como `sum`, `max` e `Counter`, e vais perceber o que fazem porque já o escreveste à mão."]
        ],
        quiz: [
          { p: "Este código devia somar de 1 a 5 e mostra 5. Porquê?\n`for n in range(1, 6):`\n`    total = 0`\n`    total += n`", o: ["O range está errado","O total volta a zero em cada volta","Falta o return"], c: 1,
            e: "O acumulador tem de ser criado uma vez, antes do ciclo." }
        ],
        exercicio: {
          ficheiro: "acumular.py",
          enunciado: "Escreve três funções com o padrão do acumulador. `soma_algarismos(texto)` soma os algarismos que aparecem no texto e ignora o resto (`\"a1b2c3\"` dá 6). `maior_algarismo(texto)` devolve o maior algarismo como inteiro, ou `None` se não houver nenhum. `apenas_letras(texto)` devolve só as letras, pela ordem original.",
          inicio: String.raw`def soma_algarismos(texto):
    pass


def maior_algarismo(texto):
    pass


def apenas_letras(texto):
    pass
`,
          testes: String.raw`from acumular import apenas_letras, maior_algarismo, soma_algarismos


def test_soma_algarismos():
    assert soma_algarismos("a1b2c3") == 6


def test_soma_sem_algarismos_e_zero():
    assert soma_algarismos("abc") == 0


def test_maior_algarismo():
    assert maior_algarismo("x39481") == 9


def test_maior_quando_so_ha_zeros():
    assert maior_algarismo("a0b0") == 0


def test_sem_algarismos_devolve_none():
    assert maior_algarismo("sem nada") is None


def test_apenas_letras():
    assert apenas_letras("R. 5 de Outubro, 12") == "RdeOutubro"


def test_apenas_letras_de_texto_vazio():
    assert apenas_letras("") == ""
`
        }
      },
      {
        id: "5.5", titulo: "break e continue", min: 12, estado: "pronta",
        meta: "No fim: sais de um ciclo a meio, saltas voltas e usas o else do for para o caso 'procurei e não encontrei'.",
        blocos: [
          ["p", "`break` sai do ciclo já. `continue` salta para a volta seguinte. Usados com moderação limpam código; usados a cada cinco linhas tornam o ciclo impossível de seguir."],
          ["py", String.raw`for letra in "abc-def":
    if letra == "-":
        break
    print(letra)`],
          ["py", String.raw`for n in range(1, 11):
    if n % 3 == 0:
        continue
    print(n)`],
          ["h", "O else do for"],
          ["p", "Um `for` pode ter `else`, que corre só se o ciclo terminou sem `break`. Serve exatamente para o caso procurar e não encontrar."],
          ["py", String.raw`texto = "codigo123"
for c in texto:
    if c.isdigit():
        print("tem algarismos, o primeiro é", c)
        break
else:
    print("sem algarismos")`],
          ["h", "while True com break"],
          ["p", "Quando a condição de saída só se conhece a meio da volta, escreve-se um ciclo sem fim e um `break` bem visível:"],
          ["code", String.raw`total = 0
while True:
    resposta = input("Valor (ou fim): ")
    if resposta == "fim":
        break
    total += float(resposta)
print("total:", total)`],
          ["aviso", "`break` só sai do ciclo onde está. Dentro de dois ciclos encaixados, o de fora continua. Se precisas de sair dos dois, põe os ciclos numa função e usa `return`."],
          ["obra", "`while True` com um `break` à vista é um padrão aceite para ciclos de leitura. Um ciclo com três `break` e dois `continue` espalhados não é: aí, ou a condição está no sítio errado, ou o corpo pede uma função própria."]
        ],
        quiz: [
          { p: "O que faz `continue`?", o: ["Sai do ciclo","Salta o resto desta volta e passa à seguinte","Recomeça o ciclo do início"], c: 1,
            e: "O ciclo continua; só o resto desta volta é que não corre." },
          { p: "Quando corre o `else` de um `for`?", o: ["Sempre que o ciclo acaba","Quando o ciclo acaba sem ter passado por um break","Quando o ciclo não dá nenhuma volta"], c: 1,
            e: "É o ramo do 'procurei tudo e não encontrei'. Se houve `break`, não corre." }
        ],
        exercicio: {
          ficheiro: "procura.py",
          enunciado: "Escreve três funções. `primeiro_algarismo(texto)` devolve a posição do primeiro algarismo, ou `-1` se não houver. `ate_ao_ponto(texto)` devolve o texto até ao primeiro ponto final, sem o incluir (o texto todo se não houver ponto), usando `break`. `sem_espacos(texto)` devolve o texto sem espaços, usando `continue`.",
          inicio: String.raw`def primeiro_algarismo(texto):
    pass


def ate_ao_ponto(texto):
    pass


def sem_espacos(texto):
    pass
`,
          testes: String.raw`import inspect

from procura import ate_ao_ponto, primeiro_algarismo, sem_espacos


def test_posicao_do_primeiro_algarismo():
    assert primeiro_algarismo("abc7d9") == 3


def test_algarismo_logo_no_inicio():
    assert primeiro_algarismo("1abc") == 0


def test_sem_algarismos_da_menos_um():
    assert primeiro_algarismo("abc") == -1
    assert primeiro_algarismo("") == -1


def test_ate_ao_ponto():
    assert ate_ao_ponto("Olá. Tudo bem.") == "Olá"


def test_sem_ponto_devolve_tudo():
    assert ate_ao_ponto("sem ponto") == "sem ponto"


def test_ate_ao_ponto_usa_break():
    assert "break" in inspect.getsource(ate_ao_ponto)


def test_sem_espacos():
    assert sem_espacos(" a b  c ") == "abc"


def test_sem_espacos_usa_continue():
    assert "continue" in inspect.getsource(sem_espacos)
`
        }
      },
      {
        id: "5.6", titulo: "Seguir um ciclo à mão", min: 15, estado: "pronta",
        meta: "No fim: encontras erros em ciclos com uma tabela de rastreio e apanhas os erros de um a mais ou um a menos.",
        blocos: [
          ["p", "Quando um ciclo dá o resultado errado, a tentação é mexer no código até bater certo. Há um método melhor e mais rápido: seguir o ciclo à mão, numa tabela, volta a volta."],
          ["code", String.raw`def soma_pares(n):
    # soma os pares de 1 até n, inclusive
    total = 0
    for i in range(0, n, 2):
        total += i
    return total


soma_pares(6)   # devia dar 2 + 4 + 6 = 12, dá 6`],
          ["code", String.raw`volta    i    total
antes    -    0
1        0    0
2        2    2
3        4    6
fim: o range pára antes do 6`],
          ["p", "A tabela mostra o erro sem adivinhar: o 6 nunca entra, porque o fim do `range` fica de fora. A correção é `range(0, n + 1, 2)`, e agora sabes porquê."],
          ["h", "Prints que ajudam"],
          ["py", String.raw`total = 0
for i in range(0, 6, 2):
    total += i
    print(f"{i=} {total=}")`],
          ["p", "Um `=` dentro das chavetas de uma f-string mostra o nome e o valor. É a tabela de rastreio feita pelo próprio Python. Tira estes prints antes de guardares no git."],
          ["h", "Os erros de um a mais ou um a menos"],
          ["lista", [
            "O fim do `range` fica de fora.",
            "Começar em 0 ou em 1: o primeiro elemento é o 0, a primeira volta de `range(1, n)` é o 1.",
            "`<` ou `<=` na condição de um `while`.",
            "O valor inicial do acumulador: 0 para somas, 1 para produtos, `\"\"` para texto."
          ]],
          ["h", "Testar as fronteiras"],
          ["p", "Estes erros escondem-se nos casos maiores e aparecem nos mais pequenos. Testa sempre com 0, com 1 e com o texto vazio: se a função sobrevive a esses, é raro falhar nos do meio."],
          ["aviso", "Mexer no código até o resultado bater certo, sem perceber porquê, é o caminho mais rápido para um bug novo noutro caso. Primeiro a tabela, depois a correção."],
          ["obra", "Em entrevistas técnicas é comum pedirem-te para executar à mão um pedaço de código no quadro. É exatamente esta tabela. Quem a faz com calma e em voz alta passa; quem adivinha, não."]
        ],
        quiz: [
          { p: "`for i in range(1, n): total += i` devia somar de 1 a n. Onde está o erro?", o: ["Devia começar em 0","Devia ser range(1, n + 1)","Não há erro"], c: 1,
            e: "O `n` fica de fora porque o fim do `range` é exclusivo." }
        ],
        exercicio: {
          ficheiro: "rastreio.py",
          enunciado: "As três funções têm erros de um a mais ou um a menos, e uma delas tem também o acumulador mal iniciado. Faz a tabela de rastreio de cada uma com um caso pequeno, encontra os erros e corrige-os sem reescrever as funções do zero. Os comentários dizem o que cada função devia fazer.",
          inicio: String.raw`def soma_pares(n):
    # soma os pares de 1 até n, inclusive
    total = 0
    for i in range(0, n, 2):
        total += i
    return total


def fatorial(n):
    # devolve 1 x 2 x ... x n; o fatorial de 0 é 1
    resultado = 0
    for i in range(1, n):
        resultado *= i
    return resultado


def contar_algarismos(texto):
    # conta os algarismos do texto
    total = 0
    i = 1
    while i < len(texto):
        if texto[i].isdigit():
            total += 1
        i += 1
    return total
`,
          testes: String.raw`from rastreio import contar_algarismos, fatorial, soma_pares


def test_soma_pares_inclui_o_proprio_n():
    assert soma_pares(6) == 12


def test_soma_pares_com_n_impar():
    assert soma_pares(7) == 12


def test_soma_pares_pequenos():
    assert soma_pares(0) == 0
    assert soma_pares(1) == 0
    assert soma_pares(2) == 2


def test_fatorial_de_cinco():
    assert fatorial(5) == 120


def test_fatorial_de_zero_e_um():
    assert fatorial(0) == 1
    assert fatorial(1) == 1


def test_conta_algarismos_no_inicio():
    assert contar_algarismos("1a2b3") == 3


def test_conta_algarismos_em_texto_vazio():
    assert contar_algarismos("") == 0
`
        }
      },
      {
        id: "5.7", titulo: "Ciclos dentro de ciclos", min: 13, estado: "pronta",
        meta: "No fim: escreves ciclos encaixados, sabes quantas voltas dão ao todo e reconheces quando ficam caros.",
        blocos: [
          ["p", "O corpo de um ciclo pode ter outro ciclo. Para cada volta do de fora, o de dentro dá todas as suas voltas."],
          ["py", String.raw`for linha in range(1, 4):
    for coluna in range(1, 4):
        print(linha * coluna, end=" ")
    print()`],
          ["p", "`end=\" \"` diz ao `print` para acabar com um espaço em vez de mudar de linha. O `print()` vazio, fora do ciclo de dentro, muda de linha no fim de cada linha da tabela. Três voltas de fora vezes três de dentro são nove multiplicações."],
          ["h", "Desenhar com texto"],
          ["py", String.raw`n = 4
for i in range(1, n + 1):
    print("*" * i)`],
          ["p", "Às vezes um ciclo chega, graças ao `*` das strings. Precisas do segundo quando o que se passa dentro de cada linha varia de posição para posição."],
          ["h", "Combinações"],
          ["py", String.raw`for tamanho in "SML":
    for numero in range(1, 3):
        print(tamanho, numero)`],
          ["h", "Quanto custa"],
          ["p", "Um ciclo de n voltas dentro de outro de m voltas dá n × m voltas. Com 10 e 10 são 100, e ninguém nota. Com 10 mil e 10 mil são 100 milhões, e o programa que corria num segundo passa a demorar minutos."],
          ["obra", "Ciclos aninhados sobre duas listas grandes são a causa número um de scripts que demoram horas. Se te apanhares com um `for` dentro de outro `for` a comparar dados, provavelmente querias um dicionário. A aula 18.1 mede isso a sério."],
          ["aviso", "Nos ciclos encaixados, dá nomes diferentes e claros às duas variáveis. Com `i` e `j` é fácil trocar uma pela outra, e o resultado parece quase certo."]
        ],
        quiz: [
          { p: "Quantas vezes corre o `print` em `for a in range(3):` com `for b in range(4): print(a, b)` lá dentro?", o: ["7","12","4"], c: 1,
            e: "Quatro voltas de dentro por cada uma das três de fora: 12." }
        ],
        exercicio: {
          ficheiro: "padroes.py",
          enunciado: "Escreve três funções. `triangulo(n)` devolve n linhas de asteriscos, a primeira com um, a segunda com dois, e assim por diante, cada uma terminada em `\\n`. `quadrado_oco(n)` devolve um quadrado de lado n desenhado com `#` só na borda e espaços no meio (com n igual a 1 é só `#\\n`). `pares_com_soma(n, alvo)` conta os pares de números `a` e `b`, com `1 <= a < b <= n`, cuja soma é o alvo.",
          inicio: String.raw`def triangulo(n):
    pass


def quadrado_oco(n):
    pass


def pares_com_soma(n, alvo):
    pass
`,
          testes: String.raw`from padroes import pares_com_soma, quadrado_oco, triangulo


def test_triangulo_de_tres():
    assert triangulo(3) == "*\n**\n***\n"


def test_triangulo_de_zero_e_vazio():
    assert triangulo(0) == ""


def test_quadrado_oco_de_quatro():
    assert quadrado_oco(4) == "####\n#  #\n#  #\n####\n"


def test_quadrado_de_um_e_de_dois():
    assert quadrado_oco(1) == "#\n"
    assert quadrado_oco(2) == "##\n##\n"


def test_pares_que_somam_seis_ate_cinco():
    # 1 + 5 e 2 + 4; o 3 + 3 não conta porque a tem de ser menor que b
    assert pares_com_soma(5, 6) == 2


def test_nenhum_par():
    assert pares_com_soma(3, 100) == 0
    assert pares_com_soma(1, 2) == 0
`
        }
      }
  ]
});
