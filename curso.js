/* Conteúdo do curso. Editar só este ficheiro para acrescentar aulas.
   Blocos disponíveis:
   ['p', texto]            parágrafo (aceita `código` entre crases)
   ['h', texto]            subtítulo
   ['lista', [a, b, c]]    lista
   ['code', codigo]        bloco de código só para leitura
   ['py', codigo]          bloco de código com botão de correr
   ['obra', texto]         nota "no trabalho isto aparece assim"
   ['aviso', texto]        erro comum
*/

window.CURSO = {
  fases: [
    { id: 1, nome: "Fundamentos", nota: "Escrever e ler código Python sem hesitar." },
    { id: 2, nome: "Estruturar código", nota: "Organizar programas que crescem." },
    { id: 3, nome: "Prática profissional", nota: "O que separa um script de trabalho a sério." },
    { id: 4, nome: "Backend e dados", nota: "Aquilo que um júnior de Python faz no dia a dia." },
    { id: 5, nome: "Chegar ao emprego", nota: "Portefólio, processo de recrutamento, primeiros 90 dias." }
  ],

  modulos: [
    /* ---------------- FASE 1 ---------------- */
    {
      n: 1, fase: 1, titulo: "Correr o teu primeiro código",
      objetivo: "Perceber o que acontece quando carregas em correr.",
      licoes: [
        {
          id: "1.1", titulo: "O interpretador e o print", min: 12, estado: "pronta",
          meta: "No fim: escreves, corres e lês o resultado de um programa.",
          blocos: [
            ["p", "Python é lido de cima para baixo, linha a linha, por um programa chamado interpretador. Não há passo de compilação: escreves, corres, vês. É por isso que se aprende depressa e é por isso que os erros só aparecem quando a linha é executada."],
            ["p", "A instrução `print()` manda texto para a saída. É a tua primeira ferramenta de diagnóstico e vais usá-la durante toda a carreira."],
            ["py", "print(\"Olá, mundo\")\nprint(2026)\nprint(\"linha um\")\nprint(\"linha dois\")"],
            ["h", "Guardar valores"],
            ["p", "Uma variável é um nome colado a um valor. Não declaras tipo, atribuis e pronto. O nome deve dizer o que a coisa é, em minúsculas e com underscores."],
            ["py", "nome = \"Ana\"\nidade = 17\nprint(nome, idade)\n\nidade = idade + 1\nprint(idade)"],
            ["obra", "Nas equipas, nomes como `x`, `dados1` ou `temp` são a primeira coisa que apanham em revisão de código. `numero_de_alunos` é longo e está certo. `n_alunos` passa. `n` não."],
            ["h", "Comentários"],
            ["p", "Tudo depois de `#` é ignorado. Um bom comentário explica porquê, não o quê. Se precisas de um comentário a explicar o quê, o nome da variável está mal escolhido."],
            ["code", "# mau: soma 1 à idade\nidade = idade + 1\n\n# bom: fazemos anos em setembro, antes do arranque das turmas\nidade = idade + 1"],
            ["aviso", "`print` sem parênteses dá erro de sintaxe. Isso é Python 2, que morreu em 2020. Se um tutorial usa `print \"olá\"`, fecha o tutorial."]
          ],
          quiz: [
            { p: "O que faz o interpretador quando encontra um erro na linha 40 de 100?", o: ["Não corre nada", "Corre até à linha 39 e pára", "Salta a linha 40 e continua"], c: 1,
              e: "O código já executou tudo o que estava acima. É por isso que um programa pode ter escrito ficheiros antes de rebentar." }
          ],
          exercicio: {
            enunciado: "Cria as variáveis `cidade` (texto) e `populacao` (número inteiro) e imprime as duas na mesma linha.",
            inicio: "# substitui os valores\ncidade = \"\"\npopulacao = 0\n\nprint()\n",
            testes: "verifica('cidade é texto', isinstance(cidade, str) and len(cidade) > 0)\nverifica('populacao é inteiro', isinstance(populacao, int))\nverifica('populacao preenchida', populacao > 0)"
          }
        },
        {
          id: "1.2", titulo: "Tipos, conversões e f-strings", min: 15, estado: "pronta",
          meta: "No fim: sabes porque é que 1 + '1' rebenta e como juntar texto com valores.",
          blocos: [
            ["p", "Cada valor tem um tipo. Os quatro que vais usar em todo o lado: `str` (texto), `int` (inteiro), `float` (decimal), `bool` (verdadeiro ou falso). A função `type()` diz-te qual é."],
            ["py", "print(type(\"7\"))\nprint(type(7))\nprint(type(7.0))\nprint(type(7 > 3))"],
            ["p", "Python não converte tipos às escondidas. `\"7\" + 7` não dá 14 nem \"77\", dá erro. Isto é uma vantagem: o erro aparece já, e não três semanas depois num relatório errado."],
            ["py", "print(int(\"7\") + 7)\nprint(\"7\" + str(7))\nprint(float(\"3.5\") * 2)"],
            ["h", "f-strings"],
            ["p", "A forma moderna de construir texto com valores lá dentro. Prefixo `f` e chavetas com a expressão dentro."],
            ["py", "produto = \"teclado\"\npreco = 39.9\nquantidade = 3\n\nprint(f\"{quantidade} x {produto} = {preco * quantidade:.2f} euros\")"],
            ["p", "O `:.2f` dentro das chavetas é formatação: duas casas decimais. Também tens `{valor:>10}` para alinhar à direita e `{n:,}` para separador de milhares."],
            ["obra", "Concatenar com `+` em relatórios e logs é o sinal mais rápido de código antigo. Em 2026 escreve-se f-string, sempre. As exceções são o módulo `logging` e queries de base de dados, e as razões vão aparecer nos módulos 6 e 14."],
            ["aviso", "`float` não é exato. `0.1 + 0.2` dá 0.30000000000000004. Para dinheiro usa-se `Decimal` ou guarda-se em cêntimos como inteiro. Isto já causou processos judiciais a sério."],
            ["py", "print(0.1 + 0.2)\nprint(0.1 + 0.2 == 0.3)\nprint(round(0.1 + 0.2, 2) == 0.3)"]
          ],
          quiz: [
            { p: "`idade = input('Idade: ')` e depois `idade + 1`. O que acontece?", o: ["Funciona", "TypeError, porque input devolve sempre texto", "Depende do que o utilizador escrever"], c: 1,
              e: "`input()` devolve sempre `str`. Precisas de `int(input(...))`, e de tratar o caso de a pessoa escrever 'vinte'." }
          ],
          exercicio: {
            enunciado: "Define `preco = 12.5` e `iva = 0.23`. Cria `total` com o preço mais IVA e `recibo` como uma f-string exatamente assim: 'Total: 15.38 euros' (duas casas decimais).",
            inicio: "preco = 12.5\niva = 0.23\ntotal = \nrecibo = \n",
            testes: "verifica('total calculado', abs(total - 15.375) < 0.001)\nverifica('recibo é f-string formatada', recibo == 'Total: 15.38 euros')"
          }
        },
        {
          id: "1.3", titulo: "Ler o traceback", min: 10, estado: "pronta",
          meta: "No fim: consegues corrigir um erro sem copiar a mensagem para o Google.",
          blocos: [
            ["p", "Um erro em Python não é um castigo, é um relatório. Lê-se de baixo para cima: a última linha diz o tipo de erro e a mensagem, as linhas acima dizem o caminho até lá."],
            ["code", "Traceback (most recent call last):\n  File \"conta.py\", line 12, in <module>\n    total = soma(valores)\n  File \"conta.py\", line 6, in soma\n    return a + b\nTypeError: unsupported operand type(s) for +: 'int' and 'str'"],
            ["p", "Aqui: o tipo é `TypeError`, o sítio é a linha 6 dentro de `soma`, e a causa é alguém ter chamado `soma` com um texto onde devia ir um número. Reparaste que o problema está na linha 12, e a explosão na 6? É quase sempre assim."],
            ["h", "Os cinco erros que vais ver esta semana"],
            ["lista", [
              "`SyntaxError`: falta um parêntese, dois pontos ou uma aspa. O interpretador nem chegou a correr nada.",
              "`IndentationError`: misturaste espaços e tabulações, ou o bloco não está alinhado.",
              "`NameError`: usaste um nome que não existe. Normalmente um erro de escrita.",
              "`TypeError`: operação entre tipos incompatíveis.",
              "`KeyError` ou `IndexError`: foste buscar algo que não está lá."
            ]],
            ["py", "valores = [1, 2, 3]\nprint(valores[3])"],
            ["obra", "Numa entrevista técnica é normal darem-te código partido para arranjar. O que estão a avaliar não é se sabes a resposta, é se lês a mensagem antes de mexer no código. Diz em voz alta o que a mensagem diz. Isso conta pontos."]
          ],
          quiz: [
            { p: "Recebes `KeyError: 'email'` ao processar dados de um formulário. Primeira coisa a fazer?", o: ["Envolver tudo num try/except", "Ver que chaves existem mesmo nos dados", "Pôr um valor por omissão"], c: 1,
              e: "Só percebes se é falha de dados ou de código depois de veres o que chegou. Silenciar o erro é a resposta que rejeita candidaturas." }
          ],
          exercicio: {
            enunciado: "Este código rebenta. Corrige-o para que `mensagem` fique igual a 'Faltam 3 dias'.",
            inicio: "dias = \"3\"\nmensagem = \"Faltam \" + dias + \" dias\"\n",
            testes: "verifica('mensagem correta', mensagem == 'Faltam 3 dias')\nverifica('dias é inteiro', isinstance(dias, int))"
          }
        }
      ]
    },
    {
      n: 2, fase: 1, titulo: "Decisões e repetição",
      objetivo: "Controlar o caminho que o programa segue.",
      licoes: [
        {
          id: "2.1", titulo: "if, elif, else e a indentação como sintaxe", min: 14, estado: "pronta",
          meta: "No fim: escreves condições encadeadas sem as transformar numa escada ilegível.",
          blocos: [
            ["p", "Um `if` corre o bloco seguinte só quando a condição é verdadeira. Em Python o bloco não se marca com chavetas nem com `end`: marca-se com indentação. Quatro espaços, sempre os mesmos, é o que a equipa espera ver."],
            ["py", "idade = 17\n\nif idade >= 18:\n    print(\"maior de idade\")\nelif idade >= 16:\n    print(\"pode conduzir ciclomotor\")\nelse:\n    print(\"nem uma coisa nem outra\")"],
            ["p", "O `elif` só é avaliado se o `if` acima falhar. A ordem importa: se puseres primeiro a condição mais larga, as de baixo nunca chegam a correr. Este é o erro de lógica mais comum em código de iniciante que compila e mesmo assim está errado."],
            ["h", "O que conta como verdadeiro"],
            ["p", "Zero, string vazia, lista vazia, dicionário vazio e `None` são falsos. Tudo o resto é verdadeiro. Por isso escreve-se `if nomes:` e não `if len(nomes) > 0:`."],
            ["py", "for valor in [0, 1, \"\", \"ok\", [], [1], None, {}]:\n    print(repr(valor), \"->\", bool(valor))"],
            ["aviso", "`if utilizador == None:` funciona por acidente. O correto é `if utilizador is None:`. `None` é um objeto único e compara-se por identidade. Um revisor apanha isto em dois segundos."],
            ["h", "Condições compostas"],
            ["p", "`and`, `or` e `not`. Python avalia da esquerda para a direita e pára assim que sabe a resposta, o que te deixa proteger o acesso: em `if dados and dados[0] > 0`, o segundo lado nunca corre com a lista vazia."],
            ["py", "dados = []\nif dados and dados[0] > 0:\n    print(\"primeiro positivo\")\nelse:\n    print(\"sem dados ou primeiro não positivo\")\n\nnota = 15\nprint(10 <= nota <= 20)"],
            ["p", "A comparação em cadeia `10 <= nota <= 20` existe mesmo e lê-se como em matemática. Poucas linguagens têm isto; usa-o."],
            ["h", "O ternário"],
            ["py", "nota = 8\nestado = \"positiva\" if nota >= 10 else \"negativa\"\nprint(estado)"],
            ["obra", "Cláusula de guarda: em vez de aninhar três `if` até à direita do ecrã, trata primeiro os casos maus e sai. Uma função com `return` cedo nos casos inválidos é mais fácil de ler e é o que aparece em revisão de código como sugestão."],
            ["code", "# escada\ndef processar(pedido):\n    if pedido is not None:\n        if pedido.get(\"itens\"):\n            if pedido[\"pago\"]:\n                return \"a enviar\"\n\n# guardas\ndef processar(pedido):\n    if pedido is None:\n        return \"pedido inexistente\"\n    if not pedido.get(\"itens\"):\n        return \"pedido vazio\"\n    if not pedido[\"pago\"]:\n        return \"por pagar\"\n    return \"a enviar\""]
          ],
          quiz: [
            { p: "Escreves `if saldo > 1000: ... elif saldo > 100: ...` e nenhum cliente com 5000 euros cai no primeiro ramo. O que investigas primeiro?", o: ["A ordem das condições", "Se `saldo` é texto em vez de número", "A indentação"], c: 1,
              e: "A ordem está certa. Se veio de um ficheiro ou de um formulário, `saldo` é `str` e a comparação de texto com número rebenta, ou pior, compara alfabeticamente noutras linguagens. Confirma o tipo antes de mexer na lógica." }
          ],
          exercicio: {
            enunciado: "Escreve `escalao(nota)` que devolve 'insuficiente' abaixo de 10, 'suficiente' abaixo de 14, 'bom' abaixo de 18 e 'muito bom' de 18 para cima. Notas fora de 0 a 20 levantam `ValueError`.",
            inicio: "def escalao(nota):\n    pass\n",
            testes: "verifica('9 é insuficiente', escalao(9) == 'insuficiente')\nverifica('10 é suficiente', escalao(10) == 'suficiente')\nverifica('14 é bom', escalao(14) == 'bom')\nverifica('20 é muito bom', escalao(20) == 'muito bom')\n_erros = 0\nfor _n in (-1, 21):\n    try:\n        escalao(_n)\n    except ValueError:\n        _erros += 1\nverifica('fora do intervalo levanta ValueError', _erros == 2)"
          }
        },
        {
          id: "2.2", titulo: "for, while, break e continue", min: 16, estado: "pronta",
          meta: "No fim: percorres coleções sem índices manuais e sabes quando um while é a escolha certa.",
          blocos: [
            ["p", "Em Python percorre-se a coleção, não os índices. `for item in lista` é a forma normal. Se vieres de outra linguagem, a vontade de escrever `for i in range(len(lista))` vai passar e deve passar."],
            ["py", "nomes = [\"Ana\", \"Rui\", \"Bea\"]\n\nfor nome in nomes:\n    print(nome.upper())\n\nfor posicao, nome in enumerate(nomes, start=1):\n    print(posicao, nome)"],
            ["p", "`enumerate` dá-te posição e valor ao mesmo tempo. `zip` percorre duas coleções em paralelo e pára na mais curta."],
            ["py", "produtos = [\"teclado\", \"rato\", \"cabo\"]\nprecos = [39.9, 12.5, 4.0]\n\nfor produto, preco in zip(produtos, precos):\n    print(f\"{produto:<10}{preco:>6.2f}\")"],
            ["h", "while: quando não sabes quantas voltas"],
            ["p", "`for` é para percorrer algo com fim conhecido. `while` é para repetir enquanto uma condição se mantiver: ler páginas de uma API até vir vazia, tentar de novo até resultar, esperar por input do utilizador."],
            ["py", "restante = 100\ntentativas = 0\n\nwhile restante > 0 and tentativas < 5:\n    restante = restante // 3\n    tentativas += 1\n    print(tentativas, restante)"],
            ["aviso", "Todo o `while` precisa de algo que mude a condição dentro do corpo, e de um limite de segurança. Um ciclo infinito num script de produção é um servidor a 100 por cento de CPU e um telefonema às três da manhã."],
            ["h", "break e continue"],
            ["p", "`break` sai do ciclo já. `continue` salta para a volta seguinte. Usados com moderação limpam código; usados a cada cinco linhas tornam o ciclo impossível de seguir."],
            ["py", "for numero in [4, 7, -1, 9, 12]:\n    if numero < 0:\n        print(\"valor inválido, paro aqui\")\n        break\n    if numero % 2:\n        continue\n    print(\"par:\", numero)"],
            ["h", "O else do for"],
            ["p", "Um `for` pode ter `else`, que corre só se o ciclo terminou sem `break`. Serve exatamente para o caso procurar e não encontrar."],
            ["py", "procurado = 42\nfor n in [1, 2, 3]:\n    if n == procurado:\n        print(\"encontrado\")\n        break\nelse:\n    print(\"não está na lista\")"],
            ["obra", "Ciclos aninhados sobre duas listas grandes são a causa número um de scripts que demoram horas. Se te apanhares com um `for` dentro de outro `for` a comparar dados, provavelmente querias um dicionário. O módulo 13 mede isso a sério."]
          ],
          quiz: [
            { p: "Precisas do índice e do valor ao percorrer uma lista. Qual é a forma idiomática?", o: ["`for i in range(len(lista))` e depois `lista[i]`", "`for i, v in enumerate(lista)`", "Um `while` com contador"], c: 1,
              e: "`enumerate` diz a intenção e não deixa espaço para errar o limite. As outras duas funcionam e denunciam quem aprendeu Python a traduzir de outra linguagem." }
          ],
          exercicio: {
            enunciado: "Escreve `resumo(valores)` que soma os valores positivos, ignora os negativos e pára assim que encontrar `None`. Devolve o total.",
            inicio: "def resumo(valores):\n    pass\n",
            testes: "verifica('soma e ignora negativos', resumo([1, -2, 3]) == 4)\nverifica('pára no None', resumo([1, -2, 3, None, 100]) == 4)\nverifica('lista vazia dá zero', resumo([]) == 0)\nverifica('só None dá zero', resumo([None]) == 0)"
          }
        },
        {
          id: "2.3", titulo: "Compreensões de lista", min: 12, estado: "pronta",
          meta: "No fim: escreves transformações numa linha e sabes quando não o deves fazer.",
          blocos: [
            ["p", "Uma compreensão é um ciclo que constrói uma coleção, escrito numa expressão. Lê-se de dentro para fora: primeiro o `for`, depois o filtro, e o que fica à esquerda é o que entra na lista."],
            ["py", "numeros = [1, 2, 3, 4, 5, 6]\n\nquadrados = [n * n for n in numeros]\npares = [n for n in numeros if n % 2 == 0]\nrotulos = [f\"n{n}\" for n in numeros if n > 4]\n\nprint(quadrados)\nprint(pares)\nprint(rotulos)"],
            ["p", "O equivalente com ciclo é isto. Não é pior: é mais comprido, e é a forma certa quando o corpo tem mais do que uma instrução."],
            ["code", "quadrados = []\nfor n in numeros:\n    quadrados.append(n * n)"],
            ["h", "Também há para dicionários e conjuntos"],
            ["py", "precos = {\"teclado\": 39.9, \"rato\": 12.5, \"cabo\": 0}\n\ncom_iva = {nome: round(p * 1.23, 2) for nome, p in precos.items() if p > 0}\niniciais = {nome[0] for nome in precos}\n\nprint(com_iva)\nprint(iniciais)"],
            ["p", "Trocar as chavetas por parênteses dá um gerador: não constrói nada em memória, produz valor a valor. É o que queres dentro de `sum`, `any`, `max` e companhia."],
            ["py", "numeros = range(1, 1_000_001)\nprint(sum(n for n in numeros if n % 3 == 0))"],
            ["obra", "`any(...)` e `all(...)` com um gerador lá dentro substituem meia dúzia de linhas de ciclo com uma flag booleana. Sempre que vires uma variável chamada `encontrado = False`, há uma compreensão à espera de nascer."],
            ["py", "linhas = [\"ok\", \"ok\", \"ERRO 500\", \"ok\"]\nprint(any(l.startswith(\"ERRO\") for l in linhas))\nprint(all(l == \"ok\" for l in linhas))"],
            ["aviso", "Compreensões aninhadas com dois `for` e um `if` cabem numa linha e não cabem numa cabeça. A regra prática das equipas: se não a lês em voz alta de uma vez, escreve o ciclo. Legibilidade ganha a esperteza."],
            ["h", "O erro clássico da variável"],
            ["p", "Em Python 3 a variável da compreensão vive só lá dentro. Isso é bom e é diferente do ciclo `for` normal, onde a variável sobrevive depois do fim."]
          ],
          quiz: [
            { p: "Precisas de somar 10 milhões de valores filtrados. Compreensão de lista ou gerador?", o: ["Lista, é mais rápido", "Gerador, não constrói a lista intermédia em memória", "É exatamente igual"], c: 1,
              e: "A lista aloca dez milhões de elementos só para os deitar fora a seguir. Dentro de `sum` escreve-se sem parênteses extra: `sum(n for n in ... if ...)`." }
          ],
          exercicio: {
            enunciado: "Escreve `com_iva(precos)` que recebe um dicionário nome para preço e devolve outro dicionário só com os preços maiores que zero, multiplicados por 1.23 e arredondados a duas casas.",
            inicio: "def com_iva(precos):\n    pass\n",
            testes: "_r = com_iva({'teclado': 10, 'oferta': 0, 'cabo': 5})\nverifica('só produtos com preço', sorted(_r) == ['cabo', 'teclado'])\nverifica('teclado com iva', abs(_r['teclado'] - 12.3) < 0.01)\nverifica('cabo com iva', abs(_r['cabo'] - 6.15) < 0.01)\nverifica('dicionário vazio devolve vazio', com_iva({}) == {})"
          }
        }
      ]
    },
    {
      n: 3, fase: 1, titulo: "Estruturas de dados",
      objetivo: "Escolher a estrutura certa, que é metade do desempenho do programa.",
      licoes: [
        {
          id: "3.1", titulo: "Dicionários, a estrutura que vais usar todos os dias", min: 18, estado: "pronta",
          meta: "No fim: modelas dados reais com dicionários e evitas o KeyError.",
          blocos: [
            ["p", "Uma lista guarda coisas por posição. Um dicionário guarda coisas por nome. Quase todos os dados que vais tocar no trabalho (respostas de APIs, linhas de base de dados, configuração) chegam como dicionários."],
            ["py", "aluno = {\n    \"nome\": \"Rui\",\n    \"turma\": \"7A\",\n    \"notas\": [4, 3, 5],\n}\n\nprint(aluno[\"nome\"])\nprint(len(aluno[\"notas\"]))"],
            ["h", "Aceder sem rebentar"],
            ["p", "`aluno[\"email\"]` levanta `KeyError` se a chave não existir. `aluno.get(\"email\")` devolve `None`. `aluno.get(\"email\", \"sem email\")` devolve o valor por omissão. Escolhe conscientemente: às vezes queres mesmo que rebente."],
            ["py", "aluno = {\"nome\": \"Rui\"}\nprint(aluno.get(\"email\"))\nprint(aluno.get(\"email\", \"sem email\"))\nprint(\"email\" in aluno)"],
            ["h", "Percorrer"],
            ["py", "notas = {\"Rui\": 14, \"Ana\": 17, \"Zé\": 9}\n\nfor nome, nota in notas.items():\n    estado = \"positiva\" if nota >= 10 else \"negativa\"\n    print(f\"{nome:<6} {nota:>3}  {estado}\")\n\nprint(sum(notas.values()) / len(notas))"],
            ["obra", "Contar coisas é a tarefa mais frequente de um júnior. Faz-se com `collections.Counter`, não com um `if chave in dic` escrito à mão. Saber que a biblioteca padrão já resolve o problema é metade do valor de um programador."],
            ["py", "from collections import Counter\n\npalavras = \"o rato roeu a rolha da garrafa do rei da russia\".split()\nc = Counter(palavras)\nprint(c.most_common(3))"],
            ["aviso", "Chaves de dicionário têm de ser imutáveis. `str`, `int` e `tuple` servem. Uma `list` como chave dá `TypeError: unhashable type`."]
          ],
          quiz: [
            { p: "Tens 50 mil nomes e precisas de verificar se um nome existe, milhares de vezes. Lista ou set?", o: ["Lista, é mais simples", "Set, a procura é praticamente instantânea", "Não faz diferença"], c: 1,
              e: "Procura numa lista percorre item a item. Num `set` ou `dict` é acesso direto por hash. Com 50 mil itens a diferença é de milissegundos para microssegundos, e esta pergunta cai em entrevistas." }
          ],
          exercicio: {
            enunciado: "Dada a lista `vendas`, cria o dicionário `total_por_loja` com a soma das vendas de cada loja.",
            inicio: "vendas = [\n    {\"loja\": \"Lisboa\", \"valor\": 120},\n    {\"loja\": \"Porto\", \"valor\": 80},\n    {\"loja\": \"Lisboa\", \"valor\": 45},\n    {\"loja\": \"Faro\", \"valor\": 200},\n]\n\ntotal_por_loja = {}\n\n",
            testes: "verifica('Lisboa soma 165', total_por_loja.get('Lisboa') == 165)\nverifica('Porto soma 80', total_por_loja.get('Porto') == 80)\nverifica('Faro soma 200', total_por_loja.get('Faro') == 200)\nverifica('sem lojas a mais', len(total_por_loja) == 3)"
          }
        },
        {
          id: "3.2", titulo: "Listas, tuplos e sets", min: 15, estado: "pronta",
          meta: "No fim: escolhes a estrutura pela operação que precisas de fazer, não por hábito.",
          blocos: [
            ["p", "Três coleções, três propósitos. A lista é ordenada e alterável, e é o valor por omissão. O tuplo é ordenado e fixo, para coisas que andam juntas e não mudam. O conjunto não tem ordem nem repetidos, e responde a pertence numa fração do tempo."],
            ["py", "lista = [3, 1, 3, 2]\ntuplo = (38.7, -9.1)\nconjunto = {3, 1, 3, 2}\n\nprint(lista, tuplo, conjunto)\nprint(len(lista), len(conjunto))"],
            ["h", "Operações de lista que vais usar todos os dias"],
            ["py", "tarefas = [\"escrever\", \"testar\"]\ntarefas.append(\"publicar\")\ntarefas.insert(0, \"planear\")\ntarefas.remove(\"testar\")\nprint(tarefas)\nprint(tarefas[0], tarefas[-1])\nprint(tarefas[1:3])"],
            ["p", "As fatias `[inicio:fim]` incluem o início e excluem o fim. `[-1]` é o último elemento. `[:]` faz uma cópia rasa, que é a forma rápida de não estragar a lista de quem te chamou."],
            ["h", "Tuplos e desempacotamento"],
            ["p", "Um tuplo usa-se quando a posição tem significado fixo: coordenadas, um par chave e valor, o retorno de uma função com duas coisas. Desempacota-se por atribuição múltipla."],
            ["py", "def dividir(a, b):\n    return a // b, a % b\n\nquociente, resto = dividir(17, 5)\nprint(quociente, resto)\n\nprimeiro, *resto_da_lista = [1, 2, 3, 4]\nprint(primeiro, resto_da_lista)"],
            ["h", "Sets: pertence, únicos, diferenças"],
            ["py", "inscritos = {\"ana\", \"rui\", \"bea\"}\npresentes = {\"rui\", \"zeca\"}\n\nprint(\"ana\" in inscritos)\nprint(inscritos - presentes)\nprint(inscritos & presentes)\nprint(inscritos | presentes)"],
            ["obra", "Comparar duas listas de identificadores para ver o que falta de um lado é trabalho de rotina em integrações. Faz-se com `set(a) - set(b)` numa linha, e não com dois ciclos aninhados. Quem escreve os dois ciclos aninhados escreve também o bug."],
            ["aviso", "`lista_b = lista_a` não copia nada: são dois nomes para a mesma lista, e alterar uma altera a outra. Para copiar usa `lista_a.copy()` ou `list(lista_a)`. Isto apanha toda a gente uma vez, e há de te apanhar num argumento por omissão no módulo 4."],
            ["py", "a = [1, 2]\nb = a\nb.append(3)\nprint(a)\n\nc = a.copy()\nc.append(4)\nprint(a, c)"]
          ],
          quiz: [
            { p: "Precisas de guardar pares de coordenadas como chaves de um dicionário. Lista ou tuplo?", o: ["Lista, é mais flexível", "Tuplo, porque as chaves têm de ser imutáveis", "Qualquer uma"], c: 1,
              e: "Uma lista não é hashable e dá `TypeError: unhashable type: 'list'`. O tuplo é, exatamente por não poder mudar depois de criado." }
          ],
          exercicio: {
            enunciado: "Escreve `sem_repetidos(valores)` que devolve uma lista sem elementos repetidos, mantendo a ordem da primeira aparição.",
            inicio: "def sem_repetidos(valores):\n    pass\n",
            testes: "verifica('remove repetidos', sem_repetidos([3, 1, 3, 2, 1]) == [3, 1, 2])\nverifica('mantém a ordem', sem_repetidos(['b', 'a', 'b']) == ['b', 'a'])\nverifica('lista vazia', sem_repetidos([]) == [])\nverifica('sem repetidos fica igual', sem_repetidos([1, 2, 3]) == [1, 2, 3])"
          }
        },
        {
          id: "3.3", titulo: "Ordenar e filtrar dados", min: 14, estado: "pronta",
          meta: "No fim: ordenas listas de dicionários por vários campos sem escrever um único ciclo.",
          blocos: [
            ["p", "`sorted()` devolve uma lista nova. `lista.sort()` ordena no sítio e devolve `None`. Escrever `x = lista.sort()` e ficar com `None` é um clássico da primeira semana."],
            ["py", "notas = [14, 9, 20, 11]\nprint(sorted(notas))\nprint(sorted(notas, reverse=True))\nprint(notas)"],
            ["h", "A chave é tudo"],
            ["p", "O argumento `key` recebe uma função que, para cada elemento, devolve o valor por que se ordena. Não ordena pelo que a função devolve para o mostrar: ordena por esse valor e devolve os elementos originais."],
            ["py", "alunos = [\n    {\"nome\": \"Rui\", \"nota\": 14},\n    {\"nome\": \"Ana\", \"nota\": 17},\n    {\"nome\": \"Bea\", \"nota\": 14},\n]\n\npor_nota = sorted(alunos, key=lambda a: a[\"nota\"], reverse=True)\nfor a in por_nota:\n    print(a[\"nome\"], a[\"nota\"])"],
            ["p", "Uma `lambda` é uma função anónima de uma expressão. Serve para isto e pouco mais: se precisas de mais do que uma linha, dá-lhe um nome com `def`."],
            ["h", "Vários critérios"],
            ["p", "Devolve um tuplo na chave e ordena-se pelo primeiro elemento, desempatando pelo segundo. Para inverter só um dos critérios com números, põe-lhe um sinal menos."],
            ["py", "alunos = [\n    {\"nome\": \"Rui\", \"nota\": 14},\n    {\"nome\": \"Ana\", \"nota\": 17},\n    {\"nome\": \"Bea\", \"nota\": 14},\n]\n\nordenados = sorted(alunos, key=lambda a: (-a[\"nota\"], a[\"nome\"]))\nprint([a[\"nome\"] for a in ordenados])"],
            ["obra", "Relatórios que mudam de ordem entre execuções são um pesadelo de depuração. Ordena sempre com um critério de desempate estável, tipicamente o identificador ou o nome. Um relatório reprodutível é um relatório em que se pode confiar."],
            ["h", "Filtrar, mínimo e máximo"],
            ["py", "alunos = [\n    {\"nome\": \"Rui\", \"nota\": 14},\n    {\"nome\": \"Ana\", \"nota\": 17},\n    {\"nome\": \"Zé\", \"nota\": 8},\n]\n\npositivas = [a for a in alunos if a[\"nota\"] >= 10]\nmelhor = max(alunos, key=lambda a: a[\"nota\"])\nprint(len(positivas), melhor[\"nome\"])"],
            ["aviso", "`sorted` em texto ordena por código de caracteres: as maiúsculas vêm antes das minúsculas e os acentos vêm depois de tudo. Para listas de nomes em português usa `key=str.lower` no mínimo, e `locale` ou `unicodedata` se a ordem tiver de aparecer ao utilizador."],
            ["py", "nomes = [\"ana\", \"Álvaro\", \"Bruno\", \"zé\"]\nprint(sorted(nomes))\nprint(sorted(nomes, key=str.lower))"]
          ],
          quiz: [
            { p: "`melhores = alunos.sort(key=lambda a: a['nota'])` e depois `len(melhores)` rebenta. Porquê?", o: ["A lambda está errada", "`sort()` ordena no sítio e devolve None", "Faltam parênteses"], c: 1,
              e: "Convenção de Python: métodos que alteram o objeto devolvem `None`. Querias `sorted(alunos, key=...)`, que devolve uma lista nova." }
          ],
          exercicio: {
            enunciado: "Escreve `top(alunos, n)` que devolve os nomes dos `n` alunos com melhor nota, da mais alta para a mais baixa, desempatando por nome por ordem alfabética.",
            inicio: "def top(alunos, n):\n    pass\n",
            testes: "_a = [{'nome':'Rui','nota':14},{'nome':'Ana','nota':17},{'nome':'Bea','nota':14},{'nome':'Zé','nota':8}]\nverifica('melhor primeiro', top(_a, 1) == ['Ana'])\nverifica('desempata por nome', top(_a, 3) == ['Ana', 'Bea', 'Rui'])\nverifica('n maior que a lista', len(top(_a, 10)) == 4)\nverifica('n zero devolve vazio', top(_a, 0) == [])"
          }
        }
      ]
    },
    {
      n: 4, fase: 1, titulo: "Funções",
      objetivo: "Deixar de escrever scripts corridos e passar a escrever peças reutilizáveis.",
      licoes: [
        {
          id: "4.1", titulo: "Definir, devolver, chamar", min: 15, estado: "pronta",
          meta: "No fim: escreves funções que devolvem valores e percebes porque é que print não serve.",
          blocos: [
            ["p", "Uma função é um bloco com nome, que recebe dados e devolve um resultado. Existe por duas razões: não repetir código e dar nome a uma ideia. A segunda é a mais importante e é a que quase ninguém diz."],
            ["py", "def area_retangulo(largura, altura):\n    return largura * altura\n\nprint(area_retangulo(3, 4))\nprint(area_retangulo(altura=10, largura=2))"],
            ["p", "Os argumentos passam-se por posição ou por nome. Por nome é mais comprido e mais claro, e em chamadas com três ou mais argumentos é o que se espera de ti em revisão."],
            ["h", "return contra print: o erro número um"],
            ["p", "`print` escreve no ecrã e devolve `None`. `return` entrega o valor a quem chamou. Uma função que faz `print` em vez de `return` não se consegue reutilizar, nem testar, nem compor com outra."],
            ["py", "def com_print(a, b):\n    print(a + b)\n\ndef com_return(a, b):\n    return a + b\n\nx = com_print(2, 3)\ny = com_return(2, 3)\nprint(\"x =\", x)\nprint(\"y =\", y)\nprint(com_return(com_return(1, 2), 3))"],
            ["p", "Uma função sem `return` explícito devolve `None`. Isso é legítimo quando a função existe para ter um efeito, como gravar um ficheiro. Não é legítimo quando ela calcula alguma coisa."],
            ["h", "Regressar cedo"],
            ["py", "def desconto(preco, cliente_antigo):\n    if preco <= 0:\n        return 0.0\n    if not cliente_antigo:\n        return preco\n    return round(preco * 0.9, 2)\n\nprint(desconto(100, True), desconto(100, False), desconto(0, True))"],
            ["h", "Âmbito das variáveis"],
            ["p", "O que nasce dentro da função morre com ela. Ler uma variável de fora funciona, mas escrever cria uma nova, local. Depender de variáveis globais é a forma mais rápida de tornar um programa impossível de seguir: passa tudo por argumentos."],
            ["py", "taxa = 0.23\n\ndef com_iva(preco):\n    return preco * (1 + taxa)\n\nprint(com_iva(100))"],
            ["obra", "Uma função com sete argumentos, cento e vinte linhas e três responsabilidades é o que vais encontrar em código antigo e o que não deves escrever. A regra que passa em revisão: um nome que descreve o que faz, e se o nome tiver um 'e' no meio, são duas funções."],
            ["aviso", "Docstring, entre três aspas, na primeira linha do corpo. Explica o que a função devolve e o que faz em casos limite, não como está implementada. É o que aparece no `help()` e no editor de quem te lê."],
            ["code", "def media(valores):\n    \"\"\"Devolve a média dos valores. Levanta ValueError se a lista estiver vazia.\"\"\"\n    if not valores:\n        raise ValueError(\"lista vazia\")\n    return sum(valores) / len(valores)"]
          ],
          quiz: [
            { p: "Um colega diz que a função dele funciona porque imprime o resultado certo. Que pergunta lhe fazes?", o: ["Se testou com números negativos", "Como é que outra função usa esse resultado", "Se o nome está em inglês"], c: 1,
              e: "Imprimir é mostrar a um humano. Devolver é entregar ao programa. Uma função que só imprime é um beco sem saída: não se testa nem se compõe." }
          ],
          exercicio: {
            enunciado: "Escreve `preco_final(preco, percentagem)` que devolve o preço com o desconto aplicado, arredondado a duas casas. Percentagem zero devolve o preço original. Não imprimas nada.",
            inicio: "def preco_final(preco, percentagem):\n    pass\n",
            testes: "verifica('20 por cento de 100', preco_final(100, 20) == 80.0)\nverifica('sem desconto', preco_final(49.9, 0) == 49.9)\nverifica('arredonda a duas casas', preco_final(33.33, 10) == 30.0)\nverifica('devolve em vez de imprimir', preco_final(10, 50) is not None)"
          }
        },
        {
          id: "4.2", titulo: "Argumentos por omissão, *args e **kwargs", min: 14, estado: "pronta",
          meta: "No fim: escreves assinaturas flexíveis e escapas à armadilha do argumento mutável.",
          blocos: [
            ["p", "Um argumento por omissão dá um valor quando quem chama não o fornece. Serve para não obrigar toda a gente a repetir o caso normal."],
            ["py", "def saudar(nome, saudacao=\"Olá\"):\n    return f\"{saudacao}, {nome}\"\n\nprint(saudar(\"Ana\"))\nprint(saudar(\"Rui\", \"Bom dia\"))\nprint(saudar(\"Bea\", saudacao=\"Viva\"))"],
            ["aviso", "O valor por omissão é criado uma vez, quando a função é definida, e não a cada chamada. Com uma lista ou um dicionário por omissão, todas as chamadas partilham o mesmo objeto. Este é o bug de Python mais famoso de sempre e cai em entrevistas."],
            ["py", "def mau(item, lista=[]):\n    lista.append(item)\n    return lista\n\nprint(mau(\"a\"))\nprint(mau(\"b\"))\nprint(mau(\"c\"))"],
            ["p", "A correção é sempre a mesma: `None` por omissão e criar lá dentro."],
            ["py", "def bom(item, lista=None):\n    if lista is None:\n        lista = []\n    lista.append(item)\n    return lista\n\nprint(bom(\"a\"))\nprint(bom(\"b\"))"],
            ["h", "Número variável de argumentos"],
            ["p", "`*args` apanha os argumentos posicionais a mais num tuplo. `**kwargs` apanha os nomeados num dicionário. Os nomes não são obrigatórios, mas usa-os: toda a gente os reconhece."],
            ["py", "def total(*valores, moeda=\"euros\", **extras):\n    print(\"valores:\", valores)\n    print(\"extras:\", extras)\n    return f\"{sum(valores)} {moeda}\"\n\nprint(total(10, 20, 5, moeda=\"USD\", cliente=\"Ana\"))"],
            ["p", "O contrário também funciona: um asterisco espalha uma lista em argumentos, dois asteriscos espalham um dicionário em argumentos nomeados."],
            ["py", "def dividir(a, b):\n    return a / b\n\npar = [10, 4]\nnomeados = {\"a\": 9, \"b\": 3}\nprint(dividir(*par))\nprint(dividir(**nomeados))"],
            ["h", "Obrigar a nomear"],
            ["p", "Tudo o que vier depois de um `*` sozinho na assinatura só pode ser passado por nome. Usa-o em booleanos: `enviar(email, forcar=True)` lê-se, `enviar(email, True)` não."],
            ["code", "def exportar(dados, *, formato=\"csv\", comprimir=False):\n    ...\n\nexportar(dados, formato=\"json\")     # ok\nexportar(dados, \"json\")             # TypeError"],
            ["obra", "`**kwargs` a atravessar cinco funções é como se perde a noção do que uma API aceita. Usa-o em decoradores e camadas de compatibilidade; nas funções de negócio, escreve os argumentos com nome e tipo."]
          ],
          quiz: [
            { p: "`def acrescentar(x, historico=[])` chamada três vezes seguidas devolve listas com 1, 2 e 3 elementos. Porquê?", o: ["Bug do interpretador", "A lista por omissão é criada uma só vez e partilhada entre chamadas", "Porque falta o return"], c: 1,
              e: "O valor por omissão é avaliado na definição. Regra: valores por omissão só imutáveis, `None` para o resto." }
          ],
          exercicio: {
            enunciado: "Escreve `registar(evento, historico=None)` que acrescenta o evento ao histórico e devolve a lista. Sem histórico, começa uma lista nova a cada chamada.",
            inicio: "def registar(evento, historico=None):\n    pass\n",
            testes: "verifica('primeira chamada', registar('arranque') == ['arranque'])\nverifica('chamadas não se contaminam', registar('paragem') == ['paragem'])\n_h = ['antigo']\nverifica('usa o histórico dado', registar('novo', _h) == ['antigo', 'novo'])\nverifica('altera a lista recebida', _h == ['antigo', 'novo'])"
          }
        },
        {
          id: "4.3", titulo: "Anotações de tipo", min: 12, estado: "pronta",
          meta: "No fim: escreves assinaturas que o editor e a equipa conseguem ler sem abrir o corpo da função.",
          blocos: [
            ["p", "Uma anotação diz que tipo se espera. Python não a verifica em execução: quem verifica é o teu editor e uma ferramenta chamada mypy, no módulo 11. O valor é documentação que não fica desatualizada em silêncio."],
            ["py", "def area(largura: float, altura: float) -> float:\n    return largura * altura\n\nprint(area(3, 4.5))\nprint(area.__annotations__)"],
            ["h", "Coleções"],
            ["p", "Desde o Python 3.9 escreve-se com os tipos normais: `list[str]`, `dict[str, int]`, `tuple[int, int]`. As versões antigas usavam `List` e `Dict` do módulo `typing` e ainda as vais encontrar em código com uns anos."],
            ["code", "def nomes_por_turma(alunos: list[dict]) -> dict[str, list[str]]:\n    ...\n\ndef coordenadas() -> tuple[float, float]:\n    ...\n\ndef primeiro(valores: list[int]) -> int | None:\n    return valores[0] if valores else None"],
            ["p", "`int | None` significa inteiro ou nada. É a anotação mais útil de todas, porque obriga quem lê a lembrar-se de que o resultado pode não existir. Em código mais antigo aparece como `Optional[int]`."],
            ["h", "Onde vale mesmo a pena"],
            ["lista", [
              "Nas funções públicas de um módulo, que outras pessoas vão chamar.",
              "Em qualquer coisa que devolva `None` em certos casos.",
              "Em estruturas de dados que atravessam camadas, como as `dataclasses` do módulo 8.",
              "Em código que já te enganou uma vez sobre o que recebia."
            ]],
            ["obra", "Num projeto novo em 2026, uma função sem anotações levanta perguntas em revisão. Não porque falte rigor teórico: é porque sem elas ninguém sabe se `dados` é uma lista de dicionários, um dicionário de listas ou um objeto, sem ir ler três ficheiros."],
            ["aviso", "Anotar não valida. `def idade(n: int)` chamada com a string 'trinta' corre na mesma até rebentar mais à frente. Validação de dados que vêm de fora faz-se com código, ou com Pydantic, no módulo 16."],
            ["py", "def dobro(n: int) -> int:\n    return n * 2\n\nprint(dobro(\"ab\"))"],
            ["p", "Aquele resultado é 'abab'. Correu, não é o que querias, e nenhuma anotação te salvou. Foi mypy que ficou vermelho, no computador de quem correu mypy."]
          ],
          quiz: [
            { p: "Que anotação escolhes para uma função que procura um utilizador e pode não o encontrar?", o: ["`-> dict`", "`-> dict | None`", "`-> bool`"], c: 1,
              e: "O tipo tem de mostrar a ausência. Assim o editor avisa quem se esquecer de tratar o caso, que é exatamente onde nascem os `AttributeError: 'NoneType' object has no attribute`." }
          ],
          exercicio: {
            enunciado: "Escreve `media(valores)` anotada: recebe `list[float]` e devolve `float | None`, devolvendo `None` quando a lista está vazia. As anotações fazem parte do exercício.",
            inicio: "def media(valores):\n    pass\n",
            testes: "verifica('média correta', media([10.0, 20.0]) == 15.0)\nverifica('lista vazia devolve None', media([]) is None)\n_a = media.__annotations__\nverifica('argumento anotado como list[float]', str(_a.get('valores')) == 'list[float]')\nverifica('retorno anotado com float e None', 'float' in str(_a.get('return')) and 'None' in str(_a.get('return')))"
          }
        }
      ]
    },

    /* ---------------- FASE 2 ---------------- */
    {
      n: 5, fase: 2, titulo: "Erros e exceções",
      objetivo: "Falhar de forma controlada em vez de esconder problemas.",
      licoes: [
        {
          id: "5.1", titulo: "try, except, else, finally", min: 14, estado: "pronta",
          meta: "No fim: apanhas o erro certo, no sítio certo, e nunca escreves um except vazio.",
          blocos: [
            ["p", "Nem todos os erros são bugs. Um ficheiro que não existe, uma rede que caiu, um utilizador que escreveu 'trinta' na idade: são casos previsíveis. O `try` serve para os tratar, não para esconder código partido."],
            ["py", "def para_inteiro(texto):\n    try:\n        return int(texto)\n    except ValueError:\n        return None\n\nprint(para_inteiro(\"42\"))\nprint(para_inteiro(\"quarenta e dois\"))"],
            ["h", "Apanhar o erro exato"],
            ["p", "`except ValueError` apanha um problema de conteúdo. `except TypeError` apanha um problema de tipo. `except Exception` apanha tudo, incluindo erros de programação que querias ver. E `except:` sozinho apanha até o Ctrl+C do utilizador."],
            ["aviso", "Um `except` vazio é o pior código que podes escrever em Python. O programa continua a correr com dados errados, sem sinal nenhum, e quem for depurar daqui a seis meses não tem por onde começar. Se alguma vez precisares mesmo de apanhar tudo, regista o erro e volta a levantá-lo com `raise`."],
            ["code", "# nunca\ntry:\n    processar(dados)\nexcept:\n    pass\n\n# aceitável\ntry:\n    processar(dados)\nexcept Exception:\n    logger.exception(\"falha a processar\")\n    raise"],
            ["h", "As quatro partes"],
            ["py", "def dividir(a, b):\n    try:\n        resultado = a / b\n    except ZeroDivisionError:\n        print(\"divisão por zero\")\n        return None\n    else:\n        print(\"correu bem\")\n        return resultado\n    finally:\n        print(\"isto corre sempre\")\n\nprint(dividir(10, 2))\nprint(dividir(10, 0))"],
            ["p", "`else` corre se não houve exceção, e serve para manter dentro do `try` apenas a linha que pode falhar. `finally` corre sempre, mesmo com `return` pelo meio, e é onde se fecha o que estiver aberto."],
            ["h", "Vários tipos, e a mensagem"],
            ["py", "for valor in [\"10\", \"dez\", None]:\n    try:\n        print(int(valor) * 2)\n    except (ValueError, TypeError) as erro:\n        print(f\"{type(erro).__name__}: {erro}\")"],
            ["obra", "Regra prática das equipas: apanha a exceção no sítio onde sabes o que fazer com ela. Uma função de baixo nível que lê um ficheiro não sabe se deve mostrar um erro ao utilizador ou tentar outra vez, por isso deixa a exceção subir. Quem decide é quem tem contexto."],
            ["h", "Levantar de propósito"],
            ["py", "def raiz(n):\n    if n < 0:\n        raise ValueError(f\"n tem de ser positivo, recebi {n}\")\n    return n ** 0.5\n\nprint(raiz(9))\nprint(raiz(-1))"],
            ["p", "Repara na mensagem: diz o que se esperava e o que chegou. Uma mensagem de erro escrita a pensar em quem a vai ler às três da manhã é um sinal de maturidade que se nota."]
          ],
          quiz: [
            { p: "Um serviço em produção deixou de gravar dados e ninguém deu por nada durante duas semanas. Que padrão de código é o suspeito principal?", o: ["Um try/except a apanhar tudo e a passar à frente", "Falta de anotações de tipo", "Demasiadas funções pequenas"], c: 1,
              e: "Erros silenciados são falhas invisíveis. Regista sempre, e volta a levantar quando não sabes tratar." }
          ],
          exercicio: {
            enunciado: "Escreve `ler_int(texto, omissao=0)` que converte o texto para inteiro. Se o conteúdo não for um número, devolve `omissao`. Um tipo impossível de converter, como `None`, deve continuar a rebentar com `TypeError`.",
            inicio: "def ler_int(texto, omissao=0):\n    pass\n",
            testes: "verifica('converte texto numérico', ler_int('12') == 12)\nverifica('texto inválido devolve a omissão', ler_int('doze') == 0)\nverifica('omissão personalizada', ler_int('doze', -1) == -1)\n_tipo = False\ntry:\n    ler_int(None)\nexcept TypeError:\n    _tipo = True\nexcept Exception:\n    _tipo = False\nverifica('None continua a levantar TypeError', _tipo)"
          }
        },
        {
          id: "5.2", titulo: "Exceções próprias e validação", min: 12, estado: "pronta",
          meta: "No fim: distingues erro de programação de erro de domínio e escreves mensagens que ajudam.",
          blocos: [
            ["p", "As exceções da biblioteca padrão descrevem problemas técnicos: tipo errado, chave em falta, divisão por zero. O teu programa tem problemas próprios: encomenda sem itens, saldo insuficiente, ficheiro com colunas a mais. Esses merecem exceções com nome teu."],
            ["py", "class ErroDeValidacao(Exception):\n    pass\n\nclass SaldoInsuficiente(ErroDeValidacao):\n    pass\n\ndef levantar(saldo, valor):\n    if valor <= 0:\n        raise ErroDeValidacao(f\"valor tem de ser positivo, recebi {valor}\")\n    if valor > saldo:\n        raise SaldoInsuficiente(f\"pediu {valor}, tem {saldo}\")\n    return saldo - valor\n\nprint(levantar(100, 30))\nprint(levantar(100, 500))"],
            ["p", "Três linhas para uma classe de exceção. Herda de `Exception`, nunca de `BaseException`. Uma hierarquia rasa chega: uma exceção base do teu módulo e duas ou três específicas por baixo."],
            ["h", "Porque é que isto compensa"],
            ["lista", [
              "Quem chama pode apanhar `SaldoInsuficiente` sem apanhar todos os `ValueError` do mundo.",
              "O nome da exceção aparece nos registos e diz logo o que aconteceu, sem ler a mensagem.",
              "Podes apanhar a base `ErroDeValidacao` e tratar a família toda numa camada de cima.",
              "Os testes ficam explícitos: `with pytest.raises(SaldoInsuficiente)`."
            ]],
            ["h", "Validar cedo, na fronteira"],
            ["p", "Dados de fora, de um formulário, de um ficheiro ou de uma API, entram sempre pela mesma porta e são sempre suspeitos. Valida ali, uma vez, e deixa o resto do programa confiar."],
            ["py", "class ErroDeValidacao(Exception):\n    pass\n\ndef validar_pedido(pedido):\n    erros = []\n    if not pedido.get(\"email\"):\n        erros.append(\"email em falta\")\n    if pedido.get(\"quantidade\", 0) <= 0:\n        erros.append(\"quantidade tem de ser positiva\")\n    if erros:\n        raise ErroDeValidacao(\"; \".join(erros))\n    return True\n\ntry:\n    validar_pedido({\"quantidade\": 0})\nexcept ErroDeValidacao as e:\n    print(\"pedido rejeitado:\", e)"],
            ["p", "Repara que junta todos os erros antes de levantar. Devolver um erro de cada vez obriga o utilizador a corrigir, submeter, corrigir, submeter. Isto é desenho de produto dentro de uma função."],
            ["obra", "Em APIs, este padrão é o que separa um 500 de um 400 com mensagem útil. O `ErroDeValidacao` do teu domínio é apanhado na camada web e traduzido para uma resposta com o campo que falhou. Vais fazer isso no módulo 16."],
            ["aviso", "`raise ErroDeValidacao` sem parênteses funciona mas levanta a classe sem mensagem. E dentro de um `except`, usa `raise ... from erro` para não perderes o traceback original: quem depurar quer ver as duas pontas."],
            ["code", "try:\n    dados = json.loads(texto)\nexcept json.JSONDecodeError as erro:\n    raise ErroDeValidacao(\"ficheiro de configuração inválido\") from erro"]
          ],
          quiz: [
            { p: "Onde é que uma exceção de domínio como `SaldoInsuficiente` deve ser apanhada?", o: ["Na função que a levanta", "Na camada que sabe o que fazer com ela, tipicamente onde se responde ao utilizador", "No arranque do programa"], c: 1,
              e: "Apanhar onde se levanta transforma a exceção num `if` disfarçado. Deixa-a subir até quem tem contexto para decidir." }
          ],
          exercicio: {
            enunciado: "Cria a exceção `ErroDeValidacao` e a função `validar(pedido)`. Sem chave `email` ou com `quantidade` menor ou igual a zero, levanta `ErroDeValidacao` com uma mensagem que nomeia o campo em falta. Caso contrário devolve `True`.",
            inicio: "class ErroDeValidacao(Exception):\n    pass\n\n\ndef validar(pedido):\n    pass\n",
            testes: "verifica('herda de Exception', issubclass(ErroDeValidacao, Exception))\nverifica('pedido válido devolve True', validar({'email': 'a@b.pt', 'quantidade': 2}) is True)\n_msg = ''\ntry:\n    validar({'quantidade': 2})\nexcept ErroDeValidacao as _e:\n    _msg = str(_e)\nverifica('email em falta é rejeitado', 'email' in _msg)\n_q = False\ntry:\n    validar({'email': 'a@b.pt', 'quantidade': 0})\nexcept ErroDeValidacao:\n    _q = True\nverifica('quantidade zero é rejeitada', _q)"
          }
        }
      ]
    },
    {
      n: 6, fase: 2, titulo: "Ficheiros, JSON e CSV",
      objetivo: "Ler e escrever dados que sobrevivem ao fim do programa.",
      licoes: [
        {
          id: "6.1", titulo: "pathlib e o gestor de contexto", min: 14, estado: "pronta",
          meta: "No fim: lês e escreves ficheiros com caminhos que funcionam em qualquer sistema.",
          blocos: [
            ["p", "Caminhos não são texto. Juntar pastas com `+` e barras à mão parte no Windows, parte com espaços e parte quando falta uma barra. `pathlib` trata disso e é a forma moderna."],
            ["py", "from pathlib import Path\n\nficheiro = Path(\"dados\") / \"2026\" / \"vendas.csv\"\nprint(ficheiro)\nprint(ficheiro.name, ficheiro.stem, ficheiro.suffix)\nprint(ficheiro.parent)\nprint(ficheiro.with_suffix(\".json\"))"],
            ["p", "O operador `/` compõe caminhos. `name` é o ficheiro, `stem` é o nome sem extensão, `suffix` é a extensão, `parent` é a pasta. Nada disto toca no disco: são só cálculos sobre o caminho."],
            ["h", "Abrir com with"],
            ["p", "`with` é o gestor de contexto: garante que o ficheiro é fechado, mesmo que rebente uma exceção lá dentro. Ficheiro aberto sem `with` é um descritor perdido, e num serviço a correr durante dias isso acaba em 'too many open files'."],
            ["py", "from pathlib import Path\nimport tempfile\n\npasta = Path(tempfile.mkdtemp())\nalvo = pasta / \"notas.txt\"\n\nwith open(alvo, \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Ana;17\\n\")\n    f.write(\"Rui;14\\n\")\n\nwith open(alvo, encoding=\"utf-8\") as f:\n    for linha in f:\n        print(linha.strip())"],
            ["aviso", "`encoding=\"utf-8\"` sempre, na leitura e na escrita. Sem ele, Python usa a codificação do sistema, que difere entre o teu portátil e o servidor. É assim que um relatório com acentos chega ao cliente cheio de caracteres estranhos."],
            ["h", "Atalhos do pathlib"],
            ["py", "from pathlib import Path\nimport tempfile\n\npasta = Path(tempfile.mkdtemp())\nficheiro = pasta / \"config.txt\"\n\nficheiro.write_text(\"modo=producao\\n\", encoding=\"utf-8\")\nprint(ficheiro.read_text(encoding=\"utf-8\"))\nprint(ficheiro.exists(), ficheiro.stat().st_size)\n\n(pasta / \"saida\").mkdir(parents=True, exist_ok=True)\nprint([p.name for p in pasta.iterdir()])"],
            ["p", "`mkdir(parents=True, exist_ok=True)` cria a árvore toda e não se queixa se já existir. É a linha que se escreve antes de gravar seja o que for."],
            ["h", "Ler ficheiros grandes"],
            ["p", "`f.read()` traz tudo para memória. Percorrer o ficheiro linha a linha com um `for` lê um pedaço de cada vez e aguenta ficheiros maiores do que a memória da máquina."],
            ["code", "total = 0\nwith open(\"vendas.csv\", encoding=\"utf-8\") as f:\n    next(f)  # saltar o cabeçalho\n    for linha in f:\n        total += float(linha.split(\",\")[2])"],
            ["obra", "Caminhos absolutos escritos no código são a razão pela qual o script do colega não corre na tua máquina. Constrói a partir de `Path(__file__).parent` ou de uma variável de ambiente, nunca a partir de `C:/Users/joao/Desktop`."]
          ],
          quiz: [
            { p: "Porque é que `with open(...)` é preferível a `f = open(...)` seguido de `f.close()`?", o: ["É mais curto", "Fecha o ficheiro mesmo quando rebenta uma exceção pelo meio", "É mais rápido"], c: 1,
              e: "Com o `close()` à mão, uma exceção salta por cima dele. Em serviços longos isso esgota descritores e corrompe escritas que ficaram em buffer." }
          ],
          exercicio: {
            enunciado: "Escreve `caminho_de_saida(entrada)` que recebe um caminho como 'dados/2026/vendas.csv' e devolve um `Path` para 'dados/2026/saida/vendas.json': mesma pasta, subpasta 'saida', extensão trocada para .json.",
            inicio: "from pathlib import Path\n\n\ndef caminho_de_saida(entrada):\n    pass\n",
            testes: "_r = caminho_de_saida('dados/2026/vendas.csv')\nverifica('devolve um Path', isinstance(_r, Path))\nverifica('caminho completo', str(_r) == 'dados/2026/saida/vendas.json')\nverifica('ficheiro sem pasta', str(caminho_de_saida('vendas.csv')) == 'saida/vendas.json')\nverifica('respeita outro nome', str(caminho_de_saida('a/b/relatorio.txt')) == 'a/b/saida/relatorio.json')"
          }
        },
        {
          id: "6.2", titulo: "CSV e JSON na prática", min: 16, estado: "pronta",
          meta: "No fim: lês um ficheiro sujo, agregas os dados e produzes um relatório.",
          blocos: [
            ["p", "CSV é a moeda de troca do mundo real: sai de qualquer folha de cálculo e de qualquer sistema antigo. JSON é a moeda de troca entre programas. Vais passar mais tempo a converter entre os dois do que gostarias."],
            ["h", "Ler CSV como dicionários"],
            ["py", "import csv\nimport io\n\ntexto = \"produto,categoria,valor\\nteclado,perifericos,39.90\\nrato,perifericos,12.50\\nmonitor,ecras,180.00\\n\"\n\nfor linha in csv.DictReader(io.StringIO(texto)):\n    print(linha[\"produto\"], linha[\"valor\"])"],
            ["p", "`DictReader` usa a primeira linha como cabeçalho e devolve um dicionário por linha. Num ficheiro real trocas o `io.StringIO` por `open(caminho, encoding=\"utf-8\", newline=\"\")`."],
            ["aviso", "Tudo o que sai de um CSV é texto. `linha[\"valor\"]` é a string '39.90', não o número. Somar sem converter dá uma concatenação silenciosa ou um `TypeError`. E o `newline=\"\"` no `open` não é decorativo: sem ele aparecem linhas em branco no Windows."],
            ["h", "Ficheiros sujos, que é o caso normal"],
            ["py", "import csv\nimport io\n\ntexto = \"produto,categoria,valor\\nteclado, perifericos ,39.90\\nsem preco,ecras,\\nrato,perifericos,12.50\\n\"\n\ntotais = {}\nfor linha in csv.DictReader(io.StringIO(texto)):\n    categoria = linha[\"categoria\"].strip()\n    bruto = (linha[\"valor\"] or \"\").strip()\n    if not bruto:\n        print(\"linha sem valor, ignorada:\", linha[\"produto\"])\n        continue\n    totais[categoria] = totais.get(categoria, 0) + float(bruto)\n\nprint(totais)"],
            ["p", "Espaços a mais, células vazias, vírgulas dentro do texto, cabeçalhos com maiúsculas diferentes. Escreve o código a contar com isso desde o início, e regista o que ignoraste em vez de o deixar cair em silêncio."],
            ["h", "Escrever CSV"],
            ["code", "import csv\n\nwith open(\"relatorio.csv\", \"w\", encoding=\"utf-8\", newline=\"\") as f:\n    escritor = csv.DictWriter(f, fieldnames=[\"categoria\", \"total\"])\n    escritor.writeheader()\n    for categoria, total in sorted(totais.items()):\n        escritor.writerow({\"categoria\": categoria, \"total\": f\"{total:.2f}\"})"],
            ["h", "JSON"],
            ["py", "import json\n\ntexto = '{\"nome\": \"Ana\", \"notas\": [17, 14], \"ativo\": true}'\ndados = json.loads(texto)\nprint(dados[\"notas\"], type(dados[\"ativo\"]))\n\nde_volta = json.dumps(dados, ensure_ascii=False, indent=2)\nprint(de_volta)"],
            ["p", "`loads` e `dumps` trabalham com texto, `load` e `dump` com ficheiros abertos. O `ensure_ascii=False` guarda acentos como acentos, e o `indent=2` deixa o ficheiro legível para humanos e para o git."],
            ["aviso", "`json.dumps` rebenta com objetos que não sejam tipos básicos: `datetime`, `Decimal`, `set`. Converte antes, tipicamente para texto ISO no caso das datas, ou passa `default=str` se for mesmo só para registo."],
            ["obra", "O pedido mais comum a um júnior: 'pega neste export de 40 mil linhas, agrega por mês e manda-me um resumo'. Faz-se com `csv.DictReader`, um dicionário de acumulação e `sorted`. Se conseguires fazer isto sozinho, já estás a produzir valor no primeiro mês."]
          ],
          quiz: [
            { p: "Somas a coluna 'valor' de um CSV e o total dá uma string gigante em vez de um número. O que aconteceu?", o: ["O ficheiro está corrompido", "Os valores vieram como texto e o `+` concatenou", "Falta o encoding"], c: 1,
              e: "CSV não tem tipos. Converte com `float()` ou `int()` à entrada, e trata as células vazias antes de converter." }
          ],
          exercicio: {
            enunciado: "Escreve `total_por_categoria(texto)` que recebe o conteúdo de um CSV com colunas produto, categoria e valor, e devolve um dicionário com a soma por categoria. Ignora linhas sem valor e limpa espaços à volta da categoria.",
            inicio: "import csv\nimport io\n\n\ndef total_por_categoria(texto):\n    pass\n",
            testes: "_csv = 'produto,categoria,valor\\nteclado, perifericos ,39.90\\nsem preco,ecras,\\nrato,perifericos,12.50\\nmonitor,ecras,180.00\\n'\n_r = total_por_categoria(_csv)\nverifica('duas categorias', sorted(_r) == ['ecras', 'perifericos'])\nverifica('soma dos periféricos', abs(_r['perifericos'] - 52.40) < 0.001)\nverifica('linha sem valor ignorada', abs(_r['ecras'] - 180.00) < 0.001)\nverifica('csv só com cabeçalho', total_por_categoria('produto,categoria,valor\\n') == {})"
          }
        },
        {
          id: "6.3", titulo: "Registo com logging", min: 12, estado: "pronta",
          meta: "No fim: substituis prints por registos com níveis que se conseguem ligar e desligar.",
          blocos: [
            ["p", "`print` serve para falar com um humano que está a olhar para o ecrã. Num serviço não há ninguém a olhar. `logging` escreve com hora, nível e origem, pode ir para ficheiro, e desliga-se sem apagar linhas de código."],
            ["py", "import logging\n\nlogging.basicConfig(level=logging.INFO, format=\"%(levelname)s %(name)s: %(message)s\")\nlogger = logging.getLogger(\"relatorio\")\n\nlogger.debug(\"detalhe que só interessa a depurar\")\nlogger.info(\"processadas 120 linhas\")\nlogger.warning(\"3 linhas sem valor, ignoradas\")\nlogger.error(\"não consegui gravar o relatório\")"],
            ["p", "O `debug` não apareceu porque o nível está em INFO. É essa a graça: em desenvolvimento pões DEBUG e vês tudo, em produção pões INFO ou WARNING e o ruído desaparece, sem tocar no código."],
            ["h", "Os cinco níveis, e quando usar cada um"],
            ["lista", [
              "`debug`: valores intermédios, útil enquanto procuras um problema.",
              "`info`: eventos normais do programa, como arranque, fim e contagens.",
              "`warning`: algo estranho que não impediu o trabalho, como uma linha ignorada.",
              "`error`: uma operação falhou e alguém tem de saber.",
              "`critical`: o programa não pode continuar."
            ]],
            ["h", "Um logger por módulo"],
            ["p", "A convenção é `logger = logging.getLogger(__name__)` no topo de cada ficheiro. Assim a mensagem mostra de que módulo veio, e podes calar um módulo barulhento sem calar o resto."],
            ["code", "# vendas/importador.py\nimport logging\n\nlogger = logging.getLogger(__name__)\n\ndef importar(caminho):\n    logger.info(\"a importar %s\", caminho)"],
            ["aviso", "Passa os valores como argumentos, `logger.info(\"a importar %s\", caminho)`, e não com f-string. Assim a formatação só acontece se a mensagem for mesmo emitida. É uma das poucas exceções à regra de usar sempre f-strings."],
            ["h", "Registar exceções"],
            ["py", "import logging\n\nlogging.basicConfig(level=logging.INFO)\nlogger = logging.getLogger(\"contas\")\n\ntry:\n    1 / 0\nexcept ZeroDivisionError:\n    logger.exception(\"falha a calcular a média\")"],
            ["p", "`logger.exception` só se usa dentro de um `except` e escreve o traceback completo por baixo da mensagem. É a diferença entre um registo que resolve o problema e um que só diz que houve problema."],
            ["obra", "Numa empresa, os registos vão para um sistema de pesquisa e alguém constrói alertas em cima deles. Por isso o texto deve ser estável e os dados variáveis devem ir em campos: 'importadas %d linhas de %s' é pesquisável, 'correu tudo bem :)' não é."],
            ["aviso", "Nunca registes palavras-passe, tokens, números de cartão ou dados pessoais completos. Registo é para toda a equipa e fica guardado durante meses. Isto não é só boa prática, é o RGPD."]
          ],
          quiz: [
            { p: "Porque é que se evita `logger.info(f\"utilizador {u}\")` a favor de `logger.info(\"utilizador %s\", u)`?", o: ["Por estilo antigo", "Porque a f-string é construída mesmo quando o nível desliga a mensagem", "Porque f-strings não suportam acentos"], c: 1,
              e: "Com milhares de chamadas por segundo em nível DEBUG desligado, formatar texto que ninguém vai ler custa tempo real de CPU." }
          ],
          exercicio: {
            enunciado: "Escreve `processar(valores)` que soma os valores positivos e devolve o total. Cada valor negativo é ignorado e registado com nível WARNING, através de um logger obtido com `logging.getLogger('relatorio')`. A mensagem tem de incluir o valor.",
            inicio: "import logging\n\nlogger = logging.getLogger('relatorio')\n\n\ndef processar(valores):\n    pass\n",
            testes: "_reg = []\nclass _Captura(logging.Handler):\n    def emit(self, r):\n        _reg.append((r.levelname, r.getMessage()))\n_h = _Captura()\n_raiz = logging.getLogger()\n_nivel = _raiz.level\n_raiz.addHandler(_h)\n_raiz.setLevel(logging.DEBUG)\n_total = processar([10, -5, 3])\n_raiz.removeHandler(_h)\n_raiz.setLevel(_nivel)\nverifica('soma só os positivos', _total == 13)\nverifica('registou um aviso', any(n == 'WARNING' for n, _ in _reg))\nverifica('a mensagem inclui o valor', any('-5' in m for _, m in _reg))\nverifica('não registou tudo o resto', len(_reg) == 1)"
          }
        }
      ]
    },
    {
      n: 7, fase: 2, titulo: "Módulos, ambientes e dependências",
      objetivo: "Deixar de ter um ficheiro gigante e de partir o Python do sistema.",
      licoes: [
        {
          id: "7.1", titulo: "import, módulos e pacotes", min: 14, estado: "pronta",
          meta: "No fim: divides um programa em ficheiros com fronteiras claras e sem importações circulares.",
          blocos: [
            ["p", "Um módulo é um ficheiro `.py`. Um pacote é uma pasta com módulos lá dentro. Importar é executar esse ficheiro uma vez e ficar com os nomes dele acessíveis. Não há mais mistério nenhum."],
            ["code", "vendas/\n  __init__.py\n  importador.py\n  relatorio.py\n  modelos.py\ntestes/\n  test_relatorio.py\nmain.py"],
            ["h", "As formas de importar"],
            ["code", "import json                          # nome completo: json.loads(...)\nimport pandas as pd                  # alias, convenção da biblioteca\nfrom pathlib import Path             # traz só o que precisas\nfrom vendas.relatorio import resumir # o teu próprio código\n\nfrom vendas.relatorio import *       # nunca faças isto"],
            ["p", "O `import *` traz nomes que não sabes quais são, esconde de onde veio cada coisa e parte assim que o outro módulo crescer. É proibido em quase todos os projetos sérios, e o `ruff` do módulo 11 apanha-o."],
            ["h", "O guarda do __main__"],
            ["p", "Quando importas um módulo, o código no topo dele corre. Se esse ficheiro também serve de script, o que só deve correr na execução direta vai dentro do guarda."],
            ["py", "def resumir(vendas):\n    return sum(vendas)\n\nif __name__ == \"__main__\":\n    print(\"a correr como script:\", resumir([1, 2, 3]))"],
            ["p", "Sem este guarda, importar o módulo dispara o programa inteiro, incluindo escritas em ficheiros e chamadas de rede. É o erro que faz um teste apagar dados a sério."],
            ["h", "Importações circulares"],
            ["p", "`a.py` importa `b.py` e `b.py` importa `a.py`. Python rebenta com `ImportError: cannot import name`. Não é um problema de sintaxe, é um sinal de que as fronteiras estão mal desenhadas."],
            ["lista", [
              "Extrai o que os dois precisam para um terceiro módulo, tipicamente `modelos.py`.",
              "Inverte a dependência: quem tem regras de negócio não deve importar quem trata da entrada e saída.",
              "Em último recurso, importa dentro da função em vez de no topo, e escreve porquê num comentário."
            ]],
            ["h", "A superfície pública"],
            ["p", "Nomes que começam por underscore são privados por convenção: ninguém de fora os deve usar. `__all__` no topo do módulo declara o que sai quando alguém importa. Isto é o teu contrato com o resto da equipa."],
            ["code", "__all__ = [\"resumir\", \"exportar\"]\n\ndef _formatar_linha(v):   # detalhe interno\n    ...\n\ndef resumir(vendas):      # API pública\n    ..."]
          ],
          quiz: [
            { p: "Corres os testes e um deles envia mesmo um email. Que erro de estrutura é este?", o: ["Falta um mock", "Código de execução no topo do módulo, sem guarda `if __name__ == '__main__'`", "O teste está mal escrito"], c: 1,
              e: "Importar tem de ser inofensivo. Tudo o que tem efeitos vai para dentro de funções, chamadas pelo guarda ou pelo ponto de entrada." }
          ],
          exercicio: {
            enunciado: "Organiza um módulo de identificadores: cria a função privada `_normalizar(texto)` que devolve o texto sem espaços nas pontas e em minúsculas, a função pública `slug(texto)` que usa a primeira e troca espaços por hífenes, e declara `__all__` com apenas a função pública.",
            inicio: "__all__ = []\n\n\ndef _normalizar(texto):\n    pass\n\n\ndef slug(texto):\n    pass\n",
            testes: "verifica('normaliza espaços e maiúsculas', _normalizar('  Relatorio Final ') == 'relatorio final')\nverifica('slug com hífenes', slug('  Relatorio Final ') == 'relatorio-final')\nverifica('texto vazio', slug('   ') == '')\nverifica('__all__ só expõe slug', __all__ == ['slug'])"
          }
        },
        {
          id: "7.2", titulo: "Ambientes virtuais e pip", min: 14, estado: "pronta",
          meta: "No fim: crias um ambiente isolado por projeto e sabes explicar porque é obrigatório.",
          blocos: [
            ["p", "Instalar bibliotecas no Python do sistema é o caminho mais curto para dois projetos incompatíveis na mesma máquina. Um projeto quer a versão 1 de uma biblioteca, o outro a versão 3, e o sistema operativo quer a 2 para as próprias ferramentas dele."],
            ["p", "Um ambiente virtual é uma pasta com um Python só teu e as bibliotecas desse projeto. Cria-se em dois comandos e resolve o problema todo."],
            ["code", "python3 -m venv .venv\nsource .venv/bin/activate      # Linux e macOS\n.venv\\Scripts\\activate         # Windows\n\npip install httpx pytest\npip list"],
            ["p", "Com o ambiente ativo, o prompt mostra `(.venv)` e `pip install` só mexe naquela pasta. Para sair, `deactivate`. A pasta `.venv` vai para o `.gitignore` e nunca para o repositório."],
            ["h", "Fixar as versões"],
            ["p", "O ficheiro de requisitos diz exatamente o que é preciso para o projeto correr. Sem ele, o teu colega instala versões diferentes e passa a tarde a perceber porque é que só na máquina dele falha."],
            ["code", "pip freeze > requirements.txt\npip install -r requirements.txt"],
            ["code", "# requirements.txt\nhttpx==0.27.0\npytest==8.2.0\n# ferramentas de desenvolvimento\nruff==0.5.0"],
            ["h", "O formato moderno: pyproject.toml"],
            ["p", "Projetos novos declaram tudo num só ficheiro, incluindo dependências, configuração do `ruff`, do `pytest` e do `mypy`. É o que vais encontrar em qualquer repositório com menos de três anos."],
            ["code", "[project]\nname = \"vendas\"\nversion = \"0.1.0\"\nrequires-python = \">=3.11\"\ndependencies = [\n    \"httpx>=0.27\",\n]\n\n[project.optional-dependencies]\ndev = [\"pytest>=8\", \"ruff>=0.5\"]"],
            ["obra", "Em 2026 muitas equipas já usam o `uv` em vez de `pip` e `venv`: `uv venv`, `uv add httpx`, `uv run pytest`. Faz o mesmo, em muito menos tempo, e resolve as versões num ficheiro de bloqueio. Aprende o `pip` primeiro, porque é o que existe em todo o lado, mas sabe que o `uv` existe."],
            ["aviso", "`sudo pip install` é uma má ideia com consequências reais: instala na cópia de Python de que o sistema operativo depende. Se alguma vez leste um tutorial que pede isso, ignora essa linha e cria um ambiente virtual."],
            ["h", "Sinais de um repositório bem tratado"],
            ["lista", [
              "`.venv` e ficheiros `.env` no `.gitignore`.",
              "Um `requirements.txt` ou um `pyproject.toml` com versões, não uma lista de nomes soltos.",
              "Um README que diz em três comandos como pôr o projeto a correr.",
              "As dependências de desenvolvimento separadas das de produção."
            ]]
          ],
          quiz: [
            { p: "Um colega diz que o projeto rebenta na máquina dele e funciona na tua. Primeira pergunta?", o: ["Que sistema operativo usa", "Se está no ambiente virtual do projeto e com as versões do ficheiro de requisitos instaladas", "Se reiniciou o computador"], c: 1,
              e: "Quase sempre é ambiente: versão de biblioteca diferente, ambiente não ativado, ou uma dependência que só tu tens instalada globalmente. É por isso que o ficheiro de requisitos existe." }
          ],
          exercicio: {
            enunciado: "Escreve `ler_requisitos(texto)` que lê o conteúdo de um requirements.txt e devolve um dicionário nome para versão. Ignora linhas vazias e comentários, e usa `None` como versão quando a linha não fixa nenhuma.",
            inicio: "def ler_requisitos(texto):\n    pass\n",
            testes: "_t = 'httpx==0.27.0\\n\\n# ferramentas\\npytest==8.2.0\\nruff\\n'\n_r = ler_requisitos(_t)\nverifica('lê nome e versão', _r.get('httpx') == '0.27.0')\nverifica('ignora comentários e linhas vazias', len(_r) == 3)\nverifica('sem versão fica None', _r.get('ruff') is None)\nverifica('ficheiro vazio', ler_requisitos('') == {})"
          }
        }
      ]
    },
    {
      n: 8, fase: 2, titulo: "Objetos",
      objetivo: "Perceber classes o suficiente para ler o código dos outros.",
      licoes: [
        {
          id: "8.1", titulo: "Classes, estado e métodos", min: 18, estado: "pronta",
          meta: "No fim: modelas uma coisa com estado e comportamento, e sabes quando não vale a pena.",
          blocos: [
            ["p", "Uma classe junta dados e as operações que fazem sentido sobre esses dados. Se tens três funções que recebem sempre os mesmos quatro argumentos, provavelmente tens uma classe escondida."],
            ["py", "class Conta:\n    def __init__(self, titular, saldo=0):\n        self.titular = titular\n        self.saldo = saldo\n\n    def depositar(self, valor):\n        if valor <= 0:\n            raise ValueError(\"depósito tem de ser positivo\")\n        self.saldo += valor\n        return self.saldo\n\n    def levantar(self, valor):\n        if valor > self.saldo:\n            raise ValueError(f\"saldo insuficiente: tem {self.saldo}\")\n        self.saldo -= valor\n        return self.saldo\n\nc = Conta(\"Ana\", 100)\nc.depositar(50)\nprint(c.titular, c.saldo)\nprint(c.levantar(30))"],
            ["p", "`__init__` corre quando crias o objeto e é onde se define o estado inicial. `self` é o próprio objeto e é sempre o primeiro parâmetro dos métodos. Não é opcional e não é magia: é o objeto passado explicitamente."],
            ["h", "Instância contra classe"],
            ["py", "class Conta:\n    banco = \"Caixa Central\"        # partilhado por todas as contas\n\n    def __init__(self, titular):\n        self.titular = titular      # próprio de cada conta\n\na = Conta(\"Ana\")\nb = Conta(\"Rui\")\nprint(a.banco, b.banco)\nConta.banco = \"Novo Banco\"\nprint(a.banco, b.banco)"],
            ["aviso", "Nunca uses uma lista ou um dicionário como atributo de classe para guardar estado de instância. É o mesmo objeto para todos os objetos criados, tal como o argumento por omissão do módulo 4. Inicializa em `__init__`."],
            ["h", "Mostrar-se em condições"],
            ["p", "Sem `__repr__`, imprimir um objeto dá algo como `<Conta object at 0x7f2c>`. Com ele, dá informação. Escreve sempre um: é a diferença entre depurar em cinco minutos ou em uma hora."],
            ["py", "class Conta:\n    def __init__(self, titular, saldo=0):\n        self.titular = titular\n        self.saldo = saldo\n\n    def __repr__(self):\n        return f\"Conta(titular={self.titular!r}, saldo={self.saldo})\"\n\nprint(Conta(\"Ana\", 100))\nprint([Conta(\"Ana\", 100), Conta(\"Rui\", 5)])"],
            ["h", "Propriedades"],
            ["p", "Em Python não se escrevem getters e setters à partida. Deixa o atributo público e, se um dia precisares de validar ou calcular, transforma-o em propriedade sem partir quem já usa o teu código."],
            ["py", "class Retangulo:\n    def __init__(self, largura, altura):\n        self.largura = largura\n        self.altura = altura\n\n    @property\n    def area(self):\n        return self.largura * self.altura\n\nr = Retangulo(3, 4)\nprint(r.area)"],
            ["obra", "Nem tudo precisa de ser classe. Uma função que transforma dados e não guarda estado deve continuar função. O sinal para criar uma classe é haver estado que sobrevive entre chamadas, ou várias implementações da mesma ideia. Em código de dados, dicionários e `dataclasses` cobrem 90 por cento dos casos."],
            ["aviso", "Um underscore à frente, `self._interno`, é a convenção para 'não mexas nisto de fora'. Não há privado a sério em Python, há acordo entre adultos. Dois underscores existem mas quase nunca são o que queres."]
          ],
          quiz: [
            { p: "Quando é que uma classe é melhor do que um par de funções?", o: ["Sempre, é mais profissional", "Quando há estado que persiste entre operações e comportamento que lhe pertence", "Quando o código passa das 50 linhas"], c: 1,
              e: "Classe sem estado é um módulo com passos a mais. Se todos os métodos recebem tudo por argumento e não tocam em `self`, eram funções." }
          ],
          exercicio: {
            enunciado: "Escreve a classe `Conta` com `titular` e `saldo` (por omissão zero), o método `depositar(valor)` que rejeita valores não positivos com `ValueError`, e `levantar(valor)` que levanta `ValueError` se não houver saldo. Ambos devolvem o saldo novo.",
            inicio: "class Conta:\n    def __init__(self, titular, saldo=0):\n        pass\n",
            testes: "_c = Conta('Ana', 100)\nverifica('estado inicial', _c.titular == 'Ana' and _c.saldo == 100)\nverifica('depósito devolve o saldo', _c.depositar(50) == 150)\nverifica('levantamento devolve o saldo', _c.levantar(20) == 130)\nverifica('saldo por omissão é zero', Conta('Rui').saldo == 0)\n_erros = 0\nfor _acao, _v in ((Conta('X', 10).depositar, -5), (Conta('X', 10).levantar, 999)):\n    try:\n        _acao(_v)\n    except ValueError:\n        _erros += 1\nverifica('valores inválidos levantam ValueError', _erros == 2)"
          }
        },
        {
          id: "8.2", titulo: "dataclasses", min: 12, estado: "pronta",
          meta: "No fim: modelas dados com quatro linhas em vez de trinta, com igualdade e repr de graça.",
          blocos: [
            ["p", "Grande parte das classes que vais escrever só guardam campos. Escrever `__init__`, `__repr__` e `__eq__` à mão para isso é trabalho repetido e é onde entram erros de distração. O decorador `@dataclass` gera tudo."],
            ["py", "from dataclasses import dataclass\n\n@dataclass\nclass Produto:\n    nome: str\n    preco: float\n    quantidade: int = 1\n\n    def total(self):\n        return round(self.preco * self.quantidade, 2)\n\np = Produto(\"teclado\", 39.9, 2)\nprint(p)\nprint(p.total())\nprint(Produto(\"rato\", 12.5) == Produto(\"rato\", 12.5))"],
            ["p", "Repara em três coisas: o `print` mostra os campos, a comparação por valor funciona, e a anotação de tipo deixou de ser opcional, é ela que declara o campo. O módulo 4 acabou de se pagar."],
            ["h", "Campos com valores por omissão"],
            ["aviso", "O mesmo problema do argumento mutável aparece aqui e o Python recusa-se a deixar. Uma lista como valor por omissão dá `ValueError: mutable default`. A solução é `field(default_factory=list)`."],
            ["py", "from dataclasses import dataclass, field\n\n@dataclass\nclass Encomenda:\n    cliente: str\n    itens: list[str] = field(default_factory=list)\n    notas: dict = field(default_factory=dict)\n\na = Encomenda(\"Ana\")\nb = Encomenda(\"Rui\")\na.itens.append(\"teclado\")\nprint(a)\nprint(b)"],
            ["h", "Imutável quando faz sentido"],
            ["p", "`frozen=True` cria objetos que não mudam depois de criados. Servem de chave de dicionário, são seguros para partilhar entre funções e evitam a categoria inteira de bugs em que alguém alterou o objeto a meio."],
            ["py", "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Coordenada:\n    latitude: float\n    longitude: float\n\nlisboa = Coordenada(38.72, -9.14)\nprint({lisboa: \"sede\"})\nlisboa.latitude = 0"],
            ["h", "Ferramentas úteis"],
            ["py", "from dataclasses import dataclass, asdict, replace\n\n@dataclass\nclass Produto:\n    nome: str\n    preco: float\n\np = Produto(\"cabo\", 4.0)\nprint(asdict(p))\nprint(replace(p, preco=5.0))\nprint(p)"],
            ["obra", "Em vez de passar dicionários entre camadas e rezar para que a chave 'quantidade' esteja lá escrita da mesma maneira, converte para `dataclass` à entrada. O editor passa a completar os campos e um erro de escrita fica um `AttributeError` imediato em vez de um `KeyError` três funções à frente."],
            ["p", "Quando os dados vêm de fora e precisam de validação a sério, o passo seguinte é o Pydantic, no módulo 16. As `dataclasses` não validam nada: `Produto(\"cabo\", \"muito caro\")` cria-se sem se queixar."]
          ],
          quiz: [
            { p: "Porque é que `itens: list = []` numa dataclass é recusado pelo Python?", o: ["Por causa dos tipos", "Porque a lista seria partilhada por todas as instâncias", "Porque listas não podem ser campos"], c: 1,
              e: "É o mesmo problema do argumento por omissão mutável. A diferença é que aqui a linguagem te obriga a corrigir, com `field(default_factory=list)`." }
          ],
          exercicio: {
            enunciado: "Cria a dataclass `Produto` com os campos `nome` (str), `preco` (float) e `quantidade` (int, por omissão 1), e o método `total()` que devolve o valor da linha arredondado a duas casas.",
            inicio: "from dataclasses import dataclass\n\n\n@dataclass\nclass Produto:\n    pass\n",
            testes: "import dataclasses as _dc\nverifica('é uma dataclass', _dc.is_dataclass(Produto))\n_p = Produto('teclado', 39.9, 2)\nverifica('total da linha', _p.total() == 79.8)\nverifica('quantidade por omissão é 1', Produto('rato', 12.5).quantidade == 1)\nverifica('igualdade por valor', Produto('rato', 12.5) == Produto('rato', 12.5))\nverifica('repr mostra os campos', 'teclado' in repr(_p))"
          }
        },
        {
          id: "8.3", titulo: "Composição contra herança", min: 14, estado: "pronta",
          meta: "No fim: sabes porque é que a árvore de herança profunda é um erro caro e o que fazer em vez disso.",
          blocos: [
            ["p", "Herança diz 'isto é um daqueles'. Composição diz 'isto tem um daqueles'. A segunda frase é verdadeira muito mais vezes do que a primeira, e é a que se desmonta sem partir tudo."],
            ["py", "class Notificador:\n    def __init__(self, canal):\n        self.canal = canal          # composição: tem um canal\n\n    def enviar(self, mensagem):\n        return self.canal.enviar(mensagem)\n\nclass CanalEmail:\n    def enviar(self, mensagem):\n        return f\"email: {mensagem}\"\n\nclass CanalSMS:\n    def enviar(self, mensagem):\n        return f\"sms: {mensagem}\"\n\nprint(Notificador(CanalEmail()).enviar(\"servidor em baixo\"))\nprint(Notificador(CanalSMS()).enviar(\"servidor em baixo\"))"],
            ["p", "O `Notificador` não sabe nem quer saber o que é o canal. Só precisa que tenha um método `enviar`. Isto chama-se duck typing e é o coração do desenho de código em Python: o que interessa é o comportamento, não a árvore genealógica."],
            ["h", "Onde a herança dá cabo de projetos"],
            ["lista", [
              "A classe base cresce para servir todas as filhas e passa a ter métodos que metade delas não deve usar.",
              "Mudar a base parte código de que nem te lembras, em ficheiros que nunca abriste.",
              "Uma filha herda comportamento que não faz sentido para ela e passa a ter de o desligar com exceções.",
              "Testar uma filha obriga a montar a base inteira."
            ]],
            ["h", "Quando a herança é a resposta certa"],
            ["p", "Quando é mesmo uma relação de tipo e a base é estável: exceções próprias, como no módulo 5, classes base de frameworks, e classes abstratas que definem um contrato. Uma camada, no máximo duas. A partir daí é dívida técnica."],
            ["py", "class ErroDePagamento(Exception):\n    pass\n\nclass CartaoRecusado(ErroDePagamento):\n    pass\n\ntry:\n    raise CartaoRecusado(\"fundos insuficientes\")\nexcept ErroDePagamento as e:\n    print(type(e).__name__, e)"],
            ["h", "Injetar em vez de construir"],
            ["p", "Repara que o `Notificador` recebe o canal já feito em vez de o criar lá dentro. Isso chama-se injeção de dependências e é o que torna o código testável: no teste passas um canal falso que guarda a mensagem numa lista, e testas sem enviar nada a ninguém."],
            ["py", "class CanalFalso:\n    def __init__(self):\n        self.enviadas = []\n\n    def enviar(self, mensagem):\n        self.enviadas.append(mensagem)\n        return \"ok\"\n\nclass Notificador:\n    def __init__(self, canal):\n        self.canal = canal\n\n    def enviar(self, mensagem):\n        return self.canal.enviar(mensagem)\n\nfalso = CanalFalso()\nNotificador(falso).enviar(\"teste\")\nprint(falso.enviadas)"],
            ["obra", "Numa entrevista, 'porque é que preferes composição a herança' é uma pergunta de rotina. A resposta que impressiona não é a definição: é dizer que composição permite trocar uma peça sem tocar nas outras, e que a herança acopla o teu código a decisões que outra pessoa tomou há dois anos."],
            ["aviso", "Herdar de `dict` ou de `list` para lhes acrescentar um método parece prático e traz surpresas: muitos métodos internos não passam pela tua versão. Se precisas de comportamento novo, compõe: guarda o dicionário num atributo."]
          ],
          quiz: [
            { p: "Precisas de testar uma classe que envia emails a sério. Qual é o desenho que te salva?", o: ["Herdar dela no teste e reescrever o método", "Receber o canal de envio como argumento e passar um falso no teste", "Usar uma variável global para desligar o envio"], c: 1,
              e: "Injeção de dependências. O teste passa um objeto que guarda a mensagem numa lista, corre em milissegundos e não depende de rede. É o módulo 14.2 inteiro." }
          ],
          exercicio: {
            enunciado: "Escreve a classe `Notificador` que recebe um `canal` no construtor e tem `enviar(mensagem)`, que delega no `canal.enviar(mensagem)` e devolve o que ele devolver. Antes de delegar, rejeita mensagens vazias com `ValueError`.",
            inicio: "class Notificador:\n    def __init__(self, canal):\n        pass\n",
            testes: "class _CanalFalso:\n    def __init__(self):\n        self.enviadas = []\n    def enviar(self, mensagem):\n        self.enviadas.append(mensagem)\n        return 'ok'\n_c = _CanalFalso()\n_n = Notificador(_c)\nverifica('devolve o resultado do canal', _n.enviar('servidor em baixo') == 'ok')\nverifica('o canal recebeu a mensagem', _c.enviadas == ['servidor em baixo'])\n_erro = False\ntry:\n    _n.enviar('')\nexcept ValueError:\n    _erro = True\nverifica('mensagem vazia é rejeitada', _erro)\nverifica('nada foi enviado na rejeição', len(_c.enviadas) == 1)"
          }
        }
      ]
    },
    {
      n: 9, fase: 2, titulo: "Iteradores e geradores",
      objetivo: "Processar mais dados do que a memória aguenta.",
      licoes: [
        { id: "9.1", titulo: "yield e avaliação preguiçosa", min: 16, estado: "esboco", meta: "Ler um ficheiro de 4 GB sem esgotar a memória." },
        { id: "9.2", titulo: "itertools útil", min: 12, estado: "esboco", meta: "groupby, chain, islice em casos reais." }
      ]
    },

    /* ---------------- FASE 3 ---------------- */
    {
      n: 10, fase: 3, titulo: "Testes",
      objetivo: "A competência que mais depressa distingue um júnior contratável.",
      licoes: [
        {
          id: "10.1", titulo: "pytest do zero", min: 20, estado: "pronta",
          meta: "No fim: escreves testes que provam que o teu código faz o que dizes.",
          blocos: [
            ["p", "Um teste é uma função que chama o teu código e verifica o resultado. Nada mais. O valor não está no teste em si, está em poderes mudar o código amanhã e saber em dois segundos se partiste alguma coisa."],
            ["p", "Instalação e execução, dentro do ambiente virtual do projeto:"],
            ["code", "pip install pytest\npytest -q"],
            ["h", "A estrutura mínima"],
            ["code", "# calculadora.py\ndef desconto(preco, percentagem):\n    if percentagem < 0 or percentagem > 100:\n        raise ValueError(\"percentagem tem de estar entre 0 e 100\")\n    return round(preco * (1 - percentagem / 100), 2)"],
            ["code", "# test_calculadora.py\nimport pytest\nfrom calculadora import desconto\n\ndef test_desconto_normal():\n    assert desconto(100, 20) == 80.0\n\ndef test_desconto_zero_nao_altera_preco():\n    assert desconto(49.9, 0) == 49.9\n\ndef test_percentagem_invalida_levanta_erro():\n    with pytest.raises(ValueError):\n        desconto(100, 150)"],
            ["p", "Três regras que a equipa vai esperar de ti: o ficheiro começa por `test_`, a função começa por `test_`, e o nome da função descreve o comportamento esperado em vez de dizer `test_1`."],
            ["h", "Um teste, vários casos"],
            ["code", "@pytest.mark.parametrize(\"preco, pct, esperado\", [\n    (100, 20, 80.0),\n    (100, 100, 0.0),\n    (33.33, 10, 30.0),\n])\ndef test_varios_descontos(preco, pct, esperado):\n    assert desconto(preco, pct) == esperado"],
            ["obra", "Numa candidatura, um repositório com testes a passar vale mais do que três projetos sem testes. É a prova mais barata de que trabalhaste em equipa antes de teres trabalhado em equipa."],
            ["p", "Ordem de escrita que recomendo enquanto aprendes: escreve o caso normal, o caso limite (zero, vazio, negativo) e o caso de erro. Três testes por função chegam para começar."],
            ["aviso", "Testar que `1 + 1 == 2` não testa nada. Um teste tem de poder falhar. Se nunca viste o teu teste a falhar, não sabes se ele funciona: parte o código de propósito uma vez e confirma que fica vermelho."]
          ],
          quiz: [
            { p: "O teu teste chama uma API real na internet. Qual é o problema?", o: ["Nenhum, testa a sério", "É lento e falha quando a rede ou a API falham, por razões que não são do teu código", "Só é problema se for paga"], c: 1,
              e: "Testes têm de ser rápidos e determinísticos. Chamadas externas substituem-se por dublês (mocks), tema do módulo 13." }
          ],
          exercicio: {
            enunciado: "Escreve a função `media(notas)` que devolve a média arredondada a uma casa decimal e levanta `ValueError` se a lista estiver vazia.",
            inicio: "def media(notas):\n    pass\n",
            testes: "verifica('média simples', media([10, 20]) == 15.0)\nverifica('arredonda a uma casa', media([1, 2, 2]) == 1.7)\n_erro = False\ntry:\n    media([])\nexcept ValueError:\n    _erro = True\nverifica('lista vazia levanta ValueError', _erro)"
          }
        },
        { id: "10.2", titulo: "Fixtures e organização da suite", min: 16, estado: "esboco", meta: "conftest, dados de teste, isolamento." },
        { id: "10.3", titulo: "Escrever o teste primeiro", min: 14, estado: "esboco", meta: "Ciclo vermelho, verde, limpar, num caso real." }
      ]
    },
    {
      n: 11, fase: 3, titulo: "Qualidade e ferramentas",
      objetivo: "Entregar código que passa em revisão à primeira.",
      licoes: [
        { id: "11.1", titulo: "ruff, formatação automática e mypy", min: 15, estado: "esboco", meta: "Configurar num projeto e perceber o que cada aviso quer dizer." },
        { id: "11.2", titulo: "pre-commit e integração contínua", min: 14, estado: "esboco", meta: "GitHub Actions a correr testes em cada push." }
      ]
    },
    {
      n: 12, fase: 3, titulo: "Git como se trabalha a sério",
      objetivo: "O requisito que aparece em 100 por cento das vagas.",
      licoes: [
        { id: "12.1", titulo: "Ramos, commits e histórico legível", min: 18, estado: "esboco", meta: "Mensagens de commit, rebase contra merge, resolver conflitos sem pânico." },
        { id: "12.2", titulo: "Pull requests e revisão de código", min: 16, estado: "esboco", meta: "Abrir, descrever, responder a comentários sem levar a peito." }
      ]
    },
    {
      n: 13, fase: 3, titulo: "Depuração e desempenho",
      objetivo: "Encontrar o problema em minutos em vez de horas.",
      licoes: [
        { id: "13.1", titulo: "Depurador em vez de prints", min: 14, estado: "esboco", meta: "breakpoint(), pontos de paragem, inspeção de estado." },
        { id: "13.2", titulo: "Medir antes de otimizar", min: 12, estado: "esboco", meta: "timeit, profiling, complexidade na prática." }
      ]
    },

    /* ---------------- FASE 4 ---------------- */
    {
      n: 14, fase: 4, titulo: "Consumir APIs",
      objetivo: "Ir buscar dados a outro sistema e não rebentar quando ele falha.",
      licoes: [
        {
          id: "14.1", titulo: "HTTP, httpx e o que fazer quando corre mal", min: 20, estado: "pronta",
          meta: "No fim: consomes uma API paginada com autenticação e tratamento de falhas.",
          blocos: [
            ["p", "Uma API é um servidor que responde a pedidos. Tu envias um método (`GET`, `POST`), um caminho e cabeçalhos. Ele responde com um código de estado e normalmente JSON. Todo o resto é detalhe."],
            ["p", "Os códigos que precisas de reconhecer sem pensar: 200 correu bem, 201 criado, 400 o teu pedido está mal formado, 401 não te autenticaste, 403 autenticaste-te mas não podes, 404 não existe, 429 excedeste o limite de pedidos, 500 o problema é do lado deles."],
            ["code", "import httpx\n\nresposta = httpx.get(\"https://api.exemplo.pt/v1/alunos\", timeout=10)\nresposta.raise_for_status()\ndados = resposta.json()\nprint(len(dados[\"resultados\"]))"],
            ["p", "Três coisas nesse bloco que separam código de trabalho de código de tutorial: o `timeout` (sem ele o teu programa pode ficar pendurado para sempre), o `raise_for_status()` (sem ele um 404 passa despercebido e rebenta 20 linhas à frente) e não haver segredos escritos no código."],
            ["h", "Autenticação e segredos"],
            ["code", "import os\nimport httpx\n\nchave = os.environ[\"API_KEY\"]  # rebenta já se faltar, e é isso que queremos\ncabecalhos = {\"Authorization\": f\"Bearer {chave}\"}\n\nwith httpx.Client(headers=cabecalhos, timeout=10) as cliente:\n    r = cliente.get(\"https://api.exemplo.pt/v1/alunos\")"],
            ["aviso", "Uma chave de API dentro de um commit é uma chave comprometida, mesmo que apagues no commit seguinte. Fica no histórico. Usa variáveis de ambiente e um `.env` que está no `.gitignore`. Recrutadores olham para isto."],
            ["h", "Paginação"],
            ["code", "def todos_os_alunos(cliente):\n    pagina = 1\n    while True:\n        r = cliente.get(\"/v1/alunos\", params={\"page\": pagina})\n        r.raise_for_status()\n        corpo = r.json()\n        if not corpo[\"resultados\"]:\n            return\n        yield from corpo[\"resultados\"]\n        pagina += 1"],
            ["p", "Repara no `yield`: quem chama esta função recebe alunos um a um e nunca tem a coleção inteira em memória. É o módulo 9 a pagar-se a si próprio."],
            ["obra", "Numa equipa vão pedir-te para tentar de novo quando a API devolve 429 ou 500, com espera crescente entre tentativas. Chama-se retry com backoff exponencial. Sabe o nome, mesmo antes de saber implementar."]
          ],
          quiz: [
            { p: "O teu script corre bem no teu portátil e falha no servidor com KeyError: 'API_KEY'. O que aconteceu?", o: ["O código está errado", "A variável de ambiente não está definida nesse servidor", "A API mudou"], c: 1,
              e: "Configuração não é código. A parte mais comum de um primeiro dia num emprego é descobrir onde é que a equipa guarda estas variáveis." }
          ],
          exercicio: {
            enunciado: "Escreve `nomes_ativos(utilizadores)` que recebe uma lista de dicionários como vem de uma API e devolve os nomes dos que têm `ativo` verdadeiro, ordenados alfabeticamente. Alguns registos não têm a chave `nome`: ignora-os.",
            inicio: "def nomes_ativos(utilizadores):\n    pass\n",
            testes: "_d = [{'nome':'Rui','ativo':True},{'nome':'Ana','ativo':False},{'ativo':True},{'nome':'Bea','ativo':True}]\nverifica('filtra e ordena', nomes_ativos(_d) == ['Bea','Rui'])\nverifica('lista vazia devolve lista vazia', nomes_ativos([]) == [])"
          }
        },
        { id: "14.2", titulo: "Dublês de teste para chamadas externas", min: 14, estado: "esboco", meta: "Testar código de rede sem rede." }
      ]
    },
    {
      n: 15, fase: 4, titulo: "Bases de dados",
      objetivo: "Guardar dados a sério, não em ficheiros JSON.",
      licoes: [
        { id: "15.1", titulo: "SQL que um programador precisa", min: 20, estado: "esboco", meta: "select, join, group by, índices." },
        { id: "15.2", titulo: "sqlite3 e SQLAlchemy", min: 18, estado: "esboco", meta: "Do driver ao ORM, e porque não se juntam strings para fazer queries." }
      ]
    },
    {
      n: 16, fase: 4, titulo: "Construir uma API com FastAPI",
      objetivo: "O projeto que vai ficar no topo do teu portefólio.",
      licoes: [
        { id: "16.1", titulo: "Primeiro endpoint e validação com Pydantic", min: 20, estado: "esboco", meta: "Rotas, modelos, documentação automática." },
        { id: "16.2", titulo: "CRUD completo com base de dados", min: 22, estado: "esboco", meta: "Camadas, dependências, tratamento de erros." },
        { id: "16.3", titulo: "Testar a API", min: 16, estado: "esboco", meta: "TestClient e base de dados de teste." }
      ]
    },
    {
      n: 17, fase: 4, titulo: "Concorrência",
      objetivo: "Fazer 200 pedidos em 3 segundos em vez de 3 minutos.",
      licoes: [
        { id: "17.1", titulo: "async e await sem misticismo", min: 18, estado: "esboco", meta: "Onde ajuda mesmo e onde não faz diferença nenhuma." }
      ]
    },
    {
      n: 18, fase: 4, titulo: "Pôr no ar",
      objetivo: "Software que só corre no teu portátil não conta.",
      licoes: [
        { id: "18.1", titulo: "Docker para quem escreve Python", min: 20, estado: "esboco", meta: "Dockerfile, imagem pequena, variáveis de ambiente." },
        { id: "18.2", titulo: "Publicar e monitorizar", min: 16, estado: "esboco", meta: "Deploy, registos, saúde do serviço." }
      ]
    },

    /* ---------------- FASE 5 ---------------- */
    {
      n: 19, fase: 5, titulo: "Projeto final",
      objetivo: "Uma peça de software completa que aguenta perguntas.",
      licoes: [
        { id: "19.1", titulo: "Escolher um projeto que não seja o de toda a gente", min: 14, estado: "esboco", meta: "Critérios: dados reais, um problema teu, âmbito fechado." },
        { id: "19.2", titulo: "README, licença e histórico de commits", min: 14, estado: "esboco", meta: "O repositório é o teu CV técnico." }
      ]
    },
    {
      n: 20, fase: 5, titulo: "Recrutamento",
      objetivo: "Passar da candidatura à proposta.",
      licoes: [
        { id: "20.1", titulo: "CV e perfil para vagas de Python", min: 14, estado: "esboco", meta: "O que ler numa vaga e o que responder a cada requisito." },
        { id: "20.2", titulo: "Código ao vivo e perguntas técnicas", min: 18, estado: "esboco", meta: "Pensar em voz alta, perguntar antes de escrever, gerir o silêncio." },
        { id: "20.3", titulo: "Os primeiros 90 dias", min: 12, estado: "esboco", meta: "Pedir ajuda bem, ler código alheio, primeiro pull request." }
      ]
    }
  ]
};
