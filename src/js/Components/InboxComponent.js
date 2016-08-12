var React = require('react');
var RowComponent = require('./InboxComponentGrand.js');
var InboxComponent = React.createClass({
  render: function() {
    var rows = [];
    var subject,msgFrom,date;
    this.props.allMessages.forEach(function(message) {
      for(var headerIndex=0;headerIndex < message.payload.headers.length;headerIndex++){
        if(message.payload.headers[headerIndex].name == "Subject"){
          subject = message.payload.headers[headerIndex].value;
        }
        if(message.payload.headers[headerIndex].name == "From"){
          msgFrom = message.payload.headers[headerIndex].value;
          var fields = msgFrom.split(/</);
          msgFrom = fields[0];
        }
        if(message.payload.headers[headerIndex].name == "Date"){
          date = message.payload.headers[headerIndex].value;
        }
      }
      rows.push(<RowComponent msgFrom={msgFrom} subject={subject} date={date} key={message.id} />);
    });
    return (
      <div>
      <table className="table table-inbox table-hover">
      <tbody>{rows}</tbody>
      </table>
      </div>
    );
  }
});
module.exports = InboxComponent;
