/**
 * @jsx React.DOM
**/

var EndpointConfig = React.createClass({displayName: 'EndpointConfig',
  getInitialState: function() {
    return {
      path: "",
      response: ""
    }
  },
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.input( 
          {ref:"path",
          type:"text", 
          name:"path", 
          className:"path-input", 
          onChange:this.handleChangePath} ),
        React.DOM.textarea(
          {ref:"response",
          name:"response",
          className:"response-input",
          onChange:this.handleChangeResponse} 
        ),
        React.DOM.button( {onClick:this.remove}, "Remove Endpoint")
      )
    );
  },
  remove: function() {
    this.props.onRemove(this.props.key);
  },
  handleChangePath: function(e) {
    var newValue = this.refs.path.getDOMNode().value.trim()

    if(newValue !== this.state.path) {
      this.setState({path: newValue}, this.updateParent);
    }
  },
  handleChangeResponse: function(e) {
    var newValue = this.refs.response.getDOMNode().value.trim()

    if(newValue !== this.state.response) {
      this.setState({response: newValue}, this.updateParent);
    }
  },
  updateParent: function() {
    this.props.onChange({
      path: this.state.path,
      response: this.state.response
    }, this.props.key);
  }
});
