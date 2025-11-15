import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, msg: 'API online' });
});

app.get('/api/cep/:cep', async (req, res) => {
  try {
    const { cep } = req.params;
    const cleanCep = cep.replace(/\D/g, '');

    if (!cleanCep || cleanCep.length !== 8) {
      return res.status(400).json({ error: 'CEP inválido' });
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    if (!response.ok) {
      return res.status(502).json({ error: 'Erro ao consultar ViaCEP' });
    }

    const data = await response.json();

    if (data.erro) {
      return res.status(404).json({ error: 'CEP não encontrado' });
    }

    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno de servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
