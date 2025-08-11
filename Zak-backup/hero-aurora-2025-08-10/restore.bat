@echo off
echo Restoring original ModernHero.tsx without Aurora effect...
copy /Y "ModernHero.original.tsx" "..\..\src\components\hero\ModernHero.tsx"
echo.
echo Restoration complete! The hero section has been reverted to the original version.
echo.
echo To re-enable Aurora effect:
echo 1. Set enableAurora={true} when using ModernHero component
echo 2. Or set NEXT_PUBLIC_ENABLE_AURORA=true in your .env.local file
echo.
pause