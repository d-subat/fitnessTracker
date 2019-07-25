const router = require('express').Router();
const model = require('./model');



// show user
router.post('/api/exercise/user', model.showUser);
// update new user
router.post('/api/exercise/update-user', model.updateUser);

//deleteUser
router.post('/api/exercise/delete-user', model.deleteUser);

// show all activity
router.get('/api/exercise/activity', model.showActivity);

// add new activity
router.post('/api/exercise/add-activity', model.addActivity);

//delete activity
router.post('/api/exercise/delete-activity', model.deleteActivity);


// show users exercises
router.get('/api/exercise/exercises', model.showExercises);

//Add exercise
router.post('/api/exercise/add-exercise', model.addExercise);

//delete Exercise
router.post('/api/exercise/delete-exercise', model.deleteExercise);



// define the home page route
router.get('/', (req, res) => {
  res.render('index', {  message: "" });
});

router.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})
/*
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
*/

module.exports = router;
