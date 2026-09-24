def cobertura(requisitos, competencias):
    tenho = {c.strip().lower() for c in competencias}
    faltam = [r.strip() for r in requisitos if r.strip().lower() not in tenho]
    if not requisitos:
        return 100, []
    return round(100 * (len(requisitos) - len(faltam)) / len(requisitos)), faltam
