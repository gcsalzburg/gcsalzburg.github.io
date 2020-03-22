

comment_form.onsubmit = async (e) => {
   e.preventDefault();

   let response = await fetch(comment_form.action, {
      method: comment_form.method,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: serialize(comment_form)
   });

   if (response.ok) {
      showMsg('Thanks for you comment! It will appear below shortly.');
      comment_form.classList.remove("msg_failure");
      comment_form.classList.add("msg_success");
      comment_form.reset();
    } else {
      let json = await response.json();
       
      console.log(json);
      var ecode = (json.responseJSON || {}).errorCode || "unknown";

      showMsg('Sorry, there was a problem: [' + ecode + ']');
      comment_form_submit.removeAttribute("disabled");
      comment_form_submit.innerHTML = "Post comment";
      comment_form.classList.add("msg_failure");

      grecaptcha.reset();
    }
};
 
function showMsg(msg) {
   document.getElementById("message_back").innerHTML = msg;
   comment_form.classList.add("show_msg");
}

 
 
// Staticman comment replies, from https://github.com/mmistakes/made-mistakes-jekyll
// modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
// Released under the GNU General Public License - https://wordpress.org/about/gpl/
// addComment.moveForm is called from comment.html when the reply link is clicked.
var addComment = {
   // commId - the id attribute of the comment replied to (e.g., "comment-10")
   // parentId - the numeric index of comment repleid to (e.g., 10)
   // respondId - the string 'respond', I guess
   // postId - the page slug
   moveForm: function( commId, parentId, respondId, postId, parentUid ) {
     var div, element, style, cssHidden,
     t           = this,                    //t is the addComment object, with functions moveForm and I, and variable respondId
     comm        = t.I( commId ),                                // whole comment
     respond     = t.I( respondId ),                             // whole new comment form
     cancel      = t.I( 'cancel-comment-reply-link' ),           // whole reply cancel link
     parent      = t.I( 'comment-replying-to' ),                 // hidden element in the comment
     parentuidF  = t.I( 'comment-replying-to-uid' ),             // a hidden element in the comment
     post        = t.I( 'comment-post-slug' ),                   // null
     commentForm = respond.getElementsByTagName( 'form' )[0];    // the <form> part of the comment_form div
 
     if ( ! comm || ! respond || ! cancel || ! parent || ! commentForm ) {
       return;
     }
 
     t.respondId = respondId;
     postId = postId || false;
 
     if ( ! t.I( 'sm-temp-form-div' ) ) {
       div = document.createElement( 'div' );
       div.id = 'sm-temp-form-div';
       div.style.display = 'none';
       respond.parentNode.insertBefore( div, respond ); //create and insert a bookmark div right before comment form
     }
 
     comm.parentNode.insertBefore( respond, comm.nextSibling );  //move the form from the bottom to above the next sibling
     if ( post && postId ) {
       post.value = postId;
     }
     parent.value = parentId;
     parentuidF.value = parentUid;
     cancel.style.display = '';                        //make the cancel link visible
 
     cancel.onclick = function() {
       var t       = addComment,
       temp    = t.I( 'sm-temp-form-div' ),            //temp is the original bookmark
       respond = t.I( t.respondId );                   //respond is the comment form
 
       if ( ! temp || ! respond ) {
         return;
       }
 
       t.I( 'comment-replying-to' ).value = null;      // forget the identity of the reply-to comment
       t.I( 'comment-replying-to-uid' ).value = null;
       temp.parentNode.insertBefore( respond, temp );  //move the comment form to its original location
       temp.parentNode.removeChild( temp );            //remove the bookmark div
       this.style.display = 'none';                    //make the cancel link invisible
       this.onclick = null;                            //retire the onclick handler
       return false;
     };
 
     /*
      * Set initial focus to the first form focusable element.
      * Try/catch used just to avoid errors in IE 7- which return visibility
      * 'inherit' when the visibility value is inherited from an ancestor.
      */
     try {
       for ( var i = 0; i < commentForm.elements.length; i++ ) {
         element = commentForm.elements[i];
         cssHidden = false;
 
         // Modern browsers.
         if ( 'getComputedStyle' in window ) {
           style = window.getComputedStyle( element );
         // IE 8.
         } else if ( document.documentElement.currentStyle ) {
         style = element.currentStyle;
         }
 
       /*
        * For display none, do the same thing jQuery does. For visibility,
        * check the element computed style since browsers are already doing
        * the job for us. In fact, the visibility computed style is the actual
        * computed value and already takes into account the element ancestors.
        */
         if ( ( element.offsetWidth <= 0 && element.offsetHeight <= 0 ) || style.visibility === 'hidden' ) {
           cssHidden = true;
         }
 
         // Skip form elements that are hidden or disabled.
         if ( 'hidden' === element.type || element.disabled || cssHidden ) {
           continue;
         }
 
         element.focus();
         // Stop after the first focusable element.
         break;
       }
 
     } catch( er ) {}
 
     return false;
   },
 
   I: function( id ) {
     return document.getElementById( id );
   }
};










/*!
 * Serialize all form data into a query string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {String}      The serialized form data
 */
var serialize = function (form) {

	// Setup our serialized data
	var serialized = [];

	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {

		var field = form.elements[i];

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		// If a multi-select, get all selections
		if (field.type === 'select-multiple') {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
			}
		}

		// Convert field data to a query string
		else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
		}
	}

	return serialized.join('&');

};
