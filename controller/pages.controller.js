const shortUrl = require('../model/shorturl.model.js');

async function handleRenderHomePage (req, res) {
    if (!req.user) return res.redirect('/pages/login');
    if (req.shortUrlID) {

    }
    const urls = await shortUrl.find({ createdBy: req.user._id });
    return res.render('index', { urls, shortUrl: req.cookies.shortUrl });
}

async function handleRenderSignup (req, res) {
    return res.render('signup');
}

async function handleRenderLogin (req, res) {
    return res.render('login');
}

module.exports = {handleRenderHomePage, handleRenderSignup, handleRenderLogin};