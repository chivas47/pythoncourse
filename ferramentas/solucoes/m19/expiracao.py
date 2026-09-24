from datetime import datetime, timedelta


def esta_expirado(criado_em, agora=None, dias=30):
    if agora is None:
        agora = datetime.now()
    return agora - criado_em > timedelta(days=dias)
