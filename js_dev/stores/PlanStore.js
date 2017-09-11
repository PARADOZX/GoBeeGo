import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class PlanStore extends EventEmitter {
    constructor() {
        super();
        
        this.destinations = [];
    }
    addDestination(action){
        var that = this;
    
        axios({
            url: '/accountRoutes/saveDestination',
            method: 'post',
            data: action.response
        })
        .then(function(response){
            if(response.data)
            {
                that.emit("destination_added");
            }
        });
        
    }
    destinationsReordered()
    {
        this.emit("destinations_reordered");
    }
    getDestinations(tripID)
    {
        // return this.destinations;
        var that = this;
        return axios({
            url: '/accountRoutes/getDestinations',
            method: 'get',
            params: {
                tripID : tripID
            }
        })
    }
    handleActions(action){
     
        switch(action.type)
        {
            case "ADD_DESTINATION": {
                this.addDestination(action);
                break;
            }
            case "DESTINATIONS_REORDERED": {
                this.destinationsReordered(action);
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