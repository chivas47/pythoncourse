def numerar(nomes):
    resultado = []
    for posicao, nome in enumerate(nomes, start=1):
        resultado.append(f"{posicao}. {nome}")
    return resultado


def juntar_notas(nomes, notas):
    resultado = []
    for nome, nota in zip(nomes, notas, strict=True):
        resultado.append(f"{nome}: {nota}")
    return resultado


def posicoes_de(lista, valor):
    posicoes = []
    for i, x in enumerate(lista):
        if x == valor:
            posicoes.append(i)
    return posicoes
