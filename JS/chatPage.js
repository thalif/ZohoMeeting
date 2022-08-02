import Utils from "./util.js";

let Util = new Utils();
let offerInput = document.getElementById('offer-input');
let answerInput = document.getElementById('answer-input');

let remoteOfferInput = document.getElementById('remote-offer-input');
let remoteAnswerInput = document.getElementById('remote-answer-input');

let createMeetingBtn = document.getElementById('create-meeting-btn');
let createAnswerBtn = document.getElementById('create-answer-btn');
let addCandidateBtn = document.getElementById('add-candidate-btn');

let chatList = document.getElementById('chat-list');
let chatInput = document.getElementById('chat-input');
let sendMessageBtn = document.getElementById('send-btn');

let UserName;
let sessionType;
let localStream;
let remoteStream;
let peerConnection;
let dataChannel;
let offer, answer;

addCandidateBtn.addEventListener('click', () => {
    AddAnswer();
})
createMeetingBtn.addEventListener('click', () => {
    CreateMeeting();
})
createAnswerBtn.addEventListener('click', () => {
    JoinMeeting(remoteOfferInput.value);
})
sendMessageBtn.addEventListener('click', () => {
    SendMessage()
})


window.onload = (event) => {

    UserName = Util.GetUsername();
    sessionType = Util.GetChatSessionType();
    InvokeLocalStream();
    if(sessionType == 'true') {
        document.getElementById('meeting-action').style.display = 'flex';
        document.getElementById('meeting-answer').style.display = 'none';
    }
    else {
        document.getElementById('meeting-action').style.display = 'none';
        document.getElementById('meeting-answer').style.display = 'flex';
    }
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
let CreateMeeting = async () =>  {
    
    InvokeRemoteStream();

    peerConnection = new RTCPeerConnection(servers);
    dataChannel = peerConnection.createDataChannel('KTV');
    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            offerInput.value = JSON.stringify(peerConnection.localDescription);
        }
    };
    peerConnection.ontrack = async (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        });
    };
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    });

    DataChannelEvent();
    offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
}

function DataChannelEvent()
{
    dataChannel.onopen = function () {
        console.log("datachannel open");
        document.getElementById('meeting-answer').style.display = 'none';
    };

    dataChannel.onclose = function () {
        console.log("datachannel close");
    };

    dataChannel.onmessage = function (event) {
        console.log(`received: ${event.data}`);
        AddMessageToList(event.data);
    }
}
let AddAnswer = async () => {
    
    let answerSDP = answerInput.value;
    if(!answerSDP) return alert('no answer data')
    
    answer = JSON.parse(answerSDP)
    if (!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answer)
    }
    document.getElementById('meeting-action').style.display = 'none';
    document.getElementById('chat-block').style.display = 'flex';
}


let JoinMeeting = async (offerSDP) => {
    if (offerSDP) {
        InvokeRemoteStream();

        peerConnection = new RTCPeerConnection(servers);
        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                // console.log(JSON.stringify(event.candidate));
            }
        };
        peerConnection.ontrack = async (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track)
            });
        };
        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream)
        });
        peerConnection.ondatachannel = function (event) {
            dataChannel = event.channel;
            DataChannelEvent();
        }

        await peerConnection.setRemoteDescription(JSON.parse(offerSDP));
        let answerSDP = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answerSDP);
        answer = JSON.stringify(answerSDP);
        remoteAnswerInput.innerText = answer;
    }
}

function AddMessageToList(msg) {
    let data = JSON.parse(msg);
    chatList.innerHTML += `
        <li class='chat-item' id='remote'>
            <strong>${data.user}</strong>
            <p>${data.message}</p>
            </li>`;
}
function SendMessage() {
    let msg = chatInput.value;
    if (msg) {
        let data = {
            user: UserName,
            message: msg
        }
        dataChannel.send(JSON.stringify(data));
        chatList.innerHTML += `
        <li class='chat-item' id='user'>
            <strong>You</strong>
            <p>${data.message}</p>
            </li>`;
    }
    chatInput.value = '';
}



// ================================
async function InvokeLocalStream() {
    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
    document.getElementById('user-1').srcObject = localStream;
}

function InvokeRemoteStream() {
    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;
}