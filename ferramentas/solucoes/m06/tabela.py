def total_por_linha(tabela):
    totais = []
    for linha in tabela:
        totais.append(sum(linha))
    return totais


def total_por_coluna(tabela):
    if not tabela:
        return []
    totais = []
    for c in range(len(tabela[0])):
        total = 0
        for linha in tabela:
            total += linha[c]
        totais.append(total)
    return totais


def transpor(tabela):
    if not tabela:
        return []
    nova = []
    for c in range(len(tabela[0])):
        coluna = []
        for linha in tabela:
            coluna.append(linha[c])
        nova.append(coluna)
    return nova
