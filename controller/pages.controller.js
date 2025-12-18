const shortUrl = require('../model/shorturl.model.js');

async function handleRenderHomePage (req, res) {
    if (!req.user) return res.redirect('/pages/login');
    if (req.shortUrlID) {

    }
    const urls = await shortUrl.find({ createdBy: req.user._id });
    res.render('index', {
        urls,
        user: req.user,
        shortUrl: req.cookies.shortUrl || null
    });
}

async function handleRenderSignup (req, res) {
    return res.render('signup');
}

async function handleRenderLogin (req, res) {
    return res.render('login');
}

module.exports = {handleRenderHomePage, handleRenderSignup, handleRenderLogin};