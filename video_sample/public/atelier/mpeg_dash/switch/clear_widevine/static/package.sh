packager \
  'in=../../../../../mp4/sample1_720p_0040s.mp4,stream=audio,output=audio1.mp4,init_segment=audio/init.mp4,segment_template=audio/$Number$.m4s' \
  'in=../../../../../mp4/sample1_720p_0040s.mp4,stream=video,output=video1.mp4,init_segment=video/init.mp4,segment_template=video/$Number$.m4s' \
  --generate_static_live_mpd \
  --enable_widevine_encryption \
  --key_server_url https://license.uat.widevine.com/cenc/getcontentkey/widevine_test \
  --content_id 7465737420636f6e74656e74206964 \
  --signer widevine_test \
  --aes_signing_key 1ae8ccd0e7985cc0b6203a55855a1034afc252980e970ca90e5202689f947ab9 \
  --aes_signing_iv d58ce954203b7c9a9a9d467f59839249 \
  --mpd_output wv_manifest.mpd
packager \
  'in=../../../../../mp4/sample2_1080p_0040s.mp4,stream=audio,output=audio2.mp4,init_segment=audio2/init.mp4,segment_template=audio2/$Number$.m4s' \
  'in=../../../../../mp4/sample2_1080p_0040s.mp4,stream=video,output=video2.mp4,init_segment=video2/init.mp4,segment_template=video2/$Number$.m4s' \
  --generate_static_live_mpd \
  --mpd_output clear_manifest.mpd