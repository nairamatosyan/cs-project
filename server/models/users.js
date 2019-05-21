const path = process.cwd();
const User = require(`${path}/schemas/users.js`);
const jwt = require('jsonwebtoken')
const {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError,
    UserIsLocked
} = require(`${path}/errors/errors.js`);
const maximum_allowed_wrong_passwords = process.env.maximum_allowed_wrong_passwords || 3;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

async function login(email, password) {
    const user = await User.findUserForLogin(email);
    if (!user) {
        throw new UserNotFound();
    }
    if (user.failedLoginCount >= maximum_allowed_wrong_passwords) {
        throw new UserIsLocked(username);
    }
    if (!user.comparePassword(password)) {
        user.failedLoginCount++;
        await user.save();
        throw new PasswordIncorrect();
    }
    user.failedLoginCount = 0;
    await user.save();
    const accessToken = jwt.sign({
        email,
        _id: user._id
      }, JWT_SECRET_KEY, { expiresIn: "24 hours"});
    return { email, accessToken };
}

async function getUser(username) {
    const user = await User.getUserByUsername(username);
    if (!user) {
        throw new UserNotFound();
    }
    return user;
}

async function getAllUsers() {
    return await User.getAllUsers();
}

async function createUser(input) {
    const user = new User(input);
    if (! await user.createUser()) {
        throw new UserAlreadyExists();
    }
}

module.exports = {
    login,
    getUser,
    getAllUsers,
    createUser
}
