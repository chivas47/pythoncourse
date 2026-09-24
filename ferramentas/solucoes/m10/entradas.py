def para_numero(texto):
    try:
        return float(texto.strip().replace(",", "."))
    except ValueError:
        return None


def pedir_inteiro(pergunta):
    while True:
        try:
            return int(input(pergunta))
        except ValueError:
            print("Isso não é um número inteiro.")
