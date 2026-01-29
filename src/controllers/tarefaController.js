const { Tarefa } = require('../models');

class TarefaController {
    // Criar uma nova tarefa
    async criarTarefa(req, res) {
        try {
            console.log('📥 Requisição recebida para criar tarefa:', req.body);
            const { titulo, descricao, status } = req.body;

            // Validação básica
            if (!titulo || titulo.trim() === '') {
                console.log('❌ Validação falhou: título vazio');
                return res.status(400).json({
                    erro: 'Dados inválidos',
                    mensagem: 'O título é obrigatório e não pode estar vazio.'
                });
            }

            // Validar status fornecido
            const statusPermitidos = ['a fazer', 'em andamento', 'concluída'];
            if (status && !statusPermitidos.includes(status)) {
                return res.status(400).json({ 
                    erro: 'Status inválido',
                    mensagem: `O status deve ser um dos seguintes: ${statusPermitidos.join(', ')}.`
                });
            }

            const dadosTarefa = {
                titulo: titulo.trim(),
                descricao: descricao ? descricao.trim() : '',
                status: status || 'a fazer'
            };
            
            console.log('💾 Criando tarefa com dados:', dadosTarefa);
            
            const tarefa = await Tarefa.create(dadosTarefa);
            
            console.log('✅ Tarefa criada com sucesso:', tarefa.toJSON());

            return res.status(201).json({
                mensagem: 'Tarefa criada com sucesso',
                tarefa
            });

        } catch (error) {
            console.error('❌ Erro ao criar tarefa:', error);
            console.error('Stack:', error.stack);
            
            // Se for erro de validação do Sequelize, retornar mensagem mais amigável
            if (error.name === 'SequelizeValidationError') {
                const mensagens = error.errors.map(e => e.message).join(', ');
                return res.status(400).json({
                    erro: 'Erro de validação',
                    mensagem: mensagens
                });
            }
            
            return res.status(500).json({
                erro: 'Erro ao criar tarefa',
                mensagem: error.message
            });
        }
    }

    // Listar todas as tarefas
    async listarTarefas(req, res) {
        try {
            const tarefas = await Tarefa.findAll({
                order: [['created_at', 'DESC']]
            });

            return res.status(200).json({
                total: tarefas.length,
                tarefas
            });
        } catch (error) {
            console.error('Erro ao listar tarefas:', error);
            return res.status(500).json({
                erro: 'Erro ao listar tarefas',
                mensagem: error.message
            });
        }
    }

    // Buscar tarefa por ID
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const tarefa = await Tarefa.findByPk(id);

            if (!tarefa) {
                return res.status(404).json({
                    erro: 'Tarefa não encontrada',
                    mensagem: `Não existe tarefa com o ID: ${id}.`
                });
            }

            return res.status(200).json({ tarefa });
        } catch (error) {
            console.error('Erro ao buscar tarefa por ID:', error);
            return res.status(500).json({
                erro: 'Erro ao buscar tarefa',
                mensagem: error.message
            });
        }
    }

    // Atualizar tarefa completa com *PUT*
    async atualizar(req, res) {
        try { 
            const { id } = req.params;
            const { titulo, descricao, status } = req.body;

            const tarefa = await Tarefa.findByPk(id);

            if (!tarefa) {
                return res.status(404).json({
                    erro: 'Tarefa não encontrada',
                    mensagem: `Não existe tarefa com o ID: ${id}.`
                });
            }   

            // Validação do título
            if (!titulo || titulo.trim() === '') {
                return res.status(400).json({
                    erro: 'Dados inválidos',
                    mensagem: 'O título é obrigatório e não pode estar vazio.'
                });
            }

            // Validar status fornecido
            const statusPermitidos = ['a fazer', 'em andamento', 'concluída'];
      if (status && !statusPermitidos.includes(status)) {
        return res.status(400).json({
          erro: 'Status inválido',
          mensagem: `Status deve ser um dos seguintes: ${statusPermitidos.join(', ')}`
        });
      }

      await tarefa.update({
        titulo: titulo.trim(),
        descricao: descricao ? descricao.trim() : '',
        status: status || tarefa.status
      });

      return res.status(200).json({
        mensagem: 'Tarefa atualizada com sucesso!',
        tarefa
      });
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      return res.status(500).json({
        erro: 'Erro ao atualizar tarefa',
        mensagem: error.message
      });
    }
  }

  // Atualizar apenas o status (PATCH)
  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const tarefa = await Tarefa.findByPk(id);

      if (!tarefa) {
        return res.status(404).json({
          erro: 'Tarefa não encontrada',
          mensagem: `Não existe tarefa com o ID ${id}`
        });
      }

      // Validar status
      const statusPermitidos = ['a fazer', 'em andamento', 'concluída'];
      if (!status || !statusPermitidos.includes(status)) {
        return res.status(400).json({
          erro: 'Status inválido',
          mensagem: `Status deve ser um dos seguintes: ${statusPermitidos.join(', ')}`
        });
      }

      await tarefa.update({ status });

      return res.status(200).json({
        mensagem: 'Status atualizado com sucesso!',
        tarefa
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return res.status(500).json({
        erro: 'Erro ao atualizar status',
        mensagem: error.message
      });
    }
  }

  // Deletar tarefa
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const tarefa = await Tarefa.findByPk(id);

      if (!tarefa) {
        return res.status(404).json({
          erro: 'Tarefa não encontrada',
          mensagem: `Não existe tarefa com o ID ${id}`
        });
      }

      await tarefa.destroy();

      return res.status(200).json({
        mensagem: `Tarefa ID: ${id} deletada com sucesso!`
      });
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      return res.status(500).json({
        erro: 'Erro ao deletar tarefa',
        mensagem: error.message
      });
    }
  }
}

module.exports = new TarefaController();