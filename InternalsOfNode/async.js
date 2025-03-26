const https = require('https');

const start = Date.now();


function doRequest() {
    // more commplex than normal netowrking libraries
    https
        .request('https://www.google.com', res => {
            res.on('data', () => { });
            res.on('end', () => {
                console.log(Date.now() - start);
            })
        })
        .end();
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();