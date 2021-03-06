/**
 * @jsx React.DOM
**/

var ServerManager = React.createClass({displayName: 'ServerManager',
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
              EndpointInput( {onChange:this.changeEndpoint, running:this.state.running} ),
              ProcessToggler( {onClick:this.toggleServer} ),
              React.DOM.br(null ),
              ResponseInput( {onChange:this.changeResponse} )
            )            
          );
    },
    changeResponse: function(response) {
      this.setState({response: response});

      if(this.isProcessRunning()) {
        this.process.setResponse(response);
      }
    }, 
    changeEndpoint: function(path) {
     this.setState({path: path});

     if(this.isProcessRunning()) {
        this.process.setResponsePath(path);
     }
    },
    toggleServer: function(e) {
      if(this.isProcessRunning()) {
        this.stopServer();
      } else {
        this.startServer();
      }
    },
    stopServer: function() {
      window.listener.stopPort(this.state.port);
    },
    isProcessRunning: function() {
      return typeof(this.process) !== "undefined" && this.process.running()
    },
    processClosed: function() {
      console.log("Process closed (expected)");
      delete this.process;
      this.setState({running: false});
    },
    processCrashed: function() {
      console.log("Process closed (unexpected)");
      delete this.process;
      this.setState({running: false});
    },
    startServer: function() {
      this.process = window.listener.addProcess(this.state.port, this.state.path, this.state.response);
      this.setState({running: true});
    }
});

