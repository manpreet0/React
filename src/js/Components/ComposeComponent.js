var React = require("react");
var ComposeComponent=React.createClass({
   compose_msg: function()
     {
        var accessToken = localStorage.getItem('gToken');
        var to = document.getElementById('email');
        var subject = document.getElementById('subject');
        var message = document.getElementById('message');
        var my_final_mail = '';
        var combine = {'To':to.value,'Subject':subject.value};
        for (var i in combine){
          my_final_mail += i += ": "+combine[i]+"\r\n";
        }
        my_final_mail += "\r\n" + message.value;
        var base64EncodedEmail = window.btoa(my_final_mail);
         $.ajax({
          url: 'https://www.googleapis.com/gmail/v1/users/manpreetsingh1246%40gmail.com/messages/send?key={AIzaSyDaG1PEnobBJCEvBfdBiuKVW2d0238Sg0g}',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({'raw': base64EncodedEmail}),
          type: 'POST',
          async: false,
          beforeSend: function (request)
          {
            request.setRequestHeader("Authorization", "Bearer "+accessToken);
          },
          success: function(html)
          {
            
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(err.toString());
          }.bind(this)
       });
     },
 render: function(){
   return (
     <div>
      <div className="modal fade" id="compose-modal" tabIndex="-1" role="dialog">
       <div className="modal-dialog modal-lg">
         <div className="modal-content">
           <div className="modal-i">
             <button type="button" className="close" data-dismiss="modal">
               <span aria-hidden="true">X</span>
             </button>
             <h4 className="modal-title">Compose</h4>
           </div>
           <form name="sireeshaaaaaaaaaa_Form">
             <div className="modal-body">
               <div className="form-group">
                 <input type="text" className="form-control" id="email" placeholder="To" required />
               </div>
               <div className="form-group">
                 <input type="text" className="form-control" id="subject" placeholder="Subject" required />
               </div>
               <div className="form-group">
                 <textarea className="form-control" id="message" placeholder="Message" rows="10" required></textarea>
               </div>
             </div>
             <div className="modal-footer">
               <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
               <button type="submit" id="send-button" onClick={this.compose_msg} className="btn btn-primary">Send</button>
             </div>
           </form>
         </div>
       </div>
     </div>
     <div className="modal fade" id="reply-modal" tabIndex="-1" role="dialog">
       <div className="modal-dialog modal-lg">
         <div className="modal-content">
           <div className="modal-i">
             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
             <h4 className="modal-title">Reply</h4>
           </div>
           <form action="return sendReply();">
             <input type="hidden" id="reply-message-id" />
             <div className="modal-body">
               <div className="form-group">
                 <input type="text" className="form-control" id="reply-to" disabled />
               </div>
               <div className="form-group">
                 <input type="text" className="form-control disabled" id="reply-subject" disabled />
               </div>
               <div className="form-group">
                 <textarea className="form-control" id="reply-message" placeholder="Message" rows="10" required></textarea>
               </div>
             </div>
             <div className="modal-footer">
               <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
               <button type="submit" id="reply-button" className="btn btn-primary">Send</button>
             </div>
           </form>
         </div>
       </div>
     </div>
     </div>
   )
 }
});
module.exports=ComposeComponent;
