def media(valores: list[float]) -> float | None:
    if not valores:
        return None
    return sum(valores) / len(valores)
