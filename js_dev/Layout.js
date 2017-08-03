import React from "react";
import { Link, Redirect } from "react-router-dom";
import Nav from "./Nav";
import * as AuthActions from "./actions/AuthActions";
import Login from "./Login";
import AuthCtrl from './stores/AuthCtrl';

export default class extends React.Component {
    constructor()
    {
        super();
    }
    componentWillMount(){
    }
    render(){
      return (
          <div>
            <h3>React App</h3>
            <div className="container-fluid">
            {this.props.children}
            </div>
        </div>
      )
    }
}
