# Caderno de Python

Curso de Python passo a passo, do primeiro comando no terminal ao primeiro emprego.
Site estático, sem build: abre-se o `index.html` (com duplo clique também funciona).

## Como o curso funciona

Cada aula ensina uma ideia, e só uma, e usa apenas o que as anteriores ensinaram.
A explicação lê-se no site; o trabalho faz-se no computador do aluno, como numa equipa:

1. Na aula 1.6 o aluno cria a pasta `caderno-python`, com um ambiente virtual, `pytest` e `ruff`.
2. Cada exercício é um ficheiro do aluno (`m04/notas.py`) e um ficheiro de testes pytest (`m04/test_notas.py`).
3. O aluno escreve no editor, corre `python -m pytest m04/test_notas.py` e só está feito quando fica verde.
4. A partir da aula 8.5 a rotina inclui `ruff format` e `ruff check`; a partir da 2.9, um commit por exercício.

No fim, o caderno é um repositório com mais de cem exercícios testados e um histórico de commits, e
`python -m pytest` na raiz corre a suite inteira.

Os exemplos das aulas são para o aluno escrever no REPL e prever o resultado; o botão só mostra a resposta.
Cada exercício tem também, escondida, uma verificação no browser (Pyodide), para quando o aluno não tem o
computador à mão. Corre os mesmos ficheiros de testes com um pequeno corredor compatível com pytest, embutido
no `index.html`. Os exercícios marcados `soLocal` (threads e asyncio) não têm essa verificação.

## Mapa

| Fase | Módulos |
| --- | --- |
| 1. Primeiros passos | 1 máquina de trabalho · 2 valores, variáveis e texto · 3 funções: o primeiro contacto · 4 decisões · 5 repetição |
| 2. Fundamentos | 6 listas · 7 dicionários e conjuntos · 8 funções a sério · 9 os tipos por dentro · 10 erros e exceções · 11 como pensar um problema, com um projeto completo |
| 3. Estruturar código | 12 ficheiros e dados · 13 módulos e ambientes · 14 objetos · 15 iteradores e geradores · 16 funções avançadas · 17 biblioteca padrão · 18 algoritmos |
| 4. Prática profissional | 19 testes · 20 qualidade e tipos · 21 git em equipa · 22 depuração e desempenho |
| 5. Backend e dados | 23 APIs · 24 bases de dados · 25 FastAPI · 26 concorrência · 27 pôr no ar · 28 programas do trabalho |
| 6. Chegar ao emprego | 29 projeto final · 30 recrutamento e primeiros meses |

São 130 aulas e 124 exercícios. As restantes aulas (preparação da máquina, git) acabam numa tarefa com passos.

## Estrutura

```
index.html               o site: vistas, rotina dos exercícios e o corredor de testes do browser
curso/indice.js          fases, pasta de trabalho e a partir de que aula entram o git e o ruff na rotina
curso/mNN.js             um ficheiro por módulo
ferramentas/validar.py   valida todos os exercícios
ferramentas/exportar.js  lê o curso como o browser o lê (usado pelo validar.py)
ferramentas/solucoes/    soluções de referência, uma pasta por módulo
```

## Escrever ou alterar uma aula

Cada módulo é um `CURSO.modulos.push({...})` no seu ficheiro. Um módulo novo precisa da sua linha `<script>` no `index.html`.

```js
{
  id: "4.3", titulo: "elif: escolher entre vários caminhos", min: 12, estado: "pronta",
  meta: "No fim: ...",
  blocos: [
    ["p", "texto com `código` e **negrito**"],
    ["h", "subtítulo"],
    ["lista", ["item", "item"]],
    ["code", "só para ler"],
    ["py", "exemplo para o aluno escrever no REPL"],
    ["obra", "como isto aparece no trabalho"],
    ["aviso", "erro comum"]
  ],
  quiz: [{ p: "pergunta", o: ["a", "b"], c: 1, e: "explicação" }],
  exercicio: {
    ficheiro: "notas.py",               // o ficheiro do aluno, único em todo o curso
    enunciado: "...",
    inicio: String.raw`def escalao(nota):
    pass
`,
    testes: String.raw`from notas import escalao


def test_dez_ja_e_suficiente():
    assert escalao(10) == "suficiente"
`
    // opcionais:
    // script: true            o ficheiro é um programa, não funções (muda o passo "experimenta")
    // soLocal: true           sem verificação no browser
    // ficheiroTestes: "..."   quando o ficheiro do aluno já é um ficheiro de testes
    // apoio: { "nome.py": "..." }   ficheiros que o aluno copia tal e qual
  }
}
```

Uma aula sem exercício tem `tarefa: { enunciado, passos: [...] }`, que aparece como lista de verificação.

Regras que o curso segue, e que convém manter:

- Um conceito por aula. Se o exercício precisa de uma coisa que ainda não foi ensinada, falta uma aula antes.
- Os testes são pytest normal e servem de exemplo: nomes que descrevem o comportamento, um caso normal, um limite e um erro.
- O corredor do browser suporta `assert`, `pytest.raises`, `pytest.approx`, `pytest.mark.parametrize`, fixtures
  próprias (com `yield` e `autouse`) e as fixtures `tmp_path`, `capsys`, `monkeypatch` e `caplog`. Não suporta `conftest.py`.
- A solução de referência vai para `ferramentas/solucoes/mNN/` e tem de passar no `ruff`, como o código do aluno.

## Validar

Precisa de Node e de Python 3.11 ou mais recente.

```
python -m pip install pytest ruff
python ferramentas/validar.py            # tudo
python ferramentas/validar.py 4.3 6.1    # só alguns
```

Para cada exercício, confirma que os testes passam com a solução e falham com o código inicial, com o pytest
verdadeiro e com o corredor do browser; que os nomes dos ficheiros são únicos e não tapam módulos do Python; e
que as soluções passam no `ruff`. Corre também na integração contínua, em cada push.

## Decisões técnicas

- Progresso no `localStorage` do dispositivo, sem contas nem servidor. Os identificadores das aulas são a chave
  de rota (`#/l/13.2`) e de progresso: renumerar obriga a acrescentar um mapa como o `RENUMERACAO_V2` do `index.html`,
  que traz o progresso da versão anterior do curso para os números novos.
- O motor de Python do browser só é carregado a pedido. A versão do Pyodide está na constante `PYV`.
- As soluções estão no repositório para o curso se poder validar. Quem quiser escondê-las dos alunos pode
  mantê-las num repositório privado e apontar o `validar.py` para lá.
