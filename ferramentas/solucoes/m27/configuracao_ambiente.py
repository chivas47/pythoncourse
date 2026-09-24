def config(ambiente):
    if "DATABASE_URL" not in ambiente:
        raise RuntimeError("falta a variável de ambiente DATABASE_URL")
    try:
        porta = int(ambiente.get("PORT", "8000"))
    except ValueError:
        raise RuntimeError(f"PORT inválida: {ambiente['PORT']!r}") from None
    return {
        "base_de_dados": ambiente["DATABASE_URL"],
        "debug": ambiente.get("DEBUG") == "1",
        "porta": porta,
    }
