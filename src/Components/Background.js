import React, { Component } from 'react';


class Background extends Component {

    render() {
        return (

            // <div className="col-12 col-sm-12 col-md-12">
                <div className="home-wrapper">
                    <div className="top-banner text-center">
                        <h3><b>Welcome to ConnectUs!</b></h3>
                    </div>
                    <p className="text-center app-descrip">Select someone from your contacts to start a new <br />chat and explore more</p>
                    <div className="row no-gutters">
                        <div className="col-md-6 offset-md-3 text-center">
                            <a href="javascript:void(0)" className="start-button">Start a new chat</a>
                        </div>
                    </div>
                </div>
            // </div>
        );
    }
}

export default Background;