import React from 'react';
import './Rating.css';
import starFull from './starFull.svg';
import starHalf from './starHalf.svg';
import starEmpty from './starEmpty.svg';

const Rating = (props) => (
  <div className="rating">
    <span> {props.stars} </span>
    {(Array(Math.floor(props.stars)).fill(0)).map( (e, i) => <img key={i} src={starFull} alt=""/>)}
    {
      props.stars > Math.floor(props.stars) ?
      <img src={starHalf} alt=""  /> : ''
    }
    {(Array(5-Math.ceil(props.stars)).fill(0)).map( (e, i) => <img key={i} src={starEmpty} alt=""/>)}
  </div>
);

export default Rating;
