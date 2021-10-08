const express = require('express');
const app = express();
const port = 3000;
const https = require("https");
const request = require("request");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server listenning at ${port}`);
});