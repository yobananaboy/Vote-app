import React, { Component } from 'react';
import VoteList from './VoteList';

class HomePage extends Component {
  render() {
    var button = null;
    if(this.props.facebookUser) {
      button = <button className="btn btn-primary" onClick={this.props.openModalPoll} data-toggle="modal" data-target="#new-poll-modal" id="new">Add new poll</button>;
    }
    return (
          <div className="row justify-content-center">
            <div className="col-12 col-md-11 col-lg-8 col-xl-6 vote-body">
              <p className="App-intro">
                Welcome to my voting app. View the polls below to case your vote and login to create your very own vote.
              </p>
              {button}
              <VoteList data={this.props.data} id={this.props.id} onClick={this.props.onClick} clicked={this.props.clicked} user={this.props.user} facebookUser={this.props.facebookUser} onChange={this.props.onChange} onSubmit={this.props.onSubmit} addVoteItem={this.props.addVoteItem} updateVoteItem={this.props.updateVoteItem} newItem={this.props.newItem} pollToDelete={this.props.pollToDelete} />
            </div>
          </div>
    );
  }
}

export default HomePage;