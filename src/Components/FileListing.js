import React, { Component } from 'react';
import fire from './fire';

class FileListing extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            file_url: '',
            url_visible: false,
            file_list: {}
        }
    }

    //download files onclick
    onItemClick(e, item) {
        console.log('file clicked:='+item);
        e.setState({url_visible: false, file_url: ''})
        var storage = fire.storage();
        var storageRef = storage.ref();
        storageRef.child('files/'+item).getDownloadURL().then(function(url) {
            console.log('FILE LISTING URL:= '+url);
            // alert("Copy this link to download file:-----\n "+url);
            e.setState({url_visible: true, file_url: url});
        });
      }

    onDeleteClick(e,item)
    {
        fire.database().ref('files').orderByChild('file_name').equalTo(item).on('child_added', snapshot => {
            // console.log('here:='+snapshot.ref);
            snapshot.ref.remove();
            this.GetDB();
        });       
    }

    GetDB()
    {
        let file_temp = [];
        //files
        let fileRef = fire.database().ref('files');
        fileRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */;
            file_temp.push(snapshot.val().file_name);
            this.setState({ file_list: file_temp });
        });
        this.props.addFile(this.state.file_list);
    }

  fileItems(){
    const listItems = this.props.files.map((item) =>
      <li className="Files" key={"item-" + item} >
         <h3><a href="javascript:void(0)" onClick={() => this.onItemClick(this, item)}>{item}</a><button onClick={() => this.onDeleteClick(this, item)}>X</button></h3>
      </li>
    );
    return <ul>{listItems}</ul>;
  }

  render() {
    const file = (this.state.url_visible ? <a href={this.state.file_url} target="_blank">{this.state.file_url}</a>: null);
    return (
      <div className="FileList">  
          <h3>Click on File Name to get Download Link</h3>    
          {this.fileItems()}
          <h3>Download Link</h3><br/>{file}    
      </div>
    );
  }
}

export default FileListing;
