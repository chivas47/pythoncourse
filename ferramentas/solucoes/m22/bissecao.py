def primeiro_mau(versoes, e_mau):
    inicio, fim = 0, len(versoes) - 1
    resposta = -1
    while inicio <= fim:
        meio = (inicio + fim) // 2
        if e_mau(versoes[meio]):
            resposta = meio
            fim = meio - 1
        else:
            inicio = meio + 1
    return resposta
