#!/bin/zsh
mkdir -p ../video_sample/public/mp4
if [ ! -f ./video_sample/public/mp4/ElephantsDream.mp4 ]; then
    wget -nc -P ../video_sample/public/mp4 http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4
fi
if [ ! -f ./video_sample/public/mp4/sample_1080p.mp4 ]; then
    ffmpeg -i ../video_sample/public/mp4/ElephantsDream.mp4 -c:v libx264 -c:a aac video_sample/public/mp4/sample_1080p.mp4
    ffmpeg -i ../video_sample/public/mp4/ElephantsDream.mp4 -ss 00:00:02 -t 40 -c:v libx264 -c:a aac -strict experimental -b:a 128k ../video_sample/public/mp4/sample_1080p_0040s.mp4
    ffmpeg -i ../video_sample/public/mp4/ElephantsDream.mp4 -ss 00:01:00 -t 60 -c:v libx264 -c:a aac -strict experimental -b:a 128k ../video_sample/public/mp4/sample_1080p_0060s.mp4
fi
echo "The Setup has already been completed."
