def criar_e_ler(cliente, produto):
    codigo, corpo = cliente.post("/produtos", produto)
    if codigo != 201:
        return codigo, None
    return cliente.get(f"/produtos/{corpo['id']}")
