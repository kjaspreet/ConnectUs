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
    <a href="javascript:void(0)" onClick={() => this.onItemClick(this, item)}>{item}</a>&nbsp;&nbsp;&nbsp;&nbsp;<button className="trash-btn" onClick={() => this.onDeleteFile(this, item)}><i className="fa fa-trash"></i></button>
      </li>
    );
    return <ul className="filess-list">{listItems}</ul>;
  }

  render() {
    const file = (this.state.url_visible ? this.state.file_url : null);
    return (
      <div className="FileList">  
          <h6><b>Click on File Name to get Download Link</b></h6>    
          {this.fileItems()}
          <h6>Download Link</h6><a target="_blank" href={this.state.file_url}>{file}</a><br/>
      </div>
    );
  }
}

export default FileListing;
