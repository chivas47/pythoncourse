def nomes_ativos(utilizadores):
    return sorted(u["nome"] for u in utilizadores if u.get("ativo") and "nome" in u)
