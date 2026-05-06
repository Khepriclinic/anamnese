/**
 * Salva as respostas do formulário no GitHub e envia email
 * Integração com GitHub API + Email Service
 */

async function salvarResposta() {
  // Coleta todos os dados do formulário
  const dados = {
    timestamp: new Date().toISOString(),
    nome: document.getElementById('nome')?.value || 'Sem nome',
    email: document.getElementById('email')?.value || 'Sem email',
    telefone: document.getElementById('tel')?.value || 'Sem telefone',
    todas_as_respostas: S // S é o objeto global que armazena todas as respostas
  };

  console.log('Salvando resposta:', dados);

  try {
    // Envia para o servidor (backend)
    const response = await fetch('/.netlify/functions/save-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Resposta salva com sucesso!', result);
      mostrarMensagemSucesso('Dados salvos com sucesso!');
      return true;
    } else {
      console.error('❌ Erro ao salvar:', response.statusText);
      mostrarMensagemErro('Erro ao salvar os dados');
      return false;
    }
  } catch (error) {
    console.error('❌ Erro na requisição:', error);
    // Fallback: salva localmente se falhar online
    salvarLocalmente(dados);
    mostrarMensagemSucesso('Dados salvos localmente (offline)');
    return true;
  }
}

function salvarLocalmente(dados) {
  const respostas = JSON.parse(localStorage.getItem('respostas_formulario') || '[]');
  respostas.push(dados);
  localStorage.setItem('respostas_formulario', JSON.stringify(respostas));
  console.log('💾 Salvo em localStorage');
}

function mostrarMensagemSucesso(mensagem) {
  const div = document.createElement('div');
  div.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #1a9e75;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  div.textContent = mensagem;
  document.body.appendChild(div);
  
  setTimeout(() => {
    div.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => div.remove(), 300);
  }, 3000);
}

function mostrarMensagemErro(mensagem) {
  const div = document.createElement('div');
  div.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #7a0020;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  div.textContent = mensagem;
  document.body.appendChild(div);
  
  setTimeout(() => {
    div.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => div.remove(), 300);
  }, 3000);
}

// Adiciona estilos de animação
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);
