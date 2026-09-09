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
        { id: "2.1", titulo: "if, elif, else e a indentação como sintaxe", min: 14, estado: "esboco", meta: "Blocos, condições compostas, o operador ternário." },
        { id: "2.2", titulo: "for, while, break e continue", min: 16, estado: "esboco", meta: "Percorrer coleções sem índices manuais, evitar ciclos infinitos." },
        { id: "2.3", titulo: "Compreensões de lista", min: 12, estado: "esboco", meta: "Escrever transformações numa linha sem as tornar ilegíveis." }
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
        { id: "3.2", titulo: "Listas, tuplos e sets", min: 15, estado: "esboco", meta: "Mutabilidade, desempacotamento, quando cada um é a escolha certa." },
        { id: "3.3", titulo: "Ordenar e filtrar dados", min: 14, estado: "esboco", meta: "sorted com key, lambda, ordenação por vários campos." }
      ]
    },
    {
      n: 4, fase: 1, titulo: "Funções",
      objetivo: "Deixar de escrever scripts corridos e passar a escrever peças reutilizáveis.",
      licoes: [
        { id: "4.1", titulo: "Definir, devolver, chamar", min: 15, estado: "esboco", meta: "return contra print, o erro número um dos iniciantes." },
        { id: "4.2", titulo: "Argumentos por omissão, *args e **kwargs", min: 14, estado: "esboco", meta: "Assinaturas flexíveis e a armadilha do argumento mutável." },
        { id: "4.3", titulo: "Anotações de tipo", min: 12, estado: "esboco", meta: "Escrever assinaturas que a equipa e o editor conseguem ler." }
      ]
    },

    /* ---------------- FASE 2 ---------------- */
    {
      n: 5, fase: 2, titulo: "Erros e exceções",
      objetivo: "Falhar de forma controlada em vez de esconder problemas.",
      licoes: [
        { id: "5.1", titulo: "try, except, else, finally", min: 14, estado: "esboco", meta: "Apanhar o erro certo e nunca um except vazio." },
        { id: "5.2", titulo: "Exceções próprias e validação", min: 12, estado: "esboco", meta: "Erros de domínio com mensagens úteis." }
      ]
    },
    {
      n: 6, fase: 2, titulo: "Ficheiros, JSON e CSV",
      objetivo: "Ler e escrever dados que sobrevivem ao fim do programa.",
      licoes: [
        { id: "6.1", titulo: "pathlib e o gestor de contexto", min: 14, estado: "esboco", meta: "with open, codificação, caminhos que funcionam em qualquer sistema." },
        { id: "6.2", titulo: "CSV e JSON na prática", min: 16, estado: "esboco", meta: "Importar um ficheiro sujo e produzir um relatório." },
        { id: "6.3", titulo: "Registo com logging", min: 12, estado: "esboco", meta: "Substituir prints por registos com níveis." }
      ]
    },
    {
      n: 7, fase: 2, titulo: "Módulos, ambientes e dependências",
      objetivo: "Deixar de ter um ficheiro gigante e de partir o Python do sistema.",
      licoes: [
        { id: "7.1", titulo: "import, módulos e pacotes", min: 14, estado: "esboco", meta: "Organizar em ficheiros, evitar importações circulares." },
        { id: "7.2", titulo: "Ambientes virtuais e pip", min: 14, estado: "esboco", meta: "venv, requirements, pyproject, porque isto é obrigatório." }
      ]
    },
    {
      n: 8, fase: 2, titulo: "Objetos",
      objetivo: "Perceber classes o suficiente para ler o código dos outros.",
      licoes: [
        { id: "8.1", titulo: "Classes, estado e métodos", min: 18, estado: "esboco", meta: "__init__, self, métodos de instância." },
        { id: "8.2", titulo: "dataclasses", min: 12, estado: "esboco", meta: "A forma que se usa hoje para modelar dados." },
        { id: "8.3", titulo: "Composição contra herança", min: 14, estado: "esboco", meta: "Porque é que a árvore de herança profunda é um erro caro." }
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
