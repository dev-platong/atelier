const SCHEMEIDURI = "urn:example:mpeg:dash:event:092016";
const SCHEMEIDURI2 = "urn:example:mpeg:dash:event:092017";
const EVENT_MODE_ON_START = dashjs.MediaPlayer.events.EVENT_MODE_ON_START;
const EVENT_MODE_ON_RECEIVE = dashjs.MediaPlayer.events.EVENT_MODE_ON_RECEIVE;

const url =
  "http://localhost:8000/video_sample/public/atelier/mpeg_dash/widevine/manifest.mpd";

const player = dashjs.MediaPlayer().create();
player.updateSettings({ debug: { logLevel: dashjs.Debug.LOG_LEVEL_DEBUG } });
player.on(
  SCHEMEIDURI,
  console.log,
  null
); /* Default mode is onStart, no need to specify a mode */
// player.on(SCHEMEIDURI, console.log, null, { mode: EVENT_MODE_ON_RECEIVE });
player.on(
  SCHEMEIDURI2,
  console.log,
  null
);

player.initialize(document.querySelector("#videoPlayer"), url, true);
player.setProtectionData({
  "com.widevine.alpha": {
      "serverURL": "https://widevine-proxy.appspot.com/proxy",
      priority: 0
  }});