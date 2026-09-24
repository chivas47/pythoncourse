def multiplicador(fator):
    def multiplicar(n):
        return n * fator

    return multiplicar


def contador(inicio=0):
    total = inicio

    def mais_um():
        nonlocal total
        total += 1
        return total

    return mais_um


def validador_intervalo(minimo, maximo):
    def validar(valor):
        return minimo <= valor <= maximo

    return validar
