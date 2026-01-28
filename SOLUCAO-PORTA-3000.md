# Solução para Erro: Porta 3000 já em uso

## Problema
O erro `EADDRINUSE: address already in use :::3000` significa que a porta 3000 já está sendo usada por outro processo.

## Soluções

### Opção 1: Encerrar o processo que está usando a porta (Recomendado)

#### Método A: Usar o script fornecido
1. Execute o arquivo `matar-porta-3000.bat` como Administrador
2. Clique com botão direito no arquivo
3. Selecione "Executar como administrador"

#### Método B: Manualmente via PowerShell (como Administrador)
```powershell
# Encontrar o processo
netstat -ano | findstr :3000

# Encerrar o processo (substitua PID pelo número encontrado)
taskkill /F /PID <PID>
```

#### Método C: Via Gerenciador de Tarefas
1. Abra o Gerenciador de Tarefas (Ctrl + Shift + Esc)
2. Vá na aba "Detalhes"
3. Clique com botão direito na coluna "PID" e selecione "Colunas" > "PID" (se não estiver visível)
4. Ordene por PID
5. Encontre o processo com PID 32288 (ou o que aparecer no netstat)
6. Clique com botão direito > "Finalizar tarefa"

### Opção 2: Mudar a porta do servidor

Se não conseguir encerrar o processo, você pode mudar a porta do servidor:

1. Edite o arquivo `server.js` ou crie/modifique o arquivo `.env`:
   ```javascript
   const PORT = process.env.PORT || 3001; // Mude para 3001 ou outra porta
   ```

2. Atualize o frontend em `app.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:3001/tarefas'; // Use a nova porta
   ```

### Opção 3: Usar uma porta diferente temporariamente

No terminal, antes de rodar `npm run dev`:
```powershell
$env:PORT=3001
npm run dev
```

E atualize temporariamente o frontend para usar a porta 3001.

## Verificar se funcionou

Após encerrar o processo, tente rodar novamente:
```bash
npm run dev
```

Se ainda der erro, verifique novamente:
```bash
netstat -ano | findstr :3000
```

## Dica

Se você tiver múltiplas instâncias do Node.js rodando, pode encerrar todas:
```powershell
taskkill /F /IM node.exe
```

**Atenção:** Isso encerrará TODOS os processos Node.js em execução!
