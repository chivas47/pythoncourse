# Caderno de Python

Curso de Python do básico ao emprego. Site estático, sem build, sem dependências de instalação.
O código Python dos exemplos e dos exercícios corre no browser (Pyodide, carregado só quando o aluno carrega em "Correr").

Para testar localmente: `python3 -m http.server` na pasta e abrir `http://localhost:8000`.
Abrir o `index.html` com duplo clique também funciona porque o conteúdo vem de um `<script>` e não de um `fetch`.

## Acrescentar uma aula

Só se mexe em `curso.js`. Cada lição tem `estado: "esboco"` (aparece cinzenta, com o plano) ou `estado: "pronta"` (aparece a aula).

```js
{
  id: "2.1", titulo: "if, elif, else", min: 14, estado: "pronta",
  meta: "No fim: ...",
  blocos: [
    ["p", "texto com `código` entre crases"],
    ["h", "subtítulo"],
    ["lista", ["item", "item"]],
    ["code", "só para ler"],
    ["py", "print('com botão de correr')"],
    ["obra", "como isto aparece no trabalho"],
    ["aviso", "erro comum"]
  ],
  quiz: [{ p: "pergunta", o: ["a", "b"], c: 1, e: "explicação" }],
  exercicio: {
    enunciado: "...",
    inicio: "def f():\n    pass\n",
    testes: "verifica('descrição', f() == 3)"
  }
}
```

Nos `testes` está disponível a função `verifica(nome, condicao)` e todo o código que o aluno escreveu.
Escreve sempre uma verificação para o caso normal, uma para o caso limite e uma para o erro.
Antes de publicar, testa a suite contra a tua solução com `python3` local: se ela passa com a solução e falha com o código inicial, está boa.

## Estado

As 48 aulas dos 20 módulos estão escritas, cada uma com conteúdo, quiz e exercício com testes.
Todos os exercícios foram validados contra uma solução de referência: a suite passa com a solução
e falha com o código inicial.

Os exercícios correm no browser, por isso não dependem de bibliotecas externas. Nas aulas sobre
FastAPI, SQLAlchemy, httpx ou Docker, os blocos com essas bibliotecas são de leitura (`code`) e o
exercício trabalha a mesma ideia com a biblioteca padrão: validação à entrada, repositório em
memória, dublês de teste, configuração por variáveis de ambiente.

## Decisões técnicas

- Progresso no `localStorage` do dispositivo, sem contas nem servidor.
- Motor de Python carregado só a pedido, para a primeira visita em dados móveis não custar 6 MB.
- Versão do Pyodide fixada na constante `PYV` no topo do `<script>`.
