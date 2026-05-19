@echo off
set "NODE_PATH=C:\Program Files\nodejs"
if not exist "%NODE_PATH%\node.exe" (
  echo Node.exe not found in %NODE_PATH%.
  echo Please install Node.js or update the path in start-dev.cmd.
  pause
  exit /b 1
)
"%NODE_PATH%\node.exe" "%~dp0node_modules\vite\bin\vite.js"
