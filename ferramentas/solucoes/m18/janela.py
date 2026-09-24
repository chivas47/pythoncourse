def maior_soma_janela(numeros, k):
    if k < 1 or k > len(numeros):
        raise ValueError(f"tamanho de janela inválido: {k}")
    soma = sum(numeros[:k])
    melhor = soma
    for i in range(k, len(numeros)):
        soma += numeros[i] - numeros[i - k]
        melhor = max(melhor, soma)
    return melhor
