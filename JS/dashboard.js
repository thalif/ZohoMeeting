import util from "./util.js"

let Util = new util();
let createMeetingBtn = document.getElementById('create-meet-btn');
let joinMeetingBtn = document.getElementById('join-meet-btn');
let resetBtn = document.getElementById('reset-btn');
let remoteSDPInput = document.getElementById('remote-sdp-input');

let inviteSection = document.getElementById('invite-block');
let joinSection = document.getElementById('join-block');

let sesstionType;

createMeetingBtn.addEventListener('click', () => {
    createMeetingBtn.style.display = 'block';
    joinMeetingBtn.style.display = 'none';

    inviteSection.style.display = 'flex';
    joinSection.style.display = 'none';

    sesstionType = true;
    Redirect();
});
joinMeetingBtn.addEventListener('click', () => {
    
    sesstionType = false;
    Redirect();
});
resetBtn.addEventListener('click', () => {
    createMeetingBtn.style.display = 'block';
    joinMeetingBtn.style.display = 'block';

    inviteSection.style.display = 'none';
    joinSection.style.display = 'none';
});

function Redirect() {
    Util.SetChatSessionType(sesstionType);
    window.location.href = "../chatPage.html";
}

