import argparse


def construir_parser():
    parser = argparse.ArgumentParser(description="Processa um ficheiro de vendas.")
    parser.add_argument("ficheiro", help="caminho do ficheiro a processar")
    parser.add_argument("--dias", type=int, default=30, help="quantos dias para trás")
    parser.add_argument("--dry-run", action="store_true", help="não altera nada")
    parser.add_argument("--formato", choices=["csv", "json"], default="csv")
    return parser
