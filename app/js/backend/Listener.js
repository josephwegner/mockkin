var Listener = function() { 
  this.portProcesses = {}
};

Listener.prototype.addProcess = function(process, port) {
  if(typeof(this.portProcesses[port]) !== "undefined") {
    throw Error("Port "+port+" is already in use!");
  }

  this.portProcesses[port] = process;

  process.start(port);
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
