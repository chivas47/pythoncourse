def busca_binaria(ordenados, alvo):
    inicio, fim = 0, len(ordenados) - 1
    while inicio <= fim:
        meio = (inicio + fim) // 2
        if ordenados[meio] == alvo:
            return meio
        if ordenados[meio] < alvo:
            inicio = meio + 1
        else:
            fim = meio - 1
    return -1
