const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 40
    } /*,
    log: [{
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

 