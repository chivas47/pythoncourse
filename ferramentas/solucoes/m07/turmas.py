def media_da_turma(alunos, turma):
    notas = [a["nota"] for a in alunos if a["turma"] == turma]
    if not notas:
        return None
    return round(sum(notas) / len(notas), 1)


def aprovados(alunos):
    return sorted(a["nome"] for a in alunos if a["nota"] >= 10)


def nomes_por_turma(alunos):
    grupos = {}
    for a in alunos:
        if a["turma"] not in grupos:
            grupos[a["turma"]] = []
        grupos[a["turma"]].append(a["nome"])
    return grupos
