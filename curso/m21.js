/* Módulo 21: Git como se trabalha numa equipa. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 21, fase: 4, titulo: "Git como se trabalha numa equipa",
  objetivo: "Ramos, histórico legível, conflitos e pull requests que se revêem num quarto de hora.",
  licoes: [
      {
        id: "21.1", titulo: "Ramos, commits e histórico legível", min: 18, estado: "pronta",
        meta: "No fim: trabalhas em ramos, escreves mensagens que servem daqui a um ano e resolves conflitos sem pânico.",
        blocos: [
          ["p", "Desde a aula 2.9 que guardas o teu caderno no git, sempre no ramo principal e sozinho. Numa equipa, várias pessoas mexem no mesmo código ao mesmo tempo, e o ramo principal tem de estar sempre a funcionar. É para isso que servem os ramos."],
          ["p", "Git guarda fotografias do projeto. Um commit é uma fotografia com uma mensagem e um pai. Um ramo é um autocolante que aponta para um commit e anda para a frente quando fazes commits novos. Percebido isto, o resto é vocabulário."],
          ["h", "O ciclo diário"],
          ["code", String.raw`git switch -c feat/importador-csv    # ramo novo a partir do atual

# ... escreves código ...

git status                          # o que mudou
git diff                            # o que mudou, linha a linha
git add importador.py testes/test_importador.py
git commit -m "Ler CSV de vendas e ignorar linhas sem valor"
git push -u origin feat/importador-csv`],
          ["p", "Nunca trabalhes diretamente no ramo principal. Um ramo por tarefa, com nome que diz o que faz: `feat/`, `fix/`, `chore/` são os prefixos que vais encontrar em quase todo o lado."],
          ["h", "Uma boa mensagem de commit"],
          ["lista", [
            "Primeira linha até 72 caracteres, no imperativo, a dizer o que o commit faz: 'Corrigir cálculo do IVA em vendas isentas'.",
            "Sem ponto final e sem 'atualizações' ou 'alterações várias', que não dizem nada.",
            "Se for preciso, linha em branco e um parágrafo a explicar porquê. O 'o quê' está no diff; o 'porquê' só está aqui.",
            "Um commit, uma ideia. Se a mensagem precisa de um 'e', são dois commits."
          ]],
          ["code", String.raw`# mau
git commit -m "fix"
git commit -m "alteracoes"
git commit -m "agora vai"

# bom
git commit -m "Corrigir IVA em vendas isentas"
git commit -m "Acrescentar teste para CSV sem cabeçalho"`],
          ["obra", "Quem te vai entrevistar abre o teu repositório e olha para o histórico. Vinte commits com 'update' são um sinal de alarme; trinta commits pequenos e descritivos ao longo de semanas dizem que trabalhas com método. É a única parte do teu portefólio que não se consegue fingir à pressa."],
          ["h", "Atualizar o ramo: merge ou rebase"],
          ["code", String.raw`git switch main
git pull
git switch feat/importador-csv

git merge main       # cria um commit de junção, histórico fiel
git rebase main      # reescreve os teus commits por cima, histórico linear`],
          ["aviso", "Nunca faças rebase de um ramo que outra pessoa já tem. Reescrever commits publicados obriga toda a gente a arranjar o repositório local. Rebase no teu ramo pessoal antes do pull request: à vontade. Em ramos partilhados: merge."],
          ["h", "Conflitos"],
          ["p", "Um conflito é o git a dizer que duas pessoas mexeram nas mesmas linhas e que a decisão é humana. Não é um erro nem uma catástrofe."],
          ["code", String.raw`<<<<<<< HEAD
taxa = 0.23
=======
taxa = IVA_NORMAL
>>>>>>> main`],
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
          { p: "Enviaste um commit com um bug para o ramo principal, que outras pessoas já usam. O que fazes?", o: ["`git reset --hard` e força o push","`git revert` do commit, criando um commit que o anula","Apagas o ramo e crias outro"], c: 1,
            e: "Reescrever histórico partilhado obriga toda a equipa a reparar o repositório. `revert` é honesto: fica registado o que aconteceu e o que se desfez." }
        ],
        exercicio: {
          ficheiro: "mensagens_commit.py",
          enunciado: "Escreve `validar_mensagem(msg)`, que verifica a primeira linha de uma mensagem de commit. Devolve a lista de problemas, por esta ordem: `\"vazia\"`, `\"longa\"` (mais de 72 caracteres), `\"ponto final\"` e `\"minuscula\"` (não começa por maiúscula). As linhas depois da primeira não contam. Uma mensagem correta devolve a lista vazia.",
          inicio: String.raw`def validar_mensagem(msg):
    pass
`,
          testes: String.raw`from mensagens_commit import validar_mensagem


def test_mensagem_correta():
    assert validar_mensagem("Corrigir IVA em vendas isentas") == []


def test_mensagem_vazia():
    assert validar_mensagem("") == ["vazia"]


def test_ponto_final():
    assert validar_mensagem("Corrigir o IVA.") == ["ponto final"]


def test_minuscula_inicial():
    assert validar_mensagem("corrigir o IVA") == ["minuscula"]


def test_longa_e_com_ponto():
    assert validar_mensagem("C" + "x" * 80 + ".") == ["longa", "ponto final"]


def test_so_a_primeira_linha_conta():
    assert validar_mensagem("Corrigir o IVA\n\nexplicação longa e com ponto final.") == []
`
        }
      },
      {
        id: "21.2", titulo: "Pull requests e revisão de código", min: 16, estado: "pronta",
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
          { p: "Um revisor diz que a tua abordagem tem um problema que tu não vês. Qual é a melhor resposta?", o: ["Mudar logo, para não criar atrito","Perguntar que caso concreto o preocupa e discutir com um exemplo","Explicar porque é que a tua está certa"], c: 1,
            e: "Um caso concreto resolve a discussão em dois minutos, num sentido ou no outro. Ceder sem perceber deixa-te sem aprender; insistir sem ouvir gasta o crédito que tens com a equipa." }
        ],
        exercicio: {
          ficheiro: "revisao.py",
          enunciado: "Escreve `problemas_do_pr(pr)`, que recebe um dicionário com `titulo`, `descricao`, `linhas` e `testes` e devolve a lista de razões para ainda não pedir revisão, por esta ordem: `\"sem titulo\"`, `\"sem descricao\"`, `\"demasiado grande\"` (mais de 400 linhas) e `\"sem testes\"`. Um título ou descrição só com espaços conta como vazio.",
          inicio: String.raw`def problemas_do_pr(pr):
    pass
`,
          testes: String.raw`from revisao import problemas_do_pr

BOM = {"titulo": "Corrigir IVA", "descricao": "Vendas isentas somavam IVA.", "linhas": 120, "testes": True}


def test_pr_pronto():
    assert problemas_do_pr(BOM) == []


def test_sem_titulo():
    assert problemas_do_pr({**BOM, "titulo": "  "}) == ["sem titulo"]


def test_grande_e_sem_testes():
    assert problemas_do_pr({**BOM, "linhas": 900, "testes": False}) == ["demasiado grande", "sem testes"]


def test_400_linhas_ainda_passa():
    assert problemas_do_pr({**BOM, "linhas": 400}) == []


def test_tudo_em_falta():
    pr = {"titulo": "", "descricao": "", "linhas": 5000, "testes": False}
    assert problemas_do_pr(pr) == ["sem titulo", "sem descricao", "demasiado grande", "sem testes"]
`
        }
      }
  ]
});
