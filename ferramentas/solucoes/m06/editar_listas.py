def remover_todos(lista, valor):
    resultado = []
    for x in lista:
        if x != valor:
            resultado.append(x)
    return resultado


def inserir_ordenado(lista, valor):
    nova = lista.copy()
    nova.append(valor)
    nova.sort()
    return nova


def mediana(valores):
    if not valores:
        raise ValueError("não há mediana de uma lista vazia")
    ordenados = sorted(valores)
    meio = len(ordenados) // 2
    if len(ordenados) % 2 == 1:
        return ordenados[meio]
    return (ordenados[meio - 1] + ordenados[meio]) / 2
