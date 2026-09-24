def soma_ate(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total


def tabuada(n):
    texto = ""
    for i in range(1, 11):
        texto += f"{n} x {i} = {n * i}\n"
    return texto
