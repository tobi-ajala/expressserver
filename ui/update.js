//these are the javascript commands that are getting the updated values
const ipc = require('electron').ipcRenderer; // Picks up messages sent through electrons internal IPC functions

// listen for the async-body event
ipc.on('async-body', function(event, message) {
    document.getElementById('abort').innerHTML = message.abort; // change the content inside the abort element
    document.getElementById('canplay').innerHTML = message.canplay;
    document.getElementById('canplaythrough').innerHTML = message.canplaythrough;
    document.getElementById('durationchange').innerHTML = message.durationchange;
    document.getElementById('emptied').innerHTML = message.emptied;
    document.getElementById('encrypted').innerHTML = message.encrypted;
    document.getElementById('ended').innerHTML = message.ended;
    document.getElementById('error').innerHTML = message.error;
    document.getElementById('interruptbegin').innerHTML = message.interruptbegin;
    document.getElementById('interrupted').innerHTML = message.interrupted;
    document.getElementById('loadeddata').innerHTML = message.loadeddata;
    document.getElementById('loadedmetadata').innerHTML = message.loadedmetadata;
    document.getElementById('loadstart').innerHTML = message.loadstart;
    document.getElementById('pause').innerHTML = message.pause;
    document.getElementById('play').innerHTML = message.play;
    document.getElementById('playing').innerHTML = message.playing;
    document.getElementById('progress').innerHTML = message.progress;
    document.getElementById('ratechange').innerHTML = message.ratechange;
    document.getElementById('seeked').innerHTML = message.seeked;
    document.getElementById('seeking').innerHTML = message.seeking;
    document.getElementById('stalled').innerHTML = message.stalled;
    document.getElementById('suspend').innerHTML = message.suspend;
    document.getElementById('timeupdate').innerHTML = message.timeupdate;
    document.getElementById('waiting').innerHTML = message.waiting;
});

function startPlayback() {
    ipc.send('player-control', 'play'); // sends the player-control event with play as the message
}

function pausePlayback() {
    ipc.send('player-control', 'pause')    // sends the player-control event with play as the message
}
