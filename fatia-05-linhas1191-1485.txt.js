
}

// ══════════════════════════════════════════════════════
//  RENDER RESULTADO
// ══════════════════════════════════════════════════════
function atualizarResultado(txt) {
  document.getElementById('secao-resultado').classList.remove('hidden');
  const box = document.getElementById('resultado-box');
  box.innerHTML = '';
  box.textContent = txt;
}

function renderResultado(txt) {
  document.getElementById('secao-resultado').classList.remove('hidden');
  const box = document.getElementById('resultado-box');
  box.innerHTML = '';
  const blocks = txt.split(/\n{2,}/);
  blocks.forEach(block => {
    const t = block.trim(); if (!t) return;
    const p = document.createElement('p');
    const lines = t.split('\n');
    const isSingle = lines.length === 1;
    const isTitulo = isSingle && t === t.toUpperCase() && t.length > 2 && /[A-ZÁÉÍÓÚÃÕ]/.test(t) && !/^\d+\./.test(t);
    const isLista  = /^\d+[.)]\s/.test(t) || /^[a-z]\)/.test(t) || /^[-–]\s/.test(t);
    const isCitacao = (t.startsWith('"') || t.startsWith('\u201c')) && t.length > 60;
    if (isTitulo)  p.className = 'titulo-peca';
    else if (isLista)   p.className = 'item-lista';
    else if (isCitacao) p.className = 'citacao';
    else p.className = 'paragrafo';
    lines.forEach((l, i) => { if (i > 0) p.appendChild(document.createElement('br')); p.appendChild(document.createTextNode(l)); });
    box.appendChild(p);
  });
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ══════════════════════════════════════════════════════
//  LOADING
// ══════════════════════════════════════════════════════
function setLoading(on) {
  document.getElementById('stop-bar').classList.toggle('hidden', !on);
  document.querySelectorAll('.action-btn').forEach(b => b.disabled = on);
}
function pararTudo() {
  abortCtrl?.abort(); chatAbort?.abort();
  setLoading(false);
}

// ══════════════════════════════════════════════════════
//  COPIAR / BAIXAR
// ══════════════════════════════════════════════════════
function copiarResultado() {
  if (!resultado) return;
  navigator.clipboard.writeText(resultado);
  const b = document.getElementById('btn-copiar');
  b.textContent = '✅ Copiado!';
  setTimeout(() => b.textContent = '📋 Copiar', 2000);
}
function baixarTxt() {
  if (!resultado) return;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([resultado], { type: 'text/plain;charset=utf-8' }));
  a.download = `juridico-${Date.now()}.txt`; a.click();
}
function baixarRtf() {
  if (!resultado) return;
  const rtf = `{\\rtf1\\ansi\\deff0\n{\\fonttbl{\\f0 Times New Roman;}}\n{\\f0\\fs26\n${
    resultado.split(/\n\n+/).map(block => {
      const t = block.trim(); if (!t) return '';
      if (t === t.toUpperCase() && t.length > 2 && /[A-Z]/.test(t) && !/^\d/.test(t))
        return `\\pard\\qj\\b ${t.replace(/[\\{}]/g,'\\$&')}\\b0\\par\\par`;
      if (/^\d+[.)]\s/.test(t) || /^[-–]\s/.test(t))
        return `\\pard\\qj\\li720 ${t.replace(/[\\{}]/g,'\\$&')}\\par\\par`;
      return `\\pard\\qj\\fi2268 ${t.replace(/[\\{}]/g,'\\$&')}\\par\\par`;
    }).join('\n')
  }\n}}`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([rtf], { type: 'application/rtf' }));
  a.download = `juridico-${Date.now()}.rtf`; a.click();
}

// ══════════════════════════════════════════════════════
//  EXPORTAR WORD (DOCX)
// ══════════════════════════════════════════════════════
function baixarWord() {
  if (!resultado || !window.docx) { alert('Biblioteca docx não carregada.'); return; }
  
  const { Document, Paragraph, TextRun, AlignmentType, HeadingLevel } = docx;
  const paragrafos = resultado.split(/\n{2,}/).map(block => {
    const t = block.trim();
    if (!t) return null;
    
    const isTitulo = t === t.toUpperCase() && t.length > 2 && /[A-Z]/.test(t) && !/^\d/.test(t);
    
    if (isTitulo) {
      return new Paragraph({
        text: t,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 120 }
      });
    }
    
    return new Paragraph({
      children: [new TextRun(t)],
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 1134 },
      spacing: { line: 360 }
    });
  }).filter(Boolean);

  const doc = new Document({
    sections: [{
      properties: {},
      children: paragrafos
    }]
  });

  docx.Packer.toBlob(doc).then(blob => {
    saveAs(blob, `juridico-${Date.now()}.docx`);
  });
}

// ══════════════════════════════════════════════════════
//  CHAT DE REFINAMENTO
// ══════════════════════════════════════════════════════
function toggleChat() {
  const a = document.getElementById('chat-area');
  const ar = document.getElementById('chat-arrow');
  a.classList.toggle('hidden');
  ar.textContent = a.classList.contains('hidden') ? '▼' : '▲';
}
async function enviarChat() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim(); if (!msg || !resultado) return;
  input.value = '';
  chatHistory.push({ role: 'user', content: msg });
  renderChat();
  const kg = getChaveGeracao();
  const kr = getChaveResumo();
  const chave = kg || kr;
  if (!chave) { chatHistory.push({ role:'assistant', content:'⚠️ Configure uma chave de API para usar o chat.' }); renderChat(); return; }
  try {
    const resposta = await chamarIA(chave, chatHistory);
    chatHistory.push({ role:'assistant', content: resposta });
    if (resposta.length > resultado.length * 0.5 && !resposta.toLowerCase().startsWith('para'))
      resultado = resposta;
    renderChat();
    renderResultado(resultado);
  } catch(e) {
    chatHistory.push({ role:'assistant', content:'❌ Erro: ' + e.message });
    renderChat();
  }
}
document.getElementById('chat-input')?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarChat(); }
});
function renderChat() {
  const container = document.getElementById('chat-msgs');
  container.innerHTML = '';
  chatHistory.filter(m => m.role !== 'system').forEach(m => {
    const div = document.createElement('div');
    div.className = m.role === 'user' ? 'msg-user' : 'msg-ia';
    const role = document.createElement('div');
    role.className = 'msg-role';
    role.textContent = m.role === 'user' ? 'Você' : 'IA';
    div.appendChild(role);
    div.appendChild(document.createTextNode(m.content));
    container.appendChild(div);
  });
  container.scrollTop = container.scrollHeight;
}

// ══════════════════════════════════════════════════════
//  EDITOR DE FORMATAÇÃO
// ══════════════════════════════════════════════════════
function carregarEditor() {
  const conteudoSalvo = loadLS('aj_editor_content', '');
  if (conteudoSalvo) document.getElementById('editor-content').innerHTML = conteudoSalvo;
  
  const fmt = loadLS('aj_formatacao', formatacaoAtual);
  formatacaoAtual = { ...formatacaoAtual, ...fmt };
  
  document.getElementById('ed-fonte').value = formatacaoAtual.fonte;
  document.getElementById('ed-tamanho').value = formatacaoAtual.tamanho;
  document.getElementById('ed-recuo').value = formatacaoAtual.recuo;
  document.getElementById('ed-espacamento').value = formatacaoAtual.espacamento;
  
  aplicarFormatacao();
}

function salvarEditorAuto() {
  const conteudo = document.getElementById('editor-content').innerHTML;
  saveLS('aj_editor_content', conteudo);
}

function aplicarFormatacao() {
  formatacaoAtual.fonte = document.getElementById('ed-fonte').value;
  formatacaoAtual.tamanho = parseInt(document.getElementById('ed-tamanho').value);
  formatacaoAtual.recuo = parseFloat(document.getElementById('ed-recuo').value);
  formatacaoAtual.espacamento = parseFloat(document.getElementById('ed-espacamento').value);
  
  const editor = document.getElementById('editor-content');
  editor.style.fontFamily = formatacaoAtual.fonte;
  editor.style.fontSize = formatacaoAtual.tamanho + 'pt';
  editor.style.lineHeight = formatacaoAtual.espacamento;
  editor.style.textIndent = formatacaoAtual.recuo + 'cm';
  editor.style.textAlign = formatacaoAtual.alinhamento;
  
  saveLS('aj_formatacao', formatacaoAtual);
}

function toggleFormatacao(tipo) {
  formatacaoAtual[tipo] = !formatacaoAtual[tipo];
  document.getElementById(`fmt-${tipo}`).classList.toggle('ativo', formatacaoAtual[tipo]);
  
  const editor = document.getElementById('editor-content');
  if (tipo === 'bold') editor.style.fontWeight = formatacaoAtual.bold ? 'bold' : 'normal';
  if (tipo === 'italic') editor.style.fontStyle = formatacaoAtual.italic ? 'italic' : 'normal';
  if (tipo === 'underline') editor.style.textDecoration = formatacaoAtual.underline ? 'underline' : 'none';
  
  saveLS('aj_formatacao', formatacaoAtual);
}

function setAlinhamento(align) {
  formatacaoAtual.alinhamento = align;
  ['left','center','right','justify'].forEach(a => {
    document.getElementById(`align-${a}`).classList.toggle('ativo', a === align);
  });
  document.getElementById('editor-content').style.textAlign = align;
  saveLS('aj_formatacao', formatacaoAtual);
}

function limparEditor() {
  if (!confirm('Limpar todo o conteúdo do editor?')) return;
  document.getElementById('editor-content').innerHTML = '<p>Digite ou cole seu texto aqui para formatar...</p>';
  salvarEditorAuto();
}

function enviarParaEditor() {
  if (!resultado) return;
  document.getElementById('editor-content').innerHTML = resultado.split('\n\n').map(p => `<p>${p}</p>`).join('');
  salvarEditorAuto();
  mudarAba('editor', document.querySelectorAll('.tab-btn')[1]);
}

async function gerarPecaDoEditor() {
  const conteudo = document.getElementById('editor-content').innerText.trim();
  if (!conteudo) { alert('Editor vazio.'); return; }
  
  document.getElementById('txt-processo').value = conteudo;
  mudarAba('processar', document.querySelector('.tab-btn'));
  await executar('modo-redacao');
}

function baixarEditorWord() {
  const conteudo = document.getElementById('editor-content').innerText.trim();
  if (!conteudo || !window.docx) { alert('Editor vazio ou biblioteca não carregada.'); return; }
  
  const { Document, Paragraph, TextRun, AlignmentType } = docx;
  const paragrafos = conteudo.split(/\n{2,}/).map(t => {
    if (!t.trim()) return null;
    return new Paragraph({
      children: [new TextRun(t.trim())],
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: formatacaoAtual.recuo * 567 },
      spacing: { line: formatacaoAtual.espacamento * 240 }
    });
  }).filter(Boolean);

  const doc = new Document({ sections: [{ properties: {}, children: paragrafos }] });
  docx.Packer.toBlob(doc).then(blob => saveAs(blob, `editor-${Date.now()}.docx`));
}

function baixarEditorMarkdown() {
  const conteudo = document.getElementById('editor-content').innerText.trim();
  if (!conteudo) { alert('Editor vazio.'); return; }
  
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([conteudo], { type: 'text/markdown' }));
  a.download = `editor-${Date.now()}.md`;
  a.click();
}

// ══════════════════════════════════════════════════════
//  TEMPLATES
// ══════════════════════════════════════════════════════
function salvarComoTemplate() {
  abrirFormTemplate();
}

function abrirFormTemplate(id) {
  editTemplateId = id || null;
  const modal = document.getElementById('modal-template');
  const titulo = document.getElementById('modal-template-titulo');
  