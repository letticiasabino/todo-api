# 📝 ToDo App - Full Stack

Uma aplicação completa de gerenciamento de tarefas desenvolvida com **Node.js**, **Express** e **Sequelize** no backend, com um **frontend HTML/CSS/JavaScript** integrado.
O projeto permite criar, listar, atualizar, deletar e filtrar tarefas, tudo rodando em um único servidor na porta **3001**.

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** – Ambiente de execução JavaScript no servidor  
- **Express.js** – Framework para criação das rotas e controle HTTP  
- **Sequelize ORM** – Mapeamento de dados e manipulação de banco  
- **SQLite** – Banco de dados leve e embutido  
- **Nodemon** – Monitoramento automático para ambiente de desenvolvimento  

### Frontend
- **HTML5** – Estrutura do aplicativo
- **CSS3** – Estilização responsiva
- **JavaScript (Vanilla)** – Lógica da aplicação e consumo de API

---

## 🗂 Estrutura do Repositório

```bash
todo-api/
├── src/
│   ├── app.js                    # Configuração Express (CORS, middlewares, rotas estáticas)
│   ├── config/
│   │   └── database.js           # Configuração do Sequelize com SQLite
│   ├── controllers/
│   │   └── tarefaController.js   # Lógica de controle das tarefas
│   ├── models/
│   │   ├── index.js              # Inicialização dos modelos Sequelize
│   │   └── Tarefa.js             # Modelo da tabela de tarefas
│   └── routes/
│       └── tarefaRoutes.js        # Rotas da API (CRUD)
├── scripts/
│   └── dev.js                    # Script para rodar backend + frontend juntos
├── todo-frontend/                # Frontend integrado
│   ├── index.html                # Página principal
│   ├── app.js                    # Lógica da aplicação (JavaScript)
│   ├── styles.css                # Estilos CSS responsivos
│   └── package.json              # Dependências do frontend
├── .gitignore                    # Arquivos ignorados pelo Git
├── package.json                  # Dependências e scripts do backend
├── package-lock.json             # Lock file das dependências
├── README.md                     # Documentação do projeto
└── server.js                     # Entrada principal da aplicação
```

**Nota:** O banco de dados `database.sqlite` é gerado automaticamente ao executar o servidor.


---

## ⚙️ Instalação e Uso

### 1. Clone o repositório:

```bash
git clone https://github.com/letticiasabino/todo-api.git
cd todo-api
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Inicie o servidor (Backend + Frontend juntos na mesma porta):

```bash
npm run dev
```

Ou execute diretamente:

```bash
node scripts/dev.js
```

### 4. Acesse a aplicação:

Abra seu navegador e vá para: **http://localhost:3001**

O servidor Express irá:
- 🔧 Sincronizar o banco de dados SQLite
- 📱 Servir os arquivos estáticos do frontend (HTML, CSS, JS)
- 🔌 Fornecer a API REST em `/api/tarefas`

---

## 🚀 Iniciando o Desenvolvimento

Para executar em modo de desenvolvimento com auto-reload:

```bash
npm run dev
```

O servidor monitorará mudanças nos arquivos e reiniciará automaticamente (graças ao Nodemon).

---

## 📱 Características

- ✅ **Criar tarefas** com título e descrição
- ✅ **Listar todas as tarefas** com status
- ✅ **Editar tarefas** existentes
- ✅ **Marcar tarefas como concluídas**
- ✅ **Deletar tarefas**
- ✅ **Filtrar tarefas** (todas, concluídas, pendentes)
- ✅ **Interface responsiva** e intuitiva

---

## 🔗 Endpoints da API

Todos os endpoints estão prefixados com `/api`:

| Método | Endpoint | Descrição | Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tarefas` | Lista todas as tarefas | - |
| `GET` | `/api/tarefas/:id` | Retorna uma tarefa específica | - |
| `POST` | `/api/tarefas` | Cria uma nova tarefa | `{ titulo, descricao?, prioridade? }` |
| `PUT` | `/api/tarefas/:id` | Atualiza uma tarefa existente | `{ titulo?, descricao?, prioridade? }` |
| `PATCH` | `/api/tarefas/:id/status` | Alterna status da tarefa | `{ completo: boolean }` |
| `DELETE` | `/api/tarefas/:id` | Exclui uma tarefa | - |

---


## 🧠 Aprendizados

Durante o desenvolvimento deste projeto, aprendi a:

- ✅ Estruturar rotas RESTful com Express  
- ✅ Implementar validações de campos com Sequelize  
- ✅ Tratar erros e enviar mensagens de resposta personalizadas  
- ✅ Integrar o servidor Node.js com banco de dados relacional (SQLite)
- ✅ Servir arquivos estáticos (HTML/CSS/JS) via Express
- ✅ Consumir API REST com JavaScript vanilla no frontend
- ✅ Implementar busca de dados no frontend
- ✅ Gerenciar estado da aplicação do lado do cliente
- ✅ Implementar modal de edição com JavaScript puro
- ✅ Usar middlewares Express para CORS e parsing JSON
- ✅ Trabalhar com Sequelize ORM para operações de banco de dados

---


## 📝 Notas

- O banco de dados SQLite é criado automaticamente em `database.sqlite` na primeira execução
- Todas as tarefas têm timestamps automáticos (`createdAt` e `updatedAt`)
- O frontend é servido estaticamente pelo Express em `/`
- A API está em `/api` para evitar conflitos com rotas do frontend
- CORS está habilitado para permitir requisições cross-origin

---

## 👩‍💻 Autora

**Desenvolvido por Lettícia Sabino** 💜  
Estudante de Análise e Desenvolvimento de Sistemas | Focada em Back-End e Desenvolvimento Full Stack

---

## 📄 Licença

Este projeto é de uso livre para fins de estudo e aprendizado.  
Sinta-se à vontade para contribuir, sugerir melhorias ou criar novas features!