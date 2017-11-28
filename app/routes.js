module.exports = function(app, passport, Vote) {
    var port = process.env.PORT;
    
    app.get('/ip', (req, res) => {
      var ip = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress;
      var json = { ip: ip };
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(json));
    });
    
    app.get('/data', (req, res) => {
      Vote.find().sort([['_id', 1]]).exec((err, data) => {
        if(err) console.log(err);
        var votes = [];
        data.map((item) => {
          votes.push(item.data);
        });
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(votes));
      });
    });

    //app.get('/twitter-login', passport.authenticate('twitter'));
    
    app.get('/facebook-login', passport.authenticate('facebook'));
    
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/' }));

    app.get('/api/user_data', function(req, res) {
            if (req.user === undefined) {
                // The user is not logged in
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({}));
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    username: req.user.displayName,
                    id: req.user.id
                }));
            }
        });
  
    app.post('/submitVote', (req, res) => {
      var id = req.body.pollIndex;
      var index = req.body.id;
      var voter = req.body.voter;
      Vote.findById(id, (err, vote) => {
        if(err) console.log(err);
        vote.data.votes[index].count += 1;
        vote.data.voters.push(voter);
        console.log('user found');
        vote.save((err) => {
          if(err) console.log(err);
            Vote.find().sort([['_id', 1]]).exec((e, data) => {
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(vote));
              console.log('Vote successfully updated');
            });
        });
      });
    });
    
    app.post('/newPoll', (req, res) => {
      var poll = req.body;
      var newPoll = new Vote(poll);
      newPoll.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(poll));
            console.log('Poll successfully saved');
          }
      });
    });
    
    app.post('/addVoteItem', (req, res) => {
      var voteData = req.body.voteData;
      var id = req.body.id;
      Vote.findById(id, (err, vote) => {
        if (err) throw err;
        vote.data.votes = voteData;
        vote.save(err => {
          if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(vote));
            console.log('Vote successfully updated');
        });
      });
    });
    
    app.post('/deletePoll', (req, res) => {
      var id = req.body.pollToDelete;
      Vote.findById(id, (err, vote) => {
        if(err) throw err;
        vote.data.hidden = true;
        vote.save(err => {
          if(err) throw err;
          res.setHeader('Content-type', 'application/json');
          res.send(JSON.stringify(vote));
          console.log('Vote successfully deleted');
        });
      });
    });
    
    app.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });
    
    app.get('/poll/:id', (req, res) => {
      var clicked = req.params.id;
      res.redirect(`/#${+clicked}`);
    });
    
    app.get('/facebook/:user', (req, res) => {
      res.redirect('/');
    });
};