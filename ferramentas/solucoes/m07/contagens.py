def total_por_loja(vendas):
    totais = {}
    for venda in vendas:
        loja = venda["loja"]
        totais[loja] = totais.get(loja, 0) + venda["valor"]
    return totais


def contar_palavras(texto):
    contagem = {}
    for palavra in texto.lower().split():
        contagem[palavra] = contagem.get(palavra, 0) + 1
    return contagem


def agrupar_por_inicial(nomes):
    grupos = {}
    for nome in nomes:
        inicial = nome[0].upper()
        if inicial not in grupos:
            grupos[inicial] = []
        grupos[inicial].append(nome)
    return grupos
