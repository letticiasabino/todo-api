require('dotenv').config();
const e = require('express');
const app = require('./src/app');
const { sequelize } = require('./src/models');




const PORT = process.env.PORT || 3000;

// Sincronizar banco de dados e iniciar o servidor

sequelize.sync({alter: true }).then(() => {
    console.log('Banco de dados sincronizado com sucesso.');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Acesse: http://localhost:${PORT}`);
    });
})

.catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
    process.exit(1);
})