packager \
  'in=../../../../../mp4/sample1_720p_0040s.mp4,stream=audio,output=audio1.mp4,init_segment=audio/init.mp4,segment_template=audio/$Number$.m4s' \
  'in=../../../../../mp4/sample1_720p_0040s.mp4,stream=video,output=video1.mp4,init_segment=video/init.mp4,segment_template=video/$Number$.m4s' \
  --generate_static_live_mpd --mpd_output tmp.mpd
packager \
  'in=../../../../../mp4/sample1_720p_0040s.mp4,stream=audio,output=audio2.mp4,init_segment=audio2/init.mp4,segment_template=audio2/$Number$.m4s' \
  'in=../../../../../mp4/sample1_720p_0040s.mp4,stream=video,output=video2.mp4,init_segment=video2/init.mp4,segment_template=video2/$Number$.m4s' \
  --generate_static_live_mpd --mpd_output tmp2.mpd