/* Módulo 3: Funções: o primeiro contacto. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 3, fase: 1, titulo: "Funções: o primeiro contacto",
  objetivo: "Dar nome a um pedaço de código, devolver resultados e escrever os teus próprios testes.",
  licoes: [
      {
        id: "3.1", titulo: "A primeira função: def e chamar", min: 14, estado: "pronta",
        meta: "No fim: defines funções com parâmetros, chamas-las as vezes que quiseres e sabes o que a indentação quer dizer.",
        blocos: [
          ["p", "Até aqui, os teus programas corriam de cima a baixo, uma vez. Uma função é um bloco de código com nome que só corre quando o chamas, e que podes chamar as vezes que quiseres. Já usaste várias: `print`, `len`, `input`, `round`. Hoje escreves as tuas."],
          ["py", String.raw`def saudar():
    print("Olá!")
    print("Bem-vinda ao curso.")


saudar()
saudar()`],
          ["lista", [
            "`def` anuncia uma função nova, e a seguir vem o nome, os parênteses e os dois pontos.",
            "O corpo são as linhas indentadas por baixo, com quatro espaços. Acaba onde a indentação acaba.",
            "Definir não corre nada: só regista a receita. É `saudar()`, com parênteses, que a executa."
          ]],
          ["h", "A indentação faz parte da linguagem"],
          ["p", "Noutras linguagens os blocos marcam-se com chavetas. Em Python marcam-se com o espaço no início da linha: quatro espaços, sempre os mesmos. O editor faz isso por ti quando carregas em Tab ou depois dos dois pontos."],
          ["code", String.raw`def saudar():
print("Olá!")

  File "saudacoes.py", line 2
    print("Olá!")
    ^
IndentationError: expected an indented block after function definition on line 1`],
          ["h", "Parâmetros: dar dados à função"],
          ["py", String.raw`def saudar(nome):
    print(f"Olá, {nome}!")


saudar("Ana")
saudar("Rui")`],
          ["p", "`nome` é um parâmetro: um nome que dentro da função vale o que lhe for dado na chamada. O valor dado, `\"Ana\"`, chama-se argumento. Podes ter vários, separados por vírgulas, e a ordem conta."],
          ["py", String.raw`def mostrar_total(preco, quantidade):
    total = preco * quantidade
    print(f"{quantidade} x {preco:.2f} = {total:.2f}")


mostrar_total(2.5, 4)
mostrar_total(0.99, 10)`],
          ["p", "Chamar com argumentos a menos dá `TypeError: mostrar_total() missing 1 required positional argument: 'quantidade'`. A mensagem diz o nome do que faltou."],
          ["aviso", "Esquecer os parênteses: `saudar` sem `()` não chama nada, só menciona a função. No REPL aparece `<function saudar at 0x...>`, e num ficheiro simplesmente não acontece nada, sem erro nenhum."],
          ["obra", "Dar nome a um pedaço de código é a ferramenta de organização mais importante que existe. Num projeto real, quase todo o código vive dentro de funções, e o corpo do ficheiro limita-se a chamá-las."]
        ],
        quiz: [
          { p: "Defines uma função no topo do ficheiro e nunca a chamas. O que acontece quando corres o ficheiro?", o: ["O corpo da função corre uma vez","Nada do corpo corre","Dá erro"], c: 1,
            e: "`def` só regista a função. O corpo corre quando alguém a chama." },
          { p: "`def dobro(n): ...` e depois chamas `dobro()`. O que acontece?", o: ["Devolve zero","TypeError: falta o argumento n","Usa o último valor de n"], c: 1,
            e: "Cada parâmetro sem valor por omissão tem de receber um argumento. Os valores por omissão vêm na aula 3.3." }
        ],
        exercicio: {
          ficheiro: "saudacoes.py",
          enunciado: "Escreve duas funções. `saudar(nome)` mostra `Olá, Ana!` quando recebe `\"Ana\"`. `despedir(nome)` mostra `Até amanhã, Ana.`. O ficheiro só define as funções: não as chama.",
          inicio: String.raw`def saudar(nome):
    pass


def despedir(nome):
    pass
`,
          testes: String.raw`import runpy
from pathlib import Path

from saudacoes import despedir, saudar


def test_saudar_ana(capsys):
    saudar("Ana")
    assert capsys.readouterr().out == "Olá, Ana!\n"


def test_saudar_outro_nome(capsys):
    saudar("Rui")
    assert capsys.readouterr().out == "Olá, Rui!\n"


def test_despedir(capsys):
    despedir("Ana")
    assert capsys.readouterr().out == "Até amanhã, Ana.\n"


def test_o_ficheiro_so_define_nao_chama(capsys):
    runpy.run_path(str(Path(__file__).with_name("saudacoes.py")))
    assert capsys.readouterr().out == ""
`
        }
      },
      {
        id: "3.2", titulo: "return: devolver em vez de imprimir", min: 14, estado: "pronta",
        meta: "No fim: escreves funções que devolvem um valor, e percebes porque é que print não serve para isso.",
        blocos: [
          ["p", "As funções da aula anterior mostravam coisas. A maior parte das funções úteis não mostra nada: calcula um valor e entrega-o a quem a chamou, com `return`. Quem chamou decide o que fazer com ele: guardar, mostrar, usar noutra conta."],
          ["py", String.raw`def area_retangulo(largura, altura):
    return largura * altura


area = area_retangulo(3, 4)
print(area)
print(area_retangulo(2, 5) + 1)`],
          ["h", "return contra print: o erro número um"],
          ["p", "`print` escreve no ecrã e devolve `None`. `return` entrega o valor a quem chamou. Uma função que faz `print` em vez de `return` não se consegue reutilizar, nem testar, nem compor com outra."],
          ["py", String.raw`def com_print(a, b):
    print(a + b)

def com_return(a, b):
    return a + b

x = com_print(2, 3)
y = com_return(2, 3)
print("x =", x)
print("y =", y)
print(com_return(com_return(1, 2), 3))`],
          ["p", "Uma função sem `return` explícito devolve `None`. Isso é legítimo quando a função existe para ter um efeito, como gravar um ficheiro. Não é legítimo quando ela calcula alguma coisa."],
          ["h", "O return acaba a função"],
          ["py", String.raw`def experimentar():
    return 1
    print("nunca aparece")


print(experimentar())`],
          ["p", "Quando o Python chega a um `return`, sai da função nesse instante com aquele valor. O que estiver por baixo não corre."],
          ["aviso", "Uma função que calcula e faz `print` em vez de `return` parece funcionar quando a experimentas: o número certo aparece no ecrã. O problema só aparece quando outra parte do programa, ou um teste, precisa do valor e recebe `None`."]
        ],
        quiz: [
          { p: "Um colega diz que a função dele funciona porque imprime o resultado certo. Que pergunta lhe fazes?", o: ["Se testou com números negativos","Como é que outra função usa esse resultado","Se o nome está em inglês"], c: 1,
            e: "Imprimir é mostrar a um humano. Devolver é entregar ao programa. Uma função que só imprime é um beco sem saída: não se testa nem se compõe." }
        ],
        exercicio: {
          ficheiro: "descontos.py",
          enunciado: "Escreve `preco_final(preco, percentagem)`, que devolve o preço com o desconto aplicado, arredondado a duas casas com `round`. Percentagem zero devolve o preço original. A função não mostra nada no ecrã.",
          inicio: String.raw`def preco_final(preco, percentagem):
    pass
`,
          testes: String.raw`from descontos import preco_final


def test_vinte_por_cento_de_cem():
    assert preco_final(100, 20) == 80.0


def test_sem_desconto_fica_igual():
    assert preco_final(49.9, 0) == 49.9


def test_arredonda_a_duas_casas():
    assert preco_final(33.33, 10) == 30.0


def test_devolve_e_nao_imprime(capsys):
    assert preco_final(10, 50) == 5.0
    assert capsys.readouterr().out == ""
`
        }
      },
      {
        id: "3.3", titulo: "Argumentos com nome e valores por omissão", min: 12, estado: "pronta",
        meta: "No fim: chamas funções por posição ou por nome, e dás valores por omissão aos parâmetros que quase nunca mudam.",
        blocos: [
          ["p", "Até aqui passaste os argumentos por ordem. Também os podes passar pelo nome do parâmetro, e aí a ordem deixa de importar."],
          ["py", String.raw`def descrever(produto, preco, quantidade):
    return f"{quantidade} x {produto} a {preco:.2f}"


print(descrever("caneta", 1.2, 3))
print(descrever(quantidade=3, produto="caneta", preco=1.2))`],
          ["p", "Por nome é mais comprido e mais claro, e em chamadas com três ou mais argumentos é o que se espera de ti em revisão: `enviar(email, True, False)` obriga quem lê a ir ver a definição, `enviar(email, urgente=True, copia=False)` não."],
          ["h", "Valores por omissão"],
          ["p", "Um argumento por omissão dá um valor quando quem chama não o fornece. Serve para não obrigar toda a gente a repetir o caso normal."],
          ["py", String.raw`def saudar(nome, saudacao="Olá"):
    return f"{saudacao}, {nome}"

print(saudar("Ana"))
print(saudar("Rui", "Bom dia"))
print(saudar("Bea", saudacao="Viva"))`],
          ["p", "Os parâmetros com valor por omissão vêm depois dos que não têm. `def f(a=1, b)` é um erro de sintaxe."],
          ["aviso", "Usa como valores por omissão só coisas simples: números, texto, `True`, `False` e `None`. Há uma armadilha famosa com listas por omissão que vais perceber na aula 9.4."],
          ["obra", "Os valores por omissão servem para o caso normal não ter de ser repetido em cada chamada: `exportar(dados)` para o dia a dia, `exportar(dados, formato=\"json\")` para a exceção. Uma função fácil de usar é uma função em que o caso normal é curto."]
        ],
        quiz: [
          { p: "`def f(a, b=2): return a * b`. Quanto dá `f(3)`?", o: ["3","6","Dá erro"], c: 1,
            e: "`b` não foi dado, por isso vale 2. `3 * 2` é 6." },
          { p: "E `f(b=5, a=1)`?", o: ["5","Dá erro, a ordem está trocada","1"], c: 0,
            e: "Por nome, a ordem não importa: `a` vale 1 e `b` vale 5." }
        ],
        exercicio: {
          ficheiro: "precos.py",
          enunciado: "Escreve `com_iva(preco, taxa=0.23)`, que devolve o preço com a taxa aplicada, arredondado a duas casas, e `formatar(valor, moeda=\"€\")`, que devolve o texto do valor com duas casas decimais, um espaço e a moeda: `formatar(12.3)` dá `\"12.30 €\"`.",
          inicio: String.raw`def com_iva(preco, taxa):
    pass


def formatar(valor, moeda):
    pass
`,
          testes: String.raw`import inspect

from precos import com_iva, formatar


def test_iva_normal_por_omissao():
    assert com_iva(10) == 12.3


def test_outra_taxa():
    assert com_iva(10, 0.06) == 10.6


def test_argumentos_por_nome():
    assert com_iva(taxa=0.13, preco=100) == 113.0


def test_taxa_por_omissao_e_023():
    assert inspect.signature(com_iva).parameters["taxa"].default == 0.23


def test_formatar_em_euros():
    assert formatar(12.3) == "12.30 €"


def test_formatar_noutra_moeda():
    assert formatar(5, moeda="USD") == "5.00 USD"
`
        }
      },
      {
        id: "3.4", titulo: "Variáveis locais e globais", min: 14, estado: "pronta",
        meta: "No fim: sabes onde vive cada variável, porque é que aparece o UnboundLocalError e como passar dados sem variáveis globais.",
        blocos: [
          ["p", "O que nasce dentro da função morre com ela. Ler uma variável de fora funciona, mas escrever cria uma nova, local. Depender de variáveis globais é a forma mais rápida de tornar um programa impossível de seguir: passa tudo por argumentos."],
          ["py", String.raw`def calcular():
    resultado = 42
    return resultado


calcular()
print(resultado)`],
          ["p", "`resultado` só existe enquanto a função corre. Cá fora, o nome não existe e o Python responde com `NameError`. Cada chamada começa do zero, e os parâmetros também são locais."],
          ["py", String.raw`taxa = 0.23

def com_iva(preco):
    return preco * (1 + taxa)

print(com_iva(100))`],
          ["h", "Ler de fora funciona, escrever não"],
          ["py", String.raw`contador = 0


def incrementar():
    contador = contador + 1


incrementar()`],
          ["p", "Isto rebenta com `UnboundLocalError`. Como há uma atribuição a `contador` dentro da função, o Python decide que `contador` é local em toda a função. Quando tenta ler o valor para somar um, a variável local ainda não tem nada."],
          ["p", "A correção não é mexer na variável de fora: é receber o valor como argumento e devolver o novo."],
          ["py", String.raw`def incrementar(contador):
    return contador + 1


contador = 0
contador = incrementar(contador)
contador = incrementar(contador)
print(contador)`],
          ["h", "Constantes"],
          ["p", "Valores que o programa nunca altera, como a taxa de IVA, ficam no topo do ficheiro com o nome em maiúsculas: `TAXA_IVA = 0.23`. Ler constantes dentro das funções é normal e esperado. O que se evita é alterá-las."],
          ["aviso", "`global` existe e faz o erro desaparecer. Quase nunca é a resposta certa: uma função que muda variáveis de fora dá resultados diferentes conforme a ordem em que tudo foi chamado. É assim que nascem os bugs que só acontecem 'às vezes'."],
          ["obra", "Uma função que só depende dos argumentos e só comunica pelo `return` testa-se numa linha e reutiliza-se em qualquer lado. Em revisão de código, 'passa isso por argumento' é dos comentários mais frequentes que vais receber, e fazer."]
        ],
        quiz: [
          { p: "Porque é que `contador = contador + 1` dentro de uma função dá `UnboundLocalError`?", o: ["Porque `contador` não foi importado","Porque a atribuição torna `contador` local, e ele é lido antes de ter valor","Porque falta o `return`"], c: 1,
            e: "Basta haver uma atribuição ao nome em qualquer sítio da função para ele ser local na função inteira." },
          { p: "Como se escreve a taxa de IVA que o programa inteiro usa e nunca muda?", o: ["taxa_iva = 0.23 dentro de cada função","TAXA_IVA = 0.23 no topo do ficheiro","global taxa_iva"], c: 1,
            e: "Maiúsculas no topo do ficheiro dizem a quem lê: isto é uma constante, não mexas." }
        ],
        exercicio: {
          ficheiro: "pontos.py",
          enunciado: "Chamar `marcar(2)` neste código rebenta com `UnboundLocalError`. Reescreve-o: `marcar(pontos, golos)` recebe os pontos atuais e devolve os pontos novos, a 3 por golo. Cria a constante `PONTOS_POR_GOLO = 3` no topo e usa-a. Apaga a variável global `pontos` e não uses `global`.",
          inicio: String.raw`pontos = 0


def marcar(golos):
    pontos = pontos + golos * 3
    return pontos
`,
          testes: String.raw`from pathlib import Path

import pontos
from pontos import marcar


def test_dois_golos_a_partir_de_zero():
    assert marcar(0, 2) == 6


def test_soma_aos_pontos_que_ja_havia():
    assert marcar(6, 1) == 9


def test_sem_golos_fica_igual():
    assert marcar(10, 0) == 10


def test_constante_no_topo():
    assert pontos.PONTOS_POR_GOLO == 3


def test_sem_variavel_global_de_pontos():
    assert not hasattr(pontos, "pontos")


def test_nao_usa_global():
    codigo = Path(__file__).with_name("pontos.py").read_text(encoding="utf-8")
    assert "global " not in codigo
`
        }
      },
      {
        id: "3.5", titulo: "Testar as tuas funções", min: 18, estado: "pronta",
        meta: "No fim: escreves um ficheiro de testes com assert, corres-lo com pytest e sabes o que distingue um teste bom de um inútil.",
        blocos: [
          ["p", "Desde a aula 1.6 que corres testes que outra pessoa escreveu. Hoje escreves os teus. Um teste é uma função com um nome começado por `test_` que chama o teu código e verifica o resultado com `assert`."],
          ["h", "assert"],
          ["py", String.raw`assert 2 + 2 == 4
print("passou")
assert 2 + 2 == 5
print("nunca chega aqui")`],
          ["p", "`assert` seguido de uma condição não faz nada se ela for verdadeira. Se for falsa, levanta `AssertionError` e o programa pára ali. `==` pergunta se dois valores são iguais; a aula 4.1 trata das comparações todas."],
          ["h", "Um ficheiro de testes"],
          ["code", String.raw`# m03/areas.py
def area_retangulo(largura, altura):
    return largura * altura`],
          ["code", String.raw`# m03/test_areas.py
from areas import area_retangulo


def test_retangulo_normal():
    assert area_retangulo(3, 4) == 12


def test_largura_zero_da_area_zero():
    assert area_retangulo(0, 5) == 0


def test_aceita_decimais():
    assert area_retangulo(2.5, 2) == 5.0`],
          ["p", "`from areas import area_retangulo` vai ao ficheiro `areas.py` da mesma pasta e traz a função para este ficheiro. A aula 13.1 explica o `import` com calma. O pytest procura ficheiros começados por `test_`, corre cada função começada por `test_` e conta os resultados."],
          ["code", String.raw`(.venv) $ python -m pytest m03/test_areas.py
...                                              [100%]
3 passed in 0.01s`],
          ["h", "O que faz um bom teste"],
          ["lista", [
            "O nome diz o comportamento: `test_largura_zero_da_area_zero`, e não `test_2`. Quando falhar, o nome é a primeira coisa que alguém lê.",
            "Verifica uma coisa. Se falhar, sabes logo qual.",
            "O valor esperado é escrito à mão, contado por ti, e não calculado com a própria função.",
            "Cobre o caso normal e um caso limite: zero, texto vazio, o valor mais pequeno possível."
          ]],
          ["h", "Um teste tem de conseguir falhar"],
          ["p", "Depois de ver os testes verdes, estraga a função de propósito, por exemplo trocando `*` por `+`, e confirma que ficam vermelhos. Se continuarem verdes, não estão a testar nada."],
          ["aviso", "`assert area_retangulo(3, 4) == area_retangulo(3, 4)` passa sempre, mesmo com a função errada, porque compara a função com ela própria. O valor esperado escreve-se à mão."],
          ["obra", "Numa candidatura, um repositório com testes a passar vale mais do que três projetos sem testes. É a prova mais barata de que sabes trabalhar como numa equipa antes de teres trabalhado numa."]
        ],
        quiz: [
          { p: "O que acontece quando o Python corre `assert 1 == 2`?", o: ["Nada","Levanta AssertionError e pára","Mostra False"], c: 1,
            e: "Um assert falso interrompe tudo com `AssertionError`. É isso que o pytest apanha e mostra como teste falhado." },
          { p: "Qual é o melhor nome para um teste?", o: ["test_1","test_funcao_area","test_largura_zero_da_area_zero"], c: 2,
            e: "Quando falha, o nome diz-te o que deixou de ser verdade sem teres de abrir o ficheiro." }
        ],
        exercicio: {
          ficheiro: "test_temperaturas.py",
          ficheiroTestes: "test_verifica_temperaturas.py",
          enunciado: "Desta vez o código já está feito e quem escreve os testes és tu. `temperaturas.py` tem a função `para_fahrenheit(celsius)`, que está certa. Escreve em `test_temperaturas.py` pelo menos três testes com valores que calculaste à mão (0 °C são 32 °F, 100 °C são 212 °F, -40 °C são -40 °F). O ficheiro de verificação corre os teus testes contra a função certa, que tem de passar, e contra três versões com erros, que os teus testes têm de apanhar.",
          inicio: String.raw`from temperaturas import para_fahrenheit


def test_zero_graus():
    assert para_fahrenheit(0) == ...
`,
          apoio: {
            "temperaturas.py": String.raw`def para_fahrenheit(celsius):
    return celsius * 9 / 5 + 32
`
          },
          testes: String.raw`import inspect

import temperaturas
import test_temperaturas as os_teus_testes


def correr_os_teus_testes():
    testes = [f for nome, f in vars(os_teus_testes).items() if nome.startswith("test_") and inspect.isfunction(f)]
    falhas = 0
    for teste in testes:
        try:
            teste()
        except AssertionError:
            falhas += 1
    return len(testes), falhas


def trocar_a_funcao(monkeypatch, versao_com_erro):
    monkeypatch.setattr(temperaturas, "para_fahrenheit", versao_com_erro)
    monkeypatch.setattr(os_teus_testes, "para_fahrenheit", versao_com_erro, raising=False)


def test_escreveste_pelo_menos_tres_testes():
    assert correr_os_teus_testes()[0] >= 3


def test_os_teus_testes_passam_com_a_funcao_certa():
    assert correr_os_teus_testes()[1] == 0


def test_apanham_quem_se_esquece_de_somar_32(monkeypatch):
    trocar_a_funcao(monkeypatch, lambda c: c * 9 / 5)
    assert correr_os_teus_testes()[1] > 0


def test_apanham_quem_troca_a_fracao(monkeypatch):
    trocar_a_funcao(monkeypatch, lambda c: c * 5 / 9 + 32)
    assert correr_os_teus_testes()[1] > 0


def test_apanham_quem_devolve_sempre_32(monkeypatch):
    trocar_a_funcao(monkeypatch, lambda c: 32.0)
    assert correr_os_teus_testes()[1] > 0
`
        }
      }
  ]
});
