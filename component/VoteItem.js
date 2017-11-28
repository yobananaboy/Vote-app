import React from 'react';

function VoteItem(props) {
  return(
    <li className="list-group-item d-flex justify-content-between align-items-center">{props.vote.item}<span className="badge badge-pill" style={{background: props.color}}>{props.vote.count}</span></li>
  );
}

export default VoteItem;