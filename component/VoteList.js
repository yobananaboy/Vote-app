import React from 'react';
import Vote from './Vote';

function VoteList(props) {
  function displayVotes(vote) {
    var count = -1;
    var votes = vote.map((vote, index) => {
        var show = "";
        if (props.clicked === index) show = "show";
        if(!vote.hidden) {
          count += 1;
         return <Vote key={index} id={index} userId={props.id} count={count} facebookUser={props.facebookUser} user={props.user} vote={vote} show={show} onClick={props.onClick} onChange={props.onChange} onSubmit={props.onSubmit} addVoteItem={props.addVoteItem} updateVoteItem={props.updateVoteItem} newItem={props.newItem} pollToDelete={props.pollToDelete} />; 
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