def guardar_linhas(caminho, linhas):
    with open(caminho, "w", encoding="utf-8") as f:
        for linha in linhas:
            f.write(linha + "\n")


def acrescentar_linha(caminho, linha):
    with open(caminho, "a", encoding="utf-8") as f:
        f.write(linha + "\n")


def contar_linhas(caminho):
    total = 0
    with open(caminho, encoding="utf-8") as f:
        for linha in f:
            if linha.strip():
                total += 1
    return total
