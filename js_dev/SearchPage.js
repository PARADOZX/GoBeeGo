import React from 'react';
import * as YelpActions from "./actions/YelpActions";
import YelpCtrl from "./stores/YelpCtrl";
import Autosuggest from "./Autosuggest";
import SearchResult from "./SearchResult";
import * as BAL from "./bal/BAL";

let receiveResultsCallBackRef = null;

export default class extends React.Component {
    constructor()
    {
        super();
        
        this.state = {
            search : "",
            suggestions : [],
            results : [],
            resultFilter : 0
        };
        
        //assign to a variable b/c a new function reference is created after .bind() is called
        //this allows the removeListener to work
        receiveResultsCallBackRef = this.receiveResultsCallBack.bind(this);
    }
    componentWillMount()
    {
        var that = this;
        
        // YelpCtrl.on("detailsAndReviews", function(){
            
        // });
        
        YelpCtrl.on("change", receiveResultsCallBackRef);
    }
    componentWillUnmount() {
        YelpCtrl.removeListener("change", receiveResultsCallBackRef);
    }
    receiveResultsCallBack()
    {
        const response = YelpCtrl.getAllBusinesses();
        const parsedResults = response[0][0].data;
      
        this.setState({
            results : parsedResults
        });
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
        // console.log(this.state.results);
    }
    filterChange(event)
    {
        this.setState({resultFilter:event.target.value});
    }
    searchYelp()
    {
        let tempSearchArr = [];
        
        if(this.state.search !== "") tempSearchArr.push(this.state.search);
        
        YelpActions.searchBusinessByKeyword(tempSearchArr, this.props.coordinates);
    }
    autocompleteGen(event)
    {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const suggestion_target = event.target.list.id;
        
        var that = this;
        
        //return promise instead of hitting a store b/c no need to change anything else but the target input text box
        const promise = YelpActions.autocompleteGen(this.state[name]);
        
        promise
            .then(function(response){
                let tempArr = [];
                
                for(const term in response.data.terms)
                {
                    tempArr.push(response.data.terms[term].text);
                }
                
                that.setState({
                        [suggestion_target] : tempArr
                });
            })
            .catch(function(error){
                console.log(error);
            })
    }
    render(){
        this.applyResultFilter();
        
        const {suggestions} = this.state;
        const {results} = this.state;
     
        const suggestionsList = suggestions.map((sugg, i)=><option key={i} value={sugg}/>);
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
                <section className="mb-3">
                    <Autosuggest 
                        suggestions={suggestionsList} 
                        listName="suggestions" 
                        onChangeHandler={this.onHandleChange.bind(this)} 
                        onKeyUpHandler={this.autocompleteGen.bind(this)} 
                        val={this.state.search} 
                        nameVal="search" />
                    <button onClick={this.searchYelp.bind(this)}>Search</button>
                    <select value={this.state.resultFilter} onChange={this.filterChange.bind(this)}>
                        <option value="0">Name</option>
                        <option value="1">Rating</option>
                        <option value="2">Distance</option>
                    </select>
                </section>
                <div className="row">
                {resultsList}
                </div>
            </div>
        )
    }
}