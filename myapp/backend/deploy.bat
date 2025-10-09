@echo off
echo ==========================================
echo   Deploy Backend to nindam.sytes.net
echo ==========================================
echo.
echo Step 1: Upload files via FileZilla
echo - Host: 119.59.102.61
echo - User: std6630202252
echo - Pass: Pq7@j9Bz
echo - Upload to: /var/www/html/std6630202252/backend/
echo.
echo Files to upload:
echo   - server.js
echo   - package.json
echo   - .env.production (rename to .env)
echo.
echo Step 2: SSH and install
ssh std6630202252@nindam.sytes.net "cd ~/www/html/std6630202252/backend && npm install && pm2 restart inventory-api || pm2 start server.js --name inventory-api && pm2 save"
echo.
echo Step 3: Test
curl http://nindam.sytes.net:3018/api/ping
echo.
pause
