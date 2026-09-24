def guardar(ligacao, produtos):
    sql = "INSERT INTO produtos (nome, preco) VALUES (?, ?)"
    with ligacao:
        ligacao.executemany(sql, produtos)
    return len(produtos)
