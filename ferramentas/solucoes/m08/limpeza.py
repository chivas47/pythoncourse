def produtos_acima_de(produtos, limite):
    """Devolve os nomes dos produtos com preço acima do limite, pela ordem original."""
    nomes = []
    for produto in produtos:
        if produto["preco"] > limite:
            nomes.append(produto["nome"])
    return nomes
