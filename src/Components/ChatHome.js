import React, { Component } from 'react';
import fire from './fire';
import uuid from 'uuid';

import Try from './Try';

class ChatHome extends Component {

  constructor() {
    super();
    this.state = {
      callingmessage: {},
      visible: false
    }
  }

  messageItems() {
    var msgstyle = {
      background: "#555",
      color: "#fff",
      borderRadius: "4px",
      padding: "9px 17px 11px",
      display: "inline-block"
    }

    const listItems = this.props.messages.map((item) =>
      <li className={item.cl_name} key={"item-" + item.id}>
        <img className="user_img" src={item.photourl} />&nbsp;&nbsp;&nbsp;
        <p style={msgstyle}>{item.text}</p>
      </li>

    );
    return <div className="chat-inner-wrapper"><ul>{listItems}</ul></div>;
  }

  makeCall(e) {
    console.log('make call');
    this.setState({visible:true});
    this.setState({
      callingmessage: {
        id: uuid.v4(),
        // text: 'Attend calling request at:  https://voicecallapi.herokuapp.com  by sharing ChatRoom name',
        text: 'Video call is requested. Please click on Calling Button.',
        sender: this.props.current_user,
        receiver: this.props.receiver,
        photourl: this.props.sender_pic
      }
    }, function () {
      // console.log(this.state.newmessage.pic);
      fire.database().ref('messages').push(this.state.callingmessage);
      this.props.addMessage(this.state.callingmessage);
    });
  }

  handleCall(call)
  {
    this.setState({visible: false});
    this.setState({
      callingmessage: {
        id: uuid.v4(),
        // text: 'Attend calling request at:  https://voicecallapi.herokuapp.com  by sharing ChatRoom name',
        text: 'Video call Ended.',
        sender: this.props.current_user,
        receiver: this.props.receiver,
        photourl: this.props.sender_pic
      }
    }, function () {
      // console.log(this.state.newmessage.pic);
      fire.database().ref('messages').push(this.state.callingmessage);
      this.props.addMessage(this.state.callingmessage);
    });
  }

  render() {
    const call = (this.state.visible ? <Try call={this.handleCall.bind(this)}  /> : null);
    const show_msg = (!this.state.visible? this.messageItems(): null);
    // if(this.state.visible)
    // {
    //   return(<Try call={this.handleCall.bind(this)} />);
    // }
    // else
    // {
    return (
      <div className="ChatHome">
        <div className="row no-gutters">
          <div className="col-md-9">
            <div className="chat-title">
              <h5>{this.props.receiver} <i className="fas active-badge"></i></h5>
              <small>{this.props.email}</small>
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="call-btn audio-call float-right" onClick={() => this.makeCall(this)}>
              {/* {/* <a href="https://voicecallapi.herokuapp.com/" target="_blank"> */}
              <svg className="svg-inline--fa fa-phone fa-w-16" aria-hidden="true" data-prefix="fa" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M493.397 24.615l-104-23.997c-11.314-2.611-22.879 3.252-27.456 13.931l-48 111.997a24 24 0 0 0 6.862 28.029l60.617 49.596c-35.973 76.675-98.938 140.508-177.249 177.248l-49.596-60.616a24 24 0 0 0-28.029-6.862l-111.997 48C3.873 366.516-1.994 378.08.618 389.397l23.997 104C27.109 504.204 36.748 512 48 512c256.087 0 464-207.532 464-464 0-11.176-7.714-20.873-18.603-23.385z"></path></svg>
              {/* </a> */}
            </div>
          </div>
        </div>
        {show_msg}
        {call}
      </div>
    );
  }
  // }
}

export default ChatHome;
