def problemas_do_pr(pr):
    problemas = []
    if not pr["titulo"].strip():
        problemas.append("sem titulo")
    if not pr["descricao"].strip():
        problemas.append("sem descricao")
    if pr["linhas"] > 400:
        problemas.append("demasiado grande")
    if not pr["testes"]:
        problemas.append("sem testes")
    return problemas
