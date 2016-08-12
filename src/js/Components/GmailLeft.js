var React=require("react");
var GmailLeft1 =require('./GmailLeft1');
var GmailLeft = React.createClass({
 render: function() {
     var rows = [];
    this.props.data.forEach(function(data) {
    if(data.name==="INBOX"||data.name==='SENT'||data.name==='TRASH'||data.name==="IMPORTANT"||data.name==="DRAFT")
    {
      rows.push(<GmailLeft1 data={data}key={data.name} />);
    }
   });
    return (
      <table>
      <tbody>{rows}</tbody>
      </table>
    );
 }
});
module.exports=GmailLeft;
