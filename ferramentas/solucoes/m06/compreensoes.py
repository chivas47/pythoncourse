def precos_com_iva(precos):
    return [round(p * 1.23, 2) for p in precos if p > 0]


def iniciais_maiusculas(palavras):
    return [p[0].upper() for p in palavras if p]


def ha_negativos(valores):
    return any(v < 0 for v in valores)
