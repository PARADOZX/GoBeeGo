import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";

import Home from './Home';
import Archive from './Archive';

export default class extends React.Component {
    render(){
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/archive" component={Archive} />
            </div>
        );
    }
}