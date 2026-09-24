/* Módulo 13: Módulos e ambientes. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 13, fase: 3, titulo: "Módulos e ambientes",
  objetivo: "Dividir um programa em ficheiros com fronteiras claras e descrever as dependências de um projeto.",
  licoes: [
      {
        id: "13.1", titulo: "Dividir o programa em vários ficheiros", min: 14, estado: "pronta",
        meta: "No fim: separas um programa em módulos teus, importas de um para o outro e sabes onde o Python os vai procurar.",
        blocos: [
          ["p", "Quando um programa cresce, um ficheiro só deixa de chegar: é difícil encontrar as coisas e é impossível reutilizá-las noutro programa. A solução é separá-lo em módulos, e um módulo é só isto: um ficheiro `.py`. Já o fazes desde a aula 1.6, sempre que um ficheiro de testes importa o teu."],
          ["code", String.raw`# m13/unidades.py
KM_POR_MILHA = 1.609344


def milhas_para_km(milhas):
    return milhas * KM_POR_MILHA`],
          ["code", String.raw`# m13/maratona.py
from unidades import milhas_para_km

print(milhas_para_km(26.2))`],
          ["p", "`from unidades import milhas_para_km` traz só esse nome. `import unidades` traz o módulo inteiro, e usas `unidades.milhas_para_km(...)`, que é mais comprido e diz de onde vem cada coisa. As duas formas são normais; escolhe uma e mantém-na no projeto."],
          ["py", String.raw`import math
print(math.sqrt(16))

from math import pi
print(pi)`],
          ["h", "O que acontece num import"],
          ["lista", [
            "O Python procura o ficheiro, primeiro na pasta do script que correste, depois na biblioteca padrão, depois nos pacotes instalados no ambiente.",
            "Corre o ficheiro de cima a baixo, uma vez, e guarda o resultado. Um segundo `import` do mesmo módulo não o volta a correr.",
            "Guarda uma versão pré-processada na pasta `__pycache__`, que é por isso que ela aparece e vai para o `.gitignore`."
          ]],
          ["aviso", "Um ficheiro teu com o nome de um módulo do Python, como `random.py`, `json.py` ou `logging.py`, tapa o verdadeiro: `import random` passa a importar o teu, e aparecem erros como `module 'random' has no attribute 'randint'`. Quando uma importação da biblioteca padrão se porta de forma estranha, olha primeiro para os nomes dos teus ficheiros."],
          ["h", "O que vai para onde"],
          ["lista", [
            "Um módulo por assunto: `impostos.py`, `relatorios.py`, `leitura.py`.",
            "As constantes vivem junto das funções que as usam.",
            "O ficheiro que se corre é fino: importa, chama, mostra."
          ]],
          ["obra", "Num projeto real, cada ficheiro responde a uma pergunta. Onde está o cálculo do IVA? Em `impostos.py`. Quem entra na equipa encontra as coisas pelo nome dos ficheiros, sem abrir nenhum, e é assim que se mede se a divisão está boa."]
        ],
        quiz: [
          { p: "Criaste `random.py` na tua pasta e agora `random.randint` dá `AttributeError`. Porquê?", o: ["O Python está estragado","O teu ficheiro tapa o módulo random da biblioteca padrão","Falta instalar o random"], c: 1,
            e: "A pasta do script é a primeira onde o Python procura. Muda o nome do teu ficheiro e apaga o `__pycache__` que ele deixou." }
        ],
        exercicio: {
          ficheiro: "unidades.py",
          enunciado: "Cria o módulo `unidades.py` com a constante `KM_POR_MILHA = 1.609344` e duas funções que arredondam a duas casas: `milhas_para_km(milhas)` e `km_para_milhas(km)`. O ficheiro de apoio `viagem.py` importa as tuas funções e tem de funcionar sem alterações.",
          inicio: String.raw``,
          apoio: {
            "viagem.py": String.raw`from unidades import km_para_milhas


def resumo_viagem(km):
    return f"{km} km são {km_para_milhas(km)} milhas"
`
          },
          testes: String.raw`import unidades
from unidades import km_para_milhas, milhas_para_km
from viagem import resumo_viagem


def test_constante():
    assert unidades.KM_POR_MILHA == 1.609344


def test_milhas_para_km():
    assert milhas_para_km(1) == 1.61
    assert milhas_para_km(26.2) == 42.16


def test_km_para_milhas():
    assert km_para_milhas(42.195) == 26.22


def test_o_outro_modulo_usa_o_teu():
    assert resumo_viagem(42.195) == "42.195 km são 26.22 milhas"
`
        }
      },
      {
        id: "13.2", titulo: "Pacotes, import e a superfície pública", min: 14, estado: "pronta",
        meta: "No fim: divides um programa em ficheiros com fronteiras claras e sem importações circulares.",
        blocos: [
          ["p", "Um módulo é um ficheiro `.py`. Um pacote é uma pasta com módulos lá dentro. Importar é executar esse ficheiro uma vez e ficar com os nomes dele acessíveis. Não há mais mistério nenhum."],
          ["code", String.raw`vendas/
  __init__.py
  importador.py
  relatorio.py
  modelos.py
testes/
  test_relatorio.py
main.py`],
          ["h", "As formas de importar"],
          ["code", String.raw`import json                          # nome completo: json.loads(...)
import pandas as pd                  # alias, convenção da biblioteca
from pathlib import Path             # traz só o que precisas
from vendas.relatorio import resumir # o teu próprio código

from vendas.relatorio import *       # nunca faças isto`],
          ["p", "O `import *` traz nomes que não sabes quais são, esconde de onde veio cada coisa e parte assim que o outro módulo crescer. É proibido em quase todos os projetos sérios, e o `ruff` apanha-o."],
          ["h", "O guarda do __main__"],
          ["p", "Quando importas um módulo, o código no topo dele corre. Se esse ficheiro também serve de script, o que só deve correr na execução direta vai dentro do guarda."],
          ["py", String.raw`def resumir(vendas):
    return sum(vendas)

if __name__ == "__main__":
    print("a correr como script:", resumir([1, 2, 3]))`],
          ["p", "Sem este guarda, importar o módulo dispara o programa inteiro, incluindo escritas em ficheiros e chamadas de rede. É o erro que faz um teste apagar dados a sério."],
          ["h", "Importações circulares"],
          ["p", "`a.py` importa `b.py` e `b.py` importa `a.py`. Python rebenta com `ImportError: cannot import name`. Não é um problema de sintaxe, é um sinal de que as fronteiras estão mal desenhadas."],
          ["lista", [
            "Extrai o que os dois precisam para um terceiro módulo, tipicamente `modelos.py`.",
            "Inverte a dependência: quem tem regras de negócio não deve importar quem trata da entrada e saída.",
            "Em último recurso, importa dentro da função em vez de no topo, e escreve porquê num comentário."
          ]],
          ["h", "A superfície pública"],
          ["p", "Nomes que começam por underscore são privados por convenção: ninguém de fora os deve usar. `__all__` no topo do módulo declara o que sai quando alguém importa. Isto é o teu contrato com o resto da equipa."],
          ["code", String.raw`__all__ = ["resumir", "exportar"]

def _formatar_linha(v):   # detalhe interno
    ...

def resumir(vendas):      # API pública
    ...`]
        ],
        quiz: [
          { p: "Corres os testes e um deles envia mesmo um email. Que erro de estrutura é este?", o: ["Falta um mock","Código de execução no topo do módulo, sem guarda `if __name__ == '__main__'`","O teste está mal escrito"], c: 1,
            e: "Importar tem de ser inofensivo. Tudo o que tem efeitos vai para dentro de funções, chamadas pelo guarda ou pelo ponto de entrada." }
        ],
        exercicio: {
          ficheiro: "identificadores.py",
          enunciado: "Organiza um módulo de identificadores: a função privada `_normalizar(texto)` devolve o texto sem espaços nas pontas e em minúsculas; a função pública `slug(texto)` usa a primeira e troca os espaços por hífenes (espaços repetidos contam como um); e `__all__` declara apenas a função pública.",
          inicio: String.raw`__all__ = []


def _normalizar(texto):
    pass


def slug(texto):
    pass
`,
          testes: String.raw`import identificadores
from identificadores import _normalizar, slug


def test_normaliza_espacos_e_maiusculas():
    assert _normalizar("  Relatorio Final ") == "relatorio final"


def test_slug_com_hifenes():
    assert slug("  Relatorio Final ") == "relatorio-final"


def test_espacos_repetidos():
    assert slug("vendas   de  maio") == "vendas-de-maio"


def test_texto_vazio():
    assert slug("   ") == ""


def test_so_a_funcao_publica_e_exportada():
    assert identificadores.__all__ == ["slug"]
`
        }
      },
      {
        id: "13.3", titulo: "Ambientes virtuais e dependências", min: 15, estado: "pronta",
        meta: "No fim: crias um ambiente isolado por projeto e sabes explicar porque é obrigatório.",
        blocos: [
          ["p", "Desde a aula 1.6 que o teu caderno tem um `.venv`, criado com uma receita. Esta aula explica o que a receita faz e como se descreve, para outra pessoa, o que um projeto precisa de ter instalado."],
          ["p", "Instalar bibliotecas no Python do sistema é o caminho mais curto para dois projetos incompatíveis na mesma máquina. Um projeto quer a versão 1 de uma biblioteca, o outro a versão 3, e o sistema operativo quer a 2 para as próprias ferramentas dele."],
          ["p", "Um ambiente virtual é uma pasta com um Python só teu e as bibliotecas desse projeto. Cria-se em dois comandos e resolve o problema todo."],
          ["code", String.raw`python3 -m venv .venv
source .venv/bin/activate      # Linux e macOS
.venv\Scripts\activate         # Windows

pip install httpx pytest
pip list`],
          ["p", "Com o ambiente ativo, o prompt mostra `(.venv)` e `pip install` só mexe naquela pasta. Para sair, `deactivate`. A pasta `.venv` vai para o `.gitignore` e nunca para o repositório."],
          ["h", "Fixar as versões"],
          ["p", "O ficheiro de requisitos diz exatamente o que é preciso para o projeto correr. Sem ele, o teu colega instala versões diferentes e passa a tarde a perceber porque é que só na máquina dele falha."],
          ["code", String.raw`pip freeze > requirements.txt
pip install -r requirements.txt`],
          ["code", String.raw`# requirements.txt
httpx==0.27.0
pytest==8.2.0
# ferramentas de desenvolvimento
ruff==0.5.0`],
          ["h", "O formato moderno: pyproject.toml"],
          ["p", "Projetos novos declaram tudo num só ficheiro, incluindo dependências, configuração do `ruff`, do `pytest` e do `mypy`. É o que vais encontrar em qualquer repositório com menos de três anos."],
          ["code", String.raw`[project]
name = "vendas"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "httpx>=0.27",
]

[project.optional-dependencies]
dev = ["pytest>=8", "ruff>=0.5"]`],
          ["obra", "Em 2026 muitas equipas já usam o `uv` em vez de `pip` e `venv`: `uv venv`, `uv add httpx`, `uv run pytest`. Faz o mesmo, em muito menos tempo, e resolve as versões num ficheiro de bloqueio. Aprende o `pip` primeiro, porque é o que existe em todo o lado, mas sabe que o `uv` existe."],
          ["aviso", "`sudo pip install` é uma má ideia com consequências reais: instala na cópia de Python de que o sistema operativo depende. Se alguma vez leste um tutorial que pede isso, ignora essa linha e cria um ambiente virtual."],
          ["h", "Sinais de um repositório bem tratado"],
          ["lista", [
            "`.venv` e ficheiros `.env` no `.gitignore`.",
            "Um `requirements.txt` ou um `pyproject.toml` com versões, não uma lista de nomes soltos.",
            "Um README que diz em três comandos como pôr o projeto a correr.",
            "As dependências de desenvolvimento separadas das de produção."
          ]]
        ],
        quiz: [
          { p: "Um colega diz que o projeto rebenta na máquina dele e funciona na tua. Primeira pergunta?", o: ["Que sistema operativo usa","Se está no ambiente virtual do projeto e com as versões do ficheiro de requisitos instaladas","Se reiniciou o computador"], c: 1,
            e: "Quase sempre é ambiente: versão de biblioteca diferente, ambiente não ativado, ou uma dependência que só tu tens instalada globalmente. É por isso que o ficheiro de requisitos existe." }
        ],
        exercicio: {
          ficheiro: "requisitos.py",
          enunciado: "Escreve `ler_requisitos(texto)`, que lê o conteúdo de um `requirements.txt` e devolve um dicionário do nome do pacote para a versão fixada. Ignora linhas vazias e comentários (também os que vêm depois de um pacote, na mesma linha), e usa `None` como versão quando a linha não fixa nenhuma com `==`. Depois, no teu caderno, cria o `requirements.txt` com `python -m pip freeze > requirements.txt` e faz commit dele.",
          inicio: String.raw`def ler_requisitos(texto):
    pass
`,
          testes: String.raw`from requisitos import ler_requisitos

TEXTO = """httpx==0.27.0

# ferramentas
pytest==8.2.0  # testes
ruff
"""


def test_le_nome_e_versao():
    assert ler_requisitos(TEXTO)["httpx"] == "0.27.0"


def test_ignora_comentarios_e_linhas_vazias():
    assert sorted(ler_requisitos(TEXTO)) == ["httpx", "pytest", "ruff"]


def test_comentario_no_fim_da_linha():
    assert ler_requisitos(TEXTO)["pytest"] == "8.2.0"


def test_sem_versao_fica_none():
    assert ler_requisitos(TEXTO)["ruff"] is None


def test_ficheiro_vazio():
    assert ler_requisitos("") == {}
`
        }
      }
  ]
});
