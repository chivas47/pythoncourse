KM_POR_MILHA = 1.609344


def milhas_para_km(milhas):
    return round(milhas * KM_POR_MILHA, 2)


def km_para_milhas(km):
    return round(km / KM_POR_MILHA, 2)
