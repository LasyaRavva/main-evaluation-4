const fs = require('fs');

const logger = (req, res, next) => {
    const log = `${req.method} ${req.url} ${new Date().toISOString()}\n`;
    fs.appendFile('logs.txt',log,(err) => {
        if(err) console.error('logging error:', err);
    })
    next();
};

module.exports = {logger};