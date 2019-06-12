const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = require('express')();
const request = require('request');

app.use(cors());

app.use('/', (req, res) => {
    try {
        var parts = req.url.split('?');
        var queryString = parts[1];
        var updatedPath = parts[0];
        const path = (updatedPath + '?key=' + process.env.authKey + (queryString ? '&' + queryString : ''));
        console.log('Forwarding to: ' + process.env.baseUrl + path);
        request(process.env.baseUrl + path, (error, response, body) => {
            console.log('Response Status: ' + response.statusCode + ' ' + response.statusMessage);
            if (!error && response.statusCode === 200) {
                res.contentType(response.headers["content-type"]);
                res.send(body);
            }
            else if(!error) {
                res.sendStatus(response.statusCode);
            }else{
                console.log(error);
                res.sendStatus(500);
            }
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

app.listen(process.env.PORT);
console.log('App listening on Port ' + process.env.PORT);