 
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const helmet = require("helmet");
const cors = require("cors");
var port = process.env.PORT || 3000;


app.use(helmet());
app.use(cors())

var confessions = []

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/confessions', (req, res) => {
    res.json(confessions)
});

io.on('connection', (socket) => {
    socket.on('add confession', (confession) => {
        confessions.push(confession);
        io.emit('add confession', confession);
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});