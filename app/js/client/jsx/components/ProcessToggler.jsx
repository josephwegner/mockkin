/**
 * @jsx React.DOM
**/

var ProcessToggler = React.createClass({
  render: function() {
    return (
      <button onClick={this.handleClick} className="process-toggler">Start Server</button>  
    );
  },
  handleClick: function(e) {
    if(typeof(this.props.onClick) === "function") {
      this.props.onClick(e);
    }
  }
});
