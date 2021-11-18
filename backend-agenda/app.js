const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Event = require('./models/Event')

mongoose.connect('mongodb+srv://kadjiologue:kadjiologue@cluster0.eqjv1.mongodb.net/db-agenda?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/add-event', (req, res, next) => {
    const event = new Event({
        ...req.body
    })

    console.log(req.body);
    event.save()
         .then(() => res.status(201).json({message: 'Event registered successfully'}))
         .catch((error) => res.status(400).json({error}));
});

app.get('/api/events', (req, res, next) =>{
    Event.find()
         .then(events => res.status(200).json(events))
         .catch((error) => res.status(400).json({error}));
});

app.get('/api/event/:id', (req, res, next) =>{
    Event.findOne({_id: req.params.id})
        .then(events => res.status(200).json(events))
        .catch((error) => res.status(404).json({error}));
});

app.put('/api/update-event/:id', (req, res, next) => {
    Event.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Event successfully modified'}))
        .catch((error) => res.status(400).json({error}));

    console.log(req.body);
});

app.delete('/api/delete-event/:id', (req, res, next) =>{
    Event.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Event successfully deleted'}))
        .catch((error) => res.status(400).json({error}));
});

module.exports = app;