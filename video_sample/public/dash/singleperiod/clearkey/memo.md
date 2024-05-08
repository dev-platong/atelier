```shell
mp4fragment ../../../blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 fragmented.mp4
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
