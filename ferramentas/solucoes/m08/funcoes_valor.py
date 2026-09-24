def aplicar_a_todos(funcao, valores):
    return [funcao(v) for v in valores]


def contar_se(condicao, valores):
    return sum(1 for v in valores if condicao(v))


def o_maior_por(valores, chave):
    if not valores:
        return None
    return max(valores, key=chave)
