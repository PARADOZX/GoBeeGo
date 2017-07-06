import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class YelpCtrl extends EventEmitter {
    constructor() {
        super();
    }
    yelpAutoComplete(action)
    {
        
    }
    handleActions(action){
     
        switch(action.type)
        {
            case "YELP_AUTOCOMPLETE_GEN": {
                this.yelpAutoComplete(action);
                break;
            }
        }
    }
    
}

const yelpCtrl = new YelpCtrl();
window.yelpCtrl = yelpCtrl;

//registers store with dispatcher
dispatcher.register(yelpCtrl.handleActions.bind(yelpCtrl));

window.dispatcher = dispatcher;

export default yelpCtrl;