const express = require('express');
const tarefaRoutes = require('./routes/tarefaRoutes');
const router = express.Router();
const { Tarefa } = require('./models');

const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de boas vindas
app.get('/', (req, res) => {
    res.json({
        mensagem: 'Bem-vindo à API de  Gerenciamento de Tarefas!',
        versao: '1.0.0',
        endpoints: {
            'POST /tarefas': 'Criar uma nova tarefa', 
            'GET /tarefas': 'Listar todas as tarefas',
            'GET /tarefas/:id': 'Buscar tarefa por ID',
            'PUT /tarefas/:id': 'Atualizar uma tarefa existente', 
            'PATCH /tarefas/:id': 'Atualizar o status de uma tarefa',  
            'DELETE /tarefas/:id': 'Excluir uma tarefa'
        }
    });
});

// Exemplo de rota para criar uma tarefa

app.post('/tarefas', (req, res) => {
    console.log(req.body);
    res.status(201).json({ mensagem: 'Tarefa criada com sucesso!' });
});

// Exemplo de rota para deletar uma tarefa

app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Deletando tarefa com ID: ${id}`);
    res.status(200).json({ mensagem: `Tarefa ID: ${id} deletada com sucesso!` });
});

// Rodas da API de tarefas

app.use('/tarefas', tarefaRoutes);

// Tratamento de rota não encontrada
app.use((req, res) => {
    res.status(404).json({ 
        erro: 'Rota não encontrada',
        mensagem: `A rota ${req.method} ${req.url} não existe.`
     });
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        erro: 'Erro interno do servidor',
        mensagem: err.message
    });
});

module.exports = app;