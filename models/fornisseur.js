const mongoose = require('mongoose');

const fornisseurSchema = new mongoose.Schema({
    name: String,
    company: String,
});

module.exports = mongoose.model('Fornisseur', fornisseurSchema);
