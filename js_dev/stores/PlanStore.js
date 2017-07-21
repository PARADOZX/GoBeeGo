import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class PlanStore extends EventEmitter {
    constructor() {
        super();
        
        this.destinations = [];
    }
    addDestination(action){
        this.destinations.push(action.response);
    }
    getDestinations()
    {
        return this.destinations;
    }
    handleActions(action){
     
        switch(action.type)
        {
            case "ADD_DESTINATION": {
                this.addDestination(action);
                break;
            }
        }
    }
}

const planStore = new PlanStore();
window.planStore = planStore;

//registers store with dispatcher
dispatcher.register(planStore.handleActions.bind(planStore));

window.dispatcher = dispatcher;

export default planStore;