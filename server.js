// Include the cluster module
const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const ddbTable =  process.env.STARTUP_SIGNUP_TABLE;
const snsTopic =  process.env.NEW_SIGNUP_TOPIC;
const app = express();
// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    const cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

// Code to run if we're in a worker process
} else {


    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended:false}));

    app.use(express.static('dist'));
    //app.use(express.static(path.resolve(__dirname, '..', 'dist')));

    app.get('/', function(req, res) {
        res.render('index.html.ejs', {
            static_path: 'dist',
            theme: process.env.THEME || 'flatly',
            local_debug: 'false',
            title: 'test',
            //local_debug: process.env.FLASK_DEBUG || 'false'
        });
    });

    //app.get('*', function response(req, res) {
    //    res.sendFile(path.join(__dirname, 'views/index.html'));
    //});

    const port = process.env.PORT || 3000;

    const server = app.listen(port, function () {
        console.log(app.settings.env + ': Server running at http://127.0.0.1:' + port + '/');
    });
}

////lets require/import the mongodb native drivers.
//const mongodb = require('mongodb');
//
////We need to work with "MongoClient" interface in order to connect to a mongodb server.
//const MongoClient = mongodb.MongoClient;
//
//// Connection URL. This is where your mongodb server is running.
//const url = 'mongodb://ec2-52-90-7-207.compute-1.amazonaws.com:27017/pdlsite';
//
//// Use connect method to connect to the Server
//// Use connect method to connect to the Server
//MongoClient.connect(url, function (err, db) {
//    if (err) {
//        console.log('Unable to connect to the mongoDB server. Error:', err);
//    } else {
//        //HURRAY!! We are connected. :)
//        console.log('Connection established to', url);
//
//        // Get the documents collection
//        const collection = db.collection('users');
//
//        //Create some users
//        const user1 = {name: 'test admin', roles: ['user']};
//        const user2 = {name: 'test user', roles: ['user']};
//
//        // Insert some users
//        collection.insert([user1, user2], function (err, result) {
//            if (err) {
//                console.log(err);
//            } else {
//                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
//            }
//            //Close connection
//            db.close();
//        });
//    }
//});