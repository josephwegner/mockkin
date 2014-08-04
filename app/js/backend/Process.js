// Requires
var http = require('http');
var events = require('events');

//Object

var Process = function() {
  this.serverActive = false;
  this.server = http.createServer(this.handleRequest.bind(this));
  this.path = "";
  this.response = "";
  this.expectedClose = false;

  events.EventEmitter.call(this);
};

Process.prototype.__proto__ = events.EventEmitter.prototype;

Process.prototype.start = function(port) {
  if(typeof(port) === "undefined") {
    throw Error("Port must be defined");
  }

  if(this.serverActive) {
    throw Error("Process is already started");
  }
  
  console.log("starting process on port " + port);

  this.server.listen(port);
  this.server.on('close', this.handleClose.bind(this));
  this.serverActive = true; 
}

Process.prototype.stop = function() {
  if(!this.serverActive) {
    throw Error("Process is not started");
  }

  this.server.close()

  this.serverActive = false;
};

Process.prototype.handleClose = function() {
  if(this.expectedClose) {
    this.emit("close");
  } else {
    this.emit("crash");
  }
};

Process.prototype.handleRequest = function(req, res) {
  console.log("got request", req.url, this.path);

  var path = req.url.replace("/", "");

  if(path === this.path) {
    res.end(this.response);
  } else {
    res.statusCode = 404;
    res.end();
  }
}

Process.prototype.running = function() {
  return this.serverActive;
};

Process.prototype.setResponsePath = function(path) {
  this.path = path;

  console.log("Path updated to " + path);
}

Process.prototype.setResponse = function(response) {
  this.response = response;

  console.log("response updated");
}

module.exports = exports = Process
