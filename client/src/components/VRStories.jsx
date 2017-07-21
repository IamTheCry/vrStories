import 'aframe';
import 'aframe-mouse-cursor-component';
import { Entity, Scene, Options } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import VRCursor from './VRCursor.jsx';
import VRProfiles from './VRProfiles.jsx';
import mockData from './mockData.js';

class VRStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: props.user,
      // friends: props.friends,
      autoPlayStart: props.autoPlayStart,
      autoPlayNext: props.autoPlayNext,

      currentStory: {
        id: null,
        index: null,
        type: 'video/mp4',
        src: 'https://s3-us-west-1.amazonaws.com/vrstories/360+degree+Video-+Pugs+Chompin+down.mp4'
      },

      currentStories: [],
      lastClickedFriendIndex: null,
      // USE FOR MOCK DATA
      friends: mockData.friends,
      user: mockData.user,
    };
    this.playNext = this.playNext.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
  }

  componentWillMount() {
    this.setId(this.state.user);
    this.setId(this.state.friends);
    if (this.state.autoPlayStart) {
      this.onFriendClick(this.state.friends[0], 0);
    }
  }

  // SINCE USER OF THIS MODULE WILL ONLY PROVIDE LIST OF FRIENDS AND NOT ANY KEYS
  // WE BUILT THIS HELPER FUNCTION TO IDENTIFY EVERY VIDEO TO EACH FRIEND
  setId(data) {
    if (Array.isArray(data)) {
      data.forEach((user, i) => {
        user.profile.id = i;
        user.stories.forEach((story, j) => {
          story.id = i;
          story.index = j;
          story.playing = false;
        });
      });
    } else {
      data.profile.id = -1;
      data.stories.forEach((story, j) => {
        story.id = -1;
        story.index = j;
      });
    }
  }

  // THIS FUNCTION WILL UPDATE THE STATE OF THE MOST RECENTLY CLICKED FRIEND
  //
  // THIS IS ALSO NECESSARY TO KNOW WHICH FRIEND WAS LAST CLICKED TO KNOW WHEN TO END STORIES LOOP
  // AND TO MAKE THIS FRIEND THE CURRENT STORIES SHOWING
  onFriendClick(friendData) {
    if (friendData.profile.id === this.state.currentStory.id) {
      this.playNextFriendStory();
      return;
    }

    this.setState({
      lastClickedFriendIndex: friendData.profile.id,
      currentStories: friendData.stories,
      currentStory: friendData.stories[0]
    });
  }

  // THIS FUNCTION WILL UPDATE currentStory TO BE THE NEXT STORY
  playNextFriendStory() {
    const { currentStories, currentStory } = this.state;
    let nextStoryIndex = currentStory.index + 1;
    
    if (nextStoryIndex < currentStories.length) {
      this.setState({
        currentStory: currentStories[nextStoryIndex]
      });
    }
  }

  // THIS FUNCTION WILL PLAY THE NEXT STORY OF currentStories AND IF AUTOPLAY IS ON, THE NEXT FRIEND'S STORIES WILL BE PLAYED
  playNext() {
    const { friends, autoPlayNext, currentStories, currentStory, lastClickedFriendIndex } = this.state;
    let nextStoryIndex = currentStory.index + 1;
    let nextFriendIndex = currentStory.id + 1;

    this.playNextFriendStory();

    if (autoPlayNext && nextStoryIndex === currentStories.length) {
      let nextstate = (i) => {
        if (lastClickedFriendIndex === i) {
          return;
        }

        this.setState({ 
          currentStories: friends[i].stories,
          currentStory: friends[i].stories[0]
        });
      };

      if (nextFriendIndex < friends.length) {
        nextstate(nextFriendIndex);
      } else {
        nextstate(0);
      }
    }
  }
  

  render () {
    return (
      <Scene>
        <VRProfiles
          currentStory={this.state.currentStory}
          friends={this.state.friends}
          onFriendClick={this.onFriendClick}
        />

        <a-assets>
          <video autoPlay={true} id="media" src={this.state.currentStory.src} crossOrigin="anonymous" onEnded={() => this.playNext()}/>
        </a-assets>
        <a-videosphere src={'#media'} rotation="0 -90 0"></a-videosphere>
        
        <VRCursor />
      </Scene>
    );
  }
}

export default VRStories;
