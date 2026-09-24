def ler_requisitos(texto):
    requisitos = {}
    for linha in texto.splitlines():
        linha = linha.split("#", 1)[0].strip()
        if not linha:
            continue
        if "==" in linha:
            nome, versao = linha.split("==", 1)
            requisitos[nome.strip()] = versao.strip()
        else:
            requisitos[linha] = None
    return requisitos
