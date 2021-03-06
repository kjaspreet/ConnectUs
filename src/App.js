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
      call_visible: false,
      file_visible: false,
      users: [],
      users_pics: [],
      current_user: '',
      sender: '',
      receiver: '',
      sender_pic: '',
      receiver_email: '',
      callLink: ''
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
        //set default pic
        if (snapshot.val().photourl === '')
          this.setState({ current_user: snapshot.val().name, sender_pic: 'https://firebasestorage.googleapis.com/v0/b/capstone-f88ec.appspot.com/o/users%2Fdefault.png?alt=media&token=10f37bf7-a10e-42db-997a-0cce6dde0dd4' });
        else
          this.setState({ current_user: snapshot.val().name, sender_pic: snapshot.val().photourl });
      }
      else {
        user_temp.push(snapshot.val().name);
        //set default pic
        if (snapshot.val().photourl === '')
          pics_temp.push('https://firebasestorage.googleapis.com/v0/b/capstone-f88ec.appspot.com/o/users%2Fdefault.png?alt=media&token=10f37bf7-a10e-42db-997a-0cce6dde0dd4');
        else
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
    // console.log('msg state:=' + this.state.messages);
    let messages = this.state.messages;
    //just for first message
    if (this.state.messages.length === 0)
      messages.push(message);
    this.setState({ messages: messages });
    // console.log('msg table:=' + messages[0].photourl);
  }

  handleshowfile()
  {
    this.setState({ file_visible: true, visible: false, contact_visible: false });
    // console.log("file back clicked");
  }

  handleCall(call)
  {
    // console.log(call);
    this.setState({call_visible: call});
  }

  onItemClick(e, item) {
    // console.log('test:='+item);
    // console.log('dekho:='+pic);
    this.setState({
      file_visible: false,
      visible: true, // set it to be visible
      receiver: item
    });
    this.Message_list(item);
    this.GetReceiverEmail(item);
  }

  GetReceiverEmail(item) {
    let messagesRef = fire.database().ref('users');
    messagesRef.on('child_added', snapshot => {
      if (snapshot.val().name === item) {
        this.setState({ receiver_email: snapshot.val().email });
      }
    });
  }

  //display messages.
  Message_list(selected_receiver) {
    // console.log('here sender: ' + this.state.current_user + ' here receiver: ' + selected_receiver);
    let temp = [];
    let c_name = '';
    let messagesRef = fire.database().ref('messages');
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */;
      if ((snapshot.val().sender === this.state.current_user && snapshot.val().receiver === selected_receiver) ||
        (snapshot.val().sender === selected_receiver && snapshot.val().receiver === this.state.current_user)) {

        //set classname
        if (snapshot.val().sender === this.state.current_user) {
          // console.log("sender");
          c_name = "sender";
        }
        else {
          // console.log("receiver");
          c_name = "receiver";
        }
        if (snapshot.val().text === 'Video call is requested. Please click on Calling Button.' && snapshot.val().sender === this.state.current_user) {
          // console.log('got it');
          //Don't update
        }
        else {

          temp.push({ id: snapshot.val().id, text: snapshot.val().text, sender: snapshot.val().sender, receiver: snapshot.val().receiver, photourl: snapshot.val().photourl, cl_name: c_name });

          this.setState({ messages: temp });

        }
      }
      else {
        this.setState({ messages: temp });
      }
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
    // console.log('user table:='+this.state.users_pics[0]);
    // let pic_index = 0;
    const listItems = this.state.users.map((item, i) =>
      <li key={"item-" + item} onClick={() => this.onItemClick(this, item)}>
        <div className="contact-wrap">
          <div className="row no-gutters">
            <div className="col-md-2 pro-img-res">
              <img className="user_img" src={this.state.users_pics[i]} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className="col-md-10">
              <div className="msg-wrapper">
                <p className="contact-name" style={mystyle}><a style={myastyle} href="javascript:void(0)">{item}</a></p>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
    return <ul className="UserList">{listItems}</ul>;

  }

  // onFileClick() {
  //   this.setState({ file_visible: true, visible: false, contact_visible: false });
  //   // console.log("clicked");
  // }

  onSignOut() {
    // console.log('signout');
    fire.auth().signOut();
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('flag');
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

    var resStyle = {
      padding:'0px 0px!important'
    }

    var headingstyle = {
      fontWeight: "bold"
    }

    // console.log('user-details:=' + fire.auth().currentUser.photoURL);

    //code

    const chatmsg = (this.state.visible ? <ChatHome email={this.state.receiver_email} receiver={this.state.receiver} messages={this.state.messages} sender_pic={this.state.sender_pic} current_user={this.state.current_user} call={this.handleCall.bind(this)} visible={this.state.call_visible} addMessage={this.handleaddMessage.bind(this)} /> : null);
    const chatfrm = (this.state.visible ? <ChatForm sender_pic={this.state.sender_pic} current_user={this.state.current_user} receiver={this.state.receiver} addMessage={this.handleaddMessage.bind(this)} addFileVisibility={this.handleshowfile.bind(this)} /> : null);
    const file = (this.state.file_visible ? <FileSharing /> : null);
    const bckgrd = (!this.state.file_visible && !this.state.visible ? <Background /> : null);
    return (
      <div style={Appstyle} className="App">
        <div className="navbar  navbar-light bg-light navbar-custom">
          <a className="navbar-brand logo" href="javascript:void(0)"><img src={logo} alt="logo" className="" /></a>
          

          <ul className="navbar-nav align-self-end nav-ul-custom">
              {/* <li className="nav-item">
                <a className="nav-link" href="javascript:void(0)"><i className="fas fa-search"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0)"><i className="fas fa-cog"></i></a>
              </li> */}
              <li className="nav-item dropdown nav_link_res">
                <a style={resStyle} className="nav-link dropdown-toggle " href="javascript:void(0)" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={this.state.sender_pic} className="user_img" />&nbsp;&nbsp;<strong className="user_name_res">{this.state.current_user}</strong>
                </a>
                <div className="dropdown-menu sign-out-wrap" aria-labelledby="navbarDropdown">
                  {/* <a className="dropdown-item" href="#">My Account</a> */}
                  {/* <div className="dropdown-divider"></div> */}
                  <a className="dropdown-item" href="" onClick={() => this.onSignOut(this)}>Sign Out</a>
                </div>
              </li>
            </ul>
        </div>
        {/* Main Body Starts */}
        <div className="MainBody row no-gutters">
          {/* User Contact List Part */}
          <div className="User-List col-sm-2 col-md-4">
            <div className="contact-list">
              <ul>
                {/* <h6 style={headingstyle} onClick={() => this.onFileClick(this)}><a href="javascript:void(0)">File Share</a></h6> */}
                <h6 style={headingstyle} onClick={() => this.onContactClick(this)}><a href="javascript:void(0)">Contacts</a></h6>
                {this.User_list()} 
              </ul>
            </div>
          </div>
          {/* Chat Area Part */}
          <div className="col-sm-10 col-md-8 right-main-res">
            {/* Render Chat Form and Messages on Click */}
            {/* {chatpg} */}
            {bckgrd}
            {/* <div className="chat-wrapper"> */}
              {chatmsg}
              {chatfrm}
              {file}
            {/* </div> */}

          </div>
        </div>
      </div>
    );
  }
}

export default App;
