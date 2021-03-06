
var serious_links;
var silly_links;

document.addEventListener('DOMContentLoaded', function(){

   var page_nav = document.getElementById("page_nav");
   var open_menu_link = document.getElementById("open_menu");

   ['click', 'touchend'].forEach(function(event) {
      open_menu_link.addEventListener(event, function(e){
         e.preventDefault();
         page_nav.classList.add("open");
         open_menu_link.classList.add("open");
      });
   });
   ['click', 'touchend'].forEach(function(event) {
      document.getElementById("close_menu").addEventListener(event, function(e){
         e.preventDefault();
         page_nav.classList.remove("open");
         open_menu_link.classList.remove("open");
      });
   });

   // Simple grab for #silly on page load
   if(window.location.hash == "#silly"){
      set_ss("silly");
   }
   
   // Add event listnerers to links
   serious_links = document.querySelectorAll("[href='#serious']");
   silly_links = document.querySelectorAll("[href='#silly']");
   for (var link of serious_links) {
      link.addEventListener('click', function(e){
         e.preventDefault();
         set_ss("serious");
         scroll_to_ss();
      });
   }
   for (var link of silly_links) {
      link.addEventListener('click', function(e){
         e.preventDefault();
         set_ss("silly");
         scroll_to_ss();
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

function scroll_to_ss(){
 
   var rect = document.getElementById("ss_toggle").getBoundingClientRect();
   var in_viewport = (
         rect.top >= 0 &&
         rect.left >= 0 &&
         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
   );
   console.log(in_viewport);

   if(!in_viewport){
      var intro_blurb = document.getElementById("intro_blurb");
      var y = intro_blurb.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({top: y, behavior: 'smooth'});
   }
}


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
