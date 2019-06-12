const dotenv = require('dotenv');
dotenv.config();
const app = require('express')();
const request = require('request');

app.use('/', (req, res) => {
    var parts = req.url.split('?');
    var queryString = parts[1];
    var updatedPath = parts[0];
    const path = (updatedPath + '?key=' + process.env.authKey + (queryString ? '&' + queryString : ''));
    console.log(process.env.baseUrl + path);
    request(process.env.baseUrl + path, (error, response, body) => {
        console.log(response.url);
        if (!error && response.statusCode === 200) {
            res.contentType(response.headers["content-type"]);
            //console.log(body);
            res.send(body);
        }
        else {
            console.log(error);
            res.sendStatus(404);
        }
    });
});

app.listen(process.env.PORT);
console.log('App listening on Port ' + process.env.PORT);