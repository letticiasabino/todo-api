@echo off
echo Procurando processos usando a porta 3000...
netstat -ano | findstr :3000
echo.
echo Encerrando processos na porta 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Encerrando processo PID: %%a
    taskkill /F /PID %%a
)
echo.
echo Pronto! A porta 3000 deve estar livre agora.
pause
