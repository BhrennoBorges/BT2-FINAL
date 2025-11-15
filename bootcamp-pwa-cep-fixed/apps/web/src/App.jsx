import { useState } from 'react';
import { buscarCep } from './apiClient';

function App() {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleBuscar(event) {
    event.preventDefault();
    setErro('');
    setResultado(null);

    const somenteNumeros = cep.replace(/\D/g, '');

    if (!somenteNumeros || somenteNumeros.length !== 8) {
      setErro('Digite um CEP válido com 8 dígitos.');
      return;
    }

    try {
      setLoading(true);
      const data = await buscarCep(somenteNumeros);
      setResultado(data);
    } catch (e) {
      setErro(e.message || 'Erro ao buscar CEP.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: '1.5rem', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <h1>Consulta de CEP (PWA)</h1>
      <p>Digite um CEP brasileiro e consulte o endereço usando o backend que consome a API ViaCEP.</p>

      <form onSubmit={handleBuscar} style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Ex: 70000-000"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {erro && <p style={{ color: 'red', marginTop: '0.75rem' }}>{erro}</p>}

      {resultado && (
        <section
          style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
          data-testid="api-ok"
        >
          <h2>Resultado</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><strong>CEP:</strong> {resultado.cep}</li>
            <li><strong>Logradouro:</strong> {resultado.logradouro}</li>
            <li><strong>Bairro:</strong> {resultado.bairro}</li>
            <li><strong>Cidade:</strong> {resultado.localidade}</li>
            <li><strong>UF:</strong> {resultado.uf}</li>
          </ul>
        </section>
      )}
    </main>
  );
}

export default App;
