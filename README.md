# Frontend React – Gestão de Usuários

Este é um frontend desenvolvido em **React** com **React Router**, **React Toastify** e integração com a API de gestão de usuários.  
Ele consome a API RESTful de usuários (`/v1/users`) para realizar operações de CRUD e autenticação via login JWT.

---

## 📑 Sumário

- [⚡ Funcionalidades](#-funcionalidades)
- [📈 Boas Práticas Aplicadas](#-boas-práticas-aplicadas)
- [🗂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Tecnologias](#-tecnologias)
- [⚙️ Configuração](#-tecnologias)
- [▶️ Executando a Aplicação](#️-executando-a-aplicação)
- [🔗 Funcionalidades da Interface](#-funcionalidades-da-interface)
- [👨‍💻 Autor](#-autor)
- [📜 Licença](#-licença)

---

## ⚡ Funcionalidades

- Autenticação de usuários via JWT
- CRUD de usuários:
  - Listar usuários
  - Criar usuário (modal)
  - Atualizar usuário (formulário de edição)
  - Deletar usuário
- Feedbacks ao usuário via **toast notifications**
- Proteção de rotas privadas
- Componentes reutilizáveis (`UserCard`, `Fab`, `Modal`, `FormInput`, `FormSelect`)
- Logger centralizado para debug e erros (somente em development)

---

## 📈 Boas Práticas Aplicadas

- Separação de responsabilidades (Componentes, Use Cases, Repositórios)  
- Componentização para UI escalável  
- Toasts para feedback do usuário  
- Logger centralizado para debugs em development  
- Proteção de rotas privadas com token JWT  
- Tratamento de erros de API (ex.: email duplicado)

---

## 🗂 Estrutura do Projeto

```bash

test-sps-frontend/  
├─ public/  
│  ├─ favicon.ico  
│  ├─ index.html  
│  ├─ logo192.png  
│  ├─ logo512.png  
│  ├─ manifest.json  
│  └─ robots.txt  
├─ src/  
│  ├─ application/  
│  │  └─ useCases/  
│  │     ├─ CreateUser.js  
│  │     ├─ DeleteUser.js  
│  │     ├─ GetUsers.js  
│  │     └─ UpdateUser.js  
│  ├─ components/  
│  │  ├─ style/  
│  │  │  ├─ signIn/  
│  │  │  │  └─ SignIn.module.css  
│  │  │  └─ users/  
│  │  │     ├─ UserEdit.module.css  
│  │  │     └─ Users.module.css  
│  │  ├─ ui/  
│  │  │  ├─ Fab.jsx  
│  │  │  ├─ FormInput.jsx  
│  │  │  └─ FormSelect.jsx  
│  │  ├─ users/  
│  │  │  ├─ CreateUserModal.jsx  
│  │  │  └─ UserCard.jsx  
│  │  ├─ ProtectedLayout.js  
│  │  └─ PublicLayout.js  
│  ├─ domain/  
│  │  ├─ enities/  
│  │  │  └─ User.js  
│  │  └─ repositories/  
│  │     ├─ IAuthRepository.js  
│  │     └─ IUserRepository.js  
│  ├─ infrastructure/  
│  │  └─ repositories/  
│  │     ├─ AuthRepository.js  
│  │     └─ UserRepository.js  
│  ├─ pages/  
│  │  ├─ SignIn.jsx  
│  │  ├─ UserEdit.jsx  
│  │  └─ Users.jsx  
│  ├─ services/  
│  │  └─ api.js  
│  ├─ utils/  
│  │  └─ logger.  
│  ├─ index.js  
│  └─ routes.js  
├─ .env  
├─ .env copy  
├─ .gitignore  
├─ package-lock.json  
├─ package.json  
├─ README.md  
└─ yarn.lock  

```

---

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/) para navegação
- [React Toastify](https://fkhadra.github.io/react-toastify/) para notificações
- [Axios](https://axios-http.com/) para requisições HTTP
- [jwt-decode](https://www.npmjs.com/package/jwt-decode) para leitura do token JWT
- CSS Modules para estilos isolados

---

## ⚙️ Configuração

1. Clone o repositório:

    ```bash
    git clone git@github.com:GuiRuizz/test-sps-frontend.git
    cd test-sps-frontend
    ```

2. Instale as dependências

    ```bash
    npm install
    # ou
    yarn install
    ```

3. Configure o arquivo .env com a URL da API:

    ```bash
    REACT_APP_API_URL=http://localhost:3000/v1
    NODE_ENV=development
    ```

---

## ▶️ Executando a Aplicação

### Ambiente de desenvolvimento

```bash
npm start
# ou
yarn start


Servidor rodando em:

http://localhost:3001
```

---

## 🔗 Funcionalidades da Interface

### 🔐 Login

- Tela de login para autenticação via JWT  
- Armazena token no `localStorage`  
- Redireciona para a lista de usuários se autenticado  

---

### 👤 Usuários

| Operação | Componente / Tela       | Descrição                           |
|----------|-------------------------|-------------------------------------|
| Listar   | `Users.jsx`             | Mostra todos os usuários em cards   |
| Criar    | `CreateUserModal.jsx`   | Modal com formulário e validação    |
| Editar   | `UserEdit.jsx`          | Formulário para editar usuário      |
| Deletar  | `UserCard.jsx`          | Botão de exclusão em cada card      |
| Logout   | `UserCard.jsx`          | Botão de logout para usuário logado |

---

### 💬 Feedback

- Notificações via **toast** para sucesso, erro ou alertas  
- Erros de API tratados (ex.: email duplicado)  
- Logger no console para debug (somente em development)  

---

## 👨‍💻 Autor

Desenvolvido por **Guilherme Enrique Ruiz Sassi Gonçalves**

---

## 📜 Licença

Este projeto está sob a licença MIT.
