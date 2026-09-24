from pathlib import Path


def caminho_de_saida(entrada):
    entrada = Path(entrada)
    return entrada.parent / "saida" / entrada.with_suffix(".json").name


def listar_csv(pasta):
    return sorted(p.name for p in Path(pasta).glob("*.csv"))
