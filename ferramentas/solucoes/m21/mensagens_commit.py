def validar_mensagem(msg):
    linhas = msg.splitlines()
    primeira = linhas[0] if linhas else ""
    if not primeira.strip():
        return ["vazia"]
    problemas = []
    if len(primeira) > 72:
        problemas.append("longa")
    if primeira.endswith("."):
        problemas.append("ponto final")
    if not primeira[0].isupper():
        problemas.append("minuscula")
    return problemas
