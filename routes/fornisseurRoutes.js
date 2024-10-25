const express = require('express');
const Fornisseur = require('../models/fornisseur');
const router = express.Router();
const axios = require('axios'); // Make sure this line is included


// CRUD endpoints for Fornisseur
router.post('/', async (req, res) => { 
    const { name, company } = req.body;
    const fornisseur = new Fornisseur({
        name,
        company,
    });
    try {
        await fornisseur.save();
        res.status(201).json(fornisseur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
 });
router.get('/', async (req, res) => { 
    try {   
        const fornisseurs = await Fornisseur.find();
        res.json(fornisseurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/:id', async (req, res) => { 
    try {
        const fornisseur = await Fornisseur.findById(req.params.id);
        if (!fornisseur) {
            return res.status(404).json({ message: 'Fornisseur not found' });
        }
        res.json(fornisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 });
router.put('/:id', async (req, res) => { 
    try {
        const fornisseur = await Fornisseur.findById(req.params.id);
        if (!fornisseur) {
            return res.status(404).json({ message: 'Fornisseur not found' });
        }
        fornisseur.name = req.body.name;
        fornisseur.company = req.body.company;
        await fornisseur.save();
        res.json(fornisseur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/:id', async (req, res) => { 
    try {
        const fornisseur = await Fornisseur.findById(req.params.id);
        if (!fornisseur) {
            return res.status(404).json({ message: 'Fornisseur not found' });
        }
        await fornisseur.remove();
        res.json({ message: 'Fornisseur deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
