import asyncio


async def obter_todos(ids, obter, limite=5, tempo_maximo=1.0):
    semaforo = asyncio.Semaphore(limite)

    async def um(id_):
        async with semaforo:
            try:
                return await asyncio.wait_for(obter(id_), timeout=tempo_maximo)
            except Exception:
                return None

    return await asyncio.gather(*(um(id_) for id_ in ids))
