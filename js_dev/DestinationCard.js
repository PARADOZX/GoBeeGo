import React from 'react';
import { Link } from "react-router-dom";

export default class extends React.Component {
    constructor(props)
    {
        super(props);
        
        this.state = {};
    }
    componentWillMount()
    {
    }
    componentDidMount()
    {
    
    }
    render(){
        
        return (
            <div className="col-10 mt-4">
                <div className="destination-card card">
                    <div className="card-header">
                        <span style={{width:'50px', paddingRight: '10px'}}>{this.props.place}</span>
                        <span className="h5">{this.props.name}</span>
                    </div>
                    <div className="card-block">
                        <Link className="btn btn-primary" to={"/home"}>details</Link>
                   </div>
               </div>
            </div>
        )
    }
}
