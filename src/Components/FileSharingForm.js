import React, { Component } from 'react';
import fire from './fire';

class FileSharingForm extends Component {
    constructor() {
        super();
        this.state = {
            newfilelist: {}
        }
    }

    handleSubmit(e) {
        // var fullPath = this.refs.file.value;
        var file = this.fileUpload.files[0];
        var filename = this.fileUpload.files[0].name;
        var file_ext = this.fileUpload.files[0].name.split('.')[1];
        //read data
        // var reader = new FileReader();
        // reader.addEventListener('load', this.readFile);
        // reader.readAsText(new Blob([this.fileUpload.files[0]], { type: "plain/text" }));

        // //upload
        var storage = fire.storage();
        var storageRef = storage.ref();
        var blob;

        if (file_ext === 'txt') {
             blob = new Blob([file], { type: "plain/text" });
        }
        else if (file_ext === 'jpg') {
            blob = new Blob([file], { type: "image/jpg" });
        }
        else if (file_ext === 'png') {
            blob = new Blob([file], { type: "image/png" });
        }
        else if (file_ext === 'pdf') {
            blob = new Blob([file], { type: "application/pdf" });
        }
        else {
            blob = new Blob([file]);
        }

        storageRef.child('files/' + filename).put(blob).then((snapshot) => {

            // added this part which as grabbed the download url from the pushed snapshot
            this.image = snapshot.downloadURL;
            // console.log('DOWNLOAD URL IS ' + this.image);
        });


        this.setState({
            newfilelist: {
                file_name: filename
            }
        }, function () {
            let found_flag = 0;
            let fileRef = fire.database().ref('files');
            fileRef.on('child_added', snapshot => {
                /* Update React state when message is added at Firebase Database */;
                if(snapshot.val().file_name === filename)
                {
                    console.log('file found');
                    found_flag = 1;
                }                
            });
            // console.log(this.state);
            if(!found_flag)
            {
                fire.database().ref('files').push(this.state.newfilelist);
                this.props.addFile(this.state.newfilelist);
            }
            
        });
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="file-sh-btns">
                    <input type="file" ref={(ref) => this.fileUpload = ref} id="file" />
                    <input type="submit" value="Upload" />
                    <br />
                </div>
            </form>
        );
    }
}

export default FileSharingForm;
