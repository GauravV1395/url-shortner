const express = require('express');
const router = express.Router();
const { URL } = require('../models/url');


//get

router.get('/', (req, res) => {
    URL.find().then((urls) => {
        res.send(urls);
    }).catch((err) => {
        res.send(err);
    });
});


// post

router.post('/', (req, res) => {
    let body = req.body;
    let url = new URL(body);
    url.save().then((url) => {
        res.send({
            url,
            notice: 'successfully created'
        });
    }).catch((err) => {
        res.send(err);
    });
});

// put

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    URL.findOneAndUpdate({ _id: id }, { $set: body }, { new: true, runValidators: true }).then((url) => {
        res.send({
            url,
            notice: 'successfully updated'
        });
    }).catch((err) => {
        res.send(err);
    });
});


//delete

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    URL.findOneAndRemove(id).then((url) => {
        res.send({
            url,
            notice: "successfully removed"
        });
    }).catch((err) => {
        res.send(err);
    });
});

// /urls/tags?names=tag1,tag2

router.get('/tags',(req,res) => {
    let name = req.query.names;
    console.log(name);
    name = name.split(',');
    URL.findOne({tags : {"$in" : name}}).then((urls) => {
        res.send(urls);
    }).catch((err) => {
        res.send(err);
    });
});


// find one 

router.get('/:id', (req, res) => {
    let id = req.params.id;
    URL.findById(id).then((url) => {
        res.send(url);
    }).catch((err) => {
        res.send(err);
    });
});


// /urls/tags/:name

router.get('/tags/:name', (req, res) => {
    let name = req.params.name;
    URL.find({ tags: name }).then((urls) => {
        res.send(urls[0].original_url);
    }).catch((err) => {
        res.send(err);
    });
});


module.exports = {
    urlsController: router,
}
