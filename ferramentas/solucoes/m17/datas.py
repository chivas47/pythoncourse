from datetime import date, timedelta, timezone


def dias_ate(data, hoje):
    return (data - hoje).days


def fim_do_mes(ano, mes):
    if mes == 12:
        primeiro_do_seguinte = date(ano + 1, 1, 1)
    else:
        primeiro_do_seguinte = date(ano, mes + 1, 1)
    return primeiro_do_seguinte - timedelta(days=1)


def formatar_pt(data):
    return data.strftime("%d/%m/%Y")


def ler_data(texto):
    return date.fromisoformat(texto.strip())


def para_utc(instante):
    if instante.tzinfo is None:
        raise ValueError("a data não tem fuso horário")
    return instante.astimezone(timezone.utc)
