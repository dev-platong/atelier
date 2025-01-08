# MPEG-DASH

## No enc (Clear)

### Live (Type=dynamic)

#### SegmentTimeline

```shell
ffmpeg -re -i ./video_sample/public/mp4/sample_1080p.mp4 -c:v libx264 -c:a aac -strict -2 -f dash -window_size 5 -extra_window_size 10 -use_template 1 -use_timeline 1 -min_seg_duration 2000 -streaming 1 -ldash 1 -adaptation_sets "id=0,streams=v id=1,streams=a" -remove_at_exit 1 output.mpd
```

During ffmpeg processing, a dynamic manifest is generated, but the stream disappears with the command's termination due to remove_at_exit.

```shell
ffmpeg -i ./video_sample/public/mp4/sample_1080p.mp4 -c:v libx264 -c:a aac -strict -2 -f dash -window_size 5 -extra_window_size 10 -remove_at_exit 1 -use_template 1 -use_timeline 1 -min_seg_duration 2000 -streaming 1 output.mpd
```

When using the following command, it switches to static after completion. At that point, it can only reference the segment with the last publish time.

```shell
ffmpeg -re -i ./video_sample/public/mp4/sample_1080p.mp4 -c:v libx264 -c:a aac -strict -2 -f dash -window_size 5 -extra_window_size 10 -use_template 1 -use_timeline 1 -min_seg_duration 2000 -streaming 1 -ldash 1 -adaptation_sets "id=0,streams=v id=1,streams=a" output.mpd
```

### VOD (Type=static)

#### ABR video and audio

```shell
ffmpeg -i ./video_sample/public/mp4/sample_1080p.mp4 \
    -map 0:v -map 0:v -map 0:v -map 0:a -map 0:a \
    -c:v libx264 -c:a aac \
    -b:v:0 5000k -s:v:0 1920x1080 \
    -b:v:1 3000k -s:v:1 1280x720 \
    -b:v:2 1000k -s:v:2 854x480 \
    -b:a:0 192k \
    -b:a:1 128k \
    -profile:v:0 high -profile:v:1 high -profile:v:2 high \
    -bf 1 -g 60 -keyint_min 60 \
    -sc_threshold 0 -streaming 1 \
    -use_template 1 -use_timeline 1 \
    -init_seg_name "init\$RepresentationID$.m4s" \
    -adaptation_sets "id=0,streams=v id=1,streams=a" \
    -f dash \
    output/manifest.mpd
```

#### Metadata (emsg)

```shell
mp4fragment ./video_sample/public/mp4/sample_1080p.mp4 input.mp4
mp4dash --force --exec-dir . -o stream input.mp4
poetry run emsg -o emsg_v0.atom --box_version 0 --timescale 90000 --presentation_time_delta 270000 --event_duration 36000 -i 2950944715  -s urn:example:mpeg:dash:event:092016 --value 1 -m HelloWorld
poetry run emsg -o emsg_v1.atom --box_version 1 --timescale 90000 --presentation_time 450000 --event_duration 36000 -i 2950944716  -s urn:example:mpeg:dash:event:092017 --value 1 -m GoodNightWorld
mv stream/video/avc1/seg-1.m4s stream/video/avc1/seg-1.m4s.copy
cat emsg_v0.atom emsg_v1.atom stream/video/avc1/seg-1.m4s.copy > stream/video/avc1/seg-1.m4s
sed '/<AdaptationSet mimeType="video\/mp4"/a\
<InbandEventStream schemeIdUri="urn:example:mpeg:dash:event:092016" value="1"/>\
<InbandEventStream schemeIdUri="urn:example:mpeg:dash:event:092017" value="1"/>\ ' stream/stream.mpd > stream/a.mpd
mv stream/a.mpd stream/stream.mpd
rm -f emsg_v0.atom emsg_v1.atom
```

<strong>According to the MPEG-DASH specification, if the schemeIdUri/version of the emsg box metadata is not declared in the manifest, the player may ignore it. Therefore, add the following under the AdaptationSet in the manifest:</strong>

```xml
<InbandEventStream schemeIdUri="urn:example:mpeg:dash:event:092016" value="1"/>
<InbandEventStream schemeIdUri="urn:example:mpeg:dash:event:092017" value="1"/>
```
http://reference.dashif.org/dash.js/latest/samples/advanced/listening-to-SCTE-EMSG-events.html

Check
```shell
s11081@CA-20026922 atelier % mp4dump stream/video/avc1/seg-1.m4s
[emsg] size=8+67
[emsg] size=8+75
[moof] size=8+2096
  [mfhd] size=12+4
    sequence number = 1
  [traf] size=8+2072
    [tfhd] size=12+16, flags=2002a
      track ID = 1
      sample description index = 1
      default sample duration = 512
      default sample flags = 1010000
    [tfdt] size=12+8, version=1
      base media decode time = 0
    [trun] size=12+2012, version=1, flags=a05
      sample count = 250
      data offset = 2112
      first sample flags = 2000000
[mdat] size=8+1539780
```

#### Multi Period

```sh
packager \
  'in=./video_sample/public/mp4/sample_1080p.mp4,stream=audio,output=audio1.mp4,init_segment=audio/init.mp4,segment_template=audio/$Number$.m4s' \
  'in=./video_sample/public/mp4/sample_1080p.mp4,stream=video,output=video1.mp4,init_segment=video/init.mp4,segment_template=video/$Number$.m4s' \
  --generate_static_live_mpd --mpd_output tmp.mpd
packager \
  'in=./video_sample/public/mp4/sample_1080p.mp4,stream=audio,output=audio2.mp4,init_segment=audio2/init.mp4,segment_template=audio2/$Number$.m4s' \
  'in=./video_sample/public/mp4/sample_1080p.mp4,stream=video,output=video2.mp4,init_segment=video2/init.mp4,segment_template=video2/$Number$.m4s' \
  --generate_static_live_mpd --mpd_output tmp2.mpd
```

Afterwards, manually merge the manifest.

#### Segment Base

```sh
packager \
  in=./video_sample/public/mp4/sample_1080p.mp4,stream=audio,output=audio.mp4 \
  in=./video_sample/public/mp4/sample_1080p.mp4,stream=video,output=video.mp4 \
  --mpd_output manifest.mpd
```

#### Segment List

```sh
ffmpeg -i ./video_sample/public/mp4/sample_1080p.mp4 -c:v libx264 -c:a aac -strict -2 -f dash -dash_segment_type mp4 -single_file 1 -use_template 0 -use_timeline 0 -init_seg_name output_init.mp4 -media_seg_name output_chunk.mp4 output.mpd
```

#### Segment Timeline

```shell
ffmpeg -i ./video_sample/public/mp4/sample_1080p.mp4 -c:v libx264 -b:v 1M -g 60 -keyint_min 60 -sc_threshold 0 -c:a aac -b:a 128k -movflags +faststart+frag_keyframe+empty_moov -f dash manifest.mpd
```

-gオプションは、FFmpegでビデオエンコーディングを行う際に、GOP（Group of Pictures）のサイズを設定するために使用されます。GOPとは、連続したフレームのグループで、Iフレーム（キーフレーム）、Pフレーム（前方予測フレーム）、およびBフレーム（双方向予測フレーム）から構成されます。
-g 60というオプションは、60フレームごとに新しいGOPが開始されるように設定しています。これは、60フレームごとにIフレームが挿入され、その間にPフレームとBフレームが配置されることを意味します。
また、`-keyint_min 60`オプションは、最小キーフレーム間隔を60フレームに設定しています。これにより、Iフレームが60フレームよりも短い間隔で挿入されることがなくなります。
-sc_threshold 0オプションは、シーンチェンジ検出のしきい値を0に設定しています。これにより、シーンチェンジがあった場合でも、Iフレームが追加で挿入されることはありません。GOPサイズと最小キーフレーム間隔が一定に保たれます。
この設定では、GOPサイズが60フレームで一定であり、シーンチェンジがあってもIフレームの挿入が行われないことが指定されています。これは、特に動画配信やストリーミングなどの用途で、一定のタイミングでキーフレームを挿入することが求められる場合に有用です。一定のタイミングでキーフレームが挿入されることで、ストリーミングのシーク性能が向上し、視聴者が動画の任意のポイントに迅速にアクセスできるようになります。
また、GOPのサイズとキーフレームの間隔を一定にすることで、ビデオの品質と圧縮効率のバランスが改善されることがあります。ただし、固定間隔のキーフレーム挿入は、シーンチェンジが頻繁に発生する動画では効率が悪くなることがあるため、適切なGOPサイズとキーフレーム間隔を選択することが重要です。

1. +faststart: このフラグは、動画ファイルのメタデータ（moovアトム）をファイルの先頭に移動させます。これにより、動画のダウンロードが完了する前に再生を開始できるため、ストリーミング動画の視聴体験が向上します。
2. +frag_keyframe: このフラグは、動画をフラグメント化して、各フラグメントの先頭にキーフレーム（Iフレーム）が来るようにします。フラグメント化された動画は、アダプティブストリーミングプロトコル（例：DASHやHLS）で使用されることが多く、ネットワーク状況に応じて適切なビットレートの動画を選択できるようになります。
3. +empty_moov: このフラグは、MP4ファイルのmoovアトムを空にします。これは主にフラグメント化された動画で使用され、各フラグメントにメタデータが含まれるため、親MP4ファイルのmoovアトムが不要になります。
このオプションは、動画のストリーミング配信を最適化するために使用されます。`+faststart`で再生開始が早くなり、`+frag_keyframe`でアダプティブストリーミングに対応し、`+empty_moov`で親MP4ファイルのサイズを削減することができます。これらのフラグの組み合わせにより、ストリーミング動画の視聴体験が向上し、ネットワーク帯域幅や再生デバイスの性能に応じて最適なビデオ品質が提供されるようになります。
総合的に見ると、`-movflags +faststart+frag_keyframe+empty_moov`オプションは、動画のストリーミング配信を効率化し、視聴者にスムーズな再生体験を提供するために使用されます。これらのフラグは、特にDASHやHLSなどのアダプティブストリーミングプロトコルでの動画配信において、重要な役割を果たします。

## WIDEVINE

### VOD

```sh
packager \
  in=./video_sample/public/mp4/sample_1080p.mp4,stream=audio,output=audio.mp4 \
  in=./video_sample/public/mp4/sample_1080p.mp4,stream=video,output=video.mp4 \
  --enable_widevine_encryption \
  --key_server_url https://license.uat.widevine.com/cenc/getcontentkey/widevine_test \
  --content_id 7465737420636f6e74656e74206964 \
  --signer widevine_test \
  --aes_signing_key 1ae8ccd0e7985cc0b6203a55855a1034afc252980e970ca90e5202689f947ab9 \
  --aes_signing_iv d58ce954203b7c9a9a9d467f59839249 \
  --mpd_output manifest.mpd \
```

#### Switch Widevine and Clear (Multi Period)

```sh
packager \
  'in=./video_sample/public/mp4/sample_1080p.mp4,stream=audio,output=audio1.mp4,init_segment=audio/init.mp4,segment_template=audio/$Number$.m4s' \
  'in=./video_sample/public/mp4/sample_1080p.mp4,stream=video,output=video1.mp4,init_segment=video/init.mp4,segment_template=video/$Number$.m4s' \
  --generate_static_live_mpd \
  --enable_widevine_encryption \
  --key_server_url https://license.uat.widevine.com/cenc/getcontentkey/widevine_test \
  --content_id 7465737420636f6e74656e74206964 \
  --signer widevine_test \
  --aes_signing_key 1ae8ccd0e7985cc0b6203a55855a1034afc252980e970ca90e5202689f947ab9 \
  --aes_signing_iv d58ce954203b7c9a9a9d467f59839249 \
  --mpd_output wv_manifest.mpd
packager \
  'in=./video_sample/public/mp4/sample_1080p.mp4,stream=audio,output=audio2.mp4,init_segment=audio2/init.mp4,segment_template=audio2/$Number$.m4s' \
  'in=/video_sample/public/mp4/sample_1080p.mp4,stream=video,output=video2.mp4,init_segment=video2/init.mp4,segment_template=video2/$Number$.m4s' \
  --generate_static_live_mpd \
  --mpd_output clear_manifest.mpd
```

Afterwards, manually merge the manifest.

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

## ClearKey (cenc)

```sh
rm -rf output
mp4fragment /video_sample/public/mp4/sample_1080p.mp4 fragmented.mp4
mp4dash --encryption-key=a7e61c373e219033c21091fa607bf3b7:76a6c65c5ea762046bd749a2e632ccbb fragmented.mp4
```

ShakaPlayerのextra config
```json
{
  "drm": {
    "clearKeys": {
      "a7e61c373e219033c21091fa607bf3b7": "76a6c65c5ea762046bd749a2e632ccbb"
    }
  }
}
```

以下のコマンドはダメ。cencで暗号化してくれない。

```shell
ffmpeg -i ../../../blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 -c:v libx264 -encryption_scheme cenc-aes-ctr -encryption_key 76a6c65c5ea762046bd749a2e632ccbb -encryption_kid a7e61c373e219033c21091fa607bf3b7 -b:v 1M -g 60 -keyint_min 60 -sc_threshold 0 -c:a aac -b:a 128k -movflags +faststart+frag_keyframe+empty_moov -f dash manifest.mpd
```

# Period

\<AdaptationSet\>タグは必ず1つ以上存在する。

記法は \<SegmentBase\>・\<BaseURL\>&\<SegmentList\>・\<SegmentTemplate\> のいずれか。

-use_template[boolean]
Enable (1) or disable (0) use of SegmentTemplate instead of SegmentList.
既定値：1
-use_timeline[boolean]
Enable (1) or disable (0) use of SegmentTimeline in SegmentTemplate.
既定値：1
-streaming[boolean]
ライブ配信モードの指定。指定すると各フレームが moof（Movie Fragment）になる
既定値：0