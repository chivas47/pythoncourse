def partir_em_lotes(itens, tamanho):
    if tamanho < 1:
        raise ValueError(f"tamanho de lote inválido: {tamanho}")
    return [itens[i : i + tamanho] for i in range(0, len(itens), tamanho)]
