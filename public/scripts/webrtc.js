const rtcVideo = document.getElementById("rtc-video");
const rtcStartButton = document.getElementById("rtc-start");

const websocket = io();

rtcStartButton.addEventListener("click", start);

let stream = null;

async function getMedia(constraints) {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(stream.getTracks());
    rtcVideo.srcObject = stream;
  }
  catch (err) {
    console.error("error: ", err);
  }
}

function start() {
  getMedia({ audio: true, video: true });
}
