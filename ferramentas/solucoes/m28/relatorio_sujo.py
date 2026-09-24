def processar(linhas):
    totais = {}
    rejeitadas = []
    for numero, linha in enumerate(linhas, start=1):
        produto = (linha.get("produto") or "").strip()
        if not produto:
            rejeitadas.append((numero, "produto em falta"))
            continue
        try:
            valor = float((linha.get("valor") or "").strip().replace(",", "."))
        except ValueError:
            rejeitadas.append((numero, "valor invalido"))
            continue
        totais[produto] = round(totais.get(produto, 0) + valor, 2)
    return totais, rejeitadas
