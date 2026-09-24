from collections import Counter, defaultdict, deque, namedtuple

Ponto = namedtuple("Ponto", "x y")


def mais_comuns(palavras, n):
    return Counter(palavras).most_common(n)


def agrupar_por_tamanho(palavras):
    grupos = defaultdict(list)
    for palavra in palavras:
        grupos[len(palavra)].append(palavra)
    return dict(grupos)


def ultimos(iteravel, n):
    return list(deque(iteravel, maxlen=n))
