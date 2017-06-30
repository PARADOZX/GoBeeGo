import React from "react";
import RegisterForm from "./RegisterForm"

export default class extends React.Component {
    constructor(){
        super();
        this.state = {
            test : null
        }
        
    }
    testfunc(x)
    {
        console.log(x);
        if(x)
        {
            this.setState(
                {
                    test : true
                })
        } else {
            this.setState(
                {
                    test : false
                })
        }
    }
    render() {
        const {test} = this.state;
        return (
            <div>
                {
                    test 
                    ? <div>TRUE!</div>
                    : null
                }
                <h3>Register</h3>  
                <RegisterForm test={this.testfunc.bind(this)}></RegisterForm>
            </div>
        ) 
    }
};

