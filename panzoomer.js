
function el(a){return document.getElementById(a);}
function elc(a){return document.getElementsByClassName(a);}
function da(a,b){if(el(a)){el(a).innerHTML=b;}}


var zoom=1;
var oldx=0, oldy=0;
var dragging=false;
var w=window.innerWidth;
var h=w*(screen.height/screen.width);
var zoomW=w,zoomH=h, oldZoomW=zoomW,oldZoomH=zoomH;
var lefter=0, topper=0, zoomLeft=0, zoomTop=0;
var yplayer=elc("video-stream html5-main-video")[0];


function mousedowner(event){
event.preventDefault();
el('panzoom').style.cursor='hand';
if(event.which==1){
event.preventDefault();
dragging=true;
oldx=event.clientX; 
oldy=event.clientY; 
}}//end mousedowner


function mouseupper(event){
event.preventDefault();
el('panzoom').style.cursor='default';
dragging=false;
}//end mouseupper



function mousemover(event){ 
event.preventDefault();
el('panzoom').style.cursor='hand';
//da('testdiv', event.clientX+' '+el('primary-inner').offsetLeft);
if(dragging){ 
lefter+=event.clientX-oldx;
topper+=event.clientY-oldy;

yplayer=elc("video-stream html5-main-video")[0]

yplayer.style.left=zoomLeft+lefter +'px'; 
yplayer.style.top=zoomTop+topper +'px'; 

el('panzoom').style.left=zoomLeft+lefter +'px'; 
el('panzoom').style.top=zoomTop+topper +'px'; 
el('panzoom').style.width=zoomW+'px';
el('panzoom').style.height=zoomH+'px';

oldx=event.clientX;
oldy=event.clientY;

}}//end mousemover


function mousewheeler(event){
event.preventDefault();
el('panzoom').style.cursor='hand';

delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

if(delta>0){zoom=1.1;}else if(delta<0){zoom=.9;}


var mousex=parseFloat(event.clientX);
var mousey=parseFloat(event.clientY);
var L=zoomLeft+lefter;
var T=zoomTop+topper;
var mulx=(mousex-L)/zoomW;
var muly=(mousey-T)/zoomH;

zoomW*=zoom;
zoomH*=zoom;

zoomLeft+=(oldZoomW-zoomW)*mulx;
zoomTop+=(oldZoomH-zoomH)*muly;

oldZoomW=zoomW;
oldZoomH=zoomH;

yplayer=elc("video-stream html5-main-video")[0];

yplayer.style.width=zoomW+'px';
yplayer.style.height=zoomH+'px';

yplayer.style.left=zoomLeft+lefter +'px'; 
yplayer.style.top=zoomTop+topper +'px'; 

el('panzoom').style.width=zoomW+'px';
el('panzoom').style.height=zoomH+'px';

el('panzoom').style.left=zoomLeft+lefter +'px'; 
el('panzoom').style.top=zoomTop+topper +'px'; 

}//end mousewheeler


function hydeHide(){
elc('ytp-chrome-top')[0].style.visibility = 'hidden';
elc('ytp-chrome-controls')[0].style.visibility = 'hidden';
elc('ytp-gradient-top')[0].style.visibility = 'hidden';
elc('ytp-gradient-bottom')[0].style.visibility = 'hidden';
elc('ytp-progress-bar')[0].style.visibility = 'hidden';
elc('ytp-progress-bar-container')[0].style.visibility = 'hidden';
}//end hyde hide

function hydeShow(){
elc('ytp-chrome-top')[0].style.visibility = 'visible';
elc('ytp-chrome-controls')[0].style.visibility = 'visible';
elc('ytp-gradient-top')[0].style.visibility = 'visible';
elc('ytp-gradient-bottom')[0].style.visibility = 'visible';
elc('ytp-progress-bar')[0].style.visibility = 'visible';
elc('ytp-progress-bar-container')[0].style.visibility = 'visible';
}//end hyde show




if(elc("video-stream html5-main-video")!==null
&&elc("video-stream html5-main-video")!=="undefined"
&&elc('style-scope ytd-player')[0]!==null
&&elc('style-scope ytd-player')[0]!=="undefined"
){



elc('html5-video-container')[0].parentElement.style.backgroundColor='#ffffff';
yplayer=elc("video-stream html5-main-video")[0];
yplayer.style.position='absolute';
yplayer.style.zIndex='1000';


var divPanZoom;
if(el('panzoom')==null
||el('panzoom')=="undefined"){
divPanZoom=document.createElement("div");
elc('style-scope ytd-player')[0].appendChild(divPanZoom);
divPanZoom.setAttribute("id", "panzoom");
divPanZoom.setAttribute("panzooming",false);
el('panzoom').onmousedown=function(){mousedowner(event);}
el('panzoom').onmousemove=function(){mousemover(event);}
el('panzoom').onmouseup=function(){mouseupper(event);}
el('panzoom').onmousewheel=function(){mousewheeler(event);}
divPanZoom.style.position='absolute';
//to show the overlay for testing:
//divPanZoom.style.opacity='.3';
//divPanZoom.style.backgroundColor='#ffff00';

}//end if panzoom was undefined

if(el('panzoom')!==null
&&el('panzoom')!=="undefined"){
divPanZoom=el('panzoom');
divPanZoom.style.zIndex='10020';

togglePanZoomMode();

}//end if panzoom ! null or undefined

}//end if video


function togglePanZoomMode(){
if(divPanZoom.getAttribute('panzooming')=='false'){ 
if(!isFullScreen()){requestFullScreen();}
enterPanZoomMode();
}else{
//if(isFullScreen()){exitFullScreen();}
exitPanZoomMode();
} 
}//end toggle pan zoom mode


window.addEventListener('resize',onWindowResize,false);


function onWindowResize(){
if(el('panzoom')!==null
&&el('panzoom')!=="undefined"){

if(el('panzoom').getAttribute('panzooming')=='true'&&!isFullScreen()){ 
el('panzoom').style.display='none';
hydeShow();

}else if(el('panzoom').getAttribute('panzooming')=='true'&&isFullScreen()){
enterPanZoomMode();
}

}
}//end on window resize


function resetZoomDefault(){
w=window.innerWidth;
h=w*(screen.height/screen.width);
zoomW=w,zoomH=h, oldZoomW=zoomW,oldZoomH=zoomH;
}

function enterPanZoomMode(){
el('panzoom').setAttribute('panzooming','true');
el('panzoom').style.display='block';
el('panzoom').style.left='0px';
el('panzoom').style.top='0px';
el('panzoom').style.width=screen.width+'px';
el('panzoom').style.height=screen.height+'px';
resetZoomDefault();

hydeHide();

}// end enter pan zoom mode


function exitPanZoomMode(){

el('panzoom').setAttribute('panzooming','false');
el('panzoom').style.display='none';

var elem=document.querySelector('.style-scope ytd-player');
var style=getComputedStyle(elem);
yplayer=elc("video-stream html5-main-video")[0];
//yplayer.style.opacity='1';
yplayer.style.position=style.position;
yplayer.style.zIndex=style.zIndex;
yplayer.style.left=window.getComputedStyle(el("player-container")).left;
yplayer.style.top=window.getComputedStyle(el("player-container")).top;
yplayer.style.width=window.getComputedStyle(el("player-container")).width;
yplayer.style.height=window.getComputedStyle(el("player-container")).height


hydeShow();


}//end exit pan zoom mode



function isFullScreen(){
return (document.fullScreenElement && document.fullScreenElement !== null)
|| document.mozFullScreen
|| document.webkitIsFullScreen;
}//end is full screen

function requestFullScreen(){
var el=document.documentElement;
var rfs=el.requestFullscreen
|| el.webkitRequestFullScreen
|| el.mozRequestFullScreen
|| el.msRequestFullscreen;
rfs.call(el);
}//end request full screen 

function exitFullScreen(){
var d=document;
var rfs=d.exitFullscreen
|| d.webkitExitFullscreen
|| d.mozCancelFullScreen
|| d.msExitFullscreen ;
rfs.call(d);
}//end exit fullscreen

function toggleFullScreen(){
if(isFullScreen()){exitFullScreen();
}else{requestFullScreen();
}
}//end toggle full screen

/*
var testDiv=document.createElement('div');
document.body.appendChild(testDiv);
testDiv.setAttribute("id", "testdiv");
testDiv.style.backgroundColor='black';
testDiv.style.display='block';
testDiv.style.color='white';
testDiv.style.width='130px;';
testDiv.style.height='40px;';
testDiv.style.left='0px';
testDiv.style.top='0px';
testDiv.style.position='absolute';
testDiv.style.zIndex='1000000000000000000';
*/
