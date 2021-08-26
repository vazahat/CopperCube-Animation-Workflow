var scrX = ccbGetScreenWidth();
var scrY = ccbGetScreenHeight();

ccbSetWorkingDirectory("AW//");
function onFrameDrawing()
{
   // draw a red, transparent rectangle at the position of the mouse
 var mouseX = ccbGetMousePosX();
 var mouseY = ccbGetMousePosY();
 var menubar = ccbDrawColoredRectangle(color(30,30,30,255), 0, 0, scrX, 32);
 var statusbar = ccbDrawColoredRectangle(color(48,48,48,255), 0, scrY-32, scrX, scrY);
 panel_2d(color(30,30,30,255),20,0,0,100,100);
}
// textbox overlay function // need to add a for loop for going through string and draw them on screen.
function panel_2d(color,Fontsize,X1,Y1,X2,Y2){
	ccbDrawColoredRectangle(color,X1,Y1,X2,Y2);
	ccbDrawTextureRectangleWithAlpha("font//asc_0.png", X1+1, Y1+1, X1+Fontsize, Y1+Fontsize);
	return;
	
}
ccbRegisterOnFrameEvent(onFrameDrawing);

//Color functions and color conversions.
//convert rgba(red,green,blue,and alpha) to hex color and return to draw rectangle with transparency
//return hexcolor value to be used to draw rectangle
function color(r,g,b,alpha) 
{
	var r = toHexcol(r); // get hex value for red
    var g = toHexcol(g); // get hex value for green
    var b = toHexcol(b);	//get hex value for blue
	var color = (alpha<<24) | ( "0x00"+r+g+b & 0x00ffffff); //return color with alpha transparency correction using bitwise operation
	return color;
};
//Conversion of rgb to hex color
function toHexcol(rgb) {
  var hexColor = rgb.toString(16);
  while (hexColor.length < 2) {hexColor = "0" + hexColor; }
  return hexColor;
}

  
 