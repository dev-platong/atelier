# Installation

```sh
./scripts/install_requirements.sh
```

Then you must install following dependencies manually,

- Bento4, https://www.bento4.com/downloads/.
- MP4Box, https://gpac.io/downloads/gpac-nightly-builds/.

```sh
# Download the MP4 video to be used as material.
./scripts/initial_setup.sh
```

## Requirements

| Name | Verified version | Description | 
| ---  | --- | --- | 
| poetry | 1.8.4 | Dependency management and packaging tool for Python |
| ffmpeg | 7.1 | Tool for processing multimedia files |
| Bento4 | 1.6.0.0 | Multimedia packaging and streaming library and toolset |
| MP4Box | 2.5-DEV-rev736-g5d3b1443-master | Multimedia packager for the MP4 container format |

# Run

```shell
poetry run python server.py
```

Then we can access localhost:8000.

## create emsg atom for MPEG-DASH signaling metadata tests

https://pypi.org/project/emsg/

Attension: If you'd like to create emsg box version 0, you have to clone repo and change code like that: https://github.com/ygoto3/emsg/pull/1.

## Inspection

https://gpac.github.io/mp4box.js/test/filereader.html

# Reference players

location: `/player` 
players: ShakaPlayer and dash.js
