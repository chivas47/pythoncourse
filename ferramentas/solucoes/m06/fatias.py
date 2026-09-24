def primeiros(lista, n):
    return lista[:n]


def ultimos(lista, n):
    if n == 0:
        return []
    return lista[-n:]


def pagina(itens, numero, por_pagina):
    inicio = (numero - 1) * por_pagina
    return itens[inicio : inicio + por_pagina]


def sem_pontas(lista):
    return lista[1:-1]
