import React, { Component } from 'react';
import fire from './fire';
import FileSharingForm from './FileSharingForm';
import FileListing from './FileListing';

class FileSharing extends Component {

    constructor() {
        super();
        this.state = {
            file_list: []
        }

    }
    
    //lifecycle method
    componentWillMount() {
        let file_temp = [];
        //files
        let fileRef = fire.database().ref('files');
        fileRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */;
            file_temp.push(snapshot.val().file_name);
            this.setState({ file_list: file_temp });
        });
    }

    handleaddFile(file) {
        let files = this.state.file_list;
        this.setState({ file_list: files });
      }

    render() {
        var file_style = {
            padding: '1rem'
        }

        return (
            <div style={file_style} className="FileSharingForm">
               <FileSharingForm addFile={this.handleaddFile.bind(this)}/><br/><br/>
                <FileListing files={this.state.file_list} />
            </div>
        );
    }
}

export default FileSharing;