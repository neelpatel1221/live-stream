import React, { useState, useRef } from "react";
import axios from "axios";
import Share from "./Share";
import { serverUrl } from "./helper/Helper";

const Broadcasting = () => {
  const [streamUrl, setStreamUrl] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  const startStreamingAndRecording = async () => {
    try {
      console.log("Streaming Started");
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Stream ", stream);
      streamRef.current = stream; // Save the stream reference

      // Start streaming
      const videoElement = document.getElementById("video");
      const peer = createPeer();
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));
      videoElement.srcObject = stream;
      const streamLink = `${serverUrl}/view-stream`;
      setStreamUrl(streamLink);
      setIsStreaming(true);

      // Start recording
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp8,opus",
      });
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = function (e) {
        chunksRef.current.push(e.data);
      };
      mediaRecorder.start();
    } catch (error) {
      console.error("Error starting stream and recording:", error);
    }
  };

  const stopStreamingAndDownload = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "recorded-video.webm";
        a.click();

        // Cleanup
        chunksRef.current = [];
        setIsStreaming(false);
      };
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop()); // Stop all tracks of the stream
      streamRef.current = null; // Clear the stream reference
    }
  };

  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    });
    console.log("Stun Server connection ", peer);
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    return peer;
  };

  const handleNegotiationNeededEvent = async (peer) => {
    try {
      const offer = await peer.createOffer();
      console.log("Offer to send ", offer);

      await peer.setLocalDescription(offer);

      const payload = { sdp: peer.localDescription };
      console.log("Local Description ", payload);

      const { data } = await axios.post(
        `${serverUrl}/broadcast`,
        payload
      );
      console.warn(data);

      const desc = new RTCSessionDescription(data.sdp);
      // console.log("Stun Server connection ", peer);

      await peer.setRemoteDescription(desc);
    } catch (error) {
      console.error("Error handling negotiation:", error);
    }
  };

  return (
    <div className="watch-on">
      {!isStreaming ? (
        <button
          className="account-btn"
          id="live-stream"
          onClick={startStreamingAndRecording}
        >
          Live Streaming
        </button>
      ) : (
        <button
          className="account-btn"
          id="stop-stream"
          onClick={stopStreamingAndDownload}
        >
          Stop Stream
        </button>
      )}
      {streamUrl && <Share streamUrl={streamUrl} />}
      {/* <video id="video" autoPlay playsInline controls></video> */}
    </div>
  );
};

export default Broadcasting;
