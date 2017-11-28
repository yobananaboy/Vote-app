var mongoose = require('mongoose');
require('dotenv').config();

var user = process.env.USERNAME;
var password = process.env.PASSWORD;
var host = process.env.HOST;
var port = process.env.DB_PORT;

var uri = `mongodb://${user}:${password}@${host}:${port}/vote-app`;
mongoose.connect(uri, {useMongoClient: true});

var Schema = mongoose.Schema;
// create vote schema
var voteSchema = new Schema({
    _id: Number,
    data: {
        hidden: Boolean,
        createdBy: String,
        voters: [{
            type: String
        }],
        category: String,
        select: Number,
        votes: [
            {
                item: String,
                count: Number
            }
        ]
    }
}, { collection: 'vote-data' });

// create a model
var Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;