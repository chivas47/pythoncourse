import logging

logger = logging.getLogger("relatorio")


def processar(valores):
    total = 0
    for valor in valores:
        if valor < 0:
            logger.warning("valor negativo ignorado: %s", valor)
            continue
        total += valor
    return total
