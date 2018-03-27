// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

mongoose.connect('mongodb://admin:admin@ds151431.mlab.com:51431/nodetodoappscotchio'); // connect to mongoDB database on modulus.io


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());



// define model =================
var Lander = mongoose.model('Lander', {
    id: String,
    name: String,
    url: String
});

//what it should be

//[{"id":"cf49ba13-7c7c-417a-9859-4458f61c5a49","name":"landing page B","url":"http://landingpageB.com"},{"id":"fd3cd7b5-f5eb-4e00-bf0e-f50545dfa4ec","name":"landing page A","url":"http://landerpageA.com"}]




// routes ======================================================================

// api ---------------------------------------------------------------------
// get all landers
app.get('/api/landers', function(req, res) {

    // use mongoose to get all landers in the database
    Lander.find(function(err, landers) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(landers); // return all landers in JSON format
    });
});

// create todo and send back all landers after creation
app.post('/api/landers', function(req, res) {

    // create a lander, information comes from AJAX request from Angular
    Lander.create({
        id: req.body.id,
        name: req.body.name,
        url: req.body.url,
        done: false
    }, function(err, lander) {
        if (err)
            res.send(err);

        // get and return all the landers after you create another
        Lander.find(function(err, landers) {
            if (err)
                res.send(err)
            res.json(landers);
        });
    });

});

// delete a lander
app.delete('/api/landers/:lander_id', function(req, res) {
    Lander.remove({
        _id: req.params.lander_id
    }, function(err, lander) {
        if (err)
            res.send(err);

        // get and return all the landers after you create another
        Lander.find(function(err, landers) {
            if (err)
                res.send(err)
            res.json(landers);
        });
    });
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");