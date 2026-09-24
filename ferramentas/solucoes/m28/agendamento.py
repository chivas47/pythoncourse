from datetime import timedelta


def deve_correr(ultima, agora, intervalo_min):
    if ultima is None:
        return True
    if agora < ultima:
        raise ValueError(f"o relógio andou para trás: {agora} é antes de {ultima}")
    return agora - ultima >= timedelta(minutes=intervalo_min)
