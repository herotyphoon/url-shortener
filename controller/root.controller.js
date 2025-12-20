const shortUrl = require('../model/shorturl.model.js');

async function handleGetUrlById (req, res) {
    const shortUrlId = req.params.id;
    const urlData = await shortUrl.findOne({shortid : shortUrlId});
    if (!urlData) {
        return res.status(404).send("Short URL not found");
    }
    urlData.clicks += 1;
    await urlData.save();
    return res.status(302).redirect(urlData.redirectUrl);
}

async function handleGetHomePage (req, res) {
    return res.status(302).redirect('/pages/');
}

module.exports = {handleGetUrlById, handleGetHomePage};