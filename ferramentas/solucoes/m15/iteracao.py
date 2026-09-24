class ContagemDecrescente:
    def __init__(self, inicio):
        self.atual = inicio

    def __iter__(self):
        return self

    def __next__(self):
        if self.atual < 1:
            raise StopIteration
        valor = self.atual
        self.atual -= 1
        return valor


def primeiros(iteravel, n):
    it = iter(iteravel)
    resultado = []
    while len(resultado) < n:
        try:
            resultado.append(next(it))
        except StopIteration:
            break
    return resultado


def pares_consecutivos(iteravel):
    it = iter(iteravel)
    try:
        anterior = next(it)
    except StopIteration:
        return []
    pares = []
    for atual in it:
        pares.append((anterior, atual))
        anterior = atual
    return pares
