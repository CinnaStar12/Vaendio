// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");

const http = require("http");
const socketio = require("socket.io");
const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
  console.log("Someone connected")
  socket.emit('messageFromServer',{data:"Welcome"});
  socket.on('messageToServer',(dataFromClient)=>{
      console.log(dataFromClient)
  })
  socket.on('newMessageToServer',(msg)=>{
      io.of('/').emit('messageToClients',{text:msg.text})
  })
  setTimeout(()=>{
      io.of('/admin').emit('welcome',"Welcome to the admin channel, from the main channel!")
  },2000)
})

io.of('/admin').on('connection',(socket)=>{
  console.log("Someone connected to the admid!")
  io.of('/admin').emit('welcome',"Welcome to the admin channel!");
})


// Requiring passport as we've configured it 
var passport = require("./config/passport");
var dotenv = require("dotenv")
dotenv.config();
// Setting up port and requiring models for syncing
// var PORT = process.env.PORT || 9080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
// var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Requiring our routes
require("./routes/html-routes.js")(app);
// eslint-disable-next-line no-undef
require("./routes/api-routes.js")(app);

  

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  // const expressServer = 
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });

});
