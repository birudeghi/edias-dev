const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3,
    },
}, {
    timestamps: true,
});

const CustEmail = mongoose.model('custEmail', emailSchema);

module.exports = CustEmail;