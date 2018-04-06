import React, { Component } from 'react';

class Try extends Component {

    constructor() {
        super();
        this.state = {
          visible: false
        }
      }

    handleBackClick(e)
    {
        console.log("back clicked");
        this.setState({visible: false});
        this.props.call(this.state.visible);
    }

    render() {
        var myvideostyle = {
            width: '92%',
            height: '200px',
        }
        return (
            <div className="chat-inner-wrapper">

                {/* <iframe src="https://tokbox.com/embed/embed/ot-embed.js?embedId=3406d6a1-9727-4dd7-84d3-4792bd8b6b62&amp;room=DEFAULT_ROOM&amp;iframe=true" style={myvideostyle} allow="microphone; camera" ></iframe>  */}
                <iframe src="https://tokbox.com/embed/embed/ot-embed.js?embedId=a608bbf2-cb3c-4ebc-888e-f5bc3f7b1895&amp;room=DEFAULT_ROOM&amp;iframe=true" style={myvideostyle} allow="microphone; camera" ></iframe>
                <a className="BackFromCall" href="javascript:void(0)" onClick={() => this.handleBackClick(this)}>Back</a>
            </div>
        );
    }
}

export default Try;