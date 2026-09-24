def preco_bilhete(idade, estudante):
    if idade < 6:
        return 0
    elif idade > 65 or estudante:
        return 4.5
    else:
        return 9


def pode_conduzir(idade, tem_carta):
    return idade >= 18 and tem_carta


def nome_a_mostrar(nome):
    limpo = nome.strip()
    return limpo if limpo else "anónimo"
