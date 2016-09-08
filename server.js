// Include the cluster module
const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cpuCount = require('os').cpus().length;
var AWS = require('aws-sdk');

// Code to run if we're in the master process
if (cluster.isMaster) {
    // Count the machine's CPUs

    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', (worker) => {
        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });
// Code to run if we're in a worker process
} else {
    const app = express();
    AWS.config.region = process.env.REGION

    var sns = new AWS.SNS();
    var ddb = new AWS.DynamoDB();

    var ddbTable =  process.env.STARTUP_SIGNUP_TABLE;
    var snsTopic =  process.env.NEW_SIGNUP_TOPIC;
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(express.static(path.join(__dirname, 'dist')));

    // app.use('/dist', express.static('dist') );
    // app.use(express.static(path.resolve(__dirname, '..', 'dist')));

    app.get('/', (req, res) => {
        res.render('index.html.ejs', {
            static_path: 'dist',
            theme: process.env.THEME || 'flatly',
            local_debug: (app.settings.env === 'development'),
            title: 'hello world',
        });
    });

    // app.get('*', function response(req, res) {
    //     res.sendFile(path.join(__dirname, 'views/index.html'));
    // });

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(app.settings.env + ': Server running at http://127.0.0.1:' + port + '/');
    });
}

// //lets require/import the mongodb native drivers.
// var mongodb = require('mongodb');
//
// //We need to work with "MongoClient" interface in order to connect to a mongodb server.
// var MongoClient = mongodb.MongoClient;
//
// // Connection URL. This is where your mongodb server is running.
// var url = 'mongodb://ec2-52-90-7-207.compute-1.amazonaws.com:27017/pdlsite';
//
// // Use connect method to connect to the Server
// // Use connect method to connect to the Server
// MongoClient.connect(url, function (err, db) {
//    if (err) {
//        console.log('Unable to connect to the mongoDB server. Error:', err);
//    } else {
//        //HURRAY!! We are connected. :)
//        console.log('Connection established to', url);
//
//        // Get the documents collection
//        var collection = db.collection('users');
//
//        //Create some users
//        var user1 = {name: 'test admin', roles: ['user']};
//        var user2 = {name: 'test user', roles: ['user']};
//
//        // Insert some users
//        collection.insert([user1, user2], function (err, result) {
//            if (err) {
//                console.log(err);
//            } else {
//                console.log('Inserted %d documents into the "users" collection. '
//                    + 'The documents inserted with "_id" are:', result.length, result);
//            }
//            //Close connection
//            db.close();
//        });
//    }
// });
