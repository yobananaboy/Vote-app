import React, { Component } from 'react';
import PieChart from './PieChart';
import VoteItem from './VoteItem';
import getColor from './getColor';
import VoteOption from './VoteOption';
import userVoted from './userVoted';
import NewItemInput from './NewItemInput';

class Vote extends Component {
    constructor() {
      super();
      this.state = {
        userVoted: false
      };
    }
    
    render() {
    var v = {
      voteItems: [],
      voteOptions: []
    };
    this.props.vote.votes.map((vote, index) => {
      v.voteItems.push(<VoteItem vote={vote} key={`voteItems-${index}`} color={getColor(index)} index={index} />);
      v.voteOptions.push(<VoteOption vote={vote} key={`voteOtions-${index}`} />);
    });
    var newItemInput = "";
    var deleteButton = "";
    if(this.props.vote.votes.length <= 9) {
      newItemInput = <NewItemInput addVoteItem={this.props.addVoteItem} updateVoteItem={this.props.updateVoteItem} newItem={this.props.newItem} id={this.props.id} />;
    }
    if(this.props.vote.createdBy === this.props.userId) {
      deleteButton = <button className="btn btn-danger delete-btn" id={this.props.id} onClick={this.props.pollToDelete} data-toggle="modal" data-target="#delete-poll-modal">Delete</button>;
    }
    var tweetUrl = `https://twitter.com/intent/tweet?text=Have your say: ${this.props.vote.category}&url=https://vote-app-mattkeegan20.c9users.io/poll/${this.props.id}&hashtags=mattsvoteapp`;
    return (
      <div className="vote">
        <div className="row">
          <div className="col-12 vote-header" style={{background: getColor(this.props.count % 10)}}>
            <h2 id={this.props.id} onClick={this.props.onClick} >{this.props.vote.category}</h2>
          </div>
        </div>
        <div className={`vote-info ${this.props.show} row justify-content-center`}>
          <div className='col-8 col-md-5 col-lg-6'>  
            <div className='row'>
              <div className='col-12'>
              <ul className="vote-items list-group">
                {v.voteItems}
              </ul>
              </div>
            </div>
            <form id={this.props.id} className="submit-vote"  style={{display: userVoted(this.props.user, this.props.userId, this.props.vote.voters) ? "block" : "none"}} onSubmit={this.props.onSubmit} >
              <div className="form-group row">
                <div className="col-12 col-md-10">
                  <select name={this.props.vote.category} id={this.props.id} className="form-control" value={this.props.vote.votes[this.props.vote.select].item} onChange={this.props.onChange} >
                    {v.voteOptions}
                  </select>
                </div>
                <div className="col-12 col-md-2">
                  <button type="submit" className="btn btn-primary">Vote</button>
                </div>
              </div>
            </form>
            <p className="vote-message" style={{display: userVoted(this.props.user, this.props.userId, this.props.vote.voters) ? "none" : "block"}}>You have already voted in this poll</p>
            {newItemInput}
            {deleteButton}
            <a href={tweetUrl} target="_blank"><button className="social-share btn btn-info"><i className="fa fa-twitter" aria-hidden="true"></i> Share this poll</button></a>
          </div>
          <div className="col-4 col-md-7 col-lg-6">
            <PieChart data={this.props.vote.votes} size={[300, 300]} />
          </div>
        </div>
    </div>
      );
  }
}

export default Vote;