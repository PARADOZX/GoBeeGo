import React from 'react';

export default class extends React.Component {
    constructor(props)
    {
        super(props);
    }
    componentWillMount()
    {
        
    }
    setTripID()
    {
        this.props.selectTrip(this.props.id);
    }
    render(){
        return (
            <div>
               Trip Card
               {this.props.name}
               <button className="btn" onClick={this.setTripID.bind(this)}>Select Trip</button>
            </div>
        )
    }
}
