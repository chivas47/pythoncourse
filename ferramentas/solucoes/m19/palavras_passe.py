def validar(password):
    problemas = []
    if len(password) < 8:
        problemas.append("curta")
    if not any(c.isdigit() for c in password):
        problemas.append("sem algarismo")
    if not any(c.isupper() for c in password):
        problemas.append("sem maiuscula")
    return problemas
