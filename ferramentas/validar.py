"""Valida todos os exercícios do curso.

Para cada exercício, confirma que:
  1. os testes passam com a solução de referência (pytest verdadeiro);
  2. os testes falham com o código inicial que o aluno recebe;
  3. o corredor do browser dá o mesmo veredicto nos dois casos (exceto exercícios só locais);
  4. o nome do ficheiro é único no curso e não tapa um módulo da biblioteca padrão.

Uso, na raiz do repositório:
    python -m pip install pytest
    python ferramentas/validar.py            # tudo
    python ferramentas/validar.py 4.3 6.1    # só estes exercícios
"""

import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SOLUCOES = RAIZ / "ferramentas" / "solucoes"


def carregar():
    saida = subprocess.run(
        ["node", str(RAIZ / "ferramentas" / "exportar.js")],
        check=True, capture_output=True, text=True, encoding="utf-8",
    ).stdout
    dados = json.loads(saida)
    return dados["curso"], dados["corredor"]


def exercicios(curso):
    for modulo in curso["modulos"]:
        pasta = f"m{modulo['n']:02d}"
        for licao in modulo["licoes"]:
            if licao.get("exercicio"):
                yield licao["id"], pasta, licao["exercicio"]


def nome_testes(ex):
    return ex.get("ficheiroTestes") or f"test_{ex['ficheiro']}"


def preparar(dir_, ex, codigo):
    (dir_ / ex["ficheiro"]).write_text(codigo, encoding="utf-8")
    (dir_ / nome_testes(ex)).write_text(ex["testes"], encoding="utf-8")
    for nome, conteudo in (ex.get("apoio") or {}).items():
        (dir_ / nome).write_text(conteudo, encoding="utf-8")


def pytest_passa(dir_, ex):
    r = subprocess.run(
        [sys.executable, "-m", "pytest", "-q", "-p", "no:cacheprovider", nome_testes(ex)],
        cwd=dir_, capture_output=True, text=True, encoding="utf-8", timeout=120,
    )
    return r.returncode == 0, r.stdout[-1500:] + r.stderr[-800:]


def corredor_passa(dir_, ex, corredor):
    programa = corredor + f"\nimport json as _j\n_r = _j.loads(correr_testes({str(dir_)!r}, {nome_testes(ex)!r}))\n" \
        "print(_j.dumps(_r, ensure_ascii=False))\n"
    r = subprocess.run([sys.executable, "-c", programa], capture_output=True, text=True, encoding="utf-8", timeout=120)
    if r.returncode != 0:
        return False, r.stderr[-1500:]
    res = json.loads(r.stdout.strip().splitlines()[-1])
    ok = res["erro"] is None and res["resultados"] and all(x["ok"] for x in res["resultados"])
    return ok, json.dumps(res, ensure_ascii=False, indent=1)[-1500:]


def main(pedidos):
    curso, corredor = carregar()
    problemas = []
    vistos = {}
    padrao = set(sys.stdlib_module_names) | {"pytest", "requests", "httpx", "fastapi", "pydantic", "sqlalchemy"}
    todos = list(exercicios(curso))
    for id_, pasta, ex in todos:
        nome = ex["ficheiro"][:-3]
        if nome in padrao:
            problemas.append(f"{id_}: {ex['ficheiro']} tapa um módulo com o mesmo nome")
        for n in [ex["ficheiro"], nome_testes(ex), *(ex.get("apoio") or {})]:
            if n in vistos and vistos[n] != id_:
                problemas.append(f"{id_}: {n} já é usado em {vistos[n]}")
            vistos[n] = id_
    for id_, pasta, ex in todos:
        if pedidos and id_ not in pedidos:
            continue
        solucao = SOLUCOES / pasta / ex["ficheiro"]
        if not solucao.exists():
            problemas.append(f"{id_}: falta a solução em {solucao.relative_to(RAIZ)}")
            continue
        for caso, codigo, deve_passar in (("solução", solucao.read_text(encoding="utf-8"), True),
                                          ("código inicial", ex["inicio"], False)):
            with tempfile.TemporaryDirectory() as tmp:
                dir_ = Path(tmp)
                preparar(dir_, ex, codigo)
                passou, log = pytest_passa(dir_, ex)
                if passou != deve_passar:
                    problemas.append(f"{id_}: pytest {'falha' if deve_passar else 'passa'} com o {caso}\n{log}")
                    continue
                if ex.get("soLocal"):
                    continue
            with tempfile.TemporaryDirectory() as tmp:
                dir_ = Path(tmp)
                preparar(dir_, ex, codigo)
                passou, log = corredor_passa(dir_, ex, corredor)
                if passou != deve_passar:
                    problemas.append(f"{id_}: o corredor do browser {'falha' if deve_passar else 'passa'} com o {caso}\n{log}")
        print(f"ok {id_} {pasta}/{ex['ficheiro']}", flush=True)
    ruff = shutil.which("ruff")
    if ruff:
        # as soluções são o exemplo do que o aluno deve entregar: têm de passar no ruff, como o dele
        for comando in (["format", "--check"], ["check"]):
            r = subprocess.run([ruff, *comando, str(SOLUCOES)], capture_output=True, text=True, encoding="utf-8")
            if r.returncode != 0:
                problemas.append(f"ruff {' '.join(comando)} falha nas soluções:\n{r.stdout}{r.stderr}")
    else:
        print("aviso: ruff não encontrado, as soluções não foram verificadas quanto ao estilo")
    total = sum(1 for i, _, _ in todos if not pedidos or i in pedidos)
    if problemas:
        print(f"\n{len(problemas)} problema(s) em {total} exercício(s):\n")
        print("\n\n".join(problemas))
        return 1
    print(f"\n{total} exercício(s) validados.")
    return 0


if __name__ == "__main__":
    sys.exit(main(set(sys.argv[1:])))
