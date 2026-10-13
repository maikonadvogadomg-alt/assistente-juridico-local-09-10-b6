# 📋 Plano do projeto: sss

_Gerado em 13/10/2026, 18:34:27 — sem IA, lendo os arquivos._

## 📊 Visão geral
| Item | Valor |
|---|---|
| Arquivos | 184 |
| Linhas | 56.212 |
| Telas/páginas | 44 |
| Rotas do backend | 101 |
| Chamadas do app | 92 |
| Tabelas do banco | 16 |
| Variáveis de ambiente | 21 |

**Linguagens:** TypeScript (React) (71), Imagem (33), TypeScript (17), Outros (12), HTML (12), JSON (11), JavaScript (10), YAML (5), Imagem SVG (4), Ícone (2), Batch (Windows) (2), Markdown (2), CSS (1), Shell (1), SQL (1)

## 💡 O que fazer (em ordem)
1. 🧹 Tirar a Replit de 6 arquivo(s) (🏗️ Preparar → Fazer tudo)
2. 🖥️ O projeto tem backend próprio: para funcionar fora da Replit ele precisa ficar ligado num servidor (Render, Railway, Vercel) ou virar funções
3. 🔐 Criar um .env.example com: AI_INTEGRATIONS_GEMINI_API_KEY, AI_INTEGRATIONS_GEMINI_BASE_URL, AI_INTEGRATIONS_OPENAI_API_KEY, AI_INTEGRATIONS_OPENAI_BASE_URL, APP_PASSWORD, BASE_URL, DATAJUD_API_KEY, DATA_DIR, NODE_ENV, NO_BROWSER, PDPJ_PEM_PRIVATE_KEY, PERPLEXITY_API_KEY… (os valores você coloca no servidor, nunca no código)
4. 🗄️ Precisa de banco de dados (16 tabela(s)) — Neon ou Supabase servem, grátis
5. 📝 Criar um README.md explicando como rodar

## 🚀 Por onde começa
- `client/index.html`
- `client/src/App.tsx`
- `client/src/main.tsx`
- `index.html`
- `server/index.ts`

## ⌨️ Comandos (package.json)
| Pasta | Comando | O que roda |
|---|---|---|
| . | `npm run desktop` | `electron .` |
| . | `npm run exe` | `electron-builder --win portable --publish never` |
| . | `npm run iniciar` | `node scripts/iniciar.mjs` |
| . | `npm run dev` | `tsx server/index.ts` |
| . | `npm run build` | `vite build` |
| . | `npm run start` | `tsx server/index.ts --producao` |
| . | `npm run checar` | `tsc --noEmit` |

## 📱 Telas e páginas
| Endereço | Arquivo |
|---|---|
| `/` | client/src/App.tsx |
| `/jurisprudencia` | client/src/App.tsx |
| `/assistente` | client/src/App.tsx |
| `/playground` | client/src/App.tsx |
| `/token` | client/src/App.tsx |
| `/comparador` | client/src/App.tsx |
| `/auditoria` | client/src/App.tsx |
| `/consulta` | client/src/App.tsx |
| `/painel` | client/src/App.tsx |
| `/corporativo` | client/src/App.tsx |
| `/pdpj` | client/src/App.tsx |
| `/tramitacao` | client/src/App.tsx |
| `/filtrador` | client/src/App.tsx |
| `/previdenciario` | client/src/App.tsx |
| `/robo-djen` | client/src/App.tsx |
| `/codigo` | client/src/App.tsx |
| `client/index.html` | client/index.html |
| `client/public/auditoria.html` | client/public/auditoria.html |
| `client/public/comparador.html` | client/public/comparador.html |
| `/auditoria-financeira` | client/src/pages/auditoria-financeira.tsx |
| `/code-assistant` | client/src/pages/code-assistant.tsx |
| `/comparador-juridico` | client/src/pages/comparador-juridico.tsx |
| `/consulta-corporativo` | client/src/pages/consulta-corporativo.tsx |
| `/consulta-pdpj` | client/src/pages/consulta-pdpj.tsx |
| `/consulta-processual` | client/src/pages/consulta-processual.tsx |
| `/filtrador` | client/src/pages/filtrador.tsx |
| `/jurisprudencia` | client/src/pages/jurisprudencia.tsx |
| `/legal-assistant` | client/src/pages/legal-assistant.tsx |
| `/login` | client/src/pages/login.tsx |
| `/not-found` | client/src/pages/not-found.tsx |
| `/painel-processos` | client/src/pages/painel-processos.tsx |
| `/playground` | client/src/pages/playground.tsx |
| `/previdenciario` | client/src/pages/previdenciario.tsx |
| `/robo-djen` | client/src/pages/robo-djen.tsx |
| `/token-generator` | client/src/pages/token-generator.tsx |
| `/tramitacao` | client/src/pages/tramitacao.tsx |
| `fatia-02-linhas299-597.txt.html` | fatia-02-linhas299-597.txt.html |
| `fatia-03-linhas598-889.txt.html` | fatia-03-linhas598-889.txt.html |
| `fatia-06-linhas1486-1769.txt.html` | fatia-06-linhas1486-1769.txt.html |
| `fatia-07-linhas1770-2063.txt.html` | fatia-07-linhas1770-2063.txt.html |
| `fatia-08-linhas2064-2363.txt.html` | fatia-08-linhas2064-2363.txt.html |
| `index.html` | index.html |
| `Index.html` | Index.html |
| `public/auditoria.html` | public/auditoria.html |

## 🖥️ Rotas do backend
| Método | Rota | Arquivo |
|---|---|---|
| GET | `/sw.js` | server/routes.ts |
| GET | `/api/auth/check` | server/routes.ts |
| POST | `/api/auth/login` | server/routes.ts |
| POST | `/api/auth/logout` | server/routes.ts |
| GET | `/parecer/:id` | server/routes.ts |
| GET | `/api/tjmg/fatores` | server/routes.ts |
| POST | `/api/pdpj/test-connection` | server/routes.ts |
| GET | `/api/pdpj/status` | server/routes.ts |
| POST | `/api/pdpj/comunicacoes` | server/routes.ts |
| POST | `/api/pdpj/representados` | server/routes.ts |
| POST | `/api/pdpj/habilitacao` | server/routes.ts |
| POST | `/api/pdpj/pessoa` | server/routes.ts |
| POST | `/api/webhooks/tramitacao` | server/routes.ts |
| GET | `/api/demo-key-status` | server/routes.ts |
| GET | `/api/demo-key-config` | server/routes.ts |
| POST | `/api/demo-key-config` | server/routes.ts |
| GET | `/api/perplexity-key-status` | server/routes.ts |
| POST | `/api/demo-key-test` | server/routes.ts |
| POST | `/api/tts` | server/routes.ts |
| POST | `/api/voice-chat` | server/routes.ts |
| USE | `/api` | server/routes.ts |
| POST | `/api/share/parecer` | server/routes.ts |
| GET | `/api/snippets` | server/routes.ts |
| GET | `/api/snippets/:id` | server/routes.ts |
| POST | `/api/snippets` | server/routes.ts |
| PATCH | `/api/snippets/:id` | server/routes.ts |
| DELETE | `/api/snippets/:id` | server/routes.ts |
| GET | `/api/custom-actions` | server/routes.ts |
| POST | `/api/custom-actions` | server/routes.ts |
| PATCH | `/api/custom-actions/:id` | server/routes.ts |
| DELETE | `/api/custom-actions/:id` | server/routes.ts |
| GET | `/api/ementas` | server/routes.ts |
| POST | `/api/ementas` | server/routes.ts |
| PATCH | `/api/ementas/:id` | server/routes.ts |
| DELETE | `/api/ementas/:id` | server/routes.ts |
| POST | `/api/jurisprudencia/buscar` | server/routes.ts |
| GET | `/api/ai-history` | server/routes.ts |
| POST | `/api/ai-history` | server/routes.ts |
| DELETE | `/api/ai-history/:id` | server/routes.ts |
| DELETE | `/api/ai-history` | server/routes.ts |
| GET | `/api/ai-usage-summary` | server/routes.ts |
| POST | `/api/ai-usage-credit` | server/routes.ts |
| GET | `/api/prompt-templates` | server/routes.ts |
| POST | `/api/prompt-templates` | server/routes.ts |
| PATCH | `/api/prompt-templates/:id` | server/routes.ts |
| DELETE | `/api/prompt-templates/:id` | server/routes.ts |
| GET | `/api/doc-templates` | server/routes.ts |
| POST | `/api/doc-templates` | server/routes.ts |
| PATCH | `/api/doc-templates/:id` | server/routes.ts |
| DELETE | `/api/doc-templates/:id` | server/routes.ts |
| POST | `/api/doc-templates/upload-docx` | server/routes.ts |
| POST | `/api/export/word-with-template` | server/routes.ts |
| POST | `/api/import/url` | server/routes.ts |
| POST | `/api/upload/extract-text` | server/routes.ts |
| POST | `/api/upload/transcribe` | server/routes.ts |
| POST | `/api/ai/process` | server/routes.ts |
| POST | `/api/ai/refine` | server/routes.ts |
| POST | `/api/export/word` | server/routes.ts |
| POST | `/api/jwt/generate` | server/routes.ts |
| GET | `/api/jwt/status` | server/routes.ts |
| GET | `/api/processos` | server/routes.ts |
| GET | `/api/processos/:id` | server/routes.ts |
| POST | `/api/processos` | server/routes.ts |
| PATCH | `/api/processos/:id` | server/routes.ts |
| DELETE | `/api/processos/:id` | server/routes.ts |
| POST | `/api/datajud/consulta` | server/routes.ts |
| POST | `/api/datajud/consulta-oab` | server/routes.ts |
| GET | `/api/corporativo/advogado/cpf/:cpf` | server/routes.ts |
| GET | `/api/corporativo/advogado/oab/:uf/:inscricao` | server/routes.ts |
| GET | `/api/corporativo/magistrados/:tribunal` | server/routes.ts |
| GET | `/api/datajud/tribunais` | server/routes.ts |
| GET | `/api/settings/:key` | server/routes.ts |
| PUT | `/api/settings/:key` | server/routes.ts |
| GET | `/api/tramitacao/clientes` | server/routes.ts |
| POST | `/api/tramitacao/clientes` | server/routes.ts |
| GET | `/api/tramitacao/clientes/:id` | server/routes.ts |
| PATCH | `/api/tramitacao/clientes/:id` | server/routes.ts |
| GET | `/api/tramitacao/notas` | server/routes.ts |
| POST | `/api/tramitacao/notas` | server/routes.ts |
| DELETE | `/api/tramitacao/notas/:id` | server/routes.ts |
| GET | `/api/tramitacao/usuarios` | server/routes.ts |
| GET | `/api/tramitacao/test` | server/routes.ts |
| GET | `/api/tramitacao/publicacoes` | server/routes.ts |
| POST | `/api/tramitacao/sync-publicacoes` | server/routes.ts |
| PATCH | `/api/tramitacao/publicacoes/:id/lida` | server/routes.ts |
| POST | `/api/code/run` | server/routes.ts |
| POST | `/api/previdenciario/extrair` | server/routes.ts |
| GET | `/api/pesquisa/oab` | server/routes.ts |
| GET | `/api/pesquisa/processo` | server/routes.ts |
| GET | `/api/djen/config` | server/routes.ts |
| PUT | `/api/djen/config` | server/routes.ts |
| GET | `/api/djen/clientes` | server/routes.ts |
| POST | `/api/djen/clientes` | server/routes.ts |
| DELETE | `/api/djen/clientes/:id` | server/routes.ts |
| GET | `/api/djen/publicacoes` | server/routes.ts |
| GET | `/api/djen/execucoes` | server/routes.ts |
| POST | `/api/djen/executar` | server/routes.ts |
| POST | `/api/djen/gerar-token` | server/routes.ts |
| POST | `/api/code-assistant` | server/routes.ts |
| POST | `/api/git-push` | server/routes.ts |
| USE | `/api` | server/web.ts |

## 📡 O que o app pede ao servidor
| Método | Endereço | Onde |
|---|---|---|
| GET | `/api/auth/check` | client/src/App.tsx |
| POST | `/api/code-assistant` | client/src/pages/code-assistant.tsx |
| GET | `/api/corporativo/advogado/cpf/${cpfClean}` | client/src/pages/consulta-corporativo.tsx |
| GET | `/api/corporativo/advogado/oab/${oabUf}/${num}` | client/src/pages/consulta-corporativo.tsx |
| GET | `/api/corporativo/magistrados/${magTribunal}` | client/src/pages/consulta-corporativo.tsx |
| GET | `/api/pdpj/status` | client/src/pages/consulta-pdpj.tsx |
| POST | `/api/pdpj/test-connection` | client/src/pages/consulta-pdpj.tsx |
| POST | `/api/pdpj/comunicacoes` | client/src/pages/consulta-pdpj.tsx |
| POST | `/api/pdpj/representados` | client/src/pages/consulta-pdpj.tsx |
| POST | `/api/pdpj/habilitacao` | client/src/pages/consulta-pdpj.tsx |
| POST | `/api/pdpj/pessoa` | client/src/pages/consulta-pdpj.tsx |
| POST | `/api/datajud/consulta` | client/src/pages/consulta-processual.tsx |
| POST | `/api/datajud/consulta-oab` | client/src/pages/consulta-processual.tsx |
| POST | `/api/tts` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/doc-templates/upload-docx` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/export/word-with-template` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/jurisprudencia/buscar` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/import/url` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/upload/extract-text` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/upload/transcribe` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/ai/process` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/ai/refine` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/prompt-templates` | client/src/pages/jurisprudencia.tsx |
| PATCH | `/api/prompt-templates/${id}` | client/src/pages/jurisprudencia.tsx |
| DELETE | `/api/prompt-templates/${id}` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/doc-templates` | client/src/pages/jurisprudencia.tsx |
| PATCH | `/api/doc-templates/${id}` | client/src/pages/jurisprudencia.tsx |
| DELETE | `/api/doc-templates/${id}` | client/src/pages/jurisprudencia.tsx |
| DELETE | `/api/ai-history/${id}` | client/src/pages/jurisprudencia.tsx |
| DELETE | `/api/ai-history` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/custom-actions` | client/src/pages/jurisprudencia.tsx |
| PATCH | `/api/custom-actions/${id}` | client/src/pages/jurisprudencia.tsx |
| DELETE | `/api/custom-actions/${id}` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/ementas` | client/src/pages/jurisprudencia.tsx |
| PATCH | `/api/ementas/${id}` | client/src/pages/jurisprudencia.tsx |
| DELETE | `/api/ementas/${id}` | client/src/pages/jurisprudencia.tsx |
| POST | `/api/ai-history` | client/src/pages/jurisprudencia.tsx |
| GET | `/api/custom-actions` | client/src/pages/jurisprudencia.tsx |
| GET | `/api/ementas` | client/src/pages/jurisprudencia.tsx |
| GET | `/api/ai-history` | client/src/pages/jurisprudencia.tsx |
| GET | `/api/prompt-templates` | client/src/pages/jurisprudencia.tsx |
| GET | `/api/doc-templates` | client/src/pages/jurisprudencia.tsx |
| GET | `/api/demo-key-status` | client/src/pages/legal-assistant.tsx |
| GET | `/api/demo-key-config` | client/src/pages/legal-assistant.tsx |
| POST | `/api/voice-chat` | client/src/pages/legal-assistant.tsx |
| POST | `/api/git-push` | client/src/pages/legal-assistant.tsx |
| POST | `/api/demo-key-config` | client/src/pages/legal-assistant.tsx |
| GET | `/api/ai-usage-summary` | client/src/pages/legal-assistant.tsx |
| POST | `/api/ai-usage-credit` | client/src/pages/legal-assistant.tsx |
| POST | `/api/demo-key-test` | client/src/pages/legal-assistant.tsx |
| POST | `/api/auth/login` | client/src/pages/login.tsx |
| DELETE | `/api/processos/${id}` | client/src/pages/painel-processos.tsx |
| PATCH | `/api/processos/${id}` | client/src/pages/painel-processos.tsx |
| POST | `/api/processos` | client/src/pages/painel-processos.tsx |
| GET | `/api/processos` | client/src/pages/painel-processos.tsx |
| POST | `/api/code/run` | client/src/pages/playground.tsx |
| POST | `/api/snippets` | client/src/pages/playground.tsx |
| DELETE | `/api/snippets/${id}` | client/src/pages/playground.tsx |
| PATCH | `/api/snippets/${id}` | client/src/pages/playground.tsx |
| GET | `/api/snippets` | client/src/pages/playground.tsx |
| POST | `/api/previdenciario/extrair` | client/src/pages/previdenciario.tsx |
| GET | `/api/djen/config` | client/src/pages/robo-djen.tsx |
| POST | `/api/djen/gerar-token` | client/src/pages/robo-djen.tsx |
| GET | `/api/pesquisa/oab?${params}` | client/src/pages/robo-djen.tsx |
| GET | `/api/pesquisa/processo?${params}` | client/src/pages/robo-djen.tsx |
| PUT | `/api/djen/config` | client/src/pages/robo-djen.tsx |
| POST | `/api/djen/clientes` | client/src/pages/robo-djen.tsx |
| DELETE | `/api/djen/clientes/${id}` | client/src/pages/robo-djen.tsx |
| POST | `/api/djen/executar` | client/src/pages/robo-djen.tsx |
| GET | `/api/djen/clientes` | client/src/pages/robo-djen.tsx |
| GET | `/api/djen/publicacoes` | client/src/pages/robo-djen.tsx |
| GET | `/api/jwt/status` | client/src/pages/token-generator.tsx |
| POST | `/api/jwt/generate` | client/src/pages/token-generator.tsx |
| GET | `/api/tramitacao/test` | client/src/pages/tramitacao.tsx |
| GET | `/api/tramitacao/clientes?page=${clientePage}&per_page=20` | client/src/pages/tramitacao.tsx |
| GET | `/api/tramitacao/clientes/${selectedCliente.id}` | client/src/pages/tramitacao.tsx |
| GET | `/api/tramitacao/usuarios` | client/src/pages/tramitacao.tsx |
| PUT | `/api/settings/tramitacao_token` | client/src/pages/tramitacao.tsx |
| POST | `/api/tramitacao/notas` | client/src/pages/tramitacao.tsx |
| DELETE | `/api/tramitacao/notas/${id}` | client/src/pages/tramitacao.tsx |
| POST | `/api/tramitacao/sync-publicacoes` | client/src/pages/tramitacao.tsx |
| PATCH | `/api/tramitacao/publicacoes/${id}/lida` | client/src/pages/tramitacao.tsx |
| GET | `/api/settings/tramitacao_token` | client/src/pages/tramitacao.tsx |
| GET | `/api/tramitacao/notas` | client/src/pages/tramitacao.tsx |
| GET | `/api/tramitacao/publicacoes` | client/src/pages/tramitacao.tsx |
| POST | `/chat/completions` | fatia-04-linhas890-1190.txt.js |
| GET | `/domicilio-eletronico/api/v1/representados` | server/routes.ts |
| GET | `/domicilio-eletronico/api/v1/habilita/verificar/${documento}` | server/routes.ts |
| GET | `/domicilio-eletronico/api/v1/${endpoint}/${documento}` | server/routes.ts |
| GET | `/advogado/oab/${cpf}` | server/routes.ts |
| GET | `/advogado/oab/${uf.toUpperCase()}/${inscricao.replace(/\D/g, ` | server/routes.ts |
| GET | `/magistrado?siglaTribunal=${tribunal}` | server/routes.ts |

## 🔌 O que falta no backend
✅ Tudo que o app chama tem rota no projeto (ou o app não usa servidor).

## 💤 Rotas que o app não usa
- GET `/sw.js` — server/routes.ts
- POST `/api/auth/logout` — server/routes.ts
- GET `/parecer/:id` — server/routes.ts
- GET `/api/tjmg/fatores` — server/routes.ts
- POST `/api/webhooks/tramitacao` — server/routes.ts
- GET `/api/perplexity-key-status` — server/routes.ts
- POST `/api/share/parecer` — server/routes.ts
- POST `/api/export/word` — server/routes.ts
- GET `/api/datajud/tribunais` — server/routes.ts
- GET `/api/settings/:key` — server/routes.ts
- PUT `/api/settings/:key` — server/routes.ts
- GET `/api/djen/execucoes` — server/routes.ts

## 🗄️ Banco de dados
- **conversations** — shared/models/chat.ts
- **messages** — shared/models/chat.ts
- **users** — shared/schema.ts
- **snippets** — shared/schema.ts
- **custom_actions** — shared/schema.ts
- **ementas** — shared/schema.ts
- **ai_history** — shared/schema.ts
- **prompt_templates** — shared/schema.ts
- **doc_templates** — shared/schema.ts
- **shared_pareceres** — shared/schema.ts
- **processos_monitorados** — shared/schema.ts
- **app_settings** — shared/schema.ts
- **tramitacao_publicacoes** — shared/schema.ts
- **djen_clientes** — shared/schema.ts
- **djen_publicacoes** — shared/schema.ts
- **djen_execucoes** — shared/schema.ts

## 🔐 Variáveis de ambiente (configurar no servidor)
- `AI_INTEGRATIONS_GEMINI_API_KEY`
- `AI_INTEGRATIONS_GEMINI_BASE_URL`
- `AI_INTEGRATIONS_OPENAI_API_KEY`
- `AI_INTEGRATIONS_OPENAI_BASE_URL`
- `APP_PASSWORD`
- `BASE_URL`
- `DATAJUD_API_KEY`
- `DATA_DIR`
- `NODE_ENV`
- `NO_BROWSER`
- `PDPJ_PEM_PRIVATE_KEY`
- `PERPLEXITY_API_KEY`
- `PORT`
- `PREFIX`
- `PUBLIC_API_KEY`
- `PUBLIC_API_MODEL`
- `PUBLIC_API_URL`
- `SESSION_SECRET`
- `TTS_TOM`
- `TTS_VELOCIDADE`
- `TTS_VOZ`

_Só os nomes. Os valores (chaves, senhas) nunca vão no código nem no GitHub._

## 🤖 IA usada
- Google Gemini
- OpenAI (ChatGPT)
- api.groq.com
- openrouter.ai
- generativelanguage.googleapis.com
- api.openai.com
- api.anthropic.com
- console.groq.com
- platform.openai.com

## 🌐 Serviços de fora que ele acessa
- aistudio.google.com
- api-publica.datajud.cnj.jus.br
- api.anthropic.com
- api.groq.com
- api.openai.com
- api.perplexity.ai
- api.together.xyz
- api.x.ai
- cdnjs.cloudflare.com
- cna.oab.org.br
- comunicaapi.pje.jus.br
- console.groq.com
- datajud-wiki.cnj.jus.br
- domicilio-eletronico.pdpj.jus.br
- elevenlabs.io
- gateway.cloud.pje.jus.br
- gateway.stg.cloud.pje.jus.br
- generativelanguage.googleapis.com
- hcomunicaapi.cnj.jus.br
- huggingface.co
- jurisprudencia.cnj.jus.br
- nodejs.org
- openrouter.ai
- perplexity.ai
- planilha.tramitacaointeligente.com.br
- platform.openai.com
- seu-issuer.example
- together.ai
- unpkg.com
- virtserver.swaggerhub.com
- www.debit.com.br
- www.perplexity.ai

## 📦 Peças principais (dependências)
`@capacitor/android` · `@capacitor/core` · `@electric-sql/pglite` · `@google/genai` · `@hookform/resolvers` · `@jridgewell/trace-mapping` · `@radix-ui/react-accordion` · `@radix-ui/react-alert-dialog` · `@radix-ui/react-aspect-ratio` · `@radix-ui/react-avatar` · `@radix-ui/react-checkbox` · `@radix-ui/react-collapsible` · `@radix-ui/react-context-menu` · `@radix-ui/react-dialog` · `@radix-ui/react-dropdown-menu` · `@radix-ui/react-hover-card` · `@radix-ui/react-label` · `@radix-ui/react-menubar` · `@radix-ui/react-navigation-menu` · `@radix-ui/react-popover` · `@radix-ui/react-progress` · `@radix-ui/react-radio-group` · `@radix-ui/react-scroll-area` · `@radix-ui/react-select` · `@radix-ui/react-separator` · `@radix-ui/react-slider` · `@radix-ui/react-slot` · `@radix-ui/react-switch` · `@radix-ui/react-tabs` · `@radix-ui/react-toast` · `@radix-ui/react-toggle` · `@radix-ui/react-toggle-group` · `@radix-ui/react-tooltip` · `@tanstack/react-query` · `@tiptap/core` · `@tiptap/extension-color` · `@tiptap/extension-font-family` · `@tiptap/extension-highlight` · `@tiptap/extension-link` · `@tiptap/extension-table` · `@tiptap/extension-table-cell` · `@tiptap/extension-table-header` · `@tiptap/extension-table-row` · `@tiptap/extension-text-align` · `@tiptap/extension-text-style` · `@tiptap/extension-underline` · `@tiptap/pm` · `@tiptap/react` · `@tiptap/starter-kit` · `@types/jsonwebtoken` · `@types/multer` · `adm-zip` · `class-variance-authority` · `clsx` · `cmdk` · `date-fns` · `diff` · `docx` · `drizzle-orm` · `drizzle-zod` · `electron-vite` · `embla-carousel-react` · `express` · `express-session` · `express-ws` · `framer-motion` · `html-entities` · `input-otp` · `jsonwebtoken` · `lucide-react` · `mammoth` · `memorystore` · `msedge-tts` · `multer` · `next-themes` · `nodemon` · `openai` · `p-limit` · `p-retry` · `passport` · `passport-local` · `pdf-parse` · `pdfjs-dist` · `postcss-selector-parser` · `react` · `react-day-picker` · `react-dom` · `react-hook-form` · `react-icons` · `react-resizable-panels` · `recharts` · `require` · `sqlit` · `start` · `tailwind-merge` · `tailwindcss-animate` · `tsx` · `tw-animate-css` · `vaul` · `vite-node` · `wouter` · `ws` · `zod` · `zod-validation-error`

## 🧹 Arquivos com coisa da Replit
- client/service-worker.js
- client/src/pages/code-assistant.tsx
- client/src/pages/legal-assistant.tsx
- server/localdb.ts
- server/routes.ts
- service-worker.js

## 🔁 Roteiro para recriar fora da Replit
1. Importar o projeto no Mini SK e tocar em 🏗️ Preparar → ✅ Fazer tudo (tira a Replit, cria os arquivos que faltam).
2. Backend: escolher onde ele vai ficar ligado (Render/Railway grátis) — ou pedir à IA para transformar as rotas em funções do Netlify/Vercel, usando a tabela "O que falta no backend".
3. Banco: criar no Neon ou Supabase e colocar o endereço na variável de ambiente do servidor.
4. Variáveis: cadastrar 21 variável(is) no servidor (lista acima).
5. Testar a prévia; se der erro, 🤖 Mandar os erros para a IA.
6. App: 📲 Instalável (PWA), 📦 APK ou 🖥️ Desktop (.exe) pelo 🏗️ Preparar.

## 🌳 Árvore de arquivos
```
├─ 📁 .github/
│  └─ 📁 workflows/
│     ├─ apk-capacitor.yml
│     ├─ apk.yml
│     ├─ desktop-exe.yml
│     ├─ teste.yml
│     └─ windows.yml
├─ 📁 client/
│  ├─ 📁 icons/
│  │  ├─ apple-touch-icon.png
│  │  ├─ icon-128.png
│  │  ├─ icon-144.png
│  │  ├─ icon-152.png
│  │  ├─ icon-16.png
│  │  ├─ icon-180.png
│  │  ├─ icon-192.png
│  │  ├─ icon-32.png
│  │  ├─ icon-384.png
│  │  ├─ icon-48.png
│  │  ├─ icon-512.png
│  │  ├─ icon-72.png
│  │  ├─ icon-96.png
│  │  ├─ icon.svg
│  │  ├─ maskable-192.png
│  │  ├─ maskable-512.png
│  │  └─ maskable.svg
│  ├─ 📁 public/
│  │  ├─ auditoria.html
│  │  ├─ codigo-formatacao.txt
│  │  ├─ comparador.html
│  │  ├─ favicon.png
│  │  ├─ icon-192.png
│  │  ├─ icon-512.png
│  │  ├─ manifest.json
│  │  └─ sw.js
│  ├─ 📁 src/
│  │  ├─ 📁 components/
│  │  │  ├─ 📁 ui/
│  │  │  │  ├─ accordion.tsx
│  │  │  │  ├─ alert-dialog.tsx
│  │  │  │  ├─ alert.tsx
│  │  │  │  ├─ aspect-ratio.tsx
│  │  │  │  ├─ avatar.tsx
│  │  │  │  ├─ badge.tsx
│  │  │  │  ├─ breadcrumb.tsx
│  │  │  │  ├─ button.tsx
│  │  │  │  ├─ calendar.tsx
│  │  │  │  ├─ card.tsx
│  │  │  │  ├─ carousel.tsx
│  │  │  │  ├─ chart.tsx
│  │  │  │  ├─ checkbox.tsx
│  │  │  │  ├─ collapsible.tsx
│  │  │  │  ├─ command.tsx
│  │  │  │  ├─ context-menu.tsx
│  │  │  │  ├─ dialog.tsx
│  │  │  │  ├─ drawer.tsx
│  │  │  │  ├─ dropdown-menu.tsx
│  │  │  │  ├─ form.tsx
│  │  │  │  ├─ hover-card.tsx
│  │  │  │  ├─ input-otp.tsx
│  │  │  │  ├─ input.tsx
│  │  │  │  ├─ label.tsx
│  │  │  │  ├─ menubar.tsx
│  │  │  │  ├─ navigation-menu.tsx
│  │  │  │  ├─ pagination.tsx
│  │  │  │  ├─ popover.tsx
│  │  │  │  ├─ progress.tsx
│  │  │  │  ├─ radio-group.tsx
│  │  │  │  ├─ resizable.tsx
│  │  │  │  ├─ scroll-area.tsx
│  │  │  │  ├─ select.tsx
│  │  │  │  ├─ separator.tsx
│  │  │  │  ├─ sheet.tsx
│  │  │  │  ├─ sidebar.tsx
│  │  │  │  ├─ skeleton.tsx
│  │  │  │  ├─ slider.tsx
│  │  │  │  ├─ switch.tsx
│  │  │  │  ├─ table.tsx
│  │  │  │  ├─ tabs.tsx
│  │  │  │  ├─ textarea.tsx
│  │  │  │  ├─ toast.tsx
│  │  │  │  ├─ toaster.tsx
│  │  │  │  ├─ toggle-group.tsx
│  │  │  │  ├─ toggle.tsx
│  │  │  │  └─ tooltip.tsx
│  │  │  ├─ pwa-install.tsx
│  │  │  ├─ theme-provider.tsx
│  │  │  ├─ theme-toggle.tsx
│  │  │  └─ tiptap-editor.tsx
│  │  ├─ 📁 hooks/
│  │  │  ├─ use-mobile.tsx
│  │  │  └─ use-toast.ts
│  │  ├─ 📁 lib/
│  │  │  ├─ queryClient.ts
│  │  │  └─ utils.ts
│  │  ├─ 📁 pages/
│  │  │  ├─ auditoria-financeira.tsx
│  │  │  ├─ code-assistant.tsx
│  │  │  ├─ comparador-juridico.tsx
│  │  │  ├─ consulta-corporativo.tsx
│  │  │  ├─ consulta-pdpj.tsx
│  │  │  ├─ consulta-processual.tsx
│  │  │  ├─ filtrador.tsx
│  │  │  ├─ jurisprudencia.tsx
│  │  │  ├─ legal-assistant.tsx
│  │  │  ├─ login.tsx
│  │  │  ├─ not-found.tsx
│  │  │  ├─ painel-processos.tsx
│  │  │  ├─ playground.tsx
│  │  │  ├─ previdenciario.tsx
│  │  │  ├─ robo-djen.tsx
│  │  │  ├─ token-generator.tsx
│  │  │  └─ tramitacao.tsx
│  │  ├─ App.tsx
│  │  ├─ index.css
│  │  └─ main.tsx
│  ├─ 404.html
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ manifest.json
│  └─ service-worker.js
├─ 📁 electron/
│  ├─ main.cjs
│  └─ preload.cjs
├─ 📁 icons/
│  ├─ apple-touch-icon.png
│  ├─ icon-128.png
│  ├─ icon-144.png
│  ├─ icon-152.png
│  ├─ icon-16.png
│  ├─ icon-180.png
│  ├─ icon-192.png
│  ├─ icon-32.png
│  ├─ icon-384.png
│  ├─ icon-48.png
│  ├─ icon-512.png
│  ├─ icon-72.png
│  ├─ icon-96.png
│  ├─ icon.svg
│  ├─ maskable-192.png
│  ├─ maskable-512.png
│  └─ maskable.svg
├─ 📁 migrations/
│  ├─ 📁 meta/
│  │  ├─ _journal.json
│  │  └─ 0000_snapshot.json
│  └─ 0000_init.sql
├─ 📁 public/
│  └─ auditoria.html
├─ 📁 scripts/
│  ├─ abrir-pronto.mjs
│  └─ iniciar.mjs
├─ 📁 server/
│  ├─ db.ts
│  ├─ djen.ts
│  ├─ env.ts
│  ├─ gemini-ponte.ts
│  ├─ index.ts
│  ├─ localdb.ts
│  ├─ routes.ts
│  ├─ storage.ts
│  ├─ tts.ts
│  └─ web.ts
├─ 📁 shared/
│  ├─ 📁 models/
│  │  └─ chat.ts
│  └─ schema.ts
├─ 📁 windows/
│  └─ Abrir-Juridico.bat
├─ .env.exemplo
├─ .gitignore
├─ .npmrc
├─ apk.config.json
├─ capacitor.config.json
├─ components.json
├─ fatia-02-linhas299-597.txt.html
├─ fatia-03-linhas598-889.txt.html
├─ fatia-04-linhas890-1190.txt.js
├─ fatia-05-linhas1191-1485.txt.js
├─ fatia-06-linhas1486-1769.txt.html
├─ fatia-07-linhas1770-2063.txt.html
├─ fatia-08-linhas2064-2363.txt.html
├─ fatia-09-linhas2364-2662.txt
├─ fatia-10-linhas2663-2963.txt
├─ fatia-11-linhas2964-3259.txt
├─ fatia-12-linhas3260-3560.txt
├─ fatia-13-linhas3561-3858.txt
├─ fatia-14-linhas3859-4155.txt
├─ fatia-15-linhas4156-4416.txt
├─ favicon.ico
├─ index.html
├─ Index.html
├─ iniciar.bat
├─ iniciar.sh
├─ LEIA-ME.md
├─ manifest.json
├─ package-lock.json
├─ package.json
├─ PLANO.md
├─ postcss.config.js
├─ relatorio-Assistente45by.txt
├─ service-worker.js
├─ tailwind.config.ts
├─ tsconfig.json
└─ vite.config.ts
```
