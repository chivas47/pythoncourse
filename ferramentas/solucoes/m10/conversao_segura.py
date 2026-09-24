def ler_int(texto, omissao=0):
    try:
        return int(texto)
    except ValueError:
        return omissao
