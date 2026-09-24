/* Módulo 22: Depuração e desempenho. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 22, fase: 4, titulo: "Depuração e desempenho",
  objetivo: "Encontrar bugs com método em vez de sorte, e medir antes de otimizar.",
  licoes: [
      {
        id: "22.1", titulo: "Método: reproduzir, isolar, corrigir", min: 16, estado: "pronta",
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
          ["p", "Um bug esconde-se num espaço: mil linhas de código, dez mil linhas de dados, duzentos commits. Não procures do princípio para o fim. Corta o espaço a meio e pergunta de que lado está. Dez perguntas chegam para mil hipóteses, que é a pesquisa binária da aula 18.2 aplicada ao teu dia de trabalho."],
          ["lista", [
            "**Nos dados**: fica com metade do ficheiro. Ainda falha? Corta outra vez. Chegas a duas ou três linhas e a causa costuma saltar à vista.",
            "**No código**: verifica o valor a meio do caminho. Está certo aqui? Então o problema está depois.",
            "**No histórico**: `git bisect` encontra o commit que partiu, em log n passos. Precisa de um comando que diga bom ou mau, e por isso vale a pena ter o teste primeiro.",
            "**No ambiente**: corre noutra máquina, noutro ambiente virtual, com outra versão."
          ]],
          ["code", String.raw`git bisect start
git bisect bad                 # o estado de agora está mau
git bisect good v1.4.0         # aqui ainda estava bom
# o git faz checkout a meio; tu testas e dizes
git bisect good                # ou: git bisect bad
# ... repete ~log2(n) vezes
git bisect reset`],
          ["h", "3. Uma hipótese de cada vez, escrita"],
          ["p", "Escreve a hipótese numa frase que se possa provar falsa: 'acredito que o campo `email` vem a `None` quando o registo veio do formulário antigo'. Depois testa **essa** frase, não o programa inteiro."],
          ["aviso", "Mexer no código antes de ter uma hipótese é a definição de estar perdido. E se mudaste três coisas e passou a funcionar, não sabes qual foi, não aprendeste nada, e provavelmente introduziste dois bugs novos que ainda não viste."],
          ["h", "4. Corrigir e provar"],
          ["lista", [
            "Escreve primeiro o teste que falha por causa do bug (aula 19.3). É a prova de que percebeste.",
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
          { p: "Mexeste em três sítios, o bug desapareceu e vais fechar o bilhete. Qual é o problema?", o: ["Nenhum, o importante é funcionar","Não sabes qual foi a correção, e as outras duas alterações podem ter criado problemas novos","Devias ter mexido em mais sítios"], c: 1,
            e: "Sem saber a causa não sabes se corrigiste ou se escondeste. Volta atrás, aplica uma alteração de cada vez, e fica com a que resolve, com um teste que o prove." }
        ],
        exercicio: {
          ficheiro: "bissecao.py",
          enunciado: "Escreve `primeiro_mau(versoes, e_mau)`, a lógica do `git bisect`. `versoes` está ordenada da mais antiga para a mais recente e `e_mau(v)` devolve `False` até certo ponto e `True` daí para a frente. Devolve o índice da primeira versão má, ou `-1` se nenhuma for má. Não podes chamar `e_mau` para todas: há um teste que conta as chamadas.",
          inicio: String.raw`def primeiro_mau(versoes, e_mau):
    pass
`,
          testes: String.raw`import pytest

from bissecao import primeiro_mau


def ma_a_partir_de(limite, chamadas):
    def e_mau(versao):
        chamadas.append(versao)
        return versao >= limite

    return e_mau


@pytest.mark.parametrize(
    "total, limite, esperado",
    [(8, 5, 5), (4, 0, 0), (4, 99, -1), (0, 0, -1), (5, 4, 4)],
)
def test_encontra_a_primeira_ma(total, limite, esperado):
    assert primeiro_mau(list(range(total)), ma_a_partir_de(limite, [])) == esperado


def test_procura_por_bissecao_e_nao_uma_a_uma():
    chamadas = []
    assert primeiro_mau(list(range(1024)), ma_a_partir_de(700, chamadas)) == 700
    assert len(chamadas) <= 12
`
        }
      },
      {
        id: "22.2", titulo: "Depurador em vez de prints", min: 14, estado: "pronta",
        meta: "No fim: paras o programa a meio e inspecionas o estado em vez de adivinhar com prints.",
        blocos: [
          ["p", "O `print` é uma ferramenta legítima e é a primeira que usas. O problema é o ciclo: acrescentar print, correr, ler, apagar, acrescentar outro print. Com um depurador, paras uma vez e vês tudo o que quiseres, incluindo o que não te tinhas lembrado de imprimir."],
          ["h", "breakpoint()"],
          ["p", "Escreve `breakpoint()` na linha onde queres parar e corre o programa normalmente. Abre uma consola no meio da execução, com todas as variáveis daquele momento."],
          ["code", String.raw`def calcular_total(vendas):
    total = 0
    for venda in vendas:
        breakpoint()          # pára aqui, em cada volta
        total += venda["valor"]
    return total`],
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
          ["code", String.raw`for venda in vendas:
    if venda["valor"] < 0:      # só o caso estranho
        breakpoint()
    total += venda["valor"]`],
          ["h", "Depurar bem, sem depurador"],
          ["p", "Antes de abrires o que quer que seja, faz o método: reproduz o erro de forma fiável, reduz o caso ao mínimo que ainda falha, e forma uma hipótese que possas testar. Mexer no código a ver se passa é a forma mais lenta de tudo, e é a que toda a gente tenta primeiro."],
          ["lista", [
            "Consegues reproduzir? Se não, o problema é reproduzir, e é aí que trabalhas.",
            "Qual é o input mínimo que ainda falha? Metade das vezes, encontras a causa a reduzir.",
            "O que é que tu assumes que pode não ser verdade? É quase sempre aí que está.",
            "Escreve o teste que falha. Passa a ser a aula 19.3 a partir daqui."
          ]],
          ["obra", "Numa equipa, 'não consigo reproduzir' é uma resposta aceitável uma vez; à segunda, espera-se que peças os dados, a versão e os passos exatos. Um bilhete de bug com passos, resultado esperado e resultado obtido é um profissional a falar."],
          ["aviso", "`breakpoint()` esquecido no código pendura o programa em produção à espera de alguém escrever na consola. O `ruff` apanha isto com a regra T100. Configura-a e dorme descansado."],
          ["h", "Ver o estado sem parar"],
          ["py", String.raw`def calcular_total(vendas):
    total = 0
    for i, venda in enumerate(vendas):
        valor = venda.get("valor")
        if not isinstance(valor, (int, float)):
            print(f"linha {i}: valor inesperado {valor!r} em {venda}")
            continue
        total += valor
    return total

print(calcular_total([{"valor": 10}, {"valor": "20"}, {"produto": "x"}]))`],
          ["p", "Repara no `!r`: mostra a representação, com aspas incluídas. É como distingues o número 20 da string '20' num print, e essa distinção é metade dos bugs de dados."]
        ],
        quiz: [
          { p: "Um bug só aparece uma vez em cada mil execuções. Qual é o primeiro passo?", o: ["Pôr breakpoints em todo o lado","Encontrar uma forma fiável de o reproduzir","Envolver tudo em try/except"], c: 1,
            e: "Sem reprodução fiável não sabes se corrigiste ou se tiveste sorte. Regista o estado suficiente para reproduzir, e trabalha primeiro nisso." }
        ],
        exercicio: {
          ficheiro: "frequencia.py",
          enunciado: "A função abaixo devia devolver a palavra mais frequente, desempatando por ordem alfabética, e `None` para a lista vazia. Tem um bug, ou mais do que um. Encontra-os com o depurador (`breakpoint()`, ou os pontos de paragem do editor) antes de mexeres no código, e corrige.",
          inicio: String.raw`def mais_frequente(palavras):
    contagens = {}
    for p in palavras:
        contagens = {}
        contagens[p] = contagens.get(p, 0) + 1
    melhor = None
    for palavra, n in contagens.items():
        if n > contagens.get(melhor, 0):
            melhor = palavra
    return melhor
`,
          testes: String.raw`from frequencia import mais_frequente


def test_conta_bem():
    assert mais_frequente(["a", "b", "a"]) == "a"


def test_desempata_por_ordem_alfabetica():
    assert mais_frequente(["b", "a"]) == "a"


def test_lista_vazia():
    assert mais_frequente([]) is None


def test_caso_maior():
    assert mais_frequente(["x", "y", "y", "z", "z"]) == "y"
`
        }
      },
      {
        id: "22.3", titulo: "Catálogo dos bugs que o Python te deixa escrever", min: 18, estado: "pronta",
        meta: "No fim: reconheces de imediato os erros que apanham toda a gente pelo menos uma vez.",
        blocos: [
          ["p", "Python é permissivo, e essa permissividade tem uma conta a pagar. Esta é a lista dos erros que aparecem em revisões de código todas as semanas, em todas as empresas. Lê-a uma vez com atenção e volta cá quando algo não fizer sentido."],
          ["h", "1. Argumento por omissão mutável"],
          ["py", String.raw`def registar(evento, historico=[]):
    historico.append(evento)
    return historico

print(registar("a"))
print(registar("b"))   # a lista é a mesma`],
          ["p", "Já apareceu na aula 9.4 e volta aqui porque é o número um da lista. A correção é `=None` e criar lá dentro."],
          ["h", "2. Alterar uma lista enquanto a percorres"],
          ["py", String.raw`numeros = [1, 2, 3, 4]
for n in list(numeros):
    if n % 2 == 0:
        numeros.remove(n)
print(numeros)

maus = [1, 2, 2, 3]
for n in maus:
    if n == 2:
        maus.remove(n)
print(maus)   # ficou um 2`],
          ["h", "3. Funções criadas dentro de um ciclo"],
          ["py", String.raw`funcoes = [lambda: i for i in range(3)]
print([f() for f in funcoes])   # 2, 2, 2

funcoes = [lambda i=i: i for i in range(3)]
print([f() for f in funcoes])`],
          ["p", "A `lambda` guarda o **nome** `i`, não o valor que ele tinha. Quando as chamas, o ciclo já acabou e `i` vale a última coisa. Captura-se o valor com um argumento por omissão, ou com `functools.partial`."],
          ["h", "4. `is` em vez de `==`"],
          ["py", String.raw`a = 1000
b = 1000
print(a == b, a is b)

x = 5
y = 5
print(x == y, x is y)   # True por acaso: inteiros pequenos são reutilizados`],
          ["h", "5. Cópia rasa de estruturas encaixadas"],
          ["py", String.raw`modelo = {"nome": "", "tags": []}
a = dict(modelo)
b = dict(modelo)
a["tags"].append("novo")
print(b["tags"])   # o 'novo' também está aqui`],
          ["h", "6. Tapar nomes do Python"],
          ["py", String.raw`lista = [3, 1, 2]
list = sorted(lista)   # a partir daqui, list() deixa de existir
print(list)
try:
    print(list((1, 2)))
except TypeError as e:
    print("TypeError:", e)`],
          ["aviso", "O mesmo vale para ficheiros: um ficheiro teu chamado `json.py`, `random.py` ou `email.py` na pasta do projeto ganha ao módulo do Python e produz erros absurdos, do género 'module has no attribute loads'. Se um import começa a portar-se mal, procura um ficheiro teu com o mesmo nome."],
          ["h", "7. Comparar floats com =="],
          ["py", String.raw`print(0.1 + 0.2 == 0.3)
import math
print(math.isclose(0.1 + 0.2, 0.3))`],
          ["h", "8. `except` que engole tudo"],
          ["py", String.raw`def ler(valor):
    try:
        return int(valor)
    except Exception:
        return 0

print(ler("12"), ler("doze"))`],
          ["p", "Devolver `0` para texto inválido esconde um problema de dados que vai aparecer num relatório errado três semanas depois. Apanha a exceção que esperas (`ValueError`), e deixa passar o que não esperas. `except:` sem tipo nenhum apanha até o `Ctrl+C`."],
          ["h", "9. Atribuir a um nome global dentro de uma função"],
          ["py", String.raw`contador = 0

def aumentar_errado():
    try:
        contador = contador + 1
    except UnboundLocalError as e:
        print("UnboundLocalError:", e)

aumentar_errado()`],
          ["p", "Atribuir a um nome dentro de uma função torna-o local em toda a função, mesmo nas linhas acima da atribuição. Ou usas `global` (raramente boa ideia), ou, melhor, recebes o valor e devolves o novo."],
          ["h", "10. `return` dentro do ciclo, cedo demais"],
          ["py", String.raw`def todos_positivos(numeros):
    for n in numeros:
        if n > 0:
            return True     # responde ao primeiro, não a todos
        return False

print(todos_positivos([1, -1]))
print(all(n > 0 for n in [1, -1]))`],
          ["h", "Como se apanham estes sem ser à mão"],
          ["lista", [
            "`ruff` com as regras `B` (bugbear) apanha o número 1, o 3 e variantes do 8.",
            "`mypy` apanha o número 4 e muitos erros de tipo antes de correr (aula 20.1).",
            "Testes com casos limite apanham o 2 e o 10.",
            "Revisão de código apanha o 5, o 6 e o 9, porque um par de olhos que não escreveu aquilo lê o que lá está e não o que se queria escrever."
          ]],
          ["obra", "Ligar as regras `B` do `ruff` num projeto demora meia hora e evita bilhetes de bug durante anos. Se entrares numa equipa que não as tem ligadas, é uma proposta pequena, fácil de defender e que te faz ganhar reputação sem escreveres uma linha de lógica nova."],
          ["aviso", "Quando encontrares um destes no código da empresa, não o corrijas em silêncio no meio de outra alteração. Faz um pull request próprio, com um teste que demonstra o problema. Uma correção explicada ensina a equipa; uma correção escondida num diff de trezentas linhas não é vista por ninguém."]
        ],
        quiz: [
          { p: "`funcoes = [lambda: i for i in range(3)]` e depois chamas todas. O que sai?", o: ["0, 1, 2","2, 2, 2","Erro"], c: 1,
            e: "As lambdas guardam o nome `i`, não o valor. Quando as chamas, o ciclo acabou e `i` vale 2. Captura-se o valor com `lambda i=i: i`." }
        ],
        exercicio: {
          ficheiro: "multiplicadores.py",
          enunciado: "Esta fábrica de funções está errada: todas as funções devolvidas multiplicam pelo mesmo fator. É o erro 3 do catálogo e a armadilha da aula 16.1. Corrige-a para que `multiplicadores([2, 3])` devolva uma função que multiplica por 2 e outra que multiplica por 3.",
          inicio: String.raw`def multiplicadores(fatores):
    funcoes = []
    for f in fatores:
        funcoes.append(lambda x: x * f)
    return funcoes
`,
          testes: String.raw`from multiplicadores import multiplicadores


def test_cada_uma_com_o_seu_fator():
    dobro, triplo = multiplicadores([2, 3])
    assert (dobro(10), triplo(10)) == (20, 30)


def test_uma_funcao_por_fator():
    assert len(multiplicadores([1, 2, 3])) == 3


def test_lista_vazia():
    assert multiplicadores([]) == []


def test_todas_independentes():
    assert [f(1) for f in multiplicadores([1, 2, 3])] == [1, 2, 3]
`
        }
      },
      {
        id: "22.4", titulo: "Depurar o que não corre na tua máquina", min: 16, estado: "pronta",
        meta: "No fim: consegues perceber o que aconteceu num servidor a que não tens acesso interativo.",
        blocos: [
          ["p", "Em produção não pões um `breakpoint()`. Não há consola à tua espera, e mesmo que houvesse, parar o processo deixava os utilizadores pendurados. O que te resta são os rastos que o teu código deixou. É essa a verdadeira razão de existir do `logging` (aula 12.5)."],
          ["h", "Registos que servem para alguma coisa"],
          ["code", String.raw`import logging

log = logging.getLogger(__name__)

def processar(pedido_id, linhas):
    log.info("a processar pedido %s com %d linhas", pedido_id, len(linhas))
    try:
        return [transformar(l) for l in linhas]
    except ValueError:
        log.exception("pedido %s: linha inválida", pedido_id)
        raise`],
          ["lista", [
            "Contexto, sempre: identificadores, contagens, o nome do ficheiro. 'Erro ao processar' não ajuda ninguém às três da manhã.",
            "`log.exception(...)` dentro de um `except` inclui o traceback completo. `log.error(...)` sozinho perde-o.",
            "Usa os marcadores `%s` do logging em vez de f-strings: a formatação só acontece se aquele nível estiver ligado.",
            "Nunca registes palavras-passe, tokens, números de cartão ou dados pessoais. Os registos são copiados, enviados e guardados durante anos.",
            "`INFO` para marcos, `WARNING` para o que é estranho mas recuperável, `ERROR` para o que falhou. `DEBUG` para o detalhe que só ligas quando estás a investigar."
          ]],
          ["h", "Correlacionar"],
          ["p", "Com duzentos pedidos em simultâneo, as linhas de registo dos vários pedidos ficam intercaladas. Sem um identificador comum em todas as linhas do mesmo pedido, tens duzentas histórias misturadas e nenhuma legível. Gera um identificador à entrada e leva-o contigo."],
          ["code", String.raw`2026-03-14 03:12:01 INFO  [req=7f3a] a processar pedido 9912 com 40 linhas
2026-03-14 03:12:01 INFO  [req=91bc] a processar pedido 9913 com 12 linhas
2026-03-14 03:12:02 ERROR [req=7f3a] linha 17 inválida: valor 'N/D'`],
          ["h", "Falhar alto em vez de continuar errado"],
          ["p", "Continuar com dados errados é pior do que parar. Um erro que rebenta é um bilhete de bug; um erro silencioso é um relatório errado que ninguém questiona. Quando converteres uma exceção noutra, mantém a causa com `raise ... from`."],
          ["py", String.raw`def ler_config(valores):
    try:
        return int(valores["tentativas"])
    except KeyError as e:
        raise ValueError("falta a chave 'tentativas' na configuração") from e

try:
    ler_config({})
except ValueError as e:
    print(type(e).__name__, e)
    print("causa:", type(e.__cause__).__name__)`],
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
          { p: "Um erro raro acontece em produção umas vezes por dia e não consegues reproduzir localmente. Primeiro passo?", o: ["Pôr um breakpoint no servidor","Acrescentar registo com contexto suficiente para reconstruir o caso quando voltar a acontecer","Reescrever a função"], c: 1,
            e: "Sem reprodução não há depuração. Instrumentar para capturar o estado quando acontecer é o trabalho certo, e a espera faz parte dele." }
        ],
        exercicio: {
          ficheiro: "niveis_registo.py",
          enunciado: "Escreve `resumo_erros(linhas)`, que recebe linhas de registo como `\"2026-01-05 10:00:00 ERROR pagamento falhou\"` e devolve um dicionário com o número de ocorrências por nível, só dos níveis que aparecem. Os níveis válidos são DEBUG, INFO, WARNING, ERROR e CRITICAL. Linhas que não sigam o formato contam como `\"INVALIDO\"`.",
          inicio: String.raw`def resumo_erros(linhas):
    pass
`,
          testes: String.raw`from niveis_registo import resumo_erros

LINHAS = [
    "2026-01-05 10:00:00 ERROR pagamento falhou",
    "2026-01-05 10:00:01 INFO pedido recebido",
    "2026-01-05 10:00:02 ERROR pagamento falhou",
    "linha a toa",
]


def test_conta_por_nivel():
    assert resumo_erros(LINHAS) == {"ERROR": 2, "INFO": 1, "INVALIDO": 1}


def test_sem_linhas():
    assert resumo_erros([]) == {}


def test_nivel_desconhecido_e_invalido():
    assert resumo_erros(["2026-01-05 10:00:00 XPTO algo"]) == {"INVALIDO": 1}


def test_linha_sem_mensagem_ainda_conta():
    assert resumo_erros(["2026-01-05 10:00:00 WARNING"]) == {"WARNING": 1}


def test_so_os_niveis_presentes_aparecem():
    assert "DEBUG" not in resumo_erros(LINHAS)
`
        }
      },
      {
        id: "22.5", titulo: "Medir antes de otimizar", min: 12, estado: "pronta",
        meta: "No fim: medes onde o tempo se perde e escolhes a estrutura de dados certa em vez de adivinhar.",
        blocos: [
          ["p", "A intuição sobre desempenho está quase sempre errada. O tempo raramente está onde julgas: está numa consulta à base de dados dentro de um ciclo, numa procura linear repetida, ou numa conversão de dados que ninguém reparou. Mede primeiro."],
          ["h", "timeit para comparar duas versões"],
          ["py", String.raw`import timeit

lista = list(range(20000))
conjunto = set(lista)

t_lista = timeit.timeit(lambda: 19999 in lista, number=200)
t_set = timeit.timeit(lambda: 19999 in conjunto, number=200)

print(f"lista: {t_lista:.4f}s")
print(f"set:   {t_set:.4f}s")`],
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
          ["code", String.raw`python -m cProfile -s cumtime meu_script.py | head -20`],
          ["p", "Mostra quanto tempo se gastou em cada função, ordenado. Lê a coluna cumulativa e procura a primeira função tua na lista: é aí que trabalhas. Otimizar o que está abaixo dela é otimizar detalhes."],
          ["h", "A regra de trabalho"],
          ["lista", [
            "Torna o código correto e legível primeiro.",
            "Mede com dados realistas. Um milhão de linhas comporta-se de forma diferente de mil.",
            "Otimiza o ponto mais caro, um de cada vez, e volta a medir.",
            "Guarda os testes a passar durante todo o processo. Código rápido e errado não serve de nada."
          ]],
          ["obra", "O relato mais comum de um júnior no primeiro mês: 'o script demorava quatro horas, agora demora dois minutos'. Quase sempre é a mesma correção, trocar procuras repetidas numa lista por um dicionário construído uma vez. Sabe reconhecer o padrão e vais parecer mágico com quinze linhas."],
          ["py", String.raw`clientes = [{"id": i, "nome": f"cliente {i}"} for i in range(5000)]
encomendas = [{"cliente_id": i % 5000} for i in range(5000)]

# lento: procura linear por cada encomenda
def juntar_lento():
    return [c["nome"] for e in encomendas for c in clientes if c["id"] == e["cliente_id"]]

# rápido: um índice construído uma vez
def juntar_rapido():
    indice = {c["id"]: c["nome"] for c in clientes}
    return [indice[e["cliente_id"]] for e in encomendas]

import time
t = time.perf_counter(); juntar_rapido(); print(f"rápido: {time.perf_counter() - t:.4f}s")`],
          ["aviso", "Não troques legibilidade por microssegundos. Uma linha esperta que poupa dois por cento e ninguém percebe é um custo permanente para toda a equipa. Otimiza onde a medição diz que dói, e escreve um comentário a dizer porquê."]
        ],
        quiz: [
          { p: "Um script demora horas a cruzar duas listas de dez mil elementos. Qual é a primeira coisa a mudar?", o: ["Usar threads","Construir um dicionário de índice e trocar a procura linear por acesso direto","Comprar uma máquina melhor"], c: 1,
            e: "Cem milhões de comparações passam a dez mil acessos. Paralelizar código quadrático é paralelizar o desperdício." }
        ],
        exercicio: {
          ficheiro: "comuns.py",
          enunciado: "Escreve `comuns(a, b)`, que devolve os elementos presentes nas duas listas, ordenados e sem repetidos. Tem de aguentar listas grandes: um teste mede o tempo com vinte mil elementos. Antes de otimizar, mede a versão ingénua com `timeit` e compara.",
          inicio: String.raw`def comuns(a, b):
    pass
`,
          testes: String.raw`import time

from comuns import comuns


def test_elementos_comuns_ordenados():
    assert comuns([3, 1, 2, 3], [2, 3, 9]) == [2, 3]


def test_sem_comuns():
    assert comuns([1], [2]) == []


def test_lista_vazia():
    assert comuns([], [1, 2]) == []


def test_rapido_com_muitos_dados():
    a = list(range(20000))
    b = list(range(10000, 30000))
    inicio = time.perf_counter()
    assert comuns(a, b) == list(range(10000, 20000))
    assert time.perf_counter() - inicio < 0.5
`
        }
      }
  ]
});
