def multiplicador(fator):
    def multiplicar(x):
        return x * fator

    return multiplicar


def multiplicadores(fatores):
    return [multiplicador(f) for f in fatores]
