def estado_saude(verificacoes):
    falhas = sorted(nome for nome, ok in verificacoes.items() if not ok)
    if not falhas:
        return "ok", []
    if "base_de_dados" in falhas:
        return "em baixo", falhas
    return "degradado", falhas
