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
 panel_2d("[THE QUICK BROWN FOX + {JUMPS OVER} - (THE LAZY DOG) = 0123456789]",0,color(30,30,30,255),16,20,20,30,40);
 panel_2d("[the quick brown fox + {jumps over} - (the lazy dog) = 0123456789]",0,color(30,30,30,255),16,20,70,30,40);
}

// textbox overlay function // need to add a for loop for going through string and draw them on screen.
function panel_2d(string,letter_spacing,color,Fontsize,X1,Y1,X2,Y2){
	
	
	if (X2 << X1+(string.length*Fontsize)+Fontsize){
		X2 += (Fontsize*string.length);
	}
	ccbDrawColoredRectangle(color,X1-(Fontsize/2),Y1,X2,Y1+Y2);
	
	//draw texture according to the string//
	for(var i =0;i < string.length; i++)
	{
	if(isLowerCase(string.charAt(i))){
		var strCase = "L_"
	}
    else{ strCase = ""};	
	ccbDrawTextureRectangleWithAlpha("font//"+strCase+string.charAt(i)+".png", X1+(i*Fontsize)+letter_spacing, Y1, X1+(i*Fontsize)+Fontsize, Y1+Fontsize+(Fontsize/2));
	
	}
	return;
	
}
ccbRegisterOnFrameEvent(onFrameDrawing);

function isLowerCase(str)
{
    return str == str.toLowerCase() && str != str.toUpperCase();
}

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

  
 