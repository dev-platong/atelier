var manifestUri =
  // "https://livesim.dashif.org/livesim/scte35_2/testpic_2s/Manifest.mpd";
  "http://localhost:8000/video_sample/public/atelier/mpeg_dash/clear/vod/metadata_in_emsg/stream/stream.mpd";
// "//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

function initApp() {
  shaka.polyfill.installAll();

  if (shaka.Player.isBrowserSupported()) {
    initPlayer();
  } else {
    throw new Error("Browser not supported!");
  }
}

function initPlayer() {
  const video = document.getElementById("video");
  const player = new shaka.Player(video);
  player.configure({
    streaming: {
      dispatchAllEmsgBoxes: true,
    },
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
