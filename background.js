chrome.commands.onCommand.addListener(
function(command){
if(command==="panzoom"){
chrome.tabs.query(
{active: true, currentWindow: true}, 
function(tabs){
var tabUrl=tabs[0].url;
var onYT=tabUrl.includes("youtube.com/watch?v");
if(onYT===true){
chrome.tabs.executeScript({file: 'panzoomer.js'});
} //end if on youtube
} //end tabs function
); //and tabs query
} //end if panzoom
}//end command function
);//end add listener




chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
if(request.data=="togglePanZoom"){
sendResponse({mission: "accomplished"});
chrome.tabs.executeScript({file: 'panzoomer.js'});
}
});

