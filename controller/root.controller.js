const shortUrl = require('../model/shorturl.model.js');

async function handleGetUrlById (req, res) {
    const shortUrlId = req.params.id;
    const urlData = await shortUrl.findOne({shortid : shortUrlId});
    urlData.clicks += 1;
    await urlData.save();
    return res.status(200).redirect(urlData.redirectUrl);
}

module.exports = {handleGetUrlById};