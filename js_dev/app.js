import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import Layout from './Layout';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import AppInner from './AppInner';
import Archive from './Archive';

const content = document.getElementById('content');

ReactDOM.render((
        <AppInner />)
, content);


