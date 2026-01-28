const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

// Mapeamento de tipos MIME
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Remover query string e normalizar a URL
    let filePath = '.' + req.url.split('?')[0];
    
    // Se for a raiz, servir index.html
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Arquivo não encontrado, servir index.html (para SPA)
                fs.readFile('./index.html', (error, content) => {
                    if (error) {
                        res.writeHead(500);
                        res.end(`Erro ao carregar o arquivo: ${error.code}`);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end(`Erro ao carregar o arquivo: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n✅ Servidor frontend rodando!`);
    console.log(`📱 Acesse: http://localhost:${PORT}`);
    console.log(`\n💡 Mantenha este terminal aberto enquanto usar o frontend.\n`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`\n❌ A porta ${PORT} já está em uso!`);
        console.error(`💡 Tente usar outra porta ou encerre o processo que está usando a porta ${PORT}\n`);
    } else {
        console.error('Erro ao iniciar o servidor:', error);
    }
    process.exit(1);
});
