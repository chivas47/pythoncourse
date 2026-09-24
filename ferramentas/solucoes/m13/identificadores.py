__all__ = ["slug"]


def _normalizar(texto):
    return texto.strip().lower()


def slug(texto):
    return "-".join(_normalizar(texto).split())
