export default class Utils {
    
    SetUsername(username) {
        if(username)
            sessionStorage.setItem("username", username);
        else
            throw 'Please provide valid username.'
    }
    GetUsername() {
        let user = sessionStorage.getItem("username");
        if (user)
            return user;
        else
            throw 'No data found for [username]'
    }
}