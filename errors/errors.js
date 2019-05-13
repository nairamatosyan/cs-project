class UserNotFound extends Error {
    constructor() {
        super('User with this username was not found!');
    }
}

class UserAlreadyExists extends Error {
    constructor(username) {
        super(`User with this username and/or email already exists!`);
    }
}
class PasswordIncorrect extends Error {
    constructor() {
        super('Password is wrong!');
    }
}
class ValidationError extends Error {
    constructor() {
        super('Username cannot be shorter than 4 characters!');
    }
}
class UserIsLocked extends Error {
    constructor(username) {
        super(`User ${username} is locked!`);
    }
}



module.exports = {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError, // Username is shorter than 4 characters
    UserIsLocked // BONUS
}
