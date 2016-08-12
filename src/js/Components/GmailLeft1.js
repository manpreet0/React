  var React=require("react");
var GmailLeft1 = React.createClass({
  render: function(){
    return(
      <div>

   <ul className="nav navbar-nav">
  <li className="active"><a href="#">{this.props.data.name}</a></li>

   </ul>
   </div>


);
}
});
module.exports=GmailLeft1;
