import React from 'react';
import YelpCtrl from "./stores/YelpCtrl";
import * as BAL from "./bal/BAL";

export default class extends React.Component {
    constructor()
    {
        super();
        
        this.state = {
            businesses : YelpCtrl.getAllBusinesses()
        };
    }
    componentWillMount()
    {
        YelpCtrl.on("change", ()=>{
            // this.setState({
            //     articles : ArticleStore.getAll()
            // });
            console.log(YelpCtrl.getAllBusinesses());
        });
    }
    componentDidMount() {
      
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
    test()
    {
        BAL.cityFrequencyCount(this.state.businesses);
    }
    render(){
        
        const {businesses} = this.state;
        
        console.log(businesses);
        
        return (
            <div>
                <h3>Business Results Page</h3>
                <button onClick={this.test.bind(this)}>test</button>
            </div>
        )
    }
}