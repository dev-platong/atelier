#!/bin/bash

# 現在のディレクトリ以下のすべての .mpd ファイルを検索
find . -type f -name "*.mpd" | while read file; do
  # xmllint の format オプションを使ってファイルをフォーマットし、一時ファイルに出力
  xmllint --format "$file" > "${file}.tmp"

  # 一時ファイルを元のファイルに上書き
  mv "${file}.tmp" "$file"
done
