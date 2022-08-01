let clipboardBtn = document.getElementById('clipboard-copy-btn');

clipboardBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(offer));
});
window.onload = (event) => {
    CreatePeerConnection();
}

let peerConnection;
let datachannel;
let offer;

let CreatePeerConnection = async () =>  {
    let servers = {
        iceServers: [
            {
                "urls":
                    ['stun:stun.freeswitch.org:3478',
                        'stun:stun1.l.google.com:19302',
                        'stun:stun1.l.google.com:19302'
                    ]
            }
        ]
    }
    peerConnection = new RTCPeerConnection(servers);
    datachannel = peerConnection.createDataChannel('KTV');
    offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
}

let AddAnswer = async () => {
    
}