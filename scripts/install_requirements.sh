#!/bin/zsh
brew update
brew install poetry
poetry install
brew install ffmpeg
# Install emsg
git submodule add git@github.com:dev-platong/emsg.git emsg
cd emsg
poetry add --group dev build
poetry run python -m build
poetry add --group dev emsg/dist/emsg-0.0.4-py3-none-any.whl
