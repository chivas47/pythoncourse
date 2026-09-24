import os
import time
from contextlib import contextmanager


class Cronometro:
    def __enter__(self):
        self.inicio = time.perf_counter()
        return self

    def __exit__(self, tipo, valor, rastreio):
        self.duracao = time.perf_counter() - self.inicio
        return False


@contextmanager
def variaveis_de_ambiente(**valores):
    antigos = {nome: os.environ.get(nome) for nome in valores}
    os.environ.update(valores)
    try:
        yield
    finally:
        for nome, antigo in antigos.items():
            if antigo is None:
                os.environ.pop(nome, None)
            else:
                os.environ[nome] = antigo
