import React, { Component } from 'react';
import fire from './fire';
import logo from './../logo.png';


class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            cpassword: '',
            submitted: false,
            clicked: false
        }
    }

    handleSubmit(e) {
        if (this.refs.etext.value === '' || this.refs.password.value === '' || this.refs.cpassword.value === '' || this.refs.fullname.value === '') {
            alert("Enter Details");
        }
        else {
            this.setState({
                name: this.refs.fullname.value,
                email: this.refs.etext.value,
                password: this.refs.password.value,
                cpassword: this.refs.cpassword.value,
                submitted: true
            }, function () {
                let db_pass = this.refs.password.value;
                let db_cpass = this.refs.cpassword.value;
                let db_name = this.refs.fullname.value;
                let db_email = this.refs.etext.value;
                // console.log('here: '+user.username);
                if (this.refs.password.value === this.refs.cpassword.value) {
                    fire.auth().createUserWithEmailAndPassword(this.refs.etext.value, this.refs.cpassword.value).then(user => {

                        //update user profile photo
                        var file = this.fileUpload.files[0];
                        var filename = this.fileUpload.files[0].name;
                        var storage = fire.storage();
                        var storageRef = storage.ref();
                        var blob = new Blob([file]);
                        storageRef.child('users/' + filename).put(blob).then((snapshot) => {
                            // added this part which as grabbed the download url from the pushed snapshot
                            // let user_profile = fire.auth().currentUser;
                            user.updateProfile({ photoURL: snapshot.downloadURL });
                            // console.log('user-photo:=' + fire.auth().user.photoURL);
                            let user_db = {
                                password: db_pass, cpassword: db_cpass,
                                name: db_name, email: db_email,
                                photourl: snapshot.downloadURL
                            };

                            fire.database().ref('users').push(user_db);
                        });

                    }).catch(error => {
                        console.log('error');
                        this.setState({ error: error });
                    });
                }

                this.refs.fullname.value = '';
                this.refs.etext.value = '';
                this.refs.password.value = '';
                this.refs.cpassword.value = '';
                alert("User Signed up successfully!! Let's Chat");
            });
        }
        e.preventDefault();
    }

    handleSubmit2(e) {
        this.setState({ clicked: true });
        e.preventDefault();
    }


    render() {
        return (
            <div className="login-form">
                <img className="login-form-logo" src={logo} alt="signup logo" />
                <p className="form-title">Sign Up to ConnectUs Account</p>
                <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                    <span id="reauth-email" className="reauth-email"></span>
                    <input type="text" ref="fullname" id="inputFirstname" className="form-control" placeholder="Full Name" required autoFocus />
                    <input type="email" ref="etext" id="inputEmail" className="form-control" placeholder="Email" required autoFocus />
                    <input type="file" className="form-control" ref={(ref) => this.fileUpload = ref} id="file" required autoFocus />
                    <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <input type="password" ref="cpassword" id="inputCPassword" className="form-control" placeholder="Confirm Password" required />
                    <input className="btn btn-block btn-signin" type="submit" value="Sign Up" />
                </form>
            </div>
        );
    }
}

export default SignUpForm;