CRITERIOS = ["dados_reais", "problema_proprio", "ambito_fechado", "tem_testes"]


def avaliar_projeto(projeto):
    return [criterio for criterio in CRITERIOS if not projeto.get(criterio)]
