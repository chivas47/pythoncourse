/* Módulo 26: Concorrência. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 26, fase: 5, titulo: "Concorrência",
  objetivo: "Fazer várias coisas ao mesmo tempo quando o programa está à espera, e saber quando isso não ajuda.",
  licoes: [
      {
        id: "26.1", titulo: "Threads e processos: concurrent.futures", min: 17, estado: "pronta",
        meta: "No fim: distingues trabalho à espera de trabalho a calcular, usas um ThreadPoolExecutor para o primeiro e um ProcessPoolExecutor para o segundo, e tratas os erros de cada tarefa.",
        blocos: [
          ["p", "Um programa passa o tempo de duas formas: a calcular, ou à espera de alguma coisa de fora, como a rede, o disco ou uma base de dados. Fazer várias coisas ao mesmo tempo só ajuda na segunda, e a ferramenta mais simples para isso é um conjunto de threads."],
          ["code", String.raw`import time
from concurrent.futures import ThreadPoolExecutor


def descarregar(url):
    time.sleep(1)          # faz de conta que é a rede
    return f"conteúdo de {url}"


urls = [f"https://exemplo.pt/{i}" for i in range(8)]

inicio = time.perf_counter()
with ThreadPoolExecutor(max_workers=8) as executor:
    resultados = list(executor.map(descarregar, urls))
print(len(resultados), f"{time.perf_counter() - inicio:.1f} s")   # cerca de 1 s, não 8`],
          ["p", "`executor.map` corre a função para cada elemento, em várias threads, e devolve os resultados pela ordem original. Enquanto uma thread está à espera, as outras avançam. O `with` espera que acabem todas e arruma as threads no fim."],
          ["h", "O GIL, e porque é que as threads não aceleram contas"],
          ["p", "O Python tradicional só deixa uma thread executar código Python de cada vez: é o GIL. Enquanto uma espera pela rede, liberta-o e as outras correm; mas num cálculo puro as threads revezam-se e o total não desce. Para cálculo pesado usa-se `ProcessPoolExecutor`, com a mesma interface, que arranca processos separados, cada um com o seu Python e o seu núcleo."],
          ["code", String.raw`from concurrent.futures import ProcessPoolExecutor


def pesado(n):
    return sum(i * i for i in range(n))


if __name__ == "__main__":           # obrigatório com processos
    with ProcessPoolExecutor() as executor:
        print(list(executor.map(pesado, [10_000_000] * 4)))`],
          ["h", "Erros e resultados à medida que chegam"],
          ["code", String.raw`from concurrent.futures import ThreadPoolExecutor, as_completed

with ThreadPoolExecutor(max_workers=4) as executor:
    futuros = {executor.submit(descarregar, url): url for url in urls}
    for futuro in as_completed(futuros):
        url = futuros[futuro]
        try:
            print(url, len(futuro.result()))
        except Exception as erro:
            print(url, "falhou:", erro)`],
          ["p", "`submit` devolve um futuro, a promessa de um resultado. `as_completed` entrega-os pela ordem em que acabam. A exceção de uma tarefa fica guardada no futuro e só reaparece em `result()`: é aí que se trata, uma a uma, sem deixar uma falha deitar as outras fora."],
          ["aviso", "Duas threads a alterar a mesma lista ou o mesmo dicionário sem cuidado dão resultados que mudam de execução para execução. A regra que evita o problema: cada tarefa recebe os seus dados e devolve um resultado; quem junta os resultados é o código principal, depois do `map` ou no ciclo do `as_completed`."],
          ["obra", "Descarregar cem ficheiros, chamar uma API para mil clientes, verificar o estado de vinte servidores: um `ThreadPoolExecutor` com um `max_workers` sensato transforma minutos em segundos, e é o primeiro passo antes de pensar em async. Pergunta sempre ao serviço do outro lado quantos pedidos em paralelo aguenta."]
        ],
        quiz: [
          { p: "Tens de fazer uma conta pesada sobre quatro ficheiros grandes, já em memória. O que acelera?", o: ["ThreadPoolExecutor","ProcessPoolExecutor","Nenhum dos dois"], c: 1,
            e: "É cálculo, não espera. Com o GIL, as threads revezam-se; os processos usam núcleos diferentes a sério." }
        ],
        exercicio: {
          ficheiro: "paralelo.py",
          soLocal: true,
          enunciado: "Escreve `buscar_todos(ids, buscar, max_trabalhadores=4)`, que chama `buscar(id)` para cada id com um `ThreadPoolExecutor` de no máximo `max_trabalhadores` threads. Devolve o par `(resultados, erros)`: `resultados` é um dicionário do id para o que `buscar` devolveu, e `erros` um dicionário do id para a mensagem da exceção, para os que falharam. Uma falha não pode estragar as outras.",
          inicio: String.raw`from concurrent.futures import ThreadPoolExecutor, as_completed


def buscar_todos(ids, buscar, max_trabalhadores=4):
    pass
`,
          testes: String.raw`import threading
import time

from paralelo import buscar_todos


def lento(id_):
    time.sleep(0.1)
    return id_ * 10


def test_devolve_todos_os_resultados():
    resultados, erros = buscar_todos([1, 2, 3], lento)
    assert resultados == {1: 10, 2: 20, 3: 30}
    assert erros == {}


def test_corre_em_paralelo():
    inicio = time.perf_counter()
    buscar_todos(list(range(8)), lento, max_trabalhadores=8)
    assert time.perf_counter() - inicio < 0.5


def test_respeita_o_maximo_de_trabalhadores():
    ativos, maximo = [0], [0]
    trinco = threading.Lock()

    def contar(id_):
        with trinco:
            ativos[0] += 1
            maximo[0] = max(maximo[0], ativos[0])
        time.sleep(0.05)
        with trinco:
            ativos[0] -= 1
        return id_

    buscar_todos(list(range(12)), contar, max_trabalhadores=3)
    assert maximo[0] <= 3


def test_falhas_ficam_separadas():
    def as_vezes(id_):
        if id_ % 2:
            raise ConnectionError(f"falhou {id_}")
        return id_

    resultados, erros = buscar_todos([1, 2, 3, 4], as_vezes)
    assert resultados == {2: 2, 4: 4}
    assert erros == {1: "falhou 1", 3: "falhou 3"}
`
        }
      },
      {
        id: "26.2", titulo: "async e await sem misticismo", min: 16, estado: "pronta",
        meta: "No fim: sabes onde a assincronia ajuda mesmo e onde não faz diferença nenhuma.",
        blocos: [
          ["p", "Assincronia não torna o teu código mais rápido a calcular. Serve para uma coisa só: enquanto o programa espera por algo de fora, rede, disco ou base de dados, fazer outra coisa em vez de ficar parado."],
          ["h", "As duas palavras"],
          ["p", "`async def` cria uma corotina: chamá-la não executa nada, devolve um objeto. `await` diz 'espera aqui por isto, e entretanto deixa correr o resto'. Só se pode usar `await` dentro de uma função `async`."],
          ["code", String.raw`import asyncio
import httpx

async def obter(cliente, caminho):
    resposta = await cliente.get(caminho)
    resposta.raise_for_status()
    return resposta.json()

async def principal():
    async with httpx.AsyncClient(base_url="https://api.exemplo.pt") as cliente:
        alunos, turmas = await asyncio.gather(
            obter(cliente, "/alunos"),
            obter(cliente, "/turmas"),
        )
        return len(alunos), len(turmas)

print(asyncio.run(principal()))`],
          ["p", "`asyncio.gather` lança os dois pedidos ao mesmo tempo. Se cada um demora 300 milissegundos, o total é 300 e não 600. Com cinquenta pedidos, a diferença deixa de ser um detalhe."],
          ["aviso", "Os exemplos com rede precisam do `httpx` instalado e de ligação à internet: corre-os no teu computador, dentro do ambiente virtual. O exercício usa corotinas que esperam por relógio, não por rede, e corre em qualquer lado com `asyncio.run`."],
          ["h", "Onde ajuda e onde não"],
          ["lista", [
            "Ajuda: muitos pedidos HTTP, muitas consultas a bases de dados, servidores com milhares de ligações abertas.",
            "Não ajuda: cálculo puro. Uma soma de dez milhões de números não fica mais rápida, porque nunca está à espera de ninguém.",
            "Para cálculo pesado usa-se `multiprocessing`, que usa vários núcleos a sério.",
            "Uma chamada bloqueante dentro de código assíncrono, como `time.sleep` ou `requests.get`, congela o ciclo inteiro. É o erro clássico."
          ]],
          ["code", String.raw`# congela tudo, incluindo os outros pedidos
async def mau():
    time.sleep(2)

# liberta o ciclo para outras tarefas
async def bom():
    await asyncio.sleep(2)`],
          ["obra", "Em entrevistas, a pergunta é quase sempre a mesma: 'quando é que async ajuda?'. A resposta em duas frases: quando o programa passa o tempo à espera de entrada e saída, não quando passa o tempo a calcular. E o Python continua a ter um ciclo de eventos só, num único núcleo."],
          ["aviso", "Não converta o projeto todo para async por moda. Código assíncrono contamina: quem chama uma corotina tem de ser corotina também. Se não tens um problema de espera, o custo em complexidade não se paga."]
        ],
        quiz: [
          { p: "O teu serviço async ficou mais lento depois de acrescentares um cálculo pesado numa rota. Porquê?", o: ["Falta memória","O cálculo bloqueia o ciclo de eventos e trava todos os outros pedidos","async é sempre mais lento"], c: 1,
            e: "O ciclo de eventos é um só. Trabalho de CPU dentro dele pára tudo. Manda-o para um executor ou para outro processo." }
        ],
        exercicio: {
          ficheiro: "precos_async.py",
          soLocal: true,
          enunciado: "Escreve a corotina `total(produtos, obter_preco)`, que soma os preços obtidos com `await obter_preco(produto)`, um produto de cada vez, num ciclo. Os produtos cujo preço seja `None` valem zero. Escreve também `main()`, uma função normal que corre `total` com `asyncio.run` para a lista `[\"teclado\", \"rato\"]` e a corotina `obter_preco_demo` do ficheiro, e devolve o resultado.",
          inicio: String.raw`import asyncio

PRECOS = {"teclado": 39.9, "rato": 12.5}


async def obter_preco_demo(produto):
    await asyncio.sleep(0.01)
    return PRECOS.get(produto)


async def total(produtos, obter_preco):
    pass


def main():
    pass
`,
          testes: String.raw`import asyncio
import inspect

import pytest

from precos_async import main, obter_preco_demo, total


def test_total_e_uma_corotina():
    assert inspect.iscoroutinefunction(total)


def test_soma_os_precos():
    assert asyncio.run(total(["teclado", "rato"], obter_preco_demo)) == pytest.approx(52.4)


def test_desconhecidos_valem_zero():
    assert asyncio.run(total(["xpto"], obter_preco_demo)) == 0


def test_lista_vazia():
    assert asyncio.run(total([], obter_preco_demo)) == 0


def test_espera_por_cada_preco():
    pedidos = []

    async def registar(produto):
        pedidos.append(produto)
        await asyncio.sleep(0)
        return 1.0

    assert asyncio.run(total(["a", "b", "c"], registar)) == 3.0
    assert pedidos == ["a", "b", "c"]


def test_main_corre_a_corotina():
    assert main() == pytest.approx(52.4)
`
        }
      },
      {
        id: "26.3", titulo: "asyncio a sério: gather, limites e tempo máximo", min: 17, estado: "pronta",
        meta: "No fim: lanças muitas corotinas ao mesmo tempo com gather, limitas quantas correm com um semáforo e dás um tempo máximo a cada uma.",
        blocos: [
          ["p", "Na aula anterior esperaste por uma coisa de cada vez. O ganho do async aparece quando lanças muitas esperas ao mesmo tempo. Três ferramentas fazem quase todo o trabalho: `gather`, um semáforo e um tempo máximo."],
          ["code", String.raw`import asyncio


async def obter(i):
    await asyncio.sleep(1)
    return i * 10


async def principal():
    resultados = await asyncio.gather(*(obter(i) for i in range(10)))
    print(resultados)          # pela ordem dos pedidos, ao fim de cerca de 1 s


asyncio.run(principal())`],
          ["p", "`gather` recebe corotinas, corre-as ao mesmo tempo e devolve a lista dos resultados pela ordem em que foram passadas, não pela ordem em que acabaram. Com `return_exceptions=True`, as exceções vêm na lista em vez de a primeira deitar tudo abaixo."],
          ["h", "Limitar quantos correm ao mesmo tempo"],
          ["p", "Lançar mil pedidos em paralelo contra uma API é uma boa forma de levar com um 429 ou de ser bloqueado. Um semáforo limita quantos correm ao mesmo tempo."],
          ["code", String.raw`async def com_limite(cliente, caminhos, maximo=10):
    limite = asyncio.Semaphore(maximo)

    async def um(caminho):
        async with limite:
            return await obter(cliente, caminho)

    return await asyncio.gather(*[um(c) for c in caminhos])`],
          ["h", "Tempo máximo"],
          ["code", String.raw`try:
    resultado = await asyncio.wait_for(obter(7), timeout=2.0)
except TimeoutError:
    resultado = None`],
          ["p", "Um serviço externo que não responde não te pode prender para sempre. `asyncio.wait_for` cancela a corotina ao fim do tempo e levanta `TimeoutError`. No Python 3.11 há também `async with asyncio.timeout(2):`, para um bloco inteiro."],
          ["aviso", "`gather` sem `return_exceptions=True` levanta a primeira exceção que aparecer, mas não cancela as outras corotinas, que continuam a correr sem ninguém à espera delas. Decide de propósito: ou recolhes as exceções, ou tratas cada falha dentro da própria corotina, como no exercício."],
          ["obra", "Um cliente que faz duzentos pedidos a uma API com um limite de dez em paralelo e cinco segundos de tempo máximo por pedido é código que vais escrever, ou rever, no primeiro ano. As três decisões estão sempre lá: quantos ao mesmo tempo, quanto tempo esperar, e o que fazer com os que falham."]
        ],
        quiz: [
          { p: "`await asyncio.gather(a(), b(), c())`, e `c` acaba primeiro. Por que ordem vêm os resultados?", o: ["c, depois os outros","a, b, c","Aleatória"], c: 1,
            e: "`gather` devolve sempre pela ordem em que as corotinas foram passadas, seja qual for a ordem em que acabaram." }
        ],
        exercicio: {
          ficheiro: "lote_async.py",
          soLocal: true,
          enunciado: "Escreve a corotina `obter_todos(ids, obter, limite=5, tempo_maximo=1.0)`. Chama `await obter(id)` para todos os ids ao mesmo tempo, com `gather`, mas nunca mais do que `limite` de cada vez (usa um `asyncio.Semaphore`). Cada chamada tem no máximo `tempo_maximo` segundos. Devolve a lista dos resultados pela ordem dos ids, com `None` no lugar dos que falharam ou excederam o tempo.",
          inicio: String.raw`import asyncio


async def obter_todos(ids, obter, limite=5, tempo_maximo=1.0):
    pass
`,
          testes: String.raw`import asyncio
import time

from lote_async import obter_todos


async def dobro(i):
    await asyncio.sleep(0.05)
    return i * 2


def test_resultados_pela_ordem():
    assert asyncio.run(obter_todos([3, 1, 2], dobro)) == [6, 2, 4]


def test_corre_ao_mesmo_tempo():
    inicio = time.perf_counter()
    asyncio.run(obter_todos(list(range(20)), dobro, limite=20))
    assert time.perf_counter() - inicio < 0.5


def test_respeita_o_limite():
    ativos, maximo = [0], [0]

    async def contar(i):
        ativos[0] += 1
        maximo[0] = max(maximo[0], ativos[0])
        await asyncio.sleep(0.02)
        ativos[0] -= 1
        return i

    asyncio.run(obter_todos(list(range(15)), contar, limite=4))
    assert maximo[0] == 4


def test_falhas_viram_none():
    async def as_vezes(i):
        if i == 2:
            raise ConnectionError("falhou")
        return i

    assert asyncio.run(obter_todos([1, 2, 3], as_vezes)) == [1, None, 3]


def test_lentos_demais_viram_none():
    async def um_lento(i):
        await asyncio.sleep(5 if i == 1 else 0.01)
        return i

    inicio = time.perf_counter()
    assert asyncio.run(obter_todos([0, 1, 2], um_lento, tempo_maximo=0.2)) == [0, None, 2]
    assert time.perf_counter() - inicio < 1
`
        }
      }
  ]
});
