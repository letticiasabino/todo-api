const express = require('express');
const path = require('path');
const tarefaRoutes = require('./routes/tarefaRoutes');
const router = express.Router();
const { Tarefa } = require('./models');

const app = express();

// Middleware CORS - permite requisições do frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Responde a requisições OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
const frontendPath = path.join(__dirname, '../todo-frontend');
app.use(express.static(frontendPath));

// Rota de boas vindas da API
app.get('/api', (req, res) => {
    res.json({
        mensagem: 'Bem-vindo à API de Gerenciamento de Tarefas!',
        versao: '1.0.0',
        endpoints: {
            'POST /api/tarefas': 'Criar uma nova tarefa', 
            'GET /api/tarefas': 'Listar todas as tarefas',
            'GET /api/tarefas/:id': 'Buscar tarefa por ID',
            'PUT /api/tarefas/:id': 'Atualizar uma tarefa existente', 
            'PATCH /api/tarefas/:id/status': 'Atualizar o status de uma tarefa',  
            'DELETE /api/tarefas/:id': 'Excluir uma tarefa'
        }
    });
});

// Rotas da API de tarefas
app.use('/api/tarefas', tarefaRoutes);

// Servir index.html para rotas não encontradas (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
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