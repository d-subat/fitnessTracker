const User = require('./userSchema');
const Activity = require('./activitySchema');
const Exercises = require('./exercisesSchema');

module.exports = {
    _errorHandler: (err) => {
        res.send(err.message);
    },
    showUser: (req, res) => {
        console.log(req.body.usermail);
        const usermail = req.body.usermail

        User.findOne({
                usermail
            })
            .then(rec => {
                const response = {
                user: rec.user,
                usermail: rec.usermail,
                firstname: rec.firstname,
                lastname: rec.lastname,
                address: rec.address,
                city: rec.city,
                country: rec.country,
                zip: rec.zip,
         
                weight: rec.weight,
                height: rec.height,
                age: rec.age,
                bmi: rec.bmi,
                gender: rec.gender
                }
                res.send(response);

               
              
            })
            .catch(err => console.log(err));

    },
    updateUser: (req, res) => {
        const user = req.body.username
        const usermail = req.body.usermail
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const address = req.body.address
        const city = req.body.city
        const country = req.body.country
        const zip = req.body.zip
  
        const weight = req.body.weight
        const height = req.body.height
        const age = req.body.age
        const bmi = req.body.bmi
        const gender = req.body.gender
        User.findOne({
                user
            })
            .then(rec => {

          
                if (rec) {
                    res.status(200).send('Activity already taken');
                } else {
                    // Create new user if username available
                    User.create({
                        user,
                         usermail ,
                         firstname, 
                         lastname ,
                         address ,
                         city ,
                         country ,
                         zip ,  
                  
                         weight ,
                         height ,
                         age ,
                         bmi ,
                         gender 
                        })
                        .then(rec => {
                            const response = {
                                name: rec.name,
 
                                _id: rec._id
                            };

                            res.send(`created User: ${JSON.stringify(response)}`);
                        })
                        .catch(err => console.log(err));
                }
              
            })
            .catch(err => console.log(err));

    },
    deleteUser: (req, res) => {
    },
    addActivity: (req, res) => {
        const name = req.body.name;
        const MET = req.body.MET;
        const user = req.body.user;
        Activity.findOne({
                name,
                user: 'false'
            })
            .then(rec => {
                if (rec) {
                    res.status(200).send('You can\'t change factory presets');
                } else {
                    //check if we need to update or create
                        Activity.findOne({
                            name,
                        })
                        .then(rec => {
                            if (rec) {
                                //we need to upfate
                                Activity.update(
                                    {name},
                                    {MET,
                                    user},
                                    { upsert: true }
                                )
                                .then(rec => {
                                    const response = {
                                        name: rec.name,
                                        MET: rec.MET,
                                        user: rec.user,
                                        _id: rec._id
                                    };
        
                                res.send(`updated activity ${name}}`);
                            })
                            .catch(err => console.log(err));
                            } else {

                                Activity.create({
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
        
                                    res.send(`created activity: ${JSON.stringify(response)}`);
                                })
                                .catch(err => console.log(err));
                            }

                            
                        })
                        .catch(err => console.log(err));
                }

                
            }).catch(err => console.log(err));

    },

    showActivity: (req, res) => {                    
        console.log( Activity);
        Activity.find({}, 'name MET user _id')
            .then(rec => {
                res.send(rec);
            })
            .catch(err => console.log(err));
/*
              // ####################### SORT FOR STATS
                User.aggregate([
                   
                    { '$group': {
                        '_id': '$PartnerID',
                        'total': { 
                            '$sum': { 
                                '$convert': { 'input': '$moop', 'to': 'int' }
                            } 
                        }
                    }
                }
                 ]).then(rec => {
                    res.send(rec);
                })
                .catch(err => console.log(err));
            */
    },
    deleteActivity: (req, res) => {
        const name = req.body.name;
        Activity.findOne({
                name,
                user: 'false'
            })
            .then(rec => {
                if (rec) {
                    res.send(
                        "You can't delete factory presets.", 200);
                } else {
                    // Delete activity if not factory preset
                    Activity.deleteOne({
                            _id: req.body._id
                        })
                        .then(rec => {
                            res.send("Sucessfully deleted " + name);

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
        const calories = req.body.calories;
        // res.send("create ex");
        // Create new user if username available
        Exercises.create({
                username,
                description,
                duration,
                date,
                calories
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
  const count = req.query.limit;
        const preQuery = 
        {
        username: req.query.test,
        date: {$gt: req.query.date}
        }
        //check for null or undefined
        const  query = JSON.parse(JSON.stringify(preQuery), (key, value) => {
                if (value == null || value == '' || value == [] || value == {})
                    return undefined;
                return value;
            })
        // date range
        //db.bios.find( { birth: { $gt: new Date('1940-01-01'), $lt: new Date('1960-01-01') } } )
        console.log(query)
        //Exercises.find(query , ).limit(parseInt(count,10))
        Exercises.find({} , ).sort({date: -1})
            .then(rec => {
                res.send(rec);
            })
            .catch(err => this._errorHandler(err));

    },
    deleteExercise: (req, res) => {
        Exercises.find({}, 'username _id')
            .then(rec => {
                res.send(rec);
            })
            .catch(err => _errorHandler(err));

    }



};