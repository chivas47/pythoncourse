def nomes_de_utilizadores(cliente):
    resposta = cliente.get("/utilizadores")
    resposta.raise_for_status()
    return [u["nome"] for u in resposta.json()["resultados"]]
