/**
 * @jsx React.DOM
**/

var EndpointConfig = React.createClass({
  getInitialState: function() {
    return {
      path: "",
      response: ""
    }
  },
  render: function() {
    return (
      <div>
        <input 
          ref="path"
          type="text" 
          name="path" 
          className="path-input" 
          onChange={this.handleChangePath} />
        <textarea
          ref="response"
          name="response"
          className="response-input"
          onChange={this.handleChangeResponse} >
        </textarea>
        <button onClick={this.remove}>Remove Endpoint</button>
      </div>
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
