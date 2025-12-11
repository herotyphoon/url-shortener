const fs = require("fs");

function logReqRes(filename) {
    return (req, res, next) => {

        // Skip browser favicon requests
        if (req.url === "/favicon.ico") return next();

        const start = Date.now();

        res.on("finish", () => {
            const duration = Date.now() - start;

            const logLine = {
                DateTime: new Date().toLocaleString(),
                Method: req.method,
                Url: req.originalUrl,
                resolveStatus: res.statusCode,
                TimeTaken: `${duration}ms`,
                userAgent: req.headers["user-agent"] || "unknown-agent"
            };

            fs.appendFile(filename, JSON.stringify(logLine), (err) => {
                if (err) console.error("Logging Error:", err);
            });
        });

        next();
    };
}

module.exports = {logReqRes};
