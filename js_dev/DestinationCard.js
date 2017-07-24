import React from 'react';

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
            <div>
               Desitination card
               {this.props.name}
            </div>
        )
    }
}
