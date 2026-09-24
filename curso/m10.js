/* Módulo 10: Erros e exceções. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 10, fase: 2, titulo: "Erros e exceções",
  objetivo: "Apanhar os erros que se sabe tratar, deixar subir os outros e criar os teus próprios.",
  licoes: [
      {
        id: "10.1", titulo: "Exceções: apanhar um erro com try e except", min: 13, estado: "pronta",
        meta: "No fim: apanhas um erro com try e except, pedes outra vez em vez de rebentar e usas a mensagem do erro.",
        blocos: [
          ["p", "Nem todos os erros são bugs. Um ficheiro que não existe, uma rede que caiu, um utilizador que escreveu 'trinta' na idade: são casos previsíveis. O `try` serve para os tratar, não para esconder código partido."],
          ["py", String.raw`def para_inteiro(texto):
    try:
        return int(texto)
    except ValueError:
        return None

print(para_inteiro("42"))
print(para_inteiro("quarenta e dois"))`],
          ["p", "O Python corre o bloco do `try`. Se uma linha levantar um `ValueError`, o resto do `try` é saltado e corre o bloco do `except`. Se não houver erro, o `except` é ignorado. Se o erro for de outro tipo, este `except` não o apanha e ele sobe, como se o `try` não existisse."],
          ["py", String.raw`try:
    numero = int("sete")
    print("não chega aqui")
except ValueError:
    print("isso não é um número")
print("o programa continua")`],
          ["h", "Perguntar outra vez"],
          ["code", String.raw`while True:
    texto = input("Idade: ")
    try:
        idade = int(texto)
        break
    except ValueError:
        print("Escreve a idade em algarismos, por exemplo 25.")
print("Tens", idade, "anos")`],
          ["p", "É a promessa da aula 2.7: em vez de rebentar quando a pessoa escreve `vinte`, o programa explica o que quer e volta a perguntar."],
          ["h", "Guardar a mensagem"],
          ["py", String.raw`try:
    int("sete")
except ValueError as erro:
    print("falhou:", erro)`],
          ["aviso", "Põe dentro do `try` só a linha que pode falhar daquela maneira. Um `try` à volta de vinte linhas apanha também erros que não esperavas, e trata-os como se fossem o que esperavas."],
          ["obra", "Pedir outra vez é o comportamento certo com pessoas. Com dados de um ficheiro, a resposta é outra: registar a linha má e continuar, ou parar com uma mensagem clara. O que nunca se faz é engolir o erro e fingir que correu bem, e a próxima aula mostra porquê."]
        ],
        quiz: [
          { p: "O `try` tem `except ValueError` e o código lá dentro levanta `TypeError`. O que acontece?", o: ["O except apanha-o na mesma","O erro sobe, como se não houvesse try","O programa ignora-o"], c: 1,
            e: "Um `except` só apanha o tipo que nomeia (e os que dele descendem). Os outros continuam o seu caminho." }
        ],
        exercicio: {
          ficheiro: "entradas.py",
          enunciado: "Escreve duas funções. `para_numero(texto)` converte texto em `float`, aceitando vírgula decimal e espaços à volta, e devolve `None` se o texto não for um número. `pedir_inteiro(pergunta)` pergunta com `input` até a pessoa escrever um inteiro e devolve-o; a cada resposta inválida mostra `Isso não é um número inteiro.`.",
          inicio: String.raw`def para_numero(texto):
    pass


def pedir_inteiro(pergunta):
    pass
`,
          testes: String.raw`from entradas import para_numero, pedir_inteiro


def test_numero_com_ponto():
    assert para_numero("3.5") == 3.5


def test_numero_com_virgula_e_espacos():
    assert para_numero(" 12,75 ") == 12.75


def test_texto_invalido_da_none():
    assert para_numero("doze") is None
    assert para_numero("") is None


def responder_com(monkeypatch, respostas):
    perguntas = []
    restantes = list(respostas)

    def responder(pergunta=""):
        perguntas.append(pergunta)
        return restantes.pop(0)

    monkeypatch.setattr("builtins.input", responder)
    return perguntas


def test_resposta_certa_a_primeira(monkeypatch):
    perguntas = responder_com(monkeypatch, ["20"])
    assert pedir_inteiro("Idade: ") == 20
    assert perguntas == ["Idade: "]


def test_pergunta_ate_ter_um_inteiro(monkeypatch, capsys):
    perguntas = responder_com(monkeypatch, ["vinte", "2.5", "20"])
    assert pedir_inteiro("Idade: ") == 20
    assert len(perguntas) == 3
    assert capsys.readouterr().out.count("Isso não é um número inteiro.") == 2
`
        }
      },
      {
        id: "10.2", titulo: "else, finally e apanhar o erro certo", min: 14, estado: "pronta",
        meta: "No fim: apanhas o erro certo, no sítio certo, e nunca escreves um except vazio.",
        blocos: [
          ["p", "Já sabes apanhar um erro. Esta aula é sobre apanhar o erro certo, no sítio certo, e sobre as duas partes do `try` que faltam."],
          ["h", "Apanhar o erro exato"],
          ["p", "`except ValueError` apanha um problema de conteúdo. `except TypeError` apanha um problema de tipo. `except Exception` apanha tudo, incluindo erros de programação que querias ver. E `except:` sozinho apanha até o Ctrl+C do utilizador."],
          ["aviso", "Um `except` vazio é o pior código que podes escrever em Python. O programa continua a correr com dados errados, sem sinal nenhum, e quem for depurar daqui a seis meses não tem por onde começar. Se alguma vez precisares mesmo de apanhar tudo, regista o erro e volta a levantá-lo com `raise`."],
          ["code", String.raw`# nunca
try:
    processar(dados)
except:
    pass

# aceitável
try:
    processar(dados)
except Exception:
    logger.exception("falha a processar")
    raise`],
          ["h", "As quatro partes"],
          ["py", String.raw`def dividir(a, b):
    try:
        resultado = a / b
    except ZeroDivisionError:
        print("divisão por zero")
        return None
    else:
        print("correu bem")
        return resultado
    finally:
        print("isto corre sempre")

print(dividir(10, 2))
print(dividir(10, 0))`],
          ["p", "`else` corre se não houve exceção, e serve para manter dentro do `try` apenas a linha que pode falhar. `finally` corre sempre, mesmo com `return` pelo meio, e é onde se fecha o que estiver aberto."],
          ["h", "Vários tipos, e a mensagem"],
          ["py", String.raw`for valor in ["10", "dez", None]:
    try:
        print(int(valor) * 2)
    except (ValueError, TypeError) as erro:
        print(f"{type(erro).__name__}: {erro}")`],
          ["obra", "Regra prática das equipas: apanha a exceção no sítio onde sabes o que fazer com ela. Uma função de baixo nível que lê um ficheiro não sabe se deve mostrar um erro ao utilizador ou tentar outra vez, por isso deixa a exceção subir. Quem decide é quem tem contexto."],
          ["h", "Levantar de propósito"],
          ["py", String.raw`def raiz(n):
    if n < 0:
        raise ValueError(f"n tem de ser positivo, recebi {n}")
    return n ** 0.5

print(raiz(9))
print(raiz(-1))`],
          ["p", "Repara na mensagem: diz o que se esperava e o que chegou. Uma mensagem de erro escrita a pensar em quem a vai ler às três da manhã é um sinal de maturidade que se nota."]
        ],
        quiz: [
          { p: "Um serviço em produção deixou de gravar dados e ninguém deu por nada durante duas semanas. Que padrão de código é o suspeito principal?", o: ["Um try/except a apanhar tudo e a passar à frente","Falta de anotações de tipo","Demasiadas funções pequenas"], c: 1,
            e: "Erros silenciados são falhas invisíveis. Regista sempre, e volta a levantar quando não sabes tratar." }
        ],
        exercicio: {
          ficheiro: "conversao_segura.py",
          enunciado: "Escreve `ler_int(texto, omissao=0)`, que converte o texto para inteiro. Se o conteúdo não for um número, devolve `omissao`. Um tipo impossível de converter, como `None`, tem de continuar a rebentar com `TypeError`: apanha só o erro que sabes tratar.",
          inicio: String.raw`def ler_int(texto, omissao=0):
    pass
`,
          testes: String.raw`import pytest

from conversao_segura import ler_int


def test_converte_texto_numerico():
    assert ler_int("12") == 12


def test_texto_invalido_devolve_a_omissao():
    assert ler_int("doze") == 0


def test_omissao_personalizada():
    assert ler_int("doze", -1) == -1


def test_none_continua_a_levantar_type_error():
    with pytest.raises(TypeError):
        ler_int(None)
`
        }
      },
      {
        id: "10.3", titulo: "Levantar exceções e criar as tuas", min: 13, estado: "pronta",
        meta: "No fim: distingues erro de programação de erro de domínio e escreves mensagens que ajudam.",
        blocos: [
          ["p", "As exceções da biblioteca padrão descrevem problemas técnicos: tipo errado, chave em falta, divisão por zero. O teu programa tem problemas próprios: encomenda sem itens, saldo insuficiente, ficheiro com colunas a mais. Esses merecem exceções com nome teu."],
          ["py", String.raw`class ErroDeValidacao(Exception):
    pass

class SaldoInsuficiente(ErroDeValidacao):
    pass

def levantar(saldo, valor):
    if valor <= 0:
        raise ErroDeValidacao(f"valor tem de ser positivo, recebi {valor}")
    if valor > saldo:
        raise SaldoInsuficiente(f"pediu {valor}, tem {saldo}")
    return saldo - valor

print(levantar(100, 30))
print(levantar(100, 500))`],
          ["p", "A linha `class ErroDeValidacao(Exception):` com um `pass` por baixo é a receita para criar um tipo de erro novo, que é um `Exception` com outro nome. As classes a sério vêm no módulo 14; para exceções, estas duas linhas chegam."],
          ["p", "Três linhas para uma classe de exceção. Herda de `Exception`, nunca de `BaseException`. Uma hierarquia rasa chega: uma exceção base do teu módulo e duas ou três específicas por baixo."],
          ["h", "Porque é que isto compensa"],
          ["lista", [
            "Quem chama pode apanhar `SaldoInsuficiente` sem apanhar todos os `ValueError` do mundo.",
            "O nome da exceção aparece nos registos e diz logo o que aconteceu, sem ler a mensagem.",
            "Podes apanhar a base `ErroDeValidacao` e tratar a família toda numa camada de cima.",
            "Os testes ficam explícitos: `with pytest.raises(SaldoInsuficiente)`."
          ]],
          ["h", "Validar cedo, na fronteira"],
          ["p", "Dados de fora, de um formulário, de um ficheiro ou de uma API, entram sempre pela mesma porta e são sempre suspeitos. Valida ali, uma vez, e deixa o resto do programa confiar."],
          ["py", String.raw`class ErroDeValidacao(Exception):
    pass

def validar_pedido(pedido):
    erros = []
    if not pedido.get("email"):
        erros.append("email em falta")
    if pedido.get("quantidade", 0) <= 0:
        erros.append("quantidade tem de ser positiva")
    if erros:
        raise ErroDeValidacao("; ".join(erros))
    return True

try:
    validar_pedido({"quantidade": 0})
except ErroDeValidacao as e:
    print("pedido rejeitado:", e)`],
          ["p", "Repara que junta todos os erros antes de levantar. Devolver um erro de cada vez obriga o utilizador a corrigir, submeter, corrigir, submeter. Isto é desenho de produto dentro de uma função."],
          ["obra", "Em APIs, este padrão é o que separa um 500 de um 400 com mensagem útil. O `ErroDeValidacao` do teu domínio é apanhado na camada web e traduzido para uma resposta com o campo que falhou. Vais fazer isso no módulo 25."],
          ["aviso", "`raise ErroDeValidacao` sem parênteses funciona mas levanta a classe sem mensagem. E dentro de um `except`, usa `raise ... from erro` para não perderes o traceback original: quem depurar quer ver as duas pontas."],
          ["code", String.raw`try:
    dados = json.loads(texto)
except json.JSONDecodeError as erro:
    raise ErroDeValidacao("ficheiro de configuração inválido") from erro`]
        ],
        quiz: [
          { p: "Onde é que uma exceção de domínio como `SaldoInsuficiente` deve ser apanhada?", o: ["Na função que a levanta","Na camada que sabe o que fazer com ela, tipicamente onde se responde ao utilizador","No arranque do programa"], c: 1,
            e: "Apanhar onde se levanta transforma a exceção num `if` disfarçado. Deixa-a subir até quem tem contexto para decidir." }
        ],
        exercicio: {
          ficheiro: "validacao.py",
          enunciado: "Cria a exceção `ErroDeValidacao` e a função `validar(pedido)`, que recebe um dicionário. Sem a chave `email` (ou com ela vazia), ou com `quantidade` em falta, menor ou igual a zero, levanta `ErroDeValidacao` com uma mensagem que nomeia o campo. Caso contrário devolve `True`.",
          inicio: String.raw`def validar(pedido):
    pass
`,
          testes: String.raw`import pytest

from validacao import ErroDeValidacao, validar


def test_e_uma_exception():
    assert issubclass(ErroDeValidacao, Exception)


def test_pedido_valido():
    assert validar({"email": "a@b.pt", "quantidade": 2}) is True


def test_email_em_falta_e_nomeado():
    with pytest.raises(ErroDeValidacao, match="email"):
        validar({"quantidade": 2})


def test_email_vazio_tambem_falha():
    with pytest.raises(ErroDeValidacao, match="email"):
        validar({"email": "", "quantidade": 2})


def test_quantidade_zero_e_nomeada():
    with pytest.raises(ErroDeValidacao, match="quantidade"):
        validar({"email": "a@b.pt", "quantidade": 0})


def test_quantidade_em_falta():
    with pytest.raises(ErroDeValidacao, match="quantidade"):
        validar({"email": "a@b.pt"})
`
        }
      }
  ]
});
