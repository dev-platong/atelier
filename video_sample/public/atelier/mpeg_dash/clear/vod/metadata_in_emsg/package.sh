mp4fragment ../../../../../blender/progressive_mp4/big_buck_bunny_720p_surround.mp4 input.mp4
mp4dash --force --exec-dir . -o stream input.mp4
poetry run emsg -o emsg_v0.atom --box_version 0 --timescale 90000 --presentation_time_delta 270000 --event_duration 36000 -i 2950944715  -s urn:example:mpeg:dash:event:092016 --value 1 -m HelloWorld
poetry run emsg -o emsg_v1.atom --box_version 1 --timescale 90000 --presentation_time 450000 --event_duration 36000 -i 2950944716  -s urn:example:mpeg:dash:event:092017 --value 1 -m GoodNightWorld
mv stream/video/avc1/seg-1.m4s stream/video/avc1/seg-1.m4s.copy
cat emsg_v0.atom emsg_v1.atom stream/video/avc1/seg-1.m4s.copy > stream/video/avc1/seg-1.m4s
sed '/<AdaptationSet mimeType="video\/mp4"/a\
<InbandEventStream schemeIdUri="urn:example:mpeg:dash:event:092016" value="1"/>\
<InbandEventStream schemeIdUri="urn:example:mpeg:dash:event:092017" value="1"/>\ ' stream/stream.mpd > stream/a.mpd
mv stream/a.mpd stream/stream.mpd
rm -f emsg_v0.atom emsg_v1.atom