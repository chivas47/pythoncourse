import csv
import io


def total_por_categoria(texto):
    totais = {}
    for linha in csv.DictReader(io.StringIO(texto)):
        bruto = (linha["valor"] or "").strip()
        if not bruto:
            continue
        categoria = linha["categoria"].strip()
        totais[categoria] = totais.get(categoria, 0) + float(bruto)
    return totais


def escrever_totais(caminho, totais):
    with open(caminho, "w", encoding="utf-8", newline="") as f:
        escritor = csv.writer(f)
        escritor.writerow(["categoria", "total"])
        for categoria, total in sorted(totais.items()):
            escritor.writerow([categoria, f"{total:.2f}"])
