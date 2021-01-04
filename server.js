const express = require("express");
const cors = require('cors')
// const mongoose = require('mongoose')
const mongo = require("mongodb");
const bodyParser = require("body-parser");
const mongoClient = mongo.MongoClient;
const port = process.env.PORT || 3000;
const mongoUrl =
  "mongodb+srv://roomexp:Room@1234@cluster0.cqtkp.mongodb.net/room-expenditure?retryWrites=true&w=majority";
const app = express();
let db;

//middlewares
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

//home api
app.get("/", (req, res) => {
  res.send("hii server is running");
});
// api to add expenditure for a person
app.post("/addpersonexp", (req, res) => {
  let data = req.body;
  console.log(data);
  db.collection("expenditure").insertOne(data);
  res.send("data added successfully");
});
//api to get expenditure for specific person
app.get("/getpersonexp", (req, res) => {
  let querry = {}
    if(req.query.name)
        querry={name:req.query.name}
    
    db.collection("expenditure")
    .find(querry)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});


//connect to mongodb
mongoClient.connect(mongoUrl, (err, connection) => {
  if (err) throw err;
  db = connection.db("room-expenditure");

  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});
