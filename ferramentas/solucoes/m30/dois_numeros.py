def par_que_soma(valores, alvo):
    vistos = {}
    for i, valor in enumerate(valores):
        if alvo - valor in vistos:
            return vistos[alvo - valor], i
        vistos[valor] = i
    return None
