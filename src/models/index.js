const { Sequelize } = require('sequelize');
const config = require('../config/database');

// Inicializar Sequelize
const sequelize = new Sequelize(config);

// Importar models
const Tarefa = require('./Tarefa')(sequelize);

// Exportar sequelize e models
module.exports = {
  sequelize,
  Tarefa
};