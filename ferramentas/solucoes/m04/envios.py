def estado_encomenda(pago, em_stock, morada):
    if not pago:
        return "por pagar"
    if not em_stock:
        return "sem stock"
    if not morada:
        return "falta a morada"
    return "a enviar"


def custo_envio(peso_kg):
    if peso_kg <= 0:
        raise ValueError(f"peso inválido: {peso_kg}")
    if peso_kg <= 2:
        return 3.5
    if peso_kg <= 10:
        return 6.0
    return 12.0
