const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function buscarCep(cep) {
  const res = await fetch(`${API_BASE}/api/cep/${cep}`);

  if (!res.ok) {
    throw new Error('Erro ao consultar CEP');
  }

  return res.json();
}
