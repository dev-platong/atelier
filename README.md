# Used tools

```shell
$ ffmpeg -version
ffmpeg version 6.0 Copyright (c) 2000-2023 the FFmpeg developers
built with Apple clang version 14.0.3 (clang-1403.0.22.14.1)
configuration: --prefix=/usr/local/Cellar/ffmpeg/6.0 --enable-shared --enable-pthreads --enable-version3 --cc=clang --host-cflags= --host-ldflags= --enable-ffplay --enable-gnutls --enable-gpl --enable-libaom --enable-libaribb24 --enable-libbluray --enable-libdav1d --enable-libmp3lame --enable-libopus --enable-librav1e --enable-librist --enable-librubberband --enable-libsnappy --enable-libsrt --enable-libsvtav1 --enable-libtesseract --enable-libtheora --enable-libvidstab --enable-libvmaf --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxml2 --enable-libxvid --enable-lzma --enable-libfontconfig --enable-libfreetype --enable-frei0r --enable-libass --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg --enable-libspeex --enable-libsoxr --enable-libzmq --enable-libzimg --disable-libjack --disable-indev=jack --enable-videotoolbox
libavutil      58.  2.100 / 58.  2.100
libavcodec     60.  3.100 / 60.  3.100
libavformat    60.  3.100 / 60.  3.100
libavdevice    60.  1.100 / 60.  1.100
libavfilter     9.  3.100 /  9.  3.100
libswscale      7.  1.100 /  7.  1.100
libswresample   4. 10.100 /  4. 10.100
libpostproc    57.  1.100 / 57.  1.100
```

```shell
$ mp4info
MP4 File Info - Version 1.3.4
(Bento4 Version 1.6.0.0)
(c) 2002-2017 Axiomatic Systems, LLC
```

```shell
$ MP4Box -version
MP4Box - GPAC version 2.2-revrelease
(c) 2000-2022 Telecom Paris distributed under LGPL v2.1+ - http://gpac.io

Please cite our work in your research:
	GPAC Filters: https://doi.org/10.1145/3339825.3394929
	GPAC: https://doi.org/10.1145/1291233.1291452

GPAC Configuration: --disable-wx --disable-pulseaudio --prefix=/usr/local/Cellar/gpac/2.2.0 --mandir=/usr/local/Cellar/gpac/2.2.0/share/man --disable-x11
Features: GPAC_CONFIG_DARWIN GPAC_64_BITS GPAC_HAS_IPV6 GPAC_HAS_SSL GPAC_HAS_SOCK_UN GPAC_MINIMAL_ODF GPAC_HAS_QJS
```

## create emsg atom for MPEG-DASH signaling metadata tests

https://pypi.org/project/emsg/

Attension: If you'd like to create emsg box version 0, you have to clone repo and change code like that: https://github.com/ygoto3/emsg/pull/1.

## Inspection

https://gpac.github.io/mp4box.js/test/filereader.html

# Reference players

location: `/player` 
players: ShakaPlayer and dash.js