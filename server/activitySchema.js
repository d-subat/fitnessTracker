const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 40
    },
    MET: {
        type: Number,
        required: true,
        min: 1,
        max: 100000
    },
    user: {
            type: String,
            required: true,
        },
});

 

const Activity = mongoose.model('Activities', activitySchema);
module.exports= Activity;


 