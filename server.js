// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
const path = require('path')
const http = require("http");
const socketio = require("socket.io");
const Filter = require('bad-words');
const app = express();

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = socketio(server);
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


io.on('connection',(socket) => {

  socket.emit('message', 'Welcome!')
  socket.broadcast.emit('message', 'joined')

  socket.on('sendMessage', (message, callback)=>{
    const filter = new Filter()
    if (filter.isProfane(message)){
      return callback('Profanity is not allowed!')
    }
    io.emit('message', message)
    callback('Delivered');
  })

  socket.on('sendLocation', (coords, callback)=> {
    io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    callback()
  })

  socket.on('disconnect', ()=>{
    io.emit('message','left')
  })
})
// Requiring passport as we've configured it 
var passport = require("./config/passport");
var dotenv = require("dotenv")
dotenv.config();
// Setting up port and requiring models for syncing
var db = require("./models");
// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// require("./routes/chat-routes.js")(app);
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
