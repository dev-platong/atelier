packager \
  'in=../../../../../blender/progressive_mp4/sample2_1080p.mp4,stream=audio,output=audio1.mp4' \
  'in=../../../../../blender/progressive_mp4/sample2_1080p.mp4,stream=video,output=video1.mp4' \
  --mpd_output ../multi_period/tmp1.mpd
packager \
  'in=../../../../../blender/progressive_mp4/sample1_720p.mp4,stream=audio,output=audio2.mp4' \
  'in=../../../../../blender/progressive_mp4/sample1_720p.mp4,stream=video,output=video2.mp4' \
  --mpd_output ../multi_period/tmp2.mpd