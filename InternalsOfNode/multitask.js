const crypto = require('crypto');
const https = require('https');
const fs = require('fs');

const start = Date.now();

function doRequest() {
    https
        .request('https://www.google.com', res => {
            res.on('data', () => { });
            res.on('end', () => {
                console.log('Request:', Date.now() - start);
            })
        })
        .end();
}

function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start);
    });
}

// Uses OS, outside of threadpool
doRequest();


/*
   -  Node has 4 threads. Starts with 1 for fs module and 3 for hash
   - Thread with fs will pick up new task when fs reaches out to HD for file info
   - One hash will finish first. Once itd done, that thread will pick the waiting fs task, and finish second
   - Increasing threads, fs task will finish first because has dedicated thread
 */
fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS:', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();