/**
 * @jsx React.DOM
**/

var ProcessToggler = React.createClass({displayName: 'ProcessToggler',
  render: function() {
    var buttonState = this.props.running ? "Stop" : "Start";

    return (
      React.DOM.button( {onClick:this.handleClick, className:"process-toggler"}, buttonState, " Server")  
    );
  },
  handleClick: function(e) {
    if(typeof(this.props.onClick) === "function") {
      this.props.onClick(e);
    }
  }
});
