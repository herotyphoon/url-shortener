const {getUser} = require('../service/auth.service.js')

async function restrictToLoggedInUser (req, res, next) {
    const sessionID = req.cookies?.sessionID;

    if (!sessionID) return res.redirect('/pages/login');

    const user = getUser(sessionID);

    if (!user) return res.redirect('/pages/login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const sessionID = req.cookies?.sessionID;
    if (sessionID) {
        req.user = getUser(sessionID);
    }
    next();
}


module.exports = {restrictToLoggedInUser, checkAuth};