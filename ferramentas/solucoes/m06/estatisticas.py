def min_max(valores):
    if not valores:
        return None
    return min(valores), max(valores)


def dividir_com_resto(a, b):
    return a // b, a % b


def trocar_pares(pares):
    trocados = []
    for a, b in pares:
        trocados.append((b, a))
    return trocados
