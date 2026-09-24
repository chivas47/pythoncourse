/* Módulo 2: Valores, variáveis e texto. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 2, fase: 1, titulo: "Valores, variáveis e texto",
  objetivo: "Guardar valores com nome, fazer contas, trabalhar com texto e perguntar coisas a quem usa o programa.",
  licoes: [
      {
        id: "2.1", titulo: "print e o interpretador", min: 10, estado: "pronta",
        meta: "No fim: sabes em que ordem o Python corre as linhas e usas o print para mostrar texto, números e contas.",
        blocos: [
          ["p", "Python é lido de cima para baixo, linha a linha, por um programa chamado interpretador. Não há passo de compilação: escreves, corres, vês. É por isso que se aprende depressa e é por isso que os erros só aparecem quando a linha é executada."],
          ["p", "A instrução `print()` manda texto para a saída. É a tua primeira ferramenta de diagnóstico e vais usá-la durante toda a carreira."],
          ["py", String.raw`print("Olá, mundo")
print(2026)
print("linha um")
print("linha dois")`],
          ["p", "Podes dar vários valores ao mesmo `print`, separados por vírgulas: aparecem na mesma linha, com um espaço entre eles. Um `print()` vazio escreve uma linha em branco."],
          ["py", String.raw`print("Total:", 42, "euros")
print()
print("fim")`],
          ["h", "Com aspas e sem aspas"],
          ["p", "Entre aspas é texto e aparece tal e qual. Sem aspas, o Python calcula primeiro e mostra o resultado."],
          ["py", String.raw`print(2 + 3)
print("2 + 3")`],
          ["aviso", "`print` sem parênteses dá erro de sintaxe. Isso é Python 2, que morreu em 2020. Se um tutorial usa `print \"olá\"`, fecha o tutorial."]
        ],
        quiz: [
          { p: "O que faz o interpretador quando encontra um erro na linha 40 de 100?", o: ["Não corre nada","Corre até à linha 39 e pára","Salta a linha 40 e continua"], c: 1,
            e: "O código já executou tudo o que estava acima. É por isso que um programa pode ter escrito ficheiros antes de rebentar." }
        ],
        exercicio: {
          ficheiro: "bilhete.py",
          script: true,
          enunciado: "Escreve um programa que mostra este bilhete, exatamente assim, com a linha em branco a seguir à primeira:\n\n`Comboio Lisboa - Porto`, linha em branco, `Partida: 08:05`, `Lugar: 42`.\n\nNa última linha, escreve o 42 como número, sem aspas, num segundo valor do mesmo `print`.",
          inicio: String.raw`# Mostra o bilhete, uma linha de cada vez.
`,
          testes: String.raw`import runpy
from pathlib import Path

PROGRAMA = Path(__file__).with_name("bilhete.py")


def test_bilhete_completo(capsys):
    runpy.run_path(str(PROGRAMA))
    esperado = "Comboio Lisboa - Porto\n\nPartida: 08:05\nLugar: 42\n"
    assert capsys.readouterr().out == esperado


def test_o_lugar_e_um_numero_no_print():
    codigo = PROGRAMA.read_text(encoding="utf-8")
    assert '"Lugar:", 42' in codigo or "'Lugar:', 42" in codigo
`
        }
      },
      {
        id: "2.2", titulo: "Variáveis: dar nome aos valores", min: 14, estado: "pronta",
        meta: "No fim: crias e atualizas variáveis, segues o valor delas à mão e escolhes nomes que uma equipa aceita.",
        blocos: [
          ["p", "Uma variável é um nome colado a um valor. Não declaras tipo: atribuis e pronto. A partir daí, sempre que escreves o nome, o Python usa o valor."],
          ["py", String.raw`nome = "Ana"
idade = 17
print(nome, idade)

idade = idade + 1
print(idade)`],
          ["h", "O `=` não é igualdade"],
          ["p", "`=` quer dizer: calcula o que está à direita e cola-lhe o nome que está à esquerda. Por isso `idade = idade + 1` faz sentido: lê o valor atual, soma um, e o nome passa a apontar para o resultado. Em matemática seria absurdo. Em Python é das linhas mais comuns que vais escrever."],
          ["py", String.raw`pontos = 10
pontos = pontos + 5
pontos += 5
print(pontos)`],
          ["p", "`pontos += 5` é a abreviatura de `pontos = pontos + 5`. Também existem `-=`, `*=` e `/=`."],
          ["h", "Seguir o valor à mão"],
          ["p", "Quando um programa não faz o que esperavas, escreve uma tabela: uma coluna por variável e uma linha por instrução, com o valor depois de cada uma. É lento e é infalível."],
          ["code", String.raw`instrução          a     b
a = 3              3     -
b = a * 2          3     6
a = 10             10    6    <- b não mudou`],
          ["p", "Repara na última linha. Mudar `a` depois não altera `b`: o `b` ficou com o resultado da conta, não com a conta."],
          ["h", "Nomes"],
          ["lista", [
            "Letras, algarismos e `_`. Não podem começar por algarismo.",
            "Maiúsculas contam: `idade` e `Idade` são variáveis diferentes.",
            "Não podes usar palavras do Python como `if`, `for` ou `class`.",
            "O estilo das equipas é minúsculas com `_` entre palavras: `preco_final`, `numero_de_alunos`."
          ]],
          ["obra", "Nas equipas, nomes como `x`, `dados1` ou `temp` são a primeira coisa que apanham em revisão de código. `numero_de_alunos` é longo e está certo. `n_alunos` passa. `n` não."],
          ["h", "Comentários"],
          ["p", "Tudo o que vem depois de `#` é ignorado pelo Python. Um bom comentário explica porquê, não o quê. Se precisas de um comentário a explicar o quê, o nome da variável está mal escolhido."],
          ["code", String.raw`# mau: soma 1 à idade
idade = idade + 1

# bom: fazemos anos em setembro, antes do arranque das turmas
idade = idade + 1`],
          ["aviso", "Usar um nome antes de lhe dar valor dá `NameError: name 'total' is not defined`. O Python lê de cima para baixo, por isso a atribuição tem de estar numa linha acima de onde a usas. Um nome mal escrito dá o mesmo erro."]
        ],
        quiz: [
          { p: "`a = 5`, depois `b = a`, depois `a = 7`. Quanto vale `b`?", o: ["7","5","Dá erro"], c: 1,
            e: "`b = a` cola o nome `b` ao valor que `a` tinha naquele momento, o 5. Mudar `a` a seguir não mexe em `b`." },
          { p: "Qual destes nomes segue o estilo que uma equipa de Python espera?", o: ["TotalVendas","total_vendas","tv"], c: 1,
            e: "Minúsculas com underscores, e um nome que diz o que é. `TotalVendas` é o estilo das classes, que vais ver no módulo 14." }
        ],
        exercicio: {
          ficheiro: "carrinho.py",
          script: true,
          enunciado: "Simula um carrinho de compras com duas variáveis, `artigos` e `total`, que começam a zero. Primeiro entra um livro de 12 euros: soma 1 aos artigos e 12 ao total. Depois entram dois cadernos de 3 euros cada. Usa sempre `+=` para atualizar. No fim, mostra `Artigos: 3 Total: 18` com um só `print` de quatro valores.",
          inicio: String.raw`artigos = 0
total = 0

# entra um livro de 12 euros

# entram dois cadernos de 3 euros cada

# mostra o resumo
`,
          testes: String.raw`import runpy
from pathlib import Path

PROGRAMA = Path(__file__).with_name("carrinho.py")


def test_contou_os_artigos():
    assert runpy.run_path(str(PROGRAMA))["artigos"] == 3


def test_somou_o_total():
    assert runpy.run_path(str(PROGRAMA))["total"] == 18


def test_mostra_o_resumo(capsys):
    runpy.run_path(str(PROGRAMA))
    assert capsys.readouterr().out == "Artigos: 3 Total: 18\n"


def test_usa_mais_igual():
    assert "+=" in PROGRAMA.read_text(encoding="utf-8")
`
        }
      },
      {
        id: "2.3", titulo: "Contas: operadores e prioridades", min: 14, estado: "pronta",
        meta: "No fim: fazes contas com os sete operadores, sabes a ordem em que são feitas e usas // e % para partir quantidades.",
        blocos: [
          ["p", "O Python faz contas como uma calculadora, com uma diferença: tens de dizer exatamente o que queres, com os operadores certos."],
          ["py", String.raw`print(7 + 3)
print(7 - 3)
print(7 * 3)
print(7 / 2)
print(2 ** 10)`],
          ["p", "`**` é a potência. `/` dá sempre um número com parte decimal, mesmo quando a divisão é exata: `8 / 2` dá `4.0`. Há dois tipos de números, os inteiros e os decimais, e a aula 2.5 explica a diferença. Os decimais escrevem-se sempre com ponto."],
          ["h", "Divisão inteira e resto"],
          ["py", String.raw`print(17 // 5)
print(17 % 5)`],
          ["p", "`//` diz quantas vezes o 5 cabe inteiro no 17 (3). `%` diz o que sobra (2). Parecem operadores de exame de matemática e são dos mais usados no trabalho: partir minutos em horas, saber se um número é par (`n % 2` dá 0), tirar o último algarismo (`n % 10`)."],
          ["py", String.raw`minutos = 135
horas = minutos // 60
resto = minutos % 60
print(horas, "h", resto, "min")`],
          ["h", "Prioridades"],
          ["p", "A ordem é a da matemática: primeiro `**`, depois `*`, `/`, `//` e `%`, e por fim `+` e `-`. Os parênteses mandam em tudo."],
          ["py", String.raw`print(2 + 3 * 4)
print((2 + 3) * 4)
print(-2 ** 2)`],
          ["p", "O último surpreende: `**` passa à frente do sinal menos, por isso o resultado é -4. Na dúvida, usa parênteses. Custam dois caracteres e poupam uma tarde."],
          ["h", "Funções que já vêm com o Python"],
          ["py", String.raw`print(abs(-7))
print(round(3.14159, 2))
print(max(4, 9, 2), min(4, 9, 2))`],
          ["aviso", "Escrever `3,5` em vez de `3.5` não dá erro: para o Python são dois números separados por uma vírgula. Dentro de um `print` aparece `3 5`, que parece quase certo. Decimais escrevem-se com ponto, sempre."],
          ["obra", "Quantas páginas de 20 resultados são precisas para mostrar 135 registos? `(135 + 19) // 20`, que dá 7. Contas destas, com `//` e `%`, aparecem em paginação, lotes, horários e faturação muito mais do que esperas."]
        ],
        quiz: [
          { p: "Quanto dá `7 // 2 + 7 % 2`?", o: ["3.5","4","3"], c: 1,
            e: "`7 // 2` é 3 e `7 % 2` é 1. A soma é 4." },
          { p: "O que mostra `print(10 / 5)`?", o: ["2","2.0","Dá erro"], c: 1,
            e: "`/` devolve sempre um decimal. Para um inteiro usa `//`." }
        ],
        exercicio: {
          ficheiro: "tempo.py",
          script: true,
          enunciado: "A partir de `total_segundos = 7384`, calcula três variáveis, `horas`, `minutos` e `segundos`, usando `//` e `%` (nada de fazer as contas de cabeça). Depois mostra `2 horas, 3 minutos e 4 segundos` com um único `print`.",
          inicio: String.raw`total_segundos = 7384

# calcula horas, minutos e segundos

# mostra o resultado
`,
          testes: String.raw`import runpy
from pathlib import Path

PROGRAMA = Path(__file__).with_name("tempo.py")


def test_horas():
    assert runpy.run_path(str(PROGRAMA))["horas"] == 2


def test_minutos():
    assert runpy.run_path(str(PROGRAMA))["minutos"] == 3


def test_segundos():
    assert runpy.run_path(str(PROGRAMA))["segundos"] == 4


def test_mostra_a_frase(capsys):
    runpy.run_path(str(PROGRAMA))
    assert capsys.readouterr().out == "2 horas, 3 minutos e 4 segundos\n"


def test_usa_divisao_inteira_e_resto():
    codigo = PROGRAMA.read_text(encoding="utf-8")
    assert "//" in codigo and "%" in codigo
`
        }
      },
      {
        id: "2.4", titulo: "Texto: aspas, juntar e medir", min: 15, estado: "pronta",
        meta: "No fim: escreves texto com qualquer tipo de aspas, juntas e repetes texto, medes o comprimento e usas os primeiros métodos.",
        blocos: [
          ["p", "Texto em Python chama-se string. Escreve-se entre aspas simples ou duplas, tanto faz, desde que abras e feches com as mesmas. Se o texto tiver aspas lá dentro, usa as outras por fora."],
          ["py", String.raw`print("Olá")
print('Olá')
print("It's ok")
print('Ela disse "sim"')`],
          ["h", "Caracteres especiais"],
          ["p", "Dentro de uma string, a barra `\\` anuncia um carácter especial: `\\n` é uma mudança de linha e `\\t` é uma tabulação. Para texto com várias linhas há também as aspas triplas."],
          ["py", String.raw`print("linha um\nlinha dois")
print("nome\tidade")
print("""Várias
linhas
seguidas""")`],
          ["h", "Juntar e repetir"],
          ["py", String.raw`nome = "Ana"
apelido = "Silva"
completo = nome + " " + apelido
print(completo)
print("-" * 20)`],
          ["p", "`+` junta duas strings sem pôr nada entre elas, por isso o espaço tem de ir à mão. `*` com um número repete."],
          ["h", "Medir"],
          ["py", String.raw`print(len("Ana Silva"))
print(len(""))`],
          ["p", "`len` conta os caracteres, e os espaços contam. `\"\"` é a string vazia, com comprimento zero."],
          ["h", "Métodos: o texto sabe fazer coisas"],
          ["p", "Um método é uma operação que um valor sabe fazer e chama-se com um ponto: `valor.metodo()`. As strings têm dezenas. Estes quatro chegam para começar."],
          ["py", String.raw`texto = "  Olá, Mundo  "
print(texto.upper())
print(texto.lower())
print(texto.strip())
print(texto.replace("Mundo", "Ana"))
print(texto)`],
          ["p", "O último `print` mostra o texto original, sem alterações. Nenhum método muda a string: todos devolvem uma nova. Para ficares com o resultado, guarda-o: `texto = texto.strip()`."],
          ["aviso", "`texto.strip()` sozinho numa linha não faz nada de útil: calcula o texto limpo e deita-o fora. Toda a gente comete este erro uma vez. Depois de o cometeres, lembras-te para sempre."],
          ["obra", "Nomes com espaços a mais, emails com maiúsculas, códigos com o separador errado: metade do trabalho com dados reais é limpar texto antes de o usar. `strip`, `lower` e `replace` são as primeiras ferramentas para isso."]
        ],
        quiz: [
          { p: "O que dá `\"ab\" + \"cd\" * 2`?", o: ["\"abcdabcd\"","\"abcdcd\"","Dá erro"], c: 1,
            e: "Tal como nos números, `*` é feito antes de `+`. Primeiro `\"cd\" * 2` dá `\"cdcd\"`, e só depois se junta o `\"ab\"`." },
          { p: "Quanto dá `len(\"olá mundo\")`?", o: ["8","9","10"], c: 1,
            e: "Três caracteres em `olá`, cinco em `mundo` e o espaço entre as duas palavras: 9. O `á` conta como um carácter e o espaço também." }
        ],
        exercicio: {
          ficheiro: "etiqueta.py",
          script: true,
          enunciado: "A partir de `nome = \"   ana MARIA silva  \"`, cria `limpo` (sem espaços nas pontas e em minúsculas), `maiusculas` (o `limpo` em maiúsculas) e `comprimento` (o número de caracteres de `limpo`). Depois mostra uma etiqueta de duas linhas: o nome em maiúsculas e, por baixo, uma linha de `=` com o mesmo comprimento.",
          inicio: String.raw`nome = "   ana MARIA silva  "

# cria limpo, maiusculas e comprimento

# mostra a etiqueta
`,
          testes: String.raw`import runpy
from pathlib import Path

PROGRAMA = Path(__file__).with_name("etiqueta.py")


def test_limpo_sem_espacos_e_em_minusculas():
    assert runpy.run_path(str(PROGRAMA))["limpo"] == "ana maria silva"


def test_maiusculas():
    assert runpy.run_path(str(PROGRAMA))["maiusculas"] == "ANA MARIA SILVA"


def test_comprimento_do_nome_limpo():
    assert runpy.run_path(str(PROGRAMA))["comprimento"] == 15


def test_etiqueta(capsys):
    runpy.run_path(str(PROGRAMA))
    assert capsys.readouterr().out == "ANA MARIA SILVA\n===============\n"
`
        }
      },
      {
        id: "2.5", titulo: "Tipos e conversões", min: 12, estado: "pronta",
        meta: "No fim: sabes que tipo tem cada valor, porque é que \"7\" + 7 rebenta e como converter de um tipo para outro.",
        blocos: [
          ["p", "Cada valor tem um tipo. Os quatro que vais usar em todo o lado: `str` (texto), `int` (inteiro), `float` (decimal), `bool` (verdadeiro ou falso). A função `type()` diz-te qual é."],
          ["py", String.raw`print(type("7"))
print(type(7))
print(type(7.0))
print(type(7 > 3))`],
          ["p", "Python não converte tipos às escondidas. `\"7\" + 7` não dá 14 nem \"77\", dá erro. Isto é uma vantagem: o erro aparece já, e não três semanas depois num relatório errado."],
          ["py", String.raw`print(int("7") + 7)
print("7" + str(7))
print(float("3.5") * 2)`],
          ["h", "Converter pode falhar"],
          ["py", String.raw`print(int("42"))
print(float("2.5"))
print(int("dois"))`],
          ["p", "Um texto só se converte num número se parecer um número. `int(\"dois\")` rebenta com `ValueError`, e `int(\"3.5\")` também: para `int`, `3.5` não é um inteiro. Por agora, lê a mensagem e corrige os dados; na aula 10.1 vais aprender a apanhar o erro."],
          ["aviso", "`int(3.9)` dá `3`. Converter um decimal em inteiro corta a parte decimal, não arredonda. Se querias arredondar, é `round(3.9)`."],
          ["h", "Verdadeiro e falso"],
          ["p", "O quarto tipo, `bool`, só tem dois valores: `True` e `False`. É o que resulta de uma comparação como `7 > 3`, e é a base do módulo 4."],
          ["obra", "Tudo o que vem de fora do programa chega como texto: o que a pessoa escreve, o que está num ficheiro, o que chega de um site. Converter é sempre o primeiro passo, e é aí que aparecem os primeiros erros de dados."]
        ],
        quiz: [
          { p: "O que mostra `print(type(3.0))`?", o: ["<class 'int'>","<class 'float'>","<class 'str'>"], c: 1,
            e: "O ponto faz dele um decimal, mesmo sendo um número redondo." },
          { p: "O que acontece com `\"7\" + 7`?", o: ["Dá 14","Dá \"77\"","TypeError"], c: 2,
            e: "O Python não adivinha se querias somar ou juntar. Tens de converter um dos lados: `int(\"7\") + 7` ou `\"7\" + str(7)`." }
        ],
        exercicio: {
          ficheiro: "conversoes.py",
          script: true,
          enunciado: "Os valores chegaram como texto. Converte `texto_quantidade` para um inteiro em `quantidade` e `texto_preco` para um decimal em `preco`. Calcula `total` (quantidade vezes preço) e cria `resumo`, um texto que junta `\"Total: \"` com o total convertido para texto. Não alteres as duas primeiras linhas.",
          inicio: String.raw`texto_quantidade = "3"
texto_preco = "4.5"

# converte, calcula o total e cria o resumo
`,
          testes: String.raw`import runpy
from pathlib import Path

PROGRAMA = Path(__file__).with_name("conversoes.py")


def test_quantidade_e_um_inteiro():
    quantidade = runpy.run_path(str(PROGRAMA))["quantidade"]
    assert type(quantidade) is int
    assert quantidade == 3


def test_preco_e_um_decimal():
    preco = runpy.run_path(str(PROGRAMA))["preco"]
    assert type(preco) is float
    assert preco == 4.5


def test_total():
    assert runpy.run_path(str(PROGRAMA))["total"] == 13.5


def test_resumo_em_texto():
    assert runpy.run_path(str(PROGRAMA))["resumo"] == "Total: 13.5"
`
        }
      },
      {
        id: "2.6", titulo: "f-strings: texto com valores lá dentro", min: 12, estado: "pronta",
        meta: "No fim: constróis texto com valores e contas lá dentro, com as casas decimais e o alinhamento que quiseres.",
        blocos: [
          ["p", "Juntar texto com `+` obriga-te a converter cada número com `str()` e a contar os espaços à mão. Há uma forma melhor, e é a que vais usar a partir de hoje."],
          ["p", "A forma moderna de construir texto com valores lá dentro. Prefixo `f` e chavetas com a expressão dentro."],
          ["py", String.raw`produto = "teclado"
preco = 39.9
quantidade = 3

print(f"{quantidade} x {produto} = {preco * quantidade:.2f} euros")`],
          ["p", "O `:.2f` dentro das chavetas é formatação: duas casas decimais. Também tens `{valor:>10}` para alinhar à direita e `{n:,}` para separador de milhares."],
          ["obra", "Concatenar com `+` em relatórios e logs é o sinal mais rápido de código antigo. Em 2026 escreve-se f-string, sempre. As exceções são o módulo `logging` e queries de base de dados, e as razões vão aparecer nas aulas 12.5 e 24.2."],
          ["aviso", "`float` não é exato. `0.1 + 0.2` dá 0.30000000000000004. Para dinheiro usa-se `Decimal` ou guarda-se em cêntimos como inteiro. Isto já causou processos judiciais a sério."],
          ["py", String.raw`print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)
print(round(0.1 + 0.2, 2) == 0.3)`]
        ],
        quiz: [
          { p: "O que mostra `print(f\"{3 * 4} ovos\")`?", o: ["3 * 4 ovos","12 ovos","Dá erro"], c: 1,
            e: "O que está dentro das chavetas é calculado antes de ser posto no texto." },
          { p: "O que dá `f\"{2 / 3:.2f}\"`?", o: ["\"0.66\"","\"0.67\"","\"0.6666\""], c: 1,
            e: "`:.2f` arredonda a duas casas decimais para mostrar. O valor em si não muda." }
        ],
        exercicio: {
          ficheiro: "recibo.py",
          script: true,
          enunciado: "Com `preco = 12.5` e `iva = 0.23`, cria `total` com o preço mais o IVA e `recibo` como uma f-string que fica exatamente `Total: 15.38 euros` (duas casas decimais). No fim, mostra o recibo.",
          inicio: String.raw`preco = 12.5
iva = 0.23

# cria total e recibo, e mostra o recibo
`,
          testes: String.raw`import runpy
from pathlib import Path

PROGRAMA = Path(__file__).with_name("recibo.py")


def test_total_calculado():
    assert abs(runpy.run_path(str(PROGRAMA))["total"] - 15.375) < 0.001


def test_recibo_formatado():
    assert runpy.run_path(str(PROGRAMA))["recibo"] == "Total: 15.38 euros"


def test_mostra_o_recibo(capsys):
    runpy.run_path(str(PROGRAMA))
    assert capsys.readouterr().out == "Total: 15.38 euros\n"


def test_usa_uma_f_string():
    codigo = PROGRAMA.read_text(encoding="utf-8")
    assert 'f"' in codigo or "f'" in codigo
`
        }
      },
      {
        id: "2.7", titulo: "input(): o programa faz perguntas", min: 12, estado: "pronta",
        meta: "No fim: escreves programas que perguntam, calculam e respondem, e convertes o que a pessoa escreve antes de o usar.",
        blocos: [
          ["p", "`input` mostra uma pergunta, espera que a pessoa escreva alguma coisa e carregue em Enter, e devolve o que ela escreveu. Devolve sempre texto, mesmo que a pessoa escreva um número."],
          ["code", String.raw`nome = input("Como te chamas? ")
print("Olá,", nome)`],
          ["code", String.raw`$ python m02/ola_input.py
Como te chamas? Rui
Olá, Rui`],
          ["p", "Repara no espaço no fim da pergunta: sem ele, a resposta fica colada ao ponto de interrogação."],
          ["h", "Números que chegam como texto"],
          ["code", String.raw`idade = input("Idade: ")
print(idade + 1)      # TypeError: can only concatenate str (not "int") to str

idade = int(input("Idade: "))
print(idade + 1)      # agora sim`],
          ["p", "A regra: converte logo na linha em que lês. Assim o resto do programa trabalha com o tipo certo e ninguém tem de se lembrar de que aquilo veio como texto."],
          ["h", "Perguntar, calcular, mostrar"],
          ["code", String.raw`preco = float(input("Preço: "))
quantidade = int(input("Quantidade: "))
total = preco * quantidade
print(f"Total: {total:.2f} euros")`],
          ["p", "Quase todos os programas pequenos têm esta forma: entradas no topo, contas no meio, resultado no fim. Separar as três partes torna-os fáceis de ler, e mais tarde, de testar."],
          ["aviso", "Se a pessoa escrever `vinte` quando pedes a idade, o `int()` rebenta com `ValueError`. Por agora é aceitável. No módulo 10 vais aprender a perguntar outra vez em vez de rebentar."],
          ["obra", "`input` serve para aprender e para pequenas ferramentas tuas. Programas que correm sozinhos, num servidor às três da manhã, não têm ninguém para responder: recebem o que precisam por argumentos ou por ficheiros de configuração, que vais ver nas aulas 11.4 e 27.1."]
        ],
        quiz: [
          { p: "`idade = input('Idade: ')` e depois `idade + 1`. O que acontece?", o: ["Funciona","TypeError, porque input devolve sempre texto","Depende do que a pessoa escrever"], c: 1,
            e: "`input()` devolve sempre `str`. Precisas de `int(input(...))`." },
          { p: "A pessoa escreve `3.5` e o teu programa faz `int(input(...))`. O que acontece?", o: ["Fica 3","Fica 4","ValueError"], c: 2,
            e: "`int()` de um texto só aceita inteiros escritos como inteiros. Para aceitar decimais, é `float()`." }
        ],
        exercicio: {
          ficheiro: "iva.py",
          script: true,
          enunciado: "Escreve um programa que pergunta `Preço sem IVA: ` (com o espaço no fim), soma 23% de IVA e mostra `Preço com IVA: 12.30` quando a pessoa escreve `10`. O valor aparece sempre com duas casas decimais.",
          inicio: String.raw`# pergunta o preço, converte-o e mostra o preço com IVA
`,
          testes: String.raw`import runpy
from pathlib import Path

PROGRAMA = Path(__file__).with_name("iva.py")


def correr(monkeypatch, capsys, resposta):
    perguntas = []

    def responder(pergunta=""):
        perguntas.append(pergunta)
        return resposta

    monkeypatch.setattr("builtins.input", responder)
    runpy.run_path(str(PROGRAMA))
    return perguntas, capsys.readouterr().out


def test_pergunta_o_preco(monkeypatch, capsys):
    perguntas, _ = correr(monkeypatch, capsys, "10")
    assert perguntas == ["Preço sem IVA: "]


def test_dez_euros(monkeypatch, capsys):
    _, saida = correr(monkeypatch, capsys, "10")
    assert saida == "Preço com IVA: 12.30\n"


def test_arredonda_a_duas_casas(monkeypatch, capsys):
    _, saida = correr(monkeypatch, capsys, "19.99")
    assert saida == "Preço com IVA: 24.59\n"
`
        }
      },
      {
        id: "2.8", titulo: "Ler o traceback", min: 12, estado: "pronta",
        meta: "No fim: lês uma mensagem de erro de baixo para cima e corriges a causa, não o sintoma.",
        blocos: [
          ["p", "Um erro em Python não é um castigo, é um relatório. Lê-se de baixo para cima: a última linha diz o tipo de erro e a mensagem, as linhas acima dizem o caminho até lá."],
          ["code", String.raw`Traceback (most recent call last):
  File "/home/ana/caderno-python/m02/conta.py", line 3, in <module>
    total = preco * quantidade + portes
NameError: name 'portes' is not defined`],
          ["p", "A última linha diz o tipo de erro (`NameError`) e a mensagem: o nome `portes` não existe. A linha de cima diz o ficheiro e o número da linha, e mostra-a. `<module>` quer dizer que o erro aconteceu no corpo do ficheiro. Quando tiveres funções, no módulo 3, o traceback ganha um andar por cada chamada, e continua a ler-se de baixo para cima."],
          ["h", "Os erros que vais ver nas primeiras semanas"],
          ["lista", [
            "`SyntaxError`: falta um parêntese, dois pontos ou uma aspa. O Python nem começou a correr.",
            "`NameError`: usaste um nome que não existe. Quase sempre um erro de escrita, ou a variável é criada mais abaixo.",
            "`TypeError`: uma operação entre tipos que não combinam, como texto mais número.",
            "`ValueError`: o tipo está certo mas o valor não serve, como `int(\"dois\")`.",
            "`IndentationError`: os espaços no início das linhas não batem certo. Vais conhecê-lo no módulo 3."
          ]],
          ["py", String.raw`preco = "3"
print(preco * 2)
print(preco + 2)`],
          ["p", "O primeiro `print` não rebenta: texto vezes número repete o texto, e aparece `33`. Este é o erro mais perigoso de todos, o que não dá erro. O segundo rebenta, e ainda bem."],
          ["h", "O método"],
          ["lista", [
            "Lê a última linha: tipo e mensagem.",
            "Vai à linha indicada no ficheiro.",
            "Pergunta que valor e que tipo tem cada nome naquela linha. Se não sabes, põe um `print` antes.",
            "Corrige a causa. Se `portes` não existe, a pergunta é porquê, não como fazer o erro desaparecer."
          ]],
          ["obra", "Numa entrevista técnica é normal darem-te código partido para arranjar. O que estão a avaliar não é se sabes a resposta, é se lês a mensagem antes de mexer no código. Diz em voz alta o que a mensagem diz. Isso conta pontos."]
        ],
        quiz: [
          { p: "Recebes `NameError: name 'totl' is not defined`. O que é mais provável?", o: ["Falta instalar uma biblioteca","Um erro de escrita no nome da variável","O Python está desatualizado"], c: 1,
            e: "A variável chama-se `total` e alguém escreveu `totl`. A mensagem diz-te exatamente o nome que o Python não encontrou." },
          { p: "Um traceback tem várias linhas `File`. Por onde começas a ler?", o: ["Pela primeira","Pela última, que diz o erro, e depois sobes","Pela do meio"], c: 1,
            e: "A última linha diz o quê. As de cima dizem o caminho até lá, da chamada mais antiga para a mais recente." }
        ],
        exercicio: {
          ficheiro: "prazo.py",
          script: true,
          enunciado: "Este programa tem dois erros. Corre-o, lê o traceback, corrige o primeiro, corre outra vez e corrige o segundo. No fim, `dias` continua a ser o inteiro 3, `mensagem` fica `Faltam 3 dias` e o programa mostra-a.",
          inicio: String.raw`dias = 3
mensagem = "Faltam " + dias + " dias"
print(mensgem)
`,
          testes: String.raw`import runpy
from pathlib import Path

PROGRAMA = Path(__file__).with_name("prazo.py")


def test_dias_continua_inteiro():
    dias = runpy.run_path(str(PROGRAMA))["dias"]
    assert type(dias) is int
    assert dias == 3


def test_mensagem():
    assert runpy.run_path(str(PROGRAMA))["mensagem"] == "Faltam 3 dias"


def test_mostra_a_mensagem(capsys):
    runpy.run_path(str(PROGRAMA))
    assert capsys.readouterr().out == "Faltam 3 dias\n"
`
        }
      },
      {
        id: "2.9", titulo: "Guardar o trabalho com git", min: 18, estado: "pronta",
        meta: "No fim: o teu caderno é um repositório git e cada exercício acaba com um commit com uma boa mensagem.",
        blocos: [
          ["p", "O git guarda fotografias da tua pasta ao longo do tempo. Cada fotografia chama-se commit e leva uma mensagem a dizer o que mudou. Com isso podes ver o que alteraste, voltar a uma versão que funcionava e, mais tarde, trabalhar com outras pessoas no mesmo código sem se atropelarem. O módulo 21 trata do git como se usa numa equipa. Hoje é o mínimo: guardar o teu próprio trabalho."],
          ["h", "Configurar uma vez"],
          ["code", String.raw`$ git --version
git version 2.45.2
$ git config --global user.name "Ana Silva"
$ git config --global user.email "ana@exemplo.pt"
$ git config --global init.defaultBranch main`],
          ["p", "Se o `git --version` não responder, instala-o a partir de git-scm.com (no macOS, o sistema oferece-se para o instalar). O nome e o email ficam em cada commit que fizeres."],
          ["h", "Transformar o caderno num repositório"],
          ["code", String.raw`$ cd caderno-python
$ git init
Initialized empty Git repository in /home/ana/caderno-python/.git/`],
          ["h", "O que não vai para o git"],
          ["p", "O `.venv` é grande, é específico da tua máquina e recria-se com um comando. As pastas de cache também. Cria na raiz do caderno um ficheiro chamado `.gitignore`, com o ponto no início, e este conteúdo:"],
          ["code", String.raw`.venv/
__pycache__/
.pytest_cache/
.ruff_cache/`],
          ["h", "O ciclo: status, add, commit"],
          ["code", String.raw`$ git status
Untracked files:
        .gitignore
        m01/
        m02/
$ git add .gitignore m01 m02
$ git commit -m "Acrescentar os exercícios dos módulos 1 e 2"
$ git log --oneline
3f2a9c1 (HEAD -> main) Acrescentar os exercícios dos módulos 1 e 2`],
          ["lista", [
            "`git status` diz o que mudou desde o último commit. Corre-o sempre antes e depois de cada passo.",
            "`git add` escolhe o que entra na próxima fotografia.",
            "`git commit -m \"...\"` tira a fotografia, com a mensagem.",
            "`git log --oneline` mostra o histórico, do mais recente para o mais antigo.",
            "`git diff` mostra as linhas alteradas que ainda não entraram num commit."
          ]],
          ["h", "Boas mensagens"],
          ["lista", [
            "No infinitivo, como uma ordem: `Resolver o exercício 2.7`, `Corrigir o arredondamento do IVA`.",
            "Dizem o que muda, não o que fizeste durante a tarde.",
            "A primeira linha cabe em 72 caracteres.",
            "Um commit por coisa. Um exercício, um commit."
          ]],
          ["obra", "Numa equipa, o histórico é lido por outras pessoas, às vezes anos depois, para perceber porque é que uma linha é como é. O teu caderno vai chegar ao fim do curso com mais de cem commits pequenos e bem descritos. É exatamente o que um recrutador procura quando abre o teu perfil no GitHub."],
          ["aviso", "Nunca faças commit de palavras-passe, chaves de acesso ou do `.venv`. O git guarda tudo: apagar o ficheiro no commit seguinte não o tira do histórico."],
          ["p", "A partir daqui, a rotina de cada exercício acaba com `git add` e `git commit`. Vais vê-lo na lista de passos."]
        ],
        quiz: [
          { p: "Fizeste `git add m02` e depois `git commit -m \"Resolver o exercício 2.8\"`. O que ficou guardado?", o: ["A pasta inteira do caderno","Uma fotografia do que estava em `m02`, com a tua mensagem","Nada, falta o push"], c: 1,
            e: "Só entra no commit o que passaste ao `git add`. O `push`, que envia para outro computador, é para mais tarde e não é preciso para guardar." },
          { p: "Porque é que o `.venv` vai para o `.gitignore`?", o: ["Porque tem código secreto","Porque é grande, depende da tua máquina e recria-se com um comando","Porque o git não aceita pastas com ponto"], c: 1,
            e: "O que se recria com um comando não se guarda. Guarda-se a receita, como vais ver com o `requirements.txt` na aula 13.3." }
        ],
        tarefa: {
          enunciado: "Transforma o teu caderno num repositório e guarda os exercícios feitos até aqui.",
          passos: [
            "Configura o teu nome e o teu email no git, com os comandos da aula.",
            "Dentro de `caderno-python`, corre `git init`.",
            "Cria o `.gitignore` com as quatro linhas da aula e confirma com `git status` que o `.venv` não aparece.",
            "Faz `git add .gitignore m01 m02` e um commit com uma mensagem no infinitivo.",
            "Muda uma linha de um exercício, vê a diferença com `git diff`, e faz um segundo commit.",
            "Confirma os dois commits com `git log --oneline`."
          ]
        }
      }
  ]
});
