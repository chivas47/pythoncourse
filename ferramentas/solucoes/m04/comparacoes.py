def e_maior_de_idade(idade):
    return idade >= 18


def mesma_palavra(a, b):
    return a.strip().lower() == b.strip().lower()


def no_intervalo(valor, minimo, maximo):
    return minimo <= valor <= maximo
