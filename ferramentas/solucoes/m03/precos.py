def com_iva(preco, taxa=0.23):
    return round(preco * (1 + taxa), 2)


def formatar(valor, moeda="€"):
    return f"{valor:.2f} {moeda}"
