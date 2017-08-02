import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import SearchPage from './SearchPage';
import DestinationCard from './DestinationCard';
import PlanStore from "./stores/PlanStore";
import * as YelpActions from "./actions/YelpActions";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            destinations : []
        };
        this.coords = {};
        
    }
    componentWillMount()
    {
        var that = this;
        PlanStore.getDestinations(this.props.tripID).then(function(response){ 
            that.setState(
            {
                destinations : response.data
            }) 
        })
    }
    componentDidMount() {
        var that = this;
        //check if html5 geolocation exists 
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                that.assignCoords(position.coords.latitude, position.coords.longitude);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
            //Something here to redirect out of app.
        }
    }
    assignCoords(lat, long)
    {
        this.coords.latitude = lat;
        this.coords.longitude = long;
    }
    destinationAdded()
    {
        
    }
    render(){
        const {destinations} = this.state;
        const {tripID} = this.props;
        let destinationsList = null;
 
        if (destinations !== undefined){
            destinationsList = destinations.map((r, i) => 
            <DestinationCard 
                key={i} 
                name={r.name} 
                // street={r.location.address1 + " " + r.location.address2 + " " + r.location.address3}
                // city={r.location.city}
                // state={r.location.state}
                // zip={r.location.zip_code}
                // rating={r.rating}
                // phone={r.phone}
                // imgurl = {r.image_url}
                // id = {r.id}
                tripID={tripID}
            />);
        }
        
        return (
            <div>
                <p className="page-title">Add Destination</p>
                <SearchPage coordinates={this.coords}/>
                <Link to="/plan/somewhere">Somewhere</Link>
                <Route path="/plan/somewhere" render={() => (
                  <h3>Please select a topic.</h3>
                )} />
                <div className="row">
                    {destinationsList}
                </div>
            </div>
        )
    }
}