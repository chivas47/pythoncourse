class Retangulo:
    def __init__(self, largura, altura):
        if largura <= 0 or altura <= 0:
            raise ValueError(f"medidas inválidas: {largura} x {altura}")
        self.largura = largura
        self.altura = altura

    def area(self):
        return self.largura * self.altura

    def perimetro(self):
        return 2 * (self.largura + self.altura)

    def e_quadrado(self):
        return self.largura == self.altura

    def escalar(self, fator):
        return Retangulo(self.largura * fator, self.altura * fator)
