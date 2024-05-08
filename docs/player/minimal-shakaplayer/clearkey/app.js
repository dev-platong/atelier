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
 localStorage.setItem("url_0", "http://localhost:8000/video_sample/public/dash/singleperiod/clearkey/output/stream.mpd");
 localStorage.setItem("license_0", "http://localhost:8000/api/license");
 localStorage.setItem("targetStreamIndex", "0");
 ```
 */

localStorage.setItem("url_0", "http://localhost:8000/video_sample/public/dash/singleperiod/clearkey/output/stream.mpd");
localStorage.setItem("license_0", "http://localhost:8000/api/license");
localStorage.setItem("targetStreamIndex", "0");

const targetStreamIndex = parseInt(localStorage.getItem("targetStreamIndex"));
const manifestUri = localStorage.getItem("url_" + targetStreamIndex);
const licenseUri = localStorage.getItem("license_" + targetStreamIndex);

function initApp() {
  shaka.polyfill.installAll();
  if (!shaka.Player.isBrowserSupported())
    throw new Error("Browser not supported!");
  initPlayer();
}

function initPlayer() {
  const video = document.getElementById("video");
  const player = new shaka.Player(video);
  player.configure({
    streaming: {
      dispatchAllEmsgBoxes: true,
    },
    drm: {
      /*
      servers: {
        'org.w3.clearkey': licenseUri,
      },
      */
      "clearKeys": {
        "a7e61c373e219033c21091fa607bf3b7": "76a6c65c5ea762046bd749a2e632ccbb"
      }
    }
  });

  player.addEventListener("error", onErrorEvent);
  video.addEventListener("ended", async () => { });

  // Test emsg parse.
  player.addEventListener("emsg", (event) => {
    console.log("emsg event:", event);
  });

  player
    .load(manifestUri)
    .then(function () {
      console.log("The video has now been loaded!");
    })
    .catch(onError);
}

function onErrorEvent(event) {
  onError(event.detail);
}

function onError(error) {
  console.error("Error code", error.code, "object", error);
}

document.addEventListener("DOMContentLoaded", initApp);
