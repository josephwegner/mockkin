setTimeout(windowReady, 0);

function windowReady() {
  console.log("node-webkit version: "+process.versions['node-webkit']);
  require('./Menus.js');
  window.listener = require('./Listener.js');
}
