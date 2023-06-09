const SCHEMEIDURI = "urn:example:mpeg:dash:event:092016";
const EVENT_MODE_ON_START = dashjs.MediaPlayer.events.EVENT_MODE_ON_START;
const EVENT_MODE_ON_RECEIVE = dashjs.MediaPlayer.events.EVENT_MODE_ON_RECEIVE;

const url =
  "http://localhost:8000/video_sample/public/atelier/mpeg_dash/clear/vod/emsg/dash-test/stream.mpd";

const player = dashjs.MediaPlayer().create();
player.updateSettings({ debug: { logLevel: dashjs.Debug.LOG_LEVEL_DEBUG } });
player.on(
  SCHEMEIDURI,
  console.log,
  null
); /* Default mode is onStart, no need to specify a mode */
// player.on(SCHEMEIDURI, console.log, null, { mode: EVENT_MODE_ON_RECEIVE });

player.initialize(document.querySelector("#videoPlayer"), url, true);