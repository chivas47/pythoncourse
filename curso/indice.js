/* Índice do curso. Cada módulo vive no seu ficheiro, curso/mNN.js, e acrescenta-se a CURSO.modulos.
   O index.html carrega-os por ordem; um módulo novo precisa também da sua linha <script> lá.

   Blocos disponíveis numa aula:
   ['p', texto]            parágrafo (aceita `código` entre crases e **negrito**)
   ['h', texto]            subtítulo
   ['lista', [a, b, c]]    lista
   ['code', codigo]        bloco de código só para leitura
   ['py', codigo]          exemplo para o aluno escrever no REPL; o botão só mostra o resultado
   ['obra', texto]         nota "no trabalho isto aparece assim"
   ['aviso', texto]        erro comum
*/

window.CURSO = {
  // a pasta de trabalho que o aluno cria na aula 1.6; cada módulo tem lá a sua subpasta, m01, m02...
  pasta: "caderno-python",

  // a partir de que aula cada passo entra na rotina dos exercícios (depois de ter sido ensinado)
  rotina: { git: "2.9", ruff: "8.5" },

  fases: [
    { id: 1, nome: "Primeiros passos", nota: "Do terminal vazio a programas que decidem e repetem. Um conceito de cada vez." },
    { id: 2, nome: "Fundamentos", nota: "Coleções, funções a sério, erros e o primeiro programa completo." },
    { id: 3, nome: "Estruturar código", nota: "Ficheiros, módulos, objetos e o Python que se lê nas bibliotecas." },
    { id: 4, nome: "Prática profissional", nota: "O que separa um script de trabalho a sério." },
    { id: 5, nome: "Backend e dados", nota: "Aquilo que um júnior de Python faz no dia a dia." },
    { id: 6, nome: "Chegar ao emprego", nota: "Portefólio, processo de recrutamento, primeiros 90 dias." }
  ],

  modulos: []
};
