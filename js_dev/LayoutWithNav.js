import React from "react";
import Nav from "./Nav";

export default class extends React.Component {
  
    render(){
            return (
                <div>
                    <Nav logged={this.props.logged}></Nav>
                </div>
            );    
    }
}
