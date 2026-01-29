const path = require('path');

// Resolve o caminho para o diretório do frontend
const frontendPath = path.join(__dirname, '../todo-frontend');

console.log('\n🚀 Iniciando backend + frontend juntos...');
console.log('📱 Frontend e Backend rodando na mesma porta "3001"!');
console.log('🌐 Acesse: http://localhost:3001\n');


require('../server.js');
