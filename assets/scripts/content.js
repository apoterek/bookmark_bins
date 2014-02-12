

var div = document.createElement( 'div' );
var directionText;
//append all elements
document.body.appendChild( div );
//set attributes for div
div.id = 'bookmarkUI';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {


      
		switch(request.direction){
			case "bottom":
				div.className = "makeVisible moveDown";	

				break;
			case "top":
				div.className = "makeVisible moveUp";	

				break;		
			case "left":
				div.className = "makeVisible moveLeft";	

				break;	
			case "right":

				div.className = "makeVisible moveRight";	
				break;			
		}      
      

});