class NaoEncontrado(Exception):
    pass


class Repositorio:
    def __init__(self):
        self._produtos = {}
        self._proximo_id = 1

    def criar(self, produto):
        novo = {**produto, "id": self._proximo_id}
        self._produtos[novo["id"]] = novo
        self._proximo_id += 1
        return novo

    def obter(self, id_):
        if id_ not in self._produtos:
            raise NaoEncontrado(f"produto {id_} não existe")
        return self._produtos[id_]

    def listar(self):
        return list(self._produtos.values())

    def apagar(self, id_):
        if id_ not in self._produtos:
            raise NaoEncontrado(f"produto {id_} não existe")
        del self._produtos[id_]
