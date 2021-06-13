const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
    id: {type: Number, required: true},
    registration: Number,
    roll: Number,
    catype: String,
    doctype: String,
    check: String,
    hash: String
})

const UploadInfo = mongoose.model('UploadInfo', uploadSchema);

module.exports = UploadInfo;