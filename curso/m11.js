/* Módulo 11: Como pensar um problema. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 11, fase: 2, titulo: "Como pensar um problema",
  objetivo: "Ir de um pedido vago a um programa completo, com um método que se repete.",
  licoes: [
      {
        id: "11.1", titulo: "Antes de escrever código: sete perguntas", min: 15, estado: "pronta",
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
          ["code", String.raw`entrada                     -> saída        porquê
[10, 20, 30]                -> 20.0         caso normal
[10]                        -> 10.0         um elemento
[]                          -> ValueError   média de nada não existe
[10, None, 20]              -> ?            decidir: ignorar ou rebentar?`],
          ["p", "Repara na última linha. Aparece sempre uma linha com um ponto de interrogação, e é sobre essa que vale a pena perguntar a alguém. As outras decides tu."],
          ["h", "Quando não há ninguém a quem perguntar"],
          ["p", "Decide, escolhe a opção mais conservadora, e escreve a decisão onde ela se veja: um comentário, o docstring, a descrição do pull request. 'Assumi que linhas sem data são do dia anterior' é uma frase que salva reuniões."],
          ["obra", "Metade do trabalho de um programador com experiência é transformar 'preciso de um relatório das vendas' em perguntas antes de abrir o editor. Quem só pergunta depois de ter escrito, reescreve. E numa equipa, quem faz as perguntas certas na reunião de refinamento ganha reputação mais depressa do que quem escreve mais código."],
          ["aviso", "'Faz sentido?' não é uma pergunta útil ao teu chefe de equipa, porque a resposta é sempre sim. 'Para pedidos cancelados, conto o valor ou não?' é uma pergunta a que só existe uma resposta e que muda o código."]
        ],
        quiz: [
          { p: "Pedem-te 'uma função que calcula a média das notas'. Qual é a pergunta mais importante antes de escrever?", o: ["Que nome dou à função","O que devolve quando a lista está vazia","Uso NumPy ou Python puro"], c: 1,
            e: "É o caso limite que a função vai encontrar no primeiro dia e sobre o qual o enunciado não diz nada. Zero, `None` ou erro são três comportamentos diferentes e quem pediu tem uma opinião." }
        ],
        exercicio: {
          ficheiro: "lotes.py",
          enunciado: "Aplica as perguntas e implementa `partir_em_lotes(itens, tamanho)`, que parte uma lista em sublistas de no máximo `tamanho` elementos. O último lote pode ser menor. Lista vazia dá lista vazia. `tamanho` menor que 1 levanta `ValueError`. Não altera a lista recebida.",
          inicio: String.raw`def partir_em_lotes(itens, tamanho):
    pass
`,
          testes: String.raw`import pytest

from lotes import partir_em_lotes


def test_divisao_exata():
    assert partir_em_lotes([1, 2, 3, 4], 2) == [[1, 2], [3, 4]]


def test_ultimo_lote_menor():
    assert partir_em_lotes([1, 2, 3], 2) == [[1, 2], [3]]


def test_lote_maior_que_a_lista():
    assert partir_em_lotes([1, 2], 5) == [[1, 2]]


def test_lista_vazia():
    assert partir_em_lotes([], 3) == []


def test_tamanho_um():
    assert partir_em_lotes([1, 2], 1) == [[1], [2]]


@pytest.mark.parametrize("tamanho", [0, -1])
def test_tamanho_invalido(tamanho):
    with pytest.raises(ValueError):
        partir_em_lotes([1], tamanho)


def test_nao_altera_a_lista_recebida():
    original = [1, 2, 3]
    partir_em_lotes(original, 2)
    assert original == [1, 2, 3]
`
        }
      },
      {
        id: "11.2", titulo: "Decompor: do papel às funções", min: 17, estado: "pronta",
        meta: "No fim: escreves o esqueleto de um programa inteiro antes de escreveres o corpo de qualquer função.",
        blocos: [
          ["p", "Quem começa escreve uma função de oitenta linhas. Quem trabalha nisto há tempo escreve seis de oito. Não é gosto pessoal: uma função pequena tem nome, pode ser testada sozinha, e quando rebenta o traceback diz-te logo qual das seis é."],
          ["h", "Esqueleto primeiro, corpo depois"],
          ["p", "Escreve os nomes e as docstrings, com `pass` lá dentro. Vês a forma toda do programa antes de te enterrares no primeiro detalhe, e percebes cedo se a divisão está má, que é quando ainda é barato mudar."],
          ["code", String.raw`def ler_linhas(caminho):
    """Lê o ficheiro e devolve uma lista de dicionários, um por linha."""


def validar(linha):
    """Devolve None se a linha está bem, ou o motivo da rejeição."""


def agregar(linhas):
    """Soma os valores por produto. Devolve produto -> total."""


def formatar(totais):
    """Devolve as linhas do relatório, já ordenadas."""


def main(caminho):
    linhas = ler_linhas(caminho)
    boas = [l for l in linhas if validar(l) is None]
    return formatar(agregar(boas))`],
          ["p", "A `main` lê-se como o enunciado do problema. Isso não é um acidente bonito: é o objetivo. Se a tua `main` não se lê assim, a divisão está errada."],
          ["h", "Um nível de abstração por função"],
          ["p", "Se uma função abre ficheiros **e** calcula IVA, são duas funções. A regra prática: o corpo de uma função deve ler-se todo à mesma altura, como um resumo. Misturar `open()` com `round(preco * 1.23, 2)` na mesma função é misturar duas alturas."],
          ["h", "Empurra a entrada e a saída para as bordas"],
          ["p", "Uma função pura recebe valores, devolve valores, e não toca em mais nada: nem ficheiros, nem rede, nem relógio, nem variáveis globais. Dá a mesma resposta para a mesma pergunta, sempre. É trivial de testar e é onde deve viver a lógica de negócio."],
          ["py", String.raw`# difícil de testar: lê, calcula e escreve tudo junto
def relatorio_mau(caminho):
    with open(caminho) as f:
        total = sum(float(l) for l in f)
    print(f"total: {total}")


# fácil de testar: o cálculo é puro, a borda faz o resto
def total_de(linhas):
    return sum(float(l) for l in linhas)


print(total_de(["10", "20.5"]))`],
          ["p", "Repara no que ganhaste: para testar `total_de` não precisas de ficheiro nenhum. É esta separação que faz a diferença entre uma suite de testes rápida e uma que ninguém corre."],
          ["obra", "Ler, validar, transformar, escrever. Esta é a forma de noventa por cento do software de empresa, do script de importação ao serviço web. Saber em qual destas quatro caixas é que um pedaço de código deve viver é mais arquitetura do que a maioria do código que vais encontrar."],
          ["aviso", "Decompor a mais também custa. Quinze funções de duas linhas, cada uma chamada num sítio só, obrigam a saltar por todo o ficheiro para perceber uma coisa simples. Uma função existe quando tem um nome honesto; se o melhor nome que arranjas é `processar_parte_2`, junta-a outra vez."]
        ],
        quiz: [
          { p: "Tens uma função de sessenta linhas que lê um ficheiro, valida, calcula e imprime. Qual é a primeira coisa a fazer?", o: ["Dividir a meio, em duas de trinta","Separar a leitura e a escrita do cálculo, para poderes testar o cálculo sem ficheiros","Acrescentar comentários a explicar cada parte"], c: 1,
            e: "Cortar pelo meio dá duas funções sem nome honesto. Cortar pelas bordas de entrada e saída dá-te uma função pura no meio, que é a parte que tem lógica e a que interessa testar." }
        ],
        exercicio: {
          ficheiro: "relatorio_vendas.py",
          enunciado: "Constrói um pequeno relatório por decomposição, em três funções. `analisar(linha)` recebe `\"teclado;39.90;2\"` e devolve `(\"teclado\", 79.8)`, ou `None` se a linha for inválida. `agregar(linhas)` devolve um dicionário produto para total, ignorando as linhas inválidas. `relatorio(linhas)` devolve uma lista de textos como `\"teclado: 79.80\"`, ordenados por total decrescente e, em caso de empate, por nome.",
          inicio: String.raw`def analisar(linha):
    pass


def agregar(linhas):
    pass


def relatorio(linhas):
    pass
`,
          testes: String.raw`from relatorio_vendas import agregar, analisar, relatorio


def test_analisa_uma_linha():
    assert analisar("teclado;39.90;2") == ("teclado", 79.8)


def test_valor_invalido_devolve_none():
    assert analisar("teclado;abc;2") is None


def test_campos_a_menos_devolve_none():
    assert analisar("teclado;39.90") is None


def test_agrega_o_mesmo_produto():
    assert agregar(["rato;10.00;1", "rato;10.00;2"]) == {"rato": 30.0}


def test_agregar_ignora_linhas_invalidas():
    assert agregar(["rato;10.00;1", "lixo"]) == {"rato": 10.0}


def test_relatorio_ordenado_por_total():
    assert relatorio(["rato;10.00;1", "teclado;39.90;2"]) == ["teclado: 79.80", "rato: 10.00"]


def test_empate_resolvido_por_nome():
    assert relatorio(["b;10.00;1", "a;10.00;1"]) == ["a: 10.00", "b: 10.00"]


def test_sem_linhas():
    assert relatorio([]) == []
`
        }
      },
      {
        id: "11.3", titulo: "Resolver em voz alta, do princípio ao fim", min: 18, estado: "pronta",
        meta: "No fim: viste o processo completo de resolver um problema, hesitações incluídas, e sabes imitá-lo.",
        blocos: [
          ["p", "Esta aula é uma transcrição. O problema é real e aparece em entrevistas e no trabalho: **dado um registo de acessos, diz-me as três páginas com mais erros de servidor**."],
          ["code", String.raw`GET /produtos 200
GET /carrinho 500
POST /pagamento 503
GET /carrinho 500
GET /inicio 200
POST /pagamento 500`],
          ["h", "Passo 1: perguntas, antes de tudo"],
          ["lista", [
            "O que conta como erro de servidor? Só 500, ou tudo a partir de 500? **Decido: 500 ou mais.**",
            "E se houver empate na contagem? **Decido: ordem alfabética, para o relatório ser reprodutível.**",
            "E se houver menos de três páginas com erros? **Decido: devolvo as que há.**",
            "E linhas com formato estranho? **Decido: ignoro, mas conto quantas ignorei.**",
            "Quantas linhas tem isto? Se forem milhões, não leio tudo para memória."
          ]],
          ["h", "Passo 2: exemplos escritos à mão"],
          ["code", String.raw`as 6 linhas acima, n=3  -> ['/carrinho', '/pagamento']   (só há dois com erros)
[], n=3                 -> []
linhas sem erros, n=3   -> []
['GET /a 500'], n=0     -> []`],
          ["h", "Passo 3: a versão mais burra que funciona"],
          ["py", String.raw`linhas = ["GET /produtos 200", "GET /carrinho 500", "POST /pagamento 503",
          "GET /carrinho 500", "GET /inicio 200", "POST /pagamento 500"]

contagens = {}
for linha in linhas:
    partes = linha.split()
    if len(partes) != 3:
        continue
    _, url, codigo = partes
    if int(codigo) >= 500:
        contagens[url] = contagens.get(url, 0) + 1

print(contagens)`],
          ["p", "Está feio, está numa só tira, e funciona. Isto é um ponto de partida legítimo e é muito melhor do que uma solução elegante que não corre. Nunca fiques preso a tentar acertar à primeira."],
          ["h", "Passo 4: os casos limite que eu próprio listei"],
          ["p", "`int(codigo)` rebenta se o código não for um número. O enunciado dizia para ignorar linhas estranhas, não para rebentar. Corrijo, e aproveito para contar as ignoradas, que era outra decisão minha."],
          ["h", "Passo 5: arrumar, agora que funciona"],
          ["py", String.raw`from collections import Counter


def paginas_com_mais_erros(linhas, n=3):
    contagens = Counter()
    ignoradas = 0
    for linha in linhas:
        partes = linha.split()
        if len(partes) != 3 or not partes[2].isdigit():
            ignoradas += 1
            continue
        _, url, codigo = partes
        if int(codigo) >= 500:
            contagens[url] += 1
    ordenadas = sorted(contagens.items(), key=lambda p: (-p[1], p[0]))
    return [url for url, _ in ordenadas[:n]], ignoradas


linhas = ["GET /produtos 200", "GET /carrinho 500", "POST /pagamento 503",
          "GET /carrinho 500", "lixo", "POST /pagamento 500"]
print(paginas_com_mais_erros(linhas))`],
          ["h", "Passo 6: o que ficou por fazer, dito em voz alta"],
          ["lista", [
            "Com um ficheiro de dez milhões de linhas, leio com um gerador em vez de carregar tudo (aula 15.2).",
            "Se isto correr todos os dias, quero o número de ignoradas no registo, senão a qualidade dos dados degrada-se sem ninguém ver.",
            "A ordenação completa é desnecessária: `Counter.most_common(n)` chega. Deixei `sorted` porque preciso do desempate alfabético."
          ]],
          ["obra", "Numa entrevista técnica é exatamente isto que estão a avaliar: perguntas, exemplos, versão simples, casos limite, melhoria, e o que ficou por fazer. Chegar à solução ótima em silêncio pontua menos do que este percurso falado, porque no trabalho ninguém programa sozinho em silêncio."],
          ["aviso", "Começar pela versão esperta é a forma mais rápida de ficar preso vinte minutos. Se estás preso, escreve a versão burra, mesmo que seja lenta e feia. Ter código que funciona muda a natureza do problema: passas a melhorar em vez de adivinhar."]
        ],
        quiz: [
          { p: "Estás há vinte minutos preso numa solução elegante que não funciona. O que fazes?", o: ["Continuas, já estás quase","Escreves a versão mais simples que funcione, mesmo que lenta, e melhoras a partir daí","Procuras a solução na internet"], c: 1,
            e: "Código a funcionar é uma base para melhorar e é uma resposta entregável. Uma solução elegante por acabar não vale nada, nem numa entrevista nem numa sprint." }
        ],
        exercicio: {
          ficheiro: "erros_servidor.py",
          enunciado: "Implementa `paginas_com_mais_erros(linhas, n)`. Cada linha é `\"MÉTODO /url CÓDIGO\"`. Conta apenas as linhas com código maior ou igual a 500 e devolve as `n` páginas com mais erros, da mais frequente para a menos. Os empates resolvem-se por ordem alfabética. Linhas que não tenham exatamente três partes, ou cujo código não seja um número, são ignoradas.",
          inicio: String.raw`def paginas_com_mais_erros(linhas, n):
    pass
`,
          testes: String.raw`from erros_servidor import paginas_com_mais_erros

LINHAS = [
    "GET /produtos 200",
    "GET /carrinho 500",
    "POST /pagamento 503",
    "GET /carrinho 500",
    "GET /inicio 200",
    "POST /pagamento 500",
]


def test_conta_e_ordena():
    assert paginas_com_mais_erros(LINHAS, 3) == ["/carrinho", "/pagamento"]


def test_limita_a_n():
    assert paginas_com_mais_erros(LINHAS, 1) == ["/carrinho"]


def test_empate_por_ordem_alfabetica():
    assert paginas_com_mais_erros(["GET /b 500", "GET /a 500"], 2) == ["/a", "/b"]


def test_sem_erros_devolve_vazio():
    assert paginas_com_mais_erros(["GET /a 200"], 3) == []


def test_sem_linhas_ou_n_zero():
    assert paginas_com_mais_erros([], 3) == []
    assert paginas_com_mais_erros(LINHAS, 0) == []


def test_ignora_linhas_estranhas():
    assert paginas_com_mais_erros(["lixo", "GET /a xpto", "GET /a 500"], 3) == ["/a"]


def test_499_nao_e_erro_de_servidor():
    assert paginas_com_mais_erros(["GET /a 499"], 3) == []
`
        }
      },
      {
        id: "11.4", titulo: "Anatomia de um script: main, argumentos e código de saída", min: 15, estado: "pronta",
        meta: "No fim: escreves programas com uma função main, que recebem argumentos, que se podem importar sem correr e que dizem ao sistema se correram bem.",
        blocos: [
          ["p", "Os teus exercícios têm sido funções soltas que os testes chamam. Um programa que alguém corre precisa de mais três coisas: um ponto de entrada, uma forma de receber dados sem ninguém a escrever, e uma forma de dizer se correu bem."],
          ["h", "Um programa a sério é um ficheiro"],
          ["code", String.raw`# relatorio.py
import sys


def ler_valores(texto):
    return [float(p) for p in texto.split(",") if p.strip()]


def main(argv):
    if not argv:
        print("uso: python3 relatorio.py 10,20,30", file=sys.stderr)
        return 2
    valores = ler_valores(argv[0])
    print(f"total: {sum(valores):.2f}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))`],
          ["h", "O que é aquele `__name__`"],
          ["p", "Quando corres um ficheiro diretamente, o Python põe `__name__` a `\"__main__\"`. Quando o importas a partir de outro ficheiro, `__name__` passa a ser o nome do módulo. A guarda `if __name__ == \"__main__\"` é o que separa a parte biblioteca da parte programa: importar não dispara nada, correr dispara o `main`."],
          ["aviso", "Código solto no topo do ficheiro corre no momento do `import`. Um ficheiro que começa a processar dados só por ser importado é um clássico: os testes ficam lentos, e ninguém percebe porquê."],
          ["h", "Receber dados"],
          ["lista", [
            "`input(\"Nome: \")` pergunta à pessoa. Devolve sempre texto e só serve quando há uma pessoa a olhar.",
            "`sys.argv` são os argumentos da linha de comandos: `python3 relatorio.py 10,20` põe `['relatorio.py', '10,20']`.",
            "Variáveis de ambiente (`os.environ`) para configuração e segredos.",
            "Num programa a sério, argumentos tratam-se com `argparse`, que está no aula 28.1."
          ]],
          ["obra", "Scripts que fazem `input()` não correm em automatismos. No servidor, às três da manhã, ninguém escreve nada: o programa fica a olhar para o vazio até alguém o matar. Tudo o que um programa precisa de saber entra por argumentos ou por variáveis de ambiente."],
          ["h", "Código de saída"],
          ["p", "Um programa devolve um número ao sistema: `0` é sucesso, qualquer outro é falha. É assim que o cron, o CI e o teu colega no terminal sabem se correu bem. Um programa que falha e devolve `0` é pior do que um que rebenta."],
          ["code", String.raw`$ python3 relatorio.py 10,20,30
total: 60.00
$ echo $?
0
$ python3 relatorio.py
uso: python3 relatorio.py 10,20,30
$ echo $?
2`],
          ["py", String.raw`import sys

def main(argv):
    if not argv:
        return 2
    return 0

print("com argumento:", main(["10,20"]))
print("sem argumentos:", main([]))`]
        ],
        quiz: [
          { p: "Para que serve `if __name__ == \"__main__\":`?", o: ["Para o Python saber por onde começar","Para o ficheiro poder ser importado sem correr o programa","É uma convenção de estilo sem efeito"], c: 1,
            e: "Sem a guarda, importar o ficheiro num teste ou noutro módulo executa tudo o que está lá dentro. Com ela, o ficheiro serve as duas coisas: biblioteca e programa." }
        ],
        exercicio: {
          ficheiro: "dobro.py",
          enunciado: "Escreve um programa com uma função `main(argv)`, em que `argv` é a lista de argumentos sem o nome do programa. Com um argumento numérico, mostra o dobro como decimal (`42.0` para `21`) e devolve 0. Sem argumentos, escreve `uso: python dobro.py NUMERO` no `sys.stderr` e devolve 2. Com um argumento que não é um número, escreve uma mensagem no `sys.stderr` e devolve 1. O ficheiro acaba com a guarda do `__main__`, que chama `sys.exit(main(sys.argv[1:]))`.",
          inicio: String.raw`import sys


def main(argv):
    pass
`,
          testes: String.raw`import runpy
import sys
from pathlib import Path

import pytest

from dobro import main

PROGRAMA = str(Path(__file__).with_name("dobro.py"))


def test_mostra_o_dobro_e_devolve_zero(capsys):
    assert main(["21"]) == 0
    assert capsys.readouterr().out == "42.0\n"


def test_numero_negativo_e_decimal(capsys):
    assert main(["-1.5"]) == 0
    assert capsys.readouterr().out == "-3.0\n"


def test_sem_argumentos_explica_o_uso(capsys):
    assert main([]) == 2
    saida = capsys.readouterr()
    assert saida.out == ""
    assert "uso:" in saida.err


def test_argumento_invalido_devolve_um(capsys):
    assert main(["abc"]) == 1
    assert capsys.readouterr().err != ""


def test_importar_nao_corre_o_programa(capsys):
    runpy.run_path(PROGRAMA)
    assert capsys.readouterr().out == ""


def test_correr_como_programa_sai_com_o_codigo(monkeypatch, capsys):
    monkeypatch.setattr(sys, "argv", ["dobro.py", "5"])
    with pytest.raises(SystemExit) as saida:
        runpy.run_path(PROGRAMA, run_name="__main__")
    assert saida.value.code == 0
    assert capsys.readouterr().out == "10.0\n"
`
        }
      },
      {
        id: "11.5", titulo: "Projeto: um programa completo, do princípio ao fim", min: 30, estado: "pronta",
        meta: "No fim: construíste um programa inteiro com o método dos dois últimos módulos: perguntas, exemplos, esqueleto, funções puras, bordas e testes.",
        blocos: [
          ["p", "Esta aula junta tudo o que aprendeste até aqui num programa pequeno e completo: um registo de despesas no terminal. Escreves-se linhas como `almoço; 12,50`, e no fim o programa mostra o total por categoria. Não há nada de novo para aprender; há muito para combinar."],
          ["h", "Passo 1: perguntas"],
          ["lista", [
            "O que entra? Linhas escritas por uma pessoa, uma de cada vez, até ela escrever `fim`.",
            "Em que formato? Categoria, ponto e vírgula, valor. O valor pode vir com vírgula decimal e espaços à volta.",
            "O que sai? Uma linha por categoria, da que gastou mais para a que gastou menos, e o total.",
            "E se a linha estiver mal? Avisa e continua. Uma despesa mal escrita não deve deitar fora as outras.",
            "Categorias com maiúsculas diferentes são a mesma? Sim: `Almoço` e `almoço` juntam-se."
          ]],
          ["h", "Passo 2: exemplos à mão"],
          ["code", String.raw`entrada                 -> resultado
"almoço; 12,50"         -> ("almoço", 12.5)
" Transportes ;3"       -> ("transportes", 3.0)
"almoço 12"             -> ValueError: falta o ;
"almoço; doze"          -> ValueError: valor inválido
"almoço; -5"            -> ValueError: o valor tem de ser positivo`],
          ["h", "Passo 3: esqueleto"],
          ["code", String.raw`def interpretar(linha):
    """Devolve (categoria, valor) ou levanta ValueError com o motivo."""


def acrescentar(totais, categoria, valor):
    """Devolve um dicionário novo com o valor somado à categoria."""


def resumo(totais):
    """Devolve as linhas do relatório, a mais cara primeiro, e o total no fim."""


def main():
    """Lê linhas até 'fim' e mostra o resumo. É a única que fala com a pessoa."""`],
          ["p", "Três funções puras, que recebem valores e devolvem valores, e uma borda, a `main`, que é a única com `input` e `print`. As puras testam-se sem fingir que há uma pessoa ao teclado; a `main` fica tão fina que quase não precisa de testes."],
          ["h", "Passo 4: uma função de cada vez, com testes"],
          ["p", "Escreve `interpretar` e corre só os testes dela: `python -m pytest m11/test_despesas.py -k interpretar`. O `-k` escolhe os testes pelo nome. Quando estiverem verdes, passa à seguinte. Faz um commit por função: o histórico conta como construíste o programa."],
          ["h", "Passo 5: a borda"],
          ["code", String.raw`$ python m11/despesas.py
> almoço; 12,50
> transportes; 3
> Almoço; 9
> jantar doze
linha ignorada: falta o ; em 'jantar doze'
> fim
almoço: 21.50
transportes: 3.00
total: 24.50`],
          ["obra", "É esta a forma de noventa por cento dos programas que vais escrever no primeiro ano: ler, validar, transformar, mostrar. Muda a origem dos dados, que passa a ser um ficheiro, uma base de dados ou um serviço, e muda o destino. O miolo, puro e testado, fica igual."],
          ["aviso", "Não escrevas a `main` primeiro. É tentador, porque é a parte que se vê a funcionar, e é a que te obriga a testar tudo à mão, a escrever linhas no terminal de cada vez que mudas uma vírgula."]
        ],
        quiz: [
          { p: "Porque é que só a `main` usa `input` e `print`?", o: ["Porque é obrigatório em Python","Para que o resto do programa se teste com valores, sem simular uma pessoa","Para o programa ser mais rápido"], c: 1,
            e: "Funções puras testam-se com uma linha cada. Tudo o que fala com o mundo fica numa borda fina." }
        ],
        exercicio: {
          ficheiro: "despesas.py",
          enunciado: "Escreve o programa da aula. `interpretar(linha)` devolve `(categoria, valor)`, com a categoria sem espaços e em minúsculas e o valor como `float`, e levanta `ValueError` com uma mensagem se faltar o `;`, se o valor não for um número ou se não for positivo. `acrescentar(totais, categoria, valor)` devolve um dicionário novo. `resumo(totais)` devolve as linhas `\"almoço: 21.50\"`, da categoria com mais gasto para a com menos (empates por nome), e por fim `\"total: 24.50\"`. `main()` pergunta com `input(\"> \")` até receber `fim`, mostra `linha ignorada: ` seguido da mensagem do erro para cada linha inválida, mostra o resumo e devolve 0.",
          inicio: String.raw`def interpretar(linha):
    pass


def acrescentar(totais, categoria, valor):
    pass


def resumo(totais):
    pass


def main():
    pass


if __name__ == "__main__":
    main()
`,
          testes: String.raw`import pytest

from despesas import acrescentar, interpretar, main, resumo


def test_interpretar_linha_normal():
    assert interpretar("almoço; 12,50") == ("almoço", 12.5)


def test_interpretar_limpa_a_categoria():
    assert interpretar(" Transportes ;3") == ("transportes", 3.0)


@pytest.mark.parametrize("linha", ["almoço 12", "almoço; doze", "almoço; -5", "almoço; 0", ";"])
def test_interpretar_recusa_linhas_invalidas(linha):
    with pytest.raises(ValueError):
        interpretar(linha)


def test_acrescentar_categoria_nova_e_existente():
    totais = acrescentar({}, "almoço", 12.5)
    totais = acrescentar(totais, "almoço", 9)
    assert totais == {"almoço": 21.5}


def test_acrescentar_nao_altera_o_original():
    originais = {"almoço": 1.0}
    acrescentar(originais, "almoço", 2)
    assert originais == {"almoço": 1.0}


def test_resumo_ordenado_com_total():
    totais = {"transportes": 3.0, "almoço": 21.5}
    assert resumo(totais) == ["almoço: 21.50", "transportes: 3.00", "total: 24.50"]


def test_resumo_empate_por_nome():
    assert resumo({"b": 1.0, "a": 1.0}) == ["a: 1.00", "b: 1.00", "total: 2.00"]


def test_resumo_vazio():
    assert resumo({}) == ["total: 0.00"]


def test_main_completo(monkeypatch, capsys):
    respostas = ["almoço; 12,50", "transportes; 3", "Almoço; 9", "jantar doze", "fim"]
    monkeypatch.setattr("builtins.input", lambda pergunta="": respostas.pop(0))
    assert main() == 0
    linhas = capsys.readouterr().out.splitlines()
    assert linhas[0].startswith("linha ignorada: ")
    assert linhas[1:] == ["almoço: 21.50", "transportes: 3.00", "total: 24.50"]
`
        }
      }
  ]
});
