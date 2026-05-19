# Entregas

Sistema de gerenciamento de entregas com autenticação e autorização.

## Aplicações

| Pasta | Descrição |
|---|---|
| `backend/` | API RESTful — Node.js, Express, Prisma, PostgreSQL |
| `frontend/` | Interface web — React, Vite, TypeScript |

## Como rodar

### Backend

```bash
cd backend
npm run docker:up
npm install
npm run prisma:migrate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Funcionalidades

- Cadastro e login com roles (`customer` / `sale`)
- Rotas protegidas por JWT
- CRUD de entregas com rastreamento de status
- Logs automáticos a cada atualização de status