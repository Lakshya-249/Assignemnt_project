const bcrypt = require('bcrypt');

// Function to hash a password
async function hashPassword(password) {
    try {
        const saltRounds = 10; // Number of salt rounds, 10 is a good balance between speed and security
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

// Function to compare a password with its hash
async function comparePasswords(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}

module.exports = {hashPassword,comparePasswords};