const express = require('express');
const Client = require('../models/client');
const axios = require('axios'); // Make sure this line is included
const router = express.Router();


// Assume that the Task Service (microservice2) is running on localhost:3002
const TASK_SERVICE_URL = 'http://localhost:3002/tasks';

// POST route to create a task for a specific client
router.post('/:clientId/tasks', async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const clientId = req.params.clientId;

        // Send a request to microservice2 to create a task with clientId
        const response = await axios.post(TASK_SERVICE_URL, {
            title,
            description,
            clientId, // Pass the client ID to associate it with the task
            dueDate
        });

        res.status(201).json(response.data); // Send back the created task data
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to create task for client' });
    }
});
// CRUD endpoints for Client
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    const client = new Client({
        name,
        email,
    });
    try {
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get('/', async (req, res) => {
    try {   
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 });
router.get('/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 });
router.put('/:id', async (req, res) => { 
    const { name, email } = req.body;
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        client.name = name;
        client.email = email;
        await client.save();
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 });
router.delete('/:id', async (req, res) => { 
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        await client.remove();
        res.json({ message: 'Client deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 });

module.exports = router;
