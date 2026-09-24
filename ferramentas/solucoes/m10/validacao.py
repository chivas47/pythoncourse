class ErroDeValidacao(Exception):
    pass


def validar(pedido):
    if not pedido.get("email"):
        raise ErroDeValidacao("email em falta")
    if pedido.get("quantidade", 0) <= 0:
        raise ErroDeValidacao("quantidade tem de ser positiva")
    return True
