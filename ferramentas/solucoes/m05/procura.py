def primeiro_algarismo(texto):
    for i in range(len(texto)):
        if texto[i].isdigit():
            return i
    return -1


def ate_ao_ponto(texto):
    resultado = ""
    for c in texto:
        if c == ".":
            break
        resultado += c
    return resultado


def sem_espacos(texto):
    resultado = ""
    for c in texto:
        if c == " ":
            continue
        resultado += c
    return resultado
