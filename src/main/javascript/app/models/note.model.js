const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    description: String,
    status: String,
    priority: String,
    tagone: String,
    tagtwo: String,
    tagthree: String,
    image: String,
    closereason: String,
    openreason: String
});

module.exports = mongoose.model('Note', NoteSchema);