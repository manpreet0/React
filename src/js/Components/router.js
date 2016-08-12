var React = require('react');
var {render}= require('react-dom');
var{Router,Route,browserHistory}= require('react-router');
var About = require('./components/About');
var ContactUs = require('./components/Contactus');
var App = require('./components/Index');
var router=React.createclass({
render: fuction(){
  return(<Router history={browserHistory}>
     <Route path="/" component={App}>
     <Route path="/About" component={About}/>
     <Route path="/Contactus" component={ContactUs}/>
</Route>
     </Router>);};});
     module.exports=router;
