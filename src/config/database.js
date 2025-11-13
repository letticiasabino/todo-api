require('dotenv').config();

module.exports = {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || './database.sqlite',
    logging: false, // Desativa o logging para evitar poluição do console
    define: {
        timestamps: true, // Adiciona createdAt e updatedAt automaticamente
        underscored: true, // Usa snake_case ao invés de camelCase
        freezeTableName: true // Mantém o nome da tabela igual ao do model
    }
};