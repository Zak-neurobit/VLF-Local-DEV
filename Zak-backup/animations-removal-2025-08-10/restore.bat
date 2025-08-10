@echo off
echo ========================================
echo Animation Components Restoration Script
echo ========================================
echo.
echo This will restore Three.js components and animation packages
echo Press Ctrl+C to cancel, or any key to continue...
pause > nul

echo.
echo Restoring files...

REM Navigate to project root
cd ..\..

REM Restore package files
echo Restoring package.json...
copy /Y "Zak-backup\animations-removal-2025-08-10\package.json" "package.json"

echo Restoring pnpm-lock.yaml...
copy /Y "Zak-backup\animations-removal-2025-08-10\pnpm-lock.yaml" "pnpm-lock.yaml"

REM Restore Three.js components
echo Restoring Three.js components...
xcopy /E /Y "Zak-backup\animations-removal-2025-08-10\src\components\Three" "src\components\Three\"

REM Restore VirtualAssistant3D
echo Restoring VirtualAssistant3D component...
copy /Y "Zak-backup\animations-removal-2025-08-10\src\components\VirtualAssistant\VirtualAssistant3D.tsx" "src\components\VirtualAssistant\VirtualAssistant3D.tsx"

echo.
echo Files restored successfully!
echo.
echo Running pnpm install to restore packages...
call pnpm install

echo.
echo ========================================
echo Restoration Complete!
echo ========================================
echo Animation components and packages have been restored.
echo.
pause