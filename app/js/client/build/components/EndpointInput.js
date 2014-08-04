/**
 * @jsx React.DOM
**/

var EndpointInput = React.createClass({displayName: 'EndpointInput',
  render: function() {
    return (
      React.DOM.input( {type:"text", name:"endpoint", className:"endpoint-input"} )
    );
  }
});
