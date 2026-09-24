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
      n: 1, fase: 1, titulo: "A tua máquina de trabalho",
      objetivo: "Ter terminal, Python e editor a funcionar como numa empresa.",
      licoes: [
        {
          id: "1.1", titulo: "O terminal, sem medo", min: 14, estado: "pronta",
          meta: "No fim: navegas pelo disco, corres comandos e percebes porque é que 'comando não encontrado' acontece.",
          blocos: [
            ["p", "O terminal é um programa que recebe comandos escritos e responde com texto. Não é mais místico do que isso. Acontece que quase tudo o que é trabalho de Python passa por lá: correr um script, instalar dependências, usar git, publicar. O teu editor tem botões para isto, e os botões correm exatamente os mesmos comandos."],
            ["p", "Abre-o: no Windows é o Terminal ou o PowerShell, no macOS é o Terminal, no Linux é o Terminal. A linha onde escreves chama-se prompt e costuma acabar em `$` ou `>`."],
            ["h", "Onde é que tu estás"],
            ["p", "O disco é uma árvore de pastas e tu estás sempre dentro de uma delas, a pasta atual. Todos os comandos que escreves acontecem a partir daí, e metade da confusão dos primeiros dias é não saber onde se está."],
            ["lista", [
              "`pwd` mostra a pasta atual. No PowerShell também funciona.",
              "`ls` lista o que lá está (`dir` no cmd do Windows).",
              "`cd nome` entra numa pasta, `cd ..` sobe uma, `cd` sozinho volta à tua pasta pessoal.",
              "`mkdir projetos` cria uma pasta.",
              "`cat ficheiro.py` mostra o conteúdo de um ficheiro de texto (`type` no cmd).",
              "Seta para cima repete o comando anterior. Tab completa nomes a meio. Usa os dois desde hoje."
            ]],
            ["code", "$ pwd\n/home/ana\n$ mkdir projetos\n$ cd projetos\n$ pwd\n/home/ana/projetos\n$ ls\n(vazio)"],
            ["h", "Caminhos absolutos e relativos"],
            ["p", "Um caminho absoluto começa na raiz e não depende de onde estás: `/home/ana/projetos/curso.py`, ou `C:\\Users\\ana\\projetos\\curso.py` no Windows. Um caminho relativo parte da pasta atual: `curso.py`, `dados/vendas.csv`, `../outro_projeto`."],
            ["lista", [
              "`.` é a pasta atual.",
              "`..` é a pasta acima.",
              "`~` é a tua pasta pessoal.",
              "Nomes com espaços vão entre aspas: `cd \"Os meus documentos\"`."
            ]],
            ["h", "Correr Python"],
            ["code", "$ python3 --version\nPython 3.12.4\n$ python3 relatorio.py\n$ python3 -c \"print(2 + 2)\"\n4"],
            ["p", "`Ctrl+C` interrompe um programa que está a correr. `Ctrl+D` (ou `exit()`) sai da consola de Python. São as duas teclas que te tiram de qualquer sítio onde te sintas preso."],
            ["h", "PATH: porque é que 'comando não encontrado' acontece"],
            ["p", "Quando escreves `python3`, o sistema procura um programa com esse nome numa lista de pastas chamada PATH. Se não estiver em nenhuma delas, recebes `command not found`. Não significa que o Python não está instalado: significa que o sistema não sabe onde ele está."],
            ["code", "$ which python3        # macOS e Linux\n/usr/bin/python3\n> where python         # Windows\nC:\\Users\\ana\\AppData\\Local\\Programs\\Python\\Python312\\python.exe"],
            ["obra", "O primeiro dia numa empresa é quase sempre: clonar o repositório, criar o ambiente, correr os testes. São três comandos no terminal. Quem hesita aqui perde a manhã numa coisa que ninguém considera difícil, e é uma péssima primeira impressão por uma razão que não tem nada a ver com programar."],
            ["aviso", "`rm` apaga sem caixote do lixo. `rm -rf` apaga uma árvore inteira sem perguntar. Antes de carregares no Enter num comando que apaga, lê o caminho duas vezes, e escreve sempre caminhos relativos curtos a partir da pasta do projeto."]
          ],
          quiz: [
            { p: "Estás em `/home/ana/projetos` e queres chegar a `/home/ana/documentos`. Que comando usas?", o: ["cd documentos", "cd ../documentos", "cd /documentos"], c: 1,
              e: "`documentos` está ao lado, não dentro. Sobes um nível com `..` e entras. `cd /documentos` iria para uma pasta na raiz do disco, que provavelmente não existe." }
          ],
          exercicio: {
            enunciado: "Escreve `resolver(atual, caminho)`, que devolve o caminho absoluto onde ficas depois de fazer `cd caminho` a partir de `atual`. Trata `.`, `..` e caminhos absolutos (começados por `/`). Nunca devolve barra no fim, e a raiz é `/`. Subir acima da raiz fica na raiz.",
            inicio: "def resolver(atual, caminho):\n    pass\n",
            testes: "verifica('caminho relativo', resolver('/home/ana', 'projetos') == '/home/ana/projetos')\nverifica('sobe um nivel', resolver('/home/ana/projetos', '..') == '/home/ana')\nverifica('caminho absoluto ignora o atual', resolver('/home/ana', '/etc') == '/etc')\nverifica('ponto fica no sitio', resolver('/home/ana', '.') == '/home/ana')\nverifica('varios saltos', resolver('/home/ana/projetos/curso', '../../documentos') == '/home/ana/documentos')\nverifica('subir acima da raiz fica na raiz', resolver('/', '..') == '/')\nverifica('caminho com varias pastas', resolver('/home', 'ana/projetos/curso') == '/home/ana/projetos/curso')"
          }
        },
        {
          id: "1.2", titulo: "Instalar Python e escolher o editor", min: 14, estado: "pronta",
          meta: "No fim: tens uma versão recente de Python a responder no terminal e um editor que te ajuda a escrever.",
          blocos: [
            ["p", "Há duas coisas para instalar e nenhuma delas demora mais do que dez minutos: o interpretador de Python e um editor de código. Tudo o resto que te vierem vender nesta fase é distração."],
            ["h", "O interpretador"],
            ["lista", [
              "Windows: instalador oficial em python.org. Liga a caixa **Add python.exe to PATH** no primeiro ecrã, ou vais passar a tarde a resolver isso. Depois tens o comando `py`, que escolhe a versão certa por ti.",
              "macOS: o Python que já vem no sistema é do sistema, não é teu. Instala o oficial de python.org ou usa o Homebrew (`brew install python`).",
              "Linux: já lá está. Confirma que tens também o `venv` (`sudo apt install python3-venv` no Debian e derivados) e nunca mexas no Python do sistema."
            ]],
            ["p", "Qualquer versão a partir da 3.11 serve para tudo o que este curso faz. Se te deixarem escolher num projeto novo, escolhe a mais recente que as tuas bibliotecas já suportem, nunca a que saiu ontem."],
            ["code", "$ python3 --version\nPython 3.12.4\n$ python3 -m pip --version\npip 24.0"],
            ["aviso", "Nunca `sudo pip install`. Instalar pacotes no Python do sistema com poderes de administrador é como se partem sistemas operativos inteiros. Tudo o que instalas vive num ambiente virtual do projeto, e isso é o módulo 10.2."],
            ["h", "O editor"],
            ["p", "VS Code é a escolha por omissão e é o que vais encontrar na maioria das equipas. PyCharm é excelente e mais pesado. Qualquer um serve; o que não serve é o Bloco de Notas."],
            ["lista", [
              "Instala a extensão **Python** da Microsoft. É ela que dá conclusão de código, ir à definição, erros sublinhados e depurador com botões.",
              "Instala a extensão **Ruff** para veres os problemas de estilo enquanto escreves (módulo 15.1).",
              "Liga **Format on Save**. Deixas de discutir espaços contigo próprio.",
              "Aprende dois atalhos: ir à definição (F12) e procurar em todo o projeto. Vão poupar-te horas."
            ]],
            ["obra", "Quando entras numa equipa, o repositório já traz `pyproject.toml`, `.editorconfig` e configuração de linter. Essa configuração ganha à tua. Um pull request cheio de alterações de formatação porque o teu editor faz diferente é a forma mais rápida de irritar quem revê."],
            ["h", "Confirmar que está tudo bem"],
            ["code", "$ python3 --version\n$ python3 -m pip --version\n$ python3 -m venv .venv\n$ source .venv/bin/activate      # Windows: .venv\\Scripts\\activate\n(.venv) $ python -m pip install pytest\n(.venv) $ pytest --version"],
            ["p", "Se estes seis comandos correrem, a tua máquina está pronta para qualquer projeto de Python deste curso e do teu primeiro emprego."],
            ["aviso", "Podes ter três Pythons instalados sem saber. Escreve sempre `python3 -m pip install x` em vez de `pip install x`: assim o pacote vai para o interpretador que estás mesmo a usar, e não para outro qualquer que apanhou o nome `pip` primeiro."]
          ],
          quiz: [
            { p: "Tens várias versões de Python na máquina. Como garantes que instalas um pacote no interpretador certo?", o: ["pip install pacote", "python3 -m pip install pacote", "sudo pip install pacote"], c: 1,
              e: "`python3 -m pip` usa o pip do interpretador que acabaste de invocar. `pip` sozinho é um programa à parte que pode pertencer a outra instalação." }
          ],
          exercicio: {
            enunciado: "Escreve `versao_ok(texto, minima)`. Recebe a saída de `python --version` (por exemplo `'Python 3.11.5'`) e um tuplo mínimo como `(3, 11)`. Devolve `True` se a versão instalada é igual ou superior à mínima. Se não encontrar versão nenhuma no texto, levanta `ValueError`.",
            inicio: "def versao_ok(texto, minima):\n    pass\n",
            testes: "verifica('versao suficiente', versao_ok('Python 3.11.5', (3, 11)) is True)\nverifica('versao inferior', versao_ok('Python 3.9.18', (3, 11)) is False)\nverifica('compara por numero e nao por texto', versao_ok('Python 3.10.0', (3, 9)) is True)\nverifica('aceita versao sem patch', versao_ok('Python 3.12', (3, 11)) is True)\nverifica('igual a minima passa', versao_ok('Python 3.11.0', (3, 11)) is True)\n_erro = False\ntry:\n    versao_ok('qualquer coisa', (3, 11))\nexcept ValueError:\n    _erro = True\nverifica('texto sem versao levanta ValueError', _erro)"
          }
        },
        {
          id: "1.3", titulo: "Do REPL ao ficheiro .py", min: 13, estado: "pronta",
          meta: "No fim: sabes quando usar a consola interativa e como se estrutura um programa que alguém corre.",
          blocos: [
            ["p", "Escreve `python3` sozinho no terminal e entras no REPL, a consola interativa. Escreves uma linha, vês o resultado, escreves outra. É a melhor ferramenta que existe para responder a 'o que é que este método devolve mesmo?' sem abrir documentação."],
            ["code", ">>> texto = \"  Ana Silva \"\n>>> texto.strip()\n'Ana Silva'\n>>> dir(texto)[-10:]\n['rstrip', 'split', 'splitlines', 'startswith', ...]\n>>> help(str.split)"],
            ["p", "O REPL não guarda nada. Serve para experimentar. Quando a experiência funciona, passa para um ficheiro."],
            ["h", "Um programa a sério é um ficheiro"],
            ["code", "# relatorio.py\nimport sys\n\n\ndef ler_valores(texto):\n    return [float(p) for p in texto.split(\",\") if p.strip()]\n\n\ndef main(argv):\n    if not argv:\n        print(\"uso: python3 relatorio.py 10,20,30\", file=sys.stderr)\n        return 2\n    valores = ler_valores(argv[0])\n    print(f\"total: {sum(valores):.2f}\")\n    return 0\n\n\nif __name__ == \"__main__\":\n    sys.exit(main(sys.argv[1:]))"],
            ["h", "O que é aquele `__name__`"],
            ["p", "Quando corres um ficheiro diretamente, o Python põe `__name__` a `\"__main__\"`. Quando o importas a partir de outro ficheiro, `__name__` passa a ser o nome do módulo. A guarda `if __name__ == \"__main__\"` é o que separa a parte biblioteca da parte programa: importar não dispara nada, correr dispara o `main`."],
            ["aviso", "Código solto no topo do ficheiro corre no momento do `import`. Um ficheiro que começa a processar dados só por ser importado é um clássico: os testes ficam lentos, e ninguém percebe porquê."],
            ["h", "Receber dados"],
            ["lista", [
              "`input(\"Nome: \")` pergunta à pessoa. Devolve sempre texto e só serve quando há uma pessoa a olhar.",
              "`sys.argv` são os argumentos da linha de comandos: `python3 relatorio.py 10,20` põe `['relatorio.py', '10,20']`.",
              "Variáveis de ambiente (`os.environ`) para configuração e segredos.",
              "Num programa a sério, argumentos tratam-se com `argparse`, que está no módulo 23.1."
            ]],
            ["obra", "Scripts que fazem `input()` não correm em automatismos. No servidor, às três da manhã, ninguém escreve nada: o programa fica a olhar para o vazio até alguém o matar. Tudo o que um programa precisa de saber entra por argumentos ou por variáveis de ambiente."],
            ["h", "Código de saída"],
            ["p", "Um programa devolve um número ao sistema: `0` é sucesso, qualquer outro é falha. É assim que o cron, o CI e o teu colega no terminal sabem se correu bem. Um programa que falha e devolve `0` é pior do que um que rebenta."],
            ["code", "$ python3 relatorio.py 10,20,30\ntotal: 60.00\n$ echo $?\n0\n$ python3 relatorio.py\nuso: python3 relatorio.py 10,20,30\n$ echo $?\n2"],
            ["py", "import sys\n\ndef main(argv):\n    if not argv:\n        return 2\n    return 0\n\nprint(\"com argumento:\", main([\"10,20\"]))\nprint(\"sem argumentos:\", main([]))"]
          ],
          quiz: [
            { p: "Para que serve `if __name__ == \"__main__\":`?", o: ["Para o Python saber por onde começar", "Para o ficheiro poder ser importado sem correr o programa", "É uma convenção de estilo sem efeito"], c: 1,
              e: "Sem a guarda, importar o ficheiro num teste ou noutro módulo executa tudo o que está lá dentro. Com ela, o ficheiro serve as duas coisas: biblioteca e programa." }
          ],
          exercicio: {
            enunciado: "Escreve `main(argv)`, a função de entrada de um script. `argv` é a lista de argumentos, já sem o nome do programa. Com um argumento numérico, guarda o dobro em `RESULTADO` e devolve `0`. Sem argumentos devolve `2`. Com um argumento que não é número devolve `1`.",
            inicio: "RESULTADO = None\n\n\ndef main(argv):\n    pass\n",
            testes: "verifica('argumento valido devolve 0', main(['21']) == 0)\nverifica('guarda o dobro', RESULTADO == 42)\nverifica('sem argumentos devolve 2', main([]) == 2)\nverifica('argumento invalido devolve 1', main(['abc']) == 1)\nverifica('zero tambem e valido', main(['0']) == 0)\nverifica('numero negativo', main(['-3']) == 0 and RESULTADO == -6)"
          }
        }
      ]
    },
    {
      n: 2, fase: 1, titulo: "Correr o teu primeiro código",
      objetivo: "Perceber o que acontece quando carregas em correr.",
      licoes: [
        {
          id: "2.1", titulo: "O interpretador e o print", min: 12, estado: "pronta",
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
          id: "2.2", titulo: "Tipos, conversões e f-strings", min: 15, estado: "pronta",
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
            ["obra", "Concatenar com `+` em relatórios e logs é o sinal mais rápido de código antigo. Em 2026 escreve-se f-string, sempre. As exceções são o módulo `logging` e queries de base de dados, e as razões vão aparecer nos módulos 9 e 18."],
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
          id: "2.3", titulo: "Ler o traceback", min: 10, estado: "pronta",
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
      n: 3, fase: 1, titulo: "Os tipos por dentro",
      objetivo: "Saber o que cada tipo garante e onde cada um te trai.",
      licoes: [
        {
          id: "3.1", titulo: "Números: int, float e dinheiro", min: 16, estado: "pronta",
          meta: "No fim: sabes porque é que não se guarda dinheiro em float e o que faz `//` com números negativos.",
          blocos: [
            ["p", "Python tem dois tipos numéricos que vais usar sempre: `int` e `float`. Parecem a mesma coisa com e sem vírgula. Não são, e a diferença já custou dinheiro a muita gente."],
            ["h", "int não tem limite"],
            ["p", "Um inteiro em Python cresce até à memória acabar. Não há estouro, não há `long`, não há nada para configurar. Isto é raro entre linguagens e é uma vantagem tua."],
            ["py", "print(2 ** 200)\nprint(len(str(2 ** 10000)))"],
            ["h", "As três divisões"],
            ["py", "print(7 / 2)      # sempre float\nprint(7 // 2)     # divisão inteira, arredonda para baixo\nprint(7 % 2)      # resto\nprint(divmod(7, 2))"],
            ["p", "`//` não corta a parte decimal: arredonda para baixo, para o lado do menos infinito. Com números positivos parece a mesma coisa. Com negativos, não é."],
            ["py", "print(-7 // 2)\nprint(int(-7 / 2))\nprint(-7 % 2)"],
            ["aviso", "`-7 // 2` dá `-4`, não `-3`. E `-7 % 2` dá `1`, não `-1`: em Python o resto tem o sinal do divisor. Quem escreve paginação ou reparte lotes com números que podem ser negativos leva com isto pelo menos uma vez."],
            ["h", "float é binário, e por isso é aproximado"],
            ["p", "Um `float` são 64 bits em base 2. Números como 0.1 não têm representação exata em base 2, tal como 1/3 não tem representação exata em base 10. O resultado é o clássico:"],
            ["py", "print(0.1 + 0.2)\nprint(0.1 + 0.2 == 0.3)\n\nimport math\nprint(math.isclose(0.1 + 0.2, 0.3))"],
            ["p", "Regra: nunca compares floats com `==`. Usa `math.isclose`, ou compara arredondado, ou, melhor ainda, não uses floats para aquilo."],
            ["h", "Dinheiro"],
            ["p", "Duas soluções corretas, e a escolha é da equipa. Ou guardas cêntimos em `int` e divides por 100 só para mostrar, ou usas `Decimal` com um número de casas definido. A errada é `float`."],
            ["py", "from decimal import Decimal, ROUND_HALF_UP\n\nprint(Decimal(\"0.1\") + Decimal(\"0.2\"))\n\npreco = Decimal(\"19.99\")\niva = (preco * Decimal(\"0.23\")).quantize(Decimal(\"0.01\"), rounding=ROUND_HALF_UP)\nprint(preco, iva, preco + iva)"],
            ["aviso", "`Decimal(0.1)` com um float lá dentro já traz o erro do float agarrado. Constrói sempre a partir de texto: `Decimal(\"0.1\")`."],
            ["h", "round não faz o que julgas"],
            ["py", "print(round(0.5), round(1.5), round(2.5), round(3.5))"],
            ["p", "Isto chama-se arredondamento bancário: os empates vão para o par mais próximo. Existe para não enviesar somas grandes e é o que a norma manda. Se o negócio exige meio para cima, é `Decimal` com `ROUND_HALF_UP`, explicitamente."],
            ["obra", "Um cêntimo de diferença entre o teu total e o do sistema de contabilidade é um bilhete de bug, e em faturação pode ser uma coima. Quando te pedirem um cálculo com dinheiro, a primeira pergunta é: em que unidade guardamos isto, e com que regra de arredondamento?"],
            ["aviso", "`int(\"3.5\")` rebenta com `ValueError`. `int(3.9)` dá `3`: trunca, não arredonda. Para converter texto com decimais é `int(float(\"3.5\"))`, e mais vale decidires de propósito o que queres."]
          ],
          quiz: [
            { p: "Estás a somar 5000 preços em euros guardados em `float`. Que risco corres?", o: ["Nenhum, o erro é pequeno demais", "Erros de arredondamento que se acumulam e dão um total diferente do da contabilidade", "O programa fica lento"], c: 1,
              e: "Cada soma acrescenta um erro minúsculo. Ao fim de milhares de operações, a diferença aparece nas casas dos cêntimos, que é exatamente onde alguém está a olhar." }
          ],
          exercicio: {
            enunciado: "Escreve `dividir_conta(total_cent, pessoas)`, que reparte um total em cêntimos. Devolve uma lista de inteiros cuja soma é exatamente o total; os cêntimos que sobram vão um a um para as primeiras pessoas. Se `pessoas` for menor que 1, levanta `ValueError`.",
            inicio: "def dividir_conta(total_cent, pessoas):\n    pass\n",
            testes: "verifica('divisao exata', dividir_conta(1000, 4) == [250, 250, 250, 250])\nverifica('a soma e sempre o total', sum(dividir_conta(1001, 3)) == 1001)\nverifica('a sobra vai para os primeiros', dividir_conta(1001, 3) == [334, 334, 333])\nverifica('uma pessoa paga tudo', dividir_conta(777, 1) == [777])\nverifica('total zero', dividir_conta(0, 2) == [0, 0])\nverifica('devolve inteiros', all(isinstance(x, int) for x in dividir_conta(100, 3)))\n_erro = False\ntry:\n    dividir_conta(100, 0)\nexcept ValueError:\n    _erro = True\nverifica('zero pessoas levanta ValueError', _erro)"
          }
        },
        {
          id: "3.2", titulo: "Texto: strings por dentro", min: 18, estado: "pronta",
          meta: "No fim: limpas e transformas texto com os métodos certos e percebes de onde vêm os erros de acentos.",
          blocos: [
            ["p", "Uma string é uma sequência imutável de caracteres. Imutável quer dizer que nenhum método altera a string: todos devolvem uma nova. `texto.strip()` sozinho numa linha não faz nada de útil, e é um erro que toda a gente comete uma vez."],
            ["py", "texto = \"  Ana Silva  \"\ntexto.strip()\nprint(repr(texto))\n\ntexto = texto.strip()\nprint(repr(texto))"],
            ["h", "Índices e fatias"],
            ["py", "nome = \"relatorio.csv\"\nprint(nome[0], nome[-1])\nprint(nome[:9])\nprint(nome[-3:])\nprint(nome[::-1])\nprint(len(nome))"],
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
            ["py", "linha = \" TECLADO ; 39,90 ; 2 \"\nproduto, preco, qtd = [p.strip() for p in linha.split(\";\")]\nprint(produto.capitalize(), float(preco.replace(\",\", \".\")), int(qtd))"],
            ["aviso", "Construir texto com `texto += linha` dentro de um ciclo cria uma string nova em cada volta e copia tudo outra vez. Com 100 mil linhas isso é lentidão a sério. Junta numa lista e faz `\"\".join(lista)` no fim."],
            ["h", "Acentos, bytes e o dia em que o ficheiro rebenta"],
            ["p", "Uma `str` são caracteres. Um ficheiro no disco são bytes. A tradução entre os dois chama-se codificação, e hoje a resposta certa é quase sempre UTF-8. `UnicodeDecodeError` significa que estás a ler bytes com a tabela errada."],
            ["py", "palavra = \"olá\"\nprint(len(palavra))\nprint(palavra.encode(\"utf-8\"))\nprint(len(palavra.encode(\"utf-8\")))\nprint(b\"ol\\xc3\\xa1\".decode(\"utf-8\"))"],
            ["obra", "O ficheiro que o cliente exportou do Excel vem em `cp1252` ou `latin-1` e traz um BOM à cabeça. Abre-se com `encoding=\"utf-8-sig\"` quando há BOM, e pede-se a origem do ficheiro quando há acentos partidos. Escreve sempre `encoding=` explícito: o valor por omissão muda de sistema para sistema e o teu código deixa de funcionar na máquina do colega."],
            ["h", "Formatar"],
            ["py", "produto, valor, n = \"teclado\", 39.9, 7\nprint(f\"{produto:>12} | {valor:8.2f} | {n:03d}\")\nprint(f\"{valor:,.2f}\")\nprint(f\"valor bruto: {produto!r}\")"],
            ["aviso", "`\"Ana\" == \"ana\"` é `False`, e `\"ana\"` não é igual a `\"aña\"` nem a `\"a n a\"`. Antes de comparar texto escrito por pessoas, normaliza: `casefold()` e `strip()` no mínimo."]
          ],
          quiz: [
            { p: "Estás a construir um relatório de 200 mil linhas com `texto += linha` dentro do ciclo. Qual é o problema?", o: ["Nenhum, é assim que se faz", "As strings são imutáveis: cada volta copia tudo outra vez e o custo cresce ao quadrado", "Falta usar f-strings"], c: 1,
              e: "Acumula as linhas numa lista e junta uma vez com `\"\\n\".join(linhas)`. É a diferença entre segundos e minutos." }
          ],
          exercicio: {
            enunciado: "Escreve `normalizar(nome)`, que limpa um nome escrito por uma pessoa: tira espaços das pontas, reduz espaços repetidos a um só, e põe cada palavra com a primeira letra maiúscula e o resto minúsculo.",
            inicio: "def normalizar(nome):\n    pass\n",
            testes: "verifica('espacos nas pontas', normalizar('  ana silva  ') == 'Ana Silva')\nverifica('espacos repetidos', normalizar('ana    maria') == 'Ana Maria')\nverifica('maiusculas a mais', normalizar('JOAO PEDRO') == 'Joao Pedro')\nverifica('acentos preservados', normalizar('joão') == 'João')\nverifica('so espacos da string vazia', normalizar('   ') == '')\nverifica('nome ja correto nao muda', normalizar('Ana Silva') == 'Ana Silva')\nverifica('quebras de linha tambem contam como espaco', normalizar('ana\\nsilva') == 'Ana Silva')"
          }
        },
        {
          id: "3.3", titulo: "Verdadeiro, falso e None", min: 13, estado: "pronta",
          meta: "No fim: percebes porque é que o desconto de 0 por cento desapareceu do sistema.",
          blocos: [
            ["p", "Em Python, qualquer valor pode ser usado numa condição. Há uma lista curta de coisas falsas e tudo o resto é verdadeiro."],
            ["lista", [
              "Falsos: `False`, `None`, `0`, `0.0`, `\"\"`, `[]`, `{}`, `set()`, `()`.",
              "Verdadeiros: tudo o resto, incluindo `\"0\"`, `\"False\"`, `[0]` e `-1`."
            ]],
            ["py", "for valor in [0, \"\", [], \"0\", [0], -1, None]:\n    print(repr(valor), \"->\", bool(valor))"],
            ["p", "Isto torna o código agradável: `if not lista:` em vez de `if len(lista) == 0:`. E torna-o perigoso exatamente no mesmo sítio."],
            ["h", "O bug do zero"],
            ["py", "pedido = {\"produto\": \"teclado\", \"desconto\": 0}\n\ndesconto = pedido.get(\"desconto\") or 10\nprint(\"com or:\", desconto)\n\ndesconto = pedido[\"desconto\"] if pedido.get(\"desconto\") is not None else 10\nprint(\"com is not None:\", desconto)"],
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
            ["py", "a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b)\n\nx = None\nprint(x is None)"],
            ["aviso", "`a is b` com números pequenos às vezes dá `True` porque o Python reutiliza objetos para inteiros pequenos e textos curtos. É um detalhe da implementação e não é para contar com ele. Compara números com `==`, sempre."],
            ["obra", "'O campo de desconto a zero está a ser ignorado' e 'a quantidade 0 aparece como 1 na fatura' são bilhetes de bug reais, e são quase sempre a mesma linha: um `or` a servir de valor por omissão. Quando fores rever código, procura `or` à direita de um `get`."]
          ],
          quiz: [
            { p: "`quantidade = linha.get('quantidade') or 1`. Que bug tem?", o: ["Nenhum", "Uma quantidade de 0 passa a valer 1", "Rebenta se a chave não existir"], c: 1,
              e: "`0` é falso, por isso o `or` avança para o `1`. Uma encomenda com quantidade zero passa a ter um item. A versão correta pergunta por `None`." }
          ],
          exercicio: {
            enunciado: "Escreve `com_omissao(valor, omissao)`, que devolve `omissao` apenas quando `valor` é `None`. Qualquer outro valor, incluindo `0`, `''`, `False` e listas vazias, é devolvido tal e qual.",
            inicio: "def com_omissao(valor, omissao):\n    pass\n",
            testes: "verifica('None e substituido', com_omissao(None, 10) == 10)\nverifica('zero e mantido', com_omissao(0, 10) == 0)\nverifica('string vazia e mantida', com_omissao('', 'x') == '')\nverifica('False e mantido', com_omissao(False, True) is False)\nverifica('lista vazia e mantida', com_omissao([], [1]) == [])\nverifica('valor normal e mantido', com_omissao(5, 10) == 5)\nverifica('omissao None tambem funciona', com_omissao(None, None) is None)"
          }
        },
        {
          id: "3.4", titulo: "Mutável, imutável e referências", min: 16, estado: "pronta",
          meta: "No fim: percebes porque é que alterar uma lista dentro de uma função mudou os dados de quem a chamou.",
          blocos: [
            ["p", "Uma variável não é uma caixa com um valor lá dentro: é um nome colado a um objeto. `b = a` não copia o objeto, cola outro nome ao mesmo objeto. Enquanto o objeto for imutável, isto nunca te incomoda. Quando é mutável, é a origem de uma família inteira de bugs."],
            ["py", "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)\nprint(a is b)\n\nc = a[:]      # cópia\nc.append(5)\nprint(a, c)"],
            ["lista", [
              "Imutáveis: `int`, `float`, `str`, `bool`, `tuple`, `frozenset`, `bytes`.",
              "Mutáveis: `list`, `dict`, `set`, e praticamente todos os objetos que escreveres."
            ]],
            ["h", "Passar a uma função"],
            ["py", "def acrescentar_iva(precos):\n    for i in range(len(precos)):\n        precos[i] = round(precos[i] * 1.23, 2)\n    return precos\n\noriginais = [100.0, 50.0]\ncom_iva = acrescentar_iva(originais)\nprint(com_iva)\nprint(originais)"],
            ["p", "Os preços originais desapareceram. A função recebeu o mesmo objeto, não uma cópia. A versão correta constrói uma lista nova e não toca no que recebeu."],
            ["py", "def com_iva(precos):\n    return [round(p * 1.23, 2) for p in precos]\n\noriginais = [100.0, 50.0]\nprint(com_iva(originais), originais)"],
            ["h", "O argumento por omissão mutável"],
            ["py", "def registar(evento, historico=[]):\n    historico.append(evento)\n    return historico\n\nprint(registar(\"a\"))\nprint(registar(\"b\"))"],
            ["p", "A lista por omissão é criada uma vez, quando a função é definida, e fica a ser partilhada por todas as chamadas. Nunca é o que queres. O padrão correto usa `None`:"],
            ["py", "def registar(evento, historico=None):\n    historico = list(historico) if historico is not None else []\n    historico.append(evento)\n    return historico\n\nprint(registar(\"a\"))\nprint(registar(\"b\"))"],
            ["h", "Copiar em profundidade"],
            ["py", "import copy\n\noriginal = {\"cliente\": \"Ana\", \"linhas\": [{\"produto\": \"teclado\"}]}\nrasa = dict(original)\nfunda = copy.deepcopy(original)\n\nrasa[\"linhas\"][0][\"produto\"] = \"rato\"\nprint(original[\"linhas\"][0][\"produto\"])\nprint(funda[\"linhas\"][0][\"produto\"])"],
            ["p", "`dict(x)`, `list(x)` e `x[:]` copiam um nível. O que está lá dentro continua a ser partilhado. Para estruturas encaixadas é `copy.deepcopy`, que é mais lento e às vezes é exatamente o que precisas."],
            ["h", "Porque é que uma lista não pode ser chave de dicionário"],
            ["py", "d = {}\nd[(1, 2)] = \"tuplo serve\"\nprint(d)\ntry:\n    d[[1, 2]] = \"lista nao\"\nexcept TypeError as e:\n    print(\"TypeError:\", e)"],
            ["p", "Uma chave precisa de um código de dispersão estável. Se o objeto pudesse mudar, mudaria de sítio na tabela e o dicionário perdia-o. Por isso só objetos imutáveis servem de chave."],
            ["obra", "A regra da casa em quase todas as equipas: ou a função devolve uma coisa nova e não toca no que recebeu, ou altera o que recebeu e devolve `None`. Fazer as duas ao mesmo tempo é como se criam bugs que aparecem a três ficheiros de distância. O `.sort()` e o `sorted()` do Python são esta regra aplicada."],
            ["aviso", "Alterar uma lista enquanto a percorres salta elementos. `for x in lista: lista.remove(x)` deixa metade lá dentro. Percorre uma cópia (`for x in list(lista)`) ou constrói uma lista nova com os que ficam."]
          ],
          quiz: [
            { p: "`def registar(evento, historico=[])`. Porque é que isto está errado?", o: ["Porque listas não podem ser argumentos", "Porque a lista é criada uma vez e fica partilhada entre todas as chamadas", "Porque devia ser um tuplo"], c: 1,
              e: "O valor por omissão é avaliado quando a função é definida, não a cada chamada. Usa `None` e cria a lista lá dentro." }
          ],
          exercicio: {
            enunciado: "Escreve `adicionar(item, carrinho=None)`, que devolve um carrinho com o item acrescentado no fim. Sem carrinho, começa um novo. Nunca altera o carrinho recebido nem partilha estado entre chamadas.",
            inicio: "def adicionar(item, carrinho=None):\n    pass\n",
            testes: "verifica('comeca um carrinho novo', adicionar('pao') == ['pao'])\nverifica('chamadas independentes', adicionar('leite') == ['leite'])\n_c = ['pao']\n_novo = adicionar('leite', _c)\nverifica('acrescenta ao recebido', _novo == ['pao', 'leite'])\nverifica('nao altera o carrinho recebido', _c == ['pao'])\nverifica('devolve uma lista nova', _novo is not _c)\nverifica('carrinho vazio explicito', adicionar('pao', []) == ['pao'])"
          }
        }
      ]
    },
    {
      n: 4, fase: 1, titulo: "Decisões e repetição",
      objetivo: "Controlar o caminho que o programa segue.",
      licoes: [
        {
          id: "4.1", titulo: "if, elif, else e a indentação como sintaxe", min: 14, estado: "pronta",
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
          id: "4.2", titulo: "for, while, break e continue", min: 16, estado: "pronta",
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
            ["obra", "Ciclos aninhados sobre duas listas grandes são a causa número um de scripts que demoram horas. Se te apanhares com um `for` dentro de outro `for` a comparar dados, provavelmente querias um dicionário. O módulo 17 mede isso a sério."]
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
          id: "4.3", titulo: "Compreensões de lista", min: 12, estado: "pronta",
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
      n: 5, fase: 1, titulo: "Estruturas de dados",
      objetivo: "Escolher a estrutura certa, que é metade do desempenho do programa.",
      licoes: [
        {
          id: "5.1", titulo: "Dicionários, a estrutura que vais usar todos os dias", min: 18, estado: "pronta",
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
          id: "5.2", titulo: "Listas, tuplos e sets", min: 15, estado: "pronta",
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
            ["aviso", "`lista_b = lista_a` não copia nada: são dois nomes para a mesma lista, e alterar uma altera a outra. Para copiar usa `lista_a.copy()` ou `list(lista_a)`. Isto apanha toda a gente uma vez, e há de te apanhar num argumento por omissão no módulo 6."],
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
          id: "5.3", titulo: "Ordenar e filtrar dados", min: 14, estado: "pronta",
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
      n: 6, fase: 1, titulo: "Funções",
      objetivo: "Deixar de escrever scripts corridos e passar a escrever peças reutilizáveis.",
      licoes: [
        {
          id: "6.1", titulo: "Definir, devolver, chamar", min: 15, estado: "pronta",
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
          id: "6.2", titulo: "Argumentos por omissão, *args e **kwargs", min: 14, estado: "pronta",
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
          id: "6.3", titulo: "Anotações de tipo", min: 12, estado: "pronta",
          meta: "No fim: escreves assinaturas que o editor e a equipa conseguem ler sem abrir o corpo da função.",
          blocos: [
            ["p", "Uma anotação diz que tipo se espera. Python não a verifica em execução: quem verifica é o teu editor e uma ferramenta chamada mypy, no módulo 15. O valor é documentação que não fica desatualizada em silêncio."],
            ["py", "def area(largura: float, altura: float) -> float:\n    return largura * altura\n\nprint(area(3, 4.5))\nprint(area.__annotations__)"],
            ["h", "Coleções"],
            ["p", "Desde o Python 3.9 escreve-se com os tipos normais: `list[str]`, `dict[str, int]`, `tuple[int, int]`. As versões antigas usavam `List` e `Dict` do módulo `typing` e ainda as vais encontrar em código com uns anos."],
            ["code", "def nomes_por_turma(alunos: list[dict]) -> dict[str, list[str]]:\n    ...\n\ndef coordenadas() -> tuple[float, float]:\n    ...\n\ndef primeiro(valores: list[int]) -> int | None:\n    return valores[0] if valores else None"],
            ["p", "`int | None` significa inteiro ou nada. É a anotação mais útil de todas, porque obriga quem lê a lembrar-se de que o resultado pode não existir. Em código mais antigo aparece como `Optional[int]`."],
            ["h", "Onde vale mesmo a pena"],
            ["lista", [
              "Nas funções públicas de um módulo, que outras pessoas vão chamar.",
              "Em qualquer coisa que devolva `None` em certos casos.",
              "Em estruturas de dados que atravessam camadas, como as `dataclasses` do módulo 11.",
              "Em código que já te enganou uma vez sobre o que recebia."
            ]],
            ["obra", "Num projeto novo em 2026, uma função sem anotações levanta perguntas em revisão. Não porque falte rigor teórico: é porque sem elas ninguém sabe se `dados` é uma lista de dicionários, um dicionário de listas ou um objeto, sem ir ler três ficheiros."],
            ["aviso", "Anotar não valida. `def idade(n: int)` chamada com a string 'trinta' corre na mesma até rebentar mais à frente. Validação de dados que vêm de fora faz-se com código, ou com Pydantic, no módulo 20."],
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

    {
      n: 7, fase: 1, titulo: "Como pensar um problema",
      objetivo: "Um método repetível para ir do enunciado ao código que funciona.",
      licoes: [
        {
          id: "7.1", titulo: "Antes de escrever código: sete perguntas", min: 15, estado: "pronta",
          meta: "No fim: transformas um pedido vago numa lista de exemplos concretos antes de escrever a primeira linha.",
          blocos: [
            ["p", "O erro mais caro de quem começa não é escolher a estrutura de dados errada: é começar a escrever. Dez minutos de perguntas poupam três horas de código que resolve o problema errado."],
            ["p", "Quando te chega um pedido, seja de um exercício ou de um colega, responde a estas sete perguntas por escrito. Demora menos do que parece."],
            ["lista", [
              "**O que entra?** Que tipos, em que formato, vindo de onde. 'Uma lista de vendas' não chega: lista de quê, com que campos, sempre preenchidos?",
              "**O que sai?** Tipo exato e formato exato. Uma lista? Um dicionário? Texto formatado? Com que ordem?",
              "**Que exemplos consigo escrever já?** Pelo menos três pares entrada/saída, escritos à mão.",
              "**Quais são os casos limite?** Vazio, um elemento, muitos, repetidos, negativos, o maior possível.",
              "**O que é inválido e o que faço?** Levanto erro, ignoro a linha, ou uso um valor por omissão? Esta é uma decisão de negócio, não técnica.",
              "**Que tamanho tem isto na realidade?** Cem linhas ou cem milhões muda tudo o que vem a seguir.",
              "**Quem chama isto e o que faz com o resultado?** Decide a assinatura melhor do que qualquer teoria."
            ]],
            ["h", "A tabela de exemplos"],
            ["p", "Escreve as respostas à pergunta três numa tabela. Parece trabalho a mais. É a tua lista de testes, já escrita."],
            ["code", "entrada                     -> saída        porquê\n[10, 20, 30]                -> 20.0         caso normal\n[10]                        -> 10.0         um elemento\n[]                          -> ValueError   média de nada não existe\n[10, None, 20]              -> ?            decidir: ignorar ou rebentar?"],
            ["p", "Repara na última linha. Aparece sempre uma linha com um ponto de interrogação, e é sobre essa que vale a pena perguntar a alguém. As outras decides tu."],
            ["h", "Quando não há ninguém a quem perguntar"],
            ["p", "Decide, escolhe a opção mais conservadora, e escreve a decisão onde ela se veja: um comentário, o docstring, a descrição do pull request. 'Assumi que linhas sem data são do dia anterior' é uma frase que salva reuniões."],
            ["obra", "Metade do trabalho de um programador com experiência é transformar 'preciso de um relatório das vendas' em perguntas antes de abrir o editor. Quem só pergunta depois de ter escrito, reescreve. E numa equipa, quem faz as perguntas certas na reunião de refinamento ganha reputação mais depressa do que quem escreve mais código."],
            ["aviso", "'Faz sentido?' não é uma pergunta útil ao teu chefe de equipa, porque a resposta é sempre sim. 'Para pedidos cancelados, conto o valor ou não?' é uma pergunta a que só existe uma resposta e que muda o código."]
          ],
          quiz: [
            { p: "Pedem-te 'uma função que calcula a média das notas'. Qual é a pergunta mais importante antes de escrever?", o: ["Que nome dou à função", "O que devolve quando a lista está vazia", "Uso NumPy ou Python puro"], c: 1,
              e: "É o caso limite que a função vai encontrar no primeiro dia e sobre o qual o enunciado não diz nada. Zero, `None` ou erro são três comportamentos diferentes e quem pediu tem uma opinião." }
          ],
          exercicio: {
            enunciado: "Aplica as perguntas e implementa `partir_em_lotes(itens, tamanho)`, que parte uma lista em sublistas de no máximo `tamanho` elementos. O último lote pode ser menor. Lista vazia dá lista vazia. `tamanho` menor que 1 levanta `ValueError`. Não altera a lista recebida.",
            inicio: "def partir_em_lotes(itens, tamanho):\n    pass\n",
            testes: "verifica('divisao exata', partir_em_lotes([1, 2, 3, 4], 2) == [[1, 2], [3, 4]])\nverifica('ultimo lote menor', partir_em_lotes([1, 2, 3], 2) == [[1, 2], [3]])\nverifica('lote maior que a lista', partir_em_lotes([1, 2], 5) == [[1, 2]])\nverifica('lista vazia', partir_em_lotes([], 3) == [])\nverifica('tamanho um', partir_em_lotes([1, 2], 1) == [[1], [2]])\n_erro = 0\nfor _t in [0, -1]:\n    try:\n        partir_em_lotes([1], _t)\n    except ValueError:\n        _erro += 1\nverifica('tamanho invalido levanta ValueError', _erro == 2)\n_orig = [1, 2, 3]\npartir_em_lotes(_orig, 2)\nverifica('nao altera a lista recebida', _orig == [1, 2, 3])"
          }
        },
        {
          id: "7.2", titulo: "Decompor: do papel às funções", min: 17, estado: "pronta",
          meta: "No fim: escreves o esqueleto de um programa inteiro antes de escreveres o corpo de qualquer função.",
          blocos: [
            ["p", "Quem começa escreve uma função de oitenta linhas. Quem trabalha nisto há tempo escreve seis de oito. Não é gosto pessoal: uma função pequena tem nome, pode ser testada sozinha, e quando rebenta o traceback diz-te logo qual das seis é."],
            ["h", "Esqueleto primeiro, corpo depois"],
            ["p", "Escreve os nomes e as docstrings, com `pass` lá dentro. Vês a forma toda do programa antes de te enterrares no primeiro detalhe, e percebes cedo se a divisão está má, que é quando ainda é barato mudar."],
            ["code", "def ler_linhas(caminho):\n    \"\"\"Lê o ficheiro e devolve uma lista de dicionários, um por linha.\"\"\"\n\n\ndef validar(linha):\n    \"\"\"Devolve None se a linha está bem, ou o motivo da rejeição.\"\"\"\n\n\ndef agregar(linhas):\n    \"\"\"Soma os valores por produto. Devolve produto -> total.\"\"\"\n\n\ndef formatar(totais):\n    \"\"\"Devolve as linhas do relatório, já ordenadas.\"\"\"\n\n\ndef main(caminho):\n    linhas = ler_linhas(caminho)\n    boas = [l for l in linhas if validar(l) is None]\n    return formatar(agregar(boas))"],
            ["p", "A `main` lê-se como o enunciado do problema. Isso não é um acidente bonito: é o objetivo. Se a tua `main` não se lê assim, a divisão está errada."],
            ["h", "Um nível de abstração por função"],
            ["p", "Se uma função abre ficheiros **e** calcula IVA, são duas funções. A regra prática: o corpo de uma função deve ler-se todo à mesma altura, como um resumo. Misturar `open()` com `round(preco * 1.23, 2)` na mesma função é misturar duas alturas."],
            ["h", "Empurra a entrada e a saída para as bordas"],
            ["p", "Uma função pura recebe valores, devolve valores, e não toca em mais nada: nem ficheiros, nem rede, nem relógio, nem variáveis globais. Dá a mesma resposta para a mesma pergunta, sempre. É trivial de testar e é onde deve viver a lógica de negócio."],
            ["py", "# difícil de testar: lê, calcula e escreve tudo junto\ndef relatorio_mau(caminho):\n    with open(caminho) as f:\n        total = sum(float(l) for l in f)\n    print(f\"total: {total}\")\n\n\n# fácil de testar: o cálculo é puro, a borda faz o resto\ndef total_de(linhas):\n    return sum(float(l) for l in linhas)\n\n\nprint(total_de([\"10\", \"20.5\"]))"],
            ["p", "Repara no que ganhaste: para testar `total_de` não precisas de ficheiro nenhum. É esta separação que faz a diferença entre uma suite de testes rápida e uma que ninguém corre."],
            ["obra", "Ler, validar, transformar, escrever. Esta é a forma de noventa por cento do software de empresa, do script de importação ao serviço web. Saber em qual destas quatro caixas é que um pedaço de código deve viver é mais arquitetura do que a maioria do código que vais encontrar."],
            ["aviso", "Decompor a mais também custa. Quinze funções de duas linhas, cada uma chamada num sítio só, obrigam a saltar por todo o ficheiro para perceber uma coisa simples. Uma função existe quando tem um nome honesto; se o melhor nome que arranjas é `processar_parte_2`, junta-a outra vez."]
          ],
          quiz: [
            { p: "Tens uma função de sessenta linhas que lê um ficheiro, valida, calcula e imprime. Qual é a primeira coisa a fazer?", o: ["Dividir a meio, em duas de trinta", "Separar a leitura e a escrita do cálculo, para poderes testar o cálculo sem ficheiros", "Acrescentar comentários a explicar cada parte"], c: 1,
              e: "Cortar pelo meio dá duas funções sem nome honesto. Cortar pelas bordas de entrada e saída dá-te uma função pura no meio, que é a parte que tem lógica e a que interessa testar." }
          ],
          exercicio: {
            enunciado: "Constrói um pequeno relatório por decomposição, em três funções. `analisar(linha)` recebe `'teclado;39.90;2'` e devolve `('teclado', 79.8)`, ou `None` se a linha for inválida. `agregar(linhas)` devolve um dicionário produto para total, ignorando as linhas inválidas. `relatorio(linhas)` devolve linhas de texto como `'teclado: 79.80'`, ordenadas por total decrescente e, em caso de empate, por nome.",
            inicio: "def analisar(linha):\n    pass\n\n\ndef agregar(linhas):\n    pass\n\n\ndef relatorio(linhas):\n    pass\n",
            testes: "verifica('analisa uma linha', analisar('teclado;39.90;2') == ('teclado', 79.8))\nverifica('valor invalido devolve None', analisar('teclado;abc;2') is None)\nverifica('campos a menos devolve None', analisar('teclado;39.90') is None)\nverifica('agrega o mesmo produto', agregar(['rato;10.00;1', 'rato;10.00;2']) == {'rato': 30.0})\nverifica('ignora linhas invalidas', agregar(['rato;10.00;1', 'lixo']) == {'rato': 10.0})\nverifica('relatorio ordenado por total', relatorio(['rato;10.00;1', 'teclado;39.90;2']) == ['teclado: 79.80', 'rato: 10.00'])\nverifica('empate resolvido por nome', relatorio(['b;10.00;1', 'a;10.00;1']) == ['a: 10.00', 'b: 10.00'])\nverifica('sem linhas', relatorio([]) == [])"
          }
        },
        {
          id: "7.3", titulo: "Resolver em voz alta, do princípio ao fim", min: 18, estado: "pronta",
          meta: "No fim: viste o processo completo de resolver um problema, hesitações incluídas, e sabes imitá-lo.",
          blocos: [
            ["p", "Esta aula é uma transcrição. O problema é real e aparece em entrevistas e no trabalho: **dado um registo de acessos, diz-me as três páginas com mais erros de servidor**."],
            ["code", "GET /produtos 200\nGET /carrinho 500\nPOST /pagamento 503\nGET /carrinho 500\nGET /inicio 200\nPOST /pagamento 500"],
            ["h", "Passo 1: perguntas, antes de tudo"],
            ["lista", [
              "O que conta como erro de servidor? Só 500, ou tudo a partir de 500? **Decido: 500 ou mais.**",
              "E se houver empate na contagem? **Decido: ordem alfabética, para o relatório ser reprodutível.**",
              "E se houver menos de três páginas com erros? **Decido: devolvo as que há.**",
              "E linhas com formato estranho? **Decido: ignoro, mas conto quantas ignorei.**",
              "Quantas linhas tem isto? Se forem milhões, não leio tudo para memória."
            ]],
            ["h", "Passo 2: exemplos escritos à mão"],
            ["code", "as 6 linhas acima, n=3  -> ['/carrinho', '/pagamento']   (só há dois com erros)\n[], n=3                 -> []\nlinhas sem erros, n=3   -> []\n['GET /a 500'], n=0     -> []"],
            ["h", "Passo 3: a versão mais burra que funciona"],
            ["py", "linhas = [\"GET /produtos 200\", \"GET /carrinho 500\", \"POST /pagamento 503\",\n          \"GET /carrinho 500\", \"GET /inicio 200\", \"POST /pagamento 500\"]\n\ncontagens = {}\nfor linha in linhas:\n    partes = linha.split()\n    if len(partes) != 3:\n        continue\n    _, url, codigo = partes\n    if int(codigo) >= 500:\n        contagens[url] = contagens.get(url, 0) + 1\n\nprint(contagens)"],
            ["p", "Está feio, está numa só tira, e funciona. Isto é um ponto de partida legítimo e é muito melhor do que uma solução elegante que não corre. Nunca fiques preso a tentar acertar à primeira."],
            ["h", "Passo 4: os casos limite que eu próprio listei"],
            ["p", "`int(codigo)` rebenta se o código não for um número. O enunciado dizia para ignorar linhas estranhas, não para rebentar. Corrijo, e aproveito para contar as ignoradas, que era outra decisão minha."],
            ["h", "Passo 5: arrumar, agora que funciona"],
            ["py", "from collections import Counter\n\n\ndef paginas_com_mais_erros(linhas, n=3):\n    contagens = Counter()\n    ignoradas = 0\n    for linha in linhas:\n        partes = linha.split()\n        if len(partes) != 3 or not partes[2].isdigit():\n            ignoradas += 1\n            continue\n        _, url, codigo = partes\n        if int(codigo) >= 500:\n            contagens[url] += 1\n    ordenadas = sorted(contagens.items(), key=lambda p: (-p[1], p[0]))\n    return [url for url, _ in ordenadas[:n]], ignoradas\n\n\nlinhas = [\"GET /produtos 200\", \"GET /carrinho 500\", \"POST /pagamento 503\",\n          \"GET /carrinho 500\", \"lixo\", \"POST /pagamento 500\"]\nprint(paginas_com_mais_erros(linhas))"],
            ["h", "Passo 6: o que ficou por fazer, dito em voz alta"],
            ["lista", [
              "Com um ficheiro de dez milhões de linhas, leio com um gerador em vez de carregar tudo (módulo 12.1).",
              "Se isto correr todos os dias, quero o número de ignoradas no registo, senão a qualidade dos dados degrada-se sem ninguém ver.",
              "A ordenação completa é desnecessária: `Counter.most_common(n)` chega. Deixei `sorted` porque preciso do desempate alfabético."
            ]],
            ["obra", "Numa entrevista técnica é exatamente isto que estão a avaliar: perguntas, exemplos, versão simples, casos limite, melhoria, e o que ficou por fazer. Chegar à solução ótima em silêncio pontua menos do que este percurso falado, porque no trabalho ninguém programa sozinho em silêncio."],
            ["aviso", "Começar pela versão esperta é a forma mais rápida de ficar preso vinte minutos. Se estás preso, escreve a versão burra, mesmo que seja lenta e feia. Ter código que funciona muda a natureza do problema: passas a melhorar em vez de adivinhar."]
          ],
          quiz: [
            { p: "Estás há vinte minutos preso numa solução elegante que não funciona. O que fazes?", o: ["Continuas, já estás quase", "Escreves a versão mais simples que funcione, mesmo que lenta, e melhoras a partir daí", "Procuras a solução na internet"], c: 1,
              e: "Código a funcionar é uma base para melhorar e é uma resposta entregável. Uma solução elegante por acabar não vale nada, nem numa entrevista nem numa sprint." }
          ],
          exercicio: {
            enunciado: "Implementa `paginas_com_mais_erros(linhas, n)`. Cada linha é `'MÉTODO /url CÓDIGO'`. Conta apenas as linhas com código maior ou igual a 500 e devolve as `n` páginas com mais erros, da mais frequente para a menos. Empates resolvem-se por ordem alfabética. Linhas que não tenham exatamente três partes, ou cujo código não seja um número, são ignoradas.",
            inicio: "def paginas_com_mais_erros(linhas, n):\n    pass\n",
            testes: "_linhas = ['GET /produtos 200', 'GET /carrinho 500', 'POST /pagamento 503', 'GET /carrinho 500', 'GET /inicio 200', 'POST /pagamento 500']\nverifica('conta e ordena', paginas_com_mais_erros(_linhas, 3) == ['/carrinho', '/pagamento'])\nverifica('limita a n', paginas_com_mais_erros(_linhas, 1) == ['/carrinho'])\nverifica('empate por ordem alfabetica', paginas_com_mais_erros(['GET /b 500', 'GET /a 500'], 2) == ['/a', '/b'])\nverifica('sem erros devolve vazio', paginas_com_mais_erros(['GET /a 200'], 3) == [])\nverifica('sem linhas', paginas_com_mais_erros([], 3) == [])\nverifica('n zero', paginas_com_mais_erros(_linhas, 0) == [])\nverifica('ignora linhas estranhas', paginas_com_mais_erros(['lixo', 'GET /a xpto', 'GET /a 500'], 3) == ['/a'])\nverifica('codigo 499 nao e erro de servidor', paginas_com_mais_erros(['GET /a 499'], 3) == [])"
          }
        }
      ]
    },

    /* ---------------- FASE 2 ---------------- */
    {
      n: 8, fase: 2, titulo: "Erros e exceções",
      objetivo: "Falhar de forma controlada em vez de esconder problemas.",
      licoes: [
        {
          id: "8.1", titulo: "try, except, else, finally", min: 14, estado: "pronta",
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
          id: "8.2", titulo: "Exceções próprias e validação", min: 12, estado: "pronta",
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
            ["obra", "Em APIs, este padrão é o que separa um 500 de um 400 com mensagem útil. O `ErroDeValidacao` do teu domínio é apanhado na camada web e traduzido para uma resposta com o campo que falhou. Vais fazer isso no módulo 20."],
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
      n: 9, fase: 2, titulo: "Ficheiros, JSON e CSV",
      objetivo: "Ler e escrever dados que sobrevivem ao fim do programa.",
      licoes: [
        {
          id: "9.1", titulo: "pathlib e o gestor de contexto", min: 14, estado: "pronta",
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
          id: "9.2", titulo: "CSV e JSON na prática", min: 16, estado: "pronta",
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
          id: "9.3", titulo: "Registo com logging", min: 12, estado: "pronta",
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
      n: 10, fase: 2, titulo: "Módulos, ambientes e dependências",
      objetivo: "Deixar de ter um ficheiro gigante e de partir o Python do sistema.",
      licoes: [
        {
          id: "10.1", titulo: "import, módulos e pacotes", min: 14, estado: "pronta",
          meta: "No fim: divides um programa em ficheiros com fronteiras claras e sem importações circulares.",
          blocos: [
            ["p", "Um módulo é um ficheiro `.py`. Um pacote é uma pasta com módulos lá dentro. Importar é executar esse ficheiro uma vez e ficar com os nomes dele acessíveis. Não há mais mistério nenhum."],
            ["code", "vendas/\n  __init__.py\n  importador.py\n  relatorio.py\n  modelos.py\ntestes/\n  test_relatorio.py\nmain.py"],
            ["h", "As formas de importar"],
            ["code", "import json                          # nome completo: json.loads(...)\nimport pandas as pd                  # alias, convenção da biblioteca\nfrom pathlib import Path             # traz só o que precisas\nfrom vendas.relatorio import resumir # o teu próprio código\n\nfrom vendas.relatorio import *       # nunca faças isto"],
            ["p", "O `import *` traz nomes que não sabes quais são, esconde de onde veio cada coisa e parte assim que o outro módulo crescer. É proibido em quase todos os projetos sérios, e o `ruff` do módulo 15 apanha-o."],
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
          id: "10.2", titulo: "Ambientes virtuais e pip", min: 14, estado: "pronta",
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
      n: 11, fase: 2, titulo: "Objetos",
      objetivo: "Perceber classes o suficiente para ler o código dos outros.",
      licoes: [
        {
          id: "11.1", titulo: "Classes, estado e métodos", min: 18, estado: "pronta",
          meta: "No fim: modelas uma coisa com estado e comportamento, e sabes quando não vale a pena.",
          blocos: [
            ["p", "Uma classe junta dados e as operações que fazem sentido sobre esses dados. Se tens três funções que recebem sempre os mesmos quatro argumentos, provavelmente tens uma classe escondida."],
            ["py", "class Conta:\n    def __init__(self, titular, saldo=0):\n        self.titular = titular\n        self.saldo = saldo\n\n    def depositar(self, valor):\n        if valor <= 0:\n            raise ValueError(\"depósito tem de ser positivo\")\n        self.saldo += valor\n        return self.saldo\n\n    def levantar(self, valor):\n        if valor > self.saldo:\n            raise ValueError(f\"saldo insuficiente: tem {self.saldo}\")\n        self.saldo -= valor\n        return self.saldo\n\nc = Conta(\"Ana\", 100)\nc.depositar(50)\nprint(c.titular, c.saldo)\nprint(c.levantar(30))"],
            ["p", "`__init__` corre quando crias o objeto e é onde se define o estado inicial. `self` é o próprio objeto e é sempre o primeiro parâmetro dos métodos. Não é opcional e não é magia: é o objeto passado explicitamente."],
            ["h", "Instância contra classe"],
            ["py", "class Conta:\n    banco = \"Caixa Central\"        # partilhado por todas as contas\n\n    def __init__(self, titular):\n        self.titular = titular      # próprio de cada conta\n\na = Conta(\"Ana\")\nb = Conta(\"Rui\")\nprint(a.banco, b.banco)\nConta.banco = \"Novo Banco\"\nprint(a.banco, b.banco)"],
            ["aviso", "Nunca uses uma lista ou um dicionário como atributo de classe para guardar estado de instância. É o mesmo objeto para todos os objetos criados, tal como o argumento por omissão do módulo 6. Inicializa em `__init__`."],
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
          id: "11.2", titulo: "dataclasses", min: 12, estado: "pronta",
          meta: "No fim: modelas dados com quatro linhas em vez de trinta, com igualdade e repr de graça.",
          blocos: [
            ["p", "Grande parte das classes que vais escrever só guardam campos. Escrever `__init__`, `__repr__` e `__eq__` à mão para isso é trabalho repetido e é onde entram erros de distração. O decorador `@dataclass` gera tudo."],
            ["py", "from dataclasses import dataclass\n\n@dataclass\nclass Produto:\n    nome: str\n    preco: float\n    quantidade: int = 1\n\n    def total(self):\n        return round(self.preco * self.quantidade, 2)\n\np = Produto(\"teclado\", 39.9, 2)\nprint(p)\nprint(p.total())\nprint(Produto(\"rato\", 12.5) == Produto(\"rato\", 12.5))"],
            ["p", "Repara em três coisas: o `print` mostra os campos, a comparação por valor funciona, e a anotação de tipo deixou de ser opcional, é ela que declara o campo. O módulo 6 acabou de se pagar."],
            ["h", "Campos com valores por omissão"],
            ["aviso", "O mesmo problema do argumento mutável aparece aqui e o Python recusa-se a deixar. Uma lista como valor por omissão dá `ValueError: mutable default`. A solução é `field(default_factory=list)`."],
            ["py", "from dataclasses import dataclass, field\n\n@dataclass\nclass Encomenda:\n    cliente: str\n    itens: list[str] = field(default_factory=list)\n    notas: dict = field(default_factory=dict)\n\na = Encomenda(\"Ana\")\nb = Encomenda(\"Rui\")\na.itens.append(\"teclado\")\nprint(a)\nprint(b)"],
            ["h", "Imutável quando faz sentido"],
            ["p", "`frozen=True` cria objetos que não mudam depois de criados. Servem de chave de dicionário, são seguros para partilhar entre funções e evitam a categoria inteira de bugs em que alguém alterou o objeto a meio."],
            ["py", "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Coordenada:\n    latitude: float\n    longitude: float\n\nlisboa = Coordenada(38.72, -9.14)\nprint({lisboa: \"sede\"})\nlisboa.latitude = 0"],
            ["h", "Ferramentas úteis"],
            ["py", "from dataclasses import dataclass, asdict, replace\n\n@dataclass\nclass Produto:\n    nome: str\n    preco: float\n\np = Produto(\"cabo\", 4.0)\nprint(asdict(p))\nprint(replace(p, preco=5.0))\nprint(p)"],
            ["obra", "Em vez de passar dicionários entre camadas e rezar para que a chave 'quantidade' esteja lá escrita da mesma maneira, converte para `dataclass` à entrada. O editor passa a completar os campos e um erro de escrita fica um `AttributeError` imediato em vez de um `KeyError` três funções à frente."],
            ["p", "Quando os dados vêm de fora e precisam de validação a sério, o passo seguinte é o Pydantic, no módulo 20. As `dataclasses` não validam nada: `Produto(\"cabo\", \"muito caro\")` cria-se sem se queixar."]
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
          id: "11.3", titulo: "Composição contra herança", min: 14, estado: "pronta",
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
            ["p", "Quando é mesmo uma relação de tipo e a base é estável: exceções próprias, como no módulo 8, classes base de frameworks, e classes abstratas que definem um contrato. Uma camada, no máximo duas. A partir daí é dívida técnica."],
            ["py", "class ErroDePagamento(Exception):\n    pass\n\nclass CartaoRecusado(ErroDePagamento):\n    pass\n\ntry:\n    raise CartaoRecusado(\"fundos insuficientes\")\nexcept ErroDePagamento as e:\n    print(type(e).__name__, e)"],
            ["h", "Injetar em vez de construir"],
            ["p", "Repara que o `Notificador` recebe o canal já feito em vez de o criar lá dentro. Isso chama-se injeção de dependências e é o que torna o código testável: no teste passas um canal falso que guarda a mensagem numa lista, e testas sem enviar nada a ninguém."],
            ["py", "class CanalFalso:\n    def __init__(self):\n        self.enviadas = []\n\n    def enviar(self, mensagem):\n        self.enviadas.append(mensagem)\n        return \"ok\"\n\nclass Notificador:\n    def __init__(self, canal):\n        self.canal = canal\n\n    def enviar(self, mensagem):\n        return self.canal.enviar(mensagem)\n\nfalso = CanalFalso()\nNotificador(falso).enviar(\"teste\")\nprint(falso.enviadas)"],
            ["obra", "Numa entrevista, 'porque é que preferes composição a herança' é uma pergunta de rotina. A resposta que impressiona não é a definição: é dizer que composição permite trocar uma peça sem tocar nas outras, e que a herança acopla o teu código a decisões que outra pessoa tomou há dois anos."],
            ["aviso", "Herdar de `dict` ou de `list` para lhes acrescentar um método parece prático e traz surpresas: muitos métodos internos não passam pela tua versão. Se precisas de comportamento novo, compõe: guarda o dicionário num atributo."]
          ],
          quiz: [
            { p: "Precisas de testar uma classe que envia emails a sério. Qual é o desenho que te salva?", o: ["Herdar dela no teste e reescrever o método", "Receber o canal de envio como argumento e passar um falso no teste", "Usar uma variável global para desligar o envio"], c: 1,
              e: "Injeção de dependências. O teste passa um objeto que guarda a mensagem numa lista, corre em milissegundos e não depende de rede. É o módulo 18.2 inteiro." }
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
      n: 12, fase: 2, titulo: "Iteradores e geradores",
      objetivo: "Processar mais dados do que a memória aguenta.",
      licoes: [
        {
          id: "12.1", titulo: "yield e avaliação preguiçosa", min: 16, estado: "pronta",
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
            ["p", "`yield from` delega noutro iterável e evita um ciclo de repetição. Já o viste no módulo 18, na função que percorria as páginas de uma API."],
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
          id: "12.2", titulo: "itertools útil", min: 12, estado: "pronta",
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
              "`enumerate` para posição e valor, do módulo 4."
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

    {
      n: 13, fase: 2, titulo: "Algoritmos e complexidade",
      objetivo: "A base algorítmica que aparece em entrevistas e no código lento do trabalho.",
      licoes: [
        {
          id: "13.1", titulo: "Contar operações: ler O(n) sem matemática", min: 16, estado: "pronta",
          meta: "No fim: olhas para um ciclo e dizes como é que ele se porta com mil vezes mais dados.",
          blocos: [
            ["p", "Complexidade não é matemática, é um hábito: contar quantas vezes a linha de dentro corre, em função do tamanho dos dados. Chama-se `n` ao tamanho e escreve-se o resultado como O de qualquer coisa. É tudo."],
            ["py", "dados = list(range(200))\n\noperacoes = 0\nfor a in dados:\n    for b in dados:\n        operacoes += 1\n\nprint(\"n =\", len(dados))\nprint(\"operações =\", operacoes)\nprint(\"ou seja, n ao quadrado:\", len(dados) ** 2)"],
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
            ["code", "n = 1 000          n = 1 000 000\nO(1)          1                    1\nO(log n)     10                   20\nO(n)      1 000            1 000 000\nO(n log n) 10 000           20 000 000\nO(n²)  1 000 000  1 000 000 000 000"],
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
            ["aviso", "A complexidade conta operações, não segundos. Um ciclo linear com uma consulta à base de dados em cada volta é muito pior do que um ciclo quadrático em memória sobre cem elementos. Usa a notação para escolher algoritmos e o relógio para decidir se vale a pena (módulo 17.5)."]
          ],
          quiz: [
            { p: "Tens duas listas de dez mil elementos e, para cada elemento de A, verificas `if x in B`. Quantas comparações no pior caso?", o: ["Vinte mil", "Cem milhões", "Dez mil"], c: 1,
              e: "Dez mil elementos vezes uma procura linear de dez mil. Transformar B num `set` uma vez custa dez mil e faz as procuras caírem para constantes: cem milhões passam a vinte mil." }
          ],
          exercicio: {
            enunciado: "Escreve `tem_duplicados(itens)`, que diz se há algum elemento repetido. Tem de ser linear: há um teste com cinco mil elementos e limite de tempo, que a solução com um ciclo dentro de outro não passa.",
            inicio: "def tem_duplicados(itens):\n    pass\n",
            testes: "verifica('sem duplicados', tem_duplicados([1, 2, 3]) is False)\nverifica('com duplicados', tem_duplicados([1, 2, 1]) is True)\nverifica('lista vazia', tem_duplicados([]) is False)\nverifica('um elemento', tem_duplicados([7]) is False)\nverifica('texto tambem', tem_duplicados(['a', 'b', 'a']) is True)\nverifica('duplicado no fim', tem_duplicados([1, 2, 3, 3]) is True)\nimport time as _tempo\n_grande = list(range(5000))\n_inicio = _tempo.perf_counter()\n_r = tem_duplicados(_grande)\n_demora = _tempo.perf_counter() - _inicio\nverifica('correto com muitos dados', _r is False)\nverifica('linear e nao quadratico', _demora < 0.5)"
          }
        },
        {
          id: "13.2", titulo: "Pesquisa: linear, binária e índices", min: 17, estado: "pronta",
          meta: "No fim: escolhes entre percorrer, cortar ao meio e perguntar diretamente, e sabes justificar a escolha.",
          blocos: [
            ["p", "Há três maneiras de encontrar uma coisa, e a escolha entre elas é metade das decisões de desempenho que vais tomar: percorrer tudo, cortar ao meio, ou ir direto."],
            ["h", "Percorrer: simples e linear"],
            ["py", "def procurar(itens, alvo):\n    for i, item in enumerate(itens):\n        if item == alvo:\n            return i\n    return -1\n\nprint(procurar([\"ana\", \"rui\", \"eva\"], \"eva\"))"],
            ["p", "Não precisa de nada: nem ordem, nem preparação. Para cem elementos é a resposta certa e não se fala mais nisso."],
            ["h", "Cortar ao meio: pesquisa binária"],
            ["p", "Se a lista estiver **ordenada**, comparas com o elemento do meio e deitas fora metade. Depois outra metade. Um milhão de elementos resolve-se em vinte comparações."],
            ["py", "def binaria(ordenados, alvo):\n    baixo, alto = 0, len(ordenados) - 1\n    passos = 0\n    while baixo <= alto:\n        passos += 1\n        meio = (baixo + alto) // 2\n        if ordenados[meio] == alvo:\n            return meio, passos\n        if ordenados[meio] < alvo:\n            baixo = meio + 1\n        else:\n            alto = meio - 1\n    return -1, passos\n\nmilhao = list(range(1000000))\nprint(binaria(milhao, 999999))\nprint(binaria(milhao, -1))"],
            ["aviso", "Os três bugs clássicos da pesquisa binária: usar `while baixo < alto` e falhar o último elemento; escrever `alto = meio` em vez de `meio - 1` e ficar num ciclo infinito; e esquecer que a lista tem de estar ordenada, o que devolve respostas erradas em silêncio, que é o pior tipo de erro."],
            ["h", "O módulo bisect, que já faz isto"],
            ["py", "import bisect\n\ndatas = [1, 3, 5, 7, 9, 11]\nprint(bisect.bisect_left(datas, 7))\nprint(bisect.bisect_left(datas, 6))\n\n# todos os valores entre 3 e 9, inclusive\ni = bisect.bisect_left(datas, 3)\nj = bisect.bisect_right(datas, 9)\nprint(datas[i:j])\n\nbisect.insort(datas, 6)\nprint(datas)"],
            ["p", "Repara no último exemplo: pesquisa binária serve para intervalos, não só para 'existe ou não'. Encontrar todos os registos entre duas datas numa lista ordenada é isto, e é a razão de existir dos índices das bases de dados (módulo 19.1)."],
            ["h", "Ir direto: o dicionário como índice"],
            ["py", "clientes = [{\"id\": 3, \"nome\": \"Ana\"}, {\"id\": 7, \"nome\": \"Rui\"}]\n\n# construído uma vez, custa n\npor_id = {c[\"id\"]: c for c in clientes}\n\n# cada consulta passa a ser constante\nprint(por_id[7][\"nome\"])\nprint(por_id.get(99, \"não existe\"))"],
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
            { p: "Lista ordenada com um milhão de elementos. Quantos passos no pior caso com pesquisa binária?", o: ["Cerca de mil", "Cerca de vinte", "Um milhão"], c: 1,
              e: "Cada passo deita metade fora. Dois elevado a vinte é mais de um milhão, portanto vinte cortes chegam. É por isso que O(log n) é praticamente de graça." }
          ],
          exercicio: {
            enunciado: "Implementa `busca_binaria(ordenados, alvo)`, que devolve o índice de `alvo` na lista ordenada, ou `-1` se não existir. Não podes usar `.index()`, `in`, nem o módulo `bisect`: há um teste com uma lista grande e limite de tempo que uma procura linear não passa.",
            inicio: "def busca_binaria(ordenados, alvo):\n    pass\n",
            testes: "verifica('encontra no meio', busca_binaria([1, 3, 5, 7, 9], 5) == 2)\nverifica('encontra no inicio', busca_binaria([1, 3, 5], 1) == 0)\nverifica('encontra no fim', busca_binaria([1, 3, 5], 5) == 2)\nverifica('nao existe', busca_binaria([1, 3, 5], 4) == -1)\nverifica('menor que todos', busca_binaria([1, 3, 5], 0) == -1)\nverifica('maior que todos', busca_binaria([1, 3, 5], 9) == -1)\nverifica('lista vazia', busca_binaria([], 1) == -1)\nverifica('um elemento certo', busca_binaria([2], 2) == 0)\nverifica('um elemento errado', busca_binaria([2], 3) == -1)\nimport time as _tempo\n_g = list(range(0, 800000, 2))\n_inicio = _tempo.perf_counter()\n_r = busca_binaria(_g, 799998)\n_demora = _tempo.perf_counter() - _inicio\nverifica('indice certo em lista grande', _r == 399999)\nverifica('nao percorre a lista toda', _demora < 0.05)"
          }
        },
        {
          id: "13.3", titulo: "Ordenar: estabilidade, custo e chaves", min: 15, estado: "pronta",
          meta: "No fim: sabes quanto custa ordenar, o que é uma ordenação estável e porque é que nunca escreves a tua.",
          blocos: [
            ["p", "Já sabes usar `sorted` com `key` (módulo 5.3). Esta aula é sobre o que está por baixo, que é o que te perguntam em entrevista e o que decide se o teu relatório demora um segundo ou um minuto."],
            ["h", "Quanto custa"],
            ["p", "Ordenar por comparações custa n log n, e está provado que não dá para fazer melhor. O `sorted` do Python usa Timsort, que é n log n no pior caso e quase linear quando os dados já vêm parcialmente ordenados, o que acontece muito na vida real."],
            ["lista", [
              "Mil elementos: cerca de dez mil comparações.",
              "Um milhão: cerca de vinte milhões. Segundos, não horas.",
              "Ordenar duas vezes os mesmos dados custa o dobro. Ordena uma vez e guarda."
            ]],
            ["h", "Estável quer dizer que os empates não se mexem"],
            ["p", "Uma ordenação estável mantém a ordem original entre elementos com a mesma chave. O `sorted` do Python é estável, e isso dá-te um truque que quase ninguém conhece: para ordenar por vários critérios, podes ordenar várias vezes, do critério menos importante para o mais importante."],
            ["py", "pessoas = [\n    {\"nome\": \"Rui\", \"dept\": \"vendas\"},\n    {\"nome\": \"Ana\", \"dept\": \"tecnico\"},\n    {\"nome\": \"Bea\", \"dept\": \"vendas\"},\n]\n\npor_nome = sorted(pessoas, key=lambda p: p[\"nome\"])\nfinal = sorted(por_nome, key=lambda p: p[\"dept\"])\nprint([(p[\"dept\"], p[\"nome\"]) for p in final])"],
            ["p", "Dentro de cada departamento, os nomes ficaram por ordem, porque a segunda ordenação não desfez a primeira. Com um tuplo na chave fazias o mesmo numa linha; com duas passagens consegues misturar critérios que não cabem num tuplo, como um que precise de `reverse=True` sobre texto."],
            ["h", "A chave é calculada uma vez por elemento"],
            ["py", "import time\n\nregistos = [{\"nome\": f\"n{i}\", \"valor\": (i * 7919) % 1000} for i in range(20000)]\n\nt = time.perf_counter()\nsorted(registos, key=lambda r: r[\"valor\"])\nprint(f\"com key: {time.perf_counter() - t:.4f}s\")"],
            ["p", "Isto chama-se decorate-sort-undecorate e o Python já o faz por ti: a função `key` corre n vezes, não n log n vezes. É por isso que `key` é sempre melhor do que uma função de comparação, e é por isso que `functools.cmp_to_key` só se usa para código antigo que já tinha um comparador."],
            ["h", "Porque é que escreves uma ordenação uma vez na vida"],
            ["p", "Para perceber o custo. Depois nunca mais: o `sorted` está escrito em C, é estável, e já viu mais casos limite do que tu alguma vez verás. Escrever a tua ordenação em código de produção é um sinal de alarme numa revisão."],
            ["py", "def ordenacao_por_insercao(itens):\n    resultado = list(itens)\n    for i in range(1, len(resultado)):\n        atual = resultado[i]\n        j = i - 1\n        while j >= 0 and resultado[j] > atual:\n            resultado[j + 1] = resultado[j]\n            j -= 1\n        resultado[j + 1] = atual\n    return resultado\n\nprint(ordenacao_por_insercao([5, 2, 9, 1]))"],
            ["p", "É quadrática: cada elemento pode ter de recuar até ao princípio. Para listas pequenas é rápida na prática, e é por isso que o Timsort a usa lá dentro, em pedaços curtos."],
            ["obra", "Em entrevista, 'implementa uma ordenação' é quase sempre um teste de raciocínio, não de memória. A melhor resposta começa por 'em produção usava `sorted`, que é Timsort, n log n e estável; se quer ver-me implementar uma, faço inserção, que é quadrática mas simples'. Dizes as duas coisas e mostras que sabes escolher."],
            ["aviso", "Ordenar uma lista de dicionários por uma chave que às vezes é `None` rebenta com `TypeError`. Trata a ausência na própria `key`, por exemplo `key=lambda r: (r[\"data\"] is None, r[\"data\"])`, que põe os vazios todos no fim."]
          ],
          quiz: [
            { p: "O que ganhas com uma ordenação estável?", o: ["É mais rápida", "Elementos com a mesma chave mantêm a ordem que tinham, o que te deixa ordenar por critérios em passagens sucessivas", "Usa menos memória"], c: 1,
              e: "Estabilidade é uma garantia de comportamento, não de velocidade. Sem ela, o resultado dos empates seria arbitrário e o teu relatório mudava de ordem entre execuções." }
          ],
          exercicio: {
            enunciado: "Implementa `ordenar_por(registos, chave)`, que devolve uma lista nova ordenada pelo valor dessa chave, sem alterar a recebida. Tem de ser **estável**: empates mantêm a ordem original. Escreve o algoritmo à mão, por inserção: o `sorted` está bloqueado nos testes.",
            inicio: "def ordenar_por(registos, chave):\n    pass\n",
            testes: "_sorted_real = sorted\ndef _proibido(*a, **k):\n    raise AssertionError('escreve o algoritmo a mao, sem sorted()')\nsorted = _proibido\nverifica('ordena por chave', ordenar_por([{'n': 3}, {'n': 1}], 'n') == [{'n': 1}, {'n': 3}])\nverifica('estavel nos empates', [r['id'] for r in ordenar_por([{'n': 1, 'id': 'a'}, {'n': 1, 'id': 'b'}, {'n': 0, 'id': 'c'}], 'n')] == ['c', 'a', 'b'])\nverifica('lista vazia', ordenar_por([], 'n') == [])\nverifica('um elemento', ordenar_por([{'n': 5}], 'n') == [{'n': 5}])\nverifica('ja ordenada', ordenar_por([{'n': 1}, {'n': 2}], 'n') == [{'n': 1}, {'n': 2}])\nverifica('ordem inversa', ordenar_por([{'n': 3}, {'n': 2}, {'n': 1}], 'n') == [{'n': 1}, {'n': 2}, {'n': 3}])\nverifica('ordena texto', ordenar_por([{'x': 'b'}, {'x': 'a'}], 'x') == [{'x': 'a'}, {'x': 'b'}])\n_orig = [{'n': 2}, {'n': 1}]\nordenar_por(_orig, 'n')\nverifica('nao altera a lista recebida', _orig == [{'n': 2}, {'n': 1}])\nsorted = _sorted_real"
          }
        },
        {
          id: "13.4", titulo: "Recursão, e quando não usar", min: 16, estado: "pronta",
          meta: "No fim: percorres estruturas encaixadas com recursão e sabes converter para ciclo quando o limite aperta.",
          blocos: [
            ["p", "Uma função recursiva chama-se a si própria. Precisa de duas coisas e falha sempre pela falta de uma delas: um caso base, que devolve sem chamar mais ninguém, e um passo que se aproxima do caso base."],
            ["py", "def fatorial(n):\n    if n <= 1:        # caso base\n        return 1\n    return n * fatorial(n - 1)   # passo que aproxima\n\nprint(fatorial(5))"],
            ["h", "Onde a recursão é mesmo a resposta certa"],
            ["p", "Estruturas em árvore: JSON encaixado, pastas dentro de pastas, categorias com subcategorias, expressões. São coisas definidas em termos de si próprias, e o código que as percorre fica igual à definição."],
            ["py", "def recolher(estrutura, campo):\n    encontrados = []\n    if isinstance(estrutura, dict):\n        for chave, valor in estrutura.items():\n            if chave == campo:\n                encontrados.append(valor)\n            encontrados.extend(recolher(valor, campo))\n    elif isinstance(estrutura, list):\n        for item in estrutura:\n            encontrados.extend(recolher(item, campo))\n    return encontrados\n\ndados = {\"nome\": \"raiz\", \"filhos\": [{\"nome\": \"a\", \"filhos\": [{\"nome\": \"b\", \"filhos\": []}]}]}\nprint(recolher(dados, \"nome\"))"],
            ["h", "O limite"],
            ["p", "Cada chamada ocupa uma entrada na pilha e o Python corta a partir de cerca de mil. Não há otimização de chamada final como noutras linguagens: `RecursionError` é o que recebes, e num servidor é o que mata o pedido."],
            ["code", "import sys\nprint(sys.getrecursionlimit())   # 1000, tipicamente\n\ndef contar(n):\n    return 0 if n == 0 else 1 + contar(n - 1)\n\ncontar(10000)   # RecursionError: maximum recursion depth exceeded"],
            ["aviso", "Aumentar o limite com `sys.setrecursionlimit` é a solução errada em quase todos os casos: continuas a gastar pilha a sério e o que ganhas é um estouro do interpretador em vez de uma exceção. Converte para ciclo."],
            ["h", "Converter para ciclo com uma pilha explícita"],
            ["py", "def recolher_iterativo(estrutura, campo):\n    encontrados = []\n    por_ver = [estrutura]\n    while por_ver:\n        atual = por_ver.pop()\n        if isinstance(atual, dict):\n            for chave, valor in atual.items():\n                if chave == campo:\n                    encontrados.append(valor)\n                por_ver.append(valor)\n        elif isinstance(atual, list):\n            por_ver.extend(atual)\n    return encontrados\n\ndados = {\"nome\": \"raiz\", \"filhos\": [{\"nome\": \"a\", \"filhos\": []}]}\nprint(recolher_iterativo(dados, \"nome\"))"],
            ["p", "É a mesma ideia: a lista `por_ver` faz o papel da pilha de chamadas. Fica um pouco mais feio e deixa de ter limite de profundidade."],
            ["h", "Memoização: recursão que repete trabalho"],
            ["py", "import functools, time\n\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\n@functools.cache\ndef fib_rapido(n):\n    return n if n < 2 else fib_rapido(n - 1) + fib_rapido(n - 2)\n\nt = time.perf_counter(); fib(27); print(f\"sem cache: {time.perf_counter() - t:.3f}s\")\nt = time.perf_counter(); fib_rapido(27); print(f\"com cache: {time.perf_counter() - t:.5f}s\")"],
            ["p", "A versão sem cache recalcula os mesmos valores milhares de vezes: é exponencial. O decorador `functools.cache` guarda o resultado de cada argumento e transforma-a em linear. Serve para qualquer função pura e cara."],
            ["obra", "Em produção, a recursão aparece em três sítios: percorrer JSON de APIs, percorrer árvores de pastas ou de categorias, e escrever pequenos interpretadores. Tudo o resto costuma ficar mais claro com um ciclo, e o teu revisor vai preferir o ciclo."],
            ["aviso", "Recursão sobre dados que vêm de fora é um risco de segurança: um JSON com dez mil níveis de encaixe rebenta o teu serviço sem esforço nenhum. Se percorres dados de terceiros, ou limitas a profundidade, ou usas a versão iterativa."]
          ],
          quiz: [
            { p: "A tua função recursiva rebenta com `RecursionError` numa árvore de pastas muito funda. O que fazes?", o: ["Aumentas o limite com sys.setrecursionlimit", "Converte-la para um ciclo com uma pilha explícita", "Apanhas a exceção e ignoras"], c: 1,
              e: "A pilha explícita não tem limite prático e o código fica quase igual. Aumentar o limite empurra o problema até o interpretador estoirar, e aí já não há exceção para apanhar." }
          ],
          exercicio: {
            enunciado: "Escreve `soma_profunda(estrutura)`, que soma todos os números dentro de listas encaixadas a qualquer profundidade. Valores que não sejam números são ignorados, e `True` não conta como número.",
            inicio: "def soma_profunda(estrutura):\n    pass\n",
            testes: "verifica('lista simples', soma_profunda([1, 2, 3]) == 6)\nverifica('listas encaixadas', soma_profunda([1, [2, [3, [4]]]]) == 10)\nverifica('ignora texto', soma_profunda([1, 'dois', [3]]) == 4)\nverifica('lista vazia', soma_profunda([]) == 0)\nverifica('so listas vazias', soma_profunda([[], [[]]]) == 0)\nverifica('decimais', soma_profunda([1.5, [2.5]]) == 4.0)\nverifica('booleanos nao contam', soma_profunda([True, 1]) == 1)\nverifica('negativos', soma_profunda([[-2], 2]) == 0)"
          }
        },
        {
          id: "13.5", titulo: "Os cinco padrões que caem em entrevistas", min: 20, estado: "pronta",
          meta: "No fim: reconheces a forma do problema em vez de tentares lembrar-te da solução.",
          blocos: [
            ["p", "A maioria dos exercícios técnicos para júnior de Python são cinco formas com roupas diferentes. Não se trata de decorar soluções: trata-se de reconhecer a forma nos primeiros trinta segundos."],
            ["h", "1. Contar com um dicionário"],
            ["py", "from collections import Counter\n\npalavras = [\"a\", \"b\", \"a\", \"c\", \"a\"]\nprint(Counter(palavras))\nprint(Counter(palavras).most_common(2))\n\n# à mão, que é o que te podem pedir\ncontagens = {}\nfor p in palavras:\n    contagens[p] = contagens.get(p, 0) + 1\nprint(contagens)"],
            ["p", "Aparece como: elemento mais frequente, verificar anagramas, contar ocorrências, detetar duplicados. É linear e resolve quase sempre."],
            ["h", "2. Conjunto de vistos"],
            ["py", "def primeiro_repetido(itens):\n    vistos = set()\n    for item in itens:\n        if item in vistos:\n            return item\n        vistos.add(item)\n    return None\n\nprint(primeiro_repetido([1, 2, 3, 2, 1]))"],
            ["p", "Troca uma procura linear por uma constante à custa de memória. É o truque mais rentável que existe."],
            ["h", "3. Dois ponteiros"],
            ["py", "def par_com_soma(ordenados, alvo):\n    esquerda, direita = 0, len(ordenados) - 1\n    while esquerda < direita:\n        soma = ordenados[esquerda] + ordenados[direita]\n        if soma == alvo:\n            return (ordenados[esquerda], ordenados[direita])\n        if soma < alvo:\n            esquerda += 1\n        else:\n            direita -= 1\n    return None\n\nprint(par_com_soma([1, 3, 4, 7, 11], 11))"],
            ["p", "Serve em listas ordenadas: encontrar pares, juntar duas listas ordenadas, verificar palíndromos. Linear e sem memória extra."],
            ["h", "4. Janela deslizante"],
            ["py", "def maior_soma(numeros, k):\n    soma = sum(numeros[:k])\n    melhor = soma\n    for i in range(k, len(numeros)):\n        soma += numeros[i] - numeros[i - k]   # entra um, sai um\n        melhor = max(melhor, soma)\n    return melhor\n\nprint(maior_soma([1, 2, 5, 1, 3], 2))"],
            ["p", "Sempre que o enunciado disser 'consecutivos', 'seguidos' ou 'num intervalo de tempo', é isto. A ideia é não recalcular: ajusta a soma com o que entra e o que sai."],
            ["h", "5. Agrupar por chave"],
            ["py", "from collections import defaultdict\n\nvendas = [(\"ana\", 10), (\"rui\", 5), (\"ana\", 7)]\npor_pessoa = defaultdict(list)\nfor nome, valor in vendas:\n    por_pessoa[nome].append(valor)\nprint(dict(por_pessoa))"],
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
            { p: "'Encontra o maior total de vendas em sete dias seguidos.' Que padrão é este?", o: ["Dois ponteiros", "Janela deslizante", "Agrupar por chave"], c: 1,
              e: "'Seguidos' e um tamanho fixo é sempre janela deslizante. Somar cada janela do zero é quadrático; ajustar com o que entra e o que sai é linear." }
          ],
          exercicio: {
            enunciado: "Escreve `maior_soma_janela(numeros, k)`, que devolve a maior soma de `k` elementos consecutivos. Se `k` for menor que 1 ou maior que a lista, levanta `ValueError`. Tem de ser linear: somar cada janela do princípio não passa o teste de tempo.",
            inicio: "def maior_soma_janela(numeros, k):\n    pass\n",
            testes: "verifica('janela no meio', maior_soma_janela([1, 2, 5, 1], 2) == 7)\nverifica('janela de um', maior_soma_janela([3, -1, 4], 1) == 4)\nverifica('janela igual a lista', maior_soma_janela([1, 2], 2) == 3)\nverifica('so negativos', maior_soma_janela([-5, -1, -3], 2) == -4)\nverifica('melhor janela no inicio', maior_soma_janela([9, 9, 1, 1], 2) == 18)\n_erro = 0\nfor _k in [0, -1, 3]:\n    try:\n        maior_soma_janela([1, 2], _k)\n    except ValueError:\n        _erro += 1\nverifica('k invalido levanta ValueError', _erro == 3)\nimport time as _tempo\n_g = list(range(30000))\n_inicio = _tempo.perf_counter()\n_r = maior_soma_janela(_g, 300)\n_demora = _tempo.perf_counter() - _inicio\nverifica('resultado certo com muitos dados', _r == sum(range(29700, 30000)))\nverifica('linear e nao quadratico', _demora < 1.0)"
          }
        }
      ]
    },

    /* ---------------- FASE 3 ---------------- */
    {
      n: 14, fase: 3, titulo: "Testes",
      objetivo: "A competência que mais depressa distingue um júnior contratável.",
      licoes: [
        {
          id: "14.1", titulo: "pytest do zero", min: 20, estado: "pronta",
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
              e: "Testes têm de ser rápidos e determinísticos. Chamadas externas substituem-se por dublês (mocks), tema do módulo 18.2." }
          ],
          exercicio: {
            enunciado: "Escreve a função `media(notas)` que devolve a média arredondada a uma casa decimal e levanta `ValueError` se a lista estiver vazia.",
            inicio: "def media(notas):\n    pass\n",
            testes: "verifica('média simples', media([10, 20]) == 15.0)\nverifica('arredonda a uma casa', media([1, 2, 2]) == 1.7)\n_erro = False\ntry:\n    media([])\nexcept ValueError:\n    _erro = True\nverifica('lista vazia levanta ValueError', _erro)"
          }
        },
        {
          id: "14.2", titulo: "Fixtures e organização da suite", min: 16, estado: "pronta",
          meta: "No fim: preparas dados de teste sem os repetir e mantens cada teste isolado dos outros.",
          blocos: [
            ["p", "Uma fixture é código que prepara o que o teste precisa: um objeto, uma base de dados temporária, um ficheiro. O pytest chama-a por ti quando o nome aparece como argumento do teste."],
            ["code", "import pytest\nfrom loja import Carrinho\n\n@pytest.fixture\ndef carrinho():\n    c = Carrinho()\n    c.adicionar(\"teclado\", 39.9)\n    return c\n\ndef test_total_com_um_item(carrinho):\n    assert carrinho.total() == 39.9\n\ndef test_adicionar_soma(carrinho):\n    carrinho.adicionar(\"rato\", 12.5)\n    assert carrinho.total() == 52.4"],
            ["p", "Os dois testes recebem carrinhos diferentes. A fixture corre uma vez por teste, e é isso que garante que o segundo teste não vê o que o primeiro fez. Isolamento é a propriedade que faz uma suite valer alguma coisa."],
            ["h", "conftest.py"],
            ["p", "Fixtures usadas por vários ficheiros vivem num `conftest.py` na pasta de testes. Não precisas de importar nada: o pytest encontra-as sozinho, incluindo nas subpastas."],
            ["code", "testes/\n  conftest.py          # fixtures partilhadas\n  test_carrinho.py\n  test_relatorio.py\n  dados/\n    vendas_exemplo.csv"],
            ["h", "Preparar e limpar"],
            ["p", "Com `yield`, o que está antes corre para preparar e o que está depois corre para limpar, mesmo que o teste rebente. É o gerador do módulo 12 a servir de gestor de contexto."],
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
          id: "14.3", titulo: "Escrever o teste primeiro", min: 14, estado: "pronta",
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
        },
        {
          id: "14.4", titulo: "Testar o que depende do tempo, do acaso e do sistema", min: 16, estado: "pronta",
          meta: "No fim: escreves testes que não falham às sextas-feiras nem no dia 1 de cada mês.",
          blocos: [
            ["p", "Três coisas partem suites de testes: o relógio, o acaso e tudo o que está fora do processo (ficheiros, rede, variáveis de ambiente). A solução é sempre a mesma ideia, com nomes diferentes: em vez de a função ir buscar essas coisas, recebe-as."],
            ["h", "O relógio"],
            ["py", "from datetime import datetime, timedelta\n\n# difícil de testar: vai buscar a hora lá dentro\ndef expirou_mau(criado_em):\n    return (datetime.now() - criado_em).days > 30\n\n# fácil de testar: a hora entra como argumento\ndef expirou(criado_em, agora=None):\n    agora = agora or datetime.now()\n    return (agora - criado_em) > timedelta(days=30)\n\nbase = datetime(2026, 1, 1)\nprint(expirou(base, base + timedelta(days=10)))\nprint(expirou(base, base + timedelta(days=40)))"],
            ["p", "A segunda versão continua a funcionar igual em produção, onde ninguém passa `agora`. Mas no teste passas a hora que quiseres e testas o dia 31, o ano bissexto e a meia-noite sem esperar por eles."],
            ["p", "Isto tem um nome pomposo, injeção de dependências, e é só isto: o que a função precisa, entra pela porta em vez de ser ido buscar."],
            ["h", "O acaso"],
            ["py", "import random\n\ndef sortear(itens, aleatorio=None):\n    aleatorio = aleatorio or random\n    return aleatorio.choice(itens)\n\nprevisivel = random.Random(42)\nprint(sortear([\"a\", \"b\", \"c\"], previsivel))\nprint(sortear([\"a\", \"b\", \"c\"], random.Random(42)))"],
            ["p", "Com a mesma semente sai sempre o mesmo. O teste passa a ser determinístico sem deixar de exercitar o código a sério."],
            ["h", "monkeypatch, quando não podes mudar a assinatura"],
            ["code", "# codigo.py\nimport os\n\ndef destino():\n    return os.environ.get(\"PASTA_SAIDA\", \"/tmp\")\n\n# test_codigo.py\ndef test_usa_a_variavel_de_ambiente(monkeypatch):\n    monkeypatch.setenv(\"PASTA_SAIDA\", \"/dados\")\n    assert destino() == \"/dados\"\n\ndef test_sem_variavel_usa_o_valor_por_omissao(monkeypatch):\n    monkeypatch.delenv(\"PASTA_SAIDA\", raising=False)\n    assert destino() == \"/tmp\""],
            ["p", "O `monkeypatch` do pytest substitui uma coisa durante o teste e repõe o original no fim, mesmo que o teste rebente. Serve para variáveis de ambiente, atributos de módulos e funções. Usa-o quando não controlas o código; quando controlas, prefere passar por argumento."],
            ["h", "O sistema de ficheiros"],
            ["p", "Não inventes um sistema de ficheiros falso: usa a fixture `tmp_path` (módulo 14.2), que te dá uma pasta a sério, nova por teste e apagada no fim. Ficheiros verdadeiros em sítio descartável são mais simples e mais fiéis."],
            ["h", "O que se substitui e o que não"],
            ["lista", [
              "Substitui o que não é teu e é lento, pago ou instável: rede, APIs externas, relógio, acaso, envio de emails.",
              "Não substituas a tua própria lógica de negócio. Um teste que substitui a função que devia estar a testar passa sempre e não prova nada.",
              "Para chamadas HTTP há uma aula inteira, com dublês a sério: módulo 18.2."
            ]],
            ["obra", "Um teste que só falha no dia 1 de cada mês, ou depois das 23h, ou quando o computador está em Lisboa e não em São Paulo, existe em todas as empresas. Ninguém quer ser a pessoa que o escreveu, porque a suite perde credibilidade e a equipa começa a correr os testes com um encolher de ombros."],
            ["aviso", "Bibliotecas que congelam o relógio resolvem o sintoma e escondem a causa: o código continua a ir buscar a hora a meio da lógica. Passar o relógio como argumento não precisa de biblioteca nenhuma e deixa o código melhor."]
          ],
          quiz: [
            { p: "Um teste passa todo o ano e falha em dezembro. Qual é a causa mais provável?", o: ["Um bug do pytest", "A função vai buscar a data atual lá dentro e o teste assume o mês", "Falta de fixtures"], c: 1,
              e: "Qualquer coisa que dependa de `datetime.now()` dentro da lógica é uma bomba com relógio. Passa a data como argumento e o teste escolhe o dia que quer exercitar." }
          ],
          exercicio: {
            enunciado: "Torna `esta_expirado(criado_em, agora=None, dias=30)` testável. Devolve `True` se passaram **mais** de `dias` dias entre `criado_em` e `agora`. Quando `agora` não é dado, usa `datetime.now()`. Exatamente no limite ainda não expirou.",
            inicio: "from datetime import datetime, timedelta\n\n\ndef esta_expirado(criado_em, agora=None, dias=30):\n    pass\n",
            testes: "from datetime import datetime as _dt, timedelta as _td\n_base = _dt(2026, 1, 1)\nverifica('ainda valido', esta_expirado(_base, _base + _td(days=10)) is False)\nverifica('expirado', esta_expirado(_base, _base + _td(days=31)) is True)\nverifica('exatamente no limite ainda e valido', esta_expirado(_base, _base + _td(days=30)) is False)\nverifica('um segundo depois do limite ja expirou', esta_expirado(_base, _base + _td(days=30, seconds=1)) is True)\nverifica('prazo configuravel', esta_expirado(_base, _base + _td(days=8), dias=7) is True)\nverifica('sem agora usa o relogio', esta_expirado(_dt(2000, 1, 1)) is True)"
          }
        },
        {
          id: "14.5", titulo: "Quanto testar: limites, cobertura e o que não vale a pena", min: 16, estado: "pronta",
          meta: "No fim: decides o que testar pelo risco, e sabes ler um relatório de cobertura sem te deixares enganar por ele.",
          blocos: [
            ["p", "'Testámos tudo' não existe. Uma função com dois inteiros já tem mais combinações do que átomos no universo. A pergunta certa não é quanto, é onde está o risco."],
            ["h", "Os bugs vivem nas fronteiras"],
            ["p", "Quase nenhum bug está no meio do intervalo. Estão no zero, no um, no último, no vazio, no limite exato. Escolhe os casos de teste a partir das fronteiras e apanhas a maioria com meia dúzia de asserções."],
            ["lista", [
              "Quantidade: nenhum, um, muitos.",
              "Limites exatos: se a regra é 'mais de 30 dias', testa 29, 30 e 31. O erro está quase sempre entre `>` e `>=`.",
              "Valores: zero, negativo, `None`, string vazia, texto onde devia ir número.",
              "Coleções: vazia, com repetidos, já ordenada, ao contrário.",
              "Texto: acentos, espaços à volta, maiúsculas, muito comprido."
            ]],
            ["code", "regra: desconto para compras acima de 100 euros\n\n99.99  -> sem desconto\n100.00 -> ?               <- a fronteira. pergunta a quem pediu.\n100.01 -> com desconto"],
            ["h", "Cobertura"],
            ["code", "python -m pip install pytest-cov\npytest --cov=meu_pacote --cov-report=term-missing"],
            ["p", "A cobertura diz-te que linhas correram durante os testes. Não diz que estão certas: um teste sem uma única asserção dá cem por cento de cobertura e zero de garantia. Lê o relatório ao contrário: os ficheiros a zero por cento é que são a informação útil."],
            ["lista", [
              "Perseguir cem por cento leva a testes escritos para o número, que ninguém lê e que travam refatorações.",
              "Oitenta por cento com asserções honestas vale mais do que cem por cento decorativos.",
              "A coluna `missing` é a mais útil: mostra os ramos de erro que nunca foram exercitados, que é onde os bugs se escondem."
            ]],
            ["h", "O que testar sempre"],
            ["lista", [
              "Regras de negócio e cálculos: descontos, IVA, prazos, elegibilidade.",
              "Validação e interpretação de dados que vêm de fora.",
              "Tudo o que já esteve mal uma vez: cada bug corrigido leva um teste com o número do bilhete no nome.",
              "Os caminhos de erro, não só o caminho feliz."
            ]],
            ["h", "O que não vale a pena"],
            ["lista", [
              "Getters e setters triviais, `dataclasses` sem lógica.",
              "Bibliotecas de terceiros: presume-se que o `json` funciona.",
              "Código gerado e migrações automáticas.",
              "Detalhes internos de implementação, que partem os testes a cada refatoração sem apanhar bug nenhum."
            ]],
            ["obra", "A pergunta de entrevista é 'como decides o que testar?'. A resposta que funciona é curta: 'pelo risco. O que custa dinheiro ou confiança se estiver errado, e o que já esteve errado uma vez'. Quem responde 'testo tudo' mostra que nunca manteve uma suite."],
            ["aviso", "Um teste que repete a fórmula da implementação passa sempre e não prova nada. Se o código faz `preco * 1.23` e o teste verifica `resultado == preco * 1.23`, testaste que o Python sabe multiplicar. Escreve o valor esperado à mão: `assert com_iva(100) == 123.0`."]
          ],
          quiz: [
            { p: "O relatório diz cem por cento de cobertura. O que é que isso garante?", o: ["Que não há bugs", "Que todas as linhas correram durante os testes, nada mais", "Que os casos limite estão testados"], c: 1,
              e: "Cobertura mede execução, não correção. Serve para encontrar zonas nunca exercitadas; não serve como prova de qualidade, e como objetivo de gestão produz testes vazios." }
          ],
          exercicio: {
            enunciado: "Escreve `interpretar_intervalo(texto)`, que transforma `'3-7'` na lista `[3, 4, 5, 6, 7]` e `'5'` em `[5]`. Espaços à volta são ignorados. Se o início for maior que o fim, ou o texto não for válido, levanta `ValueError`. Repara nas fronteiras: os testes vão lá bater.",
            inicio: "def interpretar_intervalo(texto):\n    pass\n",
            testes: "verifica('intervalo normal', interpretar_intervalo('3-7') == [3, 4, 5, 6, 7])\nverifica('numero unico', interpretar_intervalo('5') == [5])\nverifica('inicio igual ao fim', interpretar_intervalo('4-4') == [4])\nverifica('espacos a volta', interpretar_intervalo('  2-3 ') == [2, 3])\nverifica('zero e valido', interpretar_intervalo('0-1') == [0, 1])\n_maus = ['7-3', 'a-b', '', '1-', '-', '2--3']\n_erros = 0\nfor _t in _maus:\n    try:\n        interpretar_intervalo(_t)\n    except ValueError:\n        _erros += 1\nverifica('entradas invalidas levantam ValueError', _erros == len(_maus))"
          }
        }
      ]
    },
    {
      n: 15, fase: 3, titulo: "Qualidade e ferramentas",
      objetivo: "Entregar código que passa em revisão à primeira.",
      licoes: [
        {
          id: "15.1", titulo: "ruff, formatação automática e mypy", min: 15, estado: "pronta",
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
              "`B006 mutable default argument`: o bug do módulo 6, apanhado automaticamente.",
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
          id: "15.2", titulo: "pre-commit e integração contínua", min: 14, estado: "pronta",
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
      n: 16, fase: 3, titulo: "Git como se trabalha a sério",
      objetivo: "O requisito que aparece em 100 por cento das vagas.",
      licoes: [
        {
          id: "16.1", titulo: "Ramos, commits e histórico legível", min: 18, estado: "pronta",
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
          id: "16.2", titulo: "Pull requests e revisão de código", min: 16, estado: "pronta",
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
      n: 17, fase: 3, titulo: "Depuração e desempenho",
      objetivo: "Encontrar o problema em minutos em vez de horas.",
      licoes: [
        {
          id: "17.1", titulo: "Método: reproduzir, isolar, corrigir", min: 16, estado: "pronta",
          meta: "No fim: tens um processo para encontrar bugs em vez de mexeres no código à sorte.",
          blocos: [
            ["p", "A diferença entre quem resolve um bug em vinte minutos e quem demora dois dias raramente é saber mais Python. É ter método. O método tem quatro passos e não se salta nenhum, sobretudo quando há pressa."],
            ["h", "1. Reproduzir"],
            ["p", "Enquanto não conseguires provocar o erro à vontade, não estás a depurar: estás a adivinhar. Escreve os passos exatos, os dados exatos, a versão e o ambiente. Se não reproduz, o problema passa a ser esse, e é aí que trabalhas."],
            ["lista", [
              "Os mesmos dados. Pede o ficheiro, o identificador do pedido, o registo exato.",
              "O mesmo ambiente. 'Na minha máquina funciona' costuma ser uma diferença de versão, de fuso horário ou de configuração.",
              "Intermitente? Acrescenta registo suficiente para apanhar o estado quando acontecer, e espera. É trabalho válido.",
              "Assim que reproduzires, guarda a receita. Vais precisar dela outra vez no fim, para provar que corrigiste."
            ]],
            ["h", "2. Isolar, cortando ao meio"],
            ["p", "Um bug esconde-se num espaço: mil linhas de código, dez mil linhas de dados, duzentos commits. Não procures do princípio para o fim. Corta o espaço a meio e pergunta de que lado está. Dez perguntas chegam para mil hipóteses, que é a pesquisa binária do módulo 13.2 aplicada ao teu dia de trabalho."],
            ["lista", [
              "**Nos dados**: fica com metade do ficheiro. Ainda falha? Corta outra vez. Chegas a duas ou três linhas e a causa costuma saltar à vista.",
              "**No código**: verifica o valor a meio do caminho. Está certo aqui? Então o problema está depois.",
              "**No histórico**: `git bisect` encontra o commit que partiu, em log n passos. Precisa de um comando que diga bom ou mau, e por isso vale a pena ter o teste primeiro.",
              "**No ambiente**: corre noutra máquina, noutro ambiente virtual, com outra versão."
            ]],
            ["code", "git bisect start\ngit bisect bad                 # o estado de agora está mau\ngit bisect good v1.4.0         # aqui ainda estava bom\n# o git faz checkout a meio; tu testas e dizes\ngit bisect good                # ou: git bisect bad\n# ... repete ~log2(n) vezes\ngit bisect reset"],
            ["h", "3. Uma hipótese de cada vez, escrita"],
            ["p", "Escreve a hipótese numa frase que se possa provar falsa: 'acredito que o campo `email` vem a `None` quando o registo veio do formulário antigo'. Depois testa **essa** frase, não o programa inteiro."],
            ["aviso", "Mexer no código antes de ter uma hipótese é a definição de estar perdido. E se mudaste três coisas e passou a funcionar, não sabes qual foi, não aprendeste nada, e provavelmente introduziste dois bugs novos que ainda não viste."],
            ["h", "4. Corrigir e provar"],
            ["lista", [
              "Escreve primeiro o teste que falha por causa do bug (módulo 14.3). É a prova de que percebeste.",
              "Faz a correção mínima. Arrumar o ficheiro ao mesmo tempo esconde o que realmente mudou.",
              "Corre a suite toda. As correções partem outras coisas com uma frequência desagradável.",
              "Pergunta: 'onde é que este mesmo erro existe outra vez?'. Se foi um `or` a servir de omissão, procura os outros no projeto."
            ]],
            ["h", "As suposições que costumam estar erradas"],
            ["lista", [
              "'Os dados vêm limpos.' Nunca vêm.",
              "'Esta função só é chamada uma vez.' Alguém a pôs num ciclo.",
              "'Isto está ordenado.' Estava, até alguém trocar a consulta.",
              "'O ficheiro está em UTF-8.' Veio do Excel.",
              "'O serviço responde em menos de um segundo.' Hoje não.",
              "'Isto não muda enquanto eu itero.' Muda."
            ]],
            ["h", "O pato de borracha"],
            ["p", "Explicar o problema em voz alta, linha a linha, a um colega ou a um objeto, obriga-te a tornar explícitas as suposições que estavas a dar como certas. Metade dos bugs aparece a meio da frase, antes de o outro responder. Não é folclore: é a mesma razão por que escrever a hipótese funciona."],
            ["obra", "Um bilhete de bug bem escrito tem cinco coisas: passos para reproduzir, resultado esperado, resultado obtido, versão e dados de exemplo. Quem escreve assim recebe correções; quem escreve 'não funciona' recebe perguntas e espera três dias. Escreve os teus bilhetes assim desde o primeiro."]
          ],
          quiz: [
            { p: "Mexeste em três sítios, o bug desapareceu e vais fechar o bilhete. Qual é o problema?", o: ["Nenhum, o importante é funcionar", "Não sabes qual foi a correção, e as outras duas alterações podem ter criado problemas novos", "Devias ter mexido em mais sítios"], c: 1,
              e: "Sem saber a causa não sabes se corrigiste ou se escondeste. Volta atrás, aplica uma alteração de cada vez, e fica com a que resolve, com um teste que o prove." }
          ],
          exercicio: {
            enunciado: "Escreve `primeiro_mau(versoes, e_mau)`, a lógica do `git bisect`. `versoes` está ordenada da mais antiga para a mais recente e `e_mau(v)` devolve `False` até certo ponto e `True` daí para a frente. Devolve o índice da primeira versão má, ou `-1` se nenhuma for má. Não podes chamar `e_mau` para todas: há um teste que conta as chamadas.",
            inicio: "def primeiro_mau(versoes, e_mau):\n    pass\n",
            testes: "_chamadas = []\ndef _mau_a_partir_de(limite):\n    def f(v):\n        _chamadas.append(v)\n        return v >= limite\n    return f\nverifica('encontra a primeira ma', primeiro_mau(list(range(8)), _mau_a_partir_de(5)) == 5)\nverifica('todas mas', primeiro_mau(list(range(4)), _mau_a_partir_de(0)) == 0)\nverifica('nenhuma ma', primeiro_mau(list(range(4)), _mau_a_partir_de(99)) == -1)\nverifica('lista vazia', primeiro_mau([], _mau_a_partir_de(0)) == -1)\nverifica('a ultima e a primeira ma', primeiro_mau(list(range(5)), _mau_a_partir_de(4)) == 4)\n_chamadas.clear()\nprimeiro_mau(list(range(1024)), _mau_a_partir_de(700))\nverifica('procura por bissecao e nao uma a uma', len(_chamadas) <= 12)"
          }
        },
        {
          id: "17.2", titulo: "Depurador em vez de prints", min: 14, estado: "pronta",
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
              "Escreve o teste que falha. Passa a ser o módulo 14.3 a partir daqui."
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
          id: "17.3", titulo: "Catálogo dos bugs que o Python te deixa escrever", min: 18, estado: "pronta",
          meta: "No fim: reconheces de imediato os erros que apanham toda a gente pelo menos uma vez.",
          blocos: [
            ["p", "Python é permissivo, e essa permissividade tem uma conta a pagar. Esta é a lista dos erros que aparecem em revisões de código todas as semanas, em todas as empresas. Lê-a uma vez com atenção e volta cá quando algo não fizer sentido."],
            ["h", "1. Argumento por omissão mutável"],
            ["py", "def registar(evento, historico=[]):\n    historico.append(evento)\n    return historico\n\nprint(registar(\"a\"))\nprint(registar(\"b\"))   # a lista é a mesma"],
            ["p", "Já apareceu no módulo 3.4 e volta aqui porque é o número um da lista. A correção é `=None` e criar lá dentro."],
            ["h", "2. Alterar uma lista enquanto a percorres"],
            ["py", "numeros = [1, 2, 3, 4]\nfor n in list(numeros):\n    if n % 2 == 0:\n        numeros.remove(n)\nprint(numeros)\n\nmaus = [1, 2, 2, 3]\nfor n in maus:\n    if n == 2:\n        maus.remove(n)\nprint(maus)   # ficou um 2"],
            ["h", "3. Funções criadas dentro de um ciclo"],
            ["py", "funcoes = [lambda: i for i in range(3)]\nprint([f() for f in funcoes])   # 2, 2, 2\n\nfuncoes = [lambda i=i: i for i in range(3)]\nprint([f() for f in funcoes])"],
            ["p", "A `lambda` guarda o **nome** `i`, não o valor que ele tinha. Quando as chamas, o ciclo já acabou e `i` vale a última coisa. Captura-se o valor com um argumento por omissão, ou com `functools.partial`."],
            ["h", "4. `is` em vez de `==`"],
            ["py", "a = 1000\nb = 1000\nprint(a == b, a is b)\n\nx = 5\ny = 5\nprint(x == y, x is y)   # True por acaso: inteiros pequenos são reutilizados"],
            ["h", "5. Cópia rasa de estruturas encaixadas"],
            ["py", "modelo = {\"nome\": \"\", \"tags\": []}\na = dict(modelo)\nb = dict(modelo)\na[\"tags\"].append(\"novo\")\nprint(b[\"tags\"])   # o 'novo' também está aqui"],
            ["h", "6. Tapar nomes do Python"],
            ["py", "lista = [3, 1, 2]\nlist = sorted(lista)   # a partir daqui, list() deixa de existir\nprint(list)\ntry:\n    print(list((1, 2)))\nexcept TypeError as e:\n    print(\"TypeError:\", e)"],
            ["aviso", "O mesmo vale para ficheiros: um ficheiro teu chamado `json.py`, `random.py` ou `email.py` na pasta do projeto ganha ao módulo do Python e produz erros absurdos, do género 'module has no attribute loads'. Se um import começa a portar-se mal, procura um ficheiro teu com o mesmo nome."],
            ["h", "7. Comparar floats com =="],
            ["py", "print(0.1 + 0.2 == 0.3)\nimport math\nprint(math.isclose(0.1 + 0.2, 0.3))"],
            ["h", "8. `except` que engole tudo"],
            ["py", "def ler(valor):\n    try:\n        return int(valor)\n    except Exception:\n        return 0\n\nprint(ler(\"12\"), ler(\"doze\"))"],
            ["p", "Devolver `0` para texto inválido esconde um problema de dados que vai aparecer num relatório errado três semanas depois. Apanha a exceção que esperas (`ValueError`), e deixa passar o que não esperas. `except:` sem tipo nenhum apanha até o `Ctrl+C`."],
            ["h", "9. Atribuir a um nome global dentro de uma função"],
            ["py", "contador = 0\n\ndef aumentar_errado():\n    try:\n        contador = contador + 1\n    except UnboundLocalError as e:\n        print(\"UnboundLocalError:\", e)\n\naumentar_errado()"],
            ["p", "Atribuir a um nome dentro de uma função torna-o local em toda a função, mesmo nas linhas acima da atribuição. Ou usas `global` (raramente boa ideia), ou, melhor, recebes o valor e devolves o novo."],
            ["h", "10. `return` dentro do ciclo, cedo demais"],
            ["py", "def todos_positivos(numeros):\n    for n in numeros:\n        if n > 0:\n            return True     # responde ao primeiro, não a todos\n        return False\n\nprint(todos_positivos([1, -1]))\nprint(all(n > 0 for n in [1, -1]))"],
            ["h", "Como se apanham estes sem ser à mão"],
            ["lista", [
              "`ruff` com as regras `B` (bugbear) apanha o número 1, o 3 e variantes do 8.",
              "`mypy` apanha o número 4 e muitos erros de tipo antes de correr (módulo 15.1).",
              "Testes com casos limite apanham o 2 e o 10.",
              "Revisão de código apanha o 5, o 6 e o 9, porque um par de olhos que não escreveu aquilo lê o que lá está e não o que se queria escrever."
            ]],
            ["obra", "Ligar as regras `B` do `ruff` num projeto demora meia hora e evita bilhetes de bug durante anos. Se entrares numa equipa que não as tem ligadas, é uma proposta pequena, fácil de defender e que te faz ganhar reputação sem escreveres uma linha de lógica nova."],
            ["aviso", "Quando encontrares um destes no código da empresa, não o corrijas em silêncio no meio de outra alteração. Faz um pull request próprio, com um teste que demonstra o problema. Uma correção explicada ensina a equipa; uma correção escondida num diff de trezentas linhas não é vista por ninguém."]
          ],
          quiz: [
            { p: "`funcoes = [lambda: i for i in range(3)]` e depois chamas todas. O que sai?", o: ["0, 1, 2", "2, 2, 2", "Erro"], c: 1,
              e: "As lambdas guardam o nome `i`, não o valor. Quando as chamas, o ciclo acabou e `i` vale 2. Captura-se o valor com `lambda i=i: i`." }
          ],
          exercicio: {
            enunciado: "Esta fábrica de funções está errada: todas as funções devolvidas multiplicam pelo mesmo fator. Corrige-a para que `multiplicadores([2, 3])` devolva uma função que multiplica por 2 e outra que multiplica por 3.",
            inicio: "def multiplicadores(fatores):\n    funcoes = []\n    for f in fatores:\n        funcoes.append(lambda x: x * f)\n    return funcoes\n",
            testes: "_fs = multiplicadores([2, 3])\nverifica('a primeira multiplica por 2', _fs[0](10) == 20)\nverifica('a segunda multiplica por 3', _fs[1](10) == 30)\nverifica('uma funcao por fator', len(multiplicadores([1, 2, 3])) == 3)\nverifica('lista vazia', multiplicadores([]) == [])\n_um = multiplicadores([5])[0]\nverifica('continua a funcionar depois do ciclo', _um(4) == 20)\n_tres = multiplicadores([1, 2, 3])\nverifica('todos independentes', [f(1) for f in _tres] == [1, 2, 3])"
          }
        },
        {
          id: "17.4", titulo: "Depurar o que não corre na tua máquina", min: 16, estado: "pronta",
          meta: "No fim: consegues perceber o que aconteceu num servidor a que não tens acesso interativo.",
          blocos: [
            ["p", "Em produção não pões um `breakpoint()`. Não há consola à tua espera, e mesmo que houvesse, parar o processo deixava os utilizadores pendurados. O que te resta são os rastos que o teu código deixou. É essa a verdadeira razão de existir do `logging` (módulo 9.3)."],
            ["h", "Registos que servem para alguma coisa"],
            ["code", "import logging\n\nlog = logging.getLogger(__name__)\n\ndef processar(pedido_id, linhas):\n    log.info(\"a processar pedido %s com %d linhas\", pedido_id, len(linhas))\n    try:\n        return [transformar(l) for l in linhas]\n    except ValueError:\n        log.exception(\"pedido %s: linha inválida\", pedido_id)\n        raise"],
            ["lista", [
              "Contexto, sempre: identificadores, contagens, o nome do ficheiro. 'Erro ao processar' não ajuda ninguém às três da manhã.",
              "`log.exception(...)` dentro de um `except` inclui o traceback completo. `log.error(...)` sozinho perde-o.",
              "Usa os marcadores `%s` do logging em vez de f-strings: a formatação só acontece se aquele nível estiver ligado.",
              "Nunca registes palavras-passe, tokens, números de cartão ou dados pessoais. Os registos são copiados, enviados e guardados durante anos.",
              "`INFO` para marcos, `WARNING` para o que é estranho mas recuperável, `ERROR` para o que falhou. `DEBUG` para o detalhe que só ligas quando estás a investigar."
            ]],
            ["h", "Correlacionar"],
            ["p", "Com duzentos pedidos em simultâneo, as linhas de registo dos vários pedidos ficam intercaladas. Sem um identificador comum em todas as linhas do mesmo pedido, tens duzentas histórias misturadas e nenhuma legível. Gera um identificador à entrada e leva-o contigo."],
            ["code", "2026-03-14 03:12:01 INFO  [req=7f3a] a processar pedido 9912 com 40 linhas\n2026-03-14 03:12:01 INFO  [req=91bc] a processar pedido 9913 com 12 linhas\n2026-03-14 03:12:02 ERROR [req=7f3a] linha 17 inválida: valor 'N/D'"],
            ["h", "Falhar alto em vez de continuar errado"],
            ["p", "Continuar com dados errados é pior do que parar. Um erro que rebenta é um bilhete de bug; um erro silencioso é um relatório errado que ninguém questiona. Quando converteres uma exceção noutra, mantém a causa com `raise ... from`."],
            ["py", "def ler_config(valores):\n    try:\n        return int(valores[\"tentativas\"])\n    except KeyError as e:\n        raise ValueError(\"falta a chave 'tentativas' na configuração\") from e\n\ntry:\n    ler_config({})\nexcept ValueError as e:\n    print(type(e).__name__, e)\n    print(\"causa:\", type(e.__cause__).__name__)"],
            ["h", "O que registar num trabalho por lotes"],
            ["lista", [
              "Início: o que vai processar, com que parâmetros e que versão do código.",
              "Progresso, de vez em quando: 'processadas 10 000 de 240 000'. Num trabalho de horas, sem isto não sabes se está a correr ou pendurado.",
              "Cada rejeição, com o número da linha e o motivo, não só a contagem.",
              "Fim: 'lidas 240 000, aceites 239 610, rejeitadas 390, duração 12m'. Este resumo é o que te vão pedir de manhã."
            ]],
            ["obra", "A pergunta das nove da manhã é 'a importação de ontem à noite correu bem?'. Se a resposta só existe no teu terminal de ontem, a resposta é não. Um trabalho agendado que não deixa um resumo legível é um trabalho em que ninguém pode confiar, mesmo quando funciona."],
            ["aviso", "`print` num servidor vai parar ao sítio que quem publicou decidiu, e às vezes é o nada. Não tem nível, não tem data, não tem origem, e não se desliga. Usa `logging` desde o primeiro ficheiro do projeto: dá o mesmo trabalho."]
          ],
          quiz: [
            { p: "Um erro raro acontece em produção umas vezes por dia e não consegues reproduzir localmente. Primeiro passo?", o: ["Pôr um breakpoint no servidor", "Acrescentar registo com contexto suficiente para reconstruir o caso quando voltar a acontecer", "Reescrever a função"], c: 1,
              e: "Sem reprodução não há depuração. Instrumentar para capturar o estado quando acontecer é o trabalho certo, e a espera faz parte dele." }
          ],
          exercicio: {
            enunciado: "Escreve `resumo_erros(linhas)`, que recebe linhas de registo como `'2026-01-05 10:00:00 ERROR pagamento falhou'` e devolve um dicionário com o número de ocorrências por nível, apenas dos níveis que aparecem. Níveis válidos: DEBUG, INFO, WARNING, ERROR, CRITICAL. Linhas que não sigam o formato contam como `'INVALIDO'`.",
            inicio: "def resumo_erros(linhas):\n    pass\n",
            testes: "_linhas = ['2026-01-05 10:00:00 ERROR pagamento falhou', '2026-01-05 10:00:01 INFO pedido recebido', '2026-01-05 10:00:02 ERROR pagamento falhou', 'linha a toa']\nverifica('conta por nivel', resumo_erros(_linhas) == {'ERROR': 2, 'INFO': 1, 'INVALIDO': 1})\nverifica('sem linhas', resumo_erros([]) == {})\nverifica('so invalidas', resumo_erros(['xpto']) == {'INVALIDO': 1})\nverifica('nivel desconhecido e invalido', resumo_erros(['2026-01-05 10:00:00 XPTO algo']) == {'INVALIDO': 1})\nverifica('linha sem mensagem ainda conta', resumo_erros(['2026-01-05 10:00:00 WARNING']) == {'WARNING': 1})\nverifica('so os niveis presentes aparecem', 'DEBUG' not in resumo_erros(_linhas))"
          }
        },
        {
          id: "17.5", titulo: "Medir antes de otimizar", min: 12, estado: "pronta",
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
      n: 18, fase: 4, titulo: "Consumir APIs",
      objetivo: "Ir buscar dados a outro sistema e não rebentar quando ele falha.",
      licoes: [
        {
          id: "18.1", titulo: "HTTP, httpx e o que fazer quando corre mal", min: 20, estado: "pronta",
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
            ["p", "Repara no `yield`: quem chama esta função recebe alunos um a um e nunca tem a coleção inteira em memória. É o módulo 12 a pagar-se a si próprio."],
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
          id: "18.2", titulo: "Dublês de teste para chamadas externas", min: 14, estado: "pronta",
          meta: "No fim: testas código que fala com a rede, sem rede, em milissegundos.",
          blocos: [
            ["p", "Um teste que chama uma API a sério é lento, falha quando a internet falha e devolve dados diferentes amanhã. Um dublê é um objeto que finge ser essa dependência e responde o que tu mandares."],
            ["h", "O mais simples: uma classe falsa"],
            ["py", "class RespostaFalsa:\n    def __init__(self, dados, estado=200):\n        self.dados = dados\n        self.status_code = estado\n\n    def raise_for_status(self):\n        if self.status_code >= 400:\n            raise RuntimeError(f\"HTTP {self.status_code}\")\n\n    def json(self):\n        return self.dados\n\nclass ClienteFalso:\n    def __init__(self, resposta):\n        self.resposta = resposta\n        self.pedidos = []\n\n    def get(self, caminho):\n        self.pedidos.append(caminho)\n        return self.resposta\n\ndef nomes(cliente):\n    r = cliente.get(\"/utilizadores\")\n    r.raise_for_status()\n    return [u[\"nome\"] for u in r.json()[\"resultados\"]]\n\nfalso = ClienteFalso(RespostaFalsa({\"resultados\": [{\"nome\": \"Ana\"}]}))\nprint(nomes(falso))\nprint(falso.pedidos)"],
            ["p", "Repara em duas coisas. A função recebe o cliente como argumento, que é a injeção de dependências do módulo 11.3, e o dublê guarda o que lhe pediram, para poderes verificar o pedido além do resultado."],
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
      n: 19, fase: 4, titulo: "Bases de dados",
      objetivo: "Guardar dados a sério, não em ficheiros JSON.",
      licoes: [
        {
          id: "19.1", titulo: "SQL que um programador precisa", min: 20, estado: "pronta",
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
            ["p", "Um índice é uma estrutura ordenada que evita ler a tabela toda, tal como o `set` do módulo 17.5 evita percorrer a lista. Cria índices nas colunas por que filtras e juntas com frequência. Cada índice acelera leituras e atrasa escritas, por isso não se indexa tudo."],
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
          id: "19.2", titulo: "sqlite3 e SQLAlchemy", min: 18, estado: "pronta",
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
      n: 20, fase: 4, titulo: "Construir uma API com FastAPI",
      objetivo: "O projeto que vai ficar no topo do teu portefólio.",
      licoes: [
        {
          id: "20.1", titulo: "Primeiro endpoint e validação com Pydantic", min: 20, estado: "pronta",
          meta: "No fim: percebes o que uma rota faz, e escreves a validação que separa um 422 de um 500.",
          blocos: [
            ["p", "Uma API é uma função com um endereço. O FastAPI trata do resto: descodifica o pedido, valida os dados, chama a tua função e converte o resultado em JSON. O teu trabalho continua a ser Python normal."],
            ["code", "pip install \"fastapi[standard]\"\nfastapi dev main.py"],
            ["code", "# main.py\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/saude\")\ndef saude():\n    return {\"estado\": \"ok\"}\n\n@app.get(\"/produtos/{produto_id}\")\ndef obter_produto(produto_id: int):\n    return {\"id\": produto_id, \"nome\": \"teclado\"}"],
            ["p", "Repara na anotação `produto_id: int`. Não é decoração: é o que faz o FastAPI converter o texto do URL para inteiro e responder 422 automaticamente se alguém pedir `/produtos/abc`. As anotações do módulo 6.3 passaram a ter efeito em execução."],
            ["h", "Pydantic: o contrato dos dados"],
            ["code", "from pydantic import BaseModel, Field\n\nclass ProdutoNovo(BaseModel):\n    nome: str = Field(min_length=1, max_length=80)\n    preco: float = Field(gt=0)\n    quantidade: int = Field(default=1, ge=0)\n\n@app.post(\"/produtos\", status_code=201)\ndef criar_produto(produto: ProdutoNovo):\n    return {\"id\": 1, **produto.model_dump()}"],
            ["p", "Uma `BaseModel` parece-se com a `dataclass` do módulo 11.2, com uma diferença decisiva: valida. Se o corpo do pedido trouxer `preco` a zero ou `nome` vazio, o cliente recebe 422 com a lista exata dos campos errados, e a tua função nem chega a correr."],
            ["obra", "Esta é a fronteira de que falámos no módulo 8.2: dados de fora entram por um sítio, são validados uma vez, e a partir daí o resto do código confia. Sem essa fronteira, cada função passa a ter de se defender, e nenhuma o faz bem."],
            ["h", "Os códigos de resposta que tens de acertar"],
            ["lista", [
              "200 para uma leitura com sucesso, 201 para uma criação.",
              "400 para um pedido mal formado, 422 quando a validação falhou.",
              "401 sem autenticação, 403 autenticado mas sem permissão.",
              "404 quando o recurso não existe.",
              "500 quando o erro é teu. Um 500 que devia ser 400 é um bug de desenho."
            ]],
            ["code", "from fastapi import HTTPException\n\n@app.get(\"/produtos/{produto_id}\")\ndef obter_produto(produto_id: int):\n    produto = repositorio.obter(produto_id)\n    if produto is None:\n        raise HTTPException(status_code=404, detail=\"produto não existe\")\n    return produto"],
            ["h", "Documentação de graça"],
            ["p", "Com o servidor a correr, `/docs` mostra a API inteira, com os campos, os tipos e um botão para experimentar. Não é um extra: é o que a equipa de frontend vai abrir em vez de te perguntar a ti."],
            ["aviso", "Devolver o objeto interno diretamente expõe campos que ninguém devia ver: hashes de password, notas internas, identificadores de sistemas terceiros. Define um modelo de saída separado do modelo de entrada. É a fuga de dados mais comum em APIs feitas à pressa."]
          ],
          quiz: [
            { p: "Um cliente envia `preco` como texto e a tua API responde 500. Onde está o erro de desenho?", o: ["No cliente, que enviou mal", "Na tua API, que devia validar à entrada e responder 422", "Em lado nenhum, 500 serve"], c: 1,
              e: "500 significa 'a culpa é minha'. Dados inválidos do cliente são 4xx, com a indicação do campo. É o que a validação à entrada te dá sem escreveres código." }
          ],
          exercicio: {
            enunciado: "Escreve `criar_produto(dados)`, o miolo de um endpoint. Devolve `(201, produto)` com os campos `nome`, `preco` e `quantidade` (por omissão 1) quando os dados são válidos, ou `(422, {'erros': [...]})` com 'nome' e 'preco' na lista, por esta ordem, quando faltam ou são inválidos. `nome` tem de ser texto não vazio e `preco` um número maior que zero.",
            inicio: "def criar_produto(dados):\n    pass\n",
            testes: "_ok = criar_produto({'nome': 'teclado', 'preco': 39.9})\nverifica('cria com 201', _ok[0] == 201)\nverifica('quantidade por omissão', _ok[1]['quantidade'] == 1)\nverifica('respeita a quantidade dada', criar_produto({'nome': 'rato', 'preco': 12.5, 'quantidade': 3})[1]['quantidade'] == 3)\n_mau = criar_produto({'nome': '', 'preco': 0})\nverifica('rejeita com 422', _mau[0] == 422)\nverifica('aponta os dois campos', _mau[1]['erros'] == ['nome', 'preco'])"
          }
        },
        {
          id: "20.2", titulo: "CRUD completo com base de dados", min: 22, estado: "pronta",
          meta: "No fim: organizas uma API em camadas e devolves o erro certo quando o recurso não existe.",
          blocos: [
            ["p", "CRUD é criar, ler, atualizar e apagar. É o esqueleto de quase todas as aplicações de gestão, e é o que te vão pedir para escrever na primeira semana de trabalho."],
            ["code", "POST   /produtos          criar          201\nGET    /produtos          listar         200\nGET    /produtos/{id}     ler um         200 ou 404\nPUT    /produtos/{id}     substituir     200 ou 404\nPATCH  /produtos/{id}     alterar campos 200 ou 404\nDELETE /produtos/{id}     apagar         204 ou 404"],
            ["h", "Camadas, e porquê"],
            ["lista", [
              "Rotas: falam HTTP. Recebem, validam, chamam o serviço e traduzem erros em códigos.",
              "Serviço: as regras de negócio. Não sabe o que é um pedido HTTP.",
              "Repositório: fala com a base de dados. Não sabe o que é uma regra de negócio.",
              "Modelos: as formas dos dados, com Pydantic à entrada e à saída."
            ]],
            ["p", "Parece burocracia num projeto de trezentas linhas e é o que o salva às três mil. A prova prática: se testar a tua regra de negócio obriga a arrancar um servidor HTTP, as camadas estão coladas."],
            ["code", "# repositorio.py\nclass NaoEncontrado(Exception):\n    pass\n\nclass RepositorioProdutos:\n    def __init__(self, sessao):\n        self.sessao = sessao\n\n    def obter(self, produto_id):\n        produto = self.sessao.get(Produto, produto_id)\n        if produto is None:\n            raise NaoEncontrado(f\"produto {produto_id}\")\n        return produto"],
            ["code", "# rotas.py\n@app.get(\"/produtos/{produto_id}\", response_model=ProdutoSaida)\ndef ler(produto_id: int, repo: RepositorioProdutos = Depends(obter_repo)):\n    try:\n        return repo.obter(produto_id)\n    except NaoEncontrado:\n        raise HTTPException(status_code=404, detail=\"produto não existe\")"],
            ["p", "O `Depends` é injeção de dependências, o mesmo padrão do módulo 11.3, agora dado pelo framework. No teste, substitui-se o repositório por um falso e testa-se a rota sem base de dados nenhuma."],
            ["h", "Erros que se transformam em respostas"],
            ["p", "As exceções de domínio do módulo 8.2 sobem até à camada web e são traduzidas ali, num sítio só. Sem isso, cada rota repete o mesmo `try` e uma delas há de esquecer-se."],
            ["code", "@app.exception_handler(NaoEncontrado)\ndef tratar_nao_encontrado(pedido, exc):\n    return JSONResponse(status_code=404, content={\"detalhe\": str(exc)})"],
            ["aviso", "PUT substitui o recurso inteiro, PATCH altera só os campos enviados. Implementar PUT como se fosse PATCH é o bug silencioso que apaga os campos que o cliente não mandou. Decide qual suportas e documenta."],
            ["h", "Alterações de esquema"],
            ["p", "A tabela vai mudar. Migrações com Alembic geram e aplicam essas alterações de forma versionada, com o histórico no git ao lado do código. Alterar a base de dados à mão em produção é a origem daquele momento em que o ambiente de testes deixa de se parecer com o real."],
            ["obra", "Numa entrevista para júnior de backend, o exercício mais comum é exatamente isto: um CRUD com validação, 404 tratado e um teste. Fá-lo uma vez de raiz, sem copiar, e ficas com a resposta pronta para o resto do ano."]
          ],
          quiz: [
            { p: "A tua regra de negócio só se consegue testar arrancando o servidor HTTP. O que isso indica?", o: ["Que os testes estão mal escritos", "Que a lógica está dentro da camada de rotas em vez de estar num serviço", "Que falta uma base de dados de teste"], c: 1,
              e: "Regras de negócio devem correr em memória, em milissegundos. Se precisam de HTTP para existir, ficaram coladas ao transporte." }
          ],
          exercicio: {
            enunciado: "Escreve a classe `Repositorio` em memória com `criar(produto)` (devolve o produto com um `id` novo, a começar em 1), `obter(id)` (levanta `NaoEncontrado` se não existir), `listar()` e `apagar(id)` (também levanta `NaoEncontrado`).",
            inicio: "class NaoEncontrado(Exception):\n    pass\n\n\nclass Repositorio:\n    def __init__(self):\n        pass\n",
            testes: "_r = Repositorio()\n_p = _r.criar({'nome': 'teclado'})\nverifica('id começa em 1', _p['id'] == 1)\nverifica('segundo id é 2', _r.criar({'nome': 'rato'})['id'] == 2)\nverifica('obter devolve o produto', _r.obter(1)['nome'] == 'teclado')\nverifica('listar devolve os dois', len(_r.listar()) == 2)\n_r.apagar(1)\n_erros = 0\nfor _acao in (lambda: _r.obter(1), lambda: _r.apagar(99)):\n    try:\n        _acao()\n    except NaoEncontrado:\n        _erros += 1\nverifica('obter e apagar inexistentes levantam NaoEncontrado', _erros == 2)"
          }
        },
        {
          id: "20.3", titulo: "Testar a API", min: 16, estado: "pronta",
          meta: "No fim: testas rotas de ponta a ponta, com base de dados de teste, em segundos.",
          blocos: [
            ["p", "Testar uma API não obriga a arrancar servidor nem a abrir portas. O `TestClient` do FastAPI chama a aplicação diretamente em memória e devolve respostas a sério, com código de estado e corpo."],
            ["code", "from fastapi.testclient import TestClient\nfrom main import app\n\ncliente = TestClient(app)\n\ndef test_saude():\n    resposta = cliente.get(\"/saude\")\n    assert resposta.status_code == 200\n    assert resposta.json() == {\"estado\": \"ok\"}"],
            ["h", "O teste que interessa: criar e voltar a ler"],
            ["code", "def test_criar_e_ler_produto():\n    criado = cliente.post(\"/produtos\", json={\"nome\": \"teclado\", \"preco\": 39.9})\n    assert criado.status_code == 201\n    produto_id = criado.json()[\"id\"]\n\n    lido = cliente.get(f\"/produtos/{produto_id}\")\n    assert lido.status_code == 200\n    assert lido.json()[\"nome\"] == \"teclado\"\n\ndef test_produto_inexistente_da_404():\n    assert cliente.get(\"/produtos/999999\").status_code == 404\n\ndef test_preco_invalido_da_422():\n    resposta = cliente.post(\"/produtos\", json={\"nome\": \"x\", \"preco\": -1})\n    assert resposta.status_code == 422"],
            ["p", "Três testes, três caminhos: o feliz, o inexistente e o inválido. É o mínimo por recurso, e já apanha a maioria das regressões que um júnior introduz."],
            ["h", "Base de dados de teste"],
            ["p", "Os testes não podem tocar na base de dados real. Substitui-se a dependência que dá a sessão por uma que aponta para SQLite em memória, criada e destruída por teste. É a fixture do módulo 14.2 aplicada a uma API."],
            ["code", "@pytest.fixture\ndef cliente():\n    motor = create_engine(\"sqlite:///:memory:\")\n    Base.metadata.create_all(motor)\n\n    def sessao_de_teste():\n        with Session(motor) as s:\n            yield s\n\n    app.dependency_overrides[obter_sessao] = sessao_de_teste\n    yield TestClient(app)\n    app.dependency_overrides.clear()"],
            ["p", "`dependency_overrides` é o FastAPI a deixar-te trocar qualquer dependência no teste. Sem esse gancho, terias de mexer em variáveis globais, que é como se escrevem suites que só passam à primeira execução."],
            ["h", "A pirâmide, sem religião"],
            ["lista", [
              "Muitos testes de unidade às regras de negócio, rápidos e sem infraestrutura.",
              "Alguns testes de API a cada rota, com base de dados em memória.",
              "Pouquíssimos testes contra sistemas externos a sério, a correr à parte da suite normal.",
              "Se a tua suite demora mais de um minuto, deixas de a correr, e uma suite que não corres não existe."
            ]],
            ["obra", "Um projeto de portefólio com uma API pequena, testes destes e CI verde responde de uma vez a testes, HTTP, base de dados e ferramentas. Vale mais numa candidatura do que quatro tutoriais seguidos, e dá conversa para vinte minutos de entrevista."],
            ["aviso", "Testes que dependem uns dos outros, em que o segundo usa o produto criado pelo primeiro, passam localmente e falham na CI, onde a ordem pode mudar. Cada teste cria o que precisa. Sem exceções."]
          ],
          quiz: [
            { p: "Os teus testes de API passam localmente e falham na CI, com erros de 'produto não existe'. Causa mais provável?", o: ["A CI é lenta", "Os testes dependem da ordem e do estado deixado por outros testes", "Falta um sleep"], c: 1,
              e: "Estado partilhado outra vez. Base de dados nova por teste, e cada teste cria os dados de que precisa." }
          ],
          exercicio: {
            enunciado: "Escreve `criar_e_ler(cliente, produto)` que faz `cliente.post('/produtos', produto)`, tira o `id` do corpo devolvido e faz `cliente.get(f'/produtos/{id}')`, devolvendo o tuplo `(codigo_do_get, corpo_do_get)`. Se o post não devolver 201, devolve `(codigo_do_post, None)` sem fazer o get.",
            inicio: "def criar_e_ler(cliente, produto):\n    pass\n",
            testes: "class _ClienteFalso:\n    def __init__(self, codigo_post=201):\n        self.codigo_post = codigo_post\n        self.pedidos = []\n        self.guardados = {}\n    def post(self, caminho, corpo):\n        self.pedidos.append(('POST', caminho))\n        if self.codigo_post != 201:\n            return self.codigo_post, {'erros': ['preco']}\n        self.guardados[1] = {**corpo, 'id': 1}\n        return 201, self.guardados[1]\n    def get(self, caminho):\n        self.pedidos.append(('GET', caminho))\n        chave = int(caminho.rsplit('/', 1)[1])\n        if chave not in self.guardados:\n            return 404, None\n        return 200, self.guardados[chave]\n_c = _ClienteFalso()\n_codigo, _corpo = criar_e_ler(_c, {'nome': 'teclado', 'preco': 39.9})\nverifica('leitura com 200', _codigo == 200)\nverifica('leu o produto criado', _corpo['nome'] == 'teclado')\nverifica('fez post e depois get do id certo', _c.pedidos == [('POST', '/produtos'), ('GET', '/produtos/1')])\n_mau = _ClienteFalso(codigo_post=422)\nverifica('post falhado devolve o código e None', criar_e_ler(_mau, {}) == (422, None))\nverifica('post falhado não faz get', _mau.pedidos == [('POST', '/produtos')])"
          }
        }
      ]
    },
    {
      n: 21, fase: 4, titulo: "Concorrência",
      objetivo: "Fazer 200 pedidos em 3 segundos em vez de 3 minutos.",
      licoes: [
        {
          id: "21.1", titulo: "async e await sem misticismo", min: 18, estado: "pronta",
          meta: "No fim: sabes onde a assincronia ajuda mesmo e onde não faz diferença nenhuma.",
          blocos: [
            ["p", "Assincronia não torna o teu código mais rápido a calcular. Serve para uma coisa só: enquanto o programa espera por algo de fora, rede, disco ou base de dados, fazer outra coisa em vez de ficar parado."],
            ["h", "As duas palavras"],
            ["p", "`async def` cria uma corotina: chamá-la não executa nada, devolve um objeto. `await` diz 'espera aqui por isto, e entretanto deixa correr o resto'. Só se pode usar `await` dentro de uma função `async`."],
            ["code", "import asyncio\nimport httpx\n\nasync def obter(cliente, caminho):\n    resposta = await cliente.get(caminho)\n    resposta.raise_for_status()\n    return resposta.json()\n\nasync def principal():\n    async with httpx.AsyncClient(base_url=\"https://api.exemplo.pt\") as cliente:\n        alunos, turmas = await asyncio.gather(\n            obter(cliente, \"/alunos\"),\n            obter(cliente, \"/turmas\"),\n        )\n        return len(alunos), len(turmas)\n\nprint(asyncio.run(principal()))"],
            ["p", "`asyncio.gather` lança os dois pedidos ao mesmo tempo. Se cada um demora 300 milissegundos, o total é 300 e não 600. Com cinquenta pedidos, a diferença deixa de ser um detalhe."],
            ["aviso", "`asyncio.run` precisa de um ciclo de eventos que o Python controla, e aqui no browser já existe um a correr a página. Por isso os exemplos de rede desta aula não correm no botão: correm no teu computador. O exercício no fim usa corotinas que não esperam por nada real, e esse funciona."],
            ["h", "Onde ajuda e onde não"],
            ["lista", [
              "Ajuda: muitos pedidos HTTP, muitas consultas a bases de dados, servidores com milhares de ligações abertas.",
              "Não ajuda: cálculo puro. Uma soma de dez milhões de números não fica mais rápida, porque nunca está à espera de ninguém.",
              "Para cálculo pesado usa-se `multiprocessing`, que usa vários núcleos a sério.",
              "Uma chamada bloqueante dentro de código assíncrono, como `time.sleep` ou `requests.get`, congela o ciclo inteiro. É o erro clássico."
            ]],
            ["code", "# congela tudo, incluindo os outros pedidos\nasync def mau():\n    time.sleep(2)\n\n# liberta o ciclo para outras tarefas\nasync def bom():\n    await asyncio.sleep(2)"],
            ["h", "Limitar quantos correm ao mesmo tempo"],
            ["p", "Lançar mil pedidos em paralelo contra uma API é uma boa forma de levar com um 429 ou de ser bloqueado. Um semáforo limita quantos correm ao mesmo tempo."],
            ["code", "async def com_limite(cliente, caminhos, maximo=10):\n    limite = asyncio.Semaphore(maximo)\n\n    async def um(caminho):\n        async with limite:\n            return await obter(cliente, caminho)\n\n    return await asyncio.gather(*[um(c) for c in caminhos])"],
            ["obra", "Em entrevistas, a pergunta é quase sempre a mesma: 'quando é que async ajuda?'. A resposta em duas frases: quando o programa passa o tempo à espera de entrada e saída, não quando passa o tempo a calcular. E o Python continua a ter um ciclo de eventos só, num único núcleo."],
            ["aviso", "Não converta o projeto todo para async por moda. Código assíncrono contamina: quem chama uma corotina tem de ser corotina também. Se não tens um problema de espera, o custo em complexidade não se paga."]
          ],
          quiz: [
            { p: "O teu serviço async ficou mais lento depois de acrescentares um cálculo pesado numa rota. Porquê?", o: ["Falta memória", "O cálculo bloqueia o ciclo de eventos e trava todos os outros pedidos", "async é sempre mais lento"], c: 1,
              e: "O ciclo de eventos é um só. Trabalho de CPU dentro dele pára tudo. Manda-o para um executor ou para outro processo." }
          ],
          exercicio: {
            enunciado: "Escreve a corotina `total(produtos)` que soma os preços obtidos com `await obter_preco(p)`, um produto de cada vez, num ciclo. Produtos desconhecidos valem zero. Não uses `asyncio.gather` nem `asyncio.run`: aqui não há ciclo de eventos disponível.",
            inicio: "async def obter_preco(produto):\n    return {\"teclado\": 39.9, \"rato\": 12.5}.get(produto, 0.0)\n\n\nasync def total(produtos):\n    pass\n",
            testes: "import inspect as _i\ndef _correr(coro):\n    try:\n        coro.send(None)\n    except StopIteration as _e:\n        return _e.value\n    return 'suspendeu'\nverifica('total é uma corotina', _i.iscoroutinefunction(total))\nverifica('soma os preços', abs(_correr(total(['teclado', 'rato'])) - 52.4) < 0.001)\nverifica('lista vazia dá zero', _correr(total([])) == 0)\nverifica('produto desconhecido vale zero', _correr(total(['xpto'])) == 0.0)"
          }
        }
      ]
    },
    {
      n: 22, fase: 4, titulo: "Pôr no ar",
      objetivo: "Software que só corre no teu portátil não conta.",
      licoes: [
        {
          id: "22.1", titulo: "Docker para quem escreve Python", min: 20, estado: "pronta",
          meta: "No fim: empacotas a aplicação numa imagem que corre igual em qualquer máquina.",
          blocos: [
            ["p", "Uma imagem é o teu código mais o sistema mínimo para o correr, tudo congelado. Um contentor é essa imagem em execução. O problema que isto resolve é o do módulo 10.2 levado ao limite: não é só a versão da biblioteca, é a versão do Python, do sistema e das bibliotecas do sistema."],
            ["code", "# Dockerfile\nFROM python:3.12-slim\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . .\n\nENV PYTHONUNBUFFERED=1\nEXPOSE 8000\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]"],
            ["code", "docker build -t vendas:0.1 .\ndocker run -p 8000:8000 --env-file .env vendas:0.1\ndocker logs -f <id>\ndocker exec -it <id> bash"],
            ["h", "Porque é que os requisitos são copiados primeiro"],
            ["p", "Cada linha do Dockerfile é uma camada em cache. Se copiares o código todo antes do `pip install`, qualquer alteração numa linha de Python invalida a cache e reinstalas as dependências outra vez. Copiar só o ficheiro de requisitos primeiro faz a diferença entre dois segundos e dois minutos, a cada build."],
            ["h", "Imagens pequenas"],
            ["lista", [
              "`python:3.12-slim` em vez da imagem completa: centenas de megabytes a menos.",
              "`.dockerignore` com `.venv`, `.git`, `__pycache__` e dados de teste.",
              "`--no-cache-dir` no pip, que não guarda o que já não precisas.",
              "Build em duas fases quando é preciso compilar: uma imagem constrói, a final só recebe o resultado."
            ]],
            ["h", "Configuração por variáveis de ambiente"],
            ["p", "A mesma imagem tem de servir para desenvolvimento, testes e produção. O que muda entre eles é configuração, e a configuração entra por variáveis de ambiente, nunca dentro da imagem."],
            ["py", "import os\n\ndef config(ambiente):\n    if \"DATABASE_URL\" not in ambiente:\n        raise RuntimeError(\"falta DATABASE_URL\")\n    return {\n        \"base_de_dados\": ambiente[\"DATABASE_URL\"],\n        \"debug\": ambiente.get(\"DEBUG\", \"0\") == \"1\",\n        \"porta\": int(ambiente.get(\"PORT\", 8000)),\n    }\n\nprint(config({\"DATABASE_URL\": \"sqlite:///loja.db\", \"DEBUG\": \"1\"}))"],
            ["p", "Repara que a função recebe o ambiente em vez de ler `os.environ` diretamente. É o mesmo truque do módulo 11.3: assim consegues testá-la com um dicionário, sem mexer no ambiente do processo."],
            ["aviso", "Segredos não entram na imagem. Um `ENV API_KEY=...` no Dockerfile fica gravado na imagem e qualquer pessoa que a descarregue o consegue ler, mesmo que apagues numa camada seguinte. Passam-se em execução, ou vêm do gestor de segredos da plataforma."],
            ["h", "docker compose para o ambiente local"],
            ["code", "services:\n  api:\n    build: .\n    ports: [\"8000:8000\"]\n    env_file: .env\n    depends_on: [bd]\n  bd:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: local\n    volumes:\n      - dados:/var/lib/postgresql/data\n\nvolumes:\n  dados:"],
            ["obra", "Ter o projeto a arrancar com um `docker compose up` é o que permite a um colega novo ser produtivo na primeira manhã em vez de na primeira semana. Nos teus repositórios de portefólio, isto é um sinal claro de que já pensaste em quem vem a seguir."]
          ],
          quiz: [
            { p: "Porque é que se copia o requirements.txt antes do resto do código no Dockerfile?", o: ["Por convenção", "Para a camada de instalação de dependências ficar em cache e não repetir a cada alteração de código", "Porque o pip exige"], c: 1,
              e: "Camadas invalidam-se em cadeia. Ordem certa: o que muda pouco primeiro, o que muda a toda a hora no fim." }
          ],
          exercicio: {
            enunciado: "Escreve `config(ambiente)` que recebe um dicionário de variáveis e devolve a configuração: `base_de_dados` a partir de DATABASE_URL (obrigatória, senão `RuntimeError`), `debug` verdadeiro só quando DEBUG é '1', e `porta` como inteiro a partir de PORT, por omissão 8000.",
            inicio: "def config(ambiente):\n    pass\n",
            testes: "_c = config({'DATABASE_URL': 'sqlite:///loja.db', 'DEBUG': '1', 'PORT': '9000'})\nverifica('lê a base de dados', _c['base_de_dados'] == 'sqlite:///loja.db')\nverifica('debug ligado', _c['debug'] is True)\nverifica('porta como inteiro', _c['porta'] == 9000)\n_d = config({'DATABASE_URL': 'x'})\nverifica('omissões', _d['debug'] is False and _d['porta'] == 8000)\n_falta = False\ntry:\n    config({})\nexcept RuntimeError:\n    _falta = True\nverifica('sem DATABASE_URL rebenta', _falta)"
          }
        },
        {
          id: "22.2", titulo: "Publicar e monitorizar", min: 16, estado: "pronta",
          meta: "No fim: pões o serviço no ar e sabes, sem perguntar a ninguém, se está de pé.",
          blocos: [
            ["p", "Publicar é copiar a imagem para uma máquina que a corre, com a configuração daquele ambiente. As plataformas modernas fazem isso a partir de um push no git. O que é teu é o que vem a seguir: saber se aquilo está bem."],
            ["h", "O caminho até ao ar"],
            ["lista", [
              "A CI corre linter, tipos e testes, como no módulo 15.2.",
              "Constrói a imagem e marca-a com a versão ou o identificador do commit.",
              "Aplica as migrações da base de dados antes de trocar a aplicação.",
              "Arranca a versão nova, confirma a rota de saúde, e só depois desliga a antiga.",
              "Guarda a versão anterior para poder voltar atrás em minutos."
            ]],
            ["p", "Voltar atrás tem de ser mais fácil do que corrigir à pressa. Uma equipa que só consegue avançar acaba a publicar correções em cima de correções às oito da noite."],
            ["h", "A rota de saúde"],
            ["py", "def estado_saude(verificacoes):\n    falhas = [nome for nome, ok in verificacoes.items() if not ok]\n    if not falhas:\n        return \"ok\", []\n    if \"base_de_dados\" in falhas:\n        return \"em baixo\", falhas\n    return \"degradado\", falhas\n\nprint(estado_saude({\"base_de_dados\": True, \"cache\": True}))\nprint(estado_saude({\"base_de_dados\": True, \"cache\": False}))\nprint(estado_saude({\"base_de_dados\": False, \"cache\": True}))"],
            ["p", "Distinguir 'degradado' de 'em baixo' importa: sem cache o serviço responde mais devagar, sem base de dados não responde de todo. Quem monitoriza precisa de saber a diferença para decidir se acorda alguém."],
            ["h", "O que vale a pena observar"],
            ["lista", [
              "Registos estruturados, do módulo 9.3, com um identificador por pedido para seguir o rasto.",
              "Métricas: pedidos por segundo, latência no percentil 95, percentagem de erros.",
              "Alertas sobre sintomas que o utilizador sente, não sobre CPU a 80 por cento.",
              "Rastreio de erros, tipo Sentry, que agrupa exceções e mostra o traceback com o contexto."
            ]],
            ["aviso", "Alertas que disparam sem ninguém fazer nada ensinam a equipa a ignorar alertas. Cada alerta deve ter uma ação associada. Se a resposta habitual é 'passa daqui a bocado', não devia ser alerta, devia ser um gráfico."],
            ["h", "A média mente"],
            ["p", "Latência média de 200 milissegundos pode esconder que um em cada vinte utilizadores espera quatro segundos. Olha para o percentil 95 e para o 99, que é onde vivem as pessoas que desistem e mudam de fornecedor."],
            ["obra", "Numa entrevista, 'como sabes que o teu serviço está a funcionar' separa quem já publicou de quem só correu localhost. A resposta completa fala de rota de saúde, registos com identificador de pedido, métricas de erro e latência, e um plano de voltar atrás."],
            ["aviso", "A primeira coisa a montar não é o painel de gráficos: é conseguir voltar à versão anterior num comando. Sem isso, todos os problemas duram o tempo de encontrar a causa, em vez de durarem dois minutos."]
          ],
          quiz: [
            { p: "A latência média está boa e há utilizadores a queixar-se de lentidão. O que olhas a seguir?", o: ["A média de outro dia", "Os percentis 95 e 99, e as rotas mais lentas", "O CPU do servidor"], c: 1,
              e: "A média dilui a cauda. As queixas vêm quase sempre de uma minoria de pedidos muito lentos, tipicamente uma consulta sem índice." }
          ],
          exercicio: {
            enunciado: "Escreve `estado_saude(verificacoes)`, que recebe um dicionário de nome para booleano e devolve um tuplo. Tudo bem dá `('ok', [])`. Com falhas dá `('em baixo', falhas)` se a `base_de_dados` estiver em falha, senão `('degradado', falhas)`. A lista de falhas vem ordenada alfabeticamente.",
            inicio: "def estado_saude(verificacoes):\n    pass\n",
            testes: "verifica('tudo bem', estado_saude({'base_de_dados': True, 'cache': True}) == ('ok', []))\nverifica('cache em baixo é degradado', estado_saude({'base_de_dados': True, 'cache': False}) == ('degradado', ['cache']))\nverifica('base de dados em baixo é crítico', estado_saude({'base_de_dados': False, 'cache': True}) == ('em baixo', ['base_de_dados']))\nverifica('falhas ordenadas', estado_saude({'cache': False, 'api_externa': False}) == ('degradado', ['api_externa', 'cache']))\nverifica('sem verificações é ok', estado_saude({}) == ('ok', []))"
          }
        }
      ]
    },

    {
      n: 23, fase: 4, titulo: "Programas que te vão pedir no trabalho",
      objetivo: "Os pedidos reais que chegam a um júnior no primeiro trimestre.",
      licoes: [
        {
          id: "23.1", titulo: "Uma ferramenta de linha de comandos", min: 18, estado: "pronta",
          meta: "No fim: escreves um programa que outra pessoa consegue usar sem te perguntar nada.",
          blocos: [
            ["p", "O primeiro programa que te vão pedir para outra pessoa usar é quase sempre um comando: 'faz-me um script que exporte isto'. A diferença entre um script e uma ferramenta é previsibilidade: tem `--help`, aceita argumentos, devolve um código de saída honesto e não destrói nada sem avisar."],
            ["h", "argparse, que já vem no Python"],
            ["code", "import argparse\nimport sys\n\n\ndef construir_parser():\n    p = argparse.ArgumentParser(\n        prog=\"exportar\",\n        description=\"Exporta as vendas de um período para CSV ou JSON.\",\n    )\n    p.add_argument(\"ficheiro\", help=\"ficheiro de entrada\")\n    p.add_argument(\"--dias\", type=int, default=30, help=\"período a exportar\")\n    p.add_argument(\"--formato\", choices=[\"csv\", \"json\"], default=\"csv\")\n    p.add_argument(\"--dry-run\", action=\"store_true\", help=\"mostra o que faria, sem escrever\")\n    p.add_argument(\"-v\", \"--verbose\", action=\"store_true\")\n    return p\n\n\ndef main(argv=None):\n    args = construir_parser().parse_args(argv)\n    if args.dry_run:\n        print(f\"escreveria {args.ficheiro} em {args.formato}\", file=sys.stderr)\n        return 0\n    ...\n    return 0\n\n\nif __name__ == \"__main__\":\n    sys.exit(main())"],
            ["p", "Com vinte linhas ganhaste `--help` escrito sozinho, conversão de tipos, validação de opções e mensagens de erro decentes. Escrever isto à mão com `sys.argv` é trabalho a mais e fica pior."],
            ["py", "import argparse\n\np = argparse.ArgumentParser(prog=\"exportar\")\np.add_argument(\"ficheiro\")\np.add_argument(\"--dias\", type=int, default=30)\np.add_argument(\"--dry-run\", action=\"store_true\")\n\nprint(p.parse_args([\"vendas.csv\"]))\nprint(p.parse_args([\"vendas.csv\", \"--dias\", \"7\", \"--dry-run\"]))"],
            ["h", "As regras que fazem uma ferramenta boa"],
            ["lista", [
              "O resultado vai para o `stdout`. As mensagens para a pessoa vão para o `stderr`. Assim, `programa > ficheiro.csv` guarda dados limpos e as mensagens continuam a aparecer no ecrã.",
              "Código de saída: `0` correu bem, `1` falhou, `2` foi mal usado. É por aqui que o cron e o CI sabem se devem gritar.",
              "`--dry-run` em tudo o que apaga, altera ou envia. E que seja o comportamento por omissão enquanto a ferramenta for nova.",
              "Nada de `input()`: uma ferramenta tem de poder correr sem ninguém a olhar.",
              "Segredos vêm de variáveis de ambiente, nunca de argumentos: a linha de comandos fica no histórico e aparece na lista de processos."
            ]],
            ["py", "import argparse\n\np = argparse.ArgumentParser()\nsub = p.add_subparsers(dest=\"comando\", required=True)\n\nimportar = sub.add_parser(\"importar\")\nimportar.add_argument(\"ficheiro\")\n\nlistar = sub.add_parser(\"listar\")\nlistar.add_argument(\"--limite\", type=int, default=10)\n\nprint(p.parse_args([\"importar\", \"dados.csv\"]))\nprint(p.parse_args([\"listar\", \"--limite\", \"3\"]))"],
            ["obra", "`--dry-run` já salvou mais carreiras do que qualquer padrão de desenho. Quando escreveres uma ferramenta que apaga, migra ou envia, faz a versão que só mostra primeiro, mostra a saída a alguém, e só depois ligas a que age a sério."],
            ["aviso", "Três coisas que a tua ferramenta vai encontrar no primeiro dia e quase ninguém trata: caminhos com espaços e acentos, ficheiros que não existem, e um `Ctrl+C` a meio. O primeiro resolve-se com `pathlib`, o segundo com uma mensagem clara e código 1, o terceiro apanhando `KeyboardInterrupt` para sair limpo."]
          ],
          quiz: [
            { p: "A tua ferramenta imprime o relatório e também as mensagens de progresso no `stdout`. Qual é o problema?", o: ["Nenhum", "Quem redirecionar a saída para um ficheiro fica com as mensagens misturadas nos dados", "É mais lento"], c: 1,
              e: "Dados para o `stdout`, conversa para o `stderr`. É o que permite encadear a tua ferramenta com outras, que é para isso que as ferramentas de linha de comandos servem." }
          ],
          exercicio: {
            enunciado: "Escreve `construir_parser()`, que devolve um `ArgumentParser` com: um argumento posicional obrigatório `ficheiro`; a opção `--dias`, inteira, com omissão 30; a bandeira `--dry-run`, que fica `True` quando está presente; e a opção `--formato`, limitada a `csv` ou `json`, com omissão `csv`.",
            inicio: "import argparse\n\n\ndef construir_parser():\n    pass\n",
            testes: "_p = construir_parser()\n_a = _p.parse_args(['vendas.csv'])\nverifica('ficheiro posicional', _a.ficheiro == 'vendas.csv')\nverifica('dias por omissao', _a.dias == 30)\nverifica('dry_run por omissao e False', _a.dry_run is False)\nverifica('formato por omissao', _a.formato == 'csv')\n_b = _p.parse_args(['x.csv', '--dias', '7', '--dry-run', '--formato', 'json'])\nverifica('dias convertido para inteiro', _b.dias == 7 and isinstance(_b.dias, int))\nverifica('bandeira ativa', _b.dry_run is True)\nverifica('formato escolhido', _b.formato == 'json')\n_recusou = False\ntry:\n    _p.parse_args(['x.csv', '--formato', 'xml'])\nexcept SystemExit:\n    _recusou = True\nverifica('formato invalido e rejeitado', _recusou)\n_sem_ficheiro = False\ntry:\n    _p.parse_args([])\nexcept SystemExit:\n    _sem_ficheiro = True\nverifica('ficheiro e obrigatorio', _sem_ficheiro)"
          }
        },
        {
          id: "23.2", titulo: "Um relatório a partir de dados que ninguém limpou", min: 20, estado: "pronta",
          meta: "No fim: produzes um relatório fiável a partir de um ficheiro sujo, e dizes o que deitaste fora.",
          blocos: [
            ["p", "O pedido é sempre parecido: 'pega neste ficheiro e diz-me os totais por produto'. O ficheiro tem colunas vazias, datas em três formatos, vírgulas decimais, linhas repetidas e um cabeçalho com um espaço a mais. Isto não é azar: é o estado normal dos dados."],
            ["h", "O caminho: ler, normalizar, validar, agregar, escrever"],
            ["code", "import csv\nfrom pathlib import Path\n\n\ndef ler(caminho):\n    # utf-8-sig come o BOM que o Excel põe à cabeça\n    with Path(caminho).open(encoding=\"utf-8-sig\", newline=\"\") as f:\n        return list(csv.DictReader(f, delimiter=\";\"))"],
            ["lista", [
              "`newline=\"\"` no `open` é obrigatório com o módulo `csv`, senão partes-te com quebras de linha dentro de campos.",
              "`encoding=\"utf-8-sig\"` para ficheiros do Excel; `utf-8` para tudo o resto; e pergunta a origem quando os acentos vierem partidos.",
              "`DictReader` dá-te dicionários com os nomes das colunas. Normaliza os nomes: `.strip().lower()`.",
              "O separador em Portugal é muitas vezes `;`, porque a vírgula é decimal."
            ]],
            ["h", "Normalizar antes de validar"],
            ["py", "def a_numero(bruto):\n    \"\"\"Aceita '1 234,56', '1234.56' e ' 12 '. Devolve None se não der.\"\"\"\n    if bruto is None:\n        return None\n    limpo = bruto.strip().replace(\" \", \"\").replace(\"\\u00a0\", \"\")\n    if limpo.count(\",\") == 1 and limpo.count(\".\") == 0:\n        limpo = limpo.replace(\",\", \".\")\n    else:\n        limpo = limpo.replace(\",\", \"\")\n    try:\n        return float(limpo)\n    except ValueError:\n        return None\n\nfor bruto in [\"39,90\", \"1 234,56\", \"1,234.56\", \" 12 \", \"N/D\", \"\"]:\n    print(repr(bruto), \"->\", a_numero(bruto))"],
            ["h", "Nunca deites uma linha fora em silêncio"],
            ["p", "Cada linha rejeitada leva o número da linha e o motivo. No fim entregas duas coisas: o relatório e a lista de rejeições. É a diferença entre um número em que se confia e um número que alguém vai ter de auditar."],
            ["py", "def processar(linhas):\n    totais, rejeitadas = {}, []\n    for i, linha in enumerate(linhas, start=1):\n        produto = (linha.get(\"produto\") or \"\").strip()\n        if not produto:\n            rejeitadas.append((i, \"produto em falta\"))\n            continue\n        valor = a_numero(linha.get(\"valor\"))\n        if valor is None:\n            rejeitadas.append((i, \"valor inválido\"))\n            continue\n        totais[produto] = round(totais.get(produto, 0.0) + valor, 2)\n    return totais, rejeitadas\n\n\ndef a_numero(bruto):\n    try:\n        return float((bruto or \"\").strip().replace(\",\", \".\"))\n    except ValueError:\n        return None\n\n\nlinhas = [{\"produto\": \"teclado\", \"valor\": \"39,90\"}, {\"produto\": \"\", \"valor\": \"5\"}]\nprint(processar(linhas))"],
            ["h", "Escrever o resultado"],
            ["code", "import csv\n\nwith open(\"relatorio.csv\", \"w\", encoding=\"utf-8\", newline=\"\") as f:\n    escritor = csv.writer(f, delimiter=\";\")\n    escritor.writerow([\"produto\", \"total\"])\n    for produto, total in sorted(totais.items()):\n        escritor.writerow([produto, f\"{total:.2f}\"])"],
            ["obra", "Entregar 'processei 10 000 linhas' sem dizer que 400 foram ignoradas é pior do que não entregar nada, porque alguém vai tomar decisões com o número. 'Processei 9 600, rejeitei 400, aqui está o ficheiro com os motivos' é a mesma meia hora de trabalho e é a diferença entre um júnior e um estagiário."],
            ["aviso", "`1.234,56` e `1,234.56` são o mesmo número escrito por países diferentes, e `1.234` pode ser mil duzentos e trinta e quatro ou um vírgula dois três quatro. Não adivinhes: pergunta a origem do ficheiro e escreve a regra no código, com um comentário."]
          ],
          quiz: [
            { p: "O relatório dá um total 30% abaixo do esperado e ninguém percebe porquê. O que faltou ao programa?", o: ["Mais testes de desempenho", "Registar e devolver as linhas rejeitadas com o motivo", "Usar pandas"], c: 1,
              e: "Sem a lista de rejeições não há forma de saber se faltam dados ou se o cálculo está errado. As rejeições são parte do resultado, não um detalhe interno." }
          ],
          exercicio: {
            enunciado: "Escreve `processar(linhas)`, que recebe dicionários com `produto` e `valor`. O valor pode vir com vírgula decimal e espaços à volta; o nome do produto pode vir com espaços. Devolve o par `(totais, rejeitadas)`: `totais` é produto para soma arredondada a duas casas, e `rejeitadas` é uma lista de `(numero_da_linha, motivo)` com `'produto em falta'` ou `'valor invalido'`. A primeira linha é a número 1.",
            inicio: "def processar(linhas):\n    pass\n",
            testes: "_linhas = [\n    {'produto': 'teclado', 'valor': '39,90'},\n    {'produto': ' teclado ', 'valor': ' 10.10 '},\n    {'produto': '', 'valor': '5'},\n    {'produto': 'rato', 'valor': 'x'},\n]\n_totais, _rejeitadas = processar(_linhas)\nverifica('soma por produto', _totais == {'teclado': 50.0})\nverifica('duas rejeicoes', len(_rejeitadas) == 2)\nverifica('motivo de produto em falta', _rejeitadas[0] == (3, 'produto em falta'))\nverifica('motivo de valor invalido', _rejeitadas[1] == (4, 'valor invalido'))\n_t2, _r2 = processar([])\nverifica('sem linhas', _t2 == {} and _r2 == [])\n_t3, _r3 = processar([{'produto': 'rato', 'valor': '1'}, {'produto': 'ana', 'valor': '2'}])\nverifica('produtos diferentes somam em separado', _t3 == {'rato': 1.0, 'ana': 2.0})\n_t4, _r4 = processar([{'produto': 'x'}])\nverifica('valor em falta tambem e rejeitado', _r4 == [(1, 'valor invalido')])"
          }
        },
        {
          id: "23.3", titulo: "Importar dados sem estragar nada", min: 18, estado: "pronta",
          meta: "No fim: escreves uma importação que se pode correr duas vezes sem duplicar nada.",
          blocos: [
            ["p", "Trazer dados de outro sistema para o nosso é das tarefas mais comuns e das mais fáceis de fazer mal. A pergunta que te vão fazer na revisão, e que decide tudo, é: **o que acontece se isto correr duas vezes?**"],
            ["h", "Idempotência"],
            ["p", "Uma operação idempotente dá o mesmo resultado à primeira e à décima vez. Sem isto, qualquer falha a meio deixa-te sem saída: se voltares a correr, duplicas; se não voltares, ficas a meio."],
            ["lista", [
              "Encontra a **chave natural**: o que identifica o registo nos dois sistemas. Um NIF, um código de artigo, um identificador externo. Nunca a posição na lista.",
              "Para cada registo que chega: existe? é diferente? Cria, atualiza ou ignora, e conta cada caso.",
              "Nunca um `INSERT` cego. Ou é `upsert`, ou é procurar antes.",
              "Não apagues o que desapareceu da origem: marca como inativo, com data. Apagar é irreversível e a origem pode estar com um problema."
            ]],
            ["h", "Ensaio antes da corrida"],
            ["code", "$ importar --ficheiro clientes.csv --dry-run\nliria criar      412\nliria atualizar   38\nsem alterações  1150\nrejeitadas         6  (ver rejeitadas.csv)\n\n$ importar --ficheiro clientes.csv\ncriados 412, atualizados 38, iguais 1150, rejeitados 6, 14s"],
            ["p", "O ensaio percorre tudo e não escreve nada. É a forma mais barata de descobrir que a coluna que julgavas ser o identificador tem duplicados."],
            ["h", "Falhar a meio"],
            ["lista", [
              "**Transacional**: tudo ou nada, com um `commit` no fim. Simples, e só serve enquanto couber numa transação razoável.",
              "**Retomável**: processa em lotes, com `commit` por lote e um registo de onde ia. Se rebentar ao lote 37, recomeças no 37.",
              "Escolhe uma das duas **antes** de escrever. Uma importação sem nenhuma das duas deixa metade dos dados lá dentro e ninguém sabe qual metade."
            ]],
            ["h", "Registo de auditoria"],
            ["p", "Guarda quem correu, quando, com que ficheiro, e o resumo. Daqui a seis meses, quando alguém perguntar porque é que o cliente 4471 tem o nome errado, a resposta está nesse registo ou não existe."],
            ["obra", "'O que acontece se correr duas vezes?' é a pergunta que distingue quem já levou com isto de quem ainda não. Ter a resposta preparada, antes de a fazerem, é das formas mais rápidas de ganhar confiança numa equipa nova."],
            ["aviso", "Comparar registos com `==` num dicionário que traz campos voláteis, como a data da última sincronização, faz com que tudo pareça diferente e atualizes tudo em todas as corridas. Compara só os campos que interessam ao negócio."]
          ],
          quiz: [
            { p: "A importação rebenta a meio e já criou metade dos registos. O que devia estar no desenho desde o início?", o: ["Um try/except à volta de tudo", "Ou uma transação, ou lotes com registo de progresso para poder retomar", "Correr mais depressa"], c: 1,
              e: "Um `except` que engole o erro deixa-te na mesma situação, mas sem mensagem. O que resolve é decidir de antemão se a operação é atómica ou retomável." }
          ],
          exercicio: {
            enunciado: "Escreve `aplicar(existentes, novos)`, o coração de uma importação idempotente. Ambos são dicionários id para registo. Devolve `(resultado, resumo)`, em que `resultado` é o estado final e `resumo` conta `criados`, `atualizados` e `iguais`. Registos iguais não contam como atualização, e `existentes` não pode ser alterado.",
            inicio: "def aplicar(existentes, novos):\n    pass\n",
            testes: "_ex = {'1': {'nome': 'Ana'}, '2': {'nome': 'Rui'}}\n_novos = {'1': {'nome': 'Ana'}, '2': {'nome': 'Rui Silva'}, '3': {'nome': 'Eva'}}\n_res, _resumo = aplicar(_ex, _novos)\nverifica('resultado completo', _res == {'1': {'nome': 'Ana'}, '2': {'nome': 'Rui Silva'}, '3': {'nome': 'Eva'}})\nverifica('contagens certas', _resumo == {'criados': 1, 'atualizados': 1, 'iguais': 1})\nverifica('nao altera os existentes', _ex == {'1': {'nome': 'Ana'}, '2': {'nome': 'Rui'}})\n_res2, _resumo2 = aplicar(_res, _novos)\nverifica('correr outra vez nao muda nada', _res2 == _res)\nverifica('segunda passagem nao cria nem atualiza', _resumo2 == {'criados': 0, 'atualizados': 0, 'iguais': 3})\nverifica('sem novos nao mexe em nada', aplicar(_ex, {}) == (_ex, {'criados': 0, 'atualizados': 0, 'iguais': 0}))\n_vazio, _rv = aplicar({}, {'9': {'nome': 'Nova'}})\nverifica('importar para vazio cria tudo', _vazio == {'9': {'nome': 'Nova'}} and _rv['criados'] == 1)"
          }
        },
        {
          id: "23.4", titulo: "Uma tarefa agendada que não falha em silêncio", min: 16, estado: "pronta",
          meta: "No fim: desenhas um trabalho automático que se sabe se correu, se falhou, e que se pode reprocessar.",
          blocos: [
            ["p", "Mais cedo do que julgas vais escrever algo que corre às três da manhã sem ninguém a ver: o relatório diário, a sincronização, a limpeza. As exigências são diferentes das de um programa que uma pessoa corre e vigia."],
            ["h", "As cinco propriedades"],
            ["lista", [
              "**Sabe-se que correu**: deixa um registo com início, fim e contagens.",
              "**Sabe-se que falhou**: código de saída diferente de zero e alerta para onde alguém olha. Uma falha silenciosa é pior do que não ter a tarefa.",
              "**Não corre duas vezes ao mesmo tempo**: se a corrida de hoje ainda vai a meio quando começa a de amanhã, tens duas a escrever nos mesmos dados.",
              "**Reprocessável**: recebe a data como parâmetro em vez de perguntar 'que dia é hoje?'.",
              "**Limitada no tempo**: um `timeout` em tudo o que fala com a rede, senão uma chamada pendurada bloqueia a tarefa para sempre."
            ]],
            ["h", "A data como argumento, não como 'hoje'"],
            ["code", "# mau: só sabe processar o dia de hoje\npython3 relatorio.py\n\n# bom: reprocessa qualquer dia, incluindo o que falhou ontem\npython3 relatorio.py --data 2026-03-14"],
            ["p", "Isto parece um detalhe e é a diferença entre 'a tarefa falhou ontem, corre outra vez com a data de ontem' e 'a tarefa falhou ontem, os dados desse dia perderam-se'."],
            ["h", "Não correr duas vezes"],
            ["py", "from pathlib import Path\n\nclass JaEstaACorrer(Exception):\n    pass\n\ndef adquirir(caminho):\n    ficheiro = Path(caminho)\n    try:\n        # x = criar em exclusivo: falha se já existir\n        ficheiro.open(\"x\").close()\n        return True\n    except FileExistsError:\n        raise JaEstaACorrer(f\"já existe {caminho}\")\n\nprint(\"esta é a ideia: um ficheiro de bloqueio criado em exclusivo\")\nprint(\"no fim, em finally, apaga-se\")"],
            ["aviso", "Um ficheiro de bloqueio que não é apagado quando o processo é morto deixa a tarefa bloqueada para sempre. Apaga-o num `finally`, e guarda lá dentro o número do processo e a hora, para alguém poder decidir se é um bloqueio válido ou um resto de uma morte súbita. Em sistemas com várias máquinas, o bloqueio tem de viver na base de dados, não no disco local."],
            ["h", "Agendar"],
            ["code", "# cron: minuto hora dia mês dia-da-semana\n# todos os dias às 03:15, com registo e alerta em caso de falha\n15 3 * * * /opt/app/.venv/bin/python /opt/app/relatorio.py --data $(date -d yesterday +\\%F) >> /var/log/relatorio.log 2>&1"],
            ["lista", [
              "Caminhos absolutos: o cron não tem o teu `PATH` nem a tua pasta atual.",
              "O Python do ambiente virtual, não o do sistema.",
              "`2>&1` para os erros irem para o mesmo registo.",
              "Guarda e agenda em UTC. Mostra em hora local. A mudança da hora existe e cai sempre num domingo de madrugada."
            ]],
            ["obra", "Se a tua tarefa falhar e ninguém souber durante três semanas, os dados errados já foram para relatórios, e alguém já decidiu com eles. Por isso, um trabalho agendado sem alerta de falha é considerado incompleto na revisão, mesmo que o código esteja impecável."]
          ],
          quiz: [
            { p: "A tarefa diária falhou esta noite. O que te permite recuperar sem perder dados?", o: ["Correr outra vez amanhã", "Receber a data como parâmetro, para poder reprocessar o dia que falhou", "Aumentar o timeout"], c: 1,
              e: "Se a tarefa só sabe processar 'hoje', o dia que falhou não volta. A data como argumento transforma uma falha num comando." }
          ],
          exercicio: {
            enunciado: "Escreve `deve_correr(ultima, agora, intervalo_min)`, que decide se a tarefa deve arrancar. Devolve `True` se nunca correu (`ultima` é `None`) ou se já passou pelo menos `intervalo_min` minutos. Se `agora` for anterior a `ultima`, o relógio andou para trás: levanta `ValueError`.",
            inicio: "from datetime import datetime, timedelta\n\n\ndef deve_correr(ultima, agora, intervalo_min):\n    pass\n",
            testes: "from datetime import datetime as _dt, timedelta as _td\n_u = _dt(2026, 1, 5, 3, 0)\nverifica('nunca correu', deve_correr(None, _u, 60) is True)\nverifica('ainda nao passou o intervalo', deve_correr(_u, _u + _td(minutes=30), 60) is False)\nverifica('passou o intervalo', deve_correr(_u, _u + _td(minutes=61), 60) is True)\nverifica('exatamente no intervalo corre', deve_correr(_u, _u + _td(minutes=60), 60) is True)\nverifica('mesmo instante nao corre', deve_correr(_u, _u, 60) is False)\nverifica('intervalo zero corre sempre', deve_correr(_u, _u, 0) is True)\n_erro = False\ntry:\n    deve_correr(_u, _u - _td(minutes=1), 60)\nexcept ValueError:\n    _erro = True\nverifica('relogio para tras levanta ValueError', _erro)"
          }
        },
        {
          id: "23.5", titulo: "Juntar dois sistemas e explicar as diferenças", min: 18, estado: "pronta",
          meta: "No fim: produzes uma reconciliação que diz quais são as diferenças e porquê, não só quantas.",
          blocos: [
            ["p", "'O site diz 1204 encomendas, o sistema de faturação diz 1198. Descobre as seis.' Este pedido vai chegar-te, e a parte difícil não é programar: é normalizar duas realidades que foram construídas por equipas diferentes."],
            ["h", "Antes de comparar, normaliza"],
            ["lista", [
              "A chave: um sistema tem `ENC-00123`, o outro tem `123`. Escreve uma função que converte os dois para a mesma forma e testa-a.",
              "Texto: espaços, maiúsculas, acentos. Nomes de clientes nunca coincidem à primeira.",
              "Datas: fusos horários e o que conta como 'dia'. Uma encomenda das 23:50 em Lisboa é do dia seguinte em UTC.",
              "Dinheiro: cêntimos ou `Decimal` dos dois lados, e a mesma regra de arredondamento (módulo 3.1)."
            ]],
            ["h", "As três diferenças possíveis"],
            ["py", "def reconciliar(a, b, tolerancia=0.01):\n    so_em_a = sorted(set(a) - set(b))\n    so_em_b = sorted(set(b) - set(a))\n    diferentes = []\n    for chave in sorted(set(a) & set(b)):\n        if abs(a[chave] - b[chave]) > tolerancia:\n            diferentes.append((chave, a[chave], b[chave]))\n    return {\"so_em_a\": so_em_a, \"so_em_b\": so_em_b, \"diferentes\": diferentes}\n\nsite = {\"1\": 10.0, \"2\": 20.0, \"3\": 5.0}\nfaturacao = {\"1\": 10.005, \"2\": 25.0, \"4\": 1.0}\nprint(reconciliar(site, faturacao))"],
            ["p", "Repara na tolerância. Sem ela, um cêntimo de arredondamento diferente entre os dois sistemas produz centenas de diferenças fantasma e o relatório passa a ser inútil."],
            ["h", "Entregar o resultado"],
            ["p", "Um número não é uma resposta. O que te vão pedir a seguir é sempre 'porquê', portanto agrupa as diferenças por causa provável antes de entregares."],
            ["code", "6 diferenças:\n  4  só no site        todas depois das 23:00 de ontem  -> ainda não sincronizadas\n  1  só na faturação   encomenda manual criada pelo apoio\n  1  valor diferente   0,02 EUR  -> arredondamento do IVA linha a linha vs no total"],
            ["obra", "Ninguém quer 'há 6 diferenças'. Querem a tabela acima. Apresentar uma reconciliação com as causas agrupadas é o tipo de trabalho que faz um responsável lembrar-se do teu nome, e custa-te mais meia hora do que entregar o número."],
            ["aviso", "Uma reconciliação é uma fotografia de um instante. Se os dois sistemas estiverem a mudar enquanto comparas, geras diferenças que não existem. Fixa uma janela temporal explícita e escreve-a no relatório: 'encomendas criadas até 2026-03-14 00:00 UTC'."]
          ],
          quiz: [
            { p: "Comparaste os totais dos dois sistemas com `==` e apareceram 800 diferenças, todas de cêntimos. Qual é a causa mais provável?", o: ["Um dos sistemas está corrompido", "Arredondamento e comparação de floats sem tolerância", "Faltam dados"], c: 1,
              e: "Regras de arredondamento diferentes, ou floats comparados diretamente, produzem diferenças fantasma em massa. Compara em cêntimos, ou com uma tolerância explícita e escrita no relatório." }
          ],
          exercicio: {
            enunciado: "Escreve `reconciliar(a, b, tolerancia=0.01)`. Recebe dois dicionários id para valor e devolve um dicionário com `'so_em_a'`, `'so_em_b'` (listas de ids ordenadas) e `'diferentes'` (lista de `(id, valor_a, valor_b)` ordenada por id), considerando iguais os valores cuja diferença não ultrapassa a tolerância.",
            inicio: "def reconciliar(a, b, tolerancia=0.01):\n    pass\n",
            testes: "_a = {'1': 10.0, '2': 20.0, '3': 5.0}\n_b = {'1': 10.005, '2': 25.0, '4': 1.0}\n_r = reconciliar(_a, _b)\nverifica('so em a', _r['so_em_a'] == ['3'])\nverifica('so em b', _r['so_em_b'] == ['4'])\nverifica('diferencas acima da tolerancia', _r['diferentes'] == [('2', 20.0, 25.0)])\nverifica('dentro da tolerancia nao conta', ('1', 10.0, 10.005) not in _r['diferentes'])\nverifica('tudo vazio', reconciliar({}, {}) == {'so_em_a': [], 'so_em_b': [], 'diferentes': []})\nverifica('tolerancia configuravel', reconciliar({'1': 10.0}, {'1': 11.0}, tolerancia=2)['diferentes'] == [])\nverifica('diferenca negativa tambem conta', reconciliar({'1': 5.0}, {'1': 1.0})['diferentes'] == [('1', 5.0, 1.0)])\n_muitos = reconciliar({'b': 1.0, 'a': 1.0}, {})\nverifica('so_em_a vem ordenado', _muitos['so_em_a'] == ['a', 'b'])"
          }
        }
      ]
    },

    /* ---------------- FASE 5 ---------------- */
    {
      n: 24, fase: 5, titulo: "Projeto final",
      objetivo: "Uma peça de software completa que aguenta perguntas.",
      licoes: [
        {
          id: "24.1", titulo: "Escolher um projeto que não seja o de toda a gente", min: 14, estado: "pronta",
          meta: "No fim: escolhes um projeto de portefólio com critérios em vez de com entusiasmo.",
          blocos: [
            ["p", "Quem recruta vê a mesma lista todas as semanas: gestor de tarefas, clone do Twitter, previsão do tempo, bot de Discord. Não são maus projetos, são invisíveis. O objetivo do portefólio não é provar que sabes seguir um tutorial, é dar assunto de conversa técnica."],
            ["h", "Quatro critérios"],
            ["lista", [
              "Dados reais, vindos de uma fonte que muda: uma API pública, um portal de dados abertos, ficheiros que descarregas todos os dias.",
              "Um problema que é teu ou de alguém que conheces. Motivação para acabar, e uma história para contar em entrevista.",
              "Âmbito fechado, que se acaba em duas ou três semanas de serões. Projeto eterno é projeto que nunca se mostra.",
              "Espaço para o que este curso ensinou: tratamento de falhas, testes, uma pequena API ou base de dados."
            ]],
            ["h", "Exemplos que funcionam"],
            ["lista", [
              "Cruzar horários de transportes com os teus e avisar quando compensa sair mais cedo.",
              "Seguir preços de um produto que queres comprar e mostrar o histórico com um gráfico.",
              "Ler os boletins de uma câmara municipal e avisar quando aparece algo sobre a tua rua.",
              "Automatizar uma tarefa chata do trabalho de um familiar, com dados reais e feios."
            ]],
            ["p", "Repara no padrão: dados que chegam sujos, uma regra de negócio pequena, e um resultado que alguém quer ver. É exatamente o formato do trabalho de um júnior."],
            ["obra", "Em entrevista, a pergunta a seguir a 'fala-me do teu projeto' é 'que decisão foi difícil'. Um projeto copiado não tem resposta para isso. Um projeto teu tem cinco: porque escolheste guardar em SQLite, o que fazes quando a fonte falha, porque desististe daquela funcionalidade."],
            ["h", "Um projeto acabado, não três começados"],
            ["p", "Acabado quer dizer: instala-se em três comandos, tem testes, tem README, trata dos erros e não tem funcionalidades a meio. Vale mais do que três repositórios com o primeiro commit entusiasmado e nada depois."],
            ["aviso", "Não ponhas no portefólio código que não consegues explicar linha a linha, venha ele de um tutorial ou de um assistente. A pergunta 'porque é que aqui está um `try` à volta disto?' aparece sempre, e não saber responder custa mais do que não ter projeto nenhum."],
            ["h", "Como o vais mostrar"],
            ["lista", [
              "Repositório público, com README que explica o problema antes da tecnologia.",
              "Alguns testes a passar e a CI verde do módulo 15.2.",
              "Commits pequenos e datados ao longo de semanas, e não um só commit com tudo.",
              "Se for uma API ou um site, um sítio onde a pessoa possa clicar e ver a funcionar."
            ]]
          ],
          quiz: [
            { p: "Tens três projetos a meio e duas semanas até começar a candidatar-te. O que fazes?", o: ["Começar um quarto, melhor", "Acabar um deles em condições, com testes e README", "Publicar os três como estão"], c: 1,
              e: "Um projeto acabado prova que consegues fechar trabalho, que é o risco número um de contratar um júnior. Três a meio provam o contrário." }
          ],
          exercicio: {
            enunciado: "Escreve `avaliar_projeto(projeto)` que recebe um dicionário com as chaves `dados_reais`, `problema_proprio`, `ambito_fechado` e `tem_testes` e devolve a lista dos critérios em falta, por esta ordem. Projeto completo devolve lista vazia.",
            inicio: "def avaliar_projeto(projeto):\n    pass\n",
            testes: "_bom = {'dados_reais': True, 'problema_proprio': True, 'ambito_fechado': True, 'tem_testes': True}\nverifica('projeto completo', avaliar_projeto(_bom) == [])\nverifica('sem testes', avaliar_projeto({**_bom, 'tem_testes': False}) == ['tem_testes'])\nverifica('ordem dos critérios', avaliar_projeto({**_bom, 'dados_reais': False, 'ambito_fechado': False}) == ['dados_reais', 'ambito_fechado'])\nverifica('dicionário vazio falha em tudo', len(avaliar_projeto({})) == 4)"
          }
        },
        {
          id: "24.2", titulo: "README, licença e histórico de commits", min: 14, estado: "pronta",
          meta: "No fim: o teu repositório explica-se sozinho a quem tem trinta segundos.",
          blocos: [
            ["p", "Quem recruta abre o repositório, lê o README e decide em menos de um minuto se continua. Esse ficheiro é a capa do teu trabalho técnico, e a maior parte dos candidatos deixa lá o texto gerado por omissão."],
            ["h", "A estrutura que funciona"],
            ["code", "# Avisos da Câmara\n\nLê os boletins municipais e avisa quando aparece algo sobre uma rua.\nFiz isto porque perdi uma obra na minha rua por não ler o boletim a tempo.\n\n## O problema\nOs boletins saem em PDF, sem pesquisa, e ninguém os lê.\n\n## Como correr\n```\npython -m venv .venv && source .venv/bin/activate\npip install -r requirements.txt\ncp .env.exemplo .env\npython -m avisos\n```\n\n## Testes\n```\npytest -q\n```\n\n## Decisões\n- SQLite em vez de Postgres: são milhares de linhas, não milhões.\n- Tentativas com espera crescente quando o site da câmara falha, que falha muito.\n\n## O que falta\n- Envio por email. Para já mostra na consola."],
            ["lista", [
              "Primeira frase: o que faz e para quem. Sem 'projeto desenvolvido no âmbito de'.",
              "Como correr, em comandos que funcionam mesmo. Testa-os numa pasta limpa.",
              "Uma secção de decisões, que é o que dá conversa em entrevista.",
              "O que falta, escrito por ti. Mostra critério, e desarma a pergunta 'porque não fizeste x'.",
              "Uma captura de ecrã ou um exemplo da saída, se houver."
            ]],
            ["obra", "A secção de decisões é a que separa um repositório de aluno de um repositório de profissional. Escrever 'escolhi X em vez de Y porque Z' prova que houve escolha, e é literalmente o que fazes num documento de desenho no trabalho."],
            ["h", "Licença"],
            ["p", "Sem licença, ninguém pode legalmente usar o teu código, nem para experimentar. Um ficheiro `LICENSE` com MIT resolve, é o que a maior parte dos projetos pequenos usa, e mostra que sabes que a questão existe."],
            ["h", "O histórico conta uma história"],
            ["lista", [
              "Commits pequenos, ao longo de semanas, com mensagens no formato do módulo 16.1.",
              "Ramos com pull requests, mesmo trabalhando sozinho: mostra o processo e dá-te prática.",
              "Sem ficheiros gerados, sem `.venv`, sem `.env` com segredos. Um `.gitignore` desde o primeiro commit.",
              "Se apagares e recriares o repositório para 'ficar limpo', apagas a prova de que trabalhaste ao longo do tempo."
            ]],
            ["aviso", "Verifica que nunca gravaste um segredo. Se aconteceu, não chega apagar num commit seguinte: fica no histórico e é indexado por robôs em minutos. Roda a chave e assume que a antiga está comprometida."],
            ["h", "Antes de mandares o link"],
            ["lista", [
              "Clona o repositório numa pasta nova e segue o teu próprio README, palavra por palavra.",
              "Corre os testes numa máquina limpa, ou confia na CI para o fazer por ti.",
              "Lê o código com olhos de estranho e apaga o que está comentado e os `TODO` velhos.",
              "Confirma que a descrição do repositório e os tópicos estão preenchidos."
            ]]
          ],
          quiz: [
            { p: "O que é que um recrutador técnico procura primeiro no teu repositório?", o: ["O número de estrelas", "Se percebe em trinta segundos o que o projeto faz e como se corre", "A linguagem usada"], c: 1,
              e: "Ninguém investiga um projeto que não se explica. Clareza no README é a diferença entre ser lido e ser fechado." }
          ],
          exercicio: {
            enunciado: "Escreve `seccoes_em_falta(readme)` que recebe o texto do README e devolve, pela ordem indicada, quais das secções 'O problema', 'Como correr' e 'Testes' não aparecem como título de nível dois (linhas que começam por '## '). Ignora maiúsculas e espaços extra.",
            inicio: "def seccoes_em_falta(readme):\n    pass\n",
            testes: "_completo = '# Projeto\\n\\n## O problema\\ntexto\\n\\n##  como correr\\n\\n## Testes\\n'\nverifica('readme completo', seccoes_em_falta(_completo) == [])\nverifica('sem testes', seccoes_em_falta('## O problema\\n## Como correr\\n') == ['Testes'])\nverifica('readme vazio', seccoes_em_falta('') == ['O problema', 'Como correr', 'Testes'])\nverifica('título de nível um não conta', seccoes_em_falta('# Testes\\n## O problema\\n## Como correr\\n') == ['Testes'])"
          }
        }
      ]
    },
    {
      n: 25, fase: 5, titulo: "Recrutamento",
      objetivo: "Passar da candidatura à proposta.",
      licoes: [
        {
          id: "25.1", titulo: "CV e perfil para vagas de Python", min: 14, estado: "pronta",
          meta: "No fim: lês um anúncio como quem sabe o que lá está e respondes a cada requisito.",
          blocos: [
            ["p", "Um anúncio de emprego não é uma lista de exigências: é uma lista de desejos escrita por várias pessoas. Costuma ter três camadas, e saber separá-las é o que evita não te candidatares a uma vaga que era tua."],
            ["lista", [
              "O que é mesmo obrigatório: normalmente três ou quatro coisas, e aparecem também na descrição do dia a dia.",
              "O que se aprende no trabalho: bibliotecas específicas, ferramentas internas, um domínio de negócio.",
              "A lista de desejos: aquelas dez tecnologias que ninguém domina todas.",
              "Anos de experiência: um filtro grosseiro. Com portefólio e uma boa conversa, é negociável mais vezes do que parece."
            ]],
            ["obra", "A regra prática que resulta: candidata-te se cumpres a maioria dos obrigatórios e consegues mostrar como aprendes o resto. Candidatos que só se candidatam quando cumprem 100 por cento candidatam-se a vagas abaixo do que valem."],
            ["h", "O CV de quem não tem experiência"],
            ["lista", [
              "Uma página. Sempre.",
              "No topo, três linhas sobre quem és e o que procuras, sem frases feitas.",
              "Projetos antes da formação, com uma linha do que faz e uma do que resolveste, com número quando houver.",
              "Ligações que funcionam: repositório, e a demonstração se existir.",
              "Competências agrupadas com honestidade: 'uso todos os dias' não é o mesmo que 'já experimentei'."
            ]],
            ["code", "Avisos da Câmara — Python, FastAPI, SQLite, pytest\nLê boletins municipais em PDF e avisa sobre uma rua específica.\nTrata falhas do site de origem com tentativas espaçadas; 40 testes, CI no GitHub Actions.\ngithub.com/onome/avisos-camara"],
            ["p", "Três linhas: o quê, a parte difícil, onde ver. Sem 'desenvolvido com paixão', sem lista de tecnologias sem contexto. Quem lê tem trinta segundos e cinquenta CV para ver."],
            ["h", "Responder aos requisitos, um a um"],
            ["p", "Antes de te candidatares, faz uma tabela mental: para cada requisito, qual é a prova. Se a prova é um projeto, diz qual. Se não tens prova, diz o que tens de mais próximo. Isto serve para o CV, para a carta e para a primeira entrevista, que vai seguir a mesma lista."],
            ["aviso", "Não inventes. 'Conhecimento de Docker' quando nunca escreveste um Dockerfile descobre-se na primeira pergunta, e nessa altura perdes a credibilidade sobre tudo o resto que disseste. 'Ainda não usei em produção, montei no meu projeto e sei explicar o Dockerfile' é uma resposta forte."],
            ["h", "O perfil público"],
            ["lista", [
              "Fotografia normal, título que diz o que fazes e o que procuras.",
              "O texto de apresentação em português corrente, com o que sabes fazer e um exemplo.",
              "Repositório fixado no topo do GitHub, com descrição preenchida.",
              "Se escreveres sobre o que aprendeste, mesmo em notas curtas, ficas à frente de quase toda a gente."
            ]]
          ],
          quiz: [
            { p: "A vaga pede 2 anos de experiência e cinco tecnologias. Tens três delas e nenhum ano. O que fazes?", o: ["Não te candidatas", "Candidatas-te, com o CV a mostrar prova das três e o que estás a fazer para as outras", "Escreves que tens 2 anos"], c: 1,
              e: "Muitas vagas são escritas com a lista de desejos. Quem decide olha para provas e para o ritmo a que aprendes. Mentir resolve uma triagem e estraga a entrevista seguinte." }
          ],
          exercicio: {
            enunciado: "Escreve `cobertura(requisitos, competencias)` que devolve um tuplo com a percentagem de requisitos cumpridos, arredondada ao inteiro, e a lista dos que faltam pela ordem do anúncio. A comparação ignora maiúsculas e espaços à volta.",
            inicio: "def cobertura(requisitos, competencias):\n    pass\n",
            testes: "_r = ['Python', 'SQL', ' Docker ', 'Kubernetes']\n_c = ['python', 'sql', 'pytest']\n_p, _falta = cobertura(_r, _c)\nverifica('percentagem certa', _p == 50)\nverifica('lista o que falta', _falta == ['Docker', 'Kubernetes'])\nverifica('cobertura total', cobertura(['Python'], ['Python', 'SQL']) == (100, []))\nverifica('sem requisitos', cobertura([], ['Python']) == (100, []))\nverifica('nada cumprido', cobertura(['Go'], [])[0] == 0)"
          }
        },
        {
          id: "25.2", titulo: "Código ao vivo e perguntas técnicas", min: 18, estado: "pronta",
          meta: "No fim: escreves código com alguém a ver sem entrar em pânico, e falas enquanto pensas.",
          blocos: [
            ["p", "Numa entrevista com código, a solução ótima não é o que está a ser avaliado. Está a ser avaliado como pensas, se percebes o problema antes de escrever, e como é trabalhar contigo durante quarenta minutos."],
            ["h", "Os cinco passos, por esta ordem"],
            ["lista", [
              "Repete o problema por palavras tuas. Metade dos erros nasce aqui e custa dois minutos evitá-los.",
              "Pergunta sobre casos limite: vazio, repetidos, negativos, tamanho dos dados, se cabe em memória.",
              "Diz a abordagem antes de escrever, e diz o custo: 'faço um dicionário de contagens, uma passagem, memória proporcional aos distintos'.",
              "Escreve, a falar. Nomes claros, casos limite tratados.",
              "Testa em voz alta com um exemplo pequeno e outro limite, e diz o que melhorarias com mais tempo."
            ]],
            ["p", "O passo 2 é o que mais distingue candidatos. Quem começa logo a escrever parece rápido e acaba a reescrever; quem pergunta primeiro parece profissional, porque é assim que se trabalha."],
            ["h", "O silêncio é o inimigo"],
            ["p", "Se te bloqueares, diz em que estás bloqueado. 'Estou a hesitar entre percorrer duas vezes ou guardar um dicionário; vou pelo dicionário porque troca memória por tempo.' Isto é informação para quem avalia. Trinta segundos calado não é."],
            ["obra", "É perfeitamente aceitável dizer 'não sei' e continuar: 'não sei de cor a assinatura, mas é a função do módulo itertools que agrupa consecutivos, e verificava na documentação'. Quem entrevista sabe que ninguém programa sem documentação. O que ninguém quer é alguém que inventa com confiança."],
            ["h", "As perguntas de Python que caem sempre"],
            ["lista", [
              "Lista contra tuplo contra set, e porque é que o set é rápido a procurar. Módulo 5.",
              "O argumento por omissão mutável. Módulo 6.2.",
              "`is` contra `==`, e porque é que `None` se compara com `is`. Módulo 4.1.",
              "Geradores e porque poupam memória. Módulo 12.1.",
              "Como testarias código que depende de uma API externa. Módulo 18.2.",
              "Porque é que não se constrói SQL com f-strings. Módulo 19.2."
            ]],
            ["p", "Estão todas neste curso, o que não é coincidência: são as que separam quem escreveu Python de quem leu sobre Python."],
            ["h", "O problema clássico, resolvido bem"],
            ["py", "def par_que_soma(valores, alvo):\n    \"\"\"Devolve os índices de dois valores que somam o alvo, ou None.\"\"\"\n    vistos = {}\n    for i, v in enumerate(valores):\n        if alvo - v in vistos:\n            return vistos[alvo - v], i\n        vistos[v] = i\n    return None\n\nprint(par_que_soma([2, 7, 11, 15], 9))\nprint(par_que_soma([3, 3], 6))\nprint(par_que_soma([1], 5))"],
            ["p", "Uma passagem, um dicionário, casos limite tratados e uma docstring que diz o contrato. A versão com dois ciclos aninhados também dá a resposta certa e diz outra coisa sobre ti."],
            ["aviso", "Se te derem um exercício para casa, respeita o tempo pedido e entrega com README e testes. Uma entrega com quatro horas de trabalho e testes ganha a uma com vinte horas e nenhum. E não entregues código que não consegues explicar."]
          ],
          quiz: [
            { p: "A meio do exercício percebes que a tua abordagem está errada. O que fazes?", o: ["Continuas, para não parecer indeciso", "Dizes o que descobriste e porque é que a outra abordagem resolve", "Recomeças em silêncio"], c: 1,
              e: "Mudar de abordagem com um argumento é exatamente o que se faz em equipa. Insistir num caminho que sabes errado é a bandeira vermelha." }
          ],
          exercicio: {
            enunciado: "O clássico das entrevistas: escreve `par_que_soma(valores, alvo)` que devolve o tuplo com os índices dos dois valores que somam o alvo, ou `None` se não houver. Uma só passagem pelos dados, sem ciclos aninhados, e não podes usar o mesmo elemento duas vezes.",
            inicio: "def par_que_soma(valores, alvo):\n    pass\n",
            testes: "verifica('caso normal', par_que_soma([2, 7, 11, 15], 9) == (0, 1))\nverifica('valores repetidos', par_que_soma([3, 3], 6) == (0, 1))\nverifica('sem solução devolve None', par_que_soma([1, 2], 100) is None)\nverifica('não usa o mesmo elemento duas vezes', par_que_soma([4, 1], 8) is None)\nverifica('lista vazia', par_que_soma([], 0) is None)\nverifica('negativos', par_que_soma([-3, 8, 5], 2) == (0, 2))"
          }
        },
        {
          id: "25.3", titulo: "Os primeiros 90 dias", min: 12, estado: "pronta",
          meta: "No fim: sabes como pedir ajuda, ler código alheio e entregar o primeiro pull request.",
          blocos: [
            ["p", "Ninguém espera que produzas na primeira semana. Espera-se que aprendas depressa, que não partas nada em silêncio e que sejas fácil de ajudar. Estas três coisas são competências, e treinam-se."],
            ["h", "Pedir ajuda bem"],
            ["p", "A regra que quase todas as equipas usam: tenta sozinho durante um tempo combinado, tipicamente trinta a sessenta minutos, e depois pergunta. Ficar preso três dias por vergonha custa à equipa muito mais do que a pergunta."],
            ["code", "Estou a tentar X.\nEsperava Y, acontece Z.\nJá tentei A e B; A deu este erro (colado aqui).\nA minha hipótese é C. Faz sentido, ou estou a olhar para o lado errado?"],
            ["p", "Quatro linhas. Mostram que trabalhaste, dão contexto suficiente para responderem em dois minutos, e ensinam-te alguma coisa mesmo quando a resposta é 'não'."],
            ["h", "Ler código que não é teu"],
            ["lista", [
              "Começa pelos testes: dizem o que o código promete fazer, sem teoria.",
              "Segue um pedido de ponta a ponta, do ponto de entrada até à base de dados. Uma vez chega para perceber a arquitetura.",
              "Usa o depurador do módulo 17.2 num caso real em vez de ler linha a linha.",
              "`git log` num ficheiro confuso explica muitas vezes porque é que ele é assim.",
              "Não proponhas reescrever nada no primeiro mês. Ainda não sabes que restrições produziram aquilo."
            ]],
            ["h", "O primeiro pull request"],
            ["p", "Que seja pequeno e cedo: uma correção de documentação, um teste em falta, um bug simples. O objetivo não é impressionar, é passar pelo processo todo, do ramo à revisão, e descobrir onde tropeça a máquina da equipa."],
            ["obra", "Vale a pena manter um ficheiro de notas com tudo o que descobres: comandos, nomes de sistemas, siglas, quem sabe de quê. Ao fim de um mês, transforma as partes úteis num acrescento ao guia de integração da equipa. É contribuição real, ao alcance de qualquer júnior, e nota-se."],
            ["h", "Erros que se perdoam e erros que não"],
            ["lista", [
              "Perdoa-se: não saber, perguntar, partir o ambiente de testes, entregar devagar no início.",
              "Perdoa-se mal: partir alguma coisa e não avisar, prometer prazos que não cumpres em silêncio, ignorar comentários de revisão.",
              "Se partires produção, diz logo. Toda a gente já o fez. O que se avalia é o tempo entre o erro e o aviso."
            ]],
            ["aviso", "Nos primeiros meses, o teu impacto mede-se mais pela clareza do que produzes do que pela quantidade. Um pull request pequeno, bem descrito e com testes vale mais para a equipa do que três dias de trabalho num ramo que ninguém viu."],
            ["h", "Ao fim de 90 dias"],
            ["lista", [
              "Consegues pegar num bilhete pequeno e levá-lo até produção sem acompanhamento.",
              "Sabes onde estão os registos, como se publica e como se volta atrás.",
              "Já revíste código de outra pessoa e já mudaste de opinião numa revisão.",
              "Já disseste 'não sei' em voz alta e o mundo não acabou."
            ]]
          ],
          quiz: [
            { p: "Estás bloqueado há duas horas num erro de configuração do ambiente. O que fazes?", o: ["Continuas até resolver, para mostrar autonomia", "Perguntas, com o que já tentaste e o erro colado", "Trabalhas noutra coisa e não dizes nada"], c: 1,
              e: "O teu tempo custa dinheiro à empresa e a resposta costuma demorar dois minutos a quem já passou por aquilo. Perguntar bem é autonomia, não o contrário." }
          ],
          exercicio: {
            enunciado: "Herdaste esta função e um colega queixa-se de que os preços originais estão a ser alterados. Corrige-a: deve devolver uma lista nova com os preços com desconto, arredondados a duas casas, sem mexer na lista recebida.",
            inicio: "def aplicar_desconto(precos, percentagem):\n    for i in range(len(precos)):\n        precos[i] = round(precos[i] * (1 - percentagem / 100), 2)\n    return precos\n",
            testes: "_originais = [100.0, 49.9]\n_r = aplicar_desconto(_originais, 20)\nverifica('aplica o desconto', _r == [80.0, 39.92])\nverifica('não altera a lista recebida', _originais == [100.0, 49.9])\nverifica('devolve uma lista nova', _r is not _originais)\nverifica('lista vazia', aplicar_desconto([], 10) == [])\nverifica('sem desconto mantém os valores', aplicar_desconto([12.5], 0) == [12.5])"
          }
        }
      ]
    }
  ]
};
