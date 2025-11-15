# Bootcamp II – PWA CEP + Backend

Monorepo com um PWA de consulta de CEP consumindo um backend próprio, que por sua vez usa a API pública ViaCEP.
![brave_cOjg0ykm3R](https://github.com/user-attachments/assets/dae59bcc-2d38-43f7-9a63-958687a098d1)

## Estrutura

```text
├─ apps/
│  ├─ web/   # PWA (Vite + React)
│  └─ api/   # Backend (Node + Express, proxy ViaCEP)
├─ docker-compose.yml
└─ .github/workflows/ci.yml
```

## Como rodar local sem Docker

### Backend

```bash
cd apps/api
npm install
npm run dev
```

A API ficará em `http://localhost:3000`.

### Web (PWA)

```bash
cd apps/web
npm install
npm run dev
```

A aplicação ficará em `http://localhost:5173`.

## Como rodar com Docker Compose

Na raiz do projeto:

```bash
docker compose up --build
```

- Web: http://localhost:8080
- API: http://localhost:3000

## Testes

### Testes unitários (exemplo simples)

```bash
cd apps/web
npm test
```

### Testes E2E (Playwright)

```bash
cd apps/web
npx playwright install
npm run test:e2e
```

Por padrão o teste usa `E2E_BASE_URL=http://localhost:8080` (pode ser sobrescrito).

## PWA

- Manifest em `apps/web/public/manifest.webmanifest`
- Service Worker em `apps/web/src/service-worker.js`
- Funciona como PWA instalável quando publicado em HTTPS (ex.: GitHub Pages).

## CI (GitHub Actions)

O workflow em `.github/workflows/ci.yml`:

- Instala dependências do web e api
- Roda testes unitários (web)
- Faz build do PWA
- Sobe API + preview
- Roda Playwright (E2E)
- Publica `apps/web/dist` como artefato
