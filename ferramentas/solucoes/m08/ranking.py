def top(alunos, n):
    ordenados = sorted(alunos, key=lambda a: (-a["nota"], a["nome"]))
    return [a["nome"] for a in ordenados[:n]]
