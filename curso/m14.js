/* Módulo 14: Objetos. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 14, fase: 3, titulo: "Objetos",
  objetivo: "Criar os teus próprios tipos, com dados e regras que andam juntos, e saber quando não vale a pena.",
  licoes: [
      {
        id: "14.1", titulo: "A primeira classe: __init__ e self", min: 15, estado: "pronta",
        meta: "No fim: defines uma classe com atributos e métodos, crias objetos a partir dela e percebes o que é o self.",
        blocos: [
          ["p", "Até aqui guardaste dados em dicionários e listas e escreveste funções à parte para trabalhar com eles. Uma classe junta as duas coisas: define um tipo novo com os seus dados, os atributos, e as suas operações, os métodos. Já usaste dezenas: `str`, `list` e `dict` são classes, e `\"abc\".upper()` é um método."],
          ["py", String.raw`class Retangulo:
    def __init__(self, largura, altura):
        self.largura = largura
        self.altura = altura

    def area(self):
        return self.largura * self.altura


r = Retangulo(3, 4)
print(r.largura, r.altura)
print(r.area())

outro = Retangulo(10, 2)
print(outro.area())`],
          ["lista", [
            "`class Retangulo:` define o tipo. Os nomes de classes escrevem-se com maiúsculas a juntar palavras: `ContaBancaria`.",
            "`Retangulo(3, 4)` cria um objeto novo, uma instância, e chama o `__init__` para o preparar.",
            "`self` é o objeto em causa. `self.largura = largura` guarda o valor no próprio objeto, para os métodos o encontrarem depois.",
            "Um método é uma função dentro da classe, e o primeiro parâmetro é sempre `self`. Em `r.area()`, o Python passa o `r` como `self` sem o escreveres."
          ]],
          ["h", "Cada objeto tem o seu estado"],
          ["py", String.raw`a = Retangulo(1, 1)
b = Retangulo(5, 5)
a.largura = 2
print(a.area(), b.area())`],
          ["p", "Mudar a largura de `a` não mexe em `b`. São dois objetos do mesmo tipo, cada um com os seus atributos."],
          ["h", "Métodos que usam outros métodos"],
          ["py", String.raw`class Retangulo:
    def __init__(self, largura, altura):
        self.largura = largura
        self.altura = altura

    def area(self):
        return self.largura * self.altura

    def e_maior_que(self, outro):
        return self.area() > outro.area()


print(Retangulo(3, 4).e_maior_que(Retangulo(2, 2)))`],
          ["aviso", "Esquecer o `self` na definição de um método dá `TypeError: area() takes 0 positional arguments but 1 was given`, porque o Python passa sempre o objeto. Esquecer o `self.` numa atribuição dentro do `__init__` cria uma variável local que desaparece no fim, e o atributo nunca chega a existir."],
          ["obra", "Uma classe vale a pena quando há dados e regras que andam sempre juntos: um retângulo e a sua área, uma conta e as regras de levantamento. Se só tens dados, um dicionário ou uma dataclass (aula 14.3) chegam; se só tens cálculo, uma função chega. Classes por hábito são das coisas mais comentadas em revisão de código."]
        ],
        quiz: [
          { p: "Em `r.area()`, o que vale `self` dentro do método?", o: ["A classe Retangulo","O objeto r","Nada, é opcional"], c: 1,
            e: "O Python transforma `r.area()` em `Retangulo.area(r)`. O `self` é o objeto antes do ponto." },
          { p: "No `__init__` escreveste `largura = largura` em vez de `self.largura = largura`. O que acontece depois?", o: ["Funciona igual","AttributeError quando um método usar self.largura","SyntaxError"], c: 1,
            e: "Sem `self.`, o valor fica numa variável local do `__init__` e perde-se. O objeto nunca chega a ter o atributo." }
        ],
        exercicio: {
          ficheiro: "retangulo.py",
          enunciado: "Escreve a classe `Retangulo(largura, altura)`, que levanta `ValueError` se alguma das medidas não for positiva. Métodos: `area()`, `perimetro()`, `e_quadrado()`, e `escalar(fator)`, que devolve um retângulo novo com as duas medidas multiplicadas pelo fator, sem alterar o original.",
          inicio: String.raw`class Retangulo:
    def __init__(self, largura, altura):
        pass
`,
          testes: String.raw`import pytest

from retangulo import Retangulo


def test_guarda_as_medidas():
    r = Retangulo(3, 4)
    assert (r.largura, r.altura) == (3, 4)


def test_area_e_perimetro():
    r = Retangulo(3, 4)
    assert r.area() == 12
    assert r.perimetro() == 14


def test_e_quadrado():
    assert Retangulo(5, 5).e_quadrado() is True
    assert Retangulo(5, 4).e_quadrado() is False


def test_escalar_devolve_um_novo():
    r = Retangulo(3, 4)
    maior = r.escalar(2)
    assert isinstance(maior, Retangulo)
    assert (maior.largura, maior.altura) == (6, 8)
    assert (r.largura, r.altura) == (3, 4)


def test_objetos_independentes():
    a, b = Retangulo(1, 1), Retangulo(2, 2)
    a.largura = 10
    assert b.largura == 2


@pytest.mark.parametrize("largura, altura", [(0, 4), (3, -1)])
def test_medidas_invalidas(largura, altura):
    with pytest.raises(ValueError):
        Retangulo(largura, altura)
`
        }
      },
      {
        id: "14.2", titulo: "Estado, representação e propriedades", min: 16, estado: "pronta",
        meta: "No fim: proteges as regras de um objeto com métodos, distingues atributos de instância e de classe, e dás aos teus objetos um repr útil e propriedades calculadas.",
        blocos: [
          ["p", "A classe da aula anterior só fazia contas. A maior parte das classes úteis guarda estado que muda, e o seu trabalho é garantir que ele muda só de formas que fazem sentido."],
          ["p", "Uma classe junta dados e as operações que fazem sentido sobre esses dados. Se tens três funções que recebem sempre os mesmos quatro argumentos, provavelmente tens uma classe escondida."],
          ["py", String.raw`class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def depositar(self, valor):
        if valor <= 0:
            raise ValueError("depósito tem de ser positivo")
        self.saldo += valor
        return self.saldo

    def levantar(self, valor):
        if valor > self.saldo:
            raise ValueError(f"saldo insuficiente: tem {self.saldo}")
        self.saldo -= valor
        return self.saldo

c = Conta("Ana", 100)
c.depositar(50)
print(c.titular, c.saldo)
print(c.levantar(30))`],
          ["p", "`__init__` corre quando crias o objeto e é onde se define o estado inicial. `self` é o próprio objeto e é sempre o primeiro parâmetro dos métodos. Não é opcional e não é magia: é o objeto passado explicitamente."],
          ["h", "Instância contra classe"],
          ["py", String.raw`class Conta:
    banco = "Caixa Central"        # partilhado por todas as contas

    def __init__(self, titular):
        self.titular = titular      # próprio de cada conta

a = Conta("Ana")
b = Conta("Rui")
print(a.banco, b.banco)
Conta.banco = "Novo Banco"
print(a.banco, b.banco)`],
          ["aviso", "Nunca uses uma lista ou um dicionário como atributo de classe para guardar estado de instância. É o mesmo objeto para todos os objetos criados, tal como o argumento por omissão da aula 9.4. Inicializa em `__init__`."],
          ["h", "Mostrar-se em condições"],
          ["p", "Sem `__repr__`, imprimir um objeto dá algo como `<Conta object at 0x7f2c>`. Com ele, dá informação. Escreve sempre um: é a diferença entre depurar em cinco minutos ou em uma hora."],
          ["py", String.raw`class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def __repr__(self):
        return f"Conta(titular={self.titular!r}, saldo={self.saldo})"

print(Conta("Ana", 100))
print([Conta("Ana", 100), Conta("Rui", 5)])`],
          ["h", "Propriedades"],
          ["p", "Em Python não se escrevem getters e setters à partida. Deixa o atributo público e, se um dia precisares de validar ou calcular, transforma-o em propriedade sem partir quem já usa o teu código."],
          ["py", String.raw`class Retangulo:
    def __init__(self, largura, altura):
        self.largura = largura
        self.altura = altura

    @property
    def area(self):
        return self.largura * self.altura

r = Retangulo(3, 4)
print(r.area)`],
          ["obra", "Nem tudo precisa de ser classe. Uma função que transforma dados e não guarda estado deve continuar função. O sinal para criar uma classe é haver estado que sobrevive entre chamadas, ou várias implementações da mesma ideia. Em código de dados, dicionários e `dataclasses` cobrem 90 por cento dos casos."],
          ["aviso", "Um underscore à frente, `self._interno`, é a convenção para 'não mexas nisto de fora'. Não há privado a sério em Python, há acordo entre adultos. Dois underscores existem mas quase nunca são o que queres."]
        ],
        quiz: [
          { p: "Quando é que uma classe é melhor do que um par de funções?", o: ["Sempre, é mais profissional","Quando há estado que persiste entre operações e comportamento que lhe pertence","Quando o código passa das 50 linhas"], c: 1,
            e: "Classe sem estado é um módulo com passos a mais. Se todos os métodos recebem tudo por argumento e não tocam em `self`, eram funções." }
        ],
        exercicio: {
          ficheiro: "conta_bancaria.py",
          enunciado: "Escreve a classe `Conta(titular, saldo=0)`. `depositar(valor)` rejeita valores não positivos com `ValueError`; `levantar(valor)` rejeita valores não positivos e levanta `ValueError` se não houver saldo; os dois devolvem o saldo novo. O `repr` de uma conta é `Conta('Ana', 150)`.",
          inicio: String.raw`class Conta:
    def __init__(self, titular, saldo=0):
        pass
`,
          testes: String.raw`import pytest

from conta_bancaria import Conta


def test_estado_inicial():
    c = Conta("Ana", 100)
    assert (c.titular, c.saldo) == ("Ana", 100)


def test_saldo_por_omissao_e_zero():
    assert Conta("Rui").saldo == 0


def test_depositar_devolve_o_saldo():
    assert Conta("Ana", 100).depositar(50) == 150


def test_levantar_devolve_o_saldo():
    assert Conta("Ana", 100).levantar(20) == 80


@pytest.mark.parametrize("valor", [0, -5])
def test_deposito_invalido(valor):
    with pytest.raises(ValueError):
        Conta("Ana", 10).depositar(valor)


def test_sem_saldo_nao_levanta():
    c = Conta("Ana", 10)
    with pytest.raises(ValueError):
        c.levantar(999)
    assert c.saldo == 10


def test_repr():
    assert repr(Conta("Ana", 150)) == "Conta('Ana', 150)"
`
        }
      },
      {
        id: "14.3", titulo: "dataclasses", min: 12, estado: "pronta",
        meta: "No fim: modelas dados com quatro linhas em vez de trinta, com igualdade e repr de graça.",
        blocos: [
          ["p", "Grande parte das classes que vais escrever só guardam campos. Escrever `__init__`, `__repr__` e `__eq__` à mão para isso é trabalho repetido e é onde entram erros de distração. O decorador `@dataclass` gera tudo."],
          ["py", String.raw`from dataclasses import dataclass

@dataclass
class Produto:
    nome: str
    preco: float
    quantidade: int = 1

    def total(self):
        return round(self.preco * self.quantidade, 2)

p = Produto("teclado", 39.9, 2)
print(p)
print(p.total())
print(Produto("rato", 12.5) == Produto("rato", 12.5))`],
          ["p", "Repara em três coisas: o `print` mostra os campos, a comparação por valor funciona, e a anotação de tipo deixou de ser opcional, é ela que declara o campo. A aula 8.4 acabou de se pagar."],
          ["h", "Campos com valores por omissão"],
          ["aviso", "O mesmo problema do argumento mutável aparece aqui e o Python recusa-se a deixar. Uma lista como valor por omissão dá `ValueError: mutable default`. A solução é `field(default_factory=list)`."],
          ["py", String.raw`from dataclasses import dataclass, field

@dataclass
class Encomenda:
    cliente: str
    itens: list[str] = field(default_factory=list)
    notas: dict = field(default_factory=dict)

a = Encomenda("Ana")
b = Encomenda("Rui")
a.itens.append("teclado")
print(a)
print(b)`],
          ["h", "Imutável quando faz sentido"],
          ["p", "`frozen=True` cria objetos que não mudam depois de criados. Servem de chave de dicionário, são seguros para partilhar entre funções e evitam a categoria inteira de bugs em que alguém alterou o objeto a meio."],
          ["py", String.raw`from dataclasses import dataclass

@dataclass(frozen=True)
class Coordenada:
    latitude: float
    longitude: float

lisboa = Coordenada(38.72, -9.14)
print({lisboa: "sede"})
lisboa.latitude = 0`],
          ["h", "Ferramentas úteis"],
          ["py", String.raw`from dataclasses import dataclass, asdict, replace

@dataclass
class Produto:
    nome: str
    preco: float

p = Produto("cabo", 4.0)
print(asdict(p))
print(replace(p, preco=5.0))
print(p)`],
          ["obra", "Em vez de passar dicionários entre camadas e rezar para que a chave 'quantidade' esteja lá escrita da mesma maneira, converte para `dataclass` à entrada. O editor passa a completar os campos e um erro de escrita fica um `AttributeError` imediato em vez de um `KeyError` três funções à frente."],
          ["p", "Quando os dados vêm de fora e precisam de validação a sério, o passo seguinte é o Pydantic, no módulo 25. As `dataclasses` não validam nada: `Produto(\"cabo\", \"muito caro\")` cria-se sem se queixar."]
        ],
        quiz: [
          { p: "Porque é que `itens: list = []` numa dataclass é recusado pelo Python?", o: ["Por causa dos tipos","Porque a lista seria partilhada por todas as instâncias","Porque listas não podem ser campos"], c: 1,
            e: "É o mesmo problema do argumento por omissão mutável. A diferença é que aqui a linguagem te obriga a corrigir, com `field(default_factory=list)`." }
        ],
        exercicio: {
          ficheiro: "produto.py",
          enunciado: "Cria a dataclass `Produto` com os campos `nome` (str), `preco` (float) e `quantidade` (int, por omissão 1), e o método `total()`, que devolve o valor da linha arredondado a duas casas. Cria também a dataclass imutável `Coordenada` com `latitude` e `longitude`, que tem de poder ser chave de um dicionário.",
          inicio: String.raw`from dataclasses import dataclass


@dataclass
class Produto:
    pass
`,
          testes: String.raw`import dataclasses

import pytest

from produto import Coordenada, Produto


def test_e_uma_dataclass():
    assert dataclasses.is_dataclass(Produto)


def test_total_da_linha():
    assert Produto("teclado", 39.9, 2).total() == 79.8


def test_quantidade_por_omissao():
    assert Produto("rato", 12.5).quantidade == 1


def test_igualdade_por_valor():
    assert Produto("rato", 12.5) == Produto("rato", 12.5)


def test_repr_mostra_os_campos():
    assert "teclado" in repr(Produto("teclado", 39.9))


def test_coordenada_serve_de_chave():
    sedes = {Coordenada(38.72, -9.14): "Lisboa"}
    assert sedes[Coordenada(38.72, -9.14)] == "Lisboa"


def test_coordenada_nao_muda():
    c = Coordenada(38.72, -9.14)
    with pytest.raises(dataclasses.FrozenInstanceError):
        c.latitude = 0
`
        }
      },
      {
        id: "14.4", titulo: "Herança: o básico e o super()", min: 15, estado: "pronta",
        meta: "No fim: crias uma classe a partir de outra, substituis e estendes métodos com super() e usas isinstance.",
        blocos: [
          ["p", "Uma classe pode herdar de outra: recebe todos os atributos e métodos da mãe e pode acrescentar os seus, ou substituir os que se comportam de forma diferente."],
          ["py", String.raw`class Animal:
    def __init__(self, nome):
        self.nome = nome

    def apresentar(self):
        return f"Sou o {self.nome} e faço {self.som()}"

    def som(self):
        return "..."


class Cao(Animal):
    def som(self):
        return "béu"


print(Animal("bicho").apresentar())
print(Cao("Rex").apresentar())`],
          ["p", "`Cao` não escreveu `apresentar`: herdou-o. Mas quando o `apresentar` chama `self.som()`, o Python procura primeiro na classe do objeto, e para um `Cao` encontra o `som` do cão. É por isso que o mesmo código da mãe se comporta de forma diferente em cada filha."],
          ["h", "super(): usar a versão da mãe"],
          ["py", String.raw`class Funcionario:
    def __init__(self, nome, salario_base):
        self.nome = nome
        self.salario_base = salario_base

    def salario(self):
        return self.salario_base


class Gestor(Funcionario):
    def __init__(self, nome, salario_base, bonus):
        super().__init__(nome, salario_base)
        self.bonus = bonus

    def salario(self):
        return super().salario() + self.bonus


print(Gestor("Ana", 2000, 500).salario())`],
          ["p", "`super()` dá acesso aos métodos da mãe. No `__init__` serve para a mãe preparar a sua parte antes de a filha acrescentar a dela; no `salario`, para estender o cálculo em vez de o copiar."],
          ["h", "isinstance"],
          ["py", String.raw`rex = Cao("Rex")
print(isinstance(rex, Cao), isinstance(rex, Animal), isinstance(rex, str))`],
          ["p", "Um cão é um animal: `isinstance` responde que sim para a classe e para todas as mães. As tuas exceções da aula 10.3 são herança pura: `except ErroDeValidacao` apanha também as filhas."],
          ["aviso", "Esquecer o `super().__init__(...)` no `__init__` da filha é o erro clássico: a parte da mãe nunca é preparada, e mais tarde aparece `AttributeError: 'Gestor' object has no attribute 'nome'`."],
          ["obra", "A herança é a ferramenta que quem começa usa demais. Serve bem para hierarquias pequenas e estáveis, como exceções ou variações de um mesmo conceito. Na aula seguinte vês a alternativa que as equipas preferem na maioria dos casos."]
        ],
        quiz: [
          { p: "Uma filha define `salario` e chama `super().salario()` lá dentro. O que faz esse `super().salario()`?", o: ["Chama o salario da filha outra vez","Chama a versão da mãe","Dá erro"], c: 1,
            e: "`super()` salta a classe atual e procura na mãe. É assim que se estende um método sem o copiar." }
        ],
        exercicio: {
          ficheiro: "funcionarios.py",
          enunciado: "Escreve `Funcionario(nome, salario_base)` com `salario()`, que devolve o salário base, e `descricao()`, que devolve `\"Ana: 1500.00\"` usando `self.salario()`. `Gestor(nome, salario_base, bonus)` herda de `Funcionario`, prepara a parte da mãe com `super()` e soma o bónus ao salário. `Estagiario` herda de `Funcionario` e recebe 80% do base. Por fim, `folha_salarial(funcionarios)` devolve a soma dos salários de todos.",
          inicio: String.raw`class Funcionario:
    def __init__(self, nome, salario_base):
        pass
`,
          testes: String.raw`import inspect

from funcionarios import Estagiario, Funcionario, Gestor, folha_salarial


def test_funcionario_normal():
    f = Funcionario("Ana", 1500)
    assert f.salario() == 1500
    assert f.descricao() == "Ana: 1500.00"


def test_gestor_soma_o_bonus():
    assert Gestor("Rui", 2000, 300).salario() == 2300


def test_gestor_herda_a_descricao():
    assert Gestor("Rui", 2000, 300).descricao() == "Rui: 2300.00"
    assert "descricao" not in vars(Gestor)


def test_gestor_prepara_a_mae_com_super():
    assert "super().__init__" in inspect.getsource(Gestor)
    assert Gestor("Rui", 2000, 300).nome == "Rui"


def test_estagiario():
    assert Estagiario("Bea", 1000).salario() == 800


def test_todos_sao_funcionarios():
    assert isinstance(Gestor("Rui", 1, 1), Funcionario)
    assert isinstance(Estagiario("Bea", 1), Funcionario)


def test_folha_salarial():
    equipa = [Funcionario("Ana", 1500), Gestor("Rui", 2000, 300), Estagiario("Bea", 1000)]
    assert folha_salarial(equipa) == 4600
`
        }
      },
      {
        id: "14.5", titulo: "Composição contra herança", min: 14, estado: "pronta",
        meta: "No fim: sabes porque é que a árvore de herança profunda é um erro caro e o que fazer em vez disso.",
        blocos: [
          ["p", "Herança diz 'isto é um daqueles'. Composição diz 'isto tem um daqueles'. A segunda frase é verdadeira muito mais vezes do que a primeira, e é a que se desmonta sem partir tudo."],
          ["py", String.raw`class Notificador:
    def __init__(self, canal):
        self.canal = canal          # composição: tem um canal

    def enviar(self, mensagem):
        return self.canal.enviar(mensagem)

class CanalEmail:
    def enviar(self, mensagem):
        return f"email: {mensagem}"

class CanalSMS:
    def enviar(self, mensagem):
        return f"sms: {mensagem}"

print(Notificador(CanalEmail()).enviar("servidor em baixo"))
print(Notificador(CanalSMS()).enviar("servidor em baixo"))`],
          ["p", "O `Notificador` não sabe nem quer saber o que é o canal. Só precisa que tenha um método `enviar`. Isto chama-se duck typing e é o coração do desenho de código em Python: o que interessa é o comportamento, não a árvore genealógica."],
          ["h", "Onde a herança dá cabo de projetos"],
          ["lista", [
            "A classe base cresce para servir todas as filhas e passa a ter métodos que metade delas não deve usar.",
            "Mudar a base parte código de que nem te lembras, em ficheiros que nunca abriste.",
            "Uma filha herda comportamento que não faz sentido para ela e passa a ter de o desligar com exceções.",
            "Testar uma filha obriga a montar a base inteira."
          ]],
          ["h", "Quando a herança é a resposta certa"],
          ["p", "Quando é mesmo uma relação de tipo e a base é estável: exceções próprias, como no módulo 10, classes base de frameworks, e classes abstratas que definem um contrato. Uma camada, no máximo duas. A partir daí é dívida técnica."],
          ["py", String.raw`class ErroDePagamento(Exception):
    pass

class CartaoRecusado(ErroDePagamento):
    pass

try:
    raise CartaoRecusado("fundos insuficientes")
except ErroDePagamento as e:
    print(type(e).__name__, e)`],
          ["h", "Injetar em vez de construir"],
          ["p", "Repara que o `Notificador` recebe o canal já feito em vez de o criar lá dentro. Isso chama-se injeção de dependências e é o que torna o código testável: no teste passas um canal falso que guarda a mensagem numa lista, e testas sem enviar nada a ninguém."],
          ["py", String.raw`class CanalFalso:
    def __init__(self):
        self.enviadas = []

    def enviar(self, mensagem):
        self.enviadas.append(mensagem)
        return "ok"

class Notificador:
    def __init__(self, canal):
        self.canal = canal

    def enviar(self, mensagem):
        return self.canal.enviar(mensagem)

falso = CanalFalso()
Notificador(falso).enviar("teste")
print(falso.enviadas)`],
          ["obra", "Numa entrevista, 'porque é que preferes composição a herança' é uma pergunta de rotina. A resposta que impressiona não é a definição: é dizer que composição permite trocar uma peça sem tocar nas outras, e que a herança acopla o teu código a decisões que outra pessoa tomou há dois anos."],
          ["aviso", "Herdar de `dict` ou de `list` para lhes acrescentar um método parece prático e traz surpresas: muitos métodos internos não passam pela tua versão. Se precisas de comportamento novo, compõe: guarda o dicionário num atributo."]
        ],
        quiz: [
          { p: "Precisas de testar uma classe que envia emails a sério. Qual é o desenho que te salva?", o: ["Herdar dela no teste e reescrever o método","Receber o canal de envio como argumento e passar um falso no teste","Usar uma variável global para desligar o envio"], c: 1,
            e: "Injeção de dependências. O teste passa um objeto que guarda a mensagem numa lista, corre em milissegundos e não depende de rede. É o aula 23.2 inteiro." }
        ],
        exercicio: {
          ficheiro: "notificador.py",
          enunciado: "Escreve a classe `Notificador`, que recebe um `canal` no construtor e tem `enviar(mensagem)`, que delega em `canal.enviar(mensagem)` e devolve o que ele devolver. Antes de delegar, rejeita mensagens vazias (ou só com espaços) com `ValueError`, sem chegar a chamar o canal.",
          inicio: String.raw`class Notificador:
    def __init__(self, canal):
        pass
`,
          testes: String.raw`import pytest

from notificador import Notificador


class CanalFalso:
    def __init__(self):
        self.enviadas = []

    def enviar(self, mensagem):
        self.enviadas.append(mensagem)
        return "ok"


def test_devolve_o_resultado_do_canal():
    assert Notificador(CanalFalso()).enviar("servidor em baixo") == "ok"


def test_o_canal_recebe_a_mensagem():
    canal = CanalFalso()
    Notificador(canal).enviar("servidor em baixo")
    assert canal.enviadas == ["servidor em baixo"]


@pytest.mark.parametrize("mensagem", ["", "   "])
def test_mensagem_vazia_e_rejeitada_sem_enviar(mensagem):
    canal = CanalFalso()
    with pytest.raises(ValueError):
        Notificador(canal).enviar(mensagem)
    assert canal.enviadas == []
`
        }
      },
      {
        id: "14.6", titulo: "Métodos especiais: comparar, somar, medir", min: 17, estado: "pronta",
        meta: "No fim: fazes os teus objetos funcionar com ==, <, +, len, in e for, escrevendo os métodos especiais que o Python chama por trás.",
        blocos: [
          ["p", "`__init__` e `__repr__` são métodos especiais: o Python chama-os sozinho em certos momentos. Há um para quase cada operador e função do Python, e escrevê-los faz os teus objetos portarem-se como os tipos da linguagem."],
          ["lista", [
            "`len(x)` chama `x.__len__()`.",
            "`item in x` chama `x.__contains__(item)`, e `for i in x` chama `x.__iter__()`.",
            "`a == b` chama `a.__eq__(b)`, e `a < b` chama `a.__lt__(b)`.",
            "`a + b` chama `a.__add__(b)`.",
            "`str(x)` e o `print` usam `__str__`; o REPL e as listas usam `__repr__`."
          ]],
          ["py", String.raw`class Carrinho:
    def __init__(self):
        self.itens = []

    def acrescentar(self, item):
        self.itens.append(item)

    def __len__(self):
        return len(self.itens)

    def __contains__(self, item):
        return item in self.itens

    def __iter__(self):
        return iter(self.itens)


c = Carrinho()
c.acrescentar("pão")
c.acrescentar("leite")
print(len(c), "pão" in c)
for item in c:
    print(item)`],
          ["h", "Igualdade"],
          ["py", String.raw`class Ponto:
    def __init__(self, x, y):
        self.x, self.y = x, y


print(Ponto(1, 2) == Ponto(1, 2))


class Ponto:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, outro):
        if not isinstance(outro, Ponto):
            return NotImplemented
        return (self.x, self.y) == (outro.x, outro.y)


print(Ponto(1, 2) == Ponto(1, 2))`],
          ["p", "Sem `__eq__`, dois objetos só são iguais se forem o mesmo objeto. Com ele, decides o que é igual. `NotImplemented` diz ao Python 'não sei comparar com isto', e ele responde `False` em vez de rebentar."],
          ["aviso", "Uma classe com `__eq__` e sem `__hash__` deixa de poder ser chave de dicionário ou elemento de conjunto. Se os objetos não mudam depois de criados, uma dataclass com `frozen=True` resolve os dois de uma vez."],
          ["h", "Ordenar e somar"],
          ["p", "Com `__lt__`, o `sorted`, o `min` e o `max` passam a funcionar com os teus objetos. Com `__add__`, o `+` passa a funcionar, e deve devolver um objeto novo, sem alterar nenhum dos dois."],
          ["obra", "O caso clássico no trabalho é o objeto de valor: dinheiro, que nunca é um `float`, é uma quantia em cêntimos com uma moeda. Com os métodos especiais certos, o código de faturação lê-se como a regra de negócio, `total = preco + portes`, e somar euros com dólares rebenta em vez de dar um número errado."]
        ],
        quiz: [
          { p: "Escreves `len(carrinho)` e o Python responde `TypeError: object of type 'Carrinho' has no len()`. O que falta?", o: ["Um atributo len","O método __len__","Herdar de list"], c: 1,
            e: "`len` chama `__len__`. Escreve-o e devolve um inteiro." }
        ],
        exercicio: {
          ficheiro: "dinheiro.py",
          enunciado: "Escreve a classe `Dinheiro(centimos, moeda=\"EUR\")`, que guarda uma quantia em cêntimos inteiros (um `float` levanta `TypeError`). `repr` dá `Dinheiro(1230, 'EUR')` e `str` dá `12.30 EUR`. Dois valores são iguais se tiverem os mesmos cêntimos e a mesma moeda; comparar com outra coisa dá `False`. `<` e `+` só funcionam entre valores da mesma moeda (senão, `ValueError`), e `+` devolve um `Dinheiro` novo.",
          inicio: String.raw`class Dinheiro:
    def __init__(self, centimos, moeda="EUR"):
        pass
`,
          testes: String.raw`import pytest

from dinheiro import Dinheiro


def test_repr_e_str():
    d = Dinheiro(1230)
    assert repr(d) == "Dinheiro(1230, 'EUR')"
    assert str(d) == "12.30 EUR"


def test_str_de_poucos_centimos():
    assert str(Dinheiro(5, "USD")) == "0.05 USD"


def test_float_e_recusado():
    with pytest.raises(TypeError):
        Dinheiro(12.3)


def test_igualdade():
    assert Dinheiro(100) == Dinheiro(100)
    assert Dinheiro(100) != Dinheiro(100, "USD")
    assert Dinheiro(100) != 100


def test_soma_devolve_um_novo():
    a, b = Dinheiro(100), Dinheiro(250)
    total = a + b
    assert total == Dinheiro(350)
    assert a == Dinheiro(100)


def test_ordenar():
    valores = [Dinheiro(300), Dinheiro(100), Dinheiro(200)]
    assert sorted(valores) == [Dinheiro(100), Dinheiro(200), Dinheiro(300)]
    assert max(valores) == Dinheiro(300)


def test_moedas_diferentes_nao_se_misturam():
    with pytest.raises(ValueError):
        Dinheiro(100) + Dinheiro(100, "USD")
    with pytest.raises(ValueError):
        Dinheiro(100) < Dinheiro(100, "USD")
`
        }
      },
      {
        id: "14.7", titulo: "Enum: valores com nome", min: 12, estado: "pronta",
        meta: "No fim: trocas textos soltos por enumerações, validas entradas com elas e escreves regras sobre estados sem erros de escrita.",
        blocos: [
          ["p", "Um campo que só pode ter meia dúzia de valores, como o estado de uma encomenda, costuma começar como texto: `\"pago\"`, `\"enviado\"`. Até alguém escrever `\"Pago\"` ou `\"enviada\"`, e o `if` deixar de apanhar esse caso sem ninguém dar por isso. Um `Enum` define o conjunto fechado de valores, cada um com nome."],
          ["py", String.raw`from enum import Enum


class Estado(Enum):
    PENDENTE = "pendente"
    PAGA = "paga"
    ENVIADA = "enviada"


print(Estado.PAGA, Estado.PAGA.value, Estado.PAGA.name)
print(Estado("enviada"))
print([e.name for e in Estado])
print(Estado.PAGA == "paga")`],
          ["p", "Compara-se com os membros, `estado is Estado.PAGA`, e não com texto. `Estado(\"enviada\")` converte o valor de fora no membro certo, e rebenta com `ValueError` se o valor não existir, o que é exatamente a validação que querias."],
          ["h", "StrEnum"],
          ["code", String.raw`from enum import StrEnum


class Prioridade(StrEnum):
    BAIXA = "baixa"
    ALTA = "alta"


print(Prioridade.ALTA == "alta")   # True: cada membro é também uma string`],
          ["p", "Desde o Python 3.11, `StrEnum` faz cada membro ser também uma string. É cómodo para guardar em JSON ou numa base de dados, com o custo de voltar a deixar comparar com texto solto."],
          ["h", "Regras sobre estados"],
          ["code", String.raw`TRANSICOES = {
    Estado.PENDENTE: {Estado.PAGA},
    Estado.PAGA: {Estado.ENVIADA},
    Estado.ENVIADA: set(),
}


def pode_passar(atual, novo):
    return novo in TRANSICOES[atual]`],
          ["aviso", "Com um `Enum` normal, `Estado.PAGA == \"paga\"` é `False`, sem erro. Se tens texto vindo de fora, converte-o primeiro com `Estado(texto)` e compara depois."],
          ["obra", "Estados de encomendas, tipos de utilizador, níveis de prioridade: sempre que um campo só pode ter alguns valores, é um `Enum`. Os erros de escrita passam a rebentar logo, o editor completa os nomes, e procurar onde um estado é usado passa a ser uma pesquisa exata."]
        ],
        quiz: [
          { p: "Com `class Estado(Enum): PAGA = \"paga\"`, o que dá `Estado(\"PAGA\")`?", o: ["Estado.PAGA","ValueError","None"], c: 1,
            e: "A conversão usa os valores, não os nomes. `Estado(\"paga\")` funciona; para o nome seria `Estado[\"PAGA\"]`." }
        ],
        exercicio: {
          ficheiro: "estados.py",
          enunciado: "Cria `Estado(Enum)` com `PENDENTE`, `PAGA`, `ENVIADA`, `ENTREGUE` e `CANCELADA`, com os valores em minúsculas (`\"pendente\"`, ...). Uma encomenda pendente pode ser paga ou cancelada; paga pode ser enviada ou cancelada; enviada só pode ser entregue; entregue e cancelada são finais. Escreve `pode_passar(atual, novo)`, `avancar(atual, novo)`, que devolve o novo estado ou levanta `ValueError` com os dois nomes na mensagem, e `de_texto(texto)`, que converte `\" Paga \"` em `Estado.PAGA` e levanta `ValueError` para textos desconhecidos.",
          inicio: String.raw`from enum import Enum


class Estado(Enum):
    pass
`,
          testes: String.raw`from enum import Enum

import pytest

from estados import Estado, avancar, de_texto, pode_passar


def test_e_um_enum_com_os_cinco_estados():
    assert issubclass(Estado, Enum)
    assert [e.value for e in Estado] == ["pendente", "paga", "enviada", "entregue", "cancelada"]


@pytest.mark.parametrize("atual, novo", [
    (Estado.PENDENTE, Estado.PAGA),
    (Estado.PENDENTE, Estado.CANCELADA),
    (Estado.PAGA, Estado.ENVIADA),
    (Estado.PAGA, Estado.CANCELADA),
    (Estado.ENVIADA, Estado.ENTREGUE),
])
def test_transicoes_permitidas(atual, novo):
    assert pode_passar(atual, novo) is True


@pytest.mark.parametrize("atual, novo", [
    (Estado.PENDENTE, Estado.ENVIADA),
    (Estado.ENVIADA, Estado.CANCELADA),
    (Estado.ENTREGUE, Estado.PENDENTE),
    (Estado.CANCELADA, Estado.PAGA),
])
def test_transicoes_proibidas(atual, novo):
    assert pode_passar(atual, novo) is False


def test_avancar():
    assert avancar(Estado.PAGA, Estado.ENVIADA) is Estado.ENVIADA


def test_avancar_proibido_explica_porque():
    with pytest.raises(ValueError, match="ENTREGUE"):
        avancar(Estado.ENTREGUE, Estado.PENDENTE)


def test_de_texto():
    assert de_texto(" Paga ") is Estado.PAGA


def test_de_texto_desconhecido():
    with pytest.raises(ValueError):
        de_texto("perdida")
`
        }
      }
  ]
});
