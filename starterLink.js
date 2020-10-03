function el(a){return document.getElementById(a);}

var togControl=document.createElement('a');
togControl.setAttribute("id", "togControlId");
var togText=document.createTextNode("Enter PanZoom Mode");
togControl.style.display='inline-block';
togControl.appendChild(togText);
togControl.href="javascript:void(0)";

el('info-contents').insertBefore(togControl,el('info-contents').firstChild);

//document.body.appendChild(togControl);

togControl.onclick=function(){
chrome.runtime.sendMessage(
{data: "togglePanZoom"}, 
function(response){//alert(response.mission);
});
}