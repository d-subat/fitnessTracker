const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: String,
        min: 3,
        max: 40

    },
    username: {
        type: String,
        min: 3,
        max: 40

    },
    usermail: {
        type: String,
        min: 3,
        max: 40

    },


    firstname: {
        type: String,
        min: 3,
        max: 40

    },
    lastname: {
        type: String,
        min: 3,
        max: 40

    },
    address: {
        type: String,
        min: 3,
        max: 40

    },
    city: {
        type: String,
        min: 3,
        max: 40

    },
    country: {
        type: String,
        min: 3,
        max: 40

    },
    zip: {
        type: String,
        min: 3,
        max: 40

    },

    weight: {
        type: String,
        min: 3,
        max: 40

    },
    height: {
        type: String,
        min: 3,
        max: 40

    },
    age: {
        type: String,
        min: 3,
        max: 40

    },
    bmi: {
        type: String,
        min: 3,
        max: 40

    }

    /*,
    log: [{
        description: {
            type: String,
            min: 3,
max:40

            min: 1,
            max: 40
        },
        duration: {
            type: Number,
            min: 3,
max:40

            min: 1,
            max: 100000
        },
        date: {
            type: Number,
            default: Date.now()
        }
    }] */
});

const User = mongoose.model('User', userSchema);
module.exports = User;