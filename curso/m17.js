/* Módulo 17: A biblioteca padrão do dia a dia. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 17, fase: 3, titulo: "A biblioteca padrão do dia a dia",
  objetivo: "Não reinventar o que o Python já traz: coleções especializadas, datas e expressões regulares.",
  licoes: [
      {
        id: "17.1", titulo: "collections: Counter, defaultdict, deque e namedtuple", min: 15, estado: "pronta",
        meta: "No fim: contas com Counter, agrupas com defaultdict, guardas os últimos n com deque e dás nomes a tuplos com namedtuple.",
        blocos: [
          ["p", "Contar, agrupar e guardar os últimos elementos são tarefas tão comuns que o Python tem estruturas próprias para elas, no módulo `collections`. Já escreveste as três à mão; agora vês as versões que se usam no trabalho."],
          ["h", "Counter: contar"],
          ["py", String.raw`from collections import Counter

votos = ["azul", "verde", "azul", "vermelho", "azul", "verde"]
c = Counter(votos)
print(c)
print(c["azul"], c["amarelo"])
print(c.most_common(2))
c.update(["verde", "verde"])
print(c.most_common(1))`],
          ["p", "Um `Counter` é um dicionário que conta. Uma chave que não existe vale 0, sem `KeyError`. `most_common(n)` dá os n mais frequentes, e nos empates respeita a ordem de chegada."],
          ["h", "defaultdict: agrupar sem o if"],
          ["py", String.raw`from collections import defaultdict

por_turma = defaultdict(list)
for nome, turma in [("Ana", "7A"), ("Rui", "7B"), ("Bea", "7A")]:
    por_turma[turma].append(nome)
print(dict(por_turma))`],
          ["p", "Quando pedes uma chave que não existe, o `defaultdict` cria-a com o valor que a função dá: `list()` dá uma lista vazia, `int()` dá 0. É o padrão de agrupar da aula 7.2 sem o `if`."],
          ["h", "deque: fila com duas pontas"],
          ["py", String.raw`from collections import deque

ultimos = deque(maxlen=3)
for n in range(1, 8):
    ultimos.append(n)
print(list(ultimos))

fila = deque(["Ana", "Rui"])
fila.append("Bea")
print(fila.popleft(), list(fila))`],
          ["p", "Uma `deque` acrescenta e tira nas duas pontas em tempo constante; uma lista demora mais a tirar do início, porque tem de mexer em todos os outros. Com `maxlen`, as mais antigas saem sozinhas: é a forma de guardar 'os últimos n'."],
          ["h", "namedtuple: tuplos com nomes"],
          ["py", String.raw`from collections import namedtuple

Ponto = namedtuple("Ponto", "x y")
p = Ponto(3, 4)
print(p.x, p[1], p)
x, y = p`],
          ["p", "Um `namedtuple` é um tuplo, imutável e desempacotável, cujos campos também têm nome. Para mais do que isso, uma dataclass (aula 14.3) costuma ser melhor escolha."],
          ["aviso", "Um `defaultdict` cria a chave quando a lês, não só quando escreves: `if por_turma[\"9Z\"]:` acrescenta a turma `9Z`, vazia. Para perguntar se existe, usa `in`. E converte-o com `dict(...)` antes de o devolver ou guardar em JSON, para quem o recebe não herdar o comportamento."],
          ["obra", "Em revisão de código, um ciclo de quinze linhas a contar ou a agrupar recebe o comentário 'isto é um Counter' ou 'isto é um defaultdict'. Não é pedantismo: menos código escrito à mão é menos sítios onde esconder um erro de contagem."]
        ],
        quiz: [
          { p: "Quanto vale `Counter(\"banana\")[\"z\"]`?", o: ["None","0","KeyError"], c: 1,
            e: "Um Counter responde 0 para o que nunca viu." }
        ],
        exercicio: {
          ficheiro: "colecoes.py",
          enunciado: "Escreve três funções e um tipo. `mais_comuns(palavras, n)` devolve a lista dos n pares `(palavra, contagem)` mais frequentes, com um `Counter`. `agrupar_por_tamanho(palavras)` devolve um `dict` normal do comprimento para a lista de palavras com esse comprimento, pela ordem original. `ultimos(iteravel, n)` devolve a lista dos últimos n elementos, com uma `deque` (n igual a 0 dá lista vazia). E `Ponto`, um `namedtuple` com os campos `x` e `y`.",
          inicio: String.raw`from collections import Counter, defaultdict, deque, namedtuple


def mais_comuns(palavras, n):
    pass


def agrupar_por_tamanho(palavras):
    pass


def ultimos(iteravel, n):
    pass
`,
          testes: String.raw`from colecoes import Ponto, agrupar_por_tamanho, mais_comuns, ultimos


def test_mais_comuns():
    palavras = "o rato roeu o queijo do rato".split()
    assert mais_comuns(palavras, 2) == [("o", 2), ("rato", 2)]


def test_mais_comuns_de_nada():
    assert mais_comuns([], 3) == []


def test_agrupar_por_tamanho():
    assert agrupar_por_tamanho(["sol", "mar", "ilha", "a"]) == {3: ["sol", "mar"], 4: ["ilha"], 1: ["a"]}


def test_agrupar_devolve_dict_normal():
    assert type(agrupar_por_tamanho(["a"])) is dict


def test_ultimos():
    assert ultimos(range(10), 3) == [7, 8, 9]


def test_ultimos_quando_ha_menos():
    assert ultimos("ab", 5) == ["a", "b"]


def test_ultimos_zero():
    assert ultimos([1, 2], 0) == []


def test_ponto():
    p = Ponto(3, 4)
    assert (p.x, p.y) == (3, 4)
    x, y = p
    assert x == 3
`
        }
      },
      {
        id: "17.2", titulo: "Datas e horas sem surpresas", min: 17, estado: "pronta",
        meta: "No fim: fazes contas com datas, convertes de e para texto, e sabes a diferença entre uma hora com fuso e uma sem.",
        blocos: [
          ["p", "Datas parecem simples até ao primeiro fim de mês, ao primeiro ano bissexto ou à primeira mudança de hora. O módulo `datetime` trata disso tudo, desde que não faças as contas à mão."],
          ["py", String.raw`from datetime import date, datetime, timedelta

hoje = date(2026, 9, 24)
print(hoje, hoje.year, hoje.weekday())
print(hoje + timedelta(days=10))
print(date(2026, 12, 25) - hoje)
print((date(2026, 12, 25) - hoje).days)`],
          ["p", "`date` é um dia, `datetime` é um dia com hora, `timedelta` é uma duração. Somar um `timedelta` a uma data dá outra data, com os fins de mês tratados; subtrair duas datas dá um `timedelta`, e o `.days` diz quantos dias são."],
          ["h", "Texto e datas"],
          ["py", String.raw`from datetime import date, datetime

print(date.fromisoformat("2026-03-01"))
print(datetime.fromisoformat("2026-03-01T14:30:00"))
d = date(2026, 3, 1)
print(d.isoformat(), d.strftime("%d/%m/%Y"))
print(datetime.strptime("01/03/2026 14:30", "%d/%m/%Y %H:%M"))`],
          ["p", "Para guardar e trocar datas entre sistemas usa-se o formato ISO, `2026-03-01`, que se ordena bem como texto e ninguém lê ao contrário. `strftime` formata para mostrar a pessoas; `strptime` lê formatos de outros sistemas, com os mesmos códigos: `%d` dia, `%m` mês, `%Y` ano, `%H` e `%M` hora e minuto."],
          ["h", "Fusos horários"],
          ["py", String.raw`from datetime import datetime, timedelta, timezone

sem_fuso = datetime(2026, 3, 29, 12, 0)
em_utc = datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc)
lisboa_verao = timezone(timedelta(hours=1))
print(sem_fuso.tzinfo, em_utc.tzinfo)
print(em_utc.astimezone(lisboa_verao))`],
          ["p", "Uma hora sem fuso, *naive*, é ambígua: meio-dia em Lisboa ou em Tóquio? Uma com fuso, *aware*, é um instante exato. A regra das equipas: guarda sempre em UTC, com fuso, e converte para a hora local só para mostrar. Para fusos com nome e mudança de hora, como `Europe/Lisbon`, há o `zoneinfo`."],
          ["code", String.raw`from zoneinfo import ZoneInfo

lisboa = ZoneInfo("Europe/Lisbon")
print(datetime(2026, 7, 1, 12, 0, tzinfo=lisboa).utcoffset())   # 1:00:00, hora de verão`],
          ["aviso", "No Windows, o `zoneinfo` precisa de `python -m pip install tzdata`, porque o sistema não traz a base de dados de fusos. E nunca compares nem subtraias uma data com fuso e outra sem: o Python levanta `TypeError`, e ainda bem."],
          ["obra", "'O relatório de ontem tem os pedidos da meia-noite à uma a mais' é um bilhete de bug clássico, e a causa é quase sempre uma data sem fuso, ou o servidor noutro fuso. Quando te pedirem 'os pedidos de ontem', a primeira pergunta é: ontem em que fuso?"]
        ],
        quiz: [
          { p: "Como guardas o instante em que uma encomenda foi feita?", o: ["Hora local sem fuso","Em UTC, com fuso","Como texto no formato dd/mm/aaaa"], c: 1,
            e: "Um instante com fuso é inequívoco, e UTC não tem mudanças de hora. A hora local calcula-se ao mostrar." }
        ],
        exercicio: {
          ficheiro: "datas.py",
          enunciado: "Escreve cinco funções. `dias_ate(data, hoje)` devolve quantos dias faltam (negativo se já passou). `fim_do_mes(ano, mes)` devolve o `date` do último dia do mês, sem tabelas de dias escritas à mão. `formatar_pt(data)` devolve `\"24/09/2026\"`. `ler_data(texto)` aceita `\"2026-09-24\"` com espaços à volta e levanta `ValueError` se não for uma data. `para_utc(instante)` converte um `datetime` com fuso para UTC, e levanta `ValueError` se ele não tiver fuso.",
          inicio: String.raw`from datetime import date, datetime, timedelta, timezone


def dias_ate(data, hoje):
    pass


def fim_do_mes(ano, mes):
    pass


def formatar_pt(data):
    pass


def ler_data(texto):
    pass


def para_utc(instante):
    pass
`,
          testes: String.raw`from datetime import date, datetime, timedelta, timezone

import pytest

from datas import dias_ate, fim_do_mes, formatar_pt, ler_data, para_utc

HOJE = date(2026, 9, 24)


def test_dias_ate_o_natal():
    assert dias_ate(date(2026, 12, 25), HOJE) == 92


def test_data_passada_da_negativo():
    assert dias_ate(date(2026, 9, 20), HOJE) == -4


@pytest.mark.parametrize("ano, mes, dia", [(2026, 1, 31), (2026, 4, 30), (2026, 2, 28), (2028, 2, 29), (2026, 12, 31)])
def test_fim_do_mes(ano, mes, dia):
    assert fim_do_mes(ano, mes) == date(ano, mes, dia)


def test_formatar_pt():
    assert formatar_pt(date(2026, 3, 1)) == "01/03/2026"


def test_ler_data():
    assert ler_data(" 2026-09-24 ") == date(2026, 9, 24)


def test_ler_data_invalida():
    with pytest.raises(ValueError):
        ler_data("24/09/2026")


def test_para_utc():
    lisboa_verao = timezone(timedelta(hours=1))
    resultado = para_utc(datetime(2026, 7, 1, 13, 0, tzinfo=lisboa_verao))
    assert resultado == datetime(2026, 7, 1, 12, 0, tzinfo=timezone.utc)
    assert resultado.utcoffset() == timedelta(0)


def test_para_utc_sem_fuso():
    with pytest.raises(ValueError):
        para_utc(datetime(2026, 7, 1, 13, 0))
`
        }
      },
      {
        id: "17.3", titulo: "Expressões regulares", min: 17, estado: "pronta",
        meta: "No fim: validas e extrais padrões de texto com re, usas grupos com nome e sabes quando uma expressão regular é a ferramenta errada.",
        blocos: [
          ["p", "Uma expressão regular descreve um padrão de texto: 'quatro algarismos, um hífen, três algarismos'. O módulo `re` procura, valida, extrai e substitui texto que siga esse padrão."],
          ["py", String.raw`import re

print(re.fullmatch(r"\d{4}-\d{3}", "1000-001"))
print(re.fullmatch(r"\d{4}-\d{3}", "1000001"))
print(re.search(r"\d+", "pedido 4521 enviado").group())
print(re.findall(r"\d+", "3 maçãs e 12 peras"))
print(re.sub(r"\s+", " ", "muitos    espaços   aqui"))`],
          ["lista", [
            "`fullmatch` exige que o texto todo siga o padrão: é o que se usa para validar.",
            "`search` encontra a primeira ocorrência em qualquer sítio; `findall` encontra todas.",
            "`sub` substitui cada ocorrência.",
            "O `r` antes das aspas faz uma string crua, em que `\\d` chega tal e qual ao `re`. Usa-o sempre em expressões regulares."
          ]],
          ["h", "O vocabulário mínimo"],
          ["lista", [
            "`\\d` algarismo, `\\w` letra, algarismo ou `_`, `\\s` espaço, `.` qualquer carácter.",
            "`[abc]` um destes, `[^abc]` qualquer menos estes, `[a-z]` um intervalo.",
            "`+` um ou mais, `*` zero ou mais, `?` opcional, `{3}` exatamente três, `{2,4}` entre dois e quatro.",
            "`^` e `$` início e fim, `\\.` um ponto verdadeiro, `|` alternativa."
          ]],
          ["h", "Grupos"],
          ["py", String.raw`import re

linha = "2026-09-24 10:15:02 ERROR pagamento recusado"
m = re.fullmatch(r"(?P<data>\S+) (?P<hora>\S+) (?P<nivel>[A-Z]+) (?P<mensagem>.*)", linha)
print(m["nivel"], "|", m["mensagem"])
print(m.groupdict())`],
          ["p", "Os parênteses capturam pedaços, e `(?P<nome>...)` dá-lhes um nome. Um padrão com grupos com nome lê-se como documentação do formato."],
          ["aviso", "Uma expressão regular que só tu percebes é uma dívida. Se `split`, `startswith` ou `in` chegam, usa-os. E não valides emails a sério com uma regex caseira: o formato real é absurdo. Verifica que tem um `@` e um ponto depois dele, e deixa a confirmação para o email de ativação."],
          ["obra", "Extrair campos de registos, validar códigos postais e NIF, limpar texto antes de o comparar, encontrar todas as referências de fatura num email: as regex aparecem no trabalho em doses pequenas. Testa cada uma com exemplos que devem passar e exemplos que devem falhar, como no exercício."]
        ],
        quiz: [
          { p: "Queres validar que um texto inteiro é um código postal. Que função usas?", o: ["re.search","re.fullmatch","re.findall"], c: 1,
            e: "`search` aceitava `\"xx1000-001xx\"`, porque encontra o padrão lá dentro. Para validar, o texto todo tem de corresponder." }
        ],
        exercicio: {
          ficheiro: "padroes_texto.py",
          enunciado: "Escreve três funções com `re`. `codigo_postal_valido(texto)` diz se o texto é exatamente um código postal português, `1234-567`. `extrair_emails(texto)` devolve a lista dos emails que aparecem no texto, pela ordem (um email aqui é: letras, algarismos, pontos, hífenes ou `_`, um `@`, e um domínio com pelo menos um ponto). `anonimizar(texto)` troca cada email por `<email>` e cada sequência de nove algarismos seguidos por `<nif>`.",
          inicio: String.raw`import re


def codigo_postal_valido(texto):
    pass


def extrair_emails(texto):
    pass


def anonimizar(texto):
    pass
`,
          testes: String.raw`import pytest

from padroes_texto import anonimizar, codigo_postal_valido, extrair_emails


@pytest.mark.parametrize("texto", ["1000-001", "4700-123"])
def test_codigos_postais_validos(texto):
    assert codigo_postal_valido(texto) is True


@pytest.mark.parametrize("texto", ["1000001", "1000-01", "x1000-001", "1000-001 ", "abcd-efg"])
def test_codigos_postais_invalidos(texto):
    assert codigo_postal_valido(texto) is False


def test_extrair_emails():
    texto = "Falar com ana.silva@empresa.pt ou rui_c@mail.com; não com @nada nem com x@y."
    assert extrair_emails(texto) == ["ana.silva@empresa.pt", "rui_c@mail.com"]


def test_sem_emails():
    assert extrair_emails("sem nada aqui") == []


def test_anonimizar():
    texto = "Cliente ana@exemplo.pt, NIF 123456789, telefone 21 555 0000."
    assert anonimizar(texto) == "Cliente <email>, NIF <nif>, telefone 21 555 0000."
`
        }
      }
  ]
});
