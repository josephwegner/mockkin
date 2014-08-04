/**
 * @jsx React.DOM
**/

var ProcessToggler = React.createClass({displayName: 'ProcessToggler',
  render: function() {
    return (
      React.DOM.button( {onClick:this.handleClick, className:"process-toggler"}, "Start Server")  
    );
  },
  handleClick: function(e) {
    if(typeof(this.props.onClick) === "function") {
      this.props.onClick(e);
    }
  }
});
