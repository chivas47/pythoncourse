def dividir_conta(total_cent, pessoas):
    if pessoas < 1:
        raise ValueError(f"número de pessoas inválido: {pessoas}")
    base, sobra = divmod(total_cent, pessoas)
    return [base + 1 if i < sobra else base for i in range(pessoas)]
