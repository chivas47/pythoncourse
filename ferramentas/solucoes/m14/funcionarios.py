class Funcionario:
    def __init__(self, nome, salario_base):
        self.nome = nome
        self.salario_base = salario_base

    def salario(self):
        return self.salario_base

    def descricao(self):
        return f"{self.nome}: {self.salario():.2f}"


class Gestor(Funcionario):
    def __init__(self, nome, salario_base, bonus):
        super().__init__(nome, salario_base)
        self.bonus = bonus

    def salario(self):
        return super().salario() + self.bonus


class Estagiario(Funcionario):
    def salario(self):
        return super().salario() * 0.8


def folha_salarial(funcionarios):
    return sum(f.salario() for f in funcionarios)
