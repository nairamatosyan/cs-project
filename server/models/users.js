const path = process.cwd();
const User = require(`${path}/schemas/users.js`);
const {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError,
    UserIsLocked
} = require(`${path}/errors/errors.js`);
const maximum_allowed_wrong_passwords = process.env.maximum_allowed_wrong_passwords || 3;

async function login(username, password) {
    const user = await User.findUserForLogin(username);
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
    if (input.username && input.username.length < 4) {
        throw new ValidationError();
    }
    
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
