import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import SearchPage from './SearchPage';
import DestinationCard from './DestinationCard';
import PlanStore from "./stores/PlanStore";
import * as YelpActions from "./actions/YelpActions";
import * as MapActions from "./actions/MapActions";
import * as BAL from "./bal/BAL";

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            destinations : [],
            useGPS : true,
            manualLocation: "",
            manualLocData: "",
            changeLocClicked : false,
            data: ["Red","Green","Blue","Yellow","Black","White","Orange"]
        };
    }
    componentWillMount()
    {
        var that = this;
        // PlanStore.getDestinations(this.props.tripID).then(function(response){ 
        PlanStore.getDestinations(this.props.match.params.id)
            .then(function(response){ 
                that.setState(
                {
                    destinations : response.data
                }) 
                console.log(that.state.destinations);
               // MapActions.distanceMatrixCalc();
            })
            .catch(function(error){
                //axios error handling does not catch 404.  this is an axios bug
                console.log(error);
            })
        
        this.props.setTripID(this.props.match.params.id);
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
    cancelEnterManualLoc()
    {
        this.setState(
            {
                changeLocClicked: false
            })
    }
    dragStart(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        // Firefox requires dataTransfer data to be set
        e.dataTransfer.setData("text/html", e.currentTarget);
    }
    dragEnd(e) {
    
        this.dragged.style.display = "block";
        this.dragged.parentNode.removeChild(placeholder);
        // Update data
        var data = this.state.data;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        if(from < to) to--;
        if(this.nodePlacement == "after") to++;
        data.splice(to, 0, data.splice(from, 1)[0]);
        this.setState({data: data});
    }
    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if(e.target.className == "placeholder") return;
        this.over = e.target;
        // Inside the dragOver method
        var relY = e.clientY - this.over.offsetTop;
        var height = this.over.offsetHeight / 2;
        var parent = e.target.parentNode;
        
        if(relY > height) {
          this.nodePlacement = "after";
          parent.insertBefore(placeholder, e.target.nextElementSibling);
        }
        else if(relY < height) {
          this.nodePlacement = "before"
          parent.insertBefore(placeholder, e.target);
        }
    }
    GMCalculateDist()
    {
        //   //displays map
        //   var directionsDisplay = new google.maps.DirectionsRenderer();
          
        //   directionsDisplay = new google.maps.DirectionsRenderer();
        //   var chicago = new google.maps.LatLng(41.850033, -87.6500523);
        //   var mapOptions = {
        //     zoom:7,
        //     center: chicago
        //   }
        //   var map = new google.maps.Map(this.refs.mappy, mapOptions);
        //   directionsDisplay.setMap(map);
          
        //   //sets waypoints on map above
        //   var directionsService = new google.maps.DirectionsService();
        //   var request = {
        //     origin: 'Rockville, MD',
        //     destination: 'Baltimore, MD',
        //     travelMode: 'DRIVING',
        //   };
        //   directionsService.route(request, function(result, status) {
        //     if (status == 'OK') {
        //         //console.log(result);
        //       directionsDisplay.setDirections(result);
        //     }
        //   });
          
    }
    //save manual location
    setManualLocation()
    {
        this.setState({
            manualLocData : this.state.manualLocation,
            changeLocClicked: false
        })
        
    }
    setCurrentLocation()
    {
        this.setState({
            manualLocData : "",
            changeLocClicked: false
        })
    }
    //show change location div
    showChangeLoc()
    {
        this.setState(
            {
                manualLocation : "",
                changeLocClicked : true,
                saveLocClicked : false
            })
    }
    
    render(){
        const {destinations} = this.state;
        const {manualLocData} = this.state;
        const tripID = this.props.match.params.id;
        let destinationsList = null;
 
        if (destinations !== undefined){
            destinationsList = destinations.map((r, i) => 
            <DestinationCard 
                key={i} 
                name={r.name} 
                tripID={tripID}
                place={i+1}
            />);
        }
        
        const changeLocDivClass = this.state.changeLocClicked ? 'yes-display' : 'no-display';
        const locDefaultDivClass = this.state.changeLocClicked ? 'no-display' : 'yes-display';
        
        return (
            <div>
                <ul onDragOver={this.dragOver.bind(this)}>
                	{this.state.data.map(function(item, i) {
                  	return (
                    	<li
            		        data-id={i}
                        key={i}
                        draggable="true"
                        onDragEnd={this.dragEnd.bind(this)}
                        onDragStart={this.dragStart.bind(this)}
                      >
                   			{item}
                      </li>
                    )
               	 	}, this)}
                </ul>
                <h3>Trip Summary</h3>
                <p></p>
                <div id="mappy" style={{width:'400px', height: '400px'}} ref="mappy"></div>
                <p className="page-title">Add Destination</p>
                <div className={locDefaultDivClass}>
                    <p>
                    {
                        manualLocData == "" ? <span>Current Location</span> : manualLocData
                    }
                    <span className="clickable" onClick={this.showChangeLoc.bind(this)}>Change Location</span></p>
                </div>
                <div className={changeLocDivClass} >
                    <p>Specify Location</p>
                    {
                        manualLocData == "" ? null : <p><input type="checkbox" onChange={this.setCurrentLocation.bind(this)} /> Use Current Location</p>
                    }
                    <input className="input-control-xs" placeholder="enter location (eg. zip code, city, state)" type="text" onChange={this.onHandleChange.bind(this)} value={this.state.manualLocation} name="manualLocation" /><button onClick={this.setManualLocation.bind(this)}>set location</button>
                    <p><span onClick={this.cancelEnterManualLoc.bind(this)}>cancel</span></p>
                </div>
                <SearchPage manualLocData={manualLocData} />
                <Link to="/plan/somewhere">Somewhere</Link>
                <Route path="/plan/somewhere" render={() => (
                  <h3>Please select a topic.</h3>
                )} />
                <section>
                    <h4>Destinations</h4>
                    <div className="row">
                        {destinationsList}
                    </div>
                </section>
            </div>
        )
    }
}