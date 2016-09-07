const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Router = require('react-router');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.get('/favicon.ico', (req, res) => res.send(''));

app.use((req, res) => {
    Router.run(routes, req.path, (Handler) => {
        res.send('<!DOCTYPE html>' +  ReactDOMServer.renderToString(<Handler path={req.path} />));
    });
});

const port = process.env.PORT || 5000;
console.log('listening...' + port);
app.listen(port);
