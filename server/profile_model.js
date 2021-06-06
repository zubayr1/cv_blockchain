const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const profSchema = new Schema({
    id: {type: Number, required: true},
    name: String,
    email: { type : String , unique : true, required : true, dropDups: true },
    registration: Number,
    roll: Number,
    about: String,
    usertype: String
})

const ProfileInfo = mongoose.model('ProfileInfo', profSchema);

module.exports = ProfileInfo;