const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs'); // this engine requires the fs module
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require("path");
const config = require('../server/config')()
const router = require('../server/router')

const app = express();


app.use(cors())
app.options('*', cors())



// define template engine aka App 
console.log(config.DB_URI );
mongoose.connect(config.DB_URI, { useNewUrlParser: true } )



app.engine('html', function (filePath, options, callback) { 
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
        const formatMessage = ({ message, values = {} }) => {
            return new Function(...Object.keys(values), `return \`${message}\``)(...Object.values(values));
        };

    const rendered = formatMessage({
      message: content.toString(),
      values:  options
    });

    return callback(null, rendered);
  });
});

app.use(express.static("./server/public"));

app.set('views', './server/views'); // specify the views directory
app.set('view engine', 'html'); // register the template engine


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', router)

 

const listener = app.listen(process.env.PORT || 3001,process.env.HOST, 511, () => {

  console.log('Your app is listening on port ' + listener.address().port)
})

