import 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';

const VRProfile = props => {
  let picRadius = 1;
  let playing = '';
  let spacing = 0.2;
  if (props.currentStory.story.id === props.friend.profile.id) {
    playing = ' I AM PLAYING!!!';
    picRadius = 1.2;
  }

  return (
    <Entity position={{x: props.x + spacing, y: -2, z: props.z}} rotation="-15 0 0">
      <Entity id='cylinder'
        geometry={{primitive: 'cylinder', radius: picRadius, height: 0.15}}
        rotation= "0 90 90"
        material={{src: props.friend.profile.img_url}}
        animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
        animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
        events={{click: (() => props.onFriendClick(props.friend, props.i))}}>
      </Entity>
      <Entity text={{value: props.friend.profile.first + playing, align: 'center', color: 'white', width: 6}} position={{y: -1.8}}/>
    </Entity>
  );
};

export default VRProfile;
