// Requires
var http = require('http');

//Object

var Process = function() {
  this.serverActive = false;
  this.server = http.createServer(this.handleRequest.bind(this));
};

Process.prototype.start = function(port) {
  if(typeof(port) === "undefined") {
    throw Error("Port must be defined");
  }

  if(this.serverActive) {
    throw Error("Process is already started");
  }

  this.server.listen(port);
  this.serverActive = true; 
}

Process.prototype.stop = function() {
  if(!this.serverActive) {
    throw Error("Process is not started");
  }

  this.serverActive = false;
};

Process.prototype.handleRequest = function(req, res) {
  res.end("It worked!");
}

Process.prototype.running = function() {
  return this.serverActive;
};

module.exports = exports = Process
