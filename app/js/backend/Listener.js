var Process = require('./Process');

var Listener = function() { 
  this.portProcesses = {}
};

Listener.prototype.addProcess = function(port, path, response) {
  if(typeof(this.portProcesses[port]) !== "undefined") {
    throw Error("Port "+port+" is already in use!");
  }

  var process = new Process();
  this.portProcesses[port] = process;

  process.setResponsePath(path);
  process.setResponse(response);

  process.start(port);

  return process;
};

Listener.prototype.stopPort = function(port) {
  if(typeof(this.portProcesses[port]) === "undefined") {
    throw Error("No process is defined for port "+port);
  }

  if(!this.portProcesses[port].running()) {
    throw Error("Port "+port+" is not running");
  }

  var process = this.portProcesses[port];
  process.stop();

  delete this.portProcesses[port];

  return process;
}

Listener.prototype.portsListening = function() {
  return Object.keys(this.portProcesses);
};

module.exports = exports = new Listener();
