from collections.abc import Sequence
from typing import Protocol, TypedDict, TypeVar, runtime_checkable

T = TypeVar("T")


class Utilizador(TypedDict):
    nome: str
    email: str
    ativo: bool


def ativos(utilizadores: list[Utilizador]) -> list[str]:
    return [u["email"] for u in utilizadores if u["ativo"]]


@runtime_checkable
class Canal(Protocol):
    def enviar(self, mensagem: str) -> bool: ...


def notificar_todos(canais: list[Canal], mensagem: str) -> int:
    return sum(1 for canal in canais if canal.enviar(mensagem))


def primeiro(itens: Sequence[T]) -> T | None:
    return itens[0] if itens else None
