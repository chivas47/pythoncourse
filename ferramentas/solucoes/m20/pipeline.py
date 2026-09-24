def resumo_pipeline(passos):
    if not passos:
        return "sem passos"
    for nome, passou in passos:
        if not passou:
            return f"vermelho: {nome}"
    return "verde"
