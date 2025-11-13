const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

// Rotas CRUD
router.post('/', tarefaController.criarTarefa);
router.get('/', tarefaController.listarTarefas);
router.get('/:id', tarefaController.buscarPorId);
router.put('/:id', tarefaController.atualizar);
router.patch('/:id/status', tarefaController.atualizarStatus);
router.delete('/:id', tarefaController.deletar);

module.exports = router;