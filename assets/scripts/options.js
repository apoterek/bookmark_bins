// Saves options to localStorage.
function save_options() {
  var left 		= document.getElementById("left");
  var right 	= document.getElementById("right");
  var tops 		= document.getElementById("tops");
  var bottom 	= document.getElementById("bottom");

  
  
  
  var leftVal 	= left.value;
  var rightVal 	= right.value;
  var topsVal 	= tops.value;
  var bottomVal = bottom.value;

  localStorage["left"] 		= leftVal;
  localStorage["right"] 	= rightVal;
  localStorage["tops"]	 	= topsVal;
  localStorage["bottom"] 	= bottomVal;

  
  chrome.storage.local.set({"leftTitle":leftVal});
  chrome.storage.local.set({"rightTitle":rightVal});
  chrome.storage.local.set({"bottomTitle":bottomVal});
  chrome.storage.local.set({"topTitle":topsVal});

  

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {

  left.value 	= localStorage["left"];
  right.value 	= localStorage["right"];
  tops.value 	= localStorage["tops"];
  bottom.value 	= localStorage["bottom"];

  //alert("Test");
 /* var select = document.getElementById("color");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }*/
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);