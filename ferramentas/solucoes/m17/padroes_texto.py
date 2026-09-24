import re

EMAIL = r"[\w.-]+@[\w-]+(?:\.[\w-]+)+"


def codigo_postal_valido(texto):
    return re.fullmatch(r"\d{4}-\d{3}", texto) is not None


def extrair_emails(texto):
    return re.findall(EMAIL, texto)


def anonimizar(texto):
    texto = re.sub(EMAIL, "<email>", texto)
    return re.sub(r"\b\d{9}\b", "<nif>", texto)
