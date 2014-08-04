var Process = require('./Process');

var Listener = function() { 
  this.portProcesses = {}
};

Listener.prototype.addProcess = function(options) {
  if(typeof(options) !== "object") {
    options = {}
  }

  var process = new Process(options);

  if(typeof(this.portProcesses[process.options.port]) !== "undefined") {
    throw Error("Port "+process.options.port+" is already in use!");
  }

  this.portProcesses[process.options.port] = process;

  process.start();

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
