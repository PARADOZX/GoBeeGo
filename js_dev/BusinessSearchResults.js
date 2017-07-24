import React from 'react';
import * as YelpActions from "./actions/YelpActions";
import YelpCtrl from "./stores/YelpCtrl";
import SearchResult from "./SearchResult";
import PlanStore from "./stores/PlanStore";
import {withRouter} from "react-router-dom";

let receiveResultsCallBackRef = null;
let destinationAddedCallBackRef = null;

class BusinessSearchResults extends React.Component {
    constructor(props)
    {
        super(props);
        
        this.state = {
            results : [],
            resultFilter : 0
        };
        this.coords = {};
        
        //assign to a variable b/c a new function reference is created after .bind() is called
        //this allows the removeListener to work
        receiveResultsCallBackRef = this.receiveResultsCallBack.bind(this);
        destinationAddedCallBackRef = this.destinationAddedCallBack.bind(this);
    }
    componentWillMount()
    {
        YelpCtrl.on("change", receiveResultsCallBackRef);
        PlanStore.on("destination_added", destinationAddedCallBackRef);
    }
    componentDidMount() {
        var that = this;
        //check if html5 geolocation exists 
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                that.assignCoords(position.coords.latitude, position.coords.longitude);
                that.searchYelp();
            });
        } else {
            alert("Geolocation is not supported by this browser.");
            //Something here to redirect out of app.
        }
    }
    componentWillUnmount() {
        YelpCtrl.removeListener("change", receiveResultsCallBackRef);
        PlanStore.removeListener("destination_added", destinationAddedCallBackRef);
    }
    destinationAddedCallBack()
    {
        this.props.history.push('/plan');
    }
    receiveResultsCallBack()
    {
        const response = YelpCtrl.getAllBusinesses();
        const parsedResults = response[0][0].data;
      
        this.setState({
            results : parsedResults
        });
    }
    searchYelp()
    {
        const search = this.props.match.params.id;
        let tempSearchArr = [];
        if(search !== undefined) tempSearchArr.push(search);
        YelpActions.searchBusinessByKeyword(tempSearchArr, this.coords);
    }
    assignCoords(lat, long)
    {
        this.coords.latitude = lat;
        this.coords.longitude = long;
    }
    applyResultFilter()
    {
        const {resultFilter} = this.state;
        
        switch(resultFilter){
            case "0":
                this.filterResultsByName();
                break;
            case "1":
                this.filterResultsByRating();
                break;
            case "2": 
                this.filterResultsByDistance();
                break;
            default: 
                this.filterResultsByName();
        }
        setTimeout(function(){
            YelpActions.sortBusinessResults();
        }, 0);
    }
    filterResultsByName(){
        this.state.results.sort(function(a, b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        })
    }
    filterResultsByRating()
    {
        this.state.results.sort(function(a, b) {
            return a.rating - b.rating;
        });
    }
    filterResultsByDistance()
    {
        this.state.results.sort(function(a, b) {
            return a.distance - b.distance;
        });
    }
    filterChange(event)
    {
        this.setState({resultFilter:event.target.value});
    }
    render(){
        this.applyResultFilter();
        const {results} = this.state;
        const resultsList = results.map((r, i) => 
            <SearchResult 
                key={i} 
                street={r.location.address1 + " " + r.location.address2 + " " + r.location.address3}
                city={r.location.city}
                state={r.location.state}
                zip={r.location.zip_code}
                name={r.name} 
                rating={r.rating}
                phone={r.phone}
                imgurl = {r.image_url}
                id = {r.id}
            />);
        return (
            <div>
                <h3>Business Search</h3>
                <div>
                    <select value={this.state.resultFilter} onChange={this.filterChange.bind(this)}>
                        <option value="0">Name</option>
                        <option value="1">Rating</option>
                        <option value="2">Distance</option>
                    </select>
                </div>
                <div className="row">
                {resultsList}
                </div>
            </div>
        )
    }
}

export default withRouter(BusinessSearchResults);