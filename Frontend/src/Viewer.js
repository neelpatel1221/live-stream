import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { serverUrl } from './helper/Helper';
const Viewer = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/view-stream") {
      watchStream();
    }
  }, []);

  const watchStream = () => {
    try {
      const peer = createPeer();
      peer.addTransceiver("video", { direction: "recvonly" });
      peer.addTransceiver("audio", { direction: "recvonly" });
    } catch (error) {
      console.error("Error watching stream:", error);
    }
  };

  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    });
    console.log("Stun Server connection ", peer);
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    return peer;
  };

  const handleNegotiationNeededEvent = async (peer) => {
    try {
      const offer = await peer.createOffer();
          console.log("Offer to send ", offer);

      await peer.setLocalDescription(offer);
      const payload = { sdp: peer.localDescription };
      console.log("Local Description  ", payload);
      const { data } = await axios.post(
        `${serverUrl}/consumer`,
        payload
      );
      console.warn("DATA ", data);
      const desc = new RTCSessionDescription(data.sdp);
      peer.setRemoteDescription(desc).catch((e) => console.log(e));
    } catch (error) {
      console.error("Error handling negotiation:", error);
    }
  };

  const handleTrackEvent = (e) => {
    const video = document.getElementById("video");
    video.srcObject = e.streams[0];
  };

  return (
    <div className="watch-on">
      <video autoPlay playsInline id="video"></video>
    </div>
  );
};

export default Viewer;