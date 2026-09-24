import asyncio

PRECOS = {"teclado": 39.9, "rato": 12.5}


async def obter_preco_demo(produto):
    await asyncio.sleep(0.01)
    return PRECOS.get(produto)


async def total(produtos, obter_preco):
    soma = 0
    for produto in produtos:
        preco = await obter_preco(produto)
        soma += preco or 0
    return soma


def main():
    return asyncio.run(total(["teclado", "rato"], obter_preco_demo))
