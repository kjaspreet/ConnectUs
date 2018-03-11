import React, { Component } from 'react';
import uuid from 'uuid';
import fire from './fire';

class ChatForm extends Component {
    constructor() {
        super();
        this.state = {
            newmessage: {}
        }
    }

    handleSubmit(e) {
        this.setState({
            newmessage: {
                id: uuid.v4(),
                text: this.refs.text.value,
                sender: this.props.current_user,
                receiver: this.props.receiver
            }
        }, function () {
            // console.log(this.state);
            fire.database().ref('messages').push( this.state.newmessage );
            this.props.addMessage(this.state.newmessage);
            this.refs.text.value = '';
        });
        e.preventDefault();
    }
    render() {
        return (
            <div className="ChatForm">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <input type="text" ref="text" />
                        <input type="submit" value="Send" />
                        <br />
                    </div>

                </form>
            </div>
        );
    }
}

export default ChatForm;
