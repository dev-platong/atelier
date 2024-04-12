#!/bin/zsh
mkdir -p video_sample/public/blender/progressive_mp4
wget -nc -P video_sample/public/blender/progressive_mp4 https://ia600300.us.archive.org/17/items/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4
if [ ! -f video_sample/public/blender/progressive_mp4/sample1_720p.mp4 ]; then
    ffmpeg -i video_sample/public/blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 -c:v libx264 -c:a aac video_sample/public/blender/progressive_mp4/sample1_720p.mp4
    ffmpeg -i video_sample/public/blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 -ss 00:00:02 -t 40 -c:v libx264 -c:a aac -strict experimental -b:a 128k video_sample/public/blender/progressive_mp4/sample1_720p_0040s.mp4
    ffmpeg -i video_sample/public/blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 -ss 00:01:00 -t 60 -c:v libx264 -c:a aac -strict experimental -b:a 128k video_sample/public/blender/progressive_mp4/sample1_720p_0060s.mp4
fi
wget -nc -P video_sample/public/blender/progressive_mp4 http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4
if [ ! -f video_sample/public/blender/progressive_mp4/sample2_1080p.mp4 ]; then
    ffmpeg -i video_sample/public/blender/progressive_mp4/ElephantsDream.mp4 -c:v libx264 -c:a aac video_sample/public/blender/progressive_mp4/sample2_1080p.mp4
    ffmpeg -i video_sample/public/blender/progressive_mp4/ElephantsDream.mp4 -ss 00:00:02 -t 40 -c:v libx264 -c:a aac -strict experimental -b:a 128k video_sample/public/blender/progressive_mp4/sample2_1080p_0040s.mp4
    ffmpeg -i video_sample/public/blender/progressive_mp4/ElephantsDream.mp4 -ss 00:01:00 -t 60 -c:v libx264 -c:a aac -strict experimental -b:a 128k video_sample/public/blender/progressive_mp4/sample2_1080p_0060s.mp4
fi
