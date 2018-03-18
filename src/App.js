import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import fire from './Components/fire';
import ChatHome from './Components/ChatHome';
import ChatForm from './Components/ChatForm';
import FileSharing from './Components/FileSharing';
import Background from './Components/Background';
import './Components/Login.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      visible: false,
      file_visible: false,
      users: [],
      users_pics: [],
      current_user: '',
      sender: '',
      receiver: ''
    }
  }

  //lifecycle method
  componentWillMount() {
    let user_temp = [];
    let pics_temp = [];
    //users
    let userRef = fire.database().ref('users');
    userRef.on('child_added', snapshot => {

      // console.log('curr_user:=' + this.props.user);
      /* Update React state when message is added at Firebase Database */;
      if (snapshot.val().email === this.props.user) {
        this.setState({ current_user: snapshot.val().name });
      }
      else {
        user_temp.push(snapshot.val().name);
        pics_temp.push(snapshot.val().photourl)
      }
      this.setState({ users: user_temp, users_pics: pics_temp });
    });
  }

  //used to get particular receiver and messages details for child component
  componentDidMount() {
    this.setState({ receiver: this.state.receiver });
  }

  handleaddMessage(message) {
    let messages = this.state.messages;
    this.setState({ messages: messages });
    // console.log('test:=' + message.receiver);
  }

  onItemClick(e, item) {
    console.log('test:='+item);
    this.setState({
      file_visible: false,
      visible: true, // set it to be visible
      receiver: item
    });
    this.Message_list(item);
  }

  //display messages.
  Message_list(selected_receiver) {
    // console.log('here sender: ' + this.state.current_user + ' here receiver: ' + selected_receiver);
    let temp = [];
    let messagesRef = fire.database().ref('messages');
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */;
      if ((snapshot.val().sender === this.state.current_user && snapshot.val().receiver === selected_receiver) ||
        (snapshot.val().sender === selected_receiver && snapshot.val().receiver === this.state.current_user)) {
        console.log('inside sender: ' + this.state.current_user + ' inside receiver: ' + selected_receiver);
        temp.push({ id: snapshot.val().id, text: snapshot.val().text, sender: snapshot.val().sender, receiver: snapshot.val().receiver });
        this.setState({ messages: temp });
      }
      else {
        this.setState({ messages: temp });
      }

      // console.log('main: '+temp);
    });
  }

  //display users.
  User_list() {
    var mystyle = {
      marginLeft: "10px",
      marginTop: "10px",
      fontSize: "14px"
    }

    var myastyle = {
      color: "black"
    }
    // console.log('current_user:='+this.state.current_user);
    // let pic_index = 0;
    const listItems = this.state.users.map((item, i) =>
      <li key={"item-" + item} onClick={() => this.onItemClick(this, item)}>
        <div className="row">
          <div className="col-md-2">
            <img className="user_img" src={this.state.users_pics[i]} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
          <div className="col-md-10">
            <p className="contact-name" style={mystyle}><a style={myastyle} href="javascript:void(0)">{item}</a></p>
          </div>
        </div>
      </li>
    );
    return <ul className="UserList">{listItems}</ul>;

  }

  onFileClick() {
    this.setState({ file_visible: true, visible: false, contact_visible: false });
    // console.log("clicked");
  }

  onContactClick() {
    this.setState({ file_visible: false, visible: false });
    // console.log("clicked");
  }

  render() {
    //inline css
    var Appstyle = {
      color: 'black'
    }

    var userlist_style = {
      padding: '1rem'
    }

    var headingstyle = {
      fontWeight: "bold"
    }

    // console.log('user-details:=' + fire.auth().currentUser.photoURL);

    //code

    const chatmsg = (this.state.visible ? <ChatHome messages={this.state.messages} /> : null);
    const chatfrm = (this.state.visible ? <ChatForm current_user={this.state.current_user} receiver={this.state.receiver} addMessage={this.handleaddMessage.bind(this)} /> : null);
    const file = (this.state.file_visible ? <FileSharing /> : null);
    const bckgrd = (!this.state.file_visible && !this.state.visible ? <Background /> : null);
    return (
      <div style={Appstyle} className="App">
        <div className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
          <a className="navbar-brand logo" href="javascript:void(0)"><img src={logo} alt="logo" className="" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav align-items-center nav-ul-custom">
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0)"><i className="fas fa-search"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0)"><i className="fas fa-cog"></i></a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  &nbsp;<strong>{this.state.current_user}</strong>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {/* <a className="dropdown-item" href="#">My Account</a> */}
                  {/* <div className="dropdown-divider"></div> */}
                  <a className="dropdown-item" href="">Sign Out</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="MainBody">
          <div style={userlist_style} className="User-List">
            <ul>
              <p style={headingstyle} onClick={() => this.onContactClick(this)}><a href="javascript:void(0)">Contacts</a></p>
              {this.User_list()}
              <p style={headingstyle} onClick={() => this.onFileClick(this)}><a href="javascript:void(0)">File Share</a></p>
            </ul>
          </div>
          <div className="App-intro">
            {/* Render Chat Form and Messages on Click */}
            {/* {chatpg} */}
            {bckgrd}

            {chatmsg}
            {chatfrm}
            {file}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
