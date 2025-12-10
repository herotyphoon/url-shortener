const {nanoid} = require('nanoid');

const shortUrl = require('../model/shorturl.model.js');

async function handleGenerateShortUrl (req, res) {
    const shortUrlID = nanoid(8);
    const newShortUrl = await shortUrl.create({
        shortid : shortUrlID,
        redirectUrl : req.query.url,
    });
    return res.status(201).json({shortUrl: shortUrlID});
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