let localStream;
let remoteStream;

let peerConnection;
let offerDataChannel, answerDataChannel;
let Channel;

document.getElementById('start-btn').addEventListener('click', function() { init(); });
document.getElementById('create-offer').addEventListener('click', function() { createOffer(); });
document.getElementById('create-answer').addEventListener('click', function() { createAnswer(); });
document.getElementById('add-answer').addEventListener('click', function() { addAnswer(); });
document.getElementById('send-msg-btn').addEventListener('click', function() { sendMessage(); });
let chatBox = document.getElementById('chat-box');



let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    document.getElementById('user-1').srcObject = localStream
}


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

let createPeerConnection = async (sdpType, isOfferer) => {
    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream
    
    peerConnection = new RTCPeerConnection(servers);
    if(isOfferer)
    {
        offerDataChannel = peerConnection.createDataChannel('KTV')
        SetDataChannelEvent(offerDataChannel);
    }
    else
    {
        peerConnection.ondatachannel = function(event)
        {
            answerDataChannel = event.channel;
            SetDataChannelEvent(answerDataChannel);
        }
    }
    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            document.getElementById(sdpType).value = JSON.stringify(peerConnection.localDescription)
        }}
    peerConnection.ontrack = async (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        });
    }    

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })
    
}

function SetDataChannelEvent(channel)
{
    Channel = channel;
    Channel.onopen = function () {
        console.log("datachannel open");
    };

    Channel.onclose = function () {
        console.log("datachannel close");
    };

    Channel.onmessage = function (event) {
        console.log(`received: ${event.data}`);
        document.getElementById('chats').innerHTML += `<p>${event.data}</p>`;
    }
}

let createOffer = async (sdpType) =>
{
    createPeerConnection('offer-sdp', true);

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
}

let createAnswer = async () => {

    createPeerConnection('answer-sdp', false);

    let offer = document.getElementById('offer-sdp').value;
    if(!offer)
        return alert("We does not got offer");
    
    offer = JSON.parse(offer);
    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer) 

    document.getElementById('answer-sdp').value = JSON.stringify(answer)
}

let addAnswer = async () => {

    let answer = document.getElementById('answer-sdp').value
    if(!answer) return alert('no answer data')
    
    answer = JSON.parse(answer)
    if (!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answer)
    }
}
function sendMessage()
{
    Channel.send(chatBox.value);
    chatBox.value = '';
}