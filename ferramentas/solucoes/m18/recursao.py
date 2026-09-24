def soma_profunda(estrutura):
    total = 0
    for elemento in estrutura:
        if isinstance(elemento, list):
            total += soma_profunda(elemento)
        elif isinstance(elemento, (int, float)) and not isinstance(elemento, bool):
            total += elemento
    return total
