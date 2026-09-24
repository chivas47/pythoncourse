def reconciliar(a, b, tolerancia=0.01):
    comuns = sorted(set(a) & set(b))
    diferentes = [(i, a[i], b[i]) for i in comuns if abs(a[i] - b[i]) > tolerancia]
    return {
        "so_em_a": sorted(set(a) - set(b)),
        "so_em_b": sorted(set(b) - set(a)),
        "diferentes": diferentes,
    }
