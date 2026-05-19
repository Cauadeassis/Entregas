# Entregas — Backend
 
API RESTful para gerenciamento de entregas, construída com Node.js e TypeScript.
 
## Stack
 
| Camada | Tecnologia |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express |
| ORM | Prisma |
| Autenticação | JWT |
| Validação | Zod |
| Testes | Jest |
| Banco de dados | PostgreSQL |
| Infraestrutura | Docker |
 
## Estrutura
 
```
src/
├── configs/        # Configurações (JWT)
├── controllers/    # Handlers das rotas
├── database/       # Instância do Prisma
├── middlewares/    # Autenticação, autorização e controle de erros
├── routes/         # Definição das rotas
├── schemas/        # Schemas de validação Zod
├── tests/          # Testes de integração
├── types/          # Tipagens globais
└── utils/          # AppError e utilitários
prisma/
├── migrations/     # Histórico de migrations
└── schema.prisma   # Modelos do banco
```
 
## Rotas
| Método | Rota | Descrição
|---|---|---|
| POST | `/users` | Cadastro de usuário |
| POST | `/sessions` | Login |
| GET | `/deliveries` | Listar entregas |
| POST | `/deliveries` | Criar entregas |
| PATCH | `/deliveries/:id/status` | Atualizar status da entrega |
| GET | `/deliveries/:id/logs` | Listar logs |
 
## Como rodar
 
```bash
# Instalar dependências
npm install

# Subir o banco de dados
npm run docker:up

# Rodar migrations
npm run prisma:migrate

# Rodar stúdio
npm run prisma:studio
 
# Iniciar em desenvolvimento
npm run dev
```
 
## Testes
 
```bash
npm run test
```