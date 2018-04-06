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
        e.setState({url_visible: false, file_url: ''})
        var storage = fire.storage();
        var storageRef = storage.ref();
        storageRef.child('files/'+item).getDownloadURL().then(function(url) {
            e.setState({url_visible: true, file_url: url});
        });
      }

      onDeleteFile(e,item)
    {
        fire.database().ref('files').orderByChild('file_name').equalTo(item).on('child_added', snapshot => {
            snapshot.ref.remove();
        });       
        this.props.deleteFile(item);
    }

  fileItems(){
    const listItems = this.props.files.map((item) =>
      <li className="Files" key={item} >
         <h5><a href="javascript:void(0)" onClick={() => this.onItemClick(this, item)}>{item}</a>&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => this.onDeleteFile(this, item)}>X</button></h5>
      </li>
    );
    return <ul>{listItems}</ul>;
  }

  render() {
    return (
      <div className="FileList">  
          <h5>Click on File Name to get Download Link</h5>    
          {this.fileItems()}
          <h5>Download Link</h5><br/>
      </div>
    );
  }
}

export default FileListing;
