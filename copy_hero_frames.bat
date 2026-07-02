@echo off
title Aiwass Studio - Copy Hero Video Frames
echo ===================================================
echo   Copying Hero Video Frames from Downloads...
echo ===================================================
echo.

:: Create directory
if not exist "public\hero-frames" (
    echo Creating directory public\hero-frames...
    mkdir "public\hero-frames"
)

:: Copy frames
echo.
echo Copying all Hero_*.jpg frames to public\hero-frames...
copy "C:\Users\Personal\Downloads\AIWAS\AIWAS\Hero\Hero_*.jpg" "public\hero-frames\"

echo.
echo ===================================================
echo   Copy Process Finished (Please check output above)
echo ===================================================
echo.
pause
