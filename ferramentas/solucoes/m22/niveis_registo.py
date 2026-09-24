NIVEIS = {"DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"}


def resumo_erros(linhas):
    contagens = {}
    for linha in linhas:
        partes = linha.split()
        nivel = partes[2] if len(partes) >= 3 and partes[2] in NIVEIS else "INVALIDO"
        contagens[nivel] = contagens.get(nivel, 0) + 1
    return contagens
