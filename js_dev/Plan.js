import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import SearchPage from './SearchPage';
import PlanStore from "./stores/PlanStore";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            destinations : []
        };
        this.coords = {};
    }
    componentWillMount()
    {
        this.setState(
            {
                destinations : PlanStore.getDestinations()
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
    render(){
        const {destinations} = this.state;
        return (
            <div>
                <p className="page-title">Add Destination</p>
                <SearchPage coordinates={this.coords}/>
                <Link to="/plan/somewhere">Somewhere</Link>
                <Route path="/plan/somewhere" render={() => (
                  <h3>Please select a topic.</h3>
                )} />
                {destinations}
            </div>
        )
    }
}