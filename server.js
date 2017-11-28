var express = require('express');
const app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var Vote = require('./config/database');

require('./config/passport')(passport);

app.use(express.static('public'));
app.use(bodyParser.json());
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
app.use(session({
  secret: 'votewithmatt',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());

require('./app/routes')(app, passport, Vote);

/*
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/user', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/ip', (req, res) => {
  var ip = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress;
  var json = { ip: ip };
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(json));
});

app.get('/data', (req, res) => {
  Vote.find({}, (err, data) => {
    if(err) console.log(err);
    var votes = [];
    data.map((item) => {
      votes.push(item.data);
    });
    console.log(votes);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(votes));
  });
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
      
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(vote));
      console.log('Vote successfully updated');
    });
  });
});*/

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}.`);
});
