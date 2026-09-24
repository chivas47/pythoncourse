// Lê o curso como o browser o lê e escreve-o em JSON no stdout. Usado por validar.py.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const raiz = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(raiz, 'index.html'), 'utf8');
const contexto = { window: {} };
contexto.window = contexto;
vm.createContext(contexto);
for (const [, src] of html.matchAll(/<script src="(curso\/[^"]+)"><\/script>/g)) {
  vm.runInContext(fs.readFileSync(path.join(raiz, src), 'utf8'), contexto, { filename: src });
}
const corredor = html.match(/<script type="text\/x-python" id="corredor">\n([\s\S]*?)\n<\/script>/)[1];
process.stdout.write(JSON.stringify({ curso: contexto.CURSO, corredor }));
