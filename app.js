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
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    //set object to sent data to MailChimp using keys they will recognise
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    //they need to receive data in a string format, so we'll use stringify to have a JSON
    const jsonData = JSON.stringify(data); //-> what will be send to MailChimp

    const url = "https://us5.api.mailchimp.com/3.0/lists/192b6d7ef0";

    const options = {
        method: "POST",
        auth: "lauras:6bb505f3ef5685012fb0ba1f8eae9112-us5" //-> mailchimp docs saythe user name is what we want but the pass is the key 

    }

    const request = https.request(url, options, function(response) {
       response.on("data", function(data) {
           console.log(JSON.parse(data));
       })
    })
    request.write(jsonData);
    request.end();
});


app.listen(port, () => {
    console.log(`Server listenning at ${port}`);
});


//API Key - MAilChimp
//6bb505f3ef5685012fb0ba1f8eae9112-us5

//Audience ID 
//192b6d7ef0