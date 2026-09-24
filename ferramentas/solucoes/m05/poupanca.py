def anos_ate_objetivo(inicial, taxa, objetivo):
    if inicial <= 0 or taxa <= 0:
        raise ValueError("o depósito e a taxa têm de ser positivos")
    saldo = inicial
    anos = 0
    while saldo < objetivo:
        saldo = saldo * (1 + taxa)
        anos += 1
    return anos
