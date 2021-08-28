var scrX = ccbGetScreenWidth();
var scrY = ccbGetScreenHeight();

ccbSetWorkingDirectory("AW//");
function onFrameDrawing()
{
   // draw a red, transparent rectangle at the position of the mouse
// var menubar = ccbDrawColoredRectangle(color(30,30,30,255), 0, 0, scrX, 32);
 var statusbar = ccbDrawColoredRectangle(color(48,48,48,255), 0, scrY-32, scrX, scrY);
 
}
var me = this;
//test object
 var panel = {
  Visibility: "true",
  Text:"File",
  TextSpacing:0,
  Textsize:10,
  Color:{r: 255, g: 0, b: 0, a: 255},
  HoverColor:{r: 0, g: 0, b: 0, a: 255},
  PosX: 20,
  PosY: 0,
  Width: 10,
  Height: 32,
  Draw: function(){return panel_2d(panel.Text,panel.TextSpacing,color(panel.Color.r,panel.Color.g,panel.Color.b,panel.Color.a),color(panel.HoverColor.r,panel.HoverColor.g,panel.HoverColor.b,panel.HoverColor.a),"","",10,20,0,30,32)}
}
ccbRegisterOnFrameEvent(onFrameDrawing);
// textbox overlay function // need to add a for loop for going through string and draw them on screen.
function fileMenu()
{
	panel_2d("",0,color(30,30,30,150),color(30,30,30,150),"","",0,20,30,300,500);
}
function fileMenuItem1()
{
	panel_2d("About",0,color(30,30,30,0),color(86,128,194,255),"","",10,40,170,60,32);
}
function editMenu()
{
	panel_2d("",0,color(30,30,30,150),color(30,30,30,150),"","ccbUnregisterOnFrameEvent(panel.Draw)",0,80,30,360,500);
}

function FileMenuLabel()
{
	//panel.Draw();
	//panel_2d("File",0,color(30,30,30,255),color(86,128,194,255),"ccbRegisterOnFrameEvent(fileMenu);ccbRegisterOnFrameEvent(fileMenuItem1)","ccbUnregisterOnFrameEvent(fileMenu);ccbUnregisterOnFrameEvent(fileMenuItem1)",10,20,0,30,32);
}
ccbRegisterOnFrameEvent(panel.Draw);
function EditMenuLabel()
{
		panel_2d("Edit",0,color(30,30,30,255),color(86,128,194,255),"ccbRegisterOnFrameEvent(editMenu)","",10,80,0,90,32);
}
ccbRegisterOnFrameEvent(EditMenuLabel);


function panel_2d(string,letter_spacing,color,hovercol,funct1,funct2,Fontsize,X1,Y1,X2,Y2){
	
	var mouseX = ccbGetMousePosX();
	var mouseY = ccbGetMousePosY();
	
	if (X2 << X1+(string.length*Fontsize)+Fontsize){
		X2 += (Fontsize*string.length);
	}
	//hover effects testing
	if(mouseX > (X1-(Fontsize/2)) && mouseX < X2 && mouseY > Y1 && mouseY < Y1+Y2)
	{color = hovercol;eval(funct1)}
	else{eval(funct2)}
	ccbDrawColoredRectangle(color,X1-(Fontsize/2),Y1,X2,Y1+Y2);
	Y1 = Y1+(Fontsize/2);
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

  
 