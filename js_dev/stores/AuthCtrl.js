import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class AuthCtrl extends EventEmitter {
    constructor() {
        super();
    }
    logOut()
    {
        this.emit("change");
    }
    registered()
    {
        this.emit("registered");
    }
    registerUserExists()
    {
        this.emit("register_user_exists");
    }
    loggedIn()
    {
        this.emit("logged_in");
    }
    logInFail()
    {
        this.emit("log_in_fail");
    }
    handleActions(action){
        // console.log(action);
        switch(action.type)
        {
            case "REGISTERED": {
                this.registered();
                break;
            }
            case "REGIS_USER_EXISTS": {
                this.registerUserExists();
                break;
            }
            case "LOG_OUT": {
                this.logOut();
                break;
            }
            case "LOGGED_IN": {
                this.loggedIn();
                break;
            }
            case "LOG_IN_FAIL": {
                this.logInFail();
                break;
            }
        }
    }
    
}

const authCtrl = new AuthCtrl();
window.authCtrl = authCtrl;

//registers store with dispatcher
dispatcher.register(authCtrl.handleActions.bind(authCtrl));

window.dispatcher = dispatcher;

export default authCtrl;