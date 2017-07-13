import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class YelpCtrl extends EventEmitter {
    constructor() {
        super();
        
        this.businesses = [];
    }
    receiveBusinesses(action)
    {
        //reset results
        this.businesses = [];
        
        for(let result in action)
        {
            if(result !== "type") {
                this.businesses.push(action[result]);
            }
        }
        this.emit("change");
    }
    getAllBusinesses()
    {
        return this.businesses;
    }
    handleActions(action){
     
        switch(action.type)
        {
            // case "YELP_BUSINESS_BY_KEYWORD_RESULTS": {
            //     this.addBusinessesSearchedByKeyword(action);
            //     break;
            // }
            case "YELP_BUSINESS_RESULTS": {
                this.receiveBusinesses(action);
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