/**
 * Banco de dados LOCAL — antes era Postgres na nuvem (Neon/Replit), com
 * DATABASE_URL e senha. Agora é o mesmo Postgres, mas rodando dentro do
 * próprio programa (PGlite) e guardado na pasta  dados/banco .
 * Sem internet, sem senha, sem conta. Copie a pasta "dados" para fazer backup.
 */
import path from "path";
import fs from "fs";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

export const DATA_DIR = path.resolve(process.env.DATA_DIR ?? path.join(process.cwd(), "dados"));
fs.mkdirSync(DATA_DIR, { recursive: true });

/**
 * Abre o banco com segurança. Se ele estiver estragado (ex.: o computador
 * desligou ou reiniciou com o app aberto), o banco velho é GUARDADO DE LADO
 * (não apaga nada) e um banco novo é criado — o app volta a funcionar.
 */
const PONTEIRO = path.join(DATA_DIR, "banco-atual.txt");
function pastaDoBanco(): string {
  try { const n = fs.readFileSync(PONTEIRO, "utf8").trim(); if (n && !n.includes("..") && !/[\\/]/.test(n)) return path.join(DATA_DIR, n); } catch {}
  return path.join(DATA_DIR, "banco");
}
// Tira a "trava" que o banco deixa quando a janela preta é fechada de repente.
// Sem isso, no dia seguinte o banco não abre ("Aborted()") — era o "só funciona no 1º dia".
function tirarTrava(dir: string) {
  for (const f of ["postmaster.pid"]) { try { fs.rmSync(path.join(dir, f), { force: true }); } catch {} }
}
// Abre o banco com uma "rede": se ele quebrar lá dentro (erro "Aborted"), a gente
// fica sabendo aqui e trata, em vez de o programa fechar na sua cara.
function abrirComRede(dir: string): Promise<PGlite> {
  return new Promise((ok, falha) => {
    let feito = false;
    const fim = (e?: any, b?: PGlite) => {
      if (feito) return; feito = true;
      process.off("uncaughtException", pega); process.off("unhandledRejection", pega); clearTimeout(t);
      if (e) falha(e); else ok(b!);
    };
    const pega = (e: any) => fim(e || new Error("o banco quebrou ao abrir"));
    process.on("uncaughtException", pega); process.on("unhandledRejection", pega);
    const t = setTimeout(() => fim(new Error("o banco não respondeu em 60 segundos")), 60000);
    try { const b = new PGlite(dir); b.query("select 1").then(() => fim(undefined, b), pega); } catch (e) { pega(e); }
  });
}

async function abrirBancoSeguro(): Promise<{ banco: PGlite; recuperado: boolean }> {
  const dir = pastaDoBanco();
  fs.mkdirSync(dir, { recursive: true });
  let banco: PGlite | null = null;
  tirarTrava(dir);
  try {
    banco = await abrirComRede(dir);
    return { banco, recuperado: false };
  } catch (e: any) {
    try { await banco?.close(); } catch {}
    const carimbo = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const lado = dir + "-com-defeito-" + carimbo;
    let novo = dir;
    try { fs.renameSync(dir, lado); }
    catch { novo = path.join(DATA_DIR, "banco-" + carimbo); } // Windows às vezes não deixa renomear: usa outra pasta
    fs.mkdirSync(novo, { recursive: true });
    try { fs.writeFileSync(PONTEIRO, path.basename(novo), "utf8"); } catch {}
    const aviso = `O banco local estava estragado e foi refeito em ${new Date().toLocaleString("pt-BR")}.\n` +
      `Motivo técnico: ${e?.message || e}\n` +
      `O banco antigo NÃO foi apagado: ${fs.existsSync(lado) ? lado : dir}\n` +
      `Causa mais comum: o computador desligou/reiniciou com o app aberto.\n`;
    try { fs.writeFileSync(path.join(DATA_DIR, "AVISO-banco-recuperado.txt"), aviso, "utf8"); } catch {}
    console.error("\n  ⚠ " + aviso.replace(/\n/g, "\n  ") + "\n");
    return { banco: await abrirComRede(novo), recuperado: true };
  }
}
const aberto = await abrirBancoSeguro();
// Fecha o banco direito quando a janela preta é fechada (evita estragar de novo)
let fechando = false;
async function fecharBanco(sinal: string) {
  if (fechando) return; fechando = true;
  try { await aberto.banco.close(); } catch {}
  process.exit(sinal === "SIGINT" ? 130 : 0);
}
for (const s of ["SIGINT", "SIGTERM", "SIGHUP", "SIGBREAK"]) { try { process.on(s as NodeJS.Signals, () => { void fecharBanco(s); }); } catch {} }

export const pglite = aberto.banco;
export const bancoRecuperado = aberto.recuperado;

// Cria as tabelas que faltarem (não apaga nada). Espelha shared/schema.ts.
await pglite.exec(`
CREATE TABLE IF NOT EXISTS users (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  password text NOT NULL
);
CREATE TABLE IF NOT EXISTS snippets (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Untitled',
  html text NOT NULL DEFAULT '',
  css text NOT NULL DEFAULT '',
  js text NOT NULL DEFAULT '',
  mode text NOT NULL DEFAULT 'html',
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS custom_actions (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  description text NOT NULL DEFAULT '',
  prompt text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ementas (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  categoria text NOT NULL DEFAULT 'Geral',
  texto text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ai_history (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  input_preview text NOT NULL DEFAULT '',
  result text NOT NULL,
  model text DEFAULT '',
  provider text DEFAULT '',
  input_tokens integer DEFAULT 0,
  output_tokens integer DEFAULT 0,
  estimated_cost real DEFAULT 0,
  chat_history jsonb,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS prompt_templates (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  categoria text NOT NULL DEFAULT 'Geral',
  texto text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS doc_templates (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  categoria text NOT NULL DEFAULT 'Geral',
  conteudo text NOT NULL,
  docx_base64 text,
  docx_filename text,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS shared_pareceres (
  id varchar PRIMARY KEY,
  html text NOT NULL,
  processo text NOT NULL DEFAULT '',
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS processos_monitorados (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  numero text NOT NULL,
  tribunal text NOT NULL,
  apelido text NOT NULL DEFAULT '',
  classe text NOT NULL DEFAULT '',
  orgao_julgador text NOT NULL DEFAULT '',
  data_ajuizamento text NOT NULL DEFAULT '',
  ultima_movimentacao text NOT NULL DEFAULT '',
  ultima_movimentacao_data text NOT NULL DEFAULT '',
  assuntos text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'ativo',
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS app_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS tramitacao_publicacoes (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  ext_id text NOT NULL UNIQUE,
  idempotency_key text,
  numero_processo text NOT NULL DEFAULT '',
  numero_processo_mascara text NOT NULL DEFAULT '',
  tribunal text NOT NULL DEFAULT '',
  orgao text NOT NULL DEFAULT '',
  classe text NOT NULL DEFAULT '',
  texto text NOT NULL DEFAULT '',
  disponibilizacao_date text NOT NULL DEFAULT '',
  publicacao_date text NOT NULL DEFAULT '',
  inicio_prazo_date text NOT NULL DEFAULT '',
  link_tramitacao text NOT NULL DEFAULT '',
  link_tribunal text NOT NULL DEFAULT '',
  destinatarios text NOT NULL DEFAULT '[]',
  advogados text NOT NULL DEFAULT '[]',
  lida text NOT NULL DEFAULT 'nao',
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS djen_clientes (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_completo text NOT NULL,
  email text NOT NULL DEFAULT '',
  tratamento text NOT NULL DEFAULT '',
  nome_caso text NOT NULL DEFAULT '',
  numero_processo text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS djen_publicacoes (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  execucao_id text NOT NULL DEFAULT '',
  numero_processo text NOT NULL,
  texto text NOT NULL DEFAULT '',
  inicio_sessao text NOT NULL DEFAULT '',
  fim_sessao text NOT NULL DEFAULT '',
  prazo_oral text NOT NULL DEFAULT '',
  link_documento text NOT NULL DEFAULT '',
  cliente_id text NOT NULL DEFAULT '',
  cliente_nome text NOT NULL DEFAULT '',
  email_status text NOT NULL DEFAULT 'nao_enviado',
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS djen_execucoes (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'executando',
  total_publicacoes text NOT NULL DEFAULT '0',
  processadas text NOT NULL DEFAULT '0',
  com_erro text NOT NULL DEFAULT '0',
  ignoradas text NOT NULL DEFAULT '0',
  log text NOT NULL DEFAULT '',
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS conversations (
  id serial PRIMARY KEY,
  title text NOT NULL DEFAULT 'Nova Conversa',
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS messages (
  id serial PRIMARY KEY,
  conversation_id integer NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);
`);

export const db = drizzle(pglite);
