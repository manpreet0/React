var React=require("react");
var GmailRightSideGrand =require('./GmailRightSideGrand');
var GmailRightSideChild = React.createClass({
 render: function() {
     var rows = [];
    this.props.id.forEach(function(data) {
    for (var i=0;i<=1;i++)
    {
      rows.push(<GmailRightSideGrand data={data} key={data.id} />)
    }
   });
    return (
      <table>
      <thead>
      <tr>Name</tr>
      <tr>Subject</tr>
      <tr>Date</tr>
      </thead>
      <tbody>{rows}</tbody>
      </table>
    );
 }

});
module.exports=GmailRightSideGrand;
