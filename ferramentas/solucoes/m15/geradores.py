def linhas_validas(linhas):
    for linha in linhas:
        limpa = linha.strip()
        if not limpa or limpa.startswith("#"):
            continue
        yield limpa
