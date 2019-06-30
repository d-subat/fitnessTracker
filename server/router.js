const router = require('express').Router();
const model = require('./model');


// add new user
router.post('/api/exercise/new-user', model.addUser);

// show all users
router.get('/api/exercise/users', model.showUsers);

//Add exercise
router.post('/api/exercise/add', model.addExercise);

// show users exercises
router.get('/api/exercise/log', model.showExercises);



// define the home page route
router.get('/', (req, res) => {
  res.render('index', {  message: "" });
});

router.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
router.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).render('404', {message: errMessage } )
})


module.exports = router;
