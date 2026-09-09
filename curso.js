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
        {
          id: "9.1", titulo: "yield e avaliação preguiçosa", min: 16, estado: "pronta",
          meta: "No fim: processas um ficheiro maior do que a memória da máquina sem o carregar todo.",
          blocos: [
            ["p", "Uma função com `yield` não devolve um valor: devolve um gerador. O corpo só corre quando alguém pede o próximo elemento, e pára exatamente na linha do `yield` até lhe pedirem outro."],
            ["py", "def contar(ate):\n    print(\"comecei\")\n    for n in range(1, ate + 1):\n        print(\"vou produzir\", n)\n        yield n\n    print(\"acabei\")\n\ng = contar(3)\nprint(\"ainda não correu nada\")\nprint(next(g))\nprint(next(g))\nprint(list(g))"],
            ["p", "Repara na ordem das mensagens. O 'comecei' só apareceu no primeiro `next`. Um gerador é uma receita, não um tabuleiro de bolos."],
            ["h", "Porque é que isto importa"],
            ["p", "Uma lista com 40 milhões de linhas ocupa gigabytes. Um gerador ocupa uma linha de cada vez. É a diferença entre um script que corre num portátil e um script que morre com `MemoryError`."],
            ["code", "# carrega o ficheiro todo para memória\ndef linhas_ma(caminho):\n    with open(caminho, encoding=\"utf-8\") as f:\n        return f.readlines()\n\n# produz linha a linha\ndef linhas_boa(caminho):\n    with open(caminho, encoding=\"utf-8\") as f:\n        for linha in f:\n            yield linha.rstrip(\"\\n\")"],
            ["h", "Encadear geradores"],
            ["p", "Cada passo é um gerador e nenhum guarda nada. Os dados atravessam a cadeia um a um, como numa linha de montagem. Este padrão é o que se usa para processar ficheiros grandes e fluxos de eventos."],
            ["py", "def numeros():\n    for n in range(1, 11):\n        yield n\n\ndef so_pares(fonte):\n    for n in fonte:\n        if n % 2 == 0:\n            yield n\n\ndef ao_quadrado(fonte):\n    for n in fonte:\n        yield n * n\n\nprint(list(ao_quadrado(so_pares(numeros()))))\nprint(sum(ao_quadrado(so_pares(numeros()))))"],
            ["p", "`yield from` delega noutro iterável e evita um ciclo de repetição. Já o viste no módulo 14, na função que percorria as páginas de uma API."],
            ["py", "def tudo(*colecoes):\n    for c in colecoes:\n        yield from c\n\nprint(list(tudo([1, 2], (3, 4), \"ab\")))"],
            ["aviso", "Um gerador esgota-se: depois de o percorrer uma vez fica vazio, sem aviso nenhum. Se precisas de percorrer duas vezes, guarda numa lista com `list(...)` e assume o custo em memória, conscientemente."],
            ["py", "g = (n * n for n in range(4))\nprint(list(g))\nprint(list(g))"],
            ["obra", "Em código de dados vais ver funções que devolvem geradores como convenção. O sinal de aviso é quando alguém escreve `len(gerador)`, que rebenta, ou percorre o mesmo gerador em dois sítios e recebe zero resultados no segundo. Sabendo isto, poupas uma tarde."]
          ],
          quiz: [
            { p: "Um colega diz que o script dele rebenta com MemoryError a ler um CSV de 6 GB. Que mudança propões primeiro?", o: ["Comprar mais memória", "Ler linha a linha com um gerador em vez de carregar tudo", "Dividir o ficheiro à mão"], c: 1,
              e: "Streaming em vez de carregamento. Quase todo o processamento de ficheiros é sequencial e não precisa de ter tudo em memória ao mesmo tempo." }
          ],
          exercicio: {
            enunciado: "Escreve o gerador `linhas_validas(linhas)` que produz, uma a uma, as linhas sem espaços nas pontas, ignorando as vazias e as que começam por `#`. Tem de ser um gerador, não uma lista.",
            inicio: "def linhas_validas(linhas):\n    pass\n",
            testes: "import inspect as _i\nverifica('é uma função geradora', _i.isgeneratorfunction(linhas_validas))\n_e = ['  ola  ', '', '# comentario', 'mundo', '   ']\nverifica('limpa e filtra', list(linhas_validas(_e)) == ['ola', 'mundo'])\nverifica('entrada vazia', list(linhas_validas([])) == [])\nverifica('não consome tudo de uma vez', next(linhas_validas(_e)) == 'ola')"
          }
        },
        {
          id: "9.2", titulo: "itertools útil", min: 12, estado: "pronta",
          meta: "No fim: resolves agrupamentos e cortes com a biblioteca padrão em vez de ciclos à mão.",
          blocos: [
            ["p", "`itertools` é um conjunto de ferramentas que trabalham sobre iteráveis sem construir listas. Não precisas de as saber todas: quatro resolvem quase tudo o que vais encontrar."],
            ["h", "groupby: agrupar em sequência"],
            ["aviso", "`groupby` agrupa elementos consecutivos, não iguais em todo o lado. Se os dados não estiverem ordenados pela mesma chave, o resultado vem partido em pedaços e ninguém te avisa. Ordena primeiro, sempre."],
            ["py", "from itertools import groupby\n\nvendas = [\n    {\"loja\": \"Porto\", \"valor\": 80},\n    {\"loja\": \"Lisboa\", \"valor\": 120},\n    {\"loja\": \"Porto\", \"valor\": 20},\n]\n\nchave = lambda v: v[\"loja\"]\nfor loja, grupo in groupby(sorted(vendas, key=chave), key=chave):\n    itens = list(grupo)\n    print(loja, len(itens), sum(i[\"valor\"] for i in itens))"],
            ["p", "Repara no `list(grupo)`: o grupo também é um iterador preguiçoso e desaparece assim que avanças para o grupo seguinte. É a pegadela clássica desta função."],
            ["h", "chain: juntar sem copiar"],
            ["py", "from itertools import chain\n\nsemana1 = [10, 12]\nsemana2 = [8]\nsemana3 = [15, 3]\n\nprint(sum(chain(semana1, semana2, semana3)))\nprint(list(chain.from_iterable([semana1, semana2, semana3])))"],
            ["h", "islice: cortar um iterador"],
            ["p", "Não podes fatiar um gerador com `[:5]`. `islice` faz isso, e é a forma de espreitar as primeiras linhas de um ficheiro enorme sem o ler todo."],
            ["py", "from itertools import islice\n\ndef infinito():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\nprint(list(islice(infinito(), 5)))\nprint(list(islice(infinito(), 10, 15)))"],
            ["h", "count e cycle, com cuidado"],
            ["py", "from itertools import count, cycle, islice\n\nprint(list(islice(count(100, 10), 4)))\nprint(list(islice(cycle(\"ABC\"), 7)))"],
            ["p", "São infinitos. Sem `islice` ou um `break`, o teu programa nunca mais acaba. Usa-os para gerar identificadores ou distribuir trabalho de forma rotativa."],
            ["h", "Alternativas fora do itertools"],
            ["lista", [
              "`collections.Counter` para contar ocorrências.",
              "`collections.defaultdict(list)` para agrupar sem ordenar, que é o que eu escolho em código de todos os dias.",
              "`zip(*lista)` para transpor pares em duas listas.",
              "`enumerate` para posição e valor, do módulo 2."
            ]],
            ["py", "from collections import defaultdict\n\nvendas = [(\"Porto\", 80), (\"Lisboa\", 120), (\"Porto\", 20)]\n\npor_loja = defaultdict(list)\nfor loja, valor in vendas:\n    por_loja[loja].append(valor)\n\nprint(dict(por_loja))"],
            ["obra", "Em revisão de código, um ciclo de quinze linhas a agrupar dicionários vai receber o comentário 'isto é um defaultdict'. Não é pedantismo: menos código escrito à mão é menos código onde esconder um erro de contagem."]
          ],
          quiz: [
            { p: "`groupby` sobre uma lista de vendas devolve a mesma loja em três grupos separados. Porquê?", o: ["Bug do itertools", "A lista não estava ordenada pela chave de agrupamento", "Faltou converter para lista"], c: 1,
              e: "`groupby` só junta elementos consecutivos. Ou ordenas antes pela mesma chave, ou usas `defaultdict`, que não se importa com a ordem." }
          ],
          exercicio: {
            enunciado: "Escreve `agrupar(vendas)` que recebe uma lista de dicionários com `loja` e `valor` e devolve um dicionário de loja para lista de valores, pela ordem em que aparecem.",
            inicio: "from collections import defaultdict\n\n\ndef agrupar(vendas):\n    pass\n",
            testes: "_v = [{'loja':'Porto','valor':80},{'loja':'Lisboa','valor':120},{'loja':'Porto','valor':20}]\n_r = agrupar(_v)\nverifica('agrupa por loja', _r['Porto'] == [80, 20])\nverifica('mantém as outras lojas', _r['Lisboa'] == [120])\nverifica('duas lojas', len(_r) == 2)\nverifica('lista vazia devolve vazio', dict(agrupar([])) == {})"
          }
        }
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
        {
          id: "10.2", titulo: "Fixtures e organização da suite", min: 16, estado: "pronta",
          meta: "No fim: preparas dados de teste sem os repetir e mantens cada teste isolado dos outros.",
          blocos: [
            ["p", "Uma fixture é código que prepara o que o teste precisa: um objeto, uma base de dados temporária, um ficheiro. O pytest chama-a por ti quando o nome aparece como argumento do teste."],
            ["code", "import pytest\nfrom loja import Carrinho\n\n@pytest.fixture\ndef carrinho():\n    c = Carrinho()\n    c.adicionar(\"teclado\", 39.9)\n    return c\n\ndef test_total_com_um_item(carrinho):\n    assert carrinho.total() == 39.9\n\ndef test_adicionar_soma(carrinho):\n    carrinho.adicionar(\"rato\", 12.5)\n    assert carrinho.total() == 52.4"],
            ["p", "Os dois testes recebem carrinhos diferentes. A fixture corre uma vez por teste, e é isso que garante que o segundo teste não vê o que o primeiro fez. Isolamento é a propriedade que faz uma suite valer alguma coisa."],
            ["h", "conftest.py"],
            ["p", "Fixtures usadas por vários ficheiros vivem num `conftest.py` na pasta de testes. Não precisas de importar nada: o pytest encontra-as sozinho, incluindo nas subpastas."],
            ["code", "testes/\n  conftest.py          # fixtures partilhadas\n  test_carrinho.py\n  test_relatorio.py\n  dados/\n    vendas_exemplo.csv"],
            ["h", "Preparar e limpar"],
            ["p", "Com `yield`, o que está antes corre para preparar e o que está depois corre para limpar, mesmo que o teste rebente. É o gerador do módulo 9 a servir de gestor de contexto."],
            ["code", "@pytest.fixture\ndef ficheiro_temporario(tmp_path):\n    caminho = tmp_path / \"vendas.csv\"\n    caminho.write_text(\"produto,valor\\nteclado,39.9\\n\", encoding=\"utf-8\")\n    yield caminho\n    # aqui limpava-se, se o tmp_path não o fizesse por nós"],
            ["p", "`tmp_path` é uma fixture que já vem no pytest: dá-te uma pasta temporária nova por teste e apaga-a no fim. Nunca escrevas ficheiros de teste na pasta do projeto."],
            ["h", "Âmbito"],
            ["lista", [
              "`scope=\"function\"`, o valor por omissão: uma instância nova por teste. É o que queres em 90 por cento dos casos.",
              "`scope=\"module\"` ou `scope=\"session\"`: partilhada, para coisas caras como arrancar um servidor.",
              "Partilhar estado alterável entre testes é como se cria uma suite que passa sozinha e falha em conjunto, ou pior, que só passa numa certa ordem."
            ]],
            ["obra", "Um sinal de suite doente: os testes passam quando corres o ficheiro sozinho e falham quando corres a suite toda. É quase sempre estado partilhado, uma base de dados que não é limpa, ou uma variável de módulo. Corre com `pytest -p no:randomly` desligado e vais ver."],
            ["h", "Construtores de dados"],
            ["p", "Mesmo sem pytest, o padrão mais útil é uma função que cria dados de teste com valores por omissão sensatos e deixa alterar só o que interessa ao teste. Torna cada teste legível: vê-se logo o que é relevante."],
            ["py", "def criar_utilizador(**alteracoes):\n    base = {\"nome\": \"Ana\", \"email\": \"ana@exemplo.pt\", \"ativo\": True}\n    base.update(alteracoes)\n    return base\n\nprint(criar_utilizador())\nprint(criar_utilizador(ativo=False))"],
            ["aviso", "Fixtures que fazem cinco coisas escondem o que o teste precisa. Se ao ler um teste não percebes de onde vem o estado, a fixture está a ser esperta a mais. Explícito ganha a poupado."]
          ],
          quiz: [
            { p: "A tua suite passa a correr o ficheiro sozinho e falha ao correr tudo. Causa mais provável?", o: ["Falta de fixtures", "Estado partilhado entre testes, como um ficheiro ou uma variável de módulo", "Testes a mais"], c: 1,
              e: "Testes têm de ser independentes e poder correr em qualquer ordem. Cada um prepara o seu estado e limpa o que sujou." }
          ],
          exercicio: {
            enunciado: "Escreve `criar_utilizador(**alteracoes)`, um construtor de dados de teste. Devolve um dicionário com nome 'Ana', email 'ana@exemplo.pt' e ativo `True`, com os campos passados substituídos. Cada chamada devolve um dicionário novo.",
            inicio: "def criar_utilizador(**alteracoes):\n    pass\n",
            testes: "_u = criar_utilizador()\nverifica('valores por omissão', _u == {'nome': 'Ana', 'email': 'ana@exemplo.pt', 'ativo': True})\nverifica('substitui um campo', criar_utilizador(ativo=False)['ativo'] is False)\nverifica('aceita campos novos', criar_utilizador(idade=30)['idade'] == 30)\n_u['nome'] = 'alterado'\nverifica('cada chamada devolve um dicionário novo', criar_utilizador()['nome'] == 'Ana')"
          }
        },
        {
          id: "10.3", titulo: "Escrever o teste primeiro", min: 14, estado: "pronta",
          meta: "No fim: usas o ciclo vermelho, verde, limpar num problema real e percebes o que ele te dá.",
          blocos: [
            ["p", "Escrever o teste antes do código parece ao contrário e não é. O teste é a primeira utilização da função que vais escrever, e obriga-te a decidir a assinatura e o comportamento antes de te enterrares na implementação."],
            ["h", "O ciclo"],
            ["lista", [
              "Vermelho: escreve um teste do comportamento que falta. Corre-o e vê-o falhar, com a mensagem certa.",
              "Verde: escreve o mínimo de código que o faz passar. Feio é aceitável nesta fase.",
              "Limpar: arruma o código com os testes a passar a servir de rede."
            ]],
            ["p", "O passo que toda a gente salta é ver o teste falhar. Um teste que nunca falhou pode estar a testar coisa nenhuma: um `assert` com um nome mal escrito, uma função que não está a ser chamada."],
            ["h", "Um caso a sério"],
            ["p", "Requisito: uma password é válida se tiver pelo menos oito caracteres, um algarismo e uma maiúscula. Devolve a lista de problemas, vazia quando está tudo bem. Primeiro os testes:"],
            ["code", "def test_password_valida_nao_tem_problemas():\n    assert validar(\"Segura123\") == []\n\ndef test_password_curta():\n    assert \"curta\" in validar(\"Ab1\")\n\ndef test_password_sem_algarismo():\n    assert \"sem algarismo\" in validar(\"Segurissima\")\n\ndef test_acumula_varios_problemas():\n    assert len(validar(\"abc\")) == 3"],
            ["p", "Repara no que os testes já decidiram: o nome da função, que devolve uma lista, que os problemas são strings curtas, e que se acumulam. Isso é desenho, e aconteceu antes de escrever uma linha de implementação."],
            ["py", "def validar(password):\n    problemas = []\n    if len(password) < 8:\n        problemas.append(\"curta\")\n    if not any(c.isdigit() for c in password):\n        problemas.append(\"sem algarismo\")\n    if not any(c.isupper() for c in password):\n        problemas.append(\"sem maiuscula\")\n    return problemas\n\nprint(validar(\"Segura123\"))\nprint(validar(\"abc\"))"],
            ["h", "Onde compensa mesmo"],
            ["lista", [
              "Regras de negócio com muitos casos limite, como esta.",
              "Correção de bugs: escreve primeiro o teste que reproduz o bug relatado. Se não o consegues escrever, ainda não percebeste o bug.",
              "Refatorações: os testes existentes dizem-te se partiste alguma coisa.",
              "Onde não compensa: exploração, protótipos, código de interface que vais deitar fora amanhã."
            ]],
            ["obra", "Numa entrevista técnica com código, começar pelos casos de teste em voz alta vale mais do que a solução ótima. Mostra que pensas em casos limite antes de escrever, que é literalmente o trabalho. Diz: 'antes de implementar, os casos que me interessam são vazio, um elemento e valores repetidos'."],
            ["aviso", "Testar a implementação em vez do comportamento é a armadilha. Um teste que verifica que uma função interna foi chamada parte-se na primeira refatoração, mesmo com o resultado certo. Testa o que entra e o que sai."]
          ],
          quiz: [
            { p: "Chega-te um relatório de bug de produção. Qual é o primeiro passo?", o: ["Corrigir depressa e publicar", "Escrever um teste que falha por causa do bug", "Pedir mais informação ao utilizador"], c: 1,
              e: "O teste prova que reproduziste o problema e fica a impedir que ele volte. Correções sem teste voltam, e voltam com o mesmo número de bilhete." }
          ],
          exercicio: {
            enunciado: "Implementa `validar(password)` para passar nos testes já escritos: devolve uma lista de problemas com 'curta' (menos de 8 caracteres), 'sem algarismo' e 'sem maiuscula', por esta ordem. Password válida devolve lista vazia.",
            inicio: "def validar(password):\n    pass\n",
            testes: "verifica('password válida', validar('Segura123') == [])\nverifica('password curta', validar('Ab1') == ['curta'])\nverifica('sem algarismo', validar('Segurissima') == ['sem algarismo'])\nverifica('acumula os três problemas', validar('abc') == ['curta', 'sem algarismo', 'sem maiuscula'])\nverifica('password vazia', len(validar('')) == 3)"
          }
        }
      ]
    },
    {
      n: 11, fase: 3, titulo: "Qualidade e ferramentas",
      objetivo: "Entregar código que passa em revisão à primeira.",
      licoes: [
        {
          id: "11.1", titulo: "ruff, formatação automática e mypy", min: 15, estado: "pronta",
          meta: "No fim: configuras as três ferramentas num projeto e percebes o que cada aviso quer dizer.",
          blocos: [
            ["p", "Três ferramentas, três trabalhos diferentes. O formatador arruma o código. O linter aponta problemas. O verificador de tipos prova que as peças encaixam. Nenhuma delas substitui testes, e as três juntas apanham antes da revisão o que faria perder tempo a um humano."],
            ["h", "ruff: linter e formatador"],
            ["code", "pip install ruff\n\nruff format .        # arruma indentação, aspas, linhas\nruff check .         # aponta problemas\nruff check --fix .   # corrige o que é seguro corrigir"],
            ["p", "O `ruff` substituiu num só programa o que antes eram quatro: black, isort, flake8 e pyupgrade. É escrito em Rust e corre um projeto inteiro em menos de um segundo, o que faz toda a diferença: uma ferramenta lenta acaba desligada."],
            ["code", "# pyproject.toml\n[tool.ruff]\nline-length = 88\ntarget-version = \"py312\"\n\n[tool.ruff.lint]\nselect = [\"E\", \"F\", \"I\", \"UP\", \"B\"]\n# E: estilo, F: erros reais, I: ordem dos imports,\n# UP: sintaxe moderna, B: armadilhas conhecidas"],
            ["h", "O que os avisos querem dizer"],
            ["lista", [
              "`F401 imported but unused`: import a mais. Apaga, não comentes.",
              "`F841 local variable assigned but never used`: ou te esqueceste de a usar, ou há aqui um bug.",
              "`E501 line too long`: parte a linha. Quase sempre é uma expressão que devia ter nome.",
              "`B006 mutable default argument`: o bug do módulo 4, apanhado automaticamente.",
              "`B008 function call in default argument`: chamada avaliada uma vez, na definição."
            ]],
            ["h", "Formatar não é opinião"],
            ["p", "Discussões sobre aspas simples ou duplas custam dinheiro e não produzem nada. O formatador decide, corre no gravar do editor, e a equipa passa a discutir o que interessa. Além disso, os diffs no git ficam limpos: só muda o que mudaste mesmo."],
            ["h", "mypy: os tipos verificados"],
            ["code", "pip install mypy\nmypy vendas/"],
            ["code", "def desconto(preco: float, pct: float) -> float:\n    return preco * (1 - pct / 100)\n\ndesconto(\"100\", 20)\n# error: Argument 1 has incompatible type \"str\"; expected \"float\""],
            ["p", "Aquele erro apareceu sem correr o programa. Num projeto grande, o mypy apanha centenas de casos destes, sobretudo `None` onde ninguém esperava `None`. Começa por o correr só nos módulos novos: `strict` desde o dia um num projeto antigo é desmoralizante."],
            ["obra", "Numa candidatura, um repositório com `pyproject.toml` configurado, `ruff` limpo e testes a passar diz mais sobre ti do que qualquer linha do CV. Diz que já trabalhaste em equipa, mesmo que ainda não tenhas trabalhado."],
            ["aviso", "`# noqa` desliga um aviso naquela linha e serve para casos justificados, com comentário a explicar. Ficheiros cheios de `noqa` são a prova de que a configuração está errada, e é a configuração que se corrige."]
          ],
          quiz: [
            { p: "O linter aponta `F841: local variable 'resultado' is assigned to but never used`. O que investigas?", o: ["Nada, é só estilo", "Se te esqueceste de devolver ou usar esse resultado, o que costuma ser um bug", "Renomear a variável"], c: 1,
              e: "Este aviso apanha lógica esquecida a meio: cálculos cujo resultado se perde. É dos poucos avisos de estilo que denunciam bugs a sério." }
          ],
          exercicio: {
            enunciado: "Escreve `verificar_estilo(linhas)`, um mini-linter. Devolve uma lista de tuplos `(numero_da_linha, problema)` com 'linha demasiado longa' para linhas com mais de 88 caracteres e 'espaços no fim' para linhas que acabam em espaço. As linhas contam a partir de 1 e uma linha pode ter os dois problemas, por esta ordem.",
            inicio: "def verificar_estilo(linhas):\n    pass\n",
            testes: "_l = ['ok', 'x' * 89, 'com espaco  ', 'y' * 89 + ' ']\n_r = verificar_estilo(_l)\nverifica('linha longa apanhada', (2, 'linha demasiado longa') in _r)\nverifica('espaços no fim apanhados', (3, 'espaços no fim') in _r)\nverifica('linha limpa não aparece', all(n != 1 for n, _ in _r))\nverifica('dois problemas na mesma linha', _r[-2:] == [(4, 'linha demasiado longa'), (4, 'espaços no fim')])\nverifica('ficheiro limpo devolve vazio', verificar_estilo(['a', 'b']) == [])"
          }
        },
        {
          id: "11.2", titulo: "pre-commit e integração contínua", min: 14, estado: "pronta",
          meta: "No fim: pões as verificações a correr sozinhas antes do commit e em cada push.",
          blocos: [
            ["p", "Uma verificação que depende de alguém se lembrar de a correr não é uma verificação. Há dois sítios onde isto se automatiza: no teu computador, antes do commit, e no servidor, a cada push."],
            ["h", "pre-commit, no teu computador"],
            ["code", "pip install pre-commit\npre-commit install     # instala o gancho no .git\npre-commit run --all-files"],
            ["code", "# .pre-commit-config.yaml\nrepos:\n  - repo: https://github.com/astral-sh/ruff-pre-commit\n    rev: v0.5.0\n    hooks:\n      - id: ruff\n        args: [--fix]\n      - id: ruff-format\n  - repo: https://github.com/pre-commit/pre-commit-hooks\n    rev: v4.6.0\n    hooks:\n      - id: trailing-whitespace\n      - id: end-of-file-fixer\n      - id: check-yaml\n      - id: check-added-large-files"],
            ["p", "A partir daqui, o commit é recusado se o formatador tiver mudado alguma coisa. Corres outra vez e o commit passa. Parece chato durante dois dias e depois deixas de pensar nisso."],
            ["aviso", "Não ponhas a suite de testes inteira no pre-commit. Um gancho que demora um minuto faz com que a equipa comece a usar `--no-verify`, e aí perdeste tudo. Ganchos rápidos localmente, testes completos no servidor."],
            ["h", "Integração contínua: o servidor não se esquece"],
            ["code", "# .github/workflows/ci.yml\nname: CI\non: [push, pull_request]\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: \"3.12\"\n      - run: pip install -r requirements.txt\n      - run: ruff check .\n      - run: ruff format --check .\n      - run: mypy vendas/\n      - run: pytest -q"],
            ["p", "Isto corre numa máquina limpa, o que apanha a categoria de erros mais irritante de todas: 'na minha máquina funciona'. Se o teu projeto tem uma dependência que só tu tens instalada, é aqui que ela aparece."],
            ["h", "A ordem importa"],
            ["p", "Põe primeiro o que é rápido e falha mais: linter, depois formatação, depois tipos, e os testes no fim. Assim quem abriu o pull request tem a resposta em vinte segundos em vez de cinco minutos."],
            ["obra", "Um repositório de portefólio com um `ci.yml` e o crachá verde no README responde sozinho à pergunta 'este candidato já trabalhou com práticas de equipa'. Custa quinze minutos a montar e é o melhor retorno de tempo do curso inteiro."],
            ["h", "Quando a CI fica vermelha"],
            ["lista", [
              "Lê o registo de baixo para cima até à primeira falha real, tal como um traceback.",
              "Reproduz localmente o comando exato que falhou, sem inventar variações.",
              "Se falha na CI e passa localmente, suspeita de versões, variáveis de ambiente e ordem dos testes.",
              "Nunca desligues o teste para ficar verde. Corrige ou marca como falha conhecida com bilhete aberto."
            ]],
            ["aviso", "Segredos não vão para o ficheiro de configuração da CI. Vão para os segredos do repositório e chegam como variáveis de ambiente. Um token num ficheiro YAML é público a partir do momento em que o commit existe."]
          ],
          quiz: [
            { p: "A CI falha e localmente passa tudo. Que hipótese testas primeiro?", o: ["A CI está avariada", "Diferença de ambiente: versão de Python, dependências ou variáveis em falta", "O código está errado na mesma"], c: 1,
              e: "A máquina da CI arranca limpa. Costuma faltar uma dependência que só tens instalada globalmente, ou uma variável de ambiente que só existe no teu ficheiro `.env`." }
          ],
          exercicio: {
            enunciado: "Escreve `resumo_pipeline(passos)` que recebe uma lista de tuplos `(nome, passou)` pela ordem de execução. Devolve 'verde' se passaram todos, e 'vermelho: nome' com o nome do primeiro passo que falhou caso contrário. Lista vazia devolve 'sem passos'.",
            inicio: "def resumo_pipeline(passos):\n    pass\n",
            testes: "verifica('tudo a passar', resumo_pipeline([('ruff', True), ('pytest', True)]) == 'verde')\nverifica('primeiro a falhar', resumo_pipeline([('ruff', True), ('mypy', False), ('pytest', False)]) == 'vermelho: mypy')\nverifica('falha logo no início', resumo_pipeline([('ruff', False)]) == 'vermelho: ruff')\nverifica('sem passos', resumo_pipeline([]) == 'sem passos')"
          }
        }
      ]
    },
    {
      n: 12, fase: 3, titulo: "Git como se trabalha a sério",
      objetivo: "O requisito que aparece em 100 por cento das vagas.",
      licoes: [
        {
          id: "12.1", titulo: "Ramos, commits e histórico legível", min: 18, estado: "pronta",
          meta: "No fim: trabalhas em ramos, escreves mensagens que servem daqui a um ano e resolves conflitos sem pânico.",
          blocos: [
            ["p", "Git guarda fotografias do projeto. Um commit é uma fotografia com uma mensagem e um pai. Um ramo é um autocolante que aponta para um commit e anda para a frente quando fazes commits novos. Percebido isto, o resto é vocabulário."],
            ["h", "O ciclo diário"],
            ["code", "git switch -c feat/importador-csv    # ramo novo a partir do atual\n\n# ... escreves código ...\n\ngit status                          # o que mudou\ngit diff                            # o que mudou, linha a linha\ngit add importador.py testes/test_importador.py\ngit commit -m \"Ler CSV de vendas e ignorar linhas sem valor\"\ngit push -u origin feat/importador-csv"],
            ["p", "Nunca trabalhes diretamente no ramo principal. Um ramo por tarefa, com nome que diz o que faz: `feat/`, `fix/`, `chore/` são os prefixos que vais encontrar em quase todo o lado."],
            ["h", "Uma boa mensagem de commit"],
            ["lista", [
              "Primeira linha até 72 caracteres, no imperativo, a dizer o que o commit faz: 'Corrigir cálculo do IVA em vendas isentas'.",
              "Sem ponto final e sem 'atualizações' ou 'alterações várias', que não dizem nada.",
              "Se for preciso, linha em branco e um parágrafo a explicar porquê. O 'o quê' está no diff; o 'porquê' só está aqui.",
              "Um commit, uma ideia. Se a mensagem precisa de um 'e', são dois commits."
            ]],
            ["code", "# mau\ngit commit -m \"fix\"\ngit commit -m \"alteracoes\"\ngit commit -m \"agora vai\"\n\n# bom\ngit commit -m \"Corrigir IVA em vendas isentas\"\ngit commit -m \"Acrescentar teste para CSV sem cabeçalho\""],
            ["obra", "Quem te vai entrevistar abre o teu repositório e olha para o histórico. Vinte commits com 'update' são um sinal de alarme; trinta commits pequenos e descritivos ao longo de semanas dizem que trabalhas com método. É a única parte do teu portefólio que não se consegue fingir à pressa."],
            ["h", "Atualizar o ramo: merge ou rebase"],
            ["code", "git switch main\ngit pull\ngit switch feat/importador-csv\n\ngit merge main       # cria um commit de junção, histórico fiel\ngit rebase main      # reescreve os teus commits por cima, histórico linear"],
            ["aviso", "Nunca faças rebase de um ramo que outra pessoa já tem. Reescrever commits publicados obriga toda a gente a arranjar o repositório local. Rebase no teu ramo pessoal antes do pull request: à vontade. Em ramos partilhados: merge."],
            ["h", "Conflitos"],
            ["p", "Um conflito é o git a dizer que duas pessoas mexeram nas mesmas linhas e que a decisão é humana. Não é um erro nem uma catástrofe."],
            ["code", "<<<<<<< HEAD\ntaxa = 0.23\n=======\ntaxa = IVA_NORMAL\n>>>>>>> main"],
            ["p", "Escolhes o que fica, apagas os marcadores todos, corres os testes, `git add` e `git commit`. Se te enterrares, `git merge --abort` põe tudo como estava. Nada se perde enquanto não fizeres commit."],
            ["h", "Desfazer sem partir nada"],
            ["lista", [
              "`git restore ficheiro.py`: deitar fora alterações não gravadas.",
              "`git commit --amend`: corrigir o último commit, se ainda não foi enviado.",
              "`git revert <commit>`: criar um commit que anula outro. É o que se usa em ramos partilhados.",
              "`git reset --hard`: apaga trabalho. Só quando tens a certeza, e não em ramos partilhados.",
              "`git reflog`: o histórico de tudo o que fizeste, incluindo o que julgas ter perdido."
            ]]
          ],
          quiz: [
            { p: "Enviaste um commit com um bug para o ramo principal, que outras pessoas já usam. O que fazes?", o: ["`git reset --hard` e força o push", "`git revert` do commit, criando um commit que o anula", "Apagas o ramo e crias outro"], c: 1,
              e: "Reescrever histórico partilhado obriga toda a equipa a reparar o repositório. `revert` é honesto: fica registado o que aconteceu e o que se desfez." }
          ],
          exercicio: {
            enunciado: "Escreve `validar_mensagem(msg)` que verifica a primeira linha de um commit. Devolve a lista de problemas, por esta ordem: 'vazia', 'longa' (mais de 72 caracteres), 'ponto final' e 'minuscula' (não começa por maiúscula). Mensagem correta devolve lista vazia.",
            inicio: "def validar_mensagem(msg):\n    pass\n",
            testes: "verifica('mensagem correta', validar_mensagem('Corrigir IVA em vendas isentas') == [])\nverifica('mensagem vazia', validar_mensagem('') == ['vazia'])\nverifica('ponto final', validar_mensagem('Corrigir o IVA.') == ['ponto final'])\nverifica('minúscula inicial', validar_mensagem('corrigir o IVA') == ['minuscula'])\nverifica('longa e com ponto', validar_mensagem('C' + 'x' * 80 + '.') == ['longa', 'ponto final'])"
          }
        },
        {
          id: "12.2", titulo: "Pull requests e revisão de código", min: 16, estado: "pronta",
          meta: "No fim: abres um pull request que se revê em dez minutos e respondes a comentários como profissional.",
          blocos: [
            ["p", "Um pull request é um pedido para juntar o teu ramo ao principal, com discussão à volta. É também o sítio onde, num primeiro emprego, a tua reputação técnica se constrói ou se estraga."],
            ["h", "O que faz um bom pull request"],
            ["lista", [
              "Pequeno. Duzentas linhas revêem-se bem; mil linhas recebem um 'parece-me bem' que não leu nada.",
              "Uma intenção só. Correção de bug e refatoração juntas obrigam o revisor a separar o que é o quê.",
              "Título que diz o efeito, não o mecanismo: 'Corrigir IVA em vendas isentas', não 'mudar função calcular'.",
              "Descrição com o problema, a solução e como se testa. Três frases chegam.",
              "Testes incluídos e CI verde antes de pedires revisão."
            ]],
            ["code", "## Problema\nVendas isentas estavam a somar 23 por cento de IVA no relatório mensal.\n\n## Solução\nA taxa passa a vir do produto em vez de ser constante. Acrescentado\no campo `isento` ao modelo.\n\n## Como testar\n`pytest testes/test_relatorio.py -q`, e o caso novo\n`test_venda_isenta_nao_soma_iva`."],
            ["h", "Rever o código de outra pessoa"],
            ["p", "Vão pedir-te para rever, mesmo sendo júnior, e é das melhores formas de aprender a base de código. Procura, por esta ordem: está correto, está testado, percebe-se daqui a um ano."],
            ["lista", [
              "Distingue o que bloqueia do que é preferência. Marca as preferências como tal: 'nit: ' à frente.",
              "Pergunta em vez de acusar: 'o que acontece se a lista vier vazia?' vale mais do que 'isto está mal'.",
              "Elogia o que está bom. Uma revisão só com críticas ensina a esconder trabalho.",
              "Se são cinco comentários sobre a mesma coisa, escreve um só e sugere falarem."
            ]],
            ["h", "Receber comentários"],
            ["p", "Isto é competência profissional, não personalidade. O código não és tu. Um comentário que aponta um erro é trabalho gratuito que alguém fez por ti."],
            ["lista", [
              "Responde a todos os comentários, nem que seja 'feito' ou 'boa apanha'.",
              "Quando discordas, explica com um argumento técnico e propõe alternativa. Discordar é legítimo, ignorar não.",
              "Se o comentário revela que não percebeste o problema, diz isso. Ninguém espera que um júnior saiba tudo; esperam que pergunte.",
              "Não faças force push a meio de uma revisão: os comentários perdem a linha a que se referiam."
            ]],
            ["obra", "O erro mais comum de um júnior não é escrever código mau, é abrir um pull request de dois mil linhas depois de duas semanas sem falar com ninguém. Abre cedo, mesmo incompleto, marcado como rascunho. Feedback à segunda hora custa muito menos do que à segunda semana."],
            ["aviso", "Antes de pedires revisão, lê o teu próprio diff de cima a baixo no browser. Vais encontrar prints esquecidos, ficheiros a mais, código comentado e um `TODO` que já não se aplica. Cinco minutos que poupam o tempo de outra pessoa."]
          ],
          quiz: [
            { p: "Um revisor diz que a tua abordagem tem um problema que tu não vês. Qual é a melhor resposta?", o: ["Mudar logo, para não criar atrito", "Perguntar que caso concreto o preocupa e discutir com um exemplo", "Explicar porque é que a tua está certa"], c: 1,
              e: "Um caso concreto resolve a discussão em dois minutos, num sentido ou no outro. Ceder sem perceber deixa-te sem aprender; insistir sem ouvir gasta o crédito que tens com a equipa." }
          ],
          exercicio: {
            enunciado: "Escreve `problemas_do_pr(pr)` que recebe um dicionário com `titulo`, `descricao`, `linhas` e `testes` e devolve a lista de razões para não pedir revisão ainda: 'sem titulo', 'sem descricao', 'demasiado grande' (mais de 400 linhas) e 'sem testes', por esta ordem.",
            inicio: "def problemas_do_pr(pr):\n    pass\n",
            testes: "_bom = {'titulo': 'Corrigir IVA', 'descricao': 'Vendas isentas somavam IVA.', 'linhas': 120, 'testes': True}\nverifica('pr pronto', problemas_do_pr(_bom) == [])\nverifica('sem título', problemas_do_pr({**_bom, 'titulo': ''}) == ['sem titulo'])\nverifica('grande e sem testes', problemas_do_pr({**_bom, 'linhas': 900, 'testes': False}) == ['demasiado grande', 'sem testes'])\nverifica('tudo em falta', len(problemas_do_pr({'titulo': '', 'descricao': '', 'linhas': 5000, 'testes': False})) == 4)"
          }
        }
      ]
    },
    {
      n: 13, fase: 3, titulo: "Depuração e desempenho",
      objetivo: "Encontrar o problema em minutos em vez de horas.",
      licoes: [
        {
          id: "13.1", titulo: "Depurador em vez de prints", min: 14, estado: "pronta",
          meta: "No fim: paras o programa a meio e inspecionas o estado em vez de adivinhar com prints.",
          blocos: [
            ["p", "O `print` é uma ferramenta legítima e é a primeira que usas. O problema é o ciclo: acrescentar print, correr, ler, apagar, acrescentar outro print. Com um depurador, paras uma vez e vês tudo o que quiseres, incluindo o que não te tinhas lembrado de imprimir."],
            ["h", "breakpoint()"],
            ["p", "Escreve `breakpoint()` na linha onde queres parar e corre o programa normalmente. Abre uma consola no meio da execução, com todas as variáveis daquele momento."],
            ["code", "def calcular_total(vendas):\n    total = 0\n    for venda in vendas:\n        breakpoint()          # pára aqui, em cada volta\n        total += venda[\"valor\"]\n    return total"],
            ["h", "Os comandos que precisas"],
            ["lista", [
              "`n` (next): executa a linha e pára na seguinte, sem entrar nas funções.",
              "`s` (step): entra dentro da função que está a ser chamada.",
              "`c` (continue): continua até ao próximo breakpoint.",
              "`p nome` ou só `nome`: mostra o valor de uma variável.",
              "`l` (list): mostra o código à volta de onde estás.",
              "`w` (where): a pilha de chamadas, como um traceback ao vivo.",
              "`q` (quit): sai."
            ]],
            ["p", "São sete comandos. Vinte minutos a habituares-te poupam-te horas todos os meses, e o teu editor tem tudo isto em botões: pontos de paragem na margem, painel de variáveis, entrar e sair da função."],
            ["h", "Parar só quando interessa"],
            ["p", "Num ciclo de dez mil voltas não queres parar dez mil vezes. Põe o breakpoint dentro de um `if` com a condição do caso que te interessa."],
            ["code", "for venda in vendas:\n    if venda[\"valor\"] < 0:      # só o caso estranho\n        breakpoint()\n    total += venda[\"valor\"]"],
            ["h", "Depurar bem, sem depurador"],
            ["p", "Antes de abrires o que quer que seja, faz o método: reproduz o erro de forma fiável, reduz o caso ao mínimo que ainda falha, e forma uma hipótese que possas testar. Mexer no código a ver se passa é a forma mais lenta de tudo, e é a que toda a gente tenta primeiro."],
            ["lista", [
              "Consegues reproduzir? Se não, o problema é reproduzir, e é aí que trabalhas.",
              "Qual é o input mínimo que ainda falha? Metade das vezes, encontras a causa a reduzir.",
              "O que é que tu assumes que pode não ser verdade? É quase sempre aí que está.",
              "Escreve o teste que falha. Passa a ser o módulo 10.3 a partir daqui."
            ]],
            ["obra", "Numa equipa, 'não consigo reproduzir' é uma resposta aceitável uma vez; à segunda, espera-se que peças os dados, a versão e os passos exatos. Um bilhete de bug com passos, resultado esperado e resultado obtido é um profissional a falar."],
            ["aviso", "`breakpoint()` esquecido no código pendura o programa em produção à espera de alguém escrever na consola. O `ruff` apanha isto com a regra T100. Configura-a e dorme descansado."],
            ["h", "Ver o estado sem parar"],
            ["py", "def calcular_total(vendas):\n    total = 0\n    for i, venda in enumerate(vendas):\n        valor = venda.get(\"valor\")\n        if not isinstance(valor, (int, float)):\n            print(f\"linha {i}: valor inesperado {valor!r} em {venda}\")\n            continue\n        total += valor\n    return total\n\nprint(calcular_total([{\"valor\": 10}, {\"valor\": \"20\"}, {\"produto\": \"x\"}]))"],
            ["p", "Repara no `!r`: mostra a representação, com aspas incluídas. É como distingues o número 20 da string '20' num print, e essa distinção é metade dos bugs de dados."]
          ],
          quiz: [
            { p: "Um bug só aparece uma vez em cada mil execuções. Qual é o primeiro passo?", o: ["Pôr breakpoints em todo o lado", "Encontrar uma forma fiável de o reproduzir", "Envolver tudo em try/except"], c: 1,
              e: "Sem reprodução fiável não sabes se corrigiste ou se tiveste sorte. Regista o estado suficiente para reproduzir, e trabalha primeiro nisso." }
          ],
          exercicio: {
            enunciado: "A função abaixo devia devolver a palavra mais frequente, desempatando por ordem alfabética, e `None` para lista vazia. Tem um bug. Encontra-o e corrige.",
            inicio: "def mais_frequente(palavras):\n    contagens = {}\n    for p in palavras:\n        contagens = {}\n        contagens[p] = contagens.get(p, 0) + 1\n    melhor = None\n    for palavra, n in contagens.items():\n        if n > contagens.get(melhor, 0):\n            melhor = palavra\n    return melhor\n",
            testes: "verifica('conta bem', mais_frequente(['a', 'b', 'a']) == 'a')\nverifica('desempata por ordem alfabética', mais_frequente(['b', 'a']) == 'a')\nverifica('lista vazia devolve None', mais_frequente([]) is None)\nverifica('caso maior', mais_frequente(['x', 'y', 'y', 'z', 'z']) == 'y')"
          }
        },
        {
          id: "13.2", titulo: "Medir antes de otimizar", min: 12, estado: "pronta",
          meta: "No fim: medes onde o tempo se perde e escolhes a estrutura de dados certa em vez de adivinhar.",
          blocos: [
            ["p", "A intuição sobre desempenho está quase sempre errada. O tempo raramente está onde julgas: está numa consulta à base de dados dentro de um ciclo, numa procura linear repetida, ou numa conversão de dados que ninguém reparou. Mede primeiro."],
            ["h", "timeit para comparar duas versões"],
            ["py", "import timeit\n\nlista = list(range(20000))\nconjunto = set(lista)\n\nt_lista = timeit.timeit(lambda: 19999 in lista, number=200)\nt_set = timeit.timeit(lambda: 19999 in conjunto, number=200)\n\nprint(f\"lista: {t_lista:.4f}s\")\nprint(f\"set:   {t_set:.4f}s\")"],
            ["p", "A diferença não é de dez por cento, é de ordens de grandeza. Procurar numa lista percorre tudo; num `set` ou num `dict` vai direto por hash. Esta é a otimização que mais vezes vais precisar e a mais barata de aplicar."],
            ["h", "As complexidades que precisas de saber"],
            ["lista", [
              "`x in lista`: percorre tudo, custo proporcional ao tamanho.",
              "`x in set` ou `x in dict`: praticamente constante.",
              "`lista.append`: constante. `lista.insert(0, x)`: caro, empurra tudo.",
              "`sorted`: proporcional a n log n, e é dificilmente evitável.",
              "Ciclo dentro de ciclo sobre os mesmos dados: proporcional ao quadrado. É aqui que os scripts morrem."
            ]],
            ["h", "Perfilar um programa inteiro"],
            ["code", "python -m cProfile -s cumtime meu_script.py | head -20"],
            ["p", "Mostra quanto tempo se gastou em cada função, ordenado. Lê a coluna cumulativa e procura a primeira função tua na lista: é aí que trabalhas. Otimizar o que está abaixo dela é otimizar detalhes."],
            ["h", "A regra de trabalho"],
            ["lista", [
              "Torna o código correto e legível primeiro.",
              "Mede com dados realistas. Um milhão de linhas comporta-se de forma diferente de mil.",
              "Otimiza o ponto mais caro, um de cada vez, e volta a medir.",
              "Guarda os testes a passar durante todo o processo. Código rápido e errado não serve de nada."
            ]],
            ["obra", "O relato mais comum de um júnior no primeiro mês: 'o script demorava quatro horas, agora demora dois minutos'. Quase sempre é a mesma correção, trocar procuras repetidas numa lista por um dicionário construído uma vez. Sabe reconhecer o padrão e vais parecer mágico com quinze linhas."],
            ["py", "clientes = [{\"id\": i, \"nome\": f\"cliente {i}\"} for i in range(5000)]\nencomendas = [{\"cliente_id\": i % 5000} for i in range(5000)]\n\n# lento: procura linear por cada encomenda\ndef juntar_lento():\n    return [c[\"nome\"] for e in encomendas for c in clientes if c[\"id\"] == e[\"cliente_id\"]]\n\n# rápido: um índice construído uma vez\ndef juntar_rapido():\n    indice = {c[\"id\"]: c[\"nome\"] for c in clientes}\n    return [indice[e[\"cliente_id\"]] for e in encomendas]\n\nimport time\nt = time.perf_counter(); juntar_rapido(); print(f\"rápido: {time.perf_counter() - t:.4f}s\")"],
            ["aviso", "Não troques legibilidade por microssegundos. Uma linha esperta que poupa dois por cento e ninguém percebe é um custo permanente para toda a equipa. Otimiza onde a medição diz que dói, e escreve um comentário a dizer porquê."]
          ],
          quiz: [
            { p: "Um script demora horas a cruzar duas listas de dez mil elementos. Qual é a primeira coisa a mudar?", o: ["Usar threads", "Construir um dicionário de índice e trocar a procura linear por acesso direto", "Comprar uma máquina melhor"], c: 1,
              e: "Cem milhões de comparações passam a dez mil acessos. Paralelizar código quadrático é paralelizar o desperdício." }
          ],
          exercicio: {
            enunciado: "Escreve `comuns(a, b)` que devolve os elementos presentes nas duas listas, ordenados e sem repetidos. Tem de aguentar listas grandes: um teste mede o tempo com três mil elementos.",
            inicio: "def comuns(a, b):\n    pass\n",
            testes: "verifica('elementos comuns ordenados', comuns([3, 1, 2, 3], [2, 3, 9]) == [2, 3])\nverifica('sem comuns', comuns([1], [2]) == [])\nverifica('lista vazia', comuns([], [1, 2]) == [])\nimport time as _t\n_a = list(range(3000))\n_b = list(range(1500, 4500))\n_i = _t.perf_counter()\n_r = comuns(_a, _b)\n_demora = _t.perf_counter() - _i\nverifica('resultado correto com muitos dados', _r == list(range(1500, 3000)))\nverifica('rápido com muitos dados', _demora < 0.5)"
          }
        }
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
        {
          id: "14.2", titulo: "Dublês de teste para chamadas externas", min: 14, estado: "pronta",
          meta: "No fim: testas código que fala com a rede, sem rede, em milissegundos.",
          blocos: [
            ["p", "Um teste que chama uma API a sério é lento, falha quando a internet falha e devolve dados diferentes amanhã. Um dublê é um objeto que finge ser essa dependência e responde o que tu mandares."],
            ["h", "O mais simples: uma classe falsa"],
            ["py", "class RespostaFalsa:\n    def __init__(self, dados, estado=200):\n        self.dados = dados\n        self.status_code = estado\n\n    def raise_for_status(self):\n        if self.status_code >= 400:\n            raise RuntimeError(f\"HTTP {self.status_code}\")\n\n    def json(self):\n        return self.dados\n\nclass ClienteFalso:\n    def __init__(self, resposta):\n        self.resposta = resposta\n        self.pedidos = []\n\n    def get(self, caminho):\n        self.pedidos.append(caminho)\n        return self.resposta\n\ndef nomes(cliente):\n    r = cliente.get(\"/utilizadores\")\n    r.raise_for_status()\n    return [u[\"nome\"] for u in r.json()[\"resultados\"]]\n\nfalso = ClienteFalso(RespostaFalsa({\"resultados\": [{\"nome\": \"Ana\"}]}))\nprint(nomes(falso))\nprint(falso.pedidos)"],
            ["p", "Repara em duas coisas. A função recebe o cliente como argumento, que é a injeção de dependências do módulo 8.3, e o dublê guarda o que lhe pediram, para poderes verificar o pedido além do resultado."],
            ["h", "unittest.mock, quando não te apetece escrever a classe"],
            ["py", "from unittest.mock import Mock\n\ndef nomes(cliente):\n    r = cliente.get(\"/utilizadores\")\n    r.raise_for_status()\n    return [u[\"nome\"] for u in r.json()[\"resultados\"]]\n\nresposta = Mock()\nresposta.json.return_value = {\"resultados\": [{\"nome\": \"Ana\"}, {\"nome\": \"Rui\"}]}\ncliente = Mock()\ncliente.get.return_value = resposta\n\nprint(nomes(cliente))\ncliente.get.assert_called_once_with(\"/utilizadores\")\nprint(resposta.raise_for_status.called)"],
            ["p", "Um `Mock` aceita qualquer atributo e qualquer chamada, e regista tudo. Isso é conveniente e é também o perigo: um erro de escrita no nome do método não rebenta, devolve outro `Mock`. Por isso existe `autospec`, que copia a assinatura do objeto real."],
            ["h", "Simular falhas, que é o que interessa"],
            ["py", "from unittest.mock import Mock\n\ndef nomes_seguros(cliente):\n    try:\n        r = cliente.get(\"/utilizadores\")\n        r.raise_for_status()\n    except RuntimeError:\n        return []\n    return [u[\"nome\"] for u in r.json()[\"resultados\"]]\n\nresposta = Mock()\nresposta.raise_for_status.side_effect = RuntimeError(\"HTTP 500\")\ncliente = Mock()\ncliente.get.return_value = resposta\n\nprint(nomes_seguros(cliente))"],
            ["p", "`side_effect` faz o dublê levantar uma exceção. É assim que testas o caminho do 500, do tempo esgotado e do JSON inválido, que na vida real acontecem e que quase ninguém testa."],
            ["obra", "Em entrevista, 'como testarias isto se depende de uma API externa' é pergunta frequente. A resposta completa tem três partes: injetar a dependência, substituí-la por um dublê no teste, e ter um teste de integração separado, que corre poucas vezes, contra a API a sério."],
            ["aviso", "Não testes o dublê. Um teste que só verifica que o mock foi chamado, sem verificar o resultado, passa sempre e não prova nada. Verifica o que a tua função devolve e, se for relevante, também o pedido que fez."],
            ["h", "Onde pôr a fronteira"],
            ["p", "Isola no ponto mais estreito: uma função que faz o pedido e devolve dados, e outra que trata os dados. A segunda não precisa de dublê nenhum, testa-se com dicionários à mão. Bom desenho reduz a quantidade de mocks necessários, e um teste cheio de mocks é um sinal de que o desenho pode melhorar."]
          ],
          quiz: [
            { p: "O teu teste com `Mock` passa, mas em produção rebenta com AttributeError num método que não existe. Porquê?", o: ["O mock estava mal configurado", "Um Mock aceita qualquer atributo, mesmo os que o objeto real não tem", "A biblioteca mudou"], c: 1,
              e: "Um `Mock` diz sim a tudo. Usa `create_autospec` ou `autospec=True` para o dublê ter a mesma superfície do objeto real, e o erro de escrita aparece no teste." }
          ],
          exercicio: {
            enunciado: "Escreve `nomes_de_utilizadores(cliente)` que chama `cliente.get('/utilizadores')`, valida a resposta com `raise_for_status()` e devolve a lista de nomes que vem em `resposta.json()['resultados']`. Erros da resposta devem propagar-se.",
            inicio: "def nomes_de_utilizadores(cliente):\n    pass\n",
            testes: "from unittest.mock import Mock as _Mock\n_resp = _Mock()\n_resp.json.return_value = {'resultados': [{'nome': 'Ana'}, {'nome': 'Rui'}]}\n_cli = _Mock()\n_cli.get.return_value = _resp\nverifica('devolve os nomes', nomes_de_utilizadores(_cli) == ['Ana', 'Rui'])\nverifica('pediu o caminho certo', _cli.get.call_args[0][0] == '/utilizadores')\nverifica('validou o estado da resposta', _resp.raise_for_status.called)\n_mau = _Mock()\n_mau.get.return_value.raise_for_status.side_effect = RuntimeError('HTTP 500')\n_subiu = False\ntry:\n    nomes_de_utilizadores(_mau)\nexcept RuntimeError:\n    _subiu = True\nverifica('erro da resposta propaga-se', _subiu)"
          }
        }
      ]
    },
    {
      n: 15, fase: 4, titulo: "Bases de dados",
      objetivo: "Guardar dados a sério, não em ficheiros JSON.",
      licoes: [
        {
          id: "15.1", titulo: "SQL que um programador precisa", min: 20, estado: "pronta",
          meta: "No fim: escreves consultas com junções e agregações e percebes porque é que uma é lenta.",
          blocos: [
            ["p", "SQL não é uma tecnologia paralela ao Python: é metade do trabalho de backend. Dizes o que queres, não como se procura. O motor decide o caminho, e o teu trabalho é dar-lhe condições para escolher bem."],
            ["h", "O básico, por ordem de execução mental"],
            ["code", "SELECT loja, SUM(valor) AS total\nFROM vendas\nWHERE data >= '2026-01-01'\nGROUP BY loja\nHAVING SUM(valor) > 1000\nORDER BY total DESC\nLIMIT 10;"],
            ["lista", [
              "`FROM`: de onde vêm as linhas.",
              "`WHERE`: filtra linhas, antes de agrupar.",
              "`GROUP BY`: junta linhas em grupos.",
              "`HAVING`: filtra grupos, depois de agregar.",
              "`SELECT`: escolhe as colunas do resultado.",
              "`ORDER BY` e `LIMIT`: ordena e corta."
            ]],
            ["p", "A confusão mais comum é entre `WHERE` e `HAVING`. `WHERE` não vê somas porque ainda não foram calculadas; `HAVING` só existe depois do `GROUP BY`. Saber isto responde a metade das perguntas de SQL numa entrevista."],
            ["h", "Junções"],
            ["code", "SELECT c.nome, COUNT(e.id) AS encomendas\nFROM clientes AS c\nLEFT JOIN encomendas AS e ON e.cliente_id = c.id\nGROUP BY c.id, c.nome\nORDER BY encomendas DESC;"],
            ["lista", [
              "`INNER JOIN`: só linhas com correspondência dos dois lados.",
              "`LEFT JOIN`: todas as da esquerda, com nulos onde não há par. É o que queres quando a pergunta é 'incluindo os que não têm nenhum'.",
              "Junta sempre por chaves indexadas, tipicamente a chave primária de um lado e a chave estrangeira do outro."
            ]],
            ["aviso", "`COUNT(*)` conta linhas, incluindo as que vieram vazias de um `LEFT JOIN`. `COUNT(coluna)` ignora nulos. Num `LEFT JOIN`, `COUNT(*)` dá 1 para clientes sem encomendas nenhumas, e alguém vai perguntar-te porque é que o relatório está errado."],
            ["h", "Índices, em duas frases"],
            ["p", "Um índice é uma estrutura ordenada que evita ler a tabela toda, tal como o `set` do módulo 13.2 evita percorrer a lista. Cria índices nas colunas por que filtras e juntas com frequência. Cada índice acelera leituras e atrasa escritas, por isso não se indexa tudo."],
            ["code", "CREATE INDEX idx_encomendas_cliente ON encomendas (cliente_id);\n\nEXPLAIN QUERY PLAN\nSELECT * FROM encomendas WHERE cliente_id = 42;"],
            ["p", "`EXPLAIN` mostra o plano escolhido. Ver `SCAN TABLE` numa tabela grande é o sinal de que falta um índice; `SEARCH TABLE ... USING INDEX` é o que queres ver."],
            ["obra", "O pedido típico do primeiro mês: 'quantos clientes novos por mês no último ano, incluindo os meses a zero'. Envolve agregação, formatação de datas e um `LEFT JOIN` com uma tabela de meses. Se souberes escrever isto, já vales o ordenado."],
            ["aviso", "`SELECT *` em código de produção é dívida: traz colunas que não usas, parte quando alguém acrescenta uma coluna nova e esconde o que a consulta precisa mesmo. Escreve as colunas."]
          ],
          quiz: [
            { p: "Precisas do total de encomendas por cliente, incluindo clientes sem nenhuma. Que junção usas?", o: ["INNER JOIN", "LEFT JOIN com COUNT da coluna da tabela da direita", "Duas consultas separadas"], c: 1,
              e: "O `INNER JOIN` deitava fora os clientes sem encomendas, que são precisamente os que a pergunta quer ver. E conta a coluna, não `*`, para eles darem zero." }
          ],
          exercicio: {
            enunciado: "Escreve `sql_total_por_loja()` que devolve uma consulta SQL sobre a tabela `vendas` (colunas `loja` e `valor`) com duas colunas, `loja` e `total`, somando os valores por loja, apenas com total acima de 100, da maior para a menor.",
            inicio: "def sql_total_por_loja():\n    return \"\"\n",
            testes: "import sqlite3 as _s\n_c = _s.connect(':memory:')\n_c.execute('CREATE TABLE vendas (loja TEXT, valor REAL)')\n_c.executemany('INSERT INTO vendas VALUES (?, ?)', [('Lisboa', 120), ('Porto', 80), ('Lisboa', 45), ('Faro', 200)])\n_linhas = _c.execute(sql_total_por_loja()).fetchall()\nverifica('duas lojas acima de 100', len(_linhas) == 2)\nverifica('ordenado do maior para o menor', [l[0] for l in _linhas] == ['Faro', 'Lisboa'])\nverifica('total de Lisboa somado', abs(_linhas[1][1] - 165) < 0.001)\nverifica('colunas com os nomes certos', [d[0] for d in _c.execute(sql_total_por_loja()).description] == ['loja', 'total'])"
          }
        },
        {
          id: "15.2", titulo: "sqlite3 e SQLAlchemy", min: 18, estado: "pronta",
          meta: "No fim: falas com uma base de dados a partir de Python sem abrir uma porta a injeção de SQL.",
          blocos: [
            ["p", "O `sqlite3` vem com o Python e não precisa de servidor: a base de dados é um ficheiro. Para aprender, para testes e para muitas ferramentas internas, chega perfeitamente. O que aprenderes aqui aplica-se igual ao PostgreSQL, que é o que vais usar no emprego."],
            ["py", "import sqlite3\n\nligacao = sqlite3.connect(\":memory:\")\nligacao.execute(\"CREATE TABLE produtos (nome TEXT, preco REAL)\")\nligacao.execute(\"INSERT INTO produtos VALUES (?, ?)\", (\"teclado\", 39.9))\nligacao.executemany(\n    \"INSERT INTO produtos VALUES (?, ?)\",\n    [(\"rato\", 12.5), (\"cabo\", 4.0)],\n)\nligacao.commit()\n\nfor linha in ligacao.execute(\"SELECT nome, preco FROM produtos ORDER BY preco DESC\"):\n    print(linha)"],
            ["aviso", "Os pontos de interrogação não são estilo: são a diferença entre código seguro e a vulnerabilidade mais explorada da história da web. Nunca construas SQL com f-strings ou com `+`, nem com dados que 'vêm de dentro'. Nunca é nunca."],
            ["code", "# catástrofe à espera de acontecer\ncursor.execute(f\"SELECT * FROM utilizadores WHERE nome = '{nome}'\")\n# com nome = \"x'; DROP TABLE utilizadores; --\" perdeste a tabela\n\n# correto\ncursor.execute(\"SELECT * FROM utilizadores WHERE nome = ?\", (nome,))"],
            ["p", "Com parâmetros, o valor nunca é interpretado como SQL: é sempre tratado como dado, por mais aspas que tenha. O motor recebe a consulta e os valores em separado."],
            ["h", "Transações"],
            ["p", "Sem `commit`, as alterações não ficam. Com `with ligacao:` o commit é automático no fim e o rollback é automático se houver exceção: ou tudo acontece, ou nada acontece."],
            ["py", "import sqlite3\n\nligacao = sqlite3.connect(\":memory:\")\nligacao.execute(\"CREATE TABLE contas (nome TEXT, saldo REAL)\")\nligacao.executemany(\"INSERT INTO contas VALUES (?, ?)\", [(\"ana\", 100), (\"rui\", 0)])\nligacao.commit()\n\ntry:\n    with ligacao:\n        ligacao.execute(\"UPDATE contas SET saldo = saldo - 50 WHERE nome = 'ana'\")\n        raise RuntimeError(\"falha a meio da transferência\")\nexcept RuntimeError as e:\n    print(\"rollback:\", e)\n\nprint(ligacao.execute(\"SELECT nome, saldo FROM contas\").fetchall())"],
            ["h", "Do driver ao ORM"],
            ["p", "Um ORM mapeia tabelas para classes. Poupa código repetitivo, dá-te tipos e migrações, e no dia em que precisares de SQL a sério deixa-te escrever SQL a sério. O SQLAlchemy é o padrão em Python."],
            ["code", "from sqlalchemy import create_engine, select\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session\n\nclass Base(DeclarativeBase):\n    pass\n\nclass Produto(Base):\n    __tablename__ = \"produtos\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    nome: Mapped[str]\n    preco: Mapped[float]\n\nmotor = create_engine(\"sqlite:///loja.db\")\nBase.metadata.create_all(motor)\n\nwith Session(motor) as sessao:\n    sessao.add(Produto(nome=\"teclado\", preco=39.9))\n    sessao.commit()\n    caros = sessao.scalars(select(Produto).where(Produto.preco > 20)).all()\n    print([p.nome for p in caros])"],
            ["aviso", "O problema clássico de qualquer ORM chama-se N mais 1: carregas cem encomendas e depois, dentro de um ciclo, acedes ao cliente de cada uma. São cento e uma consultas em vez de uma. Resolve-se a dizer ao ORM para carregar tudo de uma vez, com `joinedload` ou `selectinload`."],
            ["obra", "Saber SQL e saber ORM não é a mesma competência, e as equipas querem as duas. Numa entrevista de backend é normal pedirem para escrever a consulta em SQL e depois explicar como o ORM a geraria. Se só sabes o ORM, ficas preso no dia em que a consulta for lenta."]
          ],
          quiz: [
            { p: "Porque é que `f\"... WHERE nome = '{nome}'\"` é inaceitável mesmo quando o valor vem da tua própria base de dados?", o: ["Por estilo", "Porque qualquer valor com aspas altera a consulta, e dados 'de dentro' vieram de fora um dia", "Porque é mais lento"], c: 1,
              e: "Injeção de segunda ordem: o valor foi gravado por um utilizador há seis meses e explode agora. Parâmetros sempre, sem exceções." }
          ],
          exercicio: {
            enunciado: "Escreve `guardar(ligacao, produtos)` que insere na tabela `produtos` (colunas nome e preco) uma lista de tuplos, confirma a transação e devolve quantas linhas inseriu. Usa parâmetros: um dos nomes de teste é uma tentativa de injeção e tem de ser guardado tal e qual.",
            inicio: "def guardar(ligacao, produtos):\n    pass\n",
            testes: "import sqlite3 as _s\n_lig = _s.connect(':memory:')\n_lig.execute('CREATE TABLE produtos (nome TEXT, preco REAL)')\n_ataque = \"rato'); DROP TABLE produtos; --\"\n_n = guardar(_lig, [('teclado', 39.9), (_ataque, 12.5)])\nverifica('devolve o número de linhas', _n == 2)\n_nomes = [l[0] for l in _lig.execute('SELECT nome FROM produtos ORDER BY preco DESC')]\nverifica('gravou os dois produtos', len(_nomes) == 2)\nverifica('guardou o texto tal e qual', _ataque in _nomes)\n_lig2 = _s.connect(':memory:')\n_lig2.execute('CREATE TABLE produtos (nome TEXT, preco REAL)')\nverifica('lista vazia insere zero', guardar(_lig2, []) == 0)"
          }
        }
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
