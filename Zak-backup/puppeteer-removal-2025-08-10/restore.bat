@echo off
echo ========================================
echo Puppeteer Restoration Script
echo ========================================
echo.
echo This will restore Puppeteer and all related files
echo Press Ctrl+C to cancel, or any key to continue...
pause > nul

echo.
echo Restoring files...

REM Navigate to project root
cd ..\..

REM Restore package.json
echo Restoring package.json...
copy /Y "Zak-backup\puppeteer-removal-2025-08-10\package.json" "package.json"

REM Restore pnpm-lock.yaml
echo Restoring pnpm-lock.yaml...
copy /Y "Zak-backup\puppeteer-removal-2025-08-10\pnpm-lock.yaml" "pnpm-lock.yaml"

REM Restore content-scraper service
echo Restoring content-scraper service...
copy /Y "Zak-backup\puppeteer-removal-2025-08-10\src\services\content-scraper\index.ts" "src\services\content-scraper\index.ts"

REM Restore bundle-optimizer
echo Restoring bundle-optimizer...
copy /Y "Zak-backup\puppeteer-removal-2025-08-10\src\lib\performance\bundle-optimizer.ts" "src\lib\performance\bundle-optimizer.ts"

REM Restore scripts
echo Restoring scripts...
copy /Y "Zak-backup\puppeteer-removal-2025-08-10\scripts\performance-test.js" "scripts\performance-test.js"
copy /Y "Zak-backup\puppeteer-removal-2025-08-10\scripts\test-voice-error.js" "scripts\test-voice-error.js"
copy /Y "Zak-backup\puppeteer-removal-2025-08-10\scripts\migrate-packages.js" "scripts\migrate-packages.js"

echo.
echo Files restored successfully!
echo.
echo Running pnpm install to restore Puppeteer package...
call pnpm install

echo.
echo ========================================
echo Restoration Complete!
echo ========================================
echo Puppeteer has been fully restored to its previous state.
echo.
pause