
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
    }

    function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
    }

    function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
    }


// Add options links in to corner of each highlighted code block (not inline highlights)
document.addEventListener('DOMContentLoaded', function(){
    var code_blocks = document.querySelectorAll('div.highlighter-rouge');

    for (var i=0; i<code_blocks.length; i++){
        var links_block = document.createElement('div');
        links_block.innerHTML = '<div class="code-links"><a href="#Copy_All" onclick="selectText(event, this)">Copy All</a></div>';
        code_blocks[i].innerHTML = links_block.innerHTML + code_blocks[i].innerHTML;
    }
});

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