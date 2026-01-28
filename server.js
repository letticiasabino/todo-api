require('dotenv').config();
const e = require('express');
const app = require('./src/app');
const { sequelize } = require('./src/models');




const PORT = process.env.PORT || 3001;

// Sincronizar banco de dados e iniciar o servidor

sequelize.sync({alter: true }).then(() => {
    console.log('Banco de dados sincronizado com sucesso.');
    const server = app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Acesse: http://localhost:${PORT}`);
    });

    // Tratamento de erro quando a porta está em uso
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`\n❌ ERRO: A porta ${PORT} já está em uso!`);
            console.error('\n📋 Soluções:');
            console.error('1. Encerre o processo que está usando a porta 3000');
            console.error('   Execute: netstat -ano | findstr :3000');
            console.error('   Depois: taskkill /F /PID <PID_ENCONTRADO>');
            console.error('\n2. Ou use uma porta diferente:');
            console.error('   Execute: $env:PORT=3001');
            console.error('   Depois: npm run dev');
            console.error('\n3. Ou execute o script: matar-porta-3000.bat (como Administrador)');
            process.exit(1);
        } else {
            console.error('Erro ao iniciar o servidor:', error);
            process.exit(1);
        }
    });
})

.catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
    process.exit(1);
})