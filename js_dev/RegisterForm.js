import React from "react";
import * as AuthActions from "./actions/AuthActions";
import AuthCtrl from "./stores/AuthCtrl";
import {withRouter} from "react-router-dom";

class RegisterForm extends React.Component {
    constructor()
    {
        super();
        this.state = {
            firstname : "",
            lastname : "", 
            email : "", 
            password1 : "", 
            password2 : "",
            passwordMatch : null,
            userExistAlert : false
        };
    }
    componentWillMount(){
        AuthCtrl.on("registered", (err)=>{
            alert("User Registered!");
            this.props.history.push('/');
        });
        AuthCtrl.on("register_user_exists", (err)=>{
            this.setState({
                userExistAlert : true
            })
        });
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
    checkPasswordMatch(event)
    {
        this.onHandleChange(event);
        
        if(this.state.password1 === "" && this.state.password2 === "") {
            this.setState({
                passwordMatch: null
            })
        } else {
            if(this.state.password1 !== this.state.password2)
            {
                this.setState({
                    passwordMatch : false
                })
            } 
            else 
            {
                this.setState({
                    passwordMatch : true
                })
            }
        }
    }
    checkFieldsCompleted()
    {
        let errors = "";
        
        if(this.state.firstname === "") errors += "Please enter a first name.\n";
        if(this.state.lastname === "") errors += "Please enter a last name.\n";
        if(this.state.email === "") errors += "Please enter an email.\n";
        if(this.state.password1 === "" && this.state.password2 === "") errors += "Please enter a passsword.\n";
        if(!this.state.passwordMatch) errors += "Passwords must match.\n";
        
        return errors;
    }
    registerUser()
    {
        const fieldsComplete = this.checkFieldsCompleted();
        
        if(fieldsComplete === "") {
            const userModel = this.buildUser();
            AuthActions.registerUser(userModel);    
        } else {
            alert(fieldsComplete);
        }
    }
    buildUser()
    {
        return this.state;
    }
    test(e){
        this.props.test(this.state.passwordMatch);
    }
    render()
    {
        const {userExistAlert} = this.state;
        const {passwordMatch} = this.state;
        
        return (
                <div>
                    {
                        userExistAlert
                            ? <div className="alert alert-danger">User Already Exists</div>
                            : null
                    }
                    {/*<button onClick={this.test.bind(this)}>test</button>*/}
                    <form>
                    	<div className="form-group">
                        	<label>First Name:</label>
                        	<input type="text" name="firstname" value={this.state.firstname} onChange={this.onHandleChange.bind(this)} /><br/>
                    	</div>
                    	<div className="form-group">
                        	<label>Last Name:</label>
                        	<input type="text" name="lastname" value={this.state.lastname} onChange={this.onHandleChange.bind(this)} /><br/>
                    	</div>
                    	<div className="form-group">
                        	<label>Email:</label>
                        	<input type="text" name="email" value={this.state.email} onChange={this.onHandleChange.bind(this)} />
                    	</div>
                    	{
                            passwordMatch !== null
                            ? <div>
                                {
                                    passwordMatch
                                    ? <span className="text-success">Passwords match</span>
                                    : <span className="text-danger">Passwords do not match</span>
                                }
                            </div>
                            : null
                        }
                    	<div>{this.state.passwordMatch}</div>
                    	<div className="form-group">
                        	<label>Password:</label>
                        	<input type="password" name="password1" value={this.state.password1}  onKeyUp = {this.checkPasswordMatch.bind(this)} onChange={this.onHandleChange.bind(this)} />
                    	</div>
                    	<div className="form-group">
                        	<label>Re-enter Password:</label>
                        	<input type="password" name="password2"  value={this.state.password2} onKeyUp = {this.checkPasswordMatch.bind(this)} onChange={this.onHandleChange.bind(this)} />
                    	</div>
                        <div className="form-group">
                        	<input type="button" value="Submit" onClick={this.registerUser.bind(this)} />
                    	</div>
                    </form>
                </div>
        )
    }
    
}

export default withRouter(RegisterForm);