def aplicar(existentes, novos):
    resultado = dict(existentes)
    resumo = {"criados": 0, "atualizados": 0, "iguais": 0}
    for id_, registo in novos.items():
        if id_ not in existentes:
            resumo["criados"] += 1
        elif existentes[id_] == registo:
            resumo["iguais"] += 1
        else:
            resumo["atualizados"] += 1
        resultado[id_] = registo
    return resultado, resumo
