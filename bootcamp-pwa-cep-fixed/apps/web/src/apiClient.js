// Detecta se está rodando no GitHub Pages (produção)
const isGithubPages = window.location.hostname.includes('github.io');

// Em produção (GitHub Pages) chamamos a ViaCEP direto (https)
// Em desenvolvimento/local usamos o backend Node (API própria)
const API_BASE = isGithubPages
  ? 'https://viacep.com.br'
  : (import.meta.env.VITE_API_URL || 'http://localhost:3000');

export async function buscarCep(cep) {
  if (isGithubPages) {
    // Chamada direta à ViaCEP em produção
    const res = await fetch(`${API_BASE}/ws/${cep}/json/`);

    if (!res.ok) {
      throw new Error('Erro ao consultar ViaCEP');
    }

    const data = await res.json();

    if (data.erro) {
      throw new Error('CEP não encontrado');
    }

    return data;
  } else {
    // Em dev/local, usa o backend Node (proxy ViaCEP)
    const res = await fetch(`${API_BASE}/api/cep/${cep}`);

    if (!res.ok) {
      throw new Error('Erro ao consultar CEP pela API');
    }

    return res.json();
  }
}
