# Requirements

If you would like to upload videos S3 bucket, please install following requirements,

```shell
brew install poetry
poetry install
brew install ffmpeg
```

Also you have to install following dependencies,

- Bento4, SEE: https://www.bento4.com/downloads/.
- MP4box, https://gpac.io/downloads/gpac-nightly-builds/.

emsg

```shell
git clone git@github.com:dev-platong/emsg.git
cd emsg
poetry add --group dev build
poetry run python -m build
poetry add --group dev dist/emsg-0.0.4-py3-none-any.whl
```

# Using tools

```shell
$ ffmpeg -version
ffmpeg version 6.1.1 Copyright (c) 2000-2023 the FFmpeg developers
built with Apple clang version 15.0.0 (clang-1500.1.0.2.5)
configuration: --prefix=/opt/homebrew/Cellar/ffmpeg/6.1.1_5 --enable-shared --enable-pthreads --enable-version3 --cc=clang --host-cflags= --host-ldflags='-Wl,-ld_classic' --enable-ffplay --enable-gnutls --enable-gpl --enable-libaom --enable-libaribb24 --enable-libbluray --enable-libdav1d --enable-libharfbuzz --enable-libjxl --enable-libmp3lame --enable-libopus --enable-librav1e --enable-librist --enable-librubberband --enable-libsnappy --enable-libsrt --enable-libssh --enable-libsvtav1 --enable-libtesseract --enable-libtheora --enable-libvidstab --enable-libvmaf --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxml2 --enable-libxvid --enable-lzma --enable-libfontconfig --enable-libfreetype --enable-frei0r --enable-libass --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg --enable-libopenvino --enable-libspeex --enable-libsoxr --enable-libzmq --enable-libzimg --disable-libjack --disable-indev=jack --enable-videotoolbox --enable-audiotoolbox --enable-neon
libavutil      58. 29.100 / 58. 29.100
libavcodec     60. 31.102 / 60. 31.102
libavformat    60. 16.100 / 60. 16.100
libavdevice    60.  3.100 / 60.  3.100
libavfilter     9. 12.100 /  9. 12.100
libswscale      7.  5.100 /  7.  5.100
libswresample   4. 12.100 /  4. 12.100
libpostproc    57.  3.100 / 57.  3.100
```

```shell
$ mp4info
MP4 File Info - Version 1.3.4
(Bento4 Version 1.6.0.0)
(c) 2002-2017 Axiomatic Systems, LLC
```

```shell
$ mp4box -version
MP4Box - GPAC version 2.3-DEV-rev979-gf71e7f2a-master
(c) 2000-2023 Telecom Paris distributed under LGPL v2.1+ - https://gpac.io

Please cite our work in your research:
	GPAC Filters: https://doi.org/10.1145/3339825.3394929
	GPAC: https://doi.org/10.1145/1291233.1291452

GPAC Configuration: --extra-cflags=-Wno-deprecated -Wno-shift-negative-value
Features: GPAC_CONFIG_DARWIN GPAC_64_BITS GPAC_HAS_IPV6 GPAC_HAS_SSL GPAC_HAS_SOCK_UN GPAC_MINIMAL_ODF GPAC_HAS_QJS GPAC_HAS_FAAD GPAC_HAS_MAD GPAC_HAS_LIBA52 GPAC_HAS_JPEG GPAC_HAS_PNG GPAC_HAS_FFMPEG GPAC_HAS_OPENSVC GPAC_HAS_JP2 GPAC_HAS_OPENHEVC GPAC_HAS_THEORA GPAC_HAS_VORBIS GPAC_HAS_HTTP2
```

## create emsg atom for MPEG-DASH signaling metadata tests

https://pypi.org/project/emsg/

Attension: If you'd like to create emsg box version 0, you have to clone repo and change code like that: https://github.com/ygoto3/emsg/pull/1.

## Inspection

https://gpac.github.io/mp4box.js/test/filereader.html

# Reference players

location: `/player` 
players: ShakaPlayer and dash.js
