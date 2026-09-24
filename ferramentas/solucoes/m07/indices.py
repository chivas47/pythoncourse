def com_iva(precos):
    return {nome: round(p * 1.23, 2) for nome, p in precos.items() if p > 0}


def indice_por_id(registos):
    return {r["id"]: r for r in registos}


def inverter(dicionario):
    return {valor: chave for chave, valor in dicionario.items()}
