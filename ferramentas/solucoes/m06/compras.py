def resumo(valores):
    total = 0
    for v in valores:
        if v is None:
            break
        if v > 0:
            total += v
    return total


def acima_de(precos, limite):
    resultado = []
    for p in precos:
        if p > limite:
            resultado.append(p)
    return resultado


def mais_caro(precos):
    if not precos:
        return None
    return max(precos)
