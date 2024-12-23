const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    created_at: { type: Date, default: Date.now },
    due_date: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Mission = mongoose.model('Mission', missionSchema);