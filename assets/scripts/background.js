/*chrome.bookmarks.getTree(function(results){
	console.log("results: " + results[0].id);
	
});*/
//global vars

var topShelf;
var bottomShelf;
var leftShelf;
var rightShelf;
	var leftObj;
	var rightObj;
	var topObj;
	var bottomObj;

var checkBins = function(){
	var leftBin = false;
	var rightBin = false;
	var topBin = false;
	var bottomBin = false;

	
	var binArray = [[leftBin,"leftBin",null ], [rightBin,"rightBin",null], [topBin,"topBin",null], [bottomBin,"bottomBin", null]];
	
	
	
	var checkLength = function(){
		leftShelf 	= binArray[0][2];	
		rightShelf 	= binArray[1][2];	
		topShelf 	= binArray[2][2];	
		bottomShelf = binArray[3][2];	
		
		console.log("leftShelf: " + leftShelf);
		console.log("rightShelf: " + rightShelf);
	}
	
	var getTreeNode = function(){
		chrome.bookmarks.getTree(function(tree){
			
			
			var cycleThrough = function(tree){
				for(i = 0; i<tree.length; i++){
					for(s = 0; s<tree[i].children.length; s++){
					//	console.log("ROOT FOLDERS: "+tree[i].children[s].title);
						for(k = 0; k<tree[i].children[s].children.length; k++){
							//console.log("sub folders: " + tree[i].children[s].children[k].title);
							var subFolder = tree[i].children[s].children[k];
							switch(subFolder.title){
								case "bottomBin":
									bottomObj = subFolder;
									break;
								case "topBin":
									topObj = subFolder;
									break;		
								case "leftBin":
									leftObj = subFolder;
									break;	
								case "rightBin":
									rightObj = subFolder;
									break;			
							}
							console.log("subFolders: " + subFolder.title);
							binArray.forEach(function(bins){
								if(subFolder.title == bins[1]){
									console.log("string: "+bins[1]+", subfolder: " + subFolder.title);
									bins[0] = true;
									console.log("NEW VALUE: " + bins[0]);
									bins[2] = subFolder;
									console.log("bins[2]: "+bins[2]);
								}
							});
						}
					}
				}
				
				binArray.forEach(function(bins){
					if(bins[0] == false){
						console.log(bins[0]);
						console.log(bins[1]);
						chrome.bookmarks.create({'title':bins[1]}, function(){console.log("ADDED!")});
						cycleThrough();
					}
				});	

			}
			
			cycleThrough(tree);
			
			checkLength();
	
		});
			
	
			
	}
	getTreeNode();

	

	
}

checkBins();

/*chrome.bookmarks.search('New Tab', function(results){ 
	if(results){
		console.log("it exists: " + results.length);
		return;
	}else{
		console.log("it doesn't exist");
		return;
	}
})*/
		/*var addUI = function(){
			var _body = document.getElementsByTagName('body') [0];
			var newUI = document.createElement("div");
			newUI.className = "bookmarkUI";
			//document.body.insertBefore(newUI, document.body.firstChild);
			_body.appendChild(newUI);
			alert("ui added");
			
		}*/
chrome.commands.onCommand.addListener(function(command) {
 
 
//chrome.bookmarks.create(object bookmark);



		console.log('Command:', command);
		var tabId;
		var tabUrl;
		var currentCommand;
		
		var commandText;
		



		
		
		//alert("this is the bin obj: " + leftObj.title);
		var commandObj;
		switch(command){
			case "bottomBin":
				
				currentCommand = "bottom";
				commandObj = bottomObj;
				
		      	chrome.storage.local.get("bottomTitle", function(res){
					commandText = res.bottomTitle;
				});	
						
				break;
			case "topBin":
				currentCommand = "top"
				commandObj = topObj;
		      	chrome.storage.local.get("topTitle", function(res){
					commandText = res.topTitle;
		
				});				
				break;		
				
				
			case "leftBin":
				currentCommand = "left"
				commandObj = leftObj;
		      	chrome.storage.local.get("leftTitle", function(res){
					commandText = res.leftTitle;
				});
				break;	
				
				
			case "rightBin":
				currentCommand = "right"
				commandObj = rightObj;
		      	chrome.storage.local.get("rightTitle", function(res){
					commandText = res.rightTitle;
		
				});

				break;			
		}
		

		chrome.tabs.getSelected(null, function(tab) {
					chrome.storage.local.get("leftTitle", function(res){
						console.log(res.leftTitle);
					});
	
		
		
		
				  //properties of tab object
		  tabId = tab.id;
		  tabUrl = tab.url;
		  tabTitle = tab.title;
		
		 // addUI();
		 // alert(currentCommand + tabTitle);
		  var bookmarkURL;
		  bookMarkURL = tabUrl;
		 /* 	chrome.bookmarks.getSubTree(commandObj.id, function(results){
		console.log(results.length);
	});*/
			var addBookmark = function(dupe){
			if(dupe == false){
				chrome.bookmarks.create({'parentId': commandObj.id, 'title': tabTitle, 'url': tab.url});			
			}

				  //rest of the save functionality.
				  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				  	chrome.tabs.sendMessage(tabs[0].id, {direction: currentCommand, dupeResult: dupe, divText: commandText}, function(response) {
					  	// console.log(response.farewell);
					});
				  }); 
								
			}
	//		addBookmark();
			chrome.bookmarks.search(tab.url, function(results){
			console.log(results);
				if(results.length){
					var duplicate;
					console.log("some results");
					results.forEach(function(binsID){
						if(binsID.parentId == commandObj.id){
							duplicate = true;
						}
					});
					if(duplicate == true){
						addBookmark(true);
						return;
					}else{
						addBookmark(false);
					}
				}else{
					console.log("no results");
					addBookmark(false);
				}
				

			 
			 
			 
			});
		  
		  
		  
		});		
			

		
		



});	






