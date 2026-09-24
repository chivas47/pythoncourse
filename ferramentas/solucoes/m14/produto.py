from dataclasses import dataclass


@dataclass
class Produto:
    nome: str
    preco: float
    quantidade: int = 1

    def total(self):
        return round(self.preco * self.quantidade, 2)


@dataclass(frozen=True)
class Coordenada:
    latitude: float
    longitude: float
