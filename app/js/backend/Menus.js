// Load native UI library
var gui = window.require('nw.gui');

var menu = new gui.Menu({type: "menubar"});

var devMenuItem = new gui.MenuItem({ label: "Developer" });

var devMenu = new gui.Menu();
devMenu.append(new gui.MenuItem({ 
  label: "Dev Tools",
  click: function() {
    gui.Window.get().showDevTools();
  }
}));
devMenu.append(new gui.MenuItem({
  label: "Refresh",
  click: function() {
    window.location.reload();
  }
}));
devMenuItem.submenu = devMenu;

menu.append(devMenuItem);

gui.Window.get().menu = menu;

