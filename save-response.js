async function salvarResposta() {
  const nome = document.getElementById('nome')?.value || 'Sem nome';
  const dados = {
    timestamp: new Date().toISOString(),
    nome: nome,
    telefone: document.getElementById('tel')?.value || '',
    sexo: document.getElementById('sexo')?.value || '',
    queixa: document.getElementById('queixa')?.value || '',
    respostas: typeof S !== 'undefined' ? S : {}
  };

  console.log('Enviando anamnese:', dados);

  try {
    const response = await fetch('https://formspree.io/f/xyzqazop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _subject: 'Nova Anamnese: ' + dados.nome,
        nome: dados.nome,
        telefone: dados.telefone,
        sexo: dados.sexo,
        queixa: dados.queixa,
        timestamp: dados.timestamp,
        dados_completos: JSON.stringify(dados.respostas, null, 2)
      })
    });

    if (response.ok) {
      alert('Anamnese salva e email enviado para karen.zanferrari@hotmail.com');
      console.log('Email enviado com sucesso');
    } else {
      alert('Erro ao enviar email');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao processar anamnese');
  }
}
