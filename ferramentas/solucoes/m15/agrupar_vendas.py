from collections import defaultdict
from itertools import islice


def agrupar(vendas):
    por_loja = defaultdict(list)
    for venda in vendas:
        por_loja[venda["loja"]].append(venda["valor"])
    return dict(por_loja)


def primeiras_linhas(linhas, n):
    return list(islice(linhas, n))
