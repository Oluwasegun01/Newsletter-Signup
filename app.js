const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                ststus: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/a9b68f0b03"
    const options = {
        method: "POST",
        auth: "oluwasegun:86b1adbfa56ba1b5e805f10e65fd86f9-us10"
    }
   const request =  https.request(url, options, function(response) {
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.listen(3000, function(){
    console.log("Server started at Port 3000");
});

//API Key
//f99ae7473cf0e53a0c2292b96d29e9c6-us10
//86b1adbfa56ba1b5e805f10e65fd86f9-us10

//List ID
//a9b68f0b03