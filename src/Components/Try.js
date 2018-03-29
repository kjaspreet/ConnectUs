import React, { Component } from 'react';

class Try extends Component {

    render() {

        var myvideostyle = {
            width:'800px',
            height:'640px'
        }
        return (
            <div className="TryClass">
            <iframe src="https://tokbox.com/embed/embed/ot-embed.js?embedId=3406d6a1-9727-4dd7-84d3-4792bd8b6b62&amp;room=DEFAULT_ROOM&amp;iframe=true" style={myvideostyle} allow="microphone; camera" ></iframe> 
            </div>
        );
    }
}

export default Try;