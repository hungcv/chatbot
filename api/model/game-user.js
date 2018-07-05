// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('GameUser', new Schema({ 
    fullname: {
        type: String,
        required: true
    },
    phone: String,
    number: Number,
    messenger_user_id: String,
    game_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'GameCampain' 
    }
}));
