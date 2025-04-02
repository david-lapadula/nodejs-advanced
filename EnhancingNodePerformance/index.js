const express = require('express');
const cluster = require('cluster');
const app = express();

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // cause index.js to be executed *again* in child mode
    // add more .fork() for more instances
    cluster.fork();
} else {
    // Child mode, just act like a server
    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) {}
    }

    app.get('/', (req, res) => {
        doWork();
        res.send('Normal');
    });

    app.get('/fast', (req, res) => {
        res.send('Fast');
    });
    
    
    app.listen(3000);
}