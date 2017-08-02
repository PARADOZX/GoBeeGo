import React from "react";
import * as AppActions from './actions/AppActions';
import TripStore from "./stores/TripStore";
import TripCard from "./TripCard";

let tripCreatedCallBackRef = null;
let tripExistsNotificationCallBackRef = null;

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
           newTripName : "",
           trips: []
        };
        
        tripCreatedCallBackRef = this.tripCreatedCallBack.bind(this);
        tripExistsNotificationCallBackRef = this.tripExistsNotificationCallBack.bind(this);
    }
    componentWillMount(){
        var that = this;
        
        TripStore.on("trip_added", tripCreatedCallBackRef);
        TripStore.on("trip_already_exists", tripExistsNotificationCallBackRef);
       
        TripStore.getAllTrips().then(function(response){ 
            that.setState(
            {
                trips : response.data
            }) 
            console.log(response.data);
        })
    }
    componentDidMount(){
        //check if html5 geolocation exists 
        if(!navigator.geolocation){
            alert("Geolocation is not supported by this browser.");
            //Something here to redirect out of app.
        }
    }
    componentWillUnmount() {
        TripStore.removeListener("trip_added", tripCreatedCallBackRef);
        TripStore.removeListener("trip_already_exists", tripExistsNotificationCallBackRef);
    }
    createNewTrip()
    {
        AppActions.createNewTrip(this.state.newTripName);
    }
    onHandleChange(event)
    {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
          [name]: value
        });
    }
    setTripID(trip_id)
    {
        this.props.setTripID(trip_id);
    }
    tripCreatedCallBack()
    {
        var that = this;
        TripStore.getAllTrips().then(function(response){ 
            that.setState(
            {
                trips : response.data
            }) 
        })
    }
    tripExistsNotificationCallBack()
    {
        alert("Trip name already used.");
    }
    render() {
        
        const {trips} = this.state;
        let tripsList = null;

        if (trips !== undefined){
            tripsList = trips.map((r, i) => 
            <TripCard 
                key={r._id} 
                name={r.name} 
                selectTrip={this.setTripID.bind(this)}
                id={r._id}
            />);
        }
        
        return (
            <div>
                <h3>Dashboard</h3>  
                <section>
                   <h4>Trips</h4>
                   <button onClick={this.setTripID.bind(this)}>Set TripID</button>
                   <br/>
                   <input type="text" onChange={this.onHandleChange.bind(this)} value={this.state.newTripName} name="newTripName" /><button onClick={this.createNewTrip.bind(this)}>Create Trip</button>
                </section>
                <section>
                {tripsList}
                </section>
            </div>
        ) 
    }
};

