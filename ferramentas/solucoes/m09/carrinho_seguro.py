def adicionar(item, carrinho=None):
    novo = list(carrinho) if carrinho is not None else []
    novo.append(item)
    return novo
