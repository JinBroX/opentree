@echo off
chcp 65001 > nul
echo.
echo  ╔══════════════════════════════╗
echo  ║    宽树香品 · 启动服务器    ║
echo  ╚══════════════════════════════╝
echo.
echo  [*] 正在启动后端服务...
echo  [*] 访问地址: http://localhost:3001
echo  [*] 按 Ctrl+C 可停止服务
echo.
cd /d "%~dp0server"
node index.js
