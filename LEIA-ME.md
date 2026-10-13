# Assistente Jurídico — rodando no seu PC (sem Replit, sem Vercel, sem Neon)

As telas e funções são as mesmas que o Claude da Replit entregou: assistente, jurisprudência, consulta processual, PDPJ, DataJud, robô DJEN, tramitação, previdenciário, filtrador, painel de processos, Playground e o resto.
O que mudou foi só **por baixo**, para ele rodar fora da Replit.

## Jeito mais fácil: baixar pronto (Windows)
1. Envie esta pasta para o GitHub pelo 🐙 do Mini SK.
2. A receita **"Gerar app para Windows"** monta o app no Windows, testa e publica. Leva uns 10 minutos.
3. No ⚙️ Execuções do Mini SK (ou na aba Releases do repositório), toque em **⤓ Baixar Assistente-Juridico-Windows.zip**.
4. Extraia o .zip e dê dois cliques em **`Abrir-Juridico.bat`**. Não precisa instalar nada.

## Montando no seu PC
1. Instale o **Node.js 22 "LTS"** (https://nodejs.org).
2. Extraia este .zip. Não abra de dentro do .zip.
3. Dê dois cliques em **`iniciar.bat`**. Na primeira vez ele instala as peças, o que demora. Depois abre sozinho em **http://localhost:5000**.

**No celular, no mesmo Wi-Fi:** com o app aberto no PC, ele também atende em `http://IP-DO-PC:5000`.

## Chaves e senha (.env)
Copie **`.env.exemplo`** com o nome **`.env`** e preencha só o que usar: senha do app, IA, DataJud, PDPJ. Várias chaves também dá para colocar pela própria tela.
**Nunca mande o `.env` para ninguém nem para o GitHub.** O `.gitignore` já impede isso.

## Onde ficam os dados
Tudo fica na pasta **`dados/`**, ao lado do programa: ementas, modelos, histórico da IA, processos monitorados, DJEN, configurações e salvos do Playground.
Para fazer cópia de segurança, copie a pasta `dados` inteira para o Drive.

## O que foi consertado
| Problema | Por quê | O que foi feito |
|---|---|---|
| No PC aparecia "Cannot GET /" ou "404 com metade de um HTML" | O servidor só tinha as rotas `/api` e **nunca mostrava a tela**. Na Replit e na Vercel, outra coisa fazia isso | `server/web.ts`: o próprio servidor mostra a tela |
| `npm start` falhava ("dist/index.cjs não existe") | O comando de montar o servidor não estava ligado ao `build` | O `start` roda o servidor direto (tsx), sem esse passo |
| `npm run dev` falhava no Windows | `NODE_ENV=development tsx …` não funciona no cmd do Windows | Comandos que funcionam em qualquer sistema |
| Pedia `DATABASE_URL` (Neon/Postgres) | — | O banco agora é local (PGlite, o mesmo Postgres) em `dados/banco`. As tabelas são criadas sozinhas |
| O login não ficava salvo | O cookie era `secure: true` e só funcionava em https, então no `http://localhost` ele se perdia | `secure: "auto"` |
| A sessão precisava do Postgres | — | A sessão fica na memória do programa |
| Voz (TTS) muda | Usava Python e a pasta `/tmp`, que só existiam na Replit | Voz Francisca direto pelo Node (precisa de internet) |
| Pastas `/tmp` em OCR e transcrição | Não existem no Windows | Usa a pasta temporária do sistema |
| Botão de git push quebrava | Usava `require` num projeto que não aceita `require` | Corrigido |
| Ícones e título | Faltavam os ícones e o título dizia "HTML Playground" | Ícone ⚖ e título "Assistente Jurídico" |

### Funções que dependem de programas extras (opcional)
- **OCR de PDF escaneado** precisa de `pdftoppm` (Poppler) e `tesseract` instalados no PC.
- **Transcrever áudio** precisa do `ffmpeg`.

Sem eles, só essas duas funções avisam erro. O resto funciona normalmente.

## Comandos (para quem mexe no código)
- `npm run iniciar` instala o que falta, monta a tela e liga o app (é o que o `iniciar.bat` faz).
- `npm run dev` é o modo de edição: a tela atualiza sozinha enquanto você mexe.
- `npm run build` monta a tela em `dist/`.
- `npm start` liga o app já montado.
- `.github/workflows/teste.yml` testa tudo no GitHub (Linux e Windows) a cada envio. Verde quer dizer que funciona.
- `.github/workflows/windows.yml` gera o **Assistente-Juridico-Windows.zip** pronto e já testado.


## Banco que se conserta sozinho (07/10/2026)
Se o computador desligar ou reiniciar com o jurídico aberto, o banco local pode estragar e o programa nem liga ("porta 5000 recusada"). Agora, ao abrir, ele percebe isso, **guarda o banco velho de lado** (pasta `dados/banco-com-defeito-…`, nada é apagado), cria um banco novo e liga normalmente. Fica um aviso em `dados/AVISO-banco-recuperado.txt`.
Para evitar: feche o jurídico apertando Ctrl+C na janela preta, ou fechando a janela preta, antes de desligar o PC.

## Chave nova do Gemini — "AQ." (08/10/2026)
O Google mudou as chaves do Gemini: as novas começam com **AQ.** (as antigas, **AIza**, param de funcionar em setembro). As novas são recusadas no caminho "compatível com OpenAI" que o programa usava.
- Agora o programa **reconhece AIza e AQ.** em todos os lugares onde se cola chave.
- Uma "ponte" (`gemini-ponte.ts`) traduz sozinha qualquer pedido ao Gemini para o caminho próprio dele, que aceita as duas chaves. Nenhuma tela precisou mudar.
- O modelo padrão do Gemini passou de `gemini-2.0-flash` (antigo) para `gemini-2.5-flash`.

## Conserto de 09/10/2026 — "só funcionava no primeiro dia"
**Causa:** quando a janela preta era fechada (ou o PC desligava) com o programa aberto, o banco local deixava uma **trava** na pasta `dados/banco`. No dia seguinte o banco não abria: aparecia "Aborted()", "aperte qualquer tecla" e fechava.
**O que mudou:**
1. Antes de abrir, o programa **tira a trava velha** sozinho. Na maioria das vezes isso já resolve, e os seus dados continuam lá.
2. Se mesmo assim o banco não abrir, o programa **não fecha mais**: guarda o banco com defeito ao lado (`dados/banco-com-defeito-…`, nada é apagado), cria um banco novo e segue. Deixa um aviso em `dados/AVISO-banco-recuperado.txt`.
**Se já estava quebrado:** troque pelos arquivos desta versão (mantenha a sua pasta `dados`) e abra de novo.
**Para fechar do jeito certo:** na janela preta, aperte **Ctrl + C** e espere ela terminar.

## Porta automática (09/10/2026)
Você não precisa mais mexer com "porta". Ao abrir:
- se o programa **já estiver aberto** (ficou ligado de antes), ele só abre o navegador nele — não abre outro por cima (isso estragaria o banco);
- se a porta de sempre estiver **ocupada por outro programa**, ele escolhe sozinho uma livre (5001, 5002…) e abre o navegador nela. O endereço certo aparece escrito na janela preta.
