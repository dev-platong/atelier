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