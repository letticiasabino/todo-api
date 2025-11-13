const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tarefa = sequelize.define('Tarefa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O título não pode ser vazio'
        },
        len: {
          args: [3, 255],
          msg: 'O título deve ter entre 3 e 255 caracteres'
        }
      }
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ''
    },
    status: {
      type: DataTypes.ENUM('a fazer', 'em andamento', 'concluída'),
      allowNull: false,
      defaultValue: 'a fazer',
      validate: {
        isIn: {
          args: [['a fazer', 'em andamento', 'concluída']],
          msg: 'Status inválido. Use: "a fazer", "em andamento" ou "concluída"'
        }
      }
    }
  }, {
    tableName: 'tarefas',
    timestamps: true
  });

  return Tarefa;
};