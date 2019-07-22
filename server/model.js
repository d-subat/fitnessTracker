const User = require('./userSchema');
const Exercises = require('./exercisesSchema');

module.exports = {
        _errorHandler: (err) => {
            res.send(err.message);
        },

        addUser: (req, res) => {
            const name = req.body.name;
            const MET = req.body.MET;
            const user = req.body.user;
            console.log("create users" + name);

            User.findOne({
                    name
                })
                .then(rec => {
                    if (rec) {
                        res.send({
                            message: 'Username already taken'
                        }, 200);
                    } else {
                        // Create new user if username available
                        User.create({
                            name,
                            MET,
                            user
                            })
                            .then(rec => {
                                const response = {
                                    name: rec.name,
                                    MET: rec.MET,
                                    user: rec.user,
                                    _id: rec._id
                                };

                                res.send(`created User: ${JSON.stringify(response)}`);
                            })
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));

        },

        showUsers: (req, res) => {
            console.log(req.body)
            User.find({}, 'name MET user _id')
                .then(rec => {
                    res.send(rec);
                })
                .catch(err => _errorHandler(err));

        },
        deleteUser: (req, res) => {
            const name = req.body.name;
            User.findOne({
                name, user: 'false'
            })
            .then(rec => {
                if (rec) {
                    res.send(
                        "You can't delete factory presets." 
                    , 200);
                } else {
                    // Delete activity if not factory preset
                    User.deleteOne( { _id: req.body._id } )
                    .then(rec => {
                        res.send( "Sucessfully deleted " + name);
                
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));

 
        },
        addExercise: (req, res) => {
            
            const username = req.body.username;
            const description = req.body.description;
            const duration = req.body.duration;
            const date = req.body.date;
           // res.send("create ex");
            // Create new user if username available
            Exercises.create({
                    username,
                    description,
                    duration,
                    date
                })
                .then(rec => {
                    const response = {
                        username: rec.username,
                        _id: rec._id
                    };
                    res.send(`created User: ${JSON.stringify(response)}`);
                })
                .catch(err => console.log(err));
        

        // https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
    },

    showExercises: (req, res) => {
           Exercises.find({}, 'username _id')
                .then(rec => {
                    res.send(rec);
                })
                .catch(err => _errorHandler(err));

            }


};