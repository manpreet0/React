var React = require('react');
var ReactDOM = require('react-dom');
var NavChildComponent=require('./Components/NavChildComponent');
var GmailBox=require('./Components/GmailBox');
var GmailRightSide= require('./Components/GmailRightSide');
var InboxComponent= require('./Components/InboxComponent');
var {render} = require('react-dom');
var MainComponent = React.createClass({
  render: function(){
    return(
      <div className="container-fluid">
      <NavChildComponent/>
      <div className="container-fluid">
      <div className="row">
      <div className="col-md-12">
      <GmailBox />
      </div>
      </div>
      </div>
      </div>
)
  }
})
render(<MainComponent />,document.getElementById('app'));
