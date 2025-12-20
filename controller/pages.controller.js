const shortUrl = require('../model/shorturl.model.js');

async function handleRenderHomePageForAdmin(req, res) {
    const urls = await shortUrl.find({});
    res.render('index', {
        urls,
        user: req.user,
        shortUrl: req.cookies.shortUrl || null
    });
}

async function handleRenderHomePage (req, res) {
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

module.exports = {handleRenderHomePage, handleRenderSignup, handleRenderLogin, handleRenderHomePageForAdmin};