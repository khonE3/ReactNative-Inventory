@echo off
echo ==========================================
echo   Test Backend API
echo ==========================================
echo.
echo Test 1: Health Check
curl http://nindam.sytes.net:3018/api/ping
echo.
echo.
echo Test 2: Register User (testuser/123456)
curl -X POST http://nindam.sytes.net:3018/api/auth/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"123456\",\"email\":\"test@test.com\"}"
echo.
echo.
echo Test 3: Login (testuser/123456)
curl -X POST http://nindam.sytes.net:3018/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"123456\"}"
echo.
echo.
pause
