const express = require('express');
const app = express();
const port = 3000;
const https = require("https");
const request = require("request");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

//for signup page 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    console.log(firstName, lastName, email);
});


app.listen(port, () => {
    console.log(`Server listenning at ${port}`);
});