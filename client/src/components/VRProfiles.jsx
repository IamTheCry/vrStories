import aframe from 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';
import Profile from './VRProfile.jsx';


const VRProfiles = props => {
  let n = props.friends.length;
  console.log('n',n);
  let start = (n-1) * Math.PI/12;
  console.log('start', start);
  let theta = (Math.PI - start)/2;
  console.log('theta', theta);
  let x, z, yRotation;
  let radius = 10;
  return (
    <Entity>
      {
        props.friends.map((friend, i) => {
          x = -Math.cos(theta)*radius;
          console.log('x', x);
          z = -Math.sin(theta)*radius;
          console.log('z', z);
          yRotation = ((Math.PI/2) - theta)*180/Math.PI;
          console.log('yRotation', yRotation);
          theta += (Math.PI/12);
          return (
            <Profile
              i={i}
              x={x}
              z={z}
              yRotation={yRotation}
              radius={radius}
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
