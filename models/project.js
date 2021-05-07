const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: Array,
        required: true
    }
}, {timestamps: true}
);

module.exports = mongoose.model('project', projectSchema);