import React from 'react';
import * as YelpActions from "./actions/YelpActions";
import YelpCtrl from "./stores/YelpCtrl";
import Autosuggest from "./Autosuggest";

export default class extends React.Component {
    constructor()
    {
        super();
        
        this.state = {
            search1 : "",
            search2 : "",
            search3: "",
            suggestions1 : ["test", "test2", "test3"],
            suggestions2 : [],
            suggestions3 : []
        };
    }
    componentWillMount()
    {
        var that = this;
        YelpCtrl.on("change", that.receiveResultsCallBack);
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
    receiveResultsCallBack()
    {
         // this.setState({
            //     articles : ArticleStore.getAll()
            // });
            // console.log(YelpCtrl.getAllBusinesses());
            this.props.history.push('/businessResults');
    }
    componentWillUnmount()
    {
        var that = this;
        YelpCtrl.removeListener("change", this.receiveResultsCallBack);
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
    assignCoords(lat, long)
    {
        this.coords = {};
        this.coords.latitude = lat;
        this.coords.longitude = long;
    }
    searchYelp()
    {
        let tempSearchArr = [];
        
        if(this.state.search1 !== "") tempSearchArr.push(this.state.search1);
        if(this.state.search2 !== "") tempSearchArr.push(this.state.search2);
        if(this.state.search3 !== "") tempSearchArr.push(this.state.search3);
        
        YelpActions.searchBusinessByKeyword(tempSearchArr, this.coords);
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
        const {suggestions1, suggestions2, suggestions3} = this.state;
        
        const suggestionsList1 = suggestions1.map((sugg, i)=><option key={i} value={sugg}/>);
        const suggestionsList2 = suggestions2.map((sugg, i)=><option key={i} value={sugg}/>);
        const suggestionsList3 = suggestions3.map((sugg, i)=><option key={i} value={sugg}/>);
    
        return (
            <div>
                <h3>Yelp API Test</h3>
                <Autosuggest 
                    suggestions={suggestionsList1} 
                    listName="suggestions1" 
                    onChangeHandler={this.onHandleChange.bind(this)} 
                    onKeyUpHandler={this.autocompleteGen.bind(this)} 
                    val={this.state.search1} 
                    nameVal="search1" />
                    
                <Autosuggest 
                    suggestions={suggestionsList2} 
                    listName="suggestions2" 
                    onChangeHandler={this.onHandleChange.bind(this)} 
                    onKeyUpHandler={this.autocompleteGen.bind(this)} 
                    val={this.state.search2} 
                    nameVal="search2" />
                    
                <Autosuggest 
                    suggestions={suggestionsList3} 
                    listName="suggestions3" 
                    onChangeHandler={this.onHandleChange.bind(this)} 
                    onKeyUpHandler={this.autocompleteGen.bind(this)} 
                    val={this.state.search3} 
                    nameVal="search3" />
                    
                {/*<input type="text" list="suggestions1" onChange={this.onHandleChange.bind(this)} onKeyUp={this.autocompleteGen.bind(this)} value={this.state.search1} name="search1" />
                <datalist id="suggestions1">{suggestionsList1}</datalist>
                <input type="text" list="suggestions2" onChange={this.onHandleChange.bind(this)} onKeyUp={this.autocompleteGen.bind(this)} value={this.state.search2} name="search2" />
                <datalist id="suggestions2">{suggestionsList2}</datalist>
                <input type="text" list="suggestions3" onChange={this.onHandleChange.bind(this)} onKeyUp={this.autocompleteGen.bind(this)} value={this.state.search3} name="search3" />
                <datalist id="suggestions3">{suggestionsList3}</datalist>*/}
                
                <button onClick={this.searchYelp.bind(this)}>Search</button>
            </div>
        )
    }
}