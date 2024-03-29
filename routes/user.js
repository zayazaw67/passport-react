const express = require('express');
const router = express.Router();
const User = require('../database/models/user');
const passport = require('../passport');

router.post('/', (req, res) => {
    console.log("user signup");
    const { username, password } = req.body
    // add validation
    User.findOne({ username }, (err, user) => {
        if (err) {
            console.log("user.js post error: ", err)
        } else if (user) {
            res.json({
                error: `Sorry, aready a existing user with the username: ${username}`
            })
        } else {
            const newUser = newUser({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json.json(err)
                res.json(savedUser)
            });
        };
    });
});

router.post('/login', function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
},
    passport.authenticate('local'), (req, res) => {
        console.log("Logged in", req.user);
        var userInfo = {
            username: req.user.username
            // email: req.user.email,
            // age: req.user.age,
        }; res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    // console.log('~~~~user!!~~~~~')
    // console.log(req.user)
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.json({ user: null });
    }
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        res.send({ msg: "Logging out" });
    } else {
        res.send({ msg: "No user to log out" });
    };
});

module.exports = router;