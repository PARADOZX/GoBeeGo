import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class TripStore extends EventEmitter {
    constructor() 
    {
        super();
    }
    addTrip(action)
    {
        this.emit("trip_added");
    }
    getAllTrips()
    {
        return axios({
            url: '/accountRoutes/getTrips',
            method: 'get'
        })
    }
    tripExistsNotification()
    {
        this.emit("trip_already_exists");
    }
    handleActions(action){
     
        switch(action.type)
        {
            case "TRIP_CREATED": {
                this.addTrip(action);
                break;
            }
            case "TRIP_ALREADY_EXISTS": {
                this.tripExistsNotification();
                break;
            }
        }
    }
}

const tripStore = new TripStore();
window.tripStore = tripStore;

//registers store with dispatcher
dispatcher.register(tripStore.handleActions.bind(tripStore));

window.dispatcher = dispatcher;

export default tripStore;