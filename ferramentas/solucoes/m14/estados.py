from enum import Enum


class Estado(Enum):
    PENDENTE = "pendente"
    PAGA = "paga"
    ENVIADA = "enviada"
    ENTREGUE = "entregue"
    CANCELADA = "cancelada"


TRANSICOES = {
    Estado.PENDENTE: {Estado.PAGA, Estado.CANCELADA},
    Estado.PAGA: {Estado.ENVIADA, Estado.CANCELADA},
    Estado.ENVIADA: {Estado.ENTREGUE},
    Estado.ENTREGUE: set(),
    Estado.CANCELADA: set(),
}


def pode_passar(atual, novo):
    return novo in TRANSICOES[atual]


def avancar(atual, novo):
    if not pode_passar(atual, novo):
        raise ValueError(f"não se pode passar de {atual.name} para {novo.name}")
    return novo


def de_texto(texto):
    return Estado(texto.strip().lower())
