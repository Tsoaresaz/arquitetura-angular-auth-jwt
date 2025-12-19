# Angular 19 – Aplicação com Autenticação e Testes Unitários

Este projeto foi desenvolvido com **Angular 19**, seguindo **boas práticas de arquitetura, organização de código e testes automatizados**.  
O objetivo deste repositório é demonstrar minhas habilidades em **frontend moderno, testes unitários e integração com backend**.

A aplicação possui autenticação via **JWT**, consumindo um backend simples desenvolvido em **Node.js + Express**, utilizado exclusivamente para fins de teste e demonstração.

---

## 🚀 Tecnologias Utilizadas

### Frontend

- **Angular 19**
- **TypeScript**
- **Angular Router**
- **Services e Guards**
- **Testes unitários com Jasmine e Karma**
- **Cobertura de testes: 100%**

### Backend (API de Autenticação)

- **Node.js**
- **Express**
- **JWT (JSON Web Token)**
- **dotenv**

---

## ✅ Boas Práticas Aplicadas

- Separação de responsabilidades (components, services, guards)
- Uso de **Standalone Components**
- Lazy loading de rotas
- Testes unitários cobrindo:
  - Components
  - Services
  - Guards
- Uso de **mocks e spies** para isolamento de testes
- Código limpo, legível e escalável

---

## 📊 Testes Unitários

- Framework: **Jasmine**
- Runner: **Karma**
- Cobertura de código: **100%**

### Executar testes:

```bash
npm run test
```

Gerar relatório de cobertura:

```bash
npm run test:coverage
```

O relatório será gerado na pasta:

```bash
coverage/
```

▶️ Como Executar a Aplicação Angular
Pré-requisitos

Node.js (versão recomendada: 22.12.0)

Angular CLI 19.0.0

📦 Instalar dependências de front-end:

```bash
npm install
```

Executar em ambiente de desenvolvimento

```bash
npm run start
```

A aplicação estará disponível em:

```bash
http://localhost:4200
```

🔐 Backend – API de Login (Node.js + Express)

Este backend foi criado apenas para testes de autenticação, simulando um fluxo real de login com JWT.

📁 Acessar a pasta do backend

```bash
cd backend
```

📦 Instalar dependências de back-end:

```bash
npm install
```

⚙️ Configuração do Arquivo .env

Crie um arquivo .env na raiz do backend com o seguinte conteúdo:

```bash
PORT=3000
JWT_SECRET=dev_xxxx
```

▶️ Executar o Backend em outro terminal:

```bash
npm run dev
```

A API ficará disponível em:

```bash
http://localhost:3000
```

Endpoint disponível

- POST /login

🎯 Objetivo do Projeto

Este projeto tem como finalidade:

- Demonstrar domínio em Angular moderno (v19)

- Aplicar testes unitários com alta cobertura

- Implementar autenticação baseada em JWT

- Seguir padrões utilizados em aplicações reais de mercado

👤 Autor

Thiago Soares
Desenvolvedor Frontend | Angular
