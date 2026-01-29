# 🚀 Guia de Deploy

Instruções para hospedar a aplicação ToDo App no **Vercel** ou **GitHub Pages**.

---

## 🎯 Opção 1: Deploy no Vercel (Recomendado) ⭐

O Vercel é ideal para este projeto porque:
- ✅ Suporta Node.js/Express nativamente
- ✅ Hospeda frontend + backend na mesma aplicação
- ✅ Deploy automático via GitHub
- ✅ Plano gratuito generoso
- ✅ SSL automático

### Passo 1: Preparar o projeto para Vercel

Crie um arquivo `vercel.json` na raiz do projeto:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "DB_DIALECT": "sqlite",
    "DB_STORAGE": "./database.sqlite"
  }
}
```

### Passo 2: Instalar Vercel CLI (Opcional)

```bash
npm install -g vercel
```

### Passo 3: Deploy no Vercel

#### Opção A: Via GitHub (Automático)

1. Acesse https://vercel.com
2. Clique em **"New Project"**
3. Conecte sua conta GitHub
4. Selecione o repositório `todo-api`
5. Clique em **"Deploy"**
6. Aguarde o deploy finalizar!

#### Opção B: Via CLI

```bash
vercel
```

Siga as instruções interativas:
- Conecte sua conta Vercel
- Selecione o projeto
- Confirme as configurações
- Deploy será iniciado automaticamente

### Passo 4: Configurar variáveis de ambiente

No dashboard do Vercel:
1. Vá para **Settings** → **Environment Variables**
2. Adicione (se necessário):
   - `DB_DIALECT`: `sqlite`
   - `DB_STORAGE`: `./database.sqlite`

### Resultado

Sua aplicação estará disponível em:
```
https://seu-projeto-xxxxx.vercel.app
```

---

## 📄 Opção 2: GitHub Pages + Backend Separado

**Nota:** GitHub Pages hospeda apenas conteúdo estático. Para usar com backend, você precisa fazer deploy do backend em outro lugar.

### Passo 1: Preparar Frontend para GitHub Pages

1. Atualize `todo-frontend/app.js` para usar URL relativa:

```javascript
// Em produção no GitHub Pages
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api/tarefas'
  : 'https://seu-backend.vercel.app/api/tarefas';
```

2. Crie arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy Frontend

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./todo-frontend
```

### Passo 2: Habilitar GitHub Pages

1. Vá para **Settings** → **Pages**
2. Em "Source", selecione **main** branch e pasta `/root`
3. Clique em **Save**

### Passo 3: Deploy Backend no Vercel

Siga os mesmos passos da Opção 1.

### Resultado

- Frontend: `https://seu-usuario.github.io/todo-api`
- Backend: `https://seu-projeto-xxxxx.vercel.app`

---

## 🔧 Dicas Importantes

### Vercel + Sequelize + SQLite

**⚠️ Importante:** O Vercel é uma plataforma serverless. Cada requisição é uma nova instância, então:

- **Problema:** SQLite pode ter lock issues em ambiente serverless
- **Solução Recomendada:** Use PostgreSQL ou MongoDB gratuito

#### Usar PostgreSQL no Vercel (Recomendado)

1. Crie conta grátis no [Supabase](https://supabase.com) (PostgreSQL gratuito)
2. Copie a URL de conexão
3. Atualize `src/config/database.js`:

```javascript
require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
};
```

4. Adicione variáveis de ambiente no Vercel:
   - `DB_HOST`: seu host
   - `DB_PORT`: 5432
   - `DB_USER`: seu usuário
   - `DB_PASSWORD`: sua senha
   - `DB_NAME`: seu banco

---

## 📋 Checklist de Deploy

- [ ] Repositório está no GitHub
- [ ] `package.json` está correto
- [ ] Não há erros ao rodar localmente (`npm run dev`)
- [ ] `.env` está no `.gitignore`
- [ ] `vercel.json` foi criado (se usando Vercel)
- [ ] Variáveis de ambiente estão configuradas
- [ ] README está atualizado
- [ ] Testou a API em produção

---

## 🚨 Troubleshooting

### "Cannot find module" no Vercel

```bash
# Certifique-se que rodou npm install
npm install
# Commit as mudanças
git add .
git commit -m "install dependencies"
git push origin main
```

### Banco de dados vazio em produção

```bash
# O banco é criado automaticamente na primeira requisição
# Mas você pode sincronizá-lo localmente:
npm run dev
# Faça uma requisição POST em http://localhost:3001/api/tarefas
```

### CORS issues

Verifique `src/app.js`:

```javascript
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // ... resto do código
});
```

---

## 📊 Comparação: Vercel vs GitHub Pages

| Recurso | Vercel | GitHub Pages |
| --- | --- | --- |
| Node.js/Backend | ✅ Sim | ❌ Não |
| Frontend estático | ✅ Sim | ✅ Sim |
| Banco de dados | ✅ Sim (externo) | ❌ Não |
| Deploy automático | ✅ Sim | ✅ Sim |
| Custo | Grátis | Grátis |
| Configuração | Fácil | Média |

---

## 🎯 Recomendação Final

Para este projeto Full Stack, use **Vercel**:

1. Deploy simplificado
2. Backend + Frontend juntos
3. Auto-deploy via GitHub
4. Sem configurações complexas

**Deploy em 3 passos:**
```bash
# 1. Acesse vercel.com
# 2. Conecte GitHub
# 3. Selecione o repositório
# Pronto! Deploy automático após cada push
```

---

## 🔗 Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Vercel + Node.js](https://vercel.com/docs/concepts/frameworks/nextjs)
- [GitHub Pages Docs](https://pages.github.com/)
- [Supabase (PostgreSQL Grátis)](https://supabase.com)

---

**Dúvidas? Consulte a documentação oficial das plataformas!** 🚀
