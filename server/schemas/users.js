const mongoose = require('mongoose');
const pbkdf2 = require('pbkdf2');

const UserSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     lowercase: true,
    //     unique: true,
    //     required: true,
    //     trim: true,
    //     minlength: 4
    // },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true
    },
    password: String,
    failedLoginCount: {
        type: Number,
        default: 0
    }
});


UserSchema.statics.findUserForLogin = function(email) {
    return User.findOne({ email });
}

UserSchema.methods.createUser = async function() {
    console.log(this)
    if (await User.findOne({ email: this.email })) {
        return 0;
    }
    this.password = pbkdf2.pbkdf2Sync(this.password, 'salt', 1, 32, 'sha512').toString('hex');
    console.log(this, '22222')
    this.save();
    return 1;
}
UserSchema.methods.comparePassword = function(password) {
    return this.password === pbkdf2.pbkdf2Sync(password, 'salt', 1, 32, 'sha512').toString('hex');
}
const User = mongoose.model('User', UserSchema);

module.exports = User;
