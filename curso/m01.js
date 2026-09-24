/* Módulo 1: A tua máquina de trabalho. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 1, fase: 1, titulo: "A tua máquina de trabalho",
  objetivo: "Ter terminal, Python, editor e uma pasta de trabalho com testes, como numa empresa.",
  licoes: [
      {
        id: "1.1", titulo: "O que é programar, e como vais aprender aqui", min: 10, estado: "pronta",
        meta: "No fim: sabes o que é um programa, o que o Python faz com ele e porque é que este curso te põe a trabalhar no teu computador desde o início.",
        blocos: [
          ["p", "Um programa é uma lista de instruções escritas numa linguagem que o computador consegue seguir. Segue-as à letra, e essa é a parte importante: não adivinha o que querias dizer, não salta a linha que está mal escrita, não percebe que te enganaste. Faz exatamente o que lá está."],
          ["p", "Python é uma dessas linguagens, e das mais usadas. Escreve-se em ficheiros de texto e é lida por um programa chamado interpretador, que executa as instruções de cima para baixo. É com ela que se automatizam relatórios, se tratam dados, se escrevem os servidores por trás de sites e aplicações, e se testam programas escritos noutras linguagens."],
          ["h", "O que vais fazer em cada aula"],
          ["lista", [
            "Lês a explicação aqui. É curta de propósito: cada aula ensina uma ideia, e só uma.",
            "Os exemplos escreves tu, no teu computador. Antes de veres o resultado, prevês o que vai aparecer.",
            "No fim há um exercício. Crias o ficheiro no teu editor, corres os testes no terminal e só está feito quando os testes passam.",
            "A partir do módulo 2, guardas cada exercício no git, com uma mensagem que diz o que fizeste."
          ]],
          ["h", "Porque não programar aqui no site"],
          ["p", "Podias escrever o código numa caixa de texto no browser e carregar num botão. Seria mais cómodo nas primeiras semanas e pior em tudo o resto. Ninguém numa empresa programa assim: trabalha-se num editor, com ficheiros numa pasta, corre-se tudo no terminal e guarda-se o histórico no git. Quem só aprendeu no browser chega ao primeiro emprego e passa a primeira semana a aprender o que devia ter aprendido no primeiro dia."],
          ["p", "Por isso a verificação no browser existe, mas fica escondida, para quando não tens o computador por perto. O caminho normal é o outro."],
          ["obra", "O primeiro dia numa equipa costuma ser: receber acesso ao repositório, pôr o projeto a correr na tua máquina e correr os testes. Se no fim deste curso isso te parecer rotina, é porque o fizeste mais de cem vezes."],
          ["h", "Um conceito de cada vez"],
          ["p", "As aulas estão por ordem, e cada uma usa apenas o que as anteriores ensinaram. Se um exercício te pedir uma coisa que não reconheces, não é suposto saberes: volta atrás e procura onde ela apareceu. Se não apareceu, é um erro do curso."],
          ["aviso", "Copiar e colar os exemplos parece mais rápido e não é. Escrever à mão obriga-te a reparar em cada parêntese, cada dois pontos, cada aspa. São exatamente esses detalhes que te vão fazer tropeçar nas primeiras semanas, e é melhor tropeçares num exemplo do que num exercício."]
        ],
        quiz: [
          { p: "Escreves uma instrução com um erro de escrita. O que faz o computador?", o: ["Percebe o que querias e corrige","Segue à letra o que lá está, e normalmente pára com um erro","Ignora essa linha e continua"], c: 1,
            e: "O computador não interpreta intenções. Por isso é que ler a mensagem de erro, e não adivinhar, é uma competência que vais treinar desde a primeira semana." },
          { p: "Quando é que um exercício deste curso está feito?", o: ["Quando o código parece certo","Quando os testes passam no teu computador","Quando o programa corre sem erros uma vez"], c: 1,
            e: "Numa equipa, 'feito' quer dizer 'os testes passam'. Correr uma vez sem erros só prova que aquele caso funcionou." }
        ],
        tarefa: {
          enunciado: "Prepara o terreno para o resto do curso.",
          passos: [
            "Arranja um computador (portátil ou fixo) onde possas instalar programas. O telemóvel serve para ler as aulas, não para programar.",
            "Reserva blocos de 30 a 45 minutos. Uma aula por sessão, com o exercício, rende mais do que três aulas lidas de seguida.",
            "Arranja um caderno ou um ficheiro de notas para escreveres as dúvidas. Metade delas resolve-se sozinha duas aulas depois, e é bom veres isso a acontecer."
          ]
        }
      },
      {
        id: "1.2", titulo: "O terminal, sem medo", min: 14, estado: "pronta",
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
          ["code", String.raw`$ pwd
/home/ana
$ mkdir projetos
$ cd projetos
$ pwd
/home/ana/projetos
$ ls
(vazio)`],
          ["h", "Caminhos absolutos e relativos"],
          ["p", "Um caminho absoluto começa na raiz e não depende de onde estás: `/home/ana/projetos/curso.py`, ou `C:\\Users\\ana\\projetos\\curso.py` no Windows. Um caminho relativo parte da pasta atual: `curso.py`, `dados/vendas.csv`, `../outro_projeto`."],
          ["lista", [
            "`.` é a pasta atual.",
            "`..` é a pasta acima.",
            "`~` é a tua pasta pessoal.",
            "Nomes com espaços vão entre aspas: `cd \"Os meus documentos\"`."
          ]],
          ["h", "Correr Python"],
          ["code", String.raw`$ python3 --version
Python 3.12.4
$ python3 relatorio.py
$ python3 -c "print(2 + 2)"
4`],
          ["p", "`Ctrl+C` interrompe um programa que está a correr. `Ctrl+D` (ou `exit()`) sai da consola de Python. São as duas teclas que te tiram de qualquer sítio onde te sintas preso."],
          ["h", "PATH: porque é que 'comando não encontrado' acontece"],
          ["p", "Quando escreves `python3`, o sistema procura um programa com esse nome numa lista de pastas chamada PATH. Se não estiver em nenhuma delas, recebes `command not found`. Não significa que o Python não está instalado: significa que o sistema não sabe onde ele está."],
          ["code", String.raw`$ which python3        # macOS e Linux
/usr/bin/python3
> where python         # Windows
C:\Users\ana\AppData\Local\Programs\Python\Python312\python.exe`],
          ["obra", "O primeiro dia numa empresa é quase sempre: clonar o repositório, criar o ambiente, correr os testes. São três comandos no terminal. Quem hesita aqui perde a manhã numa coisa que ninguém considera difícil, e é uma péssima primeira impressão por uma razão que não tem nada a ver com programar."],
          ["aviso", "`rm` apaga sem caixote do lixo. `rm -rf` apaga uma árvore inteira sem perguntar. Antes de carregares no Enter num comando que apaga, lê o caminho duas vezes, e escreve sempre caminhos relativos curtos a partir da pasta do projeto."]
        ],
        quiz: [
          { p: "Estás em `/home/ana/projetos` e queres chegar a `/home/ana/documentos`. Que comando usas?", o: ["cd documentos","cd ../documentos","cd /documentos"], c: 1,
            e: "`documentos` está ao lado, não dentro. Sobes um nível com `..` e entras. `cd /documentos` iria para uma pasta na raiz do disco, que provavelmente não existe." },
          { p: "Escreves `python3` e aparece `command not found`. O que quer isto dizer?", o: ["Que o Python não está instalado","Que o sistema não encontrou esse programa em nenhuma das pastas do PATH","Que o terminal está avariado"], c: 1,
            e: "Pode estar instalado e simplesmente não estar no PATH, ou ter outro nome: no Windows é normalmente `py` ou `python`." }
        ],
        tarefa: {
          enunciado: "Cria, só com o terminal, a pasta onde vai viver todo o teu trabalho do curso.",
          passos: [
            "Abre o terminal e confirma onde estás com `pwd`.",
            "Vai para a tua pasta pessoal com `cd` e cria a pasta do curso: `mkdir caderno-python`.",
            "Entra nela com `cd caderno-python` e cria a pasta do primeiro módulo: `mkdir m01`.",
            "Confirma com `ls` que a `m01` está lá. Sobe com `cd ..` e volta a entrar escrevendo só `cd cad` e carregando em Tab.",
            "Usa a seta para cima para repetir um comando antigo sem o escrever outra vez.",
            "Descobre o caminho absoluto da pasta `m01` com `pwd` lá dentro e aponta-o nas tuas notas."
          ]
        }
      },
      {
        id: "1.3", titulo: "Instalar Python e escolher o editor", min: 14, estado: "pronta",
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
          ["p", "Neste curso escrevemos `python3`, que é o nome no macOS e no Linux. No Windows, onde leres `python3` escreve `py` (ou `python`). A partir da aula 1.6, com o ambiente virtual ativo, passa a ser `python` em todos os sistemas."],
          ["code", String.raw`$ python3 --version
Python 3.12.4
$ python3 -m pip --version
pip 24.0`],
          ["aviso", "Nunca `sudo pip install`. Instalar pacotes no Python do sistema com poderes de administrador é como se partem sistemas operativos inteiros. Tudo o que instalas vive num ambiente virtual do projeto, e isso é a aula 1.6."],
          ["h", "O editor"],
          ["p", "VS Code é a escolha por omissão e é o que vais encontrar na maioria das equipas. PyCharm é excelente e mais pesado. Qualquer um serve; o que não serve é o Bloco de Notas."],
          ["lista", [
            "Instala a extensão **Python** da Microsoft. É ela que dá conclusão de código, ir à definição, erros sublinhados e depurador com botões.",
            "Instala a extensão **Ruff** para veres os problemas de estilo enquanto escreves (aula 8.5).",
            "Liga **Format on Save**. Deixas de discutir espaços contigo próprio.",
            "Aprende dois atalhos: ir à definição (F12) e procurar em todo o projeto. Vão poupar-te horas."
          ]],
          ["obra", "Quando entras numa equipa, o repositório já traz `pyproject.toml`, `.editorconfig` e configuração de linter. Essa configuração ganha à tua. Um pull request cheio de alterações de formatação porque o teu editor faz diferente é a forma mais rápida de irritar quem revê."]
        ],
        quiz: [
          { p: "Tens várias versões de Python na máquina. Como garantes que instalas um pacote no interpretador certo?", o: ["pip install pacote","python3 -m pip install pacote","sudo pip install pacote"], c: 1,
            e: "`python3 -m pip` usa o pip do interpretador que acabaste de invocar. `pip` sozinho é um programa à parte que pode pertencer a outra instalação." }
        ],
        tarefa: {
          enunciado: "Instala as duas ferramentas e confirma que respondem.",
          passos: [
            "Instala o Python a partir de python.org (no Windows, liga a caixa **Add python.exe to PATH**).",
            "Num terminal novo, confirma que `python3 --version` (no Windows `py --version`) mostra 3.11 ou mais recente.",
            "Instala o VS Code e, dentro dele, as extensões **Python** e **Ruff**.",
            "Liga **Format on Save** nas definições do VS Code.",
            "Abre a pasta `caderno-python` no VS Code (File, Open Folder) e abre o terminal integrado com Ctrl+` (a tecla da crase). Confirma com `pwd` que ele já está dentro da pasta do curso."
          ]
        }
      },
      {
        id: "1.4", titulo: "O primeiro programa: um ficheiro .py", min: 12, estado: "pronta",
        meta: "No fim: escreves um programa num ficheiro, corres-lo no terminal e sabes o que fazer quando não corre.",
        blocos: [
          ["p", "Um programa em Python é um ficheiro de texto com a extensão `.py`. Não tem nada de especial lá dentro: são linhas de texto que o interpretador lê de cima para baixo e executa uma a uma."],
          ["h", "Escrever"],
          ["p", "No VS Code, com a pasta `caderno-python` aberta, carrega com o botão direito na pasta `m01`, escolhe New File e chama-lhe `ola.py`. Escreve estas duas linhas:"],
          ["code", String.raw`print("Olá, mundo!")
print("Estou a aprender Python.")`],
          ["p", "`print` é uma instrução que escreve no ecrã o que está entre os parênteses. O texto vai entre aspas para o Python saber onde começa e onde acaba. Guarda o ficheiro com Ctrl+S (Cmd+S no Mac). Enquanto o separador do ficheiro mostrar uma bola branca, há alterações por guardar."],
          ["h", "Correr"],
          ["code", String.raw`$ python3 m01/ola.py
Olá, mundo!
Estou a aprender Python.`],
          ["p", "Escreves `python3`, um espaço e o caminho do ficheiro a partir da pasta onde estás. O interpretador abre o ficheiro, executa a primeira linha, depois a segunda, e termina. Não escrevas o `$`: é só o sinal de que aquilo se escreve no terminal."],
          ["h", "O ciclo que vais repetir milhares de vezes"],
          ["lista", [
            "Alterar o ficheiro no editor.",
            "Guardar.",
            "Correr no terminal.",
            "Ler o resultado, ou a mensagem de erro, com atenção.",
            "Voltar ao primeiro passo."
          ]],
          ["p", "Parece óbvio. O passo que toda a gente salta é o quarto: corre, vê vermelho e volta ao código sem ler o que o vermelho dizia."],
          ["h", "Quando não corre"],
          ["lista", [
            "`can't open file ... No such file or directory`: estás na pasta errada ou escreveste mal o nome. Confirma com `pwd` e `ls`.",
            "`SyntaxError`: há um erro de escrita no ficheiro, como uma aspa ou um parêntese por fechar. A mensagem diz a linha.",
            "O resultado não mudou depois de alterares o ficheiro: não guardaste. O Python corre o que está no disco, não o que está no ecrã."
          ]],
          ["aviso", "Não escrevas código no Word nem em editores que trocam aspas direitas por aspas curvas. `print(“olá”)` com aspas curvas dá `SyntaxError: invalid character`, e são quase impossíveis de ver a olho."],
          ["obra", "O script que corre todas as noites numa empresa para gerar relatórios é exatamente isto: um ficheiro `.py` que alguém corre com `python`. A diferença está no que tem lá dentro, não na forma de o correr."]
        ],
        quiz: [
          { p: "Alteraste o ficheiro, correste outra vez e aparece o resultado antigo. Qual é a causa mais provável?", o: ["O Python guardou o resultado em memória","Não guardaste o ficheiro","O terminal precisa de ser reiniciado"], c: 1,
            e: "O interpretador lê o ficheiro do disco sempre que o corres. Se o resultado não mudou, o ficheiro no disco também não." }
        ],
        tarefa: {
          enunciado: "Escreve, corre e parte de propósito o teu primeiro programa.",
          passos: [
            "Cria `m01/ola.py` com as duas linhas do exemplo e guarda.",
            "No terminal, dentro de `caderno-python`, corre `python3 m01/ola.py`.",
            "Muda a segunda linha para escrever o teu nome, guarda e corre outra vez.",
            "Apaga a aspa final da primeira linha, guarda e corre. Lê a mensagem de erro inteira e repara na linha que ela indica.",
            "Repõe a aspa e confirma que volta a correr."
          ]
        }
      },
      {
        id: "1.5", titulo: "O REPL: experimentar antes de escrever", min: 10, estado: "pronta",
        meta: "No fim: usas a consola interativa para testar uma ideia numa linha, e sabes quando é que ela deve passar para um ficheiro.",
        blocos: [
          ["p", "Escreve `python3` sozinho no terminal e entras no REPL, a consola interativa. Escreves uma linha, carregas em Enter, vês o resultado. É a melhor ferramenta que existe para responder a 'o que é que isto dá mesmo?' sem criar ficheiro nenhum."],
          ["code", String.raw`$ python3
>>> 2 + 3
5
>>> 7 * 6
42
>>> print("olá")
olá
>>> "olá" * 3
'oláoláolá'
>>> exit()
$`],
          ["p", "O `>>>` é o prompt do Python, diferente do `$` do terminal. Enquanto vires `>>>`, o que escreves é Python. Para voltar ao terminal escreve `exit()` ou carrega em Ctrl+D (Ctrl+Z e Enter no Windows)."],
          ["aviso", "O erro mais comum da primeira semana: escrever `python3 ola.py` dentro do REPL e receber `SyntaxError`. Esse comando é para o terminal. Sai primeiro com `exit()`."],
          ["h", "REPL ou ficheiro?"],
          ["lista", [
            "REPL: experimentar uma linha, confirmar o que uma operação dá, pedir ajuda. Nada fica guardado.",
            "Ficheiro: tudo o que queres guardar, correr outra vez, testar ou mostrar a alguém."
          ]],
          ["p", "A regra de trabalho é esta: experimenta no REPL, e quando a experiência funcionar, passa-a para o ficheiro."],
          ["h", "Pedir ajuda ao próprio Python"],
          ["code", String.raw`>>> help(print)
(abre a documentação; sai com a tecla q)
>>> type(42)
<class 'int'>
>>> type("42")
<class 'str'>`],
          ["p", "Ainda não sabes o que é `int` nem `str`. Não faz mal: repara só que o Python te diz que `42` e `\"42\"` são coisas diferentes. A aula 2.5 explica porquê."],
          ["h", "Os exemplos deste curso"],
          ["p", "Os exemplos com o botão **Ver o resultado** são para escreveres no REPL. Antes de carregares em Enter, diz o que achas que vai aparecer. Depois confirma. Errar a previsão é a parte útil: mostra-te onde o modelo que tens na cabeça está diferente do que o Python faz."],
          ["py", String.raw`print(10 + 5)
print("10" + "5")
print(10 * 2, "e", "ab" * 2)`],
          ["aviso", "Nos exemplos, `>>>` e `$` não se escrevem: são os prompts. Escreve só o que vem depois deles."]
        ],
        quiz: [
          { p: "Escreveste `python3 ola.py` e apareceu `SyntaxError: invalid syntax`. Onde é que estavas?", o: ["No terminal, na pasta errada","Dentro do REPL do Python","No editor"], c: 1,
            e: "Dentro do REPL só se escreve Python. Comandos como `python3 ola.py` escrevem-se no terminal, depois de sair com `exit()`." }
        ],
        tarefa: {
          enunciado: "Usa o REPL como calculadora e como documentação.",
          passos: [
            "Abre o REPL com `python3`.",
            "Calcula quantos dias viveste, aproximadamente: a tua idade vezes 365.",
            "Escreve o exemplo acima, uma linha de cada vez, prevendo cada resultado antes do Enter.",
            "Escreve `help(print)`, lê as primeiras linhas e sai com q.",
            "Sai do REPL com `exit()` e confirma que voltaste a ver o `$` do terminal."
          ]
        }
      },
      {
        id: "1.6", titulo: "A pasta do curso: ambiente virtual e testes", min: 18, estado: "pronta",
        meta: "No fim: o teu caderno tem um ambiente virtual com pytest, e corres e lês os testes de um exercício.",
        blocos: [
          ["p", "Até aqui correste Python solto. Um projeto a sério tem três coisas que tu ainda não tens: uma pasta própria, um ambiente virtual com as bibliotecas desse projeto e testes que verificam o código sem ninguém ter de olhar. O teu caderno vai ter as três a partir de hoje."],
          ["h", "O ambiente virtual, em versão curta"],
          ["p", "Um ambiente virtual é uma pasta, normalmente chamada `.venv`, com uma cópia do Python só para aquele projeto. O que lá instalares não mexe no resto do computador. A explicação completa está na aula 13.3; para já, é uma receita."],
          ["code", String.raw`$ cd caderno-python
$ python3 -m venv .venv
$ source .venv/bin/activate          # Windows: .venv\Scripts\activate
(.venv) $ python -m pip install pytest ruff
(.venv) $ python -m pytest --version
pytest 8.3.4`],
          ["p", "Com o ambiente ativo, o prompt começa por `(.venv)` e o comando passa a ser `python`, sem o 3, em qualquer sistema. Cada terminal novo precisa de ser ativado outra vez. No VS Code, carrega em Ctrl+Shift+P, escolhe **Python: Select Interpreter** e aponta para o `.venv`: a partir daí o terminal integrado ativa-o sozinho."],
          ["aviso", "Escreve `python -m pip install x` e não só `pip install x`. Podes ter três Pythons na máquina sem saber, e assim o pacote vai para o interpretador que estás mesmo a usar."],
          ["h", "O que é um teste"],
          ["p", "Um teste é um pequeno programa que corre o teu código e verifica o resultado. Em cada exercício vais receber um ficheiro de testes já escrito. A partir da aula 3.5 passas a escrever os teus. É assim que se trabalha: ninguém diz 'acho que funciona', diz 'os testes passam'."],
          ["code", String.raw`# m01/test_apresentacao.py (um excerto)
def test_primeira_linha_e_ola_mundo(capsys):
    assert correr(capsys)[0] == "Olá, mundo!"`],
          ["p", "Não precisas de perceber ainda como está escrito. Lê só o nome da função: diz o que está a ser verificado. Isso é de propósito, e é a primeira coisa que vais ler quando um teste falhar."],
          ["h", "A rotina de cada exercício"],
          ["lista", [
            "Crias o teu ficheiro na pasta do módulo, com o nome que o exercício indica.",
            "Crias o ficheiro de testes ao lado, copiado tal e qual, e não lhe mexes.",
            "Escreves o código e experimentas à mão.",
            "Corres `python -m pytest` com o caminho do ficheiro de testes.",
            "Lês o resultado. Se estiver vermelho, lês o que falhou antes de mexer em qualquer coisa."
          ]],
          ["h", "Ler o que o pytest diz"],
          ["code", String.raw`(.venv) $ python -m pytest m01/test_apresentacao.py
F..                                             [100%]
_____________ test_primeira_linha_e_ola_mundo _____________
    def test_primeira_linha_e_ola_mundo(capsys):
>       assert correr(capsys)[0] == "Olá, mundo!"
E       AssertionError: assert 'Ola mundo' == 'Olá, mundo!'
FAILED m01/test_apresentacao.py::test_primeira_linha_e_ola_mundo
1 failed, 2 passed in 0.03s`],
          ["lista", [
            "Cada `.` é um teste que passou; cada `F` é um que falhou.",
            "A linha com `>` mostra onde falhou. A linha com `E` mostra o que o teu programa produziu e o que era esperado.",
            "Aqui, faltaram o acento e a vírgula. Os testes comparam à letra, tal como o computador lê o teu código à letra."
          ]],
          ["obra", "Numa equipa, 'está feito' quer dizer que os testes passam, na tua máquina e no servidor de integração contínua. 'Funcionou quando experimentei' não conta, porque ninguém sabe o que experimentaste."],
          ["aviso", "Alterar o teste para ele passar é fazer batota contigo próprio. Numa equipa é pior: é o tipo de coisa que, apanhada numa revisão, faz perder a confiança de quem revê o teu código."],
          ["p", "Cada exercício tem ainda, escondida no fim, uma verificação no browser para quando não tens o computador por perto. É para emergências. O caminho normal é o teu terminal."]
        ],
        quiz: [
          { p: "O pytest mostra `1 failed, 2 passed`. Qual é o primeiro passo?", o: ["Correr outra vez para ver se passa","Ler o nome do teste que falhou e a linha com E, que mostra o obtido e o esperado","Alterar o teste"], c: 1,
            e: "Os testes são determinísticos: correr outra vez dá o mesmo. A informação para corrigir está toda na mensagem." },
          { p: "Abriste um terminal novo e `python -m pytest` diz `No module named pytest`. O que falta?", o: ["Reinstalar o Python","Ativar o ambiente virtual","Criar o ficheiro de testes"], c: 1,
            e: "O pytest foi instalado dentro do `.venv`. Sem o ativar, estás a usar o Python do sistema, que não o tem." }
        ],
        exercicio: {
          ficheiro: "apresentacao.py",
          script: true,
          enunciado: "Escreve um programa que mostra duas linhas: a primeira exatamente `Olá, mundo!`, e a segunda a começar por `O meu nome é ` seguido do teu nome. Este é o primeiro exercício com testes: segue a rotina toda, passo a passo.",
          inicio: String.raw`# Escreve aqui as duas linhas, cada uma com o seu print.
`,
          testes: String.raw`import runpy
from pathlib import Path

PROGRAMA = Path(__file__).with_name("apresentacao.py")


def correr(capsys):
    runpy.run_path(str(PROGRAMA))
    return capsys.readouterr().out.splitlines()


def test_escreve_duas_linhas(capsys):
    assert len(correr(capsys)) == 2


def test_primeira_linha_e_ola_mundo(capsys):
    assert correr(capsys)[0] == "Olá, mundo!"


def test_segunda_linha_diz_o_teu_nome(capsys):
    linha = correr(capsys)[1]
    assert linha.startswith("O meu nome é ")
    assert len(linha) > len("O meu nome é ")
`
        }
      }
  ]
});
