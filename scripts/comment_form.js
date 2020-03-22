

comment_form.onsubmit = async (e) => {
   e.preventDefault();

   comment_form_submit.disabled = true;
   comment_form_submit.innerHTML = "Adding...";

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

      var ecode;
      if(json.error){
         ecode = json.error.text;
      }else if(json.message){
         ecode = json.message;
      }else{
         ecode = json.errorCode;
      }

      showMsg('Sorry, there was a problem: [' + ecode + ']');
      comment_form_submit.disabled = false;
      comment_form_submit.innerHTML = "Add comment";
      comment_form.classList.add("msg_failure");

      // grecaptcha.reset();
    }
};
 
function showMsg(msg) {
   document.getElementById("message_back").innerHTML = msg;
   comment_form.classList.add("show_msg");
}


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
