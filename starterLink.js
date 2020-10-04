

function el(a){return document.getElementById(a);}

if(el("togControlId")==null
||el("togControlId")=="undefined"){

var togControl=document.createElement('a');
togControl.setAttribute("id", "togControlId");
var togText=document.createTextNode("Enter PanZoom Mode");
togControl.style.display='inline-block';
togControl.appendChild(togText);
togControl.href="javascript:void(0)";


togControl.onclick=function(){
chrome.runtime.sendMessage(
{data: "togglePanZoom"}, 
function(response){//alert(response.mission);
});
}

}//end if togControlId == null