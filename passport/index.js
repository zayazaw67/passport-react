const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require("../database/models/user");

// called on login, saves the id to session req.session.passport.user = {id: ".."}
passport.serializeUser((user, done) => {
    console.group('*** serializeUser called, user: ')
    console.log(user); // sends whole user object
    console.log("~~~~~~~~~");
    done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
    console.log("DeserializeUer called")
    User.findOne(
        { _id: id },
        'username',
        (err, user) => {
            console.log("Deserialize User: ")
            console.log(user)
            console.log("~~~~~~~");
            done(null, user)
        }
    );
});

passport.use(LocalStrategy);

module.exports = passport;