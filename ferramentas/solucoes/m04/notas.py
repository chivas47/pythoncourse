def escalao(nota):
    if nota < 10:
        return "insuficiente"
    elif nota < 14:
        return "suficiente"
    elif nota < 18:
        return "bom"
    else:
        return "muito bom"
