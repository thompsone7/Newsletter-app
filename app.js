const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;


  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

const jsonData = JSON.stringify(data);

const url = "https://us14.api.mailchimp.com/3.0/lists/6276d07075";

const options = {
  method: "POST",
  auth: "thompson:d6d50d2ca818331d37924d6a71b7fc14-us14"
}

const request = https.request(url, options, function(response){
if (response.statusCode === 200) {
  res.sendFile(__dirname + "/success.html");
}else{
  res.sendFile(__dirname + "/failure.html");
}

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

})

app.post("/failure", function(req, res ){
  res.redirect("/");
})






app.listen(3000,function(){
  console.log("Server is running at port 3000");
})



// APIkey
// d6d50d2ca818331d37924d6a71b7fc14-us14

// List id
// 6276d07075
