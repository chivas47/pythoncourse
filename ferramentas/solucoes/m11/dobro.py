import sys


def main(argv):
    if not argv:
        print("uso: python dobro.py NUMERO", file=sys.stderr)
        return 2
    try:
        numero = float(argv[0])
    except ValueError:
        print(f"não é um número: {argv[0]}", file=sys.stderr)
        return 1
    print(numero * 2)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
