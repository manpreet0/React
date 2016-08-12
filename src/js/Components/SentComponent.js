var React = require('react');
var SentRowComponent = require('./SentRowComponent.js');
var SentComponent = React.createClass({
 render: function() {
   var rows = [];
   var subject,msgto,date;
     this.props.sentMessages.forEach(function(message) {
         for(var headerIndex=0;headerIndex < message.payload.headers.length;headerIndex++){
         if(message.payload.headers[headerIndex].name == "Subject"){
           subject = message.payload.headers[headerIndex].value;
         }
         if(message.payload.headers[headerIndex].name == "To"){
           msgFrom = message.payload.headers[headerIndex].value;
           var fields = msgFrom.split(/</);
           msgFrom = fields[0];
         }
        if(message.payload.headers[headerIndex].name == "Date"){
           date = message.payload.headers[headerIndex].value;
         }
       }
   rows.push(<SentRowComponent msgto={msgto} subject={subject} date={date} key={message.id} />);
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
module.exports = SentComponent;
