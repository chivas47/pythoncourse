import functools


def tentar_de_novo(tentativas=3, excecoes=(ConnectionError,)):
    if tentativas < 1:
        raise ValueError(f"número de tentativas inválido: {tentativas}")

    def decorador(funcao):
        @functools.wraps(funcao)
        def embrulho(*args, **kwargs):
            for tentativa in range(1, tentativas + 1):
                try:
                    return funcao(*args, **kwargs)
                except excecoes:
                    if tentativa == tentativas:
                        raise

        return embrulho

    return decorador
