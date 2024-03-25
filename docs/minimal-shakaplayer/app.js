var manifestUri = localStorage.getItem("stream_url")
 // "http://localhost:8000/video_sample/public/atelier/mpeg_dash/switch//clear_widevine/static/manifest.mpd";
  // "https://livesim.dashif.org/livesim/scte35_2/testpic_2s/Manifest.mpd";
  // "http://localhost:8000/video_sample/public/atelier/mpeg_dash/clear/vod/metadata_in_emsg/stream/stream.mpd";
  // "/video_sample/public/atelier/mpeg_dash/widevine/static/manifest.mpd";
// "//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

function initApp() {
  shaka.polyfill.installAll();
  if (!shaka.Player.isBrowserSupported()) {
    throw new Error("Browser not supported!");
    return;
  }
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
      servers: {
        'com.widevine.alpha': 'https://widevine-proxy.appspot.com/proxy',
      }
    }
  });

  player.addEventListener("error", onErrorEvent);

  // Test trick playing.
  video.addEventListener("playing", () => {
    player.trickPlay(2);
  });

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
