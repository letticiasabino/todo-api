# 📝 ToDo API

Uma API RESTful desenvolvida com **Node.js**, **Express** e **Sequelize**, que permite criar, listar, atualizar e excluir tarefas.  
O projeto foi criado com o objetivo de praticar conceitos de **CRUD**, **validação de dados**, e **integração com banco de dados** usando **SQLite**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript no servidor  
- **Express.js** – Framework para criação das rotas e controle HTTP  
- **Sequelize ORM** – Mapeamento de dados e manipulação de banco  
- **SQLite** – Banco de dados leve e embutido  
- **Nodemon** – Monitoramento automático para ambiente de desenvolvimento  
- **Postman** – Teste e documentação das rotas

---

## 🗂 Estrutura do Repositório

```bash
todo-api/ 
│ 
├── models/ 
│ └── tarefa.js # Modelo Sequelize da tabela de tarefas 
│ 
├── routes/ 
│ └── tarefas.js # Rotas da API (CRUD) 
│ 
├── server.js # Configuração principal do servidor Express 
├── package.json # Dependências e scripts 
└── README.md # Documentação do projeto
```


---

## ⚙️ Instalação e Uso

1. Clone este repositório:

    ```bash
    git clone [https://github.com/letticiasabino/todo-api.git](https://github.com/letticiasabino/todo-api.git)
    cd todo-api
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor:

    ```bash
    npm run dev
    ```

O servidor será iniciado em `http://localhost:3000`

---

## 🔗 Rotas da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/tarefas` | Lista todas as tarefas |
| `GET` | `/tarefas/:id` | Retorna uma tarefa específica |
| `POST` | `/tarefas` | Cria uma nova tarefa |
| `PUT` | `/tarefas/:id` | Atualiza uma tarefa existente |
| `DELETE` | `/tarefas/:id` | Exclui uma tarefa |

---

## 🧩 Exemplo de Requisição (POST)

### Endpoint:

```bash
POST http://localhost:3000/tarefas
```

## 🧠 Aprendizados

Durante o desenvolvimento deste projeto, aprendi a:

- Estruturar rotas RESTful com Express  
- Implementar validações de campos com Sequelize  
- Tratar erros e enviar mensagens de resposta personalizadas  
- Integrar o servidor Node.js com um banco de dados relacional  
- Testar endpoints utilizando o Postman  

---

## 👩‍💻 Autora

**Desenvolvido por Lettícia Sabino** 💜  
Estudante de Análise e Desenvolvimento de Sistemas | Focada em Back-End e Desenvolvimento Full Stack

---

## 🏷️ Licença

Este projeto é de uso livre para fins de estudo e aprendizado.  
Sinta-se à vontade para contribuir, sugerir melhorias ou criar novas features!