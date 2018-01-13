import React, { Component } from 'react';
import './Voice.css';

// import './lib/p5.js';
// import './lib/p5.dom.js';
// import './lib/p5.sound.js';
// import './lib/p5.speech.js';

export default function Voice (p) {
  let rotation = 0;
  let ganon;

  p.setup = function () {
    p.noCanvas();
    // ganon = new p.Speech();
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation){
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p.draw = function () {
    p.background(100);
    p.noStroke();
    p.push();
    p.rotateY(rotation);
    p.box(100);
    p.pop();
  };
};
