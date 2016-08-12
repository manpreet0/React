var React = require('react');
var GmailLeft=require('./GmailLeft');
var{Router,Route,browserHistory}= require('react-router');
var InboxComponent = require('./InboxComponent.js');
var SentComponent = require('./SentComponent.js');
var NavChildComponent=require('./NavChildComponent.js');
var ComposeComponent = require('./ComposeComponent.js');
var GmailBox = React.createClass({
  getInitialState: function() {
    return {data: [], inbox: [],sent: [],allMessages: [], MessageDetail: [], sentMessages: [], sentDetail: []};
  },
  gmailLogin: function()
  {
    var acToken, tokenType, expiresIn;
    var OAUTHURL    =   'https://accounts.google.com/o/oauth2/v2/auth?';
    var VALIDURL    =   'https://www.googleapis.com/oauth2/v4/token?access_token=';
    var SCOPE       =   'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly';
    var CLIENTID    =   '760428661217-mdvthi88g7eempefdnrd7rkon8mhtgbn.apps.googleusercontent.com';
    var REDIRECT    =   'http://localhost:8085';
    var TYPE        =   'token';
    var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
    var win         =   window.open(_url, "windowname1", 'width=800, height=600');
    var pollTimer   =   window.setInterval(function()
    {
      try
      {
        if (win.document.URL.indexOf(REDIRECT) != -1)
        {
          window.clearInterval(pollTimer);
          var url =   win.document.URL;
          acToken =   gup(url, 'access_token');
          tokenType = gup(url, 'token_type');
          expiresIn = gup(url, 'expires_in');
          localStorage.setItem('gToken',acToken);
          localStorage.setItem('gTokenType',tokenType);
          localStorage.setItem('gExprireIn',expiresIn);
          console.log("gToken.."+localStorage.getItem('gToken'));
          console.log("gTokenType.."+localStorage.getItem('gTokenType'));
          console.log("gExprireIn.."+localStorage.getItem('gExprireIn'));
          function gup(url, name) {
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\#&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( url );
            if( results == null )
            return "";
            else
            return results[1];
          }
          win.close();
        }
      }
      catch(e)
      {
        console.log(e);
      }
    }, 500);
  },
  //Function to retreive all labels
  allLabels: function()
  {    that=this;
    var accessToken = localStorage.getItem('gToken');
    $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/manpreetsingh1246%40gmail.com/labels?key={AIzaSyDaG1PEnobBJCEvBfdBiuKVW2d0238Sg0g}',
      dataType: 'json',
      type: 'GET',
      async: false,
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(data)
      {
        that.setState({data:data.labels});

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
    });

  },
  //Function to retreive all messages
  allmessages: function()
  {
    var accessToken = localStorage.getItem('gToken');
    $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/manpreetsingh1246%40gmail.com/messages?labelIds=INBOX&maxResults=10&key={AIzaSyDaG1PEnobBJCEvBfdBiuKVW2d0238Sg0g}',
      dataType: 'json',
      type: 'GET',
      async: false,
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(allMessages)
      {
        var display_data = allMessages.messages
        for(var key in display_data){
          var id = display_data[key].id;
          this.displayInboxMessages(id);
        }
        this.setState({allMessages:this.state.MessageDetail});
        this.state.MessageDetail=[];
        //console.log(id);
      }.bind(this),
      async: false,
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
    });
  },
  //Function display inbox messsages
  displayInboxMessages: function(msg_id){
    var accessToken = localStorage.getItem('gToken');
    $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/manpreetsingh1246%40gmail.com/messages/'+msg_id+'?key={AIzaSyDaG1PEnobBJCEvBfdBiuKVW2d0238Sg0g}',
      dataType: 'json',
      type: 'GET',
      async: false,
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(inbox)
      {
        this.state.MessageDetail.push(inbox);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
    });
  },
  //Function to retreive sent messages
  sentmessages: function()
  {
    var accessToken = localStorage.getItem('gToken');
    $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/manpreetsingh1246%40gmail.com/messages?labelIds=SENT&maxResults=10&key={AIzaSyDaG1PEnobBJCEvBfdBiuKVW2d0238Sg0g}',
      dataType: 'json',
      type: 'GET',
      async: false,
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(sentMessages)
      {
        var display_data1 = sentMessages.messages
        for(var key in display_data1){
          var id = display_data1[key].id;
          this.displaySentMessages(id);
        }
        this.setState({sentMessages:this.state.sentDetail});
        this.state.sentDetail=[];
      }.bind(this),
      async: false,
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
    });
  },
  //Function to display sent messages
  displaySentMessages: function(msg_id){
    var accessToken = localStorage.getItem('gToken');
    $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/manpreetsingh1246%40gmail.com/messages/'+msg_id+'?key={AIzaSyDaG1PEnobBJCEvBfdBiuKVW2d0238Sg0g}',
      dataType: 'json',
      type: 'GET',
      async: false,
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(sent)
      {
        this.state.MessageDetail.push(sent);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
    });
  },
  render: function(){
    return(
      <div>
      <div className="col-sm-2">
      <table className="table table-inbox table-hover" id="table1">
      <tbody>
      <tr><td><a href="#compose-modal"
      data-toggle="modal"
      id="compose-button">Compose</a></td></tr>
      <tr><td><a id="authorize-button" onClick={this.allmessages}>Inbox</a></td></tr>
      <tr><td><a id="authorize-button" onClick={this.sentmessages} >Sent</a></td></tr>
      <tr><td><a id="authorize-button" onClick={this.gmailLogin} >Draft</a></td></tr>
      <tr><td><a id="authorize-button" onClick={this.gmailLogin} >Trash</a></td></tr>
      </tbody>
      </table>
      </div>
      <div className="col-md-10">
      <button id="authorize-button" onClick={this.gmailLogin} className="btn btn-primary pull-right">Login</button>
      <ComposeComponent/>
      <SentComponent sentMessages={this.state.sentMessages} />
      <InboxComponent allMessages={this.state.allMessages} />

      </div>
      </div>
    );
  }
});
module.exports=GmailBox;
