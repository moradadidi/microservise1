const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
});

module.exports = mongoose.model('Client', clientSchema);
