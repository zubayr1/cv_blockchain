const mongoose  = require('mongoose')
const mongoUri = require('./environment/env')

mongoose.Promise =  global.Promise;



function connect()
{
    return mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});

}

module.exports = {
    connect,
    mongoose
}