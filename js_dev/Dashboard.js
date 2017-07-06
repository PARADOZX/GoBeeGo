import React from "react";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
           
        };
    }
    componentWillMount(){
       
    }
    componentDidMount(){
        //check if html5 geolocation exists 
        if(!navigator.geolocation){
            alert("Geolocation is not supported by this browser.");
            //Something here to redirect out of app.
        }
    }
    render() {
        return (
            <div>
                <h3>Dashboard</h3>  
            </div>
        ) 
    }
};

