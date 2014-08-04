window.listener = require('../js/backend/Listener.js');
var Process = require('../js/backend/Process.js');

var mainProcess = new Process();

React.renderComponent(
    ServerManager({port: 8080, process: mainProcess }),
      document.getElementById('content')
);

