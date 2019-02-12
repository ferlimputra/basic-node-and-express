
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const MESSAGE_STYLE = process.env.MESSAGE_STYLE;

// --> 7)  Mount the Logger middleware here
app.use("/", (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
}); 
app.use("/", bodyParser.urlencoded({
  extended: false
}));

// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
/*app.get("/", (req, res) => {
  res.send("Hello Express");
});*/

/** 3) Serve an HTML file */
const path = __dirname + "/views/index.html";
console.log(path);

app.get("/", (req, res) => {
  res.sendFile(path);
});

/** 4) Serve static assets  */
const assetPath = __dirname + "/public";
app.use("/", express.static(assetPath));

/** 5) serve JSON on a specific route */
const applyStyle = (message = '') => {
  switch (MESSAGE_STYLE) {
    case "uppercase":
      return message.toUpperCase();
    
    default:
      return message;
  }
};

app.get("/json", (req, res) => {
  const json = {
    message: applyStyle("Hello json")
  };
  res.json(json);
});

/** 6) Use the .env file to configure the app */
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get("/now", (req, res, next) => {
  console.log("now middleware - adding time");
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({
    time: req.time
  });
});

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word
  });
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res) => {
  const name = req.query.first + " " + req.query.last;
  res.json({
    name: name
  });
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post("/name", (req, res) => {
  const name = req.body.first + " " + req.body.last;
  res.json({
    name: name
  });
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
