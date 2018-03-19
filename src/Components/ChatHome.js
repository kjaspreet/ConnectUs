import React, { Component } from 'react';
import fire from './fire';

class ChatHome extends Component {

  messageItems(){
    // console.log('tt:='+this.props.messages[0].photoURL);
    var ul_style = {
      listStyleType: 'none',
      padding: '2rem'
    }

    var msgstyle = {
      background: "#555",
      color: "#fff",
      borderRadius: "4px",
      padding:"9px 17px 11px",
      display:"inline-block"
    }

    const listItems = this.props.messages.map((item) =>
      <li className="Message" key={"item-" + item.id}>
         <img className="user_img" src={item.photourl}/>&nbsp;&nbsp;&nbsp;
        <p style={msgstyle}><strong>{item.sender}</strong>-{item.text}</p>
      </li>
    );
    return <ul style={ul_style}>{listItems}</ul>;
  }

  render() {
    return (
      <div className="Chathome">
      
          {this.messageItems()}
     
      </div>
    );
  }
}

export default ChatHome;
