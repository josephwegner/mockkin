/**
 * @jsx React.DOM
**/

var ProcessToggler = React.createClass({
  render: function() {
    var buttonState = this.props.running ? "Stop" : "Start";

    return (
      <button onClick={this.handleClick} className="process-toggler">{buttonState} Server</button>  
    );
  },
  handleClick: function(e) {
    if(typeof(this.props.onClick) === "function") {
      this.props.onClick(e);
    }
  }
});
