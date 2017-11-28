import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../../component/Navbar';
import HomePage from '../../component/HomePage';
import UserPage from '../../component/UserPage';
import PollModal from '../../component/PollModal';
import DeleteModal from '../../component/DeleteModal';
import {Route, Switch} from 'react-router-dom';


// https://stackoverflow.com/questions/44255415/passing-props-to-component-in-react-router-v4
// Delete openModalPoll

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      id: -1,
      facebookUser: false,
      newPoll: [],
      newCategoryTitle: '',
      newListItem: '',
      newItem: '',
      pollToDelete: 0,
      data: [],
      clicked: -1,
      open: false
    };
    this.expandMenu = this.expandMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToList = this.addToList.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.savePoll = this.savePoll.bind(this);
    this.addVoteItem = this.addVoteItem.bind(this);
    this.choosePollToDelete = this.choosePollToDelete.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
  }
  
  expandMenu(e) {
    var idClicked = +e.target.id;
    var openStatus = !this.state.open;
    if(this.state.open === true && this.state.clicked === idClicked) {
      idClicked = -1;
    }
    if(this.state.open === true && this.state.clicked !== idClicked) {
      openStatus = true;
    }
    this.setState({
        clicked: idClicked,
        open: openStatus
      });
  }
  
  handleChange(e) {
    var data = this.state.data;
    var ind = data[+e.target.id].votes.findIndex(vote => vote.item == e.target.value);
    data[+e.target.id].select = ind;
    this.setState({
      data: data
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    // data is array of Json data
    var data = this.state.data;
    // poll id is the index of the poll
    var pollIndex = +e.target.id;
    // id is the index of the vote within the poll
    var id = +data[+e.target.id].select;
    // vote info is the particular vote within the poll
    var voteInfo = data[pollIndex].votes[id];
    // update vote count
    //voteInfo.count += 1;
    // generate json data for database
    var voter = this.state.user;
    if(this.state.facebookUser) {
      voter = this.state.id;
    }
    var voteData = {
      pollIndex: pollIndex,
      id: id,
      voteInfo: voteInfo,
      select: 0,
      voter: voter
    };
    axios.post('/submitVote', voteData)
      .then((res) => {
        var updatedVote = res.data.data;
        data[pollIndex] = updatedVote;
        this.setState({
          data: data
        });
      })
      .then((err) => {
        if (err) console.log(err);
      });
  }
  
  addVoteItem(e) {
    e.preventDefault();
    if(this.state.newItem.length >= 1) {
       var id = +e.target.id;
       var voteData = this.state.data[id].votes;
       voteData.push({
         item: this.state.newItem,
         count: 0
       });
       var data = {
         voteData: voteData,
         id: id
       };
      this.setState({
        newItem: ''
      });
      axios.post('/addVoteItem', data)
      .then((res) => {
        var updatedData = this.state.data;
        updatedData[id] = res.data.data;
        this.setState({
          data: updatedData
        });
      })
      .then((err) => {
        if(err) throw err;
      });
      }
      else {
        alert('Please submit another vote item.');
      }
  }
  
  addToList(e) {
    e.preventDefault();
    var newPollList = this.state.newPoll;
    if(this.state.newListItem.length === 0) {
      alert('Please enter some text!');
    } else {
      newPollList.push(this.state.newListItem);
      this.setState({
        newPoll: newPollList,
        newListItem: ''
      }); 
    }
  }
  
  onChange(e) {
    e.preventDefault();
    if(e.target.id === 'pollName') {
      this.setState({
        newCategoryTitle: e.target.value
      });
    } else if (e.target.id === 'newItem') {
      this.setState({
        newListItem: e.target.value
      });
    } else if (e.target.className === 'newItemInput form-control') {
      this.setState({
        newItem: e.target.value
      });
    }
  }
  
  savePoll(e) {
    e.preventDefault();
    console.log("saved");
    var errorMsg = '';
    // warn user if they have not supplied a category
    if(this.state.newCategoryTitle.length === 0) {
      errorMsg += 'Please enter a category\n\n';
    }
    // warn user if they haven't supplied at least two items for voting on
    if(this.state.newPoll.length < 2) {
      errorMsg += 'Please add at least two items for voters!';
    }
    // display error message in either of these scenarios
    if(this.state.newPoll.length < 2 | this.state.newCategoryTitle.length === 0) {
      alert(errorMsg);
    } else {
      // else send poll data to the server
      var pollArr = [];
      var pollData;
      this.state.newPoll.map(item => {
        pollArr.push({
          item: item,
          count: 0
        });
        pollData = {
          _id: this.state.data.length,
          data: {
            hidden: false,
            voters: [],
            createdBy: this.state.id,
            category: this.state.newCategoryTitle,
            select: 0,
            votes: pollArr
          }
        };
      });
      this.setState({
        newPoll: [],
        newCategoryTitle: '',
        newListItem: ''
      });
      axios.post('/newPoll', pollData)
      .then((res) => {
        var voteData = this.state.data;
        voteData.push(res.data.data);
        this.setState({
          data: voteData
        });
      })
      .then((err) => {
        if(err) console.log(err);
      });
    }
  }
  
  clearInput(e) {
    console.log("clear");
    this.setState({
      newPoll: [],
      newCategoryTitle: '',
      newListItem: ''
    });
  }
  
  deleteListItem(e) {
    // get id of list item user has clicked to delete
    var id = e.target.id;
    // get list of new poll items
    var list = this.state.newPoll;
    // remove item at index user specified
    list.splice(id, 1);
    // update state
    this.setState({
      newPoll: list
    });
  }

  choosePollToDelete(e) {
    this.setState({
      pollToDelete: +e.target.id
    });
  }
  
  deletePoll(e) {
    e.preventDefault();
    console.log("deleting");
    var data = {
      pollToDelete: +this.state.pollToDelete
    };
    axios.post('/deletePoll', data)
    .then((res) => {
      var voteData = this.state.data;
      voteData[this.state.pollToDelete] = res.data.data;
      this.setState({
        data: voteData,
        clicked: -1
      });
    });
  }

  componentDidMount() {
  // try to get twitter user data
   axios.get('/api/user_data')
      .then(res => {
          if (res.data.hasOwnProperty('username')) {
            this.setState({
                user: res.data.username,
                id: res.data.id,
                facebookUser: true
            });
          } else {
             // get ip address - 'default' user until somebody logs in
             axios.get('/ip')
                .then(res => {
                  const ip = res.data.ip;
                  this.setState({
                      user: ip,
                      facebookUser: false
                  });
                })
                .then(err => {
                  if(err) {
                    console.log(err);
                  }
                });
              }
              })
              .then(err => {
                if(err) console.log(err);
            });
    // get vote data form server  
    axios.get('/data')
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .then(err => {
        if(err) {
          console.log(err);
        }
      });
      if (window.location.hash && window.location.hash == '#_=_') {
        window.location.hash = '';
      } else if(window.location.hash) {
          var clicked = window.location.hash;
          clicked = +clicked.split('#')[1];
          this.setState({
            clicked: clicked
          });
      }

  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Navbar onClick={this.handleLogin} user={this.state.user} facebookUser={this.state.facebookUser} />
        </div>
        <div className="container-fluid">
          <PollModal
            savePoll={this.savePoll}
            pollItems={this.state.newPoll}
            addToList={this.addToList}
            onClick={this.deleteListItem}
            category={this.state.newCategoryTitle}
            newListItem={this.state.newListItem}
            onChange={this.onChange}
            clearInput={this.clearInput}
          />
          <DeleteModal
            onClick={this.deletePoll}
          />
          <Switch>
            <Route exact path="/" exact render={(props) => (
            <HomePage
              data={this.state.data}
              onClick={this.expandMenu}
              appPoll={this.addPoll}
              id={this.state.id}
              clicked={this.state.clicked}
              user={this.state.user}
              facebookUser={this.state.facebookUser}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              openModalPoll={this.openModalPoll}
              addVoteItem={this.addVoteItem}
              updateVoteItem={this.onChange}
              newItem={this.state.newItem}
              pollToDelete={this.choosePollToDelete}
              {...props} />)}
            />
            <Route path={`/facebook/${this.state.user}`} render={(props) => (
            <UserPage
              data={this.state.data}
              onClick={this.expandMenu}
              addPoll={this.addPoll}
              clicked={this.state.clicked}
              user={this.state.user}
              facebookUser={this.state.facebookUser}
              id={this.state.id}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              openModalPoll={this.openModalPoll}
              addVoteItem={this.addVoteItem}
              updateVoteItem={this.onChange}
              newItem={this.state.newItem}
              pollToDelete={this.choosePollToDelete}
              {...props} />)} />
          </Switch>
        </div>
        <div className='row text-center footer'>
          <div className='col-12'>
            <h5 className='text-center' id='made-by'>Made by <a href='https://codepen.io/mattkeegan20/' target='_blank'>Matt K</a></h5>
          </div>
        </div>
      </div>
    );
  }
}

export default App;