def soma_algarismos(texto):
    total = 0
    for c in texto:
        if c.isdigit():
            total += int(c)
    return total


def maior_algarismo(texto):
    maior = None
    for c in texto:
        if c.isdigit():
            d = int(c)
            if maior is None or d > maior:
                maior = d
    return maior


def apenas_letras(texto):
    letras = ""
    for c in texto:
        if c.isalpha():
            letras += c
    return letras
