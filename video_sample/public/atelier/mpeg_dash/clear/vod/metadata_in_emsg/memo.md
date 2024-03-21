stream/stream.mpdの方で確認

確認
```shell
(.venv) s11081@CA-20009630 avc1 % mp4dump seg-1.m4s
[emsg] size=8+67
[emsg] size=8+75
[moof] size=8+1096
  [mfhd] size=12+4
    sequence number = 1
  [traf] size=8+1072
    [tfhd] size=12+16, flags=2002a
      track ID = 1
      sample description index = 1
      default sample duration = 512
      default sample flags = 1010000
    [tfdt] size=12+8, version=1
      base media decode time = 0
    [trun] size=12+1012, version=1, flags=205
      sample count = 250
      data offset = 1112
      first sample flags = 2000000
[mdat] size=8+1031080
```

MPEG-DASHの仕様により、emsg boxのメタデータのschemeIdUri/versionがマニフェストで通知されていないとき、プレイヤーはそれを無視する可能性があります。
なので以下をマニフェストのAdaptationSet以下に足す
```xml
<InbandEventStream schemeIdUri="urn:example:mpeg:dash:event:092016" value="1"/>
<InbandEventStream schemeIdUri="urn:example:mpeg:dash:event:092017" value="1"/>
```

- http://reference.dashif.org/dash.js/latest/samples/advanced/listening-to-SCTE-EMSG-events.html
