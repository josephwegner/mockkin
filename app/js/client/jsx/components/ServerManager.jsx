/**
 * @jsx React.DOM
**/

var ServerManager = React.createClass({
    getInitialState: function() {
      return {
        path: "",
        response: ""
      };
    },
    render: function() {
          return (
            <div className="server-manager">
              <EndpointInput onChange={this.changeEndpoint} />
              <ProcessToggler onClick={this.toggleServer} />
              <br />
              <ResponseInput onChange={this.changeResponse} />
            </div>            
          );
    },
    processRunning: false,
    changeResponse: function(response) {
      this.state.response = response;

      if(this.processRunning) {
        this.props.process.setResponse(response);
      }
    }, 
    changeEndpoint: function(path) {
     this.state.path = path; 

     if(this.processRunning) {
        this.props.process.setResponsePath(path);
     }
    },
    toggleServer: function(e) {
      if(this.processRunning) {
        this.stopServer();
      } else {
        this.startServer();
      }
    },
    stopServer: function() {
      window.listener.stopPort(this.props.port);
      this.processRunning = false;
    },
    startServer: function() {
      window.listener.addProcess(this.props.process, this.props.port, this.state.path, this.state.response);
      this.processRunning = true;
    }
});

