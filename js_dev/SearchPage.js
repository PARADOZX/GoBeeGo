import React from 'react';
import * as YelpActions from "./actions/YelpActions";
import YelpCtrl from "./stores/YelpCtrl";
import Autosuggest from "./Autosuggest";

export default class extends React.Component {
    constructor()
    {
        super();
        
        this.state = {
            search : "",
            suggestions : []
        };
    }
    componentWillMount()
    {
        var that = this;
        YelpCtrl.on("change", ()=>{
            // this.setState({
            //     articles : ArticleStore.getAll()
            // });
            console.log(YelpCtrl.getAllBusinesses());
            // this.props.history.push('/businessResults');
          
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
        const {suggestions} = this.state;
        
        const suggestionsList = suggestions.map((sugg, i)=><option key={i} value={sugg}/>);
    
        return (
            <div>
                <h3>Search For: </h3>
                <Autosuggest 
                    suggestions={suggestionsList} 
                    listName="suggestions" 
                    onChangeHandler={this.onHandleChange.bind(this)} 
                    onKeyUpHandler={this.autocompleteGen.bind(this)} 
                    val={this.state.search} 
                    nameVal="search" />
                <button onClick={this.searchYelp.bind(this)}>Search</button>
            </div>
        )
    }
}