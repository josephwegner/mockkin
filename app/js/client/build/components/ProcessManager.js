/**
 * @jsx React.DOM
**/

var ProcessManager = React.createClass({displayName: 'ProcessManager',
    getInitialState: function() {
      return {
        path: "",
        response: "",
        port: 8080,
        running: false
      };
    },
    render: function() {
      return (
        React.DOM.div( {className:"server-manager"}, 
          EndpointInput( {onChange:this.changeEndpoint} ),
          ProcessToggler( {onClick:this.toggleProcess, running:this.state.running} ),
          React.DOM.br(null ),
          ResponseInput( {onChange:this.changeResponse} )
        )            
      );
    },
    changeResponse: function(response) {
      this.setState({response: response}, this.updateProcessEndpoints);
    }, 
    changeEndpoint: function(path) {
     this.setState({path: path}, this.updateProcessEndpoints);
    },
    updateProcessEndpoints: function() {
      if(this.isProcessRunning()) {
        this.process.updateEndpoints(this.buildProcessOptions().endpoints); 
      }
    },
    buildProcessOptions: function() {
      return {
        port: this.state.port,
        endpoints: [{
          path: this.state.path,
          response: this.state.response
        }]
      }
    },
    toggleProcess: function(e) {
      if(this.isProcessRunning()) {
        this.stopProcess();
      } else {
        this.startProcess();
      }
    },
    stopProcess: function() {
      window.listener.stopPort(this.state.port);
    },
    isProcessRunning: function() {
      return typeof(this.process) !== "undefined" && this.process.running()
    },
    processStopped: function() {
      console.log("Process closed (expected)");
      delete this.process;
      this.setState({running: false});
    },
    processCrashed: function() {
      console.log("Process closed (unexpected)");
      delete this.process;
      this.setState({running: false});
    },
    startProcess: function() {
      this.process = window.listener.addProcess(this.buildProcessOptions());
  
      this.process.on('stop', this.processStopped);
      this.process.on('crash', this.processCrashed);

      this.setState({running: true});
    }
});

