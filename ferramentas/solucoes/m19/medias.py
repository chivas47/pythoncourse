def media(notas):
    if not notas:
        raise ValueError("não há média de uma lista vazia")
    return round(sum(notas) / len(notas), 1)


def classificar(media):
    return "aprovado" if media >= 9.5 else "reprovado"
