@echo off
echo Restoring files from navigation fix backup...

REM Restore layout.tsx
copy /Y "Zak-backup\navigation-fix-2025-08-11\layout.tsx" "src\app\layout.tsx"

REM Restore DOMSafeWrapper.tsx
copy /Y "Zak-backup\navigation-fix-2025-08-11\DOMSafeWrapper.tsx" "src\components\DOMSafeWrapper.tsx"

REM Restore DOMSafetyInitializer.tsx
copy /Y "Zak-backup\navigation-fix-2025-08-11\DOMSafetyInitializer.tsx" "src\components\DOMSafetyInitializer.tsx"

echo.
echo ✅ All files restored successfully!
echo Please restart the development server.
pause