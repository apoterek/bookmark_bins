

var div = document.createElement( 'div' );
var barDiv = document.createElement( 'div' );
var categoryDiv = document.createElement('div');
var topNum = document.createElement('div');
var botNum = document.createElement('div');
var directionText;
//append all elements
document.body.appendChild( barDiv );
document.body.appendChild( div );
document.body.appendChild(categoryDiv);
categoryDiv.appendChild(topNum);
categoryDiv.appendChild(botNum);

//set attributes for div
div.id 				= 'bookmarkUI';
categoryDiv.id		= "categoryDiv";
barDiv.className 	= 'barsTopBottom';
topNum.id			= 'topNum';
botNum.id 			= 'botNum';



//append all elements
//set attributes for div

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		var divText = request.divText;
		
		switch(request.direction){
			case "bottom":
				if(request.dupeResult == false){
					div.className = "makeVisible moveDown";	
					categoryDiv.className ="bottomText";
					//categoryDiv.innerHTML = divText;
					botNum.className = 'shiftDown';
					topNum.className = 'shiftDown';
				}

				barDiv.className = "barsTopBottom startBottom";
				barDiv.addEventListener( 'webkitAnimationEnd', function( event ) { 
				setTimeout(function(){
				         barDiv.className = "";
				         div.className = "";
				         categoryDiv.className = "";
				         categoryDiv.innerHTML = "";
				         botNum.className = '';
						 topNum.className = '';
						 }, 10000);
				         
				}, false );				
				break;
		
			case "top":
				if(request.dupeResult == false){
					div.className = "makeVisible moveUp";	

					categoryDiv.className ="topText";
					categoryDiv.innerHTML = divText;
				}
				barDiv.className = "barsTopBottom startTop";
				barDiv.addEventListener( 'webkitAnimationEnd', function( event ) { 
				         barDiv.className = "";
				         div.className = "";
				         categoryDiv.className = "";
				         categoryDiv.innerHTML = "";
				}, false );	
				break;		
			
			case "left":
				if(request.dupeResult == false){
					div.className = "makeVisible moveLeft";	
					categoryDiv.className = "leftText";
					categoryDiv.innerHTML = divText;
				}
				barDiv.className = "barsLeftRight startLeft";
				barDiv.addEventListener( 'webkitAnimationEnd', function( event ) { 
				         barDiv.className = "";
				         div.className = "";
				         categoryDiv.className = "";
				         categoryDiv.innerHTML = "";				         
				}, false );	
				break;	
		
			case "right":
				if(request.dupeResult == false){
					div.className = "makeVisible moveRight";	
					categoryDiv.className ="rightText";
					categoryDiv.innerHTML = divText;	

				}
				
				barDiv.className = "barsLeftRight startRight";
				barDiv.addEventListener( 'webkitAnimationEnd', function( event ) { 
				         barDiv.className = "";
				         div.className = "";
				         categoryDiv.className = "";
				         categoryDiv.innerHTML = "";
				}, false );	
				break;			
		}      
      

});