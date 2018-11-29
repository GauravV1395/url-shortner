const express = require('express');
const router = express.Router();
const { urlsController } = require('../apps/controllers/urlsController');
const { hashController } = require('../apps/controllers/hashController');


router.use('/urls', urlsController);
router.use('/', hashController);


module.exports = {
    routes : router
}