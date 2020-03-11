
var serious_links;
var silly_links;

document.addEventListener('DOMContentLoaded', function(){

   var intro_blurb = document.getElementById("intro_blurb");
   var y = intro_blurb.getBoundingClientRect().top + window.pageYOffset - 60;

   // Simple grab for #silly on page load
   if(window.location.hash == "#silly"){
      set_ss("silly");
   }
   
   serious_links = document.querySelectorAll("[href='#serious']");
   silly_links = document.querySelectorAll("[href='#silly']");

   for (var link of serious_links) {
      link.addEventListener('click', function(e){
         e.preventDefault();
         set_ss("serious");
         console.log(y);
         window.scrollTo({top: y, behavior: 'smooth'});
      });
   }
   for (var link of silly_links) {
      link.addEventListener('click', function(e){
         e.preventDefault();
         set_ss("silly");
         console.log(y);
         window.scrollTo({top: y, behavior: 'smooth'});
      });
   }

   // Add options links in to corner of each highlighted code block (not inline highlights)
    var code_blocks = document.querySelectorAll('div.highlighter-rouge');
    for (var i=0; i<code_blocks.length; i++){
        var links_block = document.createElement('div');
        links_block.innerHTML = '<div class="code-links"><a href="#Copy_All" onclick="selectText(event, this)">Copy All</a></div>';
        code_blocks[i].innerHTML = links_block.innerHTML + code_blocks[i].innerHTML;
    }
});


// Serious / silly toggle
function set_ss(word){
   
   var serious_links = document.querySelectorAll("[href='#serious']");
   var silly_links = document.querySelectorAll("[href='#silly']");

   if(word == "silly"){         
      for(var link of serious_links){
         link.classList.remove("selected");
      }
      for(var link of silly_links){
         link.classList.add("selected");
      }
      serious_silly_toggle.classList.remove("serious");
      serious_silly_toggle.classList.add("silly");
   }else if(word == "serious"){
      for(var link of serious_links){
         link.classList.add("selected");
      }
      for(var link of silly_links){
         link.classList.remove("selected");
      }

      serious_silly_toggle.classList.remove("silly");
      serious_silly_toggle.classList.add("serious");    
   }
}

// Select text inside parent code block
function selectText(e, div) {

    e.preventDefault();

    // Get <div class="highlight"> as it is the next sibling of the code-links
    var block = div.parentNode.nextSibling;

    // Cross-browser selector
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(block);
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(block);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }

    // Copy text
    document.execCommand("copy");

    // Change label on link
    div.innerHTML = "Copied!";

    setTimeout(function(){
        var sel = window.getSelection ? window.getSelection() : document.selection;
        if (sel) {
            if (sel.removeAllRanges) {
                sel.removeAllRanges();
            } else if (sel.empty) {
                sel.empty();
            }
        }
        div.innerHTML = "Copy All";
    }, 1000);
}