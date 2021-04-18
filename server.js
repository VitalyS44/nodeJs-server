const express = require('express');
const request = require('request');
const path = require('path');
const router = express.Router();

// константы
const port = 8080;
const host = '0.0.0.0';

// приложение
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static(__dirname + '/public'));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.get('/jokes/random', (req, res) => {
    request(
        { url: 'https://pos.gosuslugi.ru/filters' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }

            res.header('Content-Type: application/json');
            res.json(JSON.parse(body));
        }
    )
});

app.use('/', router);

app.listen(port, host);
console.log(`running on http://${host}:${port}`);