/* Módulo 4: Decisões. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 4, fase: 1, titulo: "Decisões",
  objetivo: "Fazer o programa escolher o caminho, e recusar dados que não fazem sentido.",
  licoes: [
      {
        id: "4.1", titulo: "Comparações e booleanos", min: 13, estado: "pronta",
        meta: "No fim: fazes perguntas de sim ou não com os seis operadores de comparação e escreves funções que respondem True ou False.",
        blocos: [
          ["p", "Uma comparação é uma pergunta cuja resposta é `True` ou `False`. Esses dois valores são do tipo `bool`, e são a matéria-prima de todas as decisões que um programa toma."],
          ["py", String.raw`print(5 > 3)
print(5 < 3)
print(5 == 5)
print(5 != 5)
print(4 >= 4)`],
          ["lista", [
            "`==` igual e `!=` diferente.",
            "`<` menor e `>` maior.",
            "`<=` menor ou igual e `>=` maior ou igual."
          ]],
          ["aviso", "`=` atribui, `==` compara. Trocá-los é o erro mais comum desta semana. Dentro de uma condição, o Python recusa o `=` com `SyntaxError`, o que ao menos te avisa logo."],
          ["h", "Comparar texto"],
          ["py", String.raw`print("ana" == "ana")
print("Ana" == "ana")
print("Ana".lower() == "ana")
print("abacate" < "banana")`],
          ["p", "O texto compara-se letra a letra, e maiúsculas contam. Quando comparas texto escrito por pessoas, normaliza primeiro com `strip()` e `lower()`, que conheceste na aula 2.4."],
          ["h", "Guardar a resposta"],
          ["py", String.raw`idade = 17
maior = idade >= 18
print(maior, type(maior))`],
          ["p", "Um booleano é um valor como os outros: guarda-se numa variável e devolve-se de uma função. As funções que respondem sim ou não costumam ter nomes que soam a pergunta: `e_par`, `tem_stock`, `pode_entrar`."],
          ["py", String.raw`def e_par(n):
    return n % 2 == 0


print(e_par(4), e_par(7))`],
          ["h", "Intervalos"],
          ["py", String.raw`nota = 15
print(10 <= nota <= 20)
print(0 <= -3 <= 20)`],
          ["p", "`10 <= nota <= 20` lê-se como em matemática: a nota está entre 10 e 20, inclusive. Poucas linguagens deixam escrever isto; usa-o."],
          ["aviso", "`\"10\" > \"9\"` é `False`: comparando texto, o `\"1\"` vem antes do `\"9\"`. E `\"10\" > 9` rebenta com `TypeError`. Números que chegaram como texto convertem-se antes de comparar."],
          ["obra", "Funções como `e_valido`, `tem_stock` ou `pode_cancelar` são das mais comuns em código de trabalho. Um nome que soa a pergunta e um `return` com a comparação, e está feito."]
        ],
        quiz: [
          { p: "O que dá `\"Rui\" == \"rui\"`?", o: ["True","False","Dá erro"], c: 1,
            e: "`R` e `r` são caracteres diferentes. Para ignorar maiúsculas, compara `a.lower() == b.lower()`." },
          { p: "O que dá `\"10\" > \"9\"`?", o: ["True","False","TypeError"], c: 1,
            e: "Entre dois textos, a comparação é letra a letra, e `\"1\"` é menor do que `\"9\"`. Com números, `10 > 9` seria `True`." }
        ],
        exercicio: {
          ficheiro: "comparacoes.py",
          enunciado: "Escreve três funções que devolvem `True` ou `False`. `e_maior_de_idade(idade)`: 18 anos ou mais. `mesma_palavra(a, b)`: as duas palavras são iguais ignorando maiúsculas e espaços nas pontas. `no_intervalo(valor, minimo, maximo)`: o valor está entre os dois limites, inclusive.",
          inicio: String.raw`def e_maior_de_idade(idade):
    pass


def mesma_palavra(a, b):
    pass


def no_intervalo(valor, minimo, maximo):
    pass
`,
          testes: String.raw`from comparacoes import e_maior_de_idade, mesma_palavra, no_intervalo


def test_dezoito_ja_e_maior():
    assert e_maior_de_idade(18) is True


def test_dezassete_ainda_nao():
    assert e_maior_de_idade(17) is False


def test_mesma_palavra_com_maiusculas_e_espacos():
    assert mesma_palavra("  Lisboa", "lisboa ") is True


def test_palavras_diferentes():
    assert mesma_palavra("Lisboa", "Porto") is False


def test_dentro_do_intervalo():
    assert no_intervalo(15, 10, 20) is True


def test_os_limites_contam():
    assert no_intervalo(10, 10, 20) is True
    assert no_intervalo(20, 10, 20) is True


def test_fora_do_intervalo():
    assert no_intervalo(21, 10, 20) is False
    assert no_intervalo(9, 10, 20) is False
`
        }
      },
      {
        id: "4.2", titulo: "if e else", min: 13, estado: "pronta",
        meta: "No fim: fazes o programa seguir um de dois caminhos e sabes, pela indentação, que linhas pertencem a cada um.",
        blocos: [
          ["p", "Um `if` corre o bloco seguinte só quando a condição é verdadeira. Tal como no corpo das funções, o bloco marca-se com indentação: quatro espaços."],
          ["py", String.raw`temperatura = 30
if temperatura > 25:
    print("Está calor.")
    print("Leva água.")
print("Bom dia!")`],
          ["p", "As duas primeiras mensagens só aparecem com calor. A última não está indentada, por isso já não pertence ao `if` e aparece sempre."],
          ["h", "else: o outro caminho"],
          ["py", String.raw`saldo = 20
preco = 35
if saldo >= preco:
    print("Compra feita.")
else:
    print(f"Faltam {preco - saldo} euros.")`],
          ["p", "Com `else`, corre sempre exatamente um dos dois blocos: o primeiro se a condição for verdadeira, o segundo se não for."],
          ["h", "Dentro de funções"],
          ["py", String.raw`def par_ou_impar(n):
    if n % 2 == 0:
        return "par"
    else:
        return "ímpar"


print(par_ou_impar(10))
print(par_ou_impar(7))`],
          ["p", "Repara nos dois níveis: quatro espaços para o corpo da função, oito para o corpo do `if`. Cada bloco novo acrescenta quatro."],
          ["aviso", "Esquecer os dois pontos no fim do `if` ou do `else` dá `SyntaxError: expected ':'`. Misturar tabulações com espaços dá `IndentationError`, ou pior, código que parece alinhado e não está. Deixa o editor pôr os espaços."],
          ["obra", "A condição de um `if` deve ler-se como uma frase: `if saldo >= preco:`. Quando fica difícil, como `if not (a < b or c):`, dá-lhe um nome numa variável antes: `pode_pagar = ...` e depois `if pode_pagar:`. Quem revê o teu código agradece."]
        ],
        quiz: [
          { p: "Com `x = 5`, o que mostra este código?\n`if x > 10:`\n`    print(\"a\")`\n`print(\"b\")`", o: ["a e b","Só b","Nada"], c: 1,
            e: "A condição é falsa, por isso o `print(\"a\")` indentado não corre. O `print(\"b\")` está fora do `if` e corre sempre." }
        ],
        exercicio: {
          ficheiro: "paridade.py",
          enunciado: "Escreve três funções com `if` e `else`. `par_ou_impar(n)` devolve `\"par\"` ou `\"ímpar\"`. `valor_absoluto(n)` devolve o número sem sinal, sem usar `abs`. `maior_de_dois(a, b)` devolve o maior dos dois, sem usar `max`.",
          inicio: String.raw`def par_ou_impar(n):
    pass


def valor_absoluto(n):
    pass


def maior_de_dois(a, b):
    pass
`,
          testes: String.raw`from pathlib import Path

from paridade import maior_de_dois, par_ou_impar, valor_absoluto


def test_par():
    assert par_ou_impar(10) == "par"


def test_impar():
    assert par_ou_impar(7) == "ímpar"


def test_zero_e_par():
    assert par_ou_impar(0) == "par"


def test_absoluto_de_negativo():
    assert valor_absoluto(-8) == 8


def test_absoluto_de_positivo_e_zero():
    assert valor_absoluto(3) == 3
    assert valor_absoluto(0) == 0


def test_maior_de_dois():
    assert maior_de_dois(3, 9) == 9
    assert maior_de_dois(9, 3) == 9


def test_maior_de_dois_iguais():
    assert maior_de_dois(4, 4) == 4


def test_sem_abs_nem_max():
    codigo = Path(__file__).with_name("paridade.py").read_text(encoding="utf-8")
    assert "abs(" not in codigo and "max(" not in codigo
`
        }
      },
      {
        id: "4.3", titulo: "elif: escolher entre vários caminhos", min: 12, estado: "pronta",
        meta: "No fim: escreves decisões com vários ramos pela ordem certa e sem deixar casos de fora.",
        blocos: [
          ["p", "Quando há mais de dois caminhos, cada condição extra entra num `elif`, que quer dizer 'senão, se'. O Python testa de cima para baixo e corre só o primeiro ramo verdadeiro."],
          ["py", String.raw`idade = 17

if idade >= 18:
    print("maior de idade")
elif idade >= 16:
    print("pode conduzir ciclomotor")
else:
    print("nem uma coisa nem outra")`],
          ["p", "O `elif` só é avaliado se o `if` acima falhar. A ordem importa: se puseres primeiro a condição mais larga, as de baixo nunca chegam a correr. Este é o erro de lógica mais comum em código de iniciante que compila e mesmo assim está errado."],
          ["py", String.raw`nota = 19
if nota >= 10:
    print("suficiente")
elif nota >= 18:
    print("muito bom")
else:
    print("insuficiente")`],
          ["p", "Este mostra `suficiente` para um 19: o primeiro ramo já era verdadeiro, e os outros nem são avaliados. Ordena as condições do caso mais restrito para o mais largo, ou percorre a escala sempre no mesmo sentido."],
          ["p", "O `else` final é opcional. Sem ele, se nenhuma condição for verdadeira, nenhum bloco corre."],
          ["aviso", "Uma função com `if` e `elif` e sem `else` final devolve `None` quando nenhum ramo é verdadeiro, sem dar erro. O teste que apanha isto é o do caso de que te esqueceste, por isso testa sempre as fronteiras entre ramos."]
        ],
        quiz: [
          { p: "Escreves `if saldo > 1000: ... elif saldo > 100: ...` e nenhum cliente com 5000 euros cai no primeiro ramo. O que investigas primeiro?", o: ["A ordem das condições","Se `saldo` é texto em vez de número","A indentação"], c: 1,
            e: "A ordem está certa. Se veio de um ficheiro ou de um formulário, `saldo` é `str` e a comparação de texto com número rebenta, ou pior, compara alfabeticamente noutras linguagens. Confirma o tipo antes de mexer na lógica." }
        ],
        exercicio: {
          ficheiro: "notas.py",
          enunciado: "Escreve `escalao(nota)`, para notas de 0 a 20: devolve `\"insuficiente\"` abaixo de 10, `\"suficiente\"` abaixo de 14, `\"bom\"` abaixo de 18 e `\"muito bom\"` de 18 para cima. Os testes batem nas fronteiras entre escalões.",
          inicio: String.raw`def escalao(nota):
    pass
`,
          testes: String.raw`from notas import escalao


def test_zero_e_insuficiente():
    assert escalao(0) == "insuficiente"


def test_nove_e_meio_ainda_e_insuficiente():
    assert escalao(9.5) == "insuficiente"


def test_dez_ja_e_suficiente():
    assert escalao(10) == "suficiente"


def test_treze_e_suficiente():
    assert escalao(13) == "suficiente"


def test_catorze_e_bom():
    assert escalao(14) == "bom"


def test_dezassete_e_nove_ainda_e_bom():
    assert escalao(17.9) == "bom"


def test_dezoito_e_muito_bom():
    assert escalao(18) == "muito bom"


def test_vinte_e_muito_bom():
    assert escalao(20) == "muito bom"
`
        }
      },
      {
        id: "4.4", titulo: "and, or, not e o que conta como verdadeiro", min: 14, estado: "pronta",
        meta: "No fim: combinas condições, sabes quando o Python deixa de avaliar e usas a verdade dos valores sem cair nas armadilhas.",
        blocos: [
          ["h", "Condições compostas"],
          ["lista", [
            "`a and b` é verdadeiro só se os dois forem.",
            "`a or b` é verdadeiro se pelo menos um for.",
            "`not a` troca verdadeiro por falso e vice-versa."
          ]],
          ["py", String.raw`idade = 25
estudante = True
print(idade < 26 and estudante)
print(idade >= 65 or estudante)
print(not estudante)`],
          ["p", "O Python avalia da esquerda para a direita e pára assim que sabe a resposta. Num `and`, se o primeiro lado é falso, o segundo nem é calculado. Isso deixa-te proteger operações que rebentariam:"],
          ["py", String.raw`divisor = 0
if divisor != 0 and 10 / divisor > 1:
    print("grande")
else:
    print("sem divisão possível")`],
          ["aviso", "`not` é avaliado primeiro, depois `and`, e só depois `or`. `a or b and c` quer dizer `a or (b and c)`. Quando misturares os dois, põe parênteses mesmo que não sejam precisos: quem lê não tem de saber a tabela de prioridades."],
          ["h", "O que conta como verdadeiro"],
          ["p", "Zero, texto vazio e `None` são falsos. Tudo o resto é verdadeiro, incluindo `\"0\"` e `\"False\"`, que são textos com conteúdo. Mais à frente vais juntar a esta lista as coleções vazias."],
          ["py", String.raw`print(bool(0), bool(7))
print(bool(""), bool("ok"), bool("0"))
print(bool(None))`],
          ["p", "`None` é o valor que quer dizer 'não há valor'. É o que devolve uma função sem `return`, e a aula 9.3 trata dele com calma. Por isso se escreve `if nome:` para 'se o nome tem conteúdo', em vez de `if nome != \"\":`."],
          ["aviso", "`if utilizador == None:` funciona por acidente. O correto é `if utilizador is None:`. `None` é um objeto único e compara-se por identidade. Um revisor apanha isto em dois segundos."],
          ["h", "O ternário"],
          ["py", String.raw`nota = 8
estado = "positiva" if nota >= 10 else "negativa"
print(estado)`],
          ["p", "O ternário escolhe entre dois valores numa linha: `valor_se_verdade if condição else valor_se_falso`. Serve para escolhas simples. Se precisares de um `elif`, escreve o `if` normal."]
        ],
        quiz: [
          { p: "O que dá `bool(\"0\")`?", o: ["False","True","Dá erro"], c: 1,
            e: "É um texto com um carácter lá dentro. Só o texto vazio é falso." },
          { p: "Quanto vale `True or False and False`?", o: ["True","False"], c: 0,
            e: "O `and` é feito primeiro: `False and False` é `False`. Depois `True or False` é `True`." }
        ],
        exercicio: {
          ficheiro: "bilhetes.py",
          enunciado: "Escreve três funções. `preco_bilhete(idade, estudante)`: menores de 6 anos não pagam (0), maiores de 65 ou estudantes pagam 4.5, os restantes pagam 9. `pode_conduzir(idade, tem_carta)`: só com 18 ou mais anos e carta. `nome_a_mostrar(nome)`: devolve o nome sem espaços nas pontas, ou `\"anónimo\"` se ficar vazio.",
          inicio: String.raw`def preco_bilhete(idade, estudante):
    pass


def pode_conduzir(idade, tem_carta):
    pass


def nome_a_mostrar(nome):
    pass
`,
          testes: String.raw`from bilhetes import nome_a_mostrar, pode_conduzir, preco_bilhete


def test_criancas_nao_pagam():
    assert preco_bilhete(5, False) == 0


def test_seis_anos_ja_paga():
    assert preco_bilhete(6, False) == 9


def test_estudante_tem_desconto():
    assert preco_bilhete(20, True) == 4.5


def test_mais_de_65_tem_desconto():
    assert preco_bilhete(70, False) == 4.5


def test_adulto_paga_tudo():
    assert preco_bilhete(40, False) == 9


def test_crianca_estudante_continua_gratis():
    assert preco_bilhete(4, True) == 0


def test_conduzir_precisa_das_duas_coisas():
    assert pode_conduzir(18, True) is True
    assert pode_conduzir(30, False) is False
    assert pode_conduzir(17, True) is False


def test_nome_limpo():
    assert nome_a_mostrar("  Ana ") == "Ana"


def test_nome_vazio_fica_anonimo():
    assert nome_a_mostrar("") == "anónimo"
    assert nome_a_mostrar("   ") == "anónimo"
`
        }
      },
      {
        id: "4.5", titulo: "Sair cedo e recusar dados inválidos", min: 15, estado: "pronta",
        meta: "No fim: trocas escadas de if encaixados por cláusulas de guarda e usas raise para recusar dados que não fazem sentido.",
        blocos: [
          ["p", "Um `if` dentro de outro `if` dentro de outro `if` funciona, e a cada nível fica mais difícil de ler. Chama-se-lhe código em escada, pela forma que tem no ecrã."],
          ["code", String.raw`def estado_encomenda(pago, em_stock, morada):
    if pago:
        if em_stock:
            if morada:
                return "a enviar"
            else:
                return "falta a morada"
        else:
            return "sem stock"
    else:
        return "por pagar"`],
          ["p", "A alternativa é tratar primeiro cada caso mau e sair logo com `return`. O que sobra no fim é o caso normal, sem indentação nenhuma a mais."],
          ["code", String.raw`def estado_encomenda(pago, em_stock, morada):
    if not pago:
        return "por pagar"
    if not em_stock:
        return "sem stock"
    if not morada:
        return "falta a morada"
    return "a enviar"`],
          ["obra", "Cláusula de guarda: em vez de aninhar três `if` até à direita do ecrã, trata primeiro os casos maus e sai. Uma função com `return` cedo nos casos inválidos é mais fácil de ler e é o que aparece em revisão de código como sugestão."],
          ["h", "Recusar dados que não fazem sentido"],
          ["p", "Há entradas que não são um caso a tratar: são um erro. Um preço negativo, uma nota de 25, uma idade de -3. Devolver um valor esquisito esconde o problema. O correto é parar com uma exceção, com `raise`, e uma mensagem que diz o que estava mal."],
          ["py", String.raw`def raiz_quadrada(n):
    if n < 0:
        raise ValueError(f"não há raiz de números negativos: {n}")
    return n ** 0.5


print(raiz_quadrada(9))
print(raiz_quadrada(-1))`],
          ["p", "`raise` sai da função como um `return`, mas em vez de um valor entrega um erro. O traceback mostra a tua mensagem. `ValueError` é o tipo certo quando o tipo do valor está bem e o valor não. Apanhar erros é o assunto do módulo 10; hoje só os levantas."],
          ["h", "Testar que o erro aparece"],
          ["code", String.raw`import pytest

from raizes import raiz_quadrada


def test_numero_negativo_e_recusado():
    with pytest.raises(ValueError):
        raiz_quadrada(-1)`],
          ["p", "`with pytest.raises(ValueError):` quer dizer: o código aqui dentro tem de levantar `ValueError`. Se não levantar, o teste falha. O `with` tem a sua própria aula, a 12.1; por agora, lê-o como uma frase."],
          ["aviso", "Devolver `None`, `-1` ou `\"erro\"` em vez de levantar uma exceção obriga quem chama a lembrar-se de verificar. Quem se esquece continua com um valor errado, e o problema aparece três funções mais à frente, longe da causa."]
        ],
        quiz: [
          { p: "Uma função recebe uma quantidade de -5 unidades. O que deve fazer?", o: ["Devolver 0","Levantar ValueError com uma mensagem que diga o valor","Usar 5, o valor sem sinal"], c: 1,
            e: "Corrigir em silêncio esconde um erro que está noutro sítio. Recusar com uma mensagem clara leva quem chama direto à causa." },
          { p: "Qual é a vantagem principal das cláusulas de guarda?", o: ["O código corre mais depressa","Os casos maus saem logo e o caso normal fica no fim, sem indentação a mais","Evitam o uso de else"], c: 1,
            e: "A diferença é de leitura: cada condição fica sozinha, e quem lê não tem de guardar três níveis na cabeça." }
        ],
        exercicio: {
          ficheiro: "envios.py",
          enunciado: "Duas tarefas no mesmo ficheiro. Primeiro, reescreve `estado_encomenda` com cláusulas de guarda, sem mudar o que ela devolve: nenhuma linha pode ter mais de 8 espaços de indentação. Depois escreve `custo_envio(peso_kg)`: até 2 kg custa 3.5, até 10 kg custa 6.0, acima disso custa 12.0. Peso zero ou negativo levanta `ValueError`.",
          inicio: String.raw`def estado_encomenda(pago, em_stock, morada):
    if pago:
        if em_stock:
            if morada:
                return "a enviar"
            else:
                return "falta a morada"
        else:
            return "sem stock"
    else:
        return "por pagar"


def custo_envio(peso_kg):
    pass
`,
          testes: String.raw`import inspect

import pytest

from envios import custo_envio, estado_encomenda


def test_tudo_certo_segue():
    assert estado_encomenda(True, True, "Rua Direita 1") == "a enviar"


def test_por_pagar_vem_primeiro():
    assert estado_encomenda(False, False, "") == "por pagar"


def test_sem_stock():
    assert estado_encomenda(True, False, "Rua Direita 1") == "sem stock"


def test_falta_a_morada():
    assert estado_encomenda(True, True, "") == "falta a morada"


def test_sem_escada():
    for linha in inspect.getsource(estado_encomenda).splitlines():
        indentacao = len(linha) - len(linha.lstrip(" "))
        assert indentacao <= 8, linha


@pytest.mark.parametrize("peso, custo", [(0.5, 3.5), (2, 3.5), (2.1, 6.0), (10, 6.0), (10.5, 12.0)])
def test_escaloes_de_peso(peso, custo):
    assert custo_envio(peso) == custo


def test_peso_zero_e_recusado():
    with pytest.raises(ValueError):
        custo_envio(0)


def test_peso_negativo_e_recusado():
    with pytest.raises(ValueError):
        custo_envio(-3)
`
        }
      }
  ]
});
