import React from "react";
import {Link} from "react-router-dom";
import * as AuthActions from "./actions/AuthActions";
import AuthCtrl from "./stores/AuthCtrl";
import {withRouter} from "react-router-dom";

export default class extends React.Component {
    constructor() {
        super();
        
        this.state = {
            username : "",
            password : ""
        };
    }
    componentWillMount(){
        AuthCtrl.on("log_in_fail", this.wrongCredsCallBack);
        
    }
    componentWillUnmount() {
        AuthCtrl.removeListener("log_in_fail", this.wrongCredsCallBack);
    }
    wrongCredsCallBack()
    {
        alert("Invalid Credentials.  Please try again.");
    }
    onHandleChange(event)
    {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
          [name]: value
        });
    }
    checkFieldsCompleted()
    {
        let errors = "";
        
        if(this.state.username === "") errors += "Please enter a username.\n";
        if(this.state.password === "") errors += "Please enter password.\n";
        
        return errors;
    }
    login(e) {
        e.preventDefault();
        
        const fieldsComplete = this.checkFieldsCompleted();
        
        if(fieldsComplete === "") {
            const userModel = this.buildUser();
            AuthActions.login(userModel);    
        } else {
            alert(fieldsComplete);
        }
    }
    buildUser()
    {
        return this.state;
    }
    render() {
        return (
            <div>
                <h3>Login</h3>  
                <form action="/auth/login" method="post">
                	<div>
                	<label>Username:</label>
                	<input type="text" name="username" value={this.state.username} onChange={this.onHandleChange.bind(this)} /><br/>
                	</div>
                	<div>
                	<label>Password:</label>
                	<input type="password" name="password" value={this.state.password} onChange={this.onHandleChange.bind(this)} />
                	</div>
                	<div>
                	<button onClick={this.login.bind(this)}>Submit</button>
                	</div>
                	<p><Link to="/register">Register</Link></p>
                </form>
            </div>
        ) 
    }
};

