def resolver(atual, caminho):
    if caminho.startswith("/"):
        partes = []
    else:
        partes = atual.split("/")
    for pedaco in caminho.split("/"):
        if pedaco == "" or pedaco == ".":
            continue
        if pedaco == "..":
            if partes:
                partes.pop()
        else:
            partes.append(pedaco)
    limpas = []
    for p in partes:
        if p:
            limpas.append(p)
    return "/" + "/".join(limpas)


def iniciais(nome):
    letras = ""
    for palavra in nome.split():
        letras += palavra[0].upper()
    return letras
