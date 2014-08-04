// Requires
var http = require('http');
var events = require('events');
var extend = require('extend');

// Defaults
var defaultProcess = {
  port: 8080,
  endpoints: [
    {
      path: "",
      response: "Default Response"
    }
  ]
}

//Object

var Process = function(options) {
  this.serverActive = false;
  this.server = http.createServer(this.handleRequest.bind(this));
  this.expectedClose = false;

  this.options = extend(defaultProcess, options);

  events.EventEmitter.call(this);
};

Process.prototype.__proto__ = events.EventEmitter.prototype;

Process.prototype.start = function() {
  if(this.serverActive) {
    throw Error("Process is already started");
  }
  
  console.log("starting process on port " + this.options.port);

  this.server.listen(this.options.port);
  this.server.on('close', this.handleClose.bind(this));
  this.serverActive = true; 
}

Process.prototype.stop = function() {
  if(!this.serverActive) {
    throw Error("Process is not started");
  }

  this.expectedClose = true;

  this.server.close()

  this.serverActive = false;
};

Process.prototype.handleClose = function() {
  if(this.expectedClose) {
    this.emit("stop");
  } else {
    this.emit("crash");
  }
};

Process.prototype.handleRequest = function(req, res) {
  console.log("got request", req.url, this.path);

  var path = req.url.replace("/", "");

  for(var i=0,max=this.options.endpoints.length; i<max; i++) {
    var endpoint = this.options.endpoints[i];

    console.log(path, endpoint.path);

    if(path === endpoint.path) {
      res.end(endpoint.response);
      return true;
    }
  }

  res.statusCode = 404;
  res.end();

  return false;
}

Process.prototype.running = function() {
  return this.serverActive;
};

Process.prototype.updateEndpoints = function(endpoints) {
  if(typeof(this.options.endpoints.length) === "undefined") {
    throw Error("Endpoints must be an array");
  }

  this.options.endpoints = endpoints;
}

module.exports = exports = Process
