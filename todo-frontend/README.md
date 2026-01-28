# Frontend - Gerenciador de Tarefas

Frontend desenvolvido com HTML, CSS e JavaScript puro para gerenciamento de tarefas.

## 🚀 Como usar

1. **Certifique-se de que a API está rodando na porta 3001**
   ```bash
   cd ../todo-api
   npm run dev
   ```

2. **Inicie o servidor do frontend:**
   ```bash
   cd todo-frontend
   npm start
   ```
   Ou simplesmente:
   ```bash
   node server.js
   ```

3. **Acesse no navegador:**
   ```
   http://localhost:8000
   ```

### Alternativas (sem servidor Node.js)

Se preferir não usar o servidor Node.js, você pode usar:

```bash
# Com Python
python -m http.server 8000

# Com PHP
php -S localhost:8000
```

## 📋 Funcionalidades

- ✅ Criar novas tarefas
- ✅ Listar todas as tarefas
- ✅ Editar tarefas existentes
- ✅ Excluir tarefas
- ✅ Atualizar status das tarefas
- ✅ Filtrar tarefas por status
- ✅ Buscar tarefas por título ou descrição
- ✅ Interface responsiva e moderna

## 🎨 Tecnologias

- HTML5
- CSS3 (com variáveis CSS e animações)
- JavaScript (ES6+)
- Fetch API para comunicação com backend

## 📁 Estrutura

```
todo-frontend/
├── index.html      # Estrutura HTML principal
├── styles.css      # Estilos e design
├── app.js          # Lógica JavaScript
└── README.md       # Este arquivo
```

## ⚙️ Configuração

Por padrão, o frontend está configurado para se conectar à API em `http://localhost:3001/tarefas`.

Para alterar a URL da API, edite a constante `API_BASE_URL` no arquivo `app.js`:

```javascript
const API_BASE_URL = 'http://localhost:3001/tarefas';
```

## 📝 Nota Importante

⚠️ **Não abra o arquivo `index.html` diretamente no navegador!** Isso pode causar problemas com CORS e carregamento de arquivos. Sempre use um servidor HTTP (como o `server.js` fornecido).
