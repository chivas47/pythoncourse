/* Módulo 12: Ficheiros e dados. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 12, fase: 3, titulo: "Ficheiros e dados",
  objetivo: "Ler e escrever ficheiros de texto, CSV e JSON, e registar o que o programa faz.",
  licoes: [
      {
        id: "12.1", titulo: "Ler e escrever ficheiros de texto", min: 15, estado: "pronta",
        meta: "No fim: abres ficheiros com with, lês tudo ou linha a linha, escreves e acrescentas, sempre com a codificação explícita.",
        blocos: [
          ["p", "Até aqui os dados dos teus programas nasciam e morriam com eles. Um ficheiro é a forma mais simples de os guardar entre execuções e de receber dados de outros programas."],
          ["code", String.raw`with open("notas.txt", "w", encoding="utf-8") as f:
    f.write("Ana;17\n")
    f.write("Rui;12\n")

with open("notas.txt", encoding="utf-8") as f:
    conteudo = f.read()
print(conteudo)`],
          ["lista", [
            "`open(caminho, modo, encoding=...)` abre o ficheiro e devolve um objeto para ler ou escrever.",
            "O modo `\"r\"` lê e é o que se usa se não disseres nada. `\"w\"` escreve e apaga o que lá estava. `\"a\"` acrescenta no fim.",
            "`write` não muda de linha sozinho: o `\\n` vai à mão.",
            "O caminho é relativo à pasta onde estás no terminal, não à pasta do ficheiro `.py`. A próxima aula resolve isso."
          ]],
          ["h", "Abrir com with"],
          ["p", "`with` é o gestor de contexto: garante que o ficheiro é fechado, mesmo que rebente uma exceção lá dentro. Ficheiro aberto sem `with` é um descritor perdido, e num serviço a correr durante dias isso acaba em 'too many open files'."],
          ["aviso", "`encoding=\"utf-8\"` sempre, na leitura e na escrita. Sem ele, Python usa a codificação do sistema, que difere entre o teu portátil e o servidor. É assim que um relatório com acentos chega ao cliente cheio de caracteres estranhos."],
          ["h", "Ler linha a linha"],
          ["code", String.raw`with open("notas.txt", encoding="utf-8") as f:
    for linha in f:
        nome, nota = linha.rstrip("\n").split(";")
        print(nome, int(nota))`],
          ["p", "Cada linha vem com o `\\n` do fim agarrado. `rstrip(\"\\n\")` tira-o, ou `strip()` se também quiseres tirar espaços. Percorrer o ficheiro com `for` lê uma linha de cada vez, o que funciona com ficheiros de qualquer tamanho; `f.read()` traz tudo para a memória de uma vez."],
          ["aviso", "O modo `\"w\"` apaga o ficheiro no momento em que o abre, antes de escreveres uma única linha. Abrir para escrita o ficheiro que ainda estás a ler, ou o original quando querias uma cópia, perde os dados sem aviso."],
          ["obra", "Muitos programas de trabalho começam e acabam num ficheiro: exportações de outro sistema, relatórios para enviar, registos para analisar. Nos testes nunca se escreve na pasta do projeto: o pytest dá-te uma pasta temporária nova para cada teste, o `tmp_path`, que vais ver nos testes deste exercício."]
        ],
        quiz: [
          { p: "Porque é que `with open(...)` é preferível a `f = open(...)` seguido de `f.close()`?", o: ["É mais curto","Fecha o ficheiro mesmo quando rebenta uma exceção pelo meio","É mais rápido"], c: 1,
            e: "Com o `close()` à mão, uma exceção salta por cima dele. Em serviços longos isso esgota descritores e corrompe escritas que ficaram em buffer." }
        ],
        exercicio: {
          ficheiro: "ficheiros_texto.py",
          enunciado: "Escreve três funções que recebem um caminho. `guardar_linhas(caminho, linhas)` escreve cada texto da lista numa linha, substituindo o que lá estava. `acrescentar_linha(caminho, linha)` acrescenta uma linha no fim, criando o ficheiro se não existir. `contar_linhas(caminho)` devolve o número de linhas com algum conteúdo (as que só têm espaços não contam). Usa sempre `encoding=\"utf-8\"`.",
          inicio: String.raw`def guardar_linhas(caminho, linhas):
    pass


def acrescentar_linha(caminho, linha):
    pass


def contar_linhas(caminho):
    pass
`,
          testes: String.raw`from ficheiros_texto import acrescentar_linha, contar_linhas, guardar_linhas


def test_guardar_escreve_uma_linha_por_texto(tmp_path):
    ficheiro = tmp_path / "compras.txt"
    guardar_linhas(ficheiro, ["pão", "leite"])
    assert ficheiro.read_text(encoding="utf-8") == "pão\nleite\n"


def test_guardar_substitui_o_conteudo(tmp_path):
    ficheiro = tmp_path / "compras.txt"
    guardar_linhas(ficheiro, ["pão", "leite"])
    guardar_linhas(ficheiro, ["ovos"])
    assert ficheiro.read_text(encoding="utf-8") == "ovos\n"


def test_acrescentar_no_fim(tmp_path):
    ficheiro = tmp_path / "registo.txt"
    guardar_linhas(ficheiro, ["primeira"])
    acrescentar_linha(ficheiro, "segunda")
    assert ficheiro.read_text(encoding="utf-8") == "primeira\nsegunda\n"


def test_acrescentar_cria_o_ficheiro(tmp_path):
    ficheiro = tmp_path / "novo.txt"
    acrescentar_linha(ficheiro, "olá")
    assert ficheiro.read_text(encoding="utf-8") == "olá\n"


def test_contar_ignora_linhas_vazias(tmp_path):
    ficheiro = tmp_path / "dados.txt"
    ficheiro.write_text("a\n\n   \nb\nc\n", encoding="utf-8")
    assert contar_linhas(ficheiro) == 3
`
        }
      },
      {
        id: "12.2", titulo: "Caminhos com pathlib", min: 13, estado: "pronta",
        meta: "No fim: compões e desmontas caminhos com Path, encontras ficheiros numa pasta e escreves caminhos que funcionam em qualquer sistema e a partir de qualquer pasta.",
        blocos: [
          ["p", "Caminhos não são texto. Juntar pastas com `+` e barras à mão parte no Windows, parte com espaços e parte quando falta uma barra. `pathlib` trata disso e é a forma moderna."],
          ["py", String.raw`from pathlib import Path

ficheiro = Path("dados") / "2026" / "vendas.csv"
print(ficheiro)
print(ficheiro.name, ficheiro.stem, ficheiro.suffix)
print(ficheiro.parent)
print(ficheiro.with_suffix(".json"))`],
          ["p", "O operador `/` compõe caminhos. `name` é o ficheiro, `stem` é o nome sem extensão, `suffix` é a extensão, `parent` é a pasta. Nada disto toca no disco: são só cálculos sobre o caminho."],
          ["h", "Atalhos do pathlib"],
          ["py", String.raw`from pathlib import Path
import tempfile

pasta = Path(tempfile.mkdtemp())
ficheiro = pasta / "config.txt"

ficheiro.write_text("modo=producao\n", encoding="utf-8")
print(ficheiro.read_text(encoding="utf-8"))
print(ficheiro.exists(), ficheiro.stat().st_size)

(pasta / "saida").mkdir(parents=True, exist_ok=True)
print([p.name for p in pasta.iterdir()])`],
          ["p", "`mkdir(parents=True, exist_ok=True)` cria a árvore toda e não se queixa se já existir. É a linha que se escreve antes de gravar seja o que for."],
          ["h", "Caminhos a partir do próprio ficheiro"],
          ["code", String.raw`from pathlib import Path

PASTA_DO_SCRIPT = Path(__file__).parent
dados = PASTA_DO_SCRIPT / "dados" / "vendas.csv"`],
          ["p", "`__file__` é o caminho do ficheiro `.py` que está a correr. Construir caminhos a partir dele faz o programa encontrar os seus ficheiros seja qual for a pasta onde a pessoa estava quando o correu. Os testes que tens recebido fazem exatamente isto."],
          ["h", "Encontrar ficheiros"],
          ["code", String.raw`for csv in sorted(Path("dados").glob("*.csv")):
    print(csv.name)

for py in Path(".").rglob("*.py"):   # em todas as subpastas
    print(py)`],
          ["obra", "Caminhos absolutos escritos no código são a razão pela qual o script do colega não corre na tua máquina. Constrói a partir de `Path(__file__).parent` ou de uma variável de ambiente, nunca a partir de `C:/Users/joao/Desktop`."]
        ],
        quiz: [
          { p: "O teu script abre `Path(\"dados/vendas.csv\")` e só funciona quando o corres de dentro da pasta dele. Qual é a correção?", o: ["Pedir a quem corre para mudar de pasta","Construir o caminho a partir de `Path(__file__).parent`","Escrever o caminho absoluto do teu computador"], c: 1,
            e: "Um caminho relativo é relativo à pasta atual do terminal. A partir de `__file__`, é relativo ao próprio script, esteja quem estiver onde estiver." }
        ],
        exercicio: {
          ficheiro: "saidas.py",
          enunciado: "Escreve duas funções com `pathlib`. `caminho_de_saida(entrada)` recebe um caminho como `\"dados/2026/vendas.csv\"` e devolve um `Path` para `dados/2026/saida/vendas.json`: mesma pasta, subpasta `saida`, extensão trocada para `.json`. `listar_csv(pasta)` devolve os nomes dos ficheiros `.csv` dessa pasta (não das subpastas), por ordem alfabética.",
          inicio: String.raw`from pathlib import Path


def caminho_de_saida(entrada):
    pass


def listar_csv(pasta):
    pass
`,
          testes: String.raw`from pathlib import Path

from saidas import caminho_de_saida, listar_csv


def test_devolve_um_path():
    assert isinstance(caminho_de_saida("dados/2026/vendas.csv"), Path)


def test_caminho_completo():
    assert caminho_de_saida("dados/2026/vendas.csv") == Path("dados/2026/saida/vendas.json")


def test_ficheiro_sem_pasta():
    assert caminho_de_saida("vendas.csv") == Path("saida/vendas.json")


def test_outra_extensao():
    assert caminho_de_saida("a/b/relatorio.txt") == Path("a/b/saida/relatorio.json")


def test_listar_csv(tmp_path):
    for nome in ["b.csv", "a.csv", "notas.txt"]:
        (tmp_path / nome).write_text("x", encoding="utf-8")
    (tmp_path / "sub").mkdir()
    (tmp_path / "sub" / "c.csv").write_text("x", encoding="utf-8")
    assert listar_csv(tmp_path) == ["a.csv", "b.csv"]


def test_pasta_sem_csv(tmp_path):
    assert listar_csv(tmp_path) == []
`
        }
      },
      {
        id: "12.3", titulo: "CSV: ler, limpar e escrever", min: 16, estado: "pronta",
        meta: "No fim: lês CSV como dicionários, lidas com linhas sujas sem as deixar cair em silêncio e escreves o resultado noutro CSV.",
        blocos: [
          ["p", "CSV é a moeda de troca do mundo real: sai de qualquer folha de cálculo e de qualquer sistema antigo. JSON é a moeda de troca entre programas. Vais passar mais tempo a converter entre os dois do que gostarias."],
          ["h", "Ler CSV como dicionários"],
          ["py", String.raw`import csv
import io

texto = "produto,categoria,valor\nteclado,perifericos,39.90\nrato,perifericos,12.50\nmonitor,ecras,180.00\n"

for linha in csv.DictReader(io.StringIO(texto)):
    print(linha["produto"], linha["valor"])`],
          ["p", "`DictReader` usa a primeira linha como cabeçalho e devolve um dicionário por linha. Num ficheiro real trocas o `io.StringIO` por `open(caminho, encoding=\"utf-8\", newline=\"\")`."],
          ["aviso", "Tudo o que sai de um CSV é texto. `linha[\"valor\"]` é a string '39.90', não o número. Somar sem converter dá uma concatenação silenciosa ou um `TypeError`. E o `newline=\"\"` no `open` não é decorativo: sem ele aparecem linhas em branco no Windows."],
          ["h", "Ficheiros sujos, que é o caso normal"],
          ["py", String.raw`import csv
import io

texto = "produto,categoria,valor\nteclado, perifericos ,39.90\nsem preco,ecras,\nrato,perifericos,12.50\n"

totais = {}
for linha in csv.DictReader(io.StringIO(texto)):
    categoria = linha["categoria"].strip()
    bruto = (linha["valor"] or "").strip()
    if not bruto:
        print("linha sem valor, ignorada:", linha["produto"])
        continue
    totais[categoria] = totais.get(categoria, 0) + float(bruto)

print(totais)`],
          ["p", "Espaços a mais, células vazias, vírgulas dentro do texto, cabeçalhos com maiúsculas diferentes. Escreve o código a contar com isso desde o início, e regista o que ignoraste em vez de o deixar cair em silêncio."],
          ["h", "Escrever CSV"],
          ["code", String.raw`import csv

with open("relatorio.csv", "w", encoding="utf-8", newline="") as f:
    escritor = csv.DictWriter(f, fieldnames=["categoria", "total"])
    escritor.writeheader()
    for categoria, total in sorted(totais.items()):
        escritor.writerow({"categoria": categoria, "total": f"{total:.2f}"})`],
          ["obra", "O pedido mais comum a um júnior: 'pega neste export de 40 mil linhas, agrega por mês e manda-me um resumo'. Faz-se com `csv.DictReader`, um dicionário de acumulação e `sorted`. Se conseguires fazer isto sozinho, já estás a produzir valor no primeiro mês."]
        ],
        quiz: [
          { p: "Somas a coluna 'valor' de um CSV e o total dá uma string gigante em vez de um número. O que aconteceu?", o: ["O ficheiro está corrompido","Os valores vieram como texto e o `+` concatenou","Falta o encoding"], c: 1,
            e: "CSV não tem tipos. Converte com `float()` ou `int()` à entrada, e trata as células vazias antes de converter." }
        ],
        exercicio: {
          ficheiro: "categorias.py",
          enunciado: "Escreve duas funções. `total_por_categoria(texto)` recebe o conteúdo de um CSV com as colunas `produto`, `categoria` e `valor` e devolve um dicionário com a soma por categoria, ignorando linhas sem valor e limpando os espaços à volta da categoria. `escrever_totais(caminho, totais)` escreve um CSV com o cabeçalho `categoria,total`, uma linha por categoria por ordem alfabética e o total com duas casas decimais.",
          inicio: String.raw`import csv
import io


def total_por_categoria(texto):
    pass


def escrever_totais(caminho, totais):
    pass
`,
          testes: String.raw`import pytest

from categorias import escrever_totais, total_por_categoria

CSV = "produto,categoria,valor\nteclado, perifericos ,39.90\nsem preco,ecras,\nrato,perifericos,12.50\nmonitor,ecras,180.00\n"


def test_duas_categorias():
    assert sorted(total_por_categoria(CSV)) == ["ecras", "perifericos"]


def test_soma_dos_perifericos():
    assert total_por_categoria(CSV)["perifericos"] == pytest.approx(52.40)


def test_linha_sem_valor_ignorada():
    assert total_por_categoria(CSV)["ecras"] == pytest.approx(180.00)


def test_so_cabecalho():
    assert total_por_categoria("produto,categoria,valor\n") == {}


def test_escrever_totais(tmp_path):
    ficheiro = tmp_path / "totais.csv"
    escrever_totais(ficheiro, {"perifericos": 52.4, "ecras": 180})
    linhas = ficheiro.read_text(encoding="utf-8").splitlines()
    assert linhas == ["categoria,total", "ecras,180.00", "perifericos,52.40"]
`
        }
      },
      {
        id: "12.4", titulo: "JSON: guardar e ler estruturas", min: 14, estado: "pronta",
        meta: "No fim: convertes dicionários e listas em JSON e de volta, lês ficheiros de configuração com valores por omissão e lidas com JSON inválido.",
        blocos: [
          ["p", "CSV serve para tabelas. Quando os dados têm estrutura, com listas dentro de dicionários dentro de listas, o formato é JSON. É o que os serviços web trocam entre si e o que muitos programas usam para configuração."],
          ["py", String.raw`import json

texto = '{"nome": "Ana", "notas": [17, 14], "ativo": true}'
dados = json.loads(texto)
print(dados["notas"], type(dados["ativo"]))

de_volta = json.dumps(dados, ensure_ascii=False, indent=2)
print(de_volta)`],
          ["p", "`loads` e `dumps` trabalham com texto, `load` e `dump` com ficheiros abertos. O `ensure_ascii=False` guarda acentos como acentos, e o `indent=2` deixa o ficheiro legível para humanos e para o git."],
          ["aviso", "`json.dumps` rebenta com objetos que não sejam tipos básicos: `datetime`, `Decimal`, `set`. Converte antes, tipicamente para texto ISO no caso das datas, ou passa `default=str` se for mesmo só para registo."],
          ["h", "Ficheiros"],
          ["code", String.raw`import json

with open("config.json", "w", encoding="utf-8") as f:
    json.dump({"moeda": "EUR", "casas": 2}, f, ensure_ascii=False, indent=2)

with open("config.json", encoding="utf-8") as f:
    config = json.load(f)`],
          ["h", "O que o JSON sabe guardar"],
          ["lista", [
            "Dicionários com chaves de texto, listas, texto, números, `true`, `false` e `null`.",
            "Um tuplo volta como lista. Uma chave numérica volta como texto: `{1: \"a\"}` volta `{\"1\": \"a\"}`.",
            "Datas, `Decimal` e conjuntos não entram sem conversão."
          ]],
          ["h", "Quando o ficheiro está estragado"],
          ["py", String.raw`import json

try:
    json.loads('{"moeda": "EUR",}')
except json.JSONDecodeError as erro:
    print("JSON inválido:", erro)`],
          ["p", "Uma vírgula a mais basta para o ficheiro não ser JSON. `JSONDecodeError` diz a linha e a coluna. Num ficheiro de configuração, o certo é parar com uma mensagem que diga que ficheiro está mal, não continuar com valores inventados."],
          ["obra", "O padrão de configuração que vais ver em muitos projetos: valores por omissão no código, e um ficheiro que só tem o que muda. Assim o ficheiro fica curto, e acrescentar uma opção nova não obriga toda a gente a atualizar o seu."]
        ],
        quiz: [
          { p: "Guardas `{\"pontos\": (3, 4)}` em JSON e voltas a ler. O que recebes?", o: ["{\"pontos\": (3, 4)}","{\"pontos\": [3, 4]}","Dá erro ao guardar"], c: 1,
            e: "O JSON só tem listas, por isso o tuplo volta como lista." }
        ],
        exercicio: {
          ficheiro: "configuracao.py",
          enunciado: "Escreve duas funções. `carregar_config(caminho, omissoes)` devolve um dicionário novo com os valores por omissão atualizados com o que está no ficheiro JSON; se o ficheiro não existir, devolve uma cópia das omissões; se o JSON for inválido, levanta `ValueError` com uma mensagem que inclui o nome do ficheiro. `guardar_config(caminho, config)` escreve o JSON com `indent=2`, as chaves ordenadas, acentos tal e qual e uma mudança de linha no fim.",
          inicio: String.raw`import json
from pathlib import Path


def carregar_config(caminho, omissoes):
    pass


def guardar_config(caminho, config):
    pass
`,
          testes: String.raw`import json

import pytest

from configuracao import carregar_config, guardar_config

OMISSOES = {"moeda": "EUR", "casas": 2, "idioma": "pt"}


def test_ficheiro_inexistente_da_as_omissoes(tmp_path):
    assert carregar_config(tmp_path / "nao_existe.json", OMISSOES) == OMISSOES


def test_devolve_uma_copia(tmp_path):
    config = carregar_config(tmp_path / "nao_existe.json", OMISSOES)
    config["moeda"] = "USD"
    assert OMISSOES["moeda"] == "EUR"


def test_ficheiro_sobrepoe_as_omissoes(tmp_path):
    ficheiro = tmp_path / "config.json"
    ficheiro.write_text('{"casas": 3}', encoding="utf-8")
    assert carregar_config(ficheiro, OMISSOES) == {"moeda": "EUR", "casas": 3, "idioma": "pt"}


def test_json_invalido_nomeia_o_ficheiro(tmp_path):
    ficheiro = tmp_path / "estragado.json"
    ficheiro.write_text('{"casas": 3,}', encoding="utf-8")
    with pytest.raises(ValueError, match="estragado.json"):
        carregar_config(ficheiro, OMISSOES)


def test_guardar_e_voltar_a_ler(tmp_path):
    ficheiro = tmp_path / "config.json"
    guardar_config(ficheiro, {"nome": "Lisboa", "casas": 2})
    assert json.loads(ficheiro.read_text(encoding="utf-8")) == {"nome": "Lisboa", "casas": 2}


def test_formato_legivel(tmp_path):
    ficheiro = tmp_path / "config.json"
    guardar_config(ficheiro, {"zona": "Évora", "casas": 2})
    assert ficheiro.read_text(encoding="utf-8") == '{\n  "casas": 2,\n  "zona": "Évora"\n}\n'
`
        }
      },
      {
        id: "12.5", titulo: "Registo com logging", min: 12, estado: "pronta",
        meta: "No fim: substituis prints por registos com níveis que se conseguem ligar e desligar.",
        blocos: [
          ["p", "`print` serve para falar com um humano que está a olhar para o ecrã. Num serviço não há ninguém a olhar. `logging` escreve com hora, nível e origem, pode ir para ficheiro, e desliga-se sem apagar linhas de código."],
          ["py", String.raw`import logging

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
logger = logging.getLogger("relatorio")

logger.debug("detalhe que só interessa a depurar")
logger.info("processadas 120 linhas")
logger.warning("3 linhas sem valor, ignoradas")
logger.error("não consegui gravar o relatório")`],
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
          ["code", String.raw`# vendas/importador.py
import logging

logger = logging.getLogger(__name__)

def importar(caminho):
    logger.info("a importar %s", caminho)`],
          ["aviso", "Passa os valores como argumentos, `logger.info(\"a importar %s\", caminho)`, e não com f-string. Assim a formatação só acontece se a mensagem for mesmo emitida. É uma das poucas exceções à regra de usar sempre f-strings."],
          ["h", "Registar exceções"],
          ["py", String.raw`import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("contas")

try:
    1 / 0
except ZeroDivisionError:
    logger.exception("falha a calcular a média")`],
          ["p", "`logger.exception` só se usa dentro de um `except` e escreve o traceback completo por baixo da mensagem. É a diferença entre um registo que resolve o problema e um que só diz que houve problema."],
          ["obra", "Numa empresa, os registos vão para um sistema de pesquisa e alguém constrói alertas em cima deles. Por isso o texto deve ser estável e os dados variáveis devem ir em campos: 'importadas %d linhas de %s' é pesquisável, 'correu tudo bem :)' não é."],
          ["aviso", "Nunca registes palavras-passe, tokens, números de cartão ou dados pessoais completos. Registo é para toda a equipa e fica guardado durante meses. Isto não é só boa prática, é o RGPD."]
        ],
        quiz: [
          { p: "Porque é que se evita `logger.info(f\"utilizador {u}\")` a favor de `logger.info(\"utilizador %s\", u)`?", o: ["Por estilo antigo","Porque a f-string é construída mesmo quando o nível desliga a mensagem","Porque f-strings não suportam acentos"], c: 1,
            e: "Com milhares de chamadas por segundo em nível DEBUG desligado, formatar texto que ninguém vai ler custa tempo real de CPU." }
        ],
        exercicio: {
          ficheiro: "registo.py",
          enunciado: "Escreve `processar(valores)`, que soma os valores positivos e devolve o total. Cada valor negativo é ignorado e registado com nível WARNING, através do logger `logging.getLogger(\"relatorio\")`, com uma mensagem que inclui o valor. Nada mais é registado a WARNING ou acima.",
          inicio: String.raw`import logging

logger = logging.getLogger("relatorio")


def processar(valores):
    pass
`,
          testes: String.raw`import logging

from registo import processar


def avisos(caplog):
    return [r for r in caplog.records if r.name == "relatorio" and r.levelno >= logging.WARNING]


def test_soma_so_os_positivos():
    assert processar([10, -5, 3]) == 13


def test_regista_um_aviso_por_negativo(caplog):
    processar([10, -5, 3, -1])
    assert len(avisos(caplog)) == 2


def test_a_mensagem_inclui_o_valor(caplog):
    processar([10, -5])
    assert "-5" in avisos(caplog)[0].getMessage()


def test_sem_negativos_nao_ha_avisos(caplog):
    processar([1, 2])
    assert avisos(caplog) == []
`
        }
      }
  ]
});
