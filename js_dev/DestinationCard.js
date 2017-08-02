import React from 'react';

export default class extends React.Component {
    constructor(props)
    {
        super(props);
        
        this.state = {};
    }
    componentWillMount()
    {
        console.log(this.props.tripID);
    }
    componentDidMount()
    {
    
    }
    render(){
        
        return (
            <div>
               Desitination card
               {this.props.name}
            </div>
        )
    }
}
