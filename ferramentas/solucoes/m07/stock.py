def quantidade(stock, produto):
    if produto in stock:
        return stock[produto]
    return 0


def repor(stock, produto, n):
    novo = stock.copy()
    novo[produto] = quantidade(stock, produto) + n
    return novo


def esgotados(stock):
    resultado = []
    for produto, n in stock.items():
        if n == 0:
            resultado.append(produto)
    return sorted(resultado)
