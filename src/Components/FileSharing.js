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
        console.log('check state:='+this.state.file_list.file_name);
        let files = this.state.file_list;
        this.setState({ file_list: files });
      }

    // Remove deleted file from the state
    handledeleteFile(id)
    {
        this.setState({
            file_list: this.state.file_list.filter(el => el != id )
        });
    }

    render() {
        var file_style = {
            padding: '1rem'
        }

        return (
            <div style={file_style} className="FileSharingForm">
               <FileSharingForm addFile={this.handleaddFile.bind(this)}/><br/><br/>
                <FileListing files={this.state.file_list} deleteFile={this.handledeleteFile.bind(this)}/>
            </div>
        );
    }
}

export default FileSharing;