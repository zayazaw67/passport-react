const express = require('express')
// const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 8080;
// Route requires
const user = require('./routes/user')

app.use(morgan('dev'));
app.use(
    // bodyParser.urlencoded({
    express.urlencoded({
        // turn to true in production
        extended: false
    })
);
// app.use(bodyParser.json());
app.use(express.json());


// sessions
app.use(
    session({
        secret: 'fatso-catty', //pick random string to make the has that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false, //required - stops from saving user and session multiple times
        saveUninitialized: false // required - does not save guests
    })
);

app.use(passport.initialize()); 
app.use(passpor.session());

app.use('/user', user);

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:' + PORT);
});