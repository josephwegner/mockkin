/**
 * @jsx React.DOM
**/

var ProcessManager = React.createClass({
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
            <div className="server-manager">
              <EndpointInput onChange={this.changeEndpoint} running={this.state.running} />
              <ProcessToggler onClick={this.toggleProcess} />
              <br />
              <ResponseInput onChange={this.changeResponse} />
            </div>            
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
    startProcess: function() {
      this.process = window.listener.addProcess(this.state.port, this.state.path, this.state.response);
      this.setState({running: true});
    }
});

