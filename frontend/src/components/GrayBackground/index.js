import React from 'react'

import {
  GrayBackgroundAbs
} from './styles';

export default function GrayBackground(props) {
  const preventionHandler = e => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <>
      <GrayBackgroundAbs onClick={props.closeFunction}>
          <div onClick={preventionHandler}>
            {props.children}
          </div>
      </GrayBackgroundAbs>
    </>
  )
}
