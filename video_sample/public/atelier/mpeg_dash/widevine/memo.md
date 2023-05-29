```shell
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
```

```shell
s11081@CA-20009630 widevine % mp4box -info video.mp4 
# Movie Info - 1 track - TimeScale 12288
Duration 00:00:00.000
Fragmented: yes - duration 00:09:56.458
81 fragments - 1 SegmentIndexes
Progressive (moov before mdat)
Major Brand mp41 - version 0 - compatible brands: iso8 isom mp41 dash avc1 cmfc
Created: GMT Mon May 29 15:14:49 2023

# Movie Meta type: "ID32" - 0 resource item(s)


# Track 1 Info - ID 1 - TimeScale 12288
Media Duration 00:00:00.000 
Track flags: Enabled In Movie In Preview
Media Samples: 0
Fragmented track: 14315 samples - Media Duration 00:09:56.458
Fragment sample defaults: duration 512 size 0 stsd 1 sync 1 padding 0 degradation_priority 0
Visual Track layout: x=0 y=0 width=640 height=360
Sample Descriptions: 2
	use MP4Box -info 1 video.mp4 to list all sample descriptions
Media Type: vide:avc1
	Visual Sample Entry Info: width=640 height=360 (depth=24 bits)
	AVC/H264 Video - Visual Size 640 x 360
	AVC Info: 1 SPS - 1 PPS - Profile Baseline @ Level 3
	NAL Unit length bits: 32
	Pixel Aspect Ratio 1:1 - Indicated track size 640 x 360
	Chroma format YUV 4:2:0 - Luma bit depth 8 - chroma bit depth 8
	SPS#1 hash: CF6352ACB8C09907B45A2B26ED7E938CD20BB992
	PPS#1 hash: 2C08A0DA1A57BFEC25C65F307E67A7C68AA0C097

	Protected by CENC scheme cenc version 0x00010000
		KID ABBA271E8BCF552BBD2E86A434A9A5D9 - IV size 171 

	RFC6381 Codec Parameters: avc1.42C01E
	All samples are sync
	Max sample duration: 0 / 12288
```