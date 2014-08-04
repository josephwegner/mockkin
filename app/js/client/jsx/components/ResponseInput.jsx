/**
 * @jsx React.DOM
**/

var ResponseInput = React.createClass({
  getInitialState: function() {
    return {
      response: ""
    }
  },
  render: function() {
    return (
      <textarea 
        ref="response"
        className="response-input" 
        onChange={this.handleChange}></textarea>
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
