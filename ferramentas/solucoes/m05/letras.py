VOGAIS = "aeiouáàâãéêíóôõú"


def contar_vogais(texto):
    total = 0
    for letra in texto.lower():
        if letra in VOGAIS:
            total += 1
    return total


def tem_algarismo(texto):
    for letra in texto:
        if letra.isdigit():
            return True
    return False


def inverter(texto):
    resultado = ""
    for letra in texto:
        resultado = letra + resultado
    return resultado
