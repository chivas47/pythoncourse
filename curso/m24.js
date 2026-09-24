/* Módulo 24: Bases de dados. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 24, fase: 5, titulo: "Bases de dados",
  objetivo: "SQL que um programador precisa, e guardar dados sem injeções nem transações a meio.",
  licoes: [
      {
        id: "24.1", titulo: "SQL que um programador precisa", min: 20, estado: "pronta",
        meta: "No fim: escreves consultas com junções e agregações e percebes porque é que uma é lenta.",
        blocos: [
          ["p", "SQL não é uma tecnologia paralela ao Python: é metade do trabalho de backend. Dizes o que queres, não como se procura. O motor decide o caminho, e o teu trabalho é dar-lhe condições para escolher bem."],
          ["h", "O básico, por ordem de execução mental"],
          ["code", String.raw`SELECT loja, SUM(valor) AS total
FROM vendas
WHERE data >= '2026-01-01'
GROUP BY loja
HAVING SUM(valor) > 1000
ORDER BY total DESC
LIMIT 10;`],
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
          ["code", String.raw`SELECT c.nome, COUNT(e.id) AS encomendas
FROM clientes AS c
LEFT JOIN encomendas AS e ON e.cliente_id = c.id
GROUP BY c.id, c.nome
ORDER BY encomendas DESC;`],
          ["lista", [
            "`INNER JOIN`: só linhas com correspondência dos dois lados.",
            "`LEFT JOIN`: todas as da esquerda, com nulos onde não há par. É o que queres quando a pergunta é 'incluindo os que não têm nenhum'.",
            "Junta sempre por chaves indexadas, tipicamente a chave primária de um lado e a chave estrangeira do outro."
          ]],
          ["aviso", "`COUNT(*)` conta linhas, incluindo as que vieram vazias de um `LEFT JOIN`. `COUNT(coluna)` ignora nulos. Num `LEFT JOIN`, `COUNT(*)` dá 1 para clientes sem encomendas nenhumas, e alguém vai perguntar-te porque é que o relatório está errado."],
          ["h", "Índices, em duas frases"],
          ["p", "Um índice é uma estrutura ordenada que evita ler a tabela toda, tal como o `set` da aula 22.5 evita percorrer a lista. Cria índices nas colunas por que filtras e juntas com frequência. Cada índice acelera leituras e atrasa escritas, por isso não se indexa tudo."],
          ["code", String.raw`CREATE INDEX idx_encomendas_cliente ON encomendas (cliente_id);

EXPLAIN QUERY PLAN
SELECT * FROM encomendas WHERE cliente_id = 42;`],
          ["p", "`EXPLAIN` mostra o plano escolhido. Ver `SCAN TABLE` numa tabela grande é o sinal de que falta um índice; `SEARCH TABLE ... USING INDEX` é o que queres ver."],
          ["obra", "O pedido típico do primeiro mês: 'quantos clientes novos por mês no último ano, incluindo os meses a zero'. Envolve agregação, formatação de datas e um `LEFT JOIN` com uma tabela de meses. Se souberes escrever isto, já vales o ordenado."],
          ["aviso", "`SELECT *` em código de produção é dívida: traz colunas que não usas, parte quando alguém acrescenta uma coluna nova e esconde o que a consulta precisa mesmo. Escreve as colunas."]
        ],
        quiz: [
          { p: "Precisas do total de encomendas por cliente, incluindo clientes sem nenhuma. Que junção usas?", o: ["INNER JOIN","LEFT JOIN com COUNT da coluna da tabela da direita","Duas consultas separadas"], c: 1,
            e: "O `INNER JOIN` deitava fora os clientes sem encomendas, que são precisamente os que a pergunta quer ver. E conta a coluna, não `*`, para eles darem zero." }
        ],
        exercicio: {
          ficheiro: "consultas.py",
          enunciado: "Escreve `sql_total_por_loja()`, que devolve o texto de uma consulta SQL sobre a tabela `vendas` (colunas `loja` e `valor`) com duas colunas, `loja` e `total`, a soma dos valores por loja, só com as lojas cujo total passa de 100, da maior para a menor. Os testes correm a tua consulta numa base de dados SQLite em memória.",
          inicio: String.raw`def sql_total_por_loja():
    return ""
`,
          testes: String.raw`import sqlite3

import pytest

from consultas import sql_total_por_loja


@pytest.fixture
def ligacao():
    lig = sqlite3.connect(":memory:")
    lig.execute("CREATE TABLE vendas (loja TEXT, valor REAL)")
    lig.executemany(
        "INSERT INTO vendas VALUES (?, ?)",
        [("Lisboa", 120), ("Porto", 80), ("Lisboa", 45), ("Faro", 200)],
    )
    yield lig
    lig.close()


def test_so_as_lojas_acima_de_100(ligacao):
    assert len(ligacao.execute(sql_total_por_loja()).fetchall()) == 2


def test_da_maior_para_a_menor(ligacao):
    linhas = ligacao.execute(sql_total_por_loja()).fetchall()
    assert [loja for loja, _ in linhas] == ["Faro", "Lisboa"]


def test_soma_por_loja(ligacao):
    linhas = dict(ligacao.execute(sql_total_por_loja()).fetchall())
    assert linhas["Lisboa"] == pytest.approx(165)


def test_nomes_das_colunas(ligacao):
    cursor = ligacao.execute(sql_total_por_loja())
    assert [d[0] for d in cursor.description] == ["loja", "total"]
`
        }
      },
      {
        id: "24.2", titulo: "sqlite3 e SQLAlchemy", min: 18, estado: "pronta",
        meta: "No fim: falas com uma base de dados a partir de Python sem abrir uma porta a injeção de SQL.",
        blocos: [
          ["p", "O `sqlite3` vem com o Python e não precisa de servidor: a base de dados é um ficheiro. Para aprender, para testes e para muitas ferramentas internas, chega perfeitamente. O que aprenderes aqui aplica-se igual ao PostgreSQL, que é o que vais usar no emprego."],
          ["py", String.raw`import sqlite3

ligacao = sqlite3.connect(":memory:")
ligacao.execute("CREATE TABLE produtos (nome TEXT, preco REAL)")
ligacao.execute("INSERT INTO produtos VALUES (?, ?)", ("teclado", 39.9))
ligacao.executemany(
    "INSERT INTO produtos VALUES (?, ?)",
    [("rato", 12.5), ("cabo", 4.0)],
)
ligacao.commit()

for linha in ligacao.execute("SELECT nome, preco FROM produtos ORDER BY preco DESC"):
    print(linha)`],
          ["aviso", "Os pontos de interrogação não são estilo: são a diferença entre código seguro e a vulnerabilidade mais explorada da história da web. Nunca construas SQL com f-strings ou com `+`, nem com dados que 'vêm de dentro'. Nunca é nunca."],
          ["code", String.raw`# catástrofe à espera de acontecer
cursor.execute(f"SELECT * FROM utilizadores WHERE nome = '{nome}'")
# com nome = "x'; DROP TABLE utilizadores; --" perdeste a tabela

# correto
cursor.execute("SELECT * FROM utilizadores WHERE nome = ?", (nome,))`],
          ["p", "Com parâmetros, o valor nunca é interpretado como SQL: é sempre tratado como dado, por mais aspas que tenha. O motor recebe a consulta e os valores em separado."],
          ["h", "Transações"],
          ["p", "Sem `commit`, as alterações não ficam. Com `with ligacao:` o commit é automático no fim e o rollback é automático se houver exceção: ou tudo acontece, ou nada acontece."],
          ["py", String.raw`import sqlite3

ligacao = sqlite3.connect(":memory:")
ligacao.execute("CREATE TABLE contas (nome TEXT, saldo REAL)")
ligacao.executemany("INSERT INTO contas VALUES (?, ?)", [("ana", 100), ("rui", 0)])
ligacao.commit()

try:
    with ligacao:
        ligacao.execute("UPDATE contas SET saldo = saldo - 50 WHERE nome = 'ana'")
        raise RuntimeError("falha a meio da transferência")
except RuntimeError as e:
    print("rollback:", e)

print(ligacao.execute("SELECT nome, saldo FROM contas").fetchall())`],
          ["h", "Do driver ao ORM"],
          ["p", "Um ORM mapeia tabelas para classes. Poupa código repetitivo, dá-te tipos e migrações, e no dia em que precisares de SQL a sério deixa-te escrever SQL a sério. O SQLAlchemy é o padrão em Python."],
          ["code", String.raw`from sqlalchemy import create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Base(DeclarativeBase):
    pass

class Produto(Base):
    __tablename__ = "produtos"
    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str]
    preco: Mapped[float]

motor = create_engine("sqlite:///loja.db")
Base.metadata.create_all(motor)

with Session(motor) as sessao:
    sessao.add(Produto(nome="teclado", preco=39.9))
    sessao.commit()
    caros = sessao.scalars(select(Produto).where(Produto.preco > 20)).all()
    print([p.nome for p in caros])`],
          ["aviso", "O problema clássico de qualquer ORM chama-se N mais 1: carregas cem encomendas e depois, dentro de um ciclo, acedes ao cliente de cada uma. São cento e uma consultas em vez de uma. Resolve-se a dizer ao ORM para carregar tudo de uma vez, com `joinedload` ou `selectinload`."],
          ["obra", "Saber SQL e saber ORM não é a mesma competência, e as equipas querem as duas. Numa entrevista de backend é normal pedirem para escrever a consulta em SQL e depois explicar como o ORM a geraria. Se só sabes o ORM, ficas preso no dia em que a consulta for lenta."]
        ],
        quiz: [
          { p: "Porque é que `f\"... WHERE nome = '{nome}'\"` é inaceitável mesmo quando o valor vem da tua própria base de dados?", o: ["Por estilo","Porque qualquer valor com aspas altera a consulta, e dados 'de dentro' vieram de fora um dia","Porque é mais lento"], c: 1,
            e: "Injeção de segunda ordem: o valor foi gravado por um utilizador há seis meses e explode agora. Parâmetros sempre, sem exceções." }
        ],
        exercicio: {
          ficheiro: "gravar_produtos.py",
          enunciado: "Escreve `guardar(ligacao, produtos)`, que insere na tabela `produtos` (colunas `nome` e `preco`) uma lista de tuplos, confirma a transação e devolve quantas linhas inseriu. Usa parâmetros: um dos nomes de teste é uma tentativa de injeção de SQL e tem de ficar guardado tal e qual.",
          inicio: String.raw`def guardar(ligacao, produtos):
    pass
`,
          testes: String.raw`import sqlite3

import pytest

from gravar_produtos import guardar

ATAQUE = "rato'); DROP TABLE produtos; --"


@pytest.fixture
def ligacao(tmp_path):
    lig = sqlite3.connect(tmp_path / "loja.db")
    lig.execute("CREATE TABLE produtos (nome TEXT, preco REAL)")
    lig.commit()
    yield lig
    lig.close()


def test_devolve_o_numero_de_linhas(ligacao):
    assert guardar(ligacao, [("teclado", 39.9), (ATAQUE, 12.5)]) == 2


def test_guarda_o_texto_tal_e_qual(ligacao):
    guardar(ligacao, [("teclado", 39.9), (ATAQUE, 12.5)])
    nomes = [linha[0] for linha in ligacao.execute("SELECT nome FROM produtos")]
    assert ATAQUE in nomes


def test_confirma_a_transacao(ligacao, tmp_path):
    guardar(ligacao, [("teclado", 39.9)])
    outra = sqlite3.connect(tmp_path / "loja.db")
    assert outra.execute("SELECT COUNT(*) FROM produtos").fetchone()[0] == 1
    outra.close()


def test_lista_vazia_insere_zero(ligacao):
    assert guardar(ligacao, []) == 0
`
        }
      }
  ]
});
