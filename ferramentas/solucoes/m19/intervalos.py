def interpretar_intervalo(texto):
    partes = texto.strip().split("-")
    if len(partes) > 2 or not all(p.isdigit() for p in partes):
        raise ValueError(f"intervalo inválido: {texto!r}")
    inicio, fim = int(partes[0]), int(partes[-1])
    if inicio > fim:
        raise ValueError(f"o início é maior do que o fim: {texto!r}")
    return list(range(inicio, fim + 1))
