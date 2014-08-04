/**
 * @jsx React.DOM
**/

var ResponseInput = React.createClass({displayName: 'ResponseInput',
  getInitialState: function() {
    return {
      response: ""
    }
  },
  render: function() {
    return (
      React.DOM.textarea( 
        {ref:"response",
        className:"response-input", 
        onChange:this.handleChange})
    );
  },
  handleChange: function(e) {
    var newValue = this.refs.response.getDOMNode().value.trim()

    if(newValue !== this.state.response) {
      this.state.response = newValue;
      this.props.onChange(this.state.response);
    }
  }
});
