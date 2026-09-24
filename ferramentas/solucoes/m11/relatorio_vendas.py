def analisar(linha):
    partes = linha.split(";")
    if len(partes) != 3:
        return None
    produto, preco, quantidade = partes
    try:
        return produto, round(float(preco) * int(quantidade), 2)
    except ValueError:
        return None


def agregar(linhas):
    totais = {}
    for linha in linhas:
        resultado = analisar(linha)
        if resultado is None:
            continue
        produto, valor = resultado
        totais[produto] = round(totais.get(produto, 0) + valor, 2)
    return totais


def relatorio(linhas):
    totais = agregar(linhas)
    ordenados = sorted(totais.items(), key=lambda par: (-par[1], par[0]))
    return [f"{produto}: {total:.2f}" for produto, total in ordenados]
