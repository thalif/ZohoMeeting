let createMeetingBtn = document.getElementById('create-meet-btn');
let joinMeetingBtn = document.getElementById('join-meet-btn');
let resetBtn = document.getElementById('reset-btn');

let inviteSection = document.getElementById('invite-block');
let joinSection = document.getElementById('join-block');


createMeetingBtn.addEventListener('click', () => {
    createMeetingBtn.style.display = 'block';
    joinMeetingBtn.style.display = 'none';

    inviteSection.style.display = 'flex';
    joinSection.style.display = 'none';

    Redirect();
});
joinMeetingBtn.addEventListener('click', () => {
    createMeetingBtn.style.display = 'none';
    joinMeetingBtn.style.display = 'block';

    inviteSection.style.display = 'none';
    joinSection.style.display = 'flex';
});
resetBtn.addEventListener('click', () => {
    createMeetingBtn.style.display = 'block';
    joinMeetingBtn.style.display = 'block';

    inviteSection.style.display = 'none';
    joinSection.style.display = 'none';
})

function Redirect() {
    window.location.href = "../chatPage.html";
}

