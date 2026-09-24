def paginas_com_mais_erros(linhas, n):
    contagens = {}
    for linha in linhas:
        partes = linha.split()
        if len(partes) != 3:
            continue
        _, pagina, codigo = partes
        try:
            codigo = int(codigo)
        except ValueError:
            continue
        if codigo >= 500:
            contagens[pagina] = contagens.get(pagina, 0) + 1
    ordenadas = sorted(contagens, key=lambda pagina: (-contagens[pagina], pagina))
    return ordenadas[:n]
