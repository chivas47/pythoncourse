def total(*valores, desconto=0):
    return round(sum(valores) * (1 - desconto / 100), 2)


def etiqueta(nome, **atributos):
    if not atributos:
        return nome
    partes = [f"{chave}={valor}" for chave, valor in sorted(atributos.items())]
    return f"{nome} ({', '.join(partes)})"


def exportar(dados, *, formato="csv"):
    return f"{len(dados)} registos em {formato}"
