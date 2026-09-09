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

Escritas por inteiro: 1.1, 1.2, 1.3, 3.1, 10.1, 14.1. As restantes 49 estão planeadas com título, duração e objetivo.

## Decisões técnicas

- Progresso no `localStorage` do dispositivo, sem contas nem servidor.
- Motor de Python carregado só a pedido, para a primeira visita em dados móveis não custar 6 MB.
- Versão do Pyodide fixada na constante `PYV` no topo do `<script>`.
