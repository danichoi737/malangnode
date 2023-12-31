const rtcVideo = document.getElementById("rtc-video");
const rtcRemoteVideo = document.getElementById("rtc-remote-video");
const rtcStartButton = document.getElementById("rtc-start");
const rtcCallButton = document.getElementById("rtc-call");
const rtcRecvOnlyButton = document.getElementById("rtc-recvonly");

const websocket = io();

rtcStartButton.addEventListener("click", start);
rtcCallButton.addEventListener("click", call);
rtcRecvOnlyButton.addEventListener("click", startRecvOnly);

let stream = null;
let peerConnection = null;

const iceServers = {
  urls: [
    "stun:stun.l.google.com:19302",
    "stun:stun1.l.google.com:19302",
    "stun:stun2.l.google.com:19302",
    "stun:stun3.l.google.com:19302",
    "stun:stun4.l.google.com:19302"
  ]
};

function handleIceCandidateEvent(event) {
  websocket.emit("ice", event.candidate);
  console.log("sent icecandidate");
}

function handleTrackEvent(event) {
  console.log("track event: ", event);
  rtcRemoteVideo.srcObject = event.streams[0];
}

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

async function start() {
  await getMedia({ audio: true, video: true });
  peerConnection = new RTCPeerConnection(iceServers);

  peerConnection.addEventListener("icecandidate", handleIceCandidateEvent);
  peerConnection.addEventListener("track", handleTrackEvent);

  stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
}

async function call() {
  const offer = await peerConnection.createOffer();
  peerConnection.setLocalDescription(offer);
  websocket.emit("offer", offer);
}

async function startRecvOnly() {
  peerConnection = new RTCPeerConnection(iceServers);
  peerConnection.addTransceiver("video", { direction: "recvonly" });

  peerConnection.addEventListener("icecandidate", handleIceCandidateEvent);
  peerConnection.addEventListener("track", handleTrackEvent);

  console.log("set recv only");
}

websocket.on("offer", async (data) => {
  console.log("received offer");

  peerConnection.setRemoteDescription(data);
  const answer = await peerConnection.createAnswer();
  peerConnection.setLocalDescription(answer);
  websocket.emit("answer", answer);
  console.log("answer sent");
});

websocket.on("answer", async (data) => {
  peerConnection.setRemoteDescription(data);
  console.log("remote desc set");
});

websocket.on("ice", (data) => {
  console.log("received ice");
  peerConnection.addIceCandidate(data);
});
