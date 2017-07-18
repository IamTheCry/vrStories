import React from 'react';
import axios from 'axios';
import Upload from './Upload.jsx';
import Dropzone from 'react-dropzone';
import UploadButton from './UploadButton.jsx';
import FriendList from './FriendList.jsx';
import VRFrame from './VRFrame.jsx';
import MediaFrame from './MediaFrame.jsx';
import { Menu } from 'semantic-ui-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentFriend: {},
      friends:
      [
        {
          user: {
            id: 1,
            first: 'David',
            last: 'Oh',
            display: 'David Oh'
          },
          videos: [{ type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329882921', profile_id: 1 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329895280', profile_id: 1 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329900922', profile_id: 1 }]
        }, {
          user: {
            id: 2,
            first: 'Alex',
            last: 'S',
            display: 'Alex S.'
          },
          videos: [{ type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329906346', profile_id: 2 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329911740', profile_id: 2 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329915531', profile_id: 2 }]
        }, {
          user: {
            id: 3,
            first: 'Anna',
            last: 'Anna',
            display: 'Anna Anna'
          },
          videos: [{ type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329882921', profile_id: 3 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329895280', profile_id: 3 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329900922', profile_id: 3 }]
        },
      ],

      
      videos: [],
      videoIndex: 0,
      currentVideo: {},

      lastClickedFriendIndex: 0,
      friendIndex: 0,
      autoplay: true,
      

      accept: '',
      files: [],
      dropzoneActive: false
    };
    this.fetch = this.fetch.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
    this.playNextOrStop = this.playNextOrStop.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    axios.get('/fetch')
      .then(response => {
        this.setState({
          user: response.data.user
        });
      });
  }

  onFriendClick(friendData, friendIndex) {
    console.log('onFriendClicked, index: ', friendData.user.first, ', ', friendIndex);

    this.setState({
      friendIndex,
      videoIndex: 0,
      videos: friendData.videos,
      lastClickedFriendIndex: friendIndex,
      currentVideo: friendData.videos[0]
    });
  }

  // playFriendVideos() {

  // }

  playNextOrStop() {
    const { friends, videoIndex, friendIndex, videos, autoplay, currentVideo, lastClickedFriendIndex } = this.state;
    console.log('last clicked', friendIndex, lastClickedFriendIndex);

    if (videoIndex < videos.length - 1) {
      var nextIndex = videoIndex + 1;
      this.setState({
        currentVideo: videos[nextIndex],
        videoIndex: nextIndex,
      });

    } else if (autoplay && friendIndex + 1 !== lastClickedFriendIndex) {
      if (friendIndex < friends.length - 1) {
        this.setState({
          videos: friends[friendIndex + 1].videos,
          videoIndex: 0,
          currentVideo: friends[friendIndex + 1].videos[0],
          friendIndex: friendIndex + 1
        });
      } else {
        console.log('looks like you need to loop!');
        this.setState({
          videos: friends[0].videos,
          videoIndex: 0,
          currentVideo: friends[0].videos[0],
          friendIndex: 0
        });
      }
    } 
  }

  // Functions below are used for react file dropzone
  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    console.log('acceptedFiles:', files);
    let formData = new FormData();
    formData.append('file', files[0]);
    formData.append('userId', this.state.user.id);
    axios.post('/api/upload', formData);
    this.setState({
      files,
      dropzoneActive: false
    });
  }

  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value
    });
  }

  render() {
    const { currentVideo, videoIndex, user, friends, accept, files, dropzoneActive } = this.state;

    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };

    return (
      <Dropzone
        disableClick
        style={{}}
        accept={accept}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }

        <div>
          Welcome Home {user.first}!
          <UploadButton />
          {/*<Upload user={user} />*/}
          <FriendList friends={friends} onFriendClick={this.onFriendClick} currentVideo={currentVideo} videoIndex={videoIndex}/>
          <MediaFrame currentVideo={currentVideo} playNextOrStop={this.playNextOrStop} />
        </div>
      </Dropzone>
    );
  }
}

export default Home;
