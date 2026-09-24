def aplicar_desconto(precos, percentagem):
    return [round(p * (1 - percentagem / 100), 2) for p in precos]
