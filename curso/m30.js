/* Módulo 30: Recrutamento e primeiros meses. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 30, fase: 6, titulo: "Recrutamento e primeiros meses",
  objetivo: "Passar o processo de recrutamento e os primeiros 90 dias sem tropeçar no evitável.",
  licoes: [
      {
        id: "30.1", titulo: "CV e perfil para vagas de Python", min: 14, estado: "pronta",
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
          ["code", String.raw`Avisos da Câmara — Python, FastAPI, SQLite, pytest
Lê boletins municipais em PDF e avisa sobre uma rua específica.
Trata falhas do site de origem com tentativas espaçadas; 40 testes, CI no GitHub Actions.
github.com/onome/avisos-camara`],
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
          { p: "A vaga pede 2 anos de experiência e cinco tecnologias. Tens três delas e nenhum ano. O que fazes?", o: ["Não te candidatas","Candidatas-te, com o CV a mostrar prova das três e o que estás a fazer para as outras","Escreves que tens 2 anos"], c: 1,
            e: "Muitas vagas são escritas com a lista de desejos. Quem decide olha para provas e para o ritmo a que aprendes. Mentir resolve uma triagem e estraga a entrevista seguinte." }
        ],
        exercicio: {
          ficheiro: "requisitos_vaga.py",
          enunciado: "Escreve `cobertura(requisitos, competencias)`, que devolve um tuplo com a percentagem de requisitos que cumpres, arredondada ao inteiro, e a lista dos que faltam, pela ordem do anúncio e sem espaços à volta. A comparação ignora maiúsculas e espaços à volta. Sem requisitos, a cobertura é 100.",
          inicio: String.raw`def cobertura(requisitos, competencias):
    pass
`,
          testes: String.raw`from requisitos_vaga import cobertura


def test_percentagem_e_o_que_falta():
    requisitos = ["Python", "SQL", " Docker ", "Kubernetes"]
    assert cobertura(requisitos, ["python", "sql", "pytest"]) == (50, ["Docker", "Kubernetes"])


def test_cobertura_total():
    assert cobertura(["Python"], ["Python", "SQL"]) == (100, [])


def test_sem_requisitos():
    assert cobertura([], ["Python"]) == (100, [])


def test_nada_cumprido():
    assert cobertura(["Go"], []) == (0, ["Go"])


def test_arredonda():
    assert cobertura(["a", "b", "c"], ["a"])[0] == 33
`
        }
      },
      {
        id: "30.2", titulo: "Código ao vivo e perguntas técnicas", min: 18, estado: "pronta",
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
          ["py", String.raw`def par_que_soma(valores, alvo):
    """Devolve os índices de dois valores que somam o alvo, ou None."""
    vistos = {}
    for i, v in enumerate(valores):
        if alvo - v in vistos:
            return vistos[alvo - v], i
        vistos[v] = i
    return None

print(par_que_soma([2, 7, 11, 15], 9))
print(par_que_soma([3, 3], 6))
print(par_que_soma([1], 5))`],
          ["p", "Uma passagem, um dicionário, casos limite tratados e uma docstring que diz o contrato. A versão com dois ciclos aninhados também dá a resposta certa e diz outra coisa sobre ti."],
          ["aviso", "Se te derem um exercício para casa, respeita o tempo pedido e entrega com README e testes. Uma entrega com quatro horas de trabalho e testes ganha a uma com vinte horas e nenhum. E não entregues código que não consegues explicar."]
        ],
        quiz: [
          { p: "A meio do exercício percebes que a tua abordagem está errada. O que fazes?", o: ["Continuas, para não parecer indeciso","Dizes o que descobriste e porque é que a outra abordagem resolve","Recomeças em silêncio"], c: 1,
            e: "Mudar de abordagem com um argumento é exatamente o que se faz em equipa. Insistir num caminho que sabes errado é a bandeira vermelha." }
        ],
        exercicio: {
          ficheiro: "dois_numeros.py",
          enunciado: "O clássico das entrevistas: escreve `par_que_soma(valores, alvo)`, que devolve o tuplo com os índices dos dois valores que somam o alvo, ou `None` se não houver. Uma só passagem pelos dados, sem ciclos encaixados, e sem usar o mesmo elemento duas vezes. Resolve-o com o cronómetro a correr e a explicar em voz alta, como na aula.",
          inicio: String.raw`def par_que_soma(valores, alvo):
    pass
`,
          testes: String.raw`import time

import pytest

from dois_numeros import par_que_soma


@pytest.mark.parametrize(
    "valores, alvo, esperado",
    [
        ([2, 7, 11, 15], 9, (0, 1)),
        ([3, 3], 6, (0, 1)),
        ([1, 2], 100, None),
        ([4, 1], 8, None),
        ([], 0, None),
        ([-3, 8, 5], 2, (0, 2)),
    ],
)
def test_casos(valores, alvo, esperado):
    assert par_que_soma(valores, alvo) == esperado


def test_uma_so_passagem():
    grande = list(range(50000))
    inicio = time.perf_counter()
    assert par_que_soma(grande, 99997) == (49998, 49999)
    assert time.perf_counter() - inicio < 0.5
`
        }
      },
      {
        id: "30.3", titulo: "Os primeiros 90 dias", min: 12, estado: "pronta",
        meta: "No fim: sabes como pedir ajuda, ler código alheio e entregar o primeiro pull request.",
        blocos: [
          ["p", "Ninguém espera que produzas na primeira semana. Espera-se que aprendas depressa, que não partas nada em silêncio e que sejas fácil de ajudar. Estas três coisas são competências, e treinam-se."],
          ["h", "Pedir ajuda bem"],
          ["p", "A regra que quase todas as equipas usam: tenta sozinho durante um tempo combinado, tipicamente trinta a sessenta minutos, e depois pergunta. Ficar preso três dias por vergonha custa à equipa muito mais do que a pergunta."],
          ["code", String.raw`Estou a tentar X.
Esperava Y, acontece Z.
Já tentei A e B; A deu este erro (colado aqui).
A minha hipótese é C. Faz sentido, ou estou a olhar para o lado errado?`],
          ["p", "Quatro linhas. Mostram que trabalhaste, dão contexto suficiente para responderem em dois minutos, e ensinam-te alguma coisa mesmo quando a resposta é 'não'."],
          ["h", "Ler código que não é teu"],
          ["lista", [
            "Começa pelos testes: dizem o que o código promete fazer, sem teoria.",
            "Segue um pedido de ponta a ponta, do ponto de entrada até à base de dados. Uma vez chega para perceber a arquitetura.",
            "Usa o depurador do aula 22.2 num caso real em vez de ler linha a linha.",
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
          { p: "Estás bloqueado há duas horas num erro de configuração do ambiente. O que fazes?", o: ["Continuas até resolver, para mostrar autonomia","Perguntas, com o que já tentaste e o erro colado","Trabalhas noutra coisa e não dizes nada"], c: 1,
            e: "O teu tempo custa dinheiro à empresa e a resposta costuma demorar dois minutos a quem já passou por aquilo. Perguntar bem é autonomia, não o contrário." }
        ],
        exercicio: {
          ficheiro: "herdado.py",
          enunciado: "Herdaste esta função e um colega queixa-se de que os preços originais estão a ser alterados. Escreve primeiro um teste teu que mostre o problema, e só depois corrige: a função deve devolver uma lista nova com os preços com desconto, arredondados a duas casas, sem mexer na lista recebida.",
          inicio: String.raw`def aplicar_desconto(precos, percentagem):
    for i in range(len(precos)):
        precos[i] = round(precos[i] * (1 - percentagem / 100), 2)
    return precos
`,
          testes: String.raw`from herdado import aplicar_desconto


def test_aplica_o_desconto():
    assert aplicar_desconto([100.0, 49.9], 20) == [80.0, 39.92]


def test_nao_altera_a_lista_recebida():
    originais = [100.0, 49.9]
    aplicar_desconto(originais, 20)
    assert originais == [100.0, 49.9]


def test_devolve_uma_lista_nova():
    originais = [100.0]
    assert aplicar_desconto(originais, 10) is not originais


def test_lista_vazia():
    assert aplicar_desconto([], 10) == []


def test_sem_desconto():
    assert aplicar_desconto([12.5], 0) == [12.5]
`
        }
      }
  ]
});
