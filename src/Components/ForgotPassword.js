import React, { Component } from 'react';
import logo from './../logo.png';
import fire from './fire';
import Home from './Home';

class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
            clicked: false
        }
    }


    handleSubmit(e) {
        // console.log("forgot password");
        fire.auth().sendPasswordResetEmail(this.refs.email.value);
        this.refs.email.value = '';
        alert('Please check your email. Reset Link has been sent to your email id');
        e.preventDefault();
    }

    handleSubmit2(e) {
        this.setState({ clicked: true });
        e.preventDefault();
    }

    render() {
        if (this.state.clicked) {
            return (<Home />);
        }
        else {
            return (
                <div className="login-wrapper">
                    <div className="login-form">
                        <img className="login-form-logo" src={logo} alt="logo" />
                        <p className="form-title">Forgot Password</p>
                        <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                            <span id="reauth-email" className="reauth-email"></span>
                            <input type="text" ref="email" id="inputEmail" className="form-control" placeholder="Email" required autoFocus />
                            <input className="btn btn-block btn-signin" type="submit" value=" Get Reset Link" />
                            <a href="javascript:void(0)" className="regsiter-link" onClick={this.handleSubmit2.bind(this)}> Sign In</a>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default ForgotPassword;