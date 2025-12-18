require('dotenv').config();
const jwt = require('jsonwebtoken');

function setUser (user) {
    const payload = {
       _id : user._id,
        email : user.email,
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
}

function getUser (token) {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error){
        return null;
    }
}

module.exports = { setUser, getUser };