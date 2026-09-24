class Dinheiro:
    def __init__(self, centimos, moeda="EUR"):
        if type(centimos) is not int:
            raise TypeError("os cêntimos têm de ser um inteiro")
        self.centimos = centimos
        self.moeda = moeda

    def __repr__(self):
        return f"Dinheiro({self.centimos!r}, {self.moeda!r})"

    def __str__(self):
        return f"{self.centimos / 100:.2f} {self.moeda}"

    def __eq__(self, outro):
        if not isinstance(outro, Dinheiro):
            return NotImplemented
        return (self.centimos, self.moeda) == (outro.centimos, outro.moeda)

    def _mesma_moeda(self, outro):
        if self.moeda != outro.moeda:
            raise ValueError(f"moedas diferentes: {self.moeda} e {outro.moeda}")

    def __lt__(self, outro):
        self._mesma_moeda(outro)
        return self.centimos < outro.centimos

    def __add__(self, outro):
        self._mesma_moeda(outro)
        return Dinheiro(self.centimos + outro.centimos, self.moeda)
