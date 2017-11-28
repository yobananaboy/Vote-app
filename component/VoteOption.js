import React, { Component } from 'react';

function VoteOption(props) {
  return(
    <option value={props.vote.item} id={props.index}>{props.vote.item}</option>
  );
}

export default VoteOption;