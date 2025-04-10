const express = require('express');
const cluster = require('cluster');
const crypto = require('crypto');
const app = express();

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // cause index.js to be executed *again* in child mode
    // add more .fork() for more instances
    // Every child will have won threadpool, unless modified by UV_THREADPOOL_SIZE = 1, meaning every child only has 1 thread
    // If children > cores system will context switch and slow down overall performance
    cluster.fork();
} else {
    // Child mode, just act like a server

    app.get('/', (req, res) => {
        // simulate server doing work
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Normal');
        })
    });

    app.get('/fast', (req, res) => {
        res.send('Fast');
    });


    app.listen(3000);
}