const fs = require('fs'); // Lets the applicaton write to files

const electron = require('electron');   // include electron
const ui = electron.app;                // give access to electron functions

const BrowserWindow = electron.BrowserWindow;   // electron window functions
const ipc = electron.ipcMain;                   // talk between the electron threads

const path = require('path'); // used by electron to load html files
const url = require('url');   // used by electron to load html files

const express = require('express');         // Includes the Express source code
const bodyParser = require('body-parser');  // Express middle-ware that allows parsing of post bodys
const hbs = require('hbs');                 // hbs is a Handlebars template renderer for Express

let mainwindow;      // main window variable
var app = express(); // Active express object

var server = require('http').createServer(app); // use the electron server to create a sockets io server
var io = require('socket.io')(server);          // create the sockets io server

ipc.on('player-control', function(event, message) { // listens for the player-control message from the update.js file
    if (message === 'play') {
        io.sockets.emit('play');        // send a play message to all clients
    } else if (message === 'pause') {
        io.sockets.emit('pause');       // send a pause message to all clients
    }
})

function createWindow() {
    mainwindow = new BrowserWindow({width: 800, height: 600}); // initalize the main gui window

    mainwindow.loadURL(url.format({ // load the html file that acts as the ui
        pathname: path.join(__dirname, 'ui/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainwindow.on('closed', function() { // reset the window object when it is closed
        mainwindow = null;
    });
}

ui.on('ready', createWindow); // when the application is ready create the mainwindow

ui.on('window-all-closed', function() { // if this is running on a mac closing all the windows does not kill the application
    if (process.platform !== 'darwin')
        ui.quit();
});

app.on('activate', function() { // the application is focused create the mainwindow
    if (mainwindow === null)
        createWindow();
});

io.sockets.on('connection', function(socket) { // listen for a device connection to the server
    console.log(" ---> Device connencted");
});

app.use(express.static('public')); // put static files in the public folder to make them available on web pages
app.use(bodyParser.urlencoded({ extended: false })); // Tells express to use body parser

app.set('view-engine', 'hbs'); // Tells Express to render templates with handlebars

app.get('/', function (req, res) {
    res.send('Hello, World!'); // Root URL
});

app.get('/test', function(req, res) {
    res.setHeader('Content-Type', 'application/json'); // Tells the browser that the response is JSON
    res.send('[{"Test": "Hello, World!"}]');           // Send a JSON string
});

app.get('/dash', function(req, res) {
    res.render('dash.hbs', {title: "DASH Player", src: req.query.src}, function(err, html) { // render the dash playback file using the title and src variables to setup page
        res.status(200);
        res.send(html);
    });
});

app.post('/tel', function(req, res) {
    mainwindow.webContents.send('async-body', req.body); // send the async-body message to the rendering thread
    res.send(); //send an empty response to stop clients from hanging
    console.log(req.body); //this posts it to the content to the console as well
});

server.listen(3000); // Socket.io port (hides express inside)
