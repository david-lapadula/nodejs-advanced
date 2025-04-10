const express = require('express');
const cluster = require('cluster');
const crypto = require('crypto');
const Worker = require('webworker-threads').Worker;
const app = express();


app.get('/', (req, res) => {

    // Function passed in gets stringified and passed to library. Cannot refer to outside program variables.
    const worker = new Worker(function() {
        // need function keywword to refer to right context and not method context
        this.onmessage = function() {
            let counter = 0;

            while (counter < 1e9) {
                counter++;
            }

            postMessage(counter);
        }
    });

    // Post message back to application
    worker.onmessage = function(message) {
       console.log(message.data);
       res.send(''+  message.data); // express assumes a status code when you send a number
    }

    // Push data into thread
    worker.postmessage = function() {

    }
});

app.get('/fast', (req, res) => {
    res.send('Fast');
});


app.listen(3000);
