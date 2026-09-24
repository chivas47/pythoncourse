def mais_frequente(palavras):
    contagens = {}
    for p in palavras:
        contagens[p] = contagens.get(p, 0) + 1
    melhor = None
    for palavra, n in sorted(contagens.items()):
        if melhor is None or n > contagens[melhor]:
            melhor = palavra
    return melhor
