# 🚀 Início Rápido

## Passo a Passo

### 1. Iniciar a API (Terminal 1)
```bash
cd todo-api
npm run dev
```
✅ Você deve ver: "Servidor rodando na porta 3001"

### 2. Iniciar o Frontend (Terminal 2 - novo terminal)
```bash
cd todo-frontend
npm start
```
✅ Você deve ver: "Servidor frontend rodando! Acesse: http://localhost:8000"

### 3. Abrir no Navegador
Abra seu navegador e acesse:
```
http://localhost:8000
```

## ⚠️ Problemas Comuns

### Frontend não aparece
- Certifique-se de que o servidor frontend está rodando (Terminal 2)
- Verifique se a porta 8000 não está ocupada
- Tente acessar: http://localhost:8000

### Erro "Failed to fetch"
- Verifique se a API está rodando (Terminal 1)
- Confirme que a API está na porta 3001
- Verifique o console do navegador (F12) para mais detalhes

### Porta já em uso
- Se a porta 8000 estiver ocupada, edite `server.js` e mude a porta
- Ou encerre o processo que está usando a porta

## 📋 Checklist

- [ ] API rodando na porta 3001
- [ ] Frontend rodando na porta 8000
- [ ] Navegador aberto em http://localhost:8000
- [ ] Sem erros no console do navegador (F12)
