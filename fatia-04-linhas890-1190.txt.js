// ══════════════════════════════════════════════════════
//  OCR (IMAGEM)
// ══════════════════════════════════════════════════════
async function importarImagem(input) {
  const file = input.files[0]; input.value = '';
  if (!file) return;
  const sp = document.getElementById('import-spinner');
  sp.classList.remove('hidden');
  try {
    const worker = await Tesseract.createWorker('por');
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();
    if (!text.trim()) throw new Error('Não foi possível extrair texto da imagem.');
    const ta = document.getElementById('txt-processo');
    ta.value = ta.value ? ta.value + '\n\n' + text : text;
  } catch(e) { alert('Erro no OCR: ' + e.message); }
  finally { sp.classList.add('hidden'); }
}

// ══════════════════════════════════════════════════════
//  VOZ
// ══════════════════════════════════════════════════════
function toggleVoz() {
  if (isListening) { recognition?.stop(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('Use Chrome ou Edge para ditar por voz.'); return; }
  recognition = new SR();
  recognition.lang = 'pt-BR'; recognition.continuous = true; recognition.interimResults = true;
  let fullText = ''; let timer = null;
  const scheduleStop = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { try { recognition.stop(); } catch {} }, 1800);
  };
  recognition.onresult = e => {
    let f = '', itr = '';
    for (let i = 0; i < e.results.length; i++) {
      if (e.results[i].isFinal) f += e.results[i][0].transcript;
      else itr += e.results[i][0].transcript;
    }
    fullText = f || itr;
    if (fullText) scheduleStop();
  };
  recognition.onend = () => {
    if (timer) clearTimeout(timer);
    isListening = false;
    document.getElementById('btn-voz').textContent = '🎤 Ditar';
    if (fullText.trim()) {
      const ta = document.getElementById('txt-processo');
      ta.value = ta.value ? ta.value.trimEnd() + '\n\n' + fullText.trim() : fullText.trim();
    }
  };
  recognition.onerror = () => { isListening = false; document.getElementById('btn-voz').textContent = '🎤 Ditar'; };
  recognition.start();
  isListening = true;
  document.getElementById('btn-voz').textContent = '🔴 Parar';
}

// ══════════════════════════════════════════════════════
//  TTS (Text-to-Speech)
// ══════════════════════════════════════════════════════
function carregarVozesTTS() {
  if (!window.speechSynthesis) return;
  const carregarVozes = () => {
    ttsVoices = speechSynthesis.getVoices().filter(v => v.lang.startsWith('pt'));
    const select = document.getElementById('tts-voice');
    select.innerHTML = '<option value="">Voz padrão</option>';
    ttsVoices.forEach((v, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${v.name} (${v.lang})`;
      select.appendChild(opt);
    });
    const savedVoice = loadLS('aj_tts_voice', '');
    if (savedVoice) select.value = savedVoice;
    const savedRate = loadLS('aj_tts_rate', 1);
    document.getElementById('tts-rate').value = savedRate;
    document.getElementById('tts-rate-label').textContent = savedRate + 'x';
  };
  if (speechSynthesis.getVoices().length) carregarVozes();
  else speechSynthesis.onvoiceschanged = carregarVozes;
}
function salvarVozTTS() {
  const voice = document.getElementById('tts-voice').value;
  const rate = document.getElementById('tts-rate').value;
  saveLS('aj_tts_voice', voice);
  saveLS('aj_tts_rate', rate);
  document.getElementById('tts-rate-label').textContent = rate + 'x';
}
function abrirTTS() {
  if (!window.speechSynthesis) { alert('Seu navegador não suporta TTS.'); return; }
  document.getElementById('tts-controls').classList.remove('hidden');
}
function iniciarTTS() {
  if (!window.speechSynthesis || !resultado) return;
  pararTTS();
  ttsUtterance = new SpeechSynthesisUtterance(resultado);
  const voiceIdx = document.getElementById('tts-voice').value;
  if (voiceIdx) ttsUtterance.voice = ttsVoices[voiceIdx];
  ttsUtterance.rate = parseFloat(document.getElementById('tts-rate').value);
  ttsUtterance.lang = 'pt-BR';
  speechSynthesis.speak(ttsUtterance);
}
function pararTTS() {
  if (window.speechSynthesis) speechSynthesis.cancel();
}

// ══════════════════════════════════════════════════════
//  JURISPRUDÊNCIA
// ══════════════════════════════════════════════════════
function toggleJuris() {
  const a = document.getElementById('juris-area');
  const ar = document.getElementById('juris-arrow');
  a.classList.toggle('hidden');
  ar.textContent = a.classList.contains('hidden') ? '▼' : '▲';
}

// ══════════════════════════════════════════════════════
//  PROMPTS
// ══════════════════════════════════════════════════════
function buildPromptSistema(acao, customPrompt) {
  const base = 'Você é um advogado experiente de Minas Gerais. Escreva de forma formal, técnica e direta, sem introduções desnecessárias. Use linguagem jurídica precisa.';
  const esforcoDesc = EFFORT_INFO[effortLevel]?.desc || '';
  const verbDesc = verbosity === 'curta' ? 'Seja conciso.' : 'Seja completo e detalhado.';
  const promptGlobal = getPromptGlobal();

  let promptBase = base;
  if (promptGlobal) promptBase += '\n\nREGRAS ESPECÍFICAS:\n' + promptGlobal;
  promptBase += `\n\nNível de esforço: ${esforcoDesc}. ${verbDesc}`;

  if (customPrompt) return `${promptBase}\n\n${customPrompt}`;

  const acoes = {
    'resumir':         'Resuma o documento abaixo de forma objetiva, mantendo todos os fatos relevantes, partes, pedidos e fundamentos legais. Elimine repetições e sujeiras de formatação.',
    'revisar':         'Revise o texto jurídico abaixo, corrigindo erros gramaticais, de concordância, de técnica jurídica e de formatação. Mantenha o estilo original.',
    'refinar':         'Refine o texto jurídico abaixo, melhorando a argumentação, a clareza e a força persuasiva, sem alterar os fatos ou pedidos.',
    'simplificar':     'Reescreva o texto abaixo em linguagem simples e acessível, sem jargões jurídicos, mantendo o sentido original.',
    'minuta':          'Com base no texto abaixo, gere uma minuta completa da peça jurídica cabível, com todos os elementos formais necessários. Use formatação adequada com parágrafos recuados e estrutura profissional.',
    'analisar':        'Analise o documento jurídico abaixo, identificando: partes, pedidos, fundamentos, pontos fortes, pontos fracos e riscos processuais.',
    'modo-estrito':    'Corrija o texto abaixo, mantendo estritamente o conteúdo original. Apenas ajuste gramática, pontuação e técnica jurídica.',
    'modo-redacao':    'Redija uma peça jurídica completa com base no texto abaixo. Identifique automaticamente o tipo de peça necessária e a elabore com fundamentação legal sólida e jurisprudência aplicável.',
    'modo-interativo': 'Analise o texto abaixo e identifique lacunas, informações faltantes, contradições ou pontos que precisam de esclarecimento para elaborar uma peça jurídica completa.',
  };
  return `${promptBase}\n\n${acoes[acao] || 'Analise e processe o texto jurídico abaixo.'}`;
}

// ══════════════════════════════════════════════════════
//  CHAMADAS DE API
// ══════════════════════════════════════════════════════
async function chamarGemini(chave, msgs, modelo) {
  modelo = modelo || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${chave}`;
  const system = msgs.find(m => m.role === 'system');
  const contents = msgs.filter(m => m.role !== 'system').map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));
  if (system && contents.length > 0) contents[0].parts[0].text = system.content + '\n\n' + contents[0].parts[0].text;
  const resp = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, generationConfig: { temperature: 0.7 } })
  });
  if (!resp.ok) { const e = await resp.json().catch(()=>({})); throw new Error(e.error?.message || `Gemini erro ${resp.status}`); }
  const d = await resp.json();
  return d.candidates[0].content.parts[0].text;
}

async function chamarOpenAI(chave, msgs, modelo, baseUrl) {
  modelo = modelo || 'gpt-4o';
  baseUrl = baseUrl || 'https://api.openai.com/v1';
  const resp = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${chave}` },
    body: JSON.stringify({ model: modelo, messages: msgs, temperature: 0.7, stream: false })
  });
  if (!resp.ok) { const e = await resp.json().catch(()=>({})); throw new Error(e.error?.message || `OpenAI erro ${resp.status}`); }
  const d = await resp.json();
  return d.choices[0].message.content;
}

async function chamarClaude(chave, msgs, modelo) {
  modelo = modelo || 'claude-haiku-3-5';
  const system = msgs.find(m => m.role === 'system');
  const messages = msgs.filter(m => m.role !== 'system');
  const body = { model: modelo, max_tokens: 8192, messages, temperature: 0.7 };
  if (system) body.system = system.content;
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': chave,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify(body)
  });
  if (!resp.ok) { const e = await resp.json().catch(()=>({})); throw new Error(e.error?.message || `Claude erro ${resp.status}`); }
  const d = await resp.json();
  return d.content[0].text;
}

async function chamarGroq(chave, msgs, modelo) {
  modelo = modelo || 'llama-3.3-70b-versatile';
  return chamarOpenAI(chave, msgs, modelo, 'https://api.groq.com/openai/v1');
}

async function chamarIA(chave, msgs, modeloOverride) {
  const prov = detectProvider(chave);
  const modelo = modeloOverride || getModelo() || '';
  if (prov === 'Gemini')  return chamarGemini(chave, msgs, modelo || 'gemini-1.5-pro');
  if (prov === 'Claude')  return chamarClaude(chave, msgs, modelo || 'claude-haiku-3-5');
  if (prov === 'Groq')    return chamarGroq(chave, msgs, modelo);
  return chamarOpenAI(chave, msgs, modelo || 'gpt-4o');
}

// ══════════════════════════════════════════════════════
//  EXECUTAR AÇÃO PRINCIPAL
// ══════════════════════════════════════════════════════
async function executar(acao, customPrompt) {
  const texto = document.getElementById('txt-processo').value.trim();
  if (!texto) { alert('Cole ou importe o texto do documento antes.'); return; }

  const kr = getChaveResumo();
  const kg = getChaveGeracao();

  // Ementas selecionadas
  const emsTexto = [...emsSelected].map(id => {
    const em = ementas.find(e => e.id === id);
    return em ? `[${em.titulo} — ${em.categoria}]\n${em.texto}` : '';
  }).filter(Boolean).join('\n\n');

  const jurisManual = document.getElementById('txt-juris').value.trim();
  const jurisFull = [jurisManual, emsTexto].filter(Boolean).join('\n\n');

  setLoading(true);
  document.getElementById('badge-demo').classList.add('hidden');

  try {
    let textoFinal = texto;

    // ── PASSO 1: Resumir/limpar com Gemini (se chave disponível e texto longo) ──
    if (kr && texto.length > 1500) {
      atualizarResultado('⏳ Limpando e resumindo o texto com Gemini...');
      const resumoMsgs = [
        { role: 'system', content: 'Você é um assistente jurídico. Resuma o texto abaixo de forma objetiva, mantendo todos os fatos relevantes, partes, pedidos, decisões e fundamentos legais. Elimine cabeçalhos de página, rodapés, certificados digitais e repetições.' },
        { role: 'user', content: texto }
      ];
      textoFinal = await chamarGemini(kr, resumoMsgs, 'gemini-1.5-flash');
      textoResumido = textoFinal;
    }

    // ── PASSO 2: Gerar peça com chave principal ──
    const promptSistema = buildPromptSistema(acao, customPrompt);
    const userContent = jurisFull
      ? `${textoFinal}\n\n---\nJURISPRUDÊNCIA E EMENTAS PARA CITAR:\n${jurisFull}`
      : textoFinal;

    const msgs = [
      { role: 'system', content: promptSistema },
      { role: 'user', content: userContent }
    ];

    let resposta = '';
    if (kg) {
      atualizarResultado('⏳ Gerando peça...');
      resposta = await chamarIA(kg, msgs);
    } else {
      // Demo: usa Gemini Flash gratuito se tiver chave de resumo, senão avisa
      if (kr) {
        atualizarResultado('⏳ Gerando (modo demo com Gemini)...');
        resposta = await chamarGemini(kr, msgs, 'gemini-1.5-flash');
        document.getElementById('badge-demo').classList.remove('hidden');
      } else {
        atualizarResultado('⚠️ Configure ao menos uma chave de API em ⚙️ Configurações.');
        setLoading(false);
        return;
      }
    }

    // Salvar resultado
    resultado = resposta;
    renderResultado(resposta);
    chatHistory = [
      { role: 'system', content: 'Você é um advogado consultor jurídico experiente de Minas Gerais. Responda de forma direta e técnica.' },
      { role: 'user', content: `O documento gerado foi:\n\n${resposta}` },
      { role: 'assistant', content: 'Entendido. Estou pronto para refinar.' }
    ];

    // Salvar no histórico
    const labelAcao = customPrompt
      ? (acoesCustom.find(a => a.id === acao)?.label || 'Ação Custom')
      : ({ resumir:'Resumir', revisar:'Revisar', refinar:'Refinar', simplificar:'Linguagem Simples', minuta:'Gerar Minuta', analisar:'Analisar', 'modo-estrito':'Corrigir Texto', 'modo-redacao':'Redação Jurídica', 'modo-interativo':'Verificar Lacunas' }[acao] || acao);
    historico = [{ id: Date.now().toString(), acao: labelAcao, inputSnippet: texto.substring(0,120), resultado: resposta, timestamp: new Date().toLocaleString('pt-BR') }, ...historico].slice(0,15);
    saveLS('aj_historico', historico);
    renderHistorico();

  } catch(e) {
    if (e.name === 'AbortError') return;
    atualizarResultado('❌ Erro: ' + e.message);
  } finally {
    setLoading(false);
  }