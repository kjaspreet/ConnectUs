import React, { Component } from 'react';
import fire from './fire';

class FileListing extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            file_url: '',
            url_visible: false
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

  fileItems(){
    const listItems = this.props.files.map((item) =>
      <li className="Files" key={"item-" + item} onClick={() => this.onItemClick(this, item)}>
         <h3><a href="javascript:void(0)" >{item}</a></h3>
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
