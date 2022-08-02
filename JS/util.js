export default class Utils {
    constructor() {
        this.UserName_Label = 'username';
        this.AnswerSDP_Label = 'answerSDP';
        this.ChatSessionType = 'sessionType';
    }
    
    SetUsername(username) {
        if(username)
            sessionStorage.setItem(this.UserName_Label, username);
        else
            throw 'Please provide valid username.'
    }
    GetUsername() {
        let user = sessionStorage.getItem(this.UserName_Label);
        if (user)
            return user;
        else
            throw 'No data found for [username]'
    }

    SetAnswerSDP(answerSDP) {
        if(answerSDP)
            sessionStorage.setItem(this.AnswerSDP_Label, answerSDP);
        else
            throw 'Invalid or Empty SDP found.';
    }
    GetAnswerSDP() {
        let answerSDP = sessionStorage.getItem(this.AnswerSDP_Label);
        if(answerSDP)
            return answerSDP;
        else
            throw 'Answer SDP not found.!';
    }

    SetChatSessionType(type) {
        sessionStorage.setItem(this.ChatSessionType, type);
    }
    GetChatSessionType() {
        return sessionStorage.getItem(this.ChatSessionType);
    }
}
