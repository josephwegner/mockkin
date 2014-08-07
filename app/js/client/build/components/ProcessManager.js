/**
 * @jsx React.DOM
**/

var ProcessManager = React.createClass({displayName: 'ProcessManager',
    getInitialState: function() {
      return {
        port: 8080,
        running: false,
        endpoints: [
          {
            path: "",
            response: "",
            key: "endpoint-"+ Math.floor(Math.random() * 1000000)
          }
        ]
      };
    },
    render: function() {
      var self = this;
    
      var endpointNodes = this.state.endpoints.map(function(endpoint) {
        return (
          EndpointConfig( 
            {onChange:self.changeEndpoint, 
            onRemove:self.removeEndpoint,
            key:endpoint.key} )
        );
      });

      return (
        React.DOM.div( {className:"server-manager"}, 
          ProcessToggler( {onClick:this.toggleProcess, running:this.state.running} ),
          React.DOM.br(null ),
          endpointNodes,
          React.DOM.br(null ),
          React.DOM.button( {onClick:this.addEndpoint}, "Add Endpoint")
        )            
      );
    },
    addEndpoint: function() {
      var endpoints = this.state.endpoints;
      endpoints.push({
        path: "",
        response: "",
        key: "endpoint-" + Math.floor(Math.random() * 1000000)
      });
      this.setState({endpoints: endpoints});
    },
    removeEndpoint: function(key) {
      var endpoints = this.state.endpoints;
      var index = false;
        
      for(var i=0,max=endpoints.length; i<max; i++) {
        if(endpoints[i].key === key) {
          index = i;
          break;
        }
      }

      if(index !== false) {
        endpoints.splice(index, 1);
        this.setState({endpoints: endpoints}, this.updateProcessEndpoints);
      }
    },
    changeEndpoint: function(endpoint, key) {
     var endpoints = this.state.endpoints;
     endpoint.key = key;

     for(var i=0,max=endpoints.length; i<max; i++) {
      if(endpoints[i].key === key) {
        endpoints[i] = endpoint;
        break;
      }
     }

     this.setState({endpoints: endpoints}, this.updateProcessEndpoints);
    },
    updateProcessEndpoints: function() {
      if(this.isProcessRunning()) {
        this.process.updateEndpoints(this.buildProcessOptions().endpoints); 
      }
    },
    buildProcessOptions: function() {
      return {
        port: this.state.port,
        endpoints: this.state.endpoints
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

