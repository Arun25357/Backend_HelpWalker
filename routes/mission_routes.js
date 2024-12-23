const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mission = require('../models/mission');

router.get('/', async (req, res, next) => {
    try {
        const missions = await Mission.find();
        res.json(missions);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {  
    try {
        const mission = await Mission.findById(req.params.id);
        res.json(mission);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {    
    try {
        const mission = await Mission.create(req.body);
        res.json(mission);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const mission = await Mission.findByIdAndUpdate (req.params.id, req.body, { new: true });
        res.json(mission);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const mission = await Mission.findByIdAndDelete(req.params.id);
        res.json(mission);
    } catch (err) {
        next(err);
    }
}); 

module.exports = router;