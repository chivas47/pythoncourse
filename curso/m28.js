/* Módulo 28: Programas que te vão pedir no trabalho. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 28, fase: 5, titulo: "Programas que te vão pedir no trabalho",
  objetivo: "Os cinco tipos de programa que um júnior de Python escreve no primeiro ano, feitos como deve ser.",
  licoes: [
      {
        id: "28.1", titulo: "Uma ferramenta de linha de comandos", min: 18, estado: "pronta",
        meta: "No fim: escreves um programa que outra pessoa consegue usar sem te perguntar nada.",
        blocos: [
          ["p", "O primeiro programa que te vão pedir para outra pessoa usar é quase sempre um comando: 'faz-me um script que exporte isto'. A diferença entre um script e uma ferramenta é previsibilidade: tem `--help`, aceita argumentos, devolve um código de saída honesto e não destrói nada sem avisar."],
          ["h", "argparse, que já vem no Python"],
          ["code", String.raw`import argparse
import sys


def construir_parser():
    p = argparse.ArgumentParser(
        prog="exportar",
        description="Exporta as vendas de um período para CSV ou JSON.",
    )
    p.add_argument("ficheiro", help="ficheiro de entrada")
    p.add_argument("--dias", type=int, default=30, help="período a exportar")
    p.add_argument("--formato", choices=["csv", "json"], default="csv")
    p.add_argument("--dry-run", action="store_true", help="mostra o que faria, sem escrever")
    p.add_argument("-v", "--verbose", action="store_true")
    return p


def main(argv=None):
    args = construir_parser().parse_args(argv)
    if args.dry_run:
        print(f"escreveria {args.ficheiro} em {args.formato}", file=sys.stderr)
        return 0
    ...
    return 0


if __name__ == "__main__":
    sys.exit(main())`],
          ["p", "Com vinte linhas ganhaste `--help` escrito sozinho, conversão de tipos, validação de opções e mensagens de erro decentes. Escrever isto à mão com `sys.argv` é trabalho a mais e fica pior."],
          ["py", String.raw`import argparse

p = argparse.ArgumentParser(prog="exportar")
p.add_argument("ficheiro")
p.add_argument("--dias", type=int, default=30)
p.add_argument("--dry-run", action="store_true")

print(p.parse_args(["vendas.csv"]))
print(p.parse_args(["vendas.csv", "--dias", "7", "--dry-run"]))`],
          ["h", "As regras que fazem uma ferramenta boa"],
          ["lista", [
            "O resultado vai para o `stdout`. As mensagens para a pessoa vão para o `stderr`. Assim, `programa > ficheiro.csv` guarda dados limpos e as mensagens continuam a aparecer no ecrã.",
            "Código de saída: `0` correu bem, `1` falhou, `2` foi mal usado. É por aqui que o cron e o CI sabem se devem gritar.",
            "`--dry-run` em tudo o que apaga, altera ou envia. E que seja o comportamento por omissão enquanto a ferramenta for nova.",
            "Nada de `input()`: uma ferramenta tem de poder correr sem ninguém a olhar.",
            "Segredos vêm de variáveis de ambiente, nunca de argumentos: a linha de comandos fica no histórico e aparece na lista de processos."
          ]],
          ["py", String.raw`import argparse

p = argparse.ArgumentParser()
sub = p.add_subparsers(dest="comando", required=True)

importar = sub.add_parser("importar")
importar.add_argument("ficheiro")

listar = sub.add_parser("listar")
listar.add_argument("--limite", type=int, default=10)

print(p.parse_args(["importar", "dados.csv"]))
print(p.parse_args(["listar", "--limite", "3"]))`],
          ["obra", "`--dry-run` já salvou mais carreiras do que qualquer padrão de desenho. Quando escreveres uma ferramenta que apaga, migra ou envia, faz a versão que só mostra primeiro, mostra a saída a alguém, e só depois ligas a que age a sério."],
          ["aviso", "Três coisas que a tua ferramenta vai encontrar no primeiro dia e quase ninguém trata: caminhos com espaços e acentos, ficheiros que não existem, e um `Ctrl+C` a meio. O primeiro resolve-se com `pathlib`, o segundo com uma mensagem clara e código 1, o terceiro apanhando `KeyboardInterrupt` para sair limpo."]
        ],
        quiz: [
          { p: "A tua ferramenta imprime o relatório e também as mensagens de progresso no `stdout`. Qual é o problema?", o: ["Nenhum","Quem redirecionar a saída para um ficheiro fica com as mensagens misturadas nos dados","É mais lento"], c: 1,
            e: "Dados para o `stdout`, conversa para o `stderr`. É o que permite encadear a tua ferramenta com outras, que é para isso que as ferramentas de linha de comandos servem." }
        ],
        exercicio: {
          ficheiro: "ferramenta_cli.py",
          enunciado: "Escreve `construir_parser()`, que devolve um `ArgumentParser` com: um argumento posicional obrigatório `ficheiro`; a opção `--dias`, inteira, com omissão 30; a bandeira `--dry-run`, que fica `True` quando está presente; e a opção `--formato`, limitada a `csv` ou `json`, com omissão `csv`.",
          inicio: String.raw`import argparse


def construir_parser():
    pass
`,
          testes: String.raw`import pytest

from ferramenta_cli import construir_parser


@pytest.fixture
def parser():
    return construir_parser()


def test_omissoes(parser):
    args = parser.parse_args(["vendas.csv"])
    assert args.ficheiro == "vendas.csv"
    assert args.dias == 30
    assert args.dry_run is False
    assert args.formato == "csv"


def test_todas_as_opcoes(parser):
    args = parser.parse_args(["x.csv", "--dias", "7", "--dry-run", "--formato", "json"])
    assert args.dias == 7 and isinstance(args.dias, int)
    assert args.dry_run is True
    assert args.formato == "json"


@pytest.mark.parametrize("argumentos", [["x.csv", "--formato", "xml"], [], ["x.csv", "--dias", "sete"]])
def test_argumentos_invalidos_sao_recusados(parser, argumentos, capsys):
    with pytest.raises(SystemExit):
        parser.parse_args(argumentos)
`
        }
      },
      {
        id: "28.2", titulo: "Um relatório a partir de dados que ninguém limpou", min: 20, estado: "pronta",
        meta: "No fim: produzes um relatório fiável a partir de um ficheiro sujo, e dizes o que deitaste fora.",
        blocos: [
          ["p", "O pedido é sempre parecido: 'pega neste ficheiro e diz-me os totais por produto'. O ficheiro tem colunas vazias, datas em três formatos, vírgulas decimais, linhas repetidas e um cabeçalho com um espaço a mais. Isto não é azar: é o estado normal dos dados."],
          ["h", "O caminho: ler, normalizar, validar, agregar, escrever"],
          ["code", String.raw`import csv
from pathlib import Path


def ler(caminho):
    # utf-8-sig come o BOM que o Excel põe à cabeça
    with Path(caminho).open(encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f, delimiter=";"))`],
          ["lista", [
            "`newline=\"\"` no `open` é obrigatório com o módulo `csv`, senão partes-te com quebras de linha dentro de campos.",
            "`encoding=\"utf-8-sig\"` para ficheiros do Excel; `utf-8` para tudo o resto; e pergunta a origem quando os acentos vierem partidos.",
            "`DictReader` dá-te dicionários com os nomes das colunas. Normaliza os nomes: `.strip().lower()`.",
            "O separador em Portugal é muitas vezes `;`, porque a vírgula é decimal."
          ]],
          ["h", "Normalizar antes de validar"],
          ["py", String.raw`def a_numero(bruto):
    """Aceita '1 234,56', '1234.56' e ' 12 '. Devolve None se não der."""
    if bruto is None:
        return None
    limpo = bruto.strip().replace(" ", "").replace("\u00a0", "")
    if limpo.count(",") == 1 and limpo.count(".") == 0:
        limpo = limpo.replace(",", ".")
    else:
        limpo = limpo.replace(",", "")
    try:
        return float(limpo)
    except ValueError:
        return None

for bruto in ["39,90", "1 234,56", "1,234.56", " 12 ", "N/D", ""]:
    print(repr(bruto), "->", a_numero(bruto))`],
          ["h", "Nunca deites uma linha fora em silêncio"],
          ["p", "Cada linha rejeitada leva o número da linha e o motivo. No fim entregas duas coisas: o relatório e a lista de rejeições. É a diferença entre um número em que se confia e um número que alguém vai ter de auditar."],
          ["py", String.raw`def processar(linhas):
    totais, rejeitadas = {}, []
    for i, linha in enumerate(linhas, start=1):
        produto = (linha.get("produto") or "").strip()
        if not produto:
            rejeitadas.append((i, "produto em falta"))
            continue
        valor = a_numero(linha.get("valor"))
        if valor is None:
            rejeitadas.append((i, "valor inválido"))
            continue
        totais[produto] = round(totais.get(produto, 0.0) + valor, 2)
    return totais, rejeitadas


def a_numero(bruto):
    try:
        return float((bruto or "").strip().replace(",", "."))
    except ValueError:
        return None


linhas = [{"produto": "teclado", "valor": "39,90"}, {"produto": "", "valor": "5"}]
print(processar(linhas))`],
          ["h", "Escrever o resultado"],
          ["code", String.raw`import csv

with open("relatorio.csv", "w", encoding="utf-8", newline="") as f:
    escritor = csv.writer(f, delimiter=";")
    escritor.writerow(["produto", "total"])
    for produto, total in sorted(totais.items()):
        escritor.writerow([produto, f"{total:.2f}"])`],
          ["obra", "Entregar 'processei 10 000 linhas' sem dizer que 400 foram ignoradas é pior do que não entregar nada, porque alguém vai tomar decisões com o número. 'Processei 9 600, rejeitei 400, aqui está o ficheiro com os motivos' é a mesma meia hora de trabalho e é a diferença entre um júnior e um estagiário."],
          ["aviso", "`1.234,56` e `1,234.56` são o mesmo número escrito por países diferentes, e `1.234` pode ser mil duzentos e trinta e quatro ou um vírgula dois três quatro. Não adivinhes: pergunta a origem do ficheiro e escreve a regra no código, com um comentário."]
        ],
        quiz: [
          { p: "O relatório dá um total 30% abaixo do esperado e ninguém percebe porquê. O que faltou ao programa?", o: ["Mais testes de desempenho","Registar e devolver as linhas rejeitadas com o motivo","Usar pandas"], c: 1,
            e: "Sem a lista de rejeições não há forma de saber se faltam dados ou se o cálculo está errado. As rejeições são parte do resultado, não um detalhe interno." }
        ],
        exercicio: {
          ficheiro: "relatorio_sujo.py",
          enunciado: "Escreve `processar(linhas)`, que recebe dicionários com `produto` e `valor`. O valor pode vir com vírgula decimal e espaços à volta; o nome do produto pode vir com espaços. Devolve o par `(totais, rejeitadas)`: `totais` é um dicionário do produto para a soma arredondada a duas casas, e `rejeitadas` uma lista de `(numero_da_linha, motivo)` com `\"produto em falta\"` ou `\"valor invalido\"`. A primeira linha é a número 1.",
          inicio: String.raw`def processar(linhas):
    pass
`,
          testes: String.raw`from relatorio_sujo import processar

LINHAS = [
    {"produto": "teclado", "valor": "39,90"},
    {"produto": " teclado ", "valor": " 10.10 "},
    {"produto": "", "valor": "5"},
    {"produto": "rato", "valor": "x"},
]


def test_soma_por_produto():
    totais, _ = processar(LINHAS)
    assert totais == {"teclado": 50.0}


def test_rejeicoes_com_motivo_e_linha():
    _, rejeitadas = processar(LINHAS)
    assert rejeitadas == [(3, "produto em falta"), (4, "valor invalido")]


def test_sem_linhas():
    assert processar([]) == ({}, [])


def test_produtos_diferentes_em_separado():
    totais, _ = processar([{"produto": "rato", "valor": "1"}, {"produto": "ana", "valor": "2"}])
    assert totais == {"rato": 1.0, "ana": 2.0}


def test_valor_em_falta_tambem_e_rejeitado():
    assert processar([{"produto": "x"}]) == ({}, [(1, "valor invalido")])
`
        }
      },
      {
        id: "28.3", titulo: "Importar dados sem estragar nada", min: 18, estado: "pronta",
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
          ["code", String.raw`$ importar --ficheiro clientes.csv --dry-run
liria criar      412
liria atualizar   38
sem alterações  1150
rejeitadas         6  (ver rejeitadas.csv)

$ importar --ficheiro clientes.csv
criados 412, atualizados 38, iguais 1150, rejeitados 6, 14s`],
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
          { p: "A importação rebenta a meio e já criou metade dos registos. O que devia estar no desenho desde o início?", o: ["Um try/except à volta de tudo","Ou uma transação, ou lotes com registo de progresso para poder retomar","Correr mais depressa"], c: 1,
            e: "Um `except` que engole o erro deixa-te na mesma situação, mas sem mensagem. O que resolve é decidir de antemão se a operação é atómica ou retomável." }
        ],
        exercicio: {
          ficheiro: "importacao.py",
          enunciado: "Escreve `aplicar(existentes, novos)`, o coração de uma importação idempotente. Ambos são dicionários do id para o registo. Devolve `(resultado, resumo)`, em que `resultado` é o estado final e `resumo` conta `criados`, `atualizados` e `iguais`. Registos iguais não contam como atualização, e `existentes` não pode ser alterado.",
          inicio: String.raw`def aplicar(existentes, novos):
    pass
`,
          testes: String.raw`from importacao import aplicar

EXISTENTES = {"1": {"nome": "Ana"}, "2": {"nome": "Rui"}}
NOVOS = {"1": {"nome": "Ana"}, "2": {"nome": "Rui Silva"}, "3": {"nome": "Eva"}}


def test_resultado_completo():
    resultado, _ = aplicar(EXISTENTES, NOVOS)
    assert resultado == {"1": {"nome": "Ana"}, "2": {"nome": "Rui Silva"}, "3": {"nome": "Eva"}}


def test_contagens():
    _, resumo = aplicar(EXISTENTES, NOVOS)
    assert resumo == {"criados": 1, "atualizados": 1, "iguais": 1}


def test_nao_altera_os_existentes():
    aplicar(EXISTENTES, NOVOS)
    assert EXISTENTES == {"1": {"nome": "Ana"}, "2": {"nome": "Rui"}}


def test_correr_duas_vezes_nao_muda_nada():
    primeiro, _ = aplicar(EXISTENTES, NOVOS)
    segundo, resumo = aplicar(primeiro, NOVOS)
    assert segundo == primeiro
    assert resumo == {"criados": 0, "atualizados": 0, "iguais": 3}


def test_sem_novos():
    assert aplicar(EXISTENTES, {}) == (EXISTENTES, {"criados": 0, "atualizados": 0, "iguais": 0})


def test_importar_para_vazio():
    resultado, resumo = aplicar({}, {"9": {"nome": "Nova"}})
    assert resultado == {"9": {"nome": "Nova"}}
    assert resumo["criados"] == 1
`
        }
      },
      {
        id: "28.4", titulo: "Uma tarefa agendada que não falha em silêncio", min: 16, estado: "pronta",
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
          ["code", String.raw`# mau: só sabe processar o dia de hoje
python3 relatorio.py

# bom: reprocessa qualquer dia, incluindo o que falhou ontem
python3 relatorio.py --data 2026-03-14`],
          ["p", "Isto parece um detalhe e é a diferença entre 'a tarefa falhou ontem, corre outra vez com a data de ontem' e 'a tarefa falhou ontem, os dados desse dia perderam-se'."],
          ["h", "Não correr duas vezes"],
          ["py", String.raw`from pathlib import Path

class JaEstaACorrer(Exception):
    pass

def adquirir(caminho):
    ficheiro = Path(caminho)
    try:
        # x = criar em exclusivo: falha se já existir
        ficheiro.open("x").close()
        return True
    except FileExistsError:
        raise JaEstaACorrer(f"já existe {caminho}")

print("esta é a ideia: um ficheiro de bloqueio criado em exclusivo")
print("no fim, em finally, apaga-se")`],
          ["aviso", "Um ficheiro de bloqueio que não é apagado quando o processo é morto deixa a tarefa bloqueada para sempre. Apaga-o num `finally`, e guarda lá dentro o número do processo e a hora, para alguém poder decidir se é um bloqueio válido ou um resto de uma morte súbita. Em sistemas com várias máquinas, o bloqueio tem de viver na base de dados, não no disco local."],
          ["h", "Agendar"],
          ["code", String.raw`# cron: minuto hora dia mês dia-da-semana
# todos os dias às 03:15, com registo e alerta em caso de falha
15 3 * * * /opt/app/.venv/bin/python /opt/app/relatorio.py --data $(date -d yesterday +\%F) >> /var/log/relatorio.log 2>&1`],
          ["lista", [
            "Caminhos absolutos: o cron não tem o teu `PATH` nem a tua pasta atual.",
            "O Python do ambiente virtual, não o do sistema.",
            "`2>&1` para os erros irem para o mesmo registo.",
            "Guarda e agenda em UTC. Mostra em hora local. A mudança da hora existe e cai sempre num domingo de madrugada."
          ]],
          ["obra", "Se a tua tarefa falhar e ninguém souber durante três semanas, os dados errados já foram para relatórios, e alguém já decidiu com eles. Por isso, um trabalho agendado sem alerta de falha é considerado incompleto na revisão, mesmo que o código esteja impecável."]
        ],
        quiz: [
          { p: "A tarefa diária falhou esta noite. O que te permite recuperar sem perder dados?", o: ["Correr outra vez amanhã","Receber a data como parâmetro, para poder reprocessar o dia que falhou","Aumentar o timeout"], c: 1,
            e: "Se a tarefa só sabe processar 'hoje', o dia que falhou não volta. A data como argumento transforma uma falha num comando." }
        ],
        exercicio: {
          ficheiro: "agendamento.py",
          enunciado: "Escreve `deve_correr(ultima, agora, intervalo_min)`, que decide se uma tarefa agendada deve arrancar. Devolve `True` se nunca correu (`ultima` é `None`) ou se já passaram pelo menos `intervalo_min` minutos. Se `agora` for anterior a `ultima`, o relógio andou para trás: levanta `ValueError`.",
          inicio: String.raw`from datetime import datetime, timedelta


def deve_correr(ultima, agora, intervalo_min):
    pass
`,
          testes: String.raw`from datetime import datetime, timedelta

import pytest

from agendamento import deve_correr

ULTIMA = datetime(2026, 1, 5, 3, 0)


def test_nunca_correu():
    assert deve_correr(None, ULTIMA, 60) is True


@pytest.mark.parametrize(
    "minutos_depois, esperado",
    [(30, False), (59, False), (60, True), (61, True), (0, False)],
)
def test_intervalo(minutos_depois, esperado):
    assert deve_correr(ULTIMA, ULTIMA + timedelta(minutes=minutos_depois), 60) is esperado


def test_intervalo_zero_corre_sempre():
    assert deve_correr(ULTIMA, ULTIMA, 0) is True


def test_relogio_para_tras():
    with pytest.raises(ValueError):
        deve_correr(ULTIMA, ULTIMA - timedelta(minutes=1), 60)
`
        }
      },
      {
        id: "28.5", titulo: "Juntar dois sistemas e explicar as diferenças", min: 18, estado: "pronta",
        meta: "No fim: produzes uma reconciliação que diz quais são as diferenças e porquê, não só quantas.",
        blocos: [
          ["p", "'O site diz 1204 encomendas, o sistema de faturação diz 1198. Descobre as seis.' Este pedido vai chegar-te, e a parte difícil não é programar: é normalizar duas realidades que foram construídas por equipas diferentes."],
          ["h", "Antes de comparar, normaliza"],
          ["lista", [
            "A chave: um sistema tem `ENC-00123`, o outro tem `123`. Escreve uma função que converte os dois para a mesma forma e testa-a.",
            "Texto: espaços, maiúsculas, acentos. Nomes de clientes nunca coincidem à primeira.",
            "Datas: fusos horários e o que conta como 'dia'. Uma encomenda das 23:50 em Lisboa é do dia seguinte em UTC.",
            "Dinheiro: cêntimos ou `Decimal` dos dois lados, e a mesma regra de arredondamento (aula 9.1)."
          ]],
          ["h", "As três diferenças possíveis"],
          ["py", String.raw`def reconciliar(a, b, tolerancia=0.01):
    so_em_a = sorted(set(a) - set(b))
    so_em_b = sorted(set(b) - set(a))
    diferentes = []
    for chave in sorted(set(a) & set(b)):
        if abs(a[chave] - b[chave]) > tolerancia:
            diferentes.append((chave, a[chave], b[chave]))
    return {"so_em_a": so_em_a, "so_em_b": so_em_b, "diferentes": diferentes}

site = {"1": 10.0, "2": 20.0, "3": 5.0}
faturacao = {"1": 10.005, "2": 25.0, "4": 1.0}
print(reconciliar(site, faturacao))`],
          ["p", "Repara na tolerância. Sem ela, um cêntimo de arredondamento diferente entre os dois sistemas produz centenas de diferenças fantasma e o relatório passa a ser inútil."],
          ["h", "Entregar o resultado"],
          ["p", "Um número não é uma resposta. O que te vão pedir a seguir é sempre 'porquê', portanto agrupa as diferenças por causa provável antes de entregares."],
          ["code", String.raw`6 diferenças:
  4  só no site        todas depois das 23:00 de ontem  -> ainda não sincronizadas
  1  só na faturação   encomenda manual criada pelo apoio
  1  valor diferente   0,02 EUR  -> arredondamento do IVA linha a linha vs no total`],
          ["obra", "Ninguém quer 'há 6 diferenças'. Querem a tabela acima. Apresentar uma reconciliação com as causas agrupadas é o tipo de trabalho que faz um responsável lembrar-se do teu nome, e custa-te mais meia hora do que entregar o número."],
          ["aviso", "Uma reconciliação é uma fotografia de um instante. Se os dois sistemas estiverem a mudar enquanto comparas, geras diferenças que não existem. Fixa uma janela temporal explícita e escreve-a no relatório: 'encomendas criadas até 2026-03-14 00:00 UTC'."]
        ],
        quiz: [
          { p: "Comparaste os totais dos dois sistemas com `==` e apareceram 800 diferenças, todas de cêntimos. Qual é a causa mais provável?", o: ["Um dos sistemas está corrompido","Arredondamento e comparação de floats sem tolerância","Faltam dados"], c: 1,
            e: "Regras de arredondamento diferentes, ou floats comparados diretamente, produzem diferenças fantasma em massa. Compara em cêntimos, ou com uma tolerância explícita e escrita no relatório." }
        ],
        exercicio: {
          ficheiro: "reconciliacao.py",
          enunciado: "Escreve `reconciliar(a, b, tolerancia=0.01)`. Recebe dois dicionários do id para o valor e devolve um dicionário com `\"so_em_a\"` e `\"so_em_b\"` (listas de ids ordenadas) e `\"diferentes\"` (lista de `(id, valor_a, valor_b)` ordenada por id), considerando iguais os valores cuja diferença não ultrapassa a tolerância.",
          inicio: String.raw`def reconciliar(a, b, tolerancia=0.01):
    pass
`,
          testes: String.raw`from reconciliacao import reconciliar

A = {"1": 10.0, "2": 20.0, "3": 5.0}
B = {"1": 10.005, "2": 25.0, "4": 1.0}


def test_so_de_um_lado():
    r = reconciliar(A, B)
    assert r["so_em_a"] == ["3"]
    assert r["so_em_b"] == ["4"]


def test_diferencas_acima_da_tolerancia():
    assert reconciliar(A, B)["diferentes"] == [("2", 20.0, 25.0)]


def test_tudo_vazio():
    assert reconciliar({}, {}) == {"so_em_a": [], "so_em_b": [], "diferentes": []}


def test_tolerancia_configuravel():
    assert reconciliar({"1": 10.0}, {"1": 11.0}, tolerancia=2)["diferentes"] == []


def test_diferenca_negativa_tambem_conta():
    assert reconciliar({"1": 5.0}, {"1": 1.0})["diferentes"] == [("1", 5.0, 1.0)]


def test_listas_ordenadas():
    assert reconciliar({"b": 1.0, "a": 1.0}, {})["so_em_a"] == ["a", "b"]
`
        }
      }
  ]
});
