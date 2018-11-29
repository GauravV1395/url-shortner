const express = require('express');
const router = express.Router();
const { URL } = require('../models/url');
const useragent = require('express-useragent');
const morgan = require('morgan');
const fs = require('fs');

// to redirect to the original page using the hashed url.

router.use(morgan('combined'));
let accessLogStream = fs.createWriteStream(__dirname + '/../../logs/access.log', { flags: 'a' })
router.use(morgan('combined', { stream: accessLogStream }));

router.get('/:hash', (req, res) => {
    let hash = req.params.hash;
    let agent = useragent.parse(req.headers['user-agent']);
    let isDevice;
    (agent.isDesktop == true) ? isDevice = 'desktop' : isDevice = 'mobile'
    let ip = req.ip;
    URL.findOneAndUpdate(({ hashed_url: hash }), { $push: { clicks: { ip_address: ip, browser_name: agent.browser, Os_type: agent.os, device_type: isDevice } } }).then((url) => {
        res.redirect(url.original_url);
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = {
    hashController: router
}