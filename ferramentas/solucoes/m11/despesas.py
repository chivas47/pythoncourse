def interpretar(linha):
    """Devolve (categoria, valor) ou levanta ValueError com o motivo."""
    if ";" not in linha:
        raise ValueError(f"falta o ; em {linha!r}")
    categoria, texto_valor = linha.split(";", 1)
    categoria = categoria.strip().lower()
    if not categoria:
        raise ValueError(f"falta a categoria em {linha!r}")
    try:
        valor = float(texto_valor.strip().replace(",", "."))
    except ValueError:
        raise ValueError(f"valor inválido em {linha!r}") from None
    if valor <= 0:
        raise ValueError(f"o valor tem de ser positivo em {linha!r}")
    return categoria, valor


def acrescentar(totais, categoria, valor):
    """Devolve um dicionário novo com o valor somado à categoria."""
    novo = dict(totais)
    novo[categoria] = novo.get(categoria, 0) + valor
    return novo


def resumo(totais):
    """Devolve as linhas do relatório, a mais cara primeiro, e o total no fim."""
    ordenadas = sorted(totais.items(), key=lambda par: (-par[1], par[0]))
    linhas = [f"{categoria}: {valor:.2f}" for categoria, valor in ordenadas]
    linhas.append(f"total: {sum(totais.values()):.2f}")
    return linhas


def main():
    """Lê linhas até 'fim' e mostra o resumo. É a única que fala com a pessoa."""
    totais = {}
    while True:
        linha = input("> ")
        if linha.strip().lower() == "fim":
            break
        try:
            categoria, valor = interpretar(linha)
        except ValueError as erro:
            print(f"linha ignorada: {erro}")
            continue
        totais = acrescentar(totais, categoria, valor)
    for linha in resumo(totais):
        print(linha)
    return 0


if __name__ == "__main__":
    main()
