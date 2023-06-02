```shell
ffmpeg -i ../../../../../blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 -c:v libx264 -b:v 1M -g 60 -keyint_min 60 -sc_threshold 0 -c:a aac -b:a 128k -movflags +faststart+frag_keyframe+empty_moov -f dash manifest.mpd
```

ffmpegの処理中はdynamicなマニフェストが生成されるが、 remove_at_exit によってコマンドの終了とともにストリームが消える。
```shell
ffmpeg -i ../../../../../blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 -c:v libx264 -c:a aac -strict -2 -f dash -window_size 5 -extra_window_size 10 -remove_at_exit 1 -use_template 1 -use_timeline 1 -min_seg_duration 2000 -streaming 1 output.mpd
```

以下のコマンドの場合は終了後staticに切り替わる。その時最後のpublish timeのセグメントへしか参照ができない。
```shell
ffmpeg -re -i ../../../../../blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 -c:v libx264 -c:a aac -strict -2 -f dash -window_size 5 -extra_window_size 10 -use_template 1 -use_timeline 1 -min_seg_duration 2000 -streaming 1 -ldash 1 -adaptation_sets "id=0,streams=v id=1,streams=a" output.mpd
```