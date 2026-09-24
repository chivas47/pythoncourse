import heapq

PARES = {")": "(", "]": "[", "}": "{"}


def parenteses_equilibrados(texto):
    pilha = []
    for c in texto:
        if c in "([{":
            pilha.append(c)
        elif c in PARES:
            if not pilha or pilha.pop() != PARES[c]:
                return False
    return not pilha


def k_maiores(valores, k):
    return heapq.nlargest(k, valores)


def por_prioridade(tarefas):
    heap = []
    for ordem, (prioridade, nome) in enumerate(tarefas):
        heapq.heappush(heap, (prioridade, ordem, nome))
    return [heapq.heappop(heap)[2] for _ in range(len(heap))]
