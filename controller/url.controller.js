const {nanoid} = require('nanoid');

const shortUrl = require('../model/shorturl.model.js');

async function handleGenerateShortUrl (req, res) {
    const shortUrlID = nanoid(8);
    const newShortUrl = await shortUrl.create({
        shortid : shortUrlID,
        redirectUrl : req.body.url,
        createdBy : req.user._id,
    });
    res.cookie("shortUrl", shortUrlID, { httpOnly: false });
    return res.status(201).redirect('/pages');
}

async function handleGetAnalyticsById (req, res) {
    const urlData = await shortUrl.findOne({shortid: req.params.id});
    if (!urlData) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(200).json({
        url: urlData.redirectUrl,
        shortUrlId: urlData.shortid,
        clicks: urlData.clicks
    });
}

module.exports = {handleGenerateShortUrl, handleGetAnalyticsById};