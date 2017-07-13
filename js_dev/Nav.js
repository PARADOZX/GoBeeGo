import React from "react";
import {Link} from "react-router-dom";
import * as AuthActions from "./actions/AuthActions";


export default class extends React.Component {
    render(){
      
        const {logged} = this.props;
        
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/">React App</a>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    {
                      logged
                      ? <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                            <Link className="nav-link" to="/home">Home</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/plan">Plan</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/yelp">Yelp</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                          </li>
                        </ul>
                      : null
                    }
                    {
                      logged
                      ? <ul className="nav navbar-nav" style={{float: "right"}}>
                          <li>
                            <button type="button" onClick={AuthActions.logOut}>Logout</button>
                          </li>
                        </ul>
                      : null
                    }
                </div>
            </nav>
        );
    }
}


