class Notificador:
    def __init__(self, canal):
        self.canal = canal

    def enviar(self, mensagem):
        if not mensagem.strip():
            raise ValueError("mensagem vazia")
        return self.canal.enviar(mensagem)
