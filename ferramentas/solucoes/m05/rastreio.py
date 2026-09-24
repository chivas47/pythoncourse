def soma_pares(n):
    # soma os pares de 1 até n, inclusive
    total = 0
    for i in range(0, n + 1, 2):
        total += i
    return total


def fatorial(n):
    # devolve 1 x 2 x ... x n; o fatorial de 0 é 1
    resultado = 1
    for i in range(1, n + 1):
        resultado *= i
    return resultado


def contar_algarismos(texto):
    # conta os algarismos do texto
    total = 0
    i = 0
    while i < len(texto):
        if texto[i].isdigit():
            total += 1
        i += 1
    return total
