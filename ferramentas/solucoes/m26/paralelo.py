from concurrent.futures import ThreadPoolExecutor, as_completed


def buscar_todos(ids, buscar, max_trabalhadores=4):
    resultados, erros = {}, {}
    with ThreadPoolExecutor(max_workers=max_trabalhadores) as executor:
        futuros = {executor.submit(buscar, id_): id_ for id_ in ids}
        for futuro in as_completed(futuros):
            id_ = futuros[futuro]
            try:
                resultados[id_] = futuro.result()
            except Exception as erro:
                erros[id_] = str(erro)
    return resultados, erros
