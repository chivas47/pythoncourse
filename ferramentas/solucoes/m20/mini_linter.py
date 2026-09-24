LIMITE = 88


def verificar_estilo(linhas):
    problemas = []
    for numero, linha in enumerate(linhas, start=1):
        if len(linha) > LIMITE:
            problemas.append((numero, "linha demasiado longa"))
        if linha.endswith(" "):
            problemas.append((numero, "espaços no fim"))
    return problemas
