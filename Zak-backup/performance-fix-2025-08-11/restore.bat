@echo off
echo Restoring files from performance optimization backup...

REM Restore homepage
copy /Y "Zak-backup\performance-fix-2025-08-11\page.tsx" "src\app\page.tsx"

REM Restore ModernHero
copy /Y "Zak-backup\performance-fix-2025-08-11\ModernHero.tsx" "src\components\hero\ModernHero.tsx"

REM Restore API routes
xcopy /Y /E "Zak-backup\performance-fix-2025-08-11\news" "src\app\api\news\"
xcopy /Y /E "Zak-backup\performance-fix-2025-08-11\auth" "src\app\api\auth\"

echo.
echo ✅ All files restored successfully!
echo Please restart the development server.
pause