const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const webrtc = require("wrtc");
const path = require("path");
const cors = require("cors");
let senderStream;
app.use(cors({origin: '*'}));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let broadcasterSdpOffer;

// Serve the static files from the React app
app.use(express.static(path.resolve(__dirname, "../Frontend/build")));

// Handle all GET requests to return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
});


app.post("/consumer", async ({ body }, res) => {
  try {
    console.log("/consumer");
    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });
    console.log("Stun Server connection ", peer);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    console.log("Session Description /Offer ", desc);
    await peer.setRemoteDescription(desc);
    console.log('Senders Stream ',senderStream);
    if (!senderStream) {
      return res.status(404).json({ message: "No Stream to watch" });
    }
    senderStream
      .getTracks()
      .forEach((track) => peer.addTrack(track, senderStream));
    const answer = await peer.createAnswer();
    console.log("Answer for offer ", answer);
    await peer.setLocalDescription(answer);
    const payload = {
      sdp: peer.localDescription,
    };
    console.log("Sending Payload to Client ", payload);
    res.json(payload);
  } catch (error) {
    console.error("Error in /consumer:", error);
    res.status(500).json({ error: error.message });
    ``;
  }
});

app.get("/broadcaster-sdp-offer", (req, res) => {
  try {
    if (broadcasterSdpOffer) {
      res.json({ sdp: broadcasterSdpOffer });
    } else {
      res.status(404).json({ error: "No broadcaster SDP offer available" });
    }
  } catch (error) {
    console.error("Error in /broadcaster-sdp:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/broadcast", async ({ body }, res) => {
  try {
    console.log("/broadcast");
    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });
    console.log("Stun Server connection ", peer);
    peer.ontrack = (e) => handleTrackEvent(e, peer);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    console.log("Session Description /Offer ", desc);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    console.log("Answer for offer ", answer);
    await peer.setLocalDescription(answer);
    broadcasterSdpOffer = peer.localDescription;
    const payload = {
      sdp: peer.localDescription,
    };
    console.log("Sending Payload to Client ", payload);
    res.json(payload);
  } catch (error) {
    console.error("Error in /broadcast:", error);
    res.status(500).json({ error: error.message });
  }
});
function handleTrackEvent(e, peer) {
  senderStream = e.streams[0];
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});