@echo off
title Aiwass Studio - Copy About Assets
echo ===================================================
echo   Copying About Page assets from Downloads...
echo ===================================================
echo.

:: Create directories
if not exist "public\assets\about" (
    echo Creating directory public\assets\about...
    mkdir "public\assets\about"
)

:: Copy files
echo.
echo Copying about-analog-1.jpg...
copy "C:\Users\Personal\Downloads\649175175_10232192667627657_6945370670034181412_n.jpg" "public\assets\about\about-analog-1.jpg"

echo.
echo Copying about-analog-2.jpg...
copy "C:\Users\Personal\Downloads\556533222_10230244295599574_3580890448841511650_n.jpg" "public\assets\about\about-analog-2.jpg"

echo.
echo Copying about-studio.jpg...
copy "C:\Users\Personal\Downloads\Aiwass Studio.jpeg" "public\assets\about\about-studio.jpg"

echo.
echo Copying about-beginnings.mp4...
copy "C:\Users\Personal\Downloads\SnapInsta.to_AQOhXstFsIuGqe5BI6ZHJLLOIKZhfvTKqsRuhC7E6b4WHrmHjLom2gGKBhm6f8I3drKMUX_Zhmrq9TvgXZl8OFfqas11ctNkSGI7wmo.mp4" "public\assets\about\about-beginnings.mp4"

echo.
echo ===================================================
echo   Copy Process Finished (Please check output above)
echo ===================================================
echo.
pause
