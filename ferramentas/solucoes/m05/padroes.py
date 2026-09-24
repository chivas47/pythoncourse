def triangulo(n):
    texto = ""
    for i in range(1, n + 1):
        texto += "*" * i + "\n"
    return texto


def quadrado_oco(n):
    texto = ""
    for linha in range(n):
        for coluna in range(n):
            na_borda = linha == 0 or linha == n - 1 or coluna == 0 or coluna == n - 1
            texto += "#" if na_borda else " "
        texto += "\n"
    return texto


def pares_com_soma(n, alvo):
    total = 0
    for a in range(1, n + 1):
        for b in range(a + 1, n + 1):
            if a + b == alvo:
                total += 1
    return total
