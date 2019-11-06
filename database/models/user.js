const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrpyt = ("bcryptjs");
mongoose.promise = Promise;

const userSchema = new Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.methods = {
    checkPassword: inputPassword => {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: plainTextPassword => {
        return bcrpyt.hashSync(plainTextPassword, 10); // radix of 10
    }
}

userSchema.pre("save", next => {
    if (!this.password) {
        console.log('models/user.js ~~~~~ NO PASSWORD PROVIDED ~~~~~')
        next()
    } else {
        console.log('models/user.js hasPassword in pre save')
        this.password = this.hashPassword(this.password)
        next()
    }
});

const User = mongoose.model('User', userSchema)

module.exports = User