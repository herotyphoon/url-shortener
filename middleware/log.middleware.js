const fs = require("fs");
const path = require("path");

function logReqRes(filename) {
    const logPath = path.resolve(filename);

    // Ensure file exists and starts as a JSON array
    if (!fs.existsSync(logPath)) {
        fs.writeFileSync(logPath, "[]", "utf-8");
    }

    return (req, res, next) => {

        if (req.url === "/favicon.ico") return next();

        const start = process.hrtime.bigint();

        res.on("finish", () => {
            const end = process.hrtime.bigint();
            const durationMs = Number(end - start) / 1e6;

            const logEntry = {
                timestamp: new Date().toISOString(),
                method: req.method,
                url: req.originalUrl,
                status: res.statusCode,
                timeTakenMs: Number(durationMs.toFixed(2)),
                userAgent: req.headers["user-agent"] || "unknown-agent"
            };

            fs.readFile(logPath, "utf-8", (err, data) => {
                if (err) {
                    console.error("Log Read Error:", err.message);
                    return;
                }

                let logs;
                try {
                    logs = JSON.parse(data);
                    if (!Array.isArray(logs)) logs = [];
                } catch {
                    logs = [];
                }

                logs.push(logEntry);

                fs.writeFile(
                    logPath,
                    JSON.stringify(logs, null, 2),
                    (err) => {
                        if (err) {
                            console.error("Log Write Error:", err.message);
                        }
                    }
                );
            });
        });

        next();
    };
}

module.exports = { logReqRes };
