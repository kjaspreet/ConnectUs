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
        // console.log('check img_url:='+fire.auth().currentUser.photoURL+'user:='+fire.auth().currentUser.displayName);
        this.setState({
            newmessage: {
                id: uuid.v4(),
                text: this.refs.text.value,
                sender: this.props.current_user,
                receiver: this.props.receiver,
                photourl: this.props.sender_pic
            }
        }, function () {
            // console.log(this.state.newmessage.pic);
            fire.database().ref('messages').push( this.state.newmessage );
            this.props.addMessage(this.state.newmessage);
            this.refs.text.value = '';
        });
        e.preventDefault();
    }
    render() {
        var formstyle = {
            padding:"2em"
        }
        return (
            <div className="ChatForm">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div style={formstyle}>
                        <input type="text" ref="text" />
                        <input type="submit" value="Send" />
                        
                    </div>

                </form>
            </div>
        );
    }
}

export default ChatForm;
