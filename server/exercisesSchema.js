const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const exercisesSchema = new Schema({


    username: {
        type: String,
        required: true,
        min: 3,
        max: 40
    },
    description: {
        type: String,
        required: true,
        min: 1,
        max: 40
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
        max: 10000000
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    calories: {
        type: Number,
        required: true,
        min: 0,
        max: 100000
    },

});

const User = require('./userSchema');
const Exercises = mongoose.model('Exercises', exercisesSchema);
module.exports = Exercises;