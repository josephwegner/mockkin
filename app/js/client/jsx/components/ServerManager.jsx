/**
 * @jsx React.DOM
**/

var ServerManager = React.createClass({
    render: function() {
          return (
            <div className="server-manager">
              <EndpointInput />
              <ProcessToggler onClick={this.toggleServer} />
            </div>            
          );
    },
    processRunning: false,
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
      window.listener.addProcess(this.props.process, this.props.port);
      this.processRunning = true;
    }
});

