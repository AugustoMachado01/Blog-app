 # Blog App

Aplicação web de blog com sistema de autenticação. Possui frontend em React e backend em Node.js com Express e Prisma.

## 📁 Estrutura do Projeto

meu-projeto/
├── backend/ # API com Node.js, Express e Prisma
├── frontend/ # Interface do usuário com React

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js v18+
- npm ou yarn
- MySQL (ou SQLite, conforme o backend)
- Git

---

## 🔧 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

⚙️ 2. Instalar e Rodar o Backend

cd backend
npm install


DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
PORT=4000


npx prisma migrate dev --name init

npm run dev

💻 3. Instalar e Rodar o Frontend

cd ../frontend
npm install
npm run dev


📡 Rotas da API
Método	Rota	Descrição
POST	/auth/register	Registrar novo usuário
POST	/auth/login	Autenticar usuário
GET	/posts	Listar todos os posts
POST	/posts	Criar novo post (privado)

📦 Tecnologias
Frontend: React, Vite, Axios

Backend: Node.js, Express, Prisma, JWT

Banco de dados: MySQL ou SQLite

✍️ Autor
Nome: Augusto Machado

LinkedIn: https://www.linkedin.com/in/augusto-machado-5294572a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app

GitHub: https://github.com/AugustoMachado01# Blog-app
# Blog-app
