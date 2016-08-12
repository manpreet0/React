var React = require('react');
var SentRowComponent = React.createClass({
  render: function() {
    return (
      <tr>
      <td>{this.props.msgFrom}</td>
      <td>{this.props.subject}</td>
      <td>{this.props.date}</td>
      </tr>
    );
  }
});
module.exports = SentRowComponent;
