def ordenar_por(registos, chave):
    resultado = list(registos)
    for i in range(1, len(resultado)):
        atual = resultado[i]
        j = i - 1
        while j >= 0 and resultado[j][chave] > atual[chave]:
            resultado[j + 1] = resultado[j]
            j -= 1
        resultado[j + 1] = atual
    return resultado
