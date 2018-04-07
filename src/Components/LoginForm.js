import React, { Component } from 'react';
import fire from './fire';
import App from './../App';
import SignUpPage from './SignUpPage';
import logo from './../logo.png';
import ForgotPassword from './ForgotPassword';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            password: '',
            submitted: false,
            clicked: false,
            forgot_pass: false
        }
    }

    handleSubmit(e) {
        var not_found = false;
        if (this.refs.text.value === '' || this.refs.password.value === '') {
            alert("Enter Details");
        }
        else {

            this.setState({
                user: this.refs.text.value,
                password: this.refs.password.value
            }, function () {
                let userRef = fire.database().ref('users');

                userRef.on('child_added', snapshot => {
                    if (snapshot.val().username === this.state.user && snapshot.val().password === this.state.password) {
                        this.setState({ submitted: true });
                        not_found = false;
                        // console.log('connected: ' + snapshot.child("username").val());
                    }
                    else
                    {
                        not_found = true;
                    }
                });

                fire.auth().signInWithEmailAndPassword(this.refs.text.value, this.refs.password.value).catch(function(error) {
                    console.log('login failed');
                    // this.setState({ submitted: false });
                });
                // this.setState({ submitted: true });
                if(not_found)
                {
                    alert('Invalid user details');
                }

            });

        }
        e.preventDefault();
    }

    handleSubmit2(e) 
    {
        this.setState({ clicked: true });
        e.preventDefault();
    }


    handleForgotPassword(e)
    {
        this.setState({ forgot_pass: true });
        e.preventDefault();
    }

    render() {
        if (this.state.submitted) {
            return (<App user={this.state.user} />);
        }
        else if (this.state.clicked) {
            return (<SignUpPage />);
        }
        else if (this.state.forgot_pass) {
            return (<ForgotPassword />);
        }
        else {
            return (
                <div className="login-wrapper">
                <div className="login-form">
                    <img className="login-form-logo" src={logo} alt="logo"/>
                    <p className="form-title">Sign to ConnectUs Account</p>
                    <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                        <span id="reauth-email" className="reauth-email"></span>
                        <input type="text" ref="text" id="inputEmail" className="form-control" placeholder="Email" required autoFocus/>
                        <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-6">
                                <div id="remember" className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me"/> <small>Remember me</small>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-6 text-right">
                                <a href="javascript:void(0)" className="forgot-password" onClick={this.handleForgotPassword.bind(this)}>
                                    <small className="forgot-pass">Forgot password?</small>
                                </a>
                            </div>
                        </div>
                        <input className="btn btn-block btn-signin" type="submit" value="Sign in"/>
                            <a href="javascript:void(0)" className="regsiter-link" onClick={this.handleSubmit2.bind(this)}> Don't have an Account? Create One</a>
                    </form>
                </div>
                </div>
                );
        }

    }
}

export default LoginForm;