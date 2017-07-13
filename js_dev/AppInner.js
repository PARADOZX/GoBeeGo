import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';

import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Home from './Home';
import Yelp from './Yelp';
import BusinessResults from './BusinessResults';
import Plan from './Plan';

import * as AuthActions from "./actions/AuthActions";
import AuthCtrl from './stores/AuthCtrl';
import Routes from './Routes';
import Layout from './Layout';
import LayoutWithNav from './LayoutWithNav';


//AppInner created so there can be a nav and no nav layout
export default class extends React.Component {
    constructor()
    {
        super();
        this.state = {
            loggedIn : false
        };
    }
    componentWillMount(){
        
        //log out button change emit receiver
        AuthCtrl.on("change", (err)=>{
            this.setState({
                loggedIn : false
            });
            
        })
        
        AuthCtrl.on("logged_in", (err)=>{
            this.setState({
                loggedIn : true
            });
        });
        
        var that = this;
        
        AuthActions.isLoggedIn().then(function(response){
            if(response.data)
            {
                that.setState({loggedIn:true});
                
            }
            else 
            {
                
                that.setState({loggedIn:false});
            }   
        })
    }
    
    render(){
    
        var {loggedIn} = this.state;
        console.log("is logged in: " + loggedIn);
        return (
            <Router>
                <div>
                    <LayoutWithNav logged={loggedIn}></LayoutWithNav>
                    <Route exact path="/" render={ () => {
                            if(loggedIn)
                            {
                                return <Redirect to='/home'/>
                            } 
                            else 
                            {
                                return <Login />
                            }
                        }
                    }
                    />
                    <Route path="/register" component={Register} />
                    <Route path="/home" render={ () => {
                            if(loggedIn)
                            {
                                return <Dashboard />
                            } 
                            else 
                            {
                                return <Redirect to='/'/>
                            }
                        }
                    }
                    />
                    <Route path="/yelp" component={Yelp} />
                    <Route path="/businessResults" component={BusinessResults} />
                    <Route path="/plan" component={Plan} />
                </div>
            </Router>
        )

    }
}

