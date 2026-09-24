def sem_repetidos(valores):
    vistos = set()
    resultado = []
    for v in valores:
        if v not in vistos:
            vistos.add(v)
            resultado.append(v)
    return resultado


def em_falta(inscritos, presentes):
    return sorted(set(inscritos) - set(presentes))


def em_comum(a, b):
    return sorted(set(a) & set(b))
