const shortUrl = require('../model/shorturl.model.js');

async function handleRenderHomePage (req, res) {
    const allUrls = await shortUrl.find({});
    return res.render('index.ejs', {
        urls: allUrls,
    });
}

module.exports = {handleRenderHomePage};