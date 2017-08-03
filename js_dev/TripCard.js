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
        
        const {datecreated} = this.props;
        let dateFormatted;
        
        if(datecreated != undefined) {
            dateFormatted = new Date(datecreated);
            dateFormatted = "created " + (dateFormatted.getMonth()+1) + '-' + dateFormatted.getDate() + '-' + dateFormatted.getFullYear();    
        }
        
        return (
            <div className="col-10 mt-4">
                <div className="trip-card card">
                    <div className="card-header">
                        <span className="h5">{this.props.name}</span><span className="float-right">{this.props.destinations.length} stops</span>
                        <p className="text-muted">{dateFormatted}</p>
                    </div>
                   <div className="card-block">
                    <button className="btn btn-primary" onClick={this.setTripID.bind(this)}>select</button>
                   </div>
                </div>
            </div>
        )
    }
}
