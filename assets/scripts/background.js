

chrome.commands.onCommand.addListener(function(command) {
 
 
//chrome.bookmarks.create(object bookmark);



		console.log('Command:', command);
		var tabId;
		var tabUrl;
		var currentCommand;
		
		
		switch(command){
			case "bottomBin":
				currentCommand = "Send to Bottom Bin: ";
				break;
			case "topBin":
				currentCommand = "Send to Top Bin: "
				break;		
			case "leftBin":
				currentCommand = "Send to Left Bin: "
				break;	
			case "rightBin":
				currentCommand = "Send to Right Bin: "
				break;			
		}
		
		chrome.tabs.getSelected(null, function(tab) {
		  //properties of tab object
		  tabId = tab.id;
		  tabUrl = tab.url;
		  alert(currentCommand + tabUrl);
		  
		  var bookmarkURL;
		  bookMarkURL = tabUrl;

			
		  //rest of the save functionality.
		});		


});	

