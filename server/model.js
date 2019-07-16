const User = require('./userSchema');
const Exercises = require('./exercisesSchema');

module.exports = {
        _errorHandler: (err) => {
            res.send(err.message);
        },

        addUser: (req, res) => {
            const username = req.body.username;
            //console.log("create users" + username);

            User.findOne({
                    username
                })
                .then(rec => {
                    if (rec) {
                        res.send({
                            message: 'Username already taken'
                        }, 200);
                    } else {
                        // Create new user if username available
                        User.create({
                                username
                            })
                            .then(rec => {
                                const response = {
                                    username: rec.username,
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
            User.find({}, 'username _id')
                .then(rec => {
                    res.send(rec);
                })
                .catch(err => _errorHandler(err));

        },
        deleteUser: (req, res) => {
           
            
            User.remove( { _id: req.body._id } )
                .then(rec => {
                    res.send(rec);
                })
                .catch(err => _errorHandler(err));
 
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