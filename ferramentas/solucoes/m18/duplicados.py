def tem_duplicados(itens):
    vistos = set()
    for item in itens:
        if item in vistos:
            return True
        vistos.add(item)
    return False
