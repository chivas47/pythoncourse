class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def depositar(self, valor):
        if valor <= 0:
            raise ValueError(f"depósito tem de ser positivo, recebi {valor}")
        self.saldo += valor
        return self.saldo

    def levantar(self, valor):
        if valor <= 0:
            raise ValueError(f"levantamento tem de ser positivo, recebi {valor}")
        if valor > self.saldo:
            raise ValueError(f"saldo insuficiente: pediu {valor}, tem {self.saldo}")
        self.saldo -= valor
        return self.saldo

    def __repr__(self):
        return f"Conta({self.titular!r}, {self.saldo!r})"
