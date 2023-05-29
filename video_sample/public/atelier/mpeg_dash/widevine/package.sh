packager \
  in=../../../blender/progressive_mp4/big_buck_bunny_720p_surround.mp4,stream=audio,output=audio.mp4 \
  in=../../../blender/progressive_mp4/big_buck_bunny_720p_surround.mp4,stream=video,output=video.mp4 \
  --enable_widevine_encryption \
  --key_server_url https://license.uat.widevine.com/cenc/getcontentkey/widevine_test \
  --content_id 7465737420636f6e74656e74206964 \
  --signer widevine_test \
  --aes_signing_key 1ae8ccd0e7985cc0b6203a55855a1034afc252980e970ca90e5202689f947ab9 \
  --aes_signing_iv d58ce954203b7c9a9a9d467f59839249 \
  --mpd_output manifest.mpd \
