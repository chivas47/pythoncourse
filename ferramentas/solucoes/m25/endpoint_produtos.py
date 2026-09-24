def criar_produto(dados):
    erros = []
    nome = dados.get("nome")
    preco = dados.get("preco")
    if not isinstance(nome, str) or not nome.strip():
        erros.append("nome")
    if isinstance(preco, bool) or not isinstance(preco, (int, float)) or preco <= 0:
        erros.append("preco")
    if erros:
        return 422, {"erros": erros}
    return 201, {"nome": nome, "preco": preco, "quantidade": dados.get("quantidade", 1)}
