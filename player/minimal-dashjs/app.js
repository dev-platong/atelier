/**
 * localStorageにあるストリームを以下の規則で与えます。
 * キー：説明
 * url_[number]: プレイリストやマニフェスト・プログレッシブMP4の場所を与える。
 * license_[number]: オプショナルで存在する場合ライセンスサーバURLを与える。
 * targetStreamIndex: 再生するストリームのindex
 * 
 * e.g.)
 * 
 ```javascript
 localStorage.setItem("url_0", "https://storage.googleapis.com/wvmedia/cenc/h264/tears/tears.mpd");
 localStorage.setItem("license_0", "https://proxy.uat.widevine.com/proxy?video_id=2015_tears&provider=widevine_test");
 localStorage.setItem("targetStreamIndex", "0");
 ```
 */

 const targetStreamIndex = parseInt(localStorage.getItem("targetStreamIndex"));
 const manifestUri = localStorage.getItem("url_" + targetStreamIndex);
 const licenseUri = localStorage.getItem("license_" + targetStreamIndex);

const SCHEMEIDURI = "urn:example:mpeg:dash:event:092016";
const SCHEMEIDURI2 = "urn:example:mpeg:dash:event:092017";
const EVENT_MODE_ON_START = dashjs.MediaPlayer.events.EVENT_MODE_ON_START;
const EVENT_MODE_ON_RECEIVE = dashjs.MediaPlayer.events.EVENT_MODE_ON_RECEIVE;

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

player.initialize(document.querySelector("#videoPlayer"), manifestUri, true);
player.setProtectionData({
  "com.widevine.alpha": {
      "serverURL": licenseUri,
      priority: 0
  }});