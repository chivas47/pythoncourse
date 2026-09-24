/* Módulo 29: Projeto final. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 29, fase: 6, titulo: "Projeto final",
  objetivo: "Um projeto teu, acabado, que se explica sozinho a quem recruta.",
  licoes: [
      {
        id: "29.1", titulo: "Escolher um projeto que não seja o de toda a gente", min: 14, estado: "pronta",
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
            "Alguns testes a passar e a CI verde da aula 20.3.",
            "Commits pequenos e datados ao longo de semanas, e não um só commit com tudo.",
            "Se for uma API ou um site, um sítio onde a pessoa possa clicar e ver a funcionar."
          ]]
        ],
        quiz: [
          { p: "Tens três projetos a meio e duas semanas até começar a candidatar-te. O que fazes?", o: ["Começar um quarto, melhor","Acabar um deles em condições, com testes e README","Publicar os três como estão"], c: 1,
            e: "Um projeto acabado prova que consegues fechar trabalho, que é o risco número um de contratar um júnior. Três a meio provam o contrário." }
        ],
        exercicio: {
          ficheiro: "avaliar_projeto.py",
          enunciado: "Escreve `avaliar_projeto(projeto)`, que recebe um dicionário com as chaves `dados_reais`, `problema_proprio`, `ambito_fechado` e `tem_testes`, e devolve a lista dos critérios em falta, por esta ordem. Uma chave que não exista conta como em falta. Um projeto completo devolve a lista vazia. Depois aplica-a, honestamente, à tua ideia de projeto.",
          inicio: String.raw`def avaliar_projeto(projeto):
    pass
`,
          testes: String.raw`from avaliar_projeto import avaliar_projeto

BOM = {"dados_reais": True, "problema_proprio": True, "ambito_fechado": True, "tem_testes": True}


def test_projeto_completo():
    assert avaliar_projeto(BOM) == []


def test_sem_testes():
    assert avaliar_projeto({**BOM, "tem_testes": False}) == ["tem_testes"]


def test_ordem_dos_criterios():
    projeto = {**BOM, "dados_reais": False, "ambito_fechado": False}
    assert avaliar_projeto(projeto) == ["dados_reais", "ambito_fechado"]


def test_dicionario_vazio_falha_em_tudo():
    assert avaliar_projeto({}) == ["dados_reais", "problema_proprio", "ambito_fechado", "tem_testes"]
`
        }
      },
      {
        id: "29.2", titulo: "README, licença e histórico de commits", min: 14, estado: "pronta",
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
            "Commits pequenos, ao longo de semanas, com mensagens no formato da aula 21.1.",
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
          ]],
          ["h", "O teu caderno também conta"],
          ["p", "Se fizeste os exercícios com a rotina do curso, tens um repositório com mais de cem ficheiros testados, uma suite que corre inteira com `python -m pytest`, código arrumado pelo `ruff` e um histórico de commits pequenos ao longo de meses. Publica-o também, com um README curto que explique o que é. Não substitui o projeto final, mas responde sozinho à pergunta 'trabalhas com testes e git todos os dias?'."]
        ],
        quiz: [
          { p: "O que é que um recrutador técnico procura primeiro no teu repositório?", o: ["O número de estrelas","Se percebe em trinta segundos o que o projeto faz e como se corre","A linguagem usada"], c: 1,
            e: "Ninguém investiga um projeto que não se explica. Clareza no README é a diferença entre ser lido e ser fechado." }
        ],
        exercicio: {
          ficheiro: "verificar_readme.py",
          enunciado: "Escreve `seccoes_em_falta(readme)`, que recebe o texto de um README e devolve, pela ordem indicada, quais das secções `O problema`, `Como correr` e `Testes` não aparecem como título de nível dois (linhas que começam por `## `). Ignora maiúsculas e espaços a mais. Depois corre-a sobre o README do teu projeto.",
          inicio: String.raw`def seccoes_em_falta(readme):
    pass
`,
          testes: String.raw`from verificar_readme import seccoes_em_falta


def test_readme_completo():
    readme = "# Projeto\n\n## O problema\ntexto\n\n##  como correr\n\n## Testes\n"
    assert seccoes_em_falta(readme) == []


def test_sem_testes():
    assert seccoes_em_falta("## O problema\n## Como correr\n") == ["Testes"]


def test_readme_vazio():
    assert seccoes_em_falta("") == ["O problema", "Como correr", "Testes"]


def test_titulo_de_nivel_um_nao_conta():
    assert seccoes_em_falta("# Testes\n## O problema\n## Como correr\n") == ["Testes"]


def test_nivel_tres_tambem_nao_conta():
    assert seccoes_em_falta("### Testes\n## O problema\n## Como correr\n") == ["Testes"]
`
        }
      }
  ]
});
