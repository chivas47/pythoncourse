/* Módulo 27: Pôr no ar. Formato dos blocos e dos exercícios no README. */
CURSO.modulos.push({
  n: 27, fase: 5, titulo: "Pôr no ar",
  objetivo: "Empacotar, configurar e publicar um serviço, e saber quando está doente.",
  licoes: [
      {
        id: "27.1", titulo: "Docker para quem escreve Python", min: 20, estado: "pronta",
        meta: "No fim: empacotas a aplicação numa imagem que corre igual em qualquer máquina.",
        blocos: [
          ["p", "Uma imagem é o teu código mais o sistema mínimo para o correr, tudo congelado. Um contentor é essa imagem em execução. O problema que isto resolve é o da aula 13.3 levado ao limite: não é só a versão da biblioteca, é a versão do Python, do sistema e das bibliotecas do sistema."],
          ["code", String.raw`# Dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`],
          ["code", String.raw`docker build -t vendas:0.1 .
docker run -p 8000:8000 --env-file .env vendas:0.1
docker logs -f <id>
docker exec -it <id> bash`],
          ["h", "Porque é que os requisitos são copiados primeiro"],
          ["p", "Cada linha do Dockerfile é uma camada em cache. Se copiares o código todo antes do `pip install`, qualquer alteração numa linha de Python invalida a cache e reinstalas as dependências outra vez. Copiar só o ficheiro de requisitos primeiro faz a diferença entre dois segundos e dois minutos, a cada build."],
          ["h", "Imagens pequenas"],
          ["lista", [
            "`python:3.12-slim` em vez da imagem completa: centenas de megabytes a menos.",
            "`.dockerignore` com `.venv`, `.git`, `__pycache__` e dados de teste.",
            "`--no-cache-dir` no pip, que não guarda o que já não precisas.",
            "Build em duas fases quando é preciso compilar: uma imagem constrói, a final só recebe o resultado."
          ]],
          ["h", "Configuração por variáveis de ambiente"],
          ["p", "A mesma imagem tem de servir para desenvolvimento, testes e produção. O que muda entre eles é configuração, e a configuração entra por variáveis de ambiente, nunca dentro da imagem."],
          ["py", String.raw`import os

def config(ambiente):
    if "DATABASE_URL" not in ambiente:
        raise RuntimeError("falta DATABASE_URL")
    return {
        "base_de_dados": ambiente["DATABASE_URL"],
        "debug": ambiente.get("DEBUG", "0") == "1",
        "porta": int(ambiente.get("PORT", 8000)),
    }

print(config({"DATABASE_URL": "sqlite:///loja.db", "DEBUG": "1"}))`],
          ["p", "Repara que a função recebe o ambiente em vez de ler `os.environ` diretamente. É o mesmo truque da aula 14.5: assim consegues testá-la com um dicionário, sem mexer no ambiente do processo."],
          ["aviso", "Segredos não entram na imagem. Um `ENV API_KEY=...` no Dockerfile fica gravado na imagem e qualquer pessoa que a descarregue o consegue ler, mesmo que apagues numa camada seguinte. Passam-se em execução, ou vêm do gestor de segredos da plataforma."],
          ["h", "docker compose para o ambiente local"],
          ["code", String.raw`services:
  api:
    build: .
    ports: ["8000:8000"]
    env_file: .env
    depends_on: [bd]
  bd:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: local
    volumes:
      - dados:/var/lib/postgresql/data

volumes:
  dados:`],
          ["obra", "Ter o projeto a arrancar com um `docker compose up` é o que permite a um colega novo ser produtivo na primeira manhã em vez de na primeira semana. Nos teus repositórios de portefólio, isto é um sinal claro de que já pensaste em quem vem a seguir."]
        ],
        quiz: [
          { p: "Porque é que se copia o requirements.txt antes do resto do código no Dockerfile?", o: ["Por convenção","Para a camada de instalação de dependências ficar em cache e não repetir a cada alteração de código","Porque o pip exige"], c: 1,
            e: "Camadas invalidam-se em cadeia. Ordem certa: o que muda pouco primeiro, o que muda a toda a hora no fim." }
        ],
        exercicio: {
          ficheiro: "configuracao_ambiente.py",
          enunciado: "Escreve `config(ambiente)`, que recebe um dicionário de variáveis de ambiente e devolve a configuração: `base_de_dados` a partir de `DATABASE_URL` (obrigatória: sem ela, `RuntimeError` com o nome da variável na mensagem), `debug` verdadeiro só quando `DEBUG` é `\"1\"`, e `porta` como inteiro a partir de `PORT`, por omissão 8000. Uma `PORT` que não seja um número levanta `RuntimeError`. No teu programa real, passa-lhe `os.environ`.",
          inicio: String.raw`def config(ambiente):
    pass
`,
          testes: String.raw`import pytest

from configuracao_ambiente import config


def test_le_tudo():
    c = config({"DATABASE_URL": "sqlite:///loja.db", "DEBUG": "1", "PORT": "9000"})
    assert c == {"base_de_dados": "sqlite:///loja.db", "debug": True, "porta": 9000}


def test_omissoes():
    c = config({"DATABASE_URL": "x"})
    assert c["debug"] is False
    assert c["porta"] == 8000


@pytest.mark.parametrize("valor", ["0", "true", ""])
def test_debug_so_com_um(valor):
    assert config({"DATABASE_URL": "x", "DEBUG": valor})["debug"] is False


def test_sem_base_de_dados_rebenta_a_dizer_o_que_falta():
    with pytest.raises(RuntimeError, match="DATABASE_URL"):
        config({})


def test_porta_invalida():
    with pytest.raises(RuntimeError):
        config({"DATABASE_URL": "x", "PORT": "oito mil"})
`
        }
      },
      {
        id: "27.2", titulo: "Publicar e monitorizar", min: 16, estado: "pronta",
        meta: "No fim: pões o serviço no ar e sabes, sem perguntar a ninguém, se está de pé.",
        blocos: [
          ["p", "Publicar é copiar a imagem para uma máquina que a corre, com a configuração daquele ambiente. As plataformas modernas fazem isso a partir de um push no git. O que é teu é o que vem a seguir: saber se aquilo está bem."],
          ["h", "O caminho até ao ar"],
          ["lista", [
            "A CI corre linter, tipos e testes, como na aula 20.3.",
            "Constrói a imagem e marca-a com a versão ou o identificador do commit.",
            "Aplica as migrações da base de dados antes de trocar a aplicação.",
            "Arranca a versão nova, confirma a rota de saúde, e só depois desliga a antiga.",
            "Guarda a versão anterior para poder voltar atrás em minutos."
          ]],
          ["p", "Voltar atrás tem de ser mais fácil do que corrigir à pressa. Uma equipa que só consegue avançar acaba a publicar correções em cima de correções às oito da noite."],
          ["h", "A rota de saúde"],
          ["py", String.raw`def estado_saude(verificacoes):
    falhas = [nome for nome, ok in verificacoes.items() if not ok]
    if not falhas:
        return "ok", []
    if "base_de_dados" in falhas:
        return "em baixo", falhas
    return "degradado", falhas

print(estado_saude({"base_de_dados": True, "cache": True}))
print(estado_saude({"base_de_dados": True, "cache": False}))
print(estado_saude({"base_de_dados": False, "cache": True}))`],
          ["p", "Distinguir 'degradado' de 'em baixo' importa: sem cache o serviço responde mais devagar, sem base de dados não responde de todo. Quem monitoriza precisa de saber a diferença para decidir se acorda alguém."],
          ["h", "O que vale a pena observar"],
          ["lista", [
            "Registos estruturados, da aula 12.5, com um identificador por pedido para seguir o rasto.",
            "Métricas: pedidos por segundo, latência no percentil 95, percentagem de erros.",
            "Alertas sobre sintomas que o utilizador sente, não sobre CPU a 80 por cento.",
            "Rastreio de erros, tipo Sentry, que agrupa exceções e mostra o traceback com o contexto."
          ]],
          ["aviso", "Alertas que disparam sem ninguém fazer nada ensinam a equipa a ignorar alertas. Cada alerta deve ter uma ação associada. Se a resposta habitual é 'passa daqui a bocado', não devia ser alerta, devia ser um gráfico."],
          ["h", "A média mente"],
          ["p", "Latência média de 200 milissegundos pode esconder que um em cada vinte utilizadores espera quatro segundos. Olha para o percentil 95 e para o 99, que é onde vivem as pessoas que desistem e mudam de fornecedor."],
          ["obra", "Numa entrevista, 'como sabes que o teu serviço está a funcionar' separa quem já publicou de quem só correu localhost. A resposta completa fala de rota de saúde, registos com identificador de pedido, métricas de erro e latência, e um plano de voltar atrás."],
          ["aviso", "A primeira coisa a montar não é o painel de gráficos: é conseguir voltar à versão anterior num comando. Sem isso, todos os problemas duram o tempo de encontrar a causa, em vez de durarem dois minutos."]
        ],
        quiz: [
          { p: "A latência média está boa e há utilizadores a queixar-se de lentidão. O que olhas a seguir?", o: ["A média de outro dia","Os percentis 95 e 99, e as rotas mais lentas","O CPU do servidor"], c: 1,
            e: "A média dilui a cauda. As queixas vêm quase sempre de uma minoria de pedidos muito lentos, tipicamente uma consulta sem índice." }
        ],
        exercicio: {
          ficheiro: "saude.py",
          enunciado: "Escreve `estado_saude(verificacoes)`, que recebe um dicionário do nome da verificação para um booleano e devolve um tuplo. Tudo bem dá `(\"ok\", [])`. Com falhas dá `(\"em baixo\", falhas)` se a `base_de_dados` estiver em falha, e `(\"degradado\", falhas)` caso contrário. A lista de falhas vem por ordem alfabética.",
          inicio: String.raw`def estado_saude(verificacoes):
    pass
`,
          testes: String.raw`from saude import estado_saude


def test_tudo_bem():
    assert estado_saude({"base_de_dados": True, "cache": True}) == ("ok", [])


def test_cache_em_baixo_e_degradado():
    assert estado_saude({"base_de_dados": True, "cache": False}) == ("degradado", ["cache"])


def test_base_de_dados_em_baixo_e_critico():
    assert estado_saude({"base_de_dados": False, "cache": True}) == ("em baixo", ["base_de_dados"])


def test_falhas_ordenadas():
    resultado = estado_saude({"cache": False, "api_externa": False})
    assert resultado == ("degradado", ["api_externa", "cache"])


def test_sem_verificacoes():
    assert estado_saude({}) == ("ok", [])
`
        }
      }
  ]
});
