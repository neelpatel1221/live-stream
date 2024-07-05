import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Functionality = () => {
    const location = useLocation();
    console.log();
    
    const startStreaming = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, });
            document.getElementById("video").srcObject = stream;
            const peer = createPeer();
            stream.getTracks().forEach(track => peer.addTrack(track, stream));
            // navigate("/view-stream")
        } catch (error) {
            console.error('Error starting stream:', error);
        }
    };

    const createPeer = () => {
        const peer = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.stunprotocol.org' }
            ]
        });
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
        return peer;
    };

    const handleNegotiationNeededEvent = async (peer) => {
        try {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);

            const payload = { sdp: peer.localDescription };
            const { data } = await axios.post('http://localhost:8000/broadcast', payload);

            const desc = new RTCSessionDescription(data.sdp);
            await peer.setRemoteDescription(desc);
        } catch (error) {
            console.error('Error handling negotiation:', error);
        }
    };

    return (
        <div className="watch-on">
            {
                location.pathname !== '/view-stream' ? (<a href="#" className="account-btn" id="live-stream" onClick={startStreaming}>
                Live Streaming
            </a>) : (<a href="#" className="account-btn" id="view-stream" >
                View Streaming
            </a>)
            }
            
            <a href="#" className="account-btn">Audio Upload</a>
        </div>
    );
};

export default Functionality;
