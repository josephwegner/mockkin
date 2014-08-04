// Requires
var http = require('http');

//Object

var Process = function() {
  this.serverActive = false;
  this.server = http.createServer(this.handleRequest.bind(this));
  this.path = "";
  this.response = "";
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

  this.server.close()

  this.serverActive = false;
};

Process.prototype.handleRequest = function(req, res) {
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
}

Process.prototype.setResponse = function(response) {
  this.response = response;
}

module.exports = exports = Process
