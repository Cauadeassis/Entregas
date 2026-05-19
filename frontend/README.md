# Entregas — Frontend

Interface web para gerenciamento de entregas, construída com React e TypeScript.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React |
| Bundler | Vite |
| Linguagem | TypeScript |
| Roteamento | React Router |
| Estilização | CSS Modules |

## Estrutura

```
src/
├── pages/
│   ├── auth/           # Login e cadastro
│   └── deliveries/     # CRUD de entregas
├── services/           # Camada de comunicação com a API
│   ├── auth.ts
│   └── deliveries.ts
├── types/              # Tipagens
├── App.tsx             # Rotas
├── main.tsx            # Entrypoint
└── global.css          # Reset e estilos globais
```

## Como rodar

```bash
# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev
```

## Funcionalidades

- Cadastro e login de usuários com roles (`customer` / `sale`)
- Rotas protegidas por token JWT
- Listagem, criação e atualização de entregas
- Redirecionamento automático para login em caso de token expirado