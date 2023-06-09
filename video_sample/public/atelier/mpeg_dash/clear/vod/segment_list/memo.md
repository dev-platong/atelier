```shell
ffmpeg -i ../../../../../blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 -c:v libx264 -c:a aac -strict -2 -f dash -dash_segment_type mp4 -single_file 1 -use_template 0 -use_timeline 0 -init_seg_name output_init.mp4 -media_seg_name output_chunk.mp4 output.mpd
```