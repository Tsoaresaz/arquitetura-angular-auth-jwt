# 🚀 Angular 19 – Autenticação JWT com Testes Unitários (100%) e E2E

Aplicação desenvolvida com **Angular 19**, focada em **boas práticas de arquitetura**, **testes automatizados** e **fluxo real de autenticação com JWT**.

Este projeto foi criado como **portfólio profissional**, demonstrando domínio em:

- **Angular moderno**
- **Testes unitários com 100% de cobertura**
- **Testes E2E com Cypress**
- **Integração frontend + backend**

---

## 🎯 Visão Geral do Projeto

✔ Autenticação completa com **JWT**  
✔ Proteção de rotas com **Auth Guard**  
✔ Persistência e remoção de token no **localStorage**  
✔ **Testes unitários (Jasmine)** com **100% de cobertura**  
✔ **Testes E2E (Cypress)** cobrindo:

- Validações de formulário
- Login com sucesso
- Persistência do token
- Logout e limpeza do token

✔ Backend de autenticação com **Node.js + Express**

---

## 🧠 Principais Conceitos Demonstrados

- Arquitetura organizada e escalável
- Standalone Components (Angular 19)
- Lazy loading de rotas
- Services e Guards bem definidos
- Separação clara de responsabilidades
- Testes automatizados em diferentes níveis:
  - Unitários
  - End-to-End (E2E)
- Boas práticas de testes de UI com `data-testid`

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Angular 19**
- **TypeScript**
- **Angular Router**
- **Services & Guards**
- **Jasmine + Karma** (testes unitários)
- **Cypress** (testes E2E)

### Backend (API de Autenticação)

- **Node.js**
- **Express**
- **JWT (JSON Web Token)**
- **dotenv**

---

## 🧪 Testes Automatizados

### ✅ Testes Unitários

- Framework: **Jasmine**
- Runner: **Karma**
- Cobertura: **100%**

Executar testes:

```bash
npm run test
```

Gerar relatório de cobertura:

```bash
npm run test:coverage
```

O relatório será gerado em:

```bash
coverage/
```

---

### ✅ Testes E2E (Cypress)

Os testes E2E cobrem:

- Validação de campos obrigatórios
- Validação de formato de e-mail
- Fluxo de login com sucesso
- Salvamento do token no `localStorage`
- Logout e remoção do token

Executar Cypress:

```bash
npx cypress open
```

Ou modo headless:

```bash
npx cypress run
```

---

## ▶️ Como Executar a Aplicação Angular

### Pré-requisitos

- **Node.js** (recomendado: 22.12.0)
- **Angular CLI** 19+

Instalar dependências:

```bash
npm install
```

Executar em ambiente de desenvolvimento:

```bash
npm run start
```

A aplicação estará disponível em:

```bash
http://localhost:4200
```

---

## 🔐 Backend – API de Login (Node.js + Express)

Backend simples criado apenas para **simular um fluxo real de autenticação JWT**.

### Instalar dependências

```bash
cd backend
npm install
```

### Configurar `.env`

Crie um arquivo `.env` na raiz do backend:

```bash
PORT=3000
JWT_SECRET=dev_xxxx
```

### Executar o backend

```bash
npm run dev
```

API disponível em:

```bash
http://localhost:3000
```

Endpoint disponível:

- `POST /login`

---

## 📌 Objetivo do Projeto

Este projeto foi desenvolvido para:

- Demonstrar domínio em **Angular moderno (v19)**
- Aplicar **boas práticas de arquitetura frontend**
- Implementar **autenticação baseada em JWT**
- Garantir **qualidade de código com testes automatizados**
- Simular padrões utilizados em **aplicações reais de mercado**

---

## 👤 Autor

**Thiago Soares**  
Desenvolvedor Frontend | Angular
