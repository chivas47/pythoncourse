SECCOES = ["O problema", "Como correr", "Testes"]


def seccoes_em_falta(readme):
    titulos = set()
    for linha in readme.splitlines():
        if linha.startswith("## "):
            titulos.add(" ".join(linha[3:].split()).lower())
    return [s for s in SECCOES if s.lower() not in titulos]
