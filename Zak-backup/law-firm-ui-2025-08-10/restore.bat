@echo off
echo ========================================
echo Law Firm UI Restoration Script
echo ========================================
echo.
echo This will restore the previous UI design
echo Press Ctrl+C to cancel, or any key to continue...
pause > nul

echo.
echo Restoring files...

REM Navigate to project root
cd ..\..

REM Restore CSS files
echo Restoring globals.css...
copy /Y "Zak-backup\law-firm-ui-2025-08-10\globals.css" "src\app\globals.css"

echo Restoring glassmorphic.css...
copy /Y "Zak-backup\law-firm-ui-2025-08-10\glassmorphic.css" "src\styles\glassmorphic.css"

REM Restore component files
echo Restoring ProfessionalNavigation component...
copy /Y "Zak-backup\law-firm-ui-2025-08-10\ProfessionalNavigation.tsx" "src\components\Navigation\ProfessionalNavigation.tsx"

echo Restoring HomePage component...
copy /Y "Zak-backup\law-firm-ui-2025-08-10\HomePage.tsx" "src\components\HomePage\index.tsx"

echo.
echo ========================================
echo Restoration Complete!
echo ========================================
echo The previous UI design has been restored.
echo Please restart your development server.
echo.
pause