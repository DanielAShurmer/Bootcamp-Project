const mongoose = require('mongoose');

const BugSchema = mongoose.Schema({
    bugNumber: Number,
    description: String,
    status: String,
    priority: String,
    tagOne: String,
    tagTwo: String,
    tagThree: String,
    image: String,
    closeReason: String,
    openTeason: String
});

module.exports = mongoose.model('Bug', BugSchema);