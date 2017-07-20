import aframe from 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';
import Profile from './VRProfile.jsx';


const VRProfiles = props => {
  let ringLength = props.friends.length;
  console.log('numfriends%*^%&%&*%*&^%*&%^*&%*&%', ringLength);
  let x = -7.1;
  let z = -10;
  return (
    <Entity>
      {
        props.friends.map((friend, i) => {
          x += 2.9;
          if (z > -10) {
            z -= 1;
          } else { z += 1; }

          return (
            <Profile
              i={i}
              x={x}
              z={z}
              key={i}
              friend={friend}
              currentStory={props.currentStory}
              onFriendClick={props.onFriendClick}
            />
          );
        })
      } 
    </Entity>
  );
};

export default VRProfiles;
