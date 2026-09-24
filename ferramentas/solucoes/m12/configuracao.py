import json
from pathlib import Path


def carregar_config(caminho, omissoes):
    config = dict(omissoes)
    caminho = Path(caminho)
    if not caminho.exists():
        return config
    try:
        config.update(json.loads(caminho.read_text(encoding="utf-8")))
    except json.JSONDecodeError as erro:
        raise ValueError(f"configuração inválida em {caminho.name}: {erro}") from erro
    return config


def guardar_config(caminho, config):
    texto = json.dumps(config, ensure_ascii=False, indent=2, sort_keys=True)
    Path(caminho).write_text(texto + "\n", encoding="utf-8")
