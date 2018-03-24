import React, { Component } from 'react';
import fire from './fire';

class ChatHome extends Component {

  messageItems(){
    // console.log('tt:='+this.props.messages[0].photoURL);
    // var ul_style = {
    //   listStyleType: 'none',
    //   padding: '2rem'
    // }

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
        <p style={msgstyle}>{item.text}</p>
      </li>
      
    );
    return <div className="chat-inner-wrapper"><ul>{listItems}</ul></div>;
  }

  render() {
    return (
      <div className="ChatHome">  
      <div class="row no-gutters">
                <div class="col-md-9">
      <div className="chat-title">
                    <h5>{this.props.receiver} <i className="fas active-badge"></i></h5>
                    <small>{this.props.email}</small>
                  </div> 
                  </div>
                  <div className="col-md-3 ">
                  <div className="call-btn audio-call float-right">
                      <svg className="svg-inline--fa fa-phone fa-w-16" aria-hidden="true" data-prefix="fa" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M493.397 24.615l-104-23.997c-11.314-2.611-22.879 3.252-27.456 13.931l-48 111.997a24 24 0 0 0 6.862 28.029l60.617 49.596c-35.973 76.675-98.938 140.508-177.249 177.248l-49.596-60.616a24 24 0 0 0-28.029-6.862l-111.997 48C3.873 366.516-1.994 378.08.618 389.397l23.997 104C27.109 504.204 36.748 512 48 512c256.087 0 464-207.532 464-464 0-11.176-7.714-20.873-18.603-23.385z"></path></svg>
                    </div>
                  </div>
                  </div>   
          {this.messageItems()}
     
      </div>
    );
  }
}

export default ChatHome;
