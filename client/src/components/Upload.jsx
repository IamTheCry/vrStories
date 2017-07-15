import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class Upload extends React.Component {
  constructor(props) {
    super(props);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('acceptedFiles:', acceptedFiles);
    let formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('userId', this.props.user.id);
    axios.post('/api/upload', formData);
  }

  render() {

    const style = {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      border: '5px solid red'
    };

    return (
      <div className="dropzone">
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <p>Drop a file here</p>
        </Dropzone>
      </div>
    );
  }
}

export default Upload;
