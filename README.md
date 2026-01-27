# PetFind

Projeto fullstack com React (Next.js), Next.js API (backend) e PostgreSQL.

Estrutura inicial:

- `backend` - Next.js API (auth + DB)
- `frontend` - Next.js (UI)

Rápido start (Windows / PowerShell):

1) Backend (Next.js API)

```powershell
cd backend
npm install
# criar .env.local a partir de .env.example e ajustar DATABASE_URL
npm run dev
```

2) Frontend (Next.js UI)

```powershell
cd frontend
npm install
npm run dev
```

Banco de dados:
- Instale Docker e execute: `docker-compose up -d`
- Postgres: localhost:5433
- Adminer (GUI DB): http://localhost:8080 (login: postgres/postgres/petfind)

Migrations (backend):

```powershell
cd backend
npm run db:migrate
```

Portas:
- Backend: http://localhost:4000
- Frontend: http://localhost:5423

Páginas disponíveis:
- / (home)
- /login
- /register
- /pets
- /pet-details
- /matches
- /chat

Fluxo rápido (UI):
- Cadastre usuário em `/register`
- Faça login em `/login`
- Cadastre pet em `/pets`
- Veja matches em `/matches`
- Use `/chat` com o Match ID

Endpoints (Backend API):
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/me
- GET /api/pets
- POST /api/pets
- GET /api/pets/:id
- PUT /api/pets/:id
- DELETE /api/pets/:id
- POST /api/pets/:id/like
- GET /api/matches
- GET /api/matches/:id/messages
- POST /api/matches/:id/messages

Próximos passos sugeridos:
- Adicionar `docker-compose.yml` para PostgreSQL
- Criar migrations (Knex/TypeORM/Prisma)
- Implementar rotas e páginas iniciais
