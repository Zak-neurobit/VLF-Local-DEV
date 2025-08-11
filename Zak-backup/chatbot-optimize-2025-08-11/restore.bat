@echo off
echo Restoring chatbot files from optimization backup...

REM Restore UnifiedModernChatbot.tsx
copy /Y "Zak-backup\chatbot-optimize-2025-08-11\UnifiedModernChatbot.tsx" "src\components\ChatWidget\UnifiedModernChatbot.tsx"

REM Restore chat API route
copy /Y "Zak-backup\chatbot-optimize-2025-08-11\route.ts" "src\app\api\chat\route.ts"

echo.
echo ✅ All chatbot files restored successfully!
echo Please restart the development server.
pause