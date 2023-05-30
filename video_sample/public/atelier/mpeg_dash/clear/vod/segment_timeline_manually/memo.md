WIP

```shell
ffmpeg -i ../../../../blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 -c copy -f segment -segment_time 5 -reset_timestamps 1 -map 0 output%03d.mp4
```