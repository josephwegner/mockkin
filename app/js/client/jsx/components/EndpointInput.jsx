/**
 * @jsx React.DOM
**/

var EndpointInput = React.createClass({
  getInitialState: function() {
    return {
      url: ""
    }
  },
  render: function() {
    return (
      <input 
        ref="url"
        type="text" 
        name="endpoint" 
        className="endpoint-input" 
        onChange={this.handleChange} />
    );
  },
  handleChange: function(e) {
    var newValue = this.refs.url.getDOMNode().value.trim()

    if(newValue !== this.state.url) {
      this.state.url = newValue;
      this.props.onChange(this.state.url);
    }
  }
});
