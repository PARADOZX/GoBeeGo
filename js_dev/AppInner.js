import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';

import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Home from './Home';
import Yelp from './Yelp';

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
        // if(this.state.loggedIn){
        //     return (
        //         <LayoutWithNav>
        //             <Routes />
        //         </LayoutWithNav>
        //     );    
        // } else {
        //     return (
        //       <LayoutNoNav>
        //             <Route exact path="/" component={Login} />
        //             <Route exact path="/register" component={Register} />
        //             <Route path="/archive" component={Login} />
        //       </LayoutNoNav>
        //     );  
            
        // }
        
        var {loggedIn} = this.state;
        console.log("is logged in: " + loggedIn);
        return (
            <LayoutWithNav logged={loggedIn}>
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
                <Route exact path="/register" component={Register} />
                <Route exact path="/home" render={ () => {
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
                <Route exact path="/yelp" component={Yelp} />
            </LayoutWithNav>
        )

    }
}