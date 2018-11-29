
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const shorthash = require('shorthash');

const urlSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    original_url: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isURL(value);
            },
            message: function () {
                return 'invalid url format'
            }
        }
    },

    tags: {
        type: [String],
        required: true
    },

    hashed_url: {
        type: String,
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    clicks: [{
        created_at: { type: Date, default: Date.now},
        ip_address: String,
        browser_name: String,
        Os_type:  String,
        device_type: String
    }]

})

//pre hook to hash the url
urlSchema.pre('save', function (next) {
    let url = this;
    let hashed = shorthash.unique(url.original_url);
    url.hashed_url = hashed;
    next();
});

const URL = mongoose.model('url', urlSchema);

module.exports = {
    URL,
}