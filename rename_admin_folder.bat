@echo off
echo Stopping dev server...
timeout /t 2 /nobreak > nul

echo Renaming Admin folder to admin...
cd /d "e:\groBird\grobird\app"
ren Admin admin_temp
ren admin_temp admin

echo Done! The folder has been renamed to lowercase 'admin'
echo You can now restart your dev server with: npm run dev
pause
