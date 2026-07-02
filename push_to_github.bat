@echo off
echo ==============================================
echo  Aiwass Studio GitHub Upload Tool
echo ==============================================
echo.

echo [1/4] Setting git remote URL...
git remote set-url origin https://github.com/aiwass-studio/aiwass-studio.git
if %ERRORLEVEL% neq 0 (
    echo Remote "origin" might not exist. Adding it instead...
    git remote add origin https://github.com/aiwass-studio/aiwass-studio.git
)

echo.
echo [2/4] Staging files...
git add .

echo.
echo [3/4] Committing changes...
git commit -m "Upload project to aiwass-studio repo"

echo.
echo [4/4] Pushing to main branch...
git push -u origin main

echo.
echo ==============================================
if %ERRORLEVEL% eq 0 (
    echo SUCCESS: Project uploaded to https://github.com/aiwass-studio/aiwass-studio.git successfully!
) else (
    echo ERROR: Something went wrong. Please check the git output above.
)
echo ==============================================
pause
