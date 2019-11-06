// connecting to mongoDB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise

// localdatabase url -- default port 27017
const uri = "mongodb://localhost:27017/simple-mern-passport";

mongoose.connect(url).then(
    () => {
        // ready to use. mongoose.onnect() promise resolves to undefined
        console.log('connected to mongo');
    }, err => {
        console.log('error connecting to mongo: ')
        console.log(err)
    }
);

module.exports = mongoose.connection;