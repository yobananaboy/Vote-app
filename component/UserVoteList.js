import React from 'react';
import UserVote from './UserVote';

function VoteList(props) {
  function displayVotes(vote) {
    var count = -1;
    var votes = vote.map((vote, index) => {
      var show = "";
      if (props.clicked === index) show = "show";
      if(!vote.hidden) {
        if(vote.createdBy === props.id) {
          count += 1;
          return <UserVote key={index} id={index} vote={vote} userId={props.id} count={count} show={show} onClick={props.onClick} user={props.user} onChange={props.onChange} pollToDelete={props.pollToDelete} />; 
        }
      }
    });
    return votes;
  }
  
  var voteList = displayVotes(props.data);
    return (
        <div>
          {voteList}
        </div>
    );
}

export default VoteList;