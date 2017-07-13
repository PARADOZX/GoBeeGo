import React from 'react';


export default class extends React.Component {
    render(){
        
        const divStyle = {
            display: "inline-block"
        };
        
        return ( 
            <div style={divStyle}>
                <input type="text" list={this.props.listName} onChange={this.props.onChangeHandler} onKeyUp={this.props.onKeyUpHandler} value={this.props.val} name={this.props.nameVal} />
                <datalist id={this.props.listName}>{this.props.suggestions}</datalist>
            </div>
        )
    }
} 