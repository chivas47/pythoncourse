import functools


def contar_chamadas(funcao):
    @functools.wraps(funcao)
    def embrulho(*args, **kwargs):
        embrulho.chamadas += 1
        return funcao(*args, **kwargs)

    embrulho.chamadas = 0
    return embrulho


def memorizar(funcao):
    guardados = {}

    @functools.wraps(funcao)
    def embrulho(*args):
        if args not in guardados:
            guardados[args] = funcao(*args)
        return guardados[args]

    return embrulho
