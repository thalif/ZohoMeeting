import util from "./util.js";

let Util = new util();
let loginBtn = document.getElementById('login-btn');
let usernameInput = document.getElementById('user-name-input');

window.onload = (event) =>{
    
}
loginBtn.addEventListener('click', () => {
    try {
        Util.SetUsername(usernameInput.value)
        window.location.href = "../dashboard.html";
    }
    catch (exception) {
        alert(exception);
    }
});