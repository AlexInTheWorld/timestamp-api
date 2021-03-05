var express = require('express');
var app = express();

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
})

app.get("/api/timestamp/:date_string", (req, res) => {
  var date_input = req.params.date_string;
  var err_msg = {"error": "Invalid Date"};
  if (/^\d{4}-\d{2}-\d{2}$/.test(date_input)) {
    var date_object = new Date(date_input);
    if (date_object.toUTCString() != "Invalid Date") {
      res.send({"unix": date_object.getTime(), "utc": date_object.toUTCString()});
    } else {
      res.send(err_msg);
    }
  } else if (/^\d{1,}\d$/.test(date_input)) {
    var date_object = new Date(Number(date_input));
    if (date_object.toUTCString() != "Invalid Date") {
      res.send({"unix": date_object.getTime(), "utc": date_object.toUTCString()});
    } else {
      res.send(err_msg);
    }
  } else {
    res.send(err_msg)
  } 
})

app.get("/api/timestamp", (req, res) => {
  var date = new Date()
  res.json({"unix": Date.now(), "utc": date.toUTCString()})
})

app.get("/*", (req, res) => {
  res.render("not_found");
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening on port: ' + process.env.PORT);
});
