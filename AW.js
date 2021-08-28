var scrX = ccbGetScreenWidth();
var scrY = ccbGetScreenHeight();

ccbSetWorkingDirectory("AW//");
// define all Ui Elemets( panels, buttons, Items, here as objects)//

//test object
 var FileMenuLabel = { // UI File Menu label and handler 
  Text:"File",
  TextSpacing:0,
  Textsize:10,
  Color:{r: 30, g: 30, b: 30, a: 255},
  HoverColor:{r: 86, g: 128, b: 194, a: 255},
  OnHoverAction: "FileMenuPanel.Draw();FileMenuItem.Draw()",
  NonHoverAction: "FileMenuPanel.Draw();FileMenuItem.Draw()",
  PosX: 20,
  PosY: 0,
  Width: 30,
  Height: 32, // Tried using this.property name but its not working in the function when calling the pane.draw() inside onframeEvent.
  Draw: function (){return panel_2d(this.Text,this.TextSpacing,color(this.Color.r,this.Color.g,this.Color.b,this.Color.a),color(this.HoverColor.r,this.HoverColor.g,this.HoverColor.b,this.HoverColor.a),this.OnHoverAction,this.NonHoverAction,this.Textsize,this.PosX,this.PosY,this.Width,this.Height)}
}

var FileMenuPanel = { // UI File Menu label and handler 
  Text:"",
  TextSpacing:0,
  Textsize:0,
  Color:{r: 30, g: 30, b: 30, a: 150},
  HoverColor:{r: 30, g: 30, b: 30, a: 150},
  OnHoverAction: "",
  NonHoverAction: "",
  PosX: 20,
  PosY: 30,
  Width: 300,
  Height: 500, // Tried using this.property name but its not working in the function when calling the pane.draw() inside onframeEvent.
  Draw: function (){return panel_2d(this.Text,this.TextSpacing,color(this.Color.r,this.Color.g,this.Color.b,this.Color.a),color(this.HoverColor.r,this.HoverColor.g,this.HoverColor.b,this.HoverColor.a),this.OnHoverAction,this.NonHoverAction,this.Textsize,this.PosX,this.PosY,this.Width,this.Height)}
}

var FileMenuItem = { // UI File Menu label and handler 
  Text:"About",
  TextSpacing:0,
  Textsize:10,
  Color:{r: 30, g: 30, b: 30, a: 0},
  HoverColor:{r: 86, g: 128, b: 194, a: 255},
  OnHoverAction: "",
  NonHoverAction: "",
  PosX: 40,
  PosY: 170,
  Width: 60,
  Height: 32, // Tried using this.property name but its not working in the function when calling the pane.draw() inside onframeEvent.
  Draw: function (){return panel_2d(this.Text,this.TextSpacing,color(this.Color.r,this.Color.g,this.Color.b,this.Color.a),color(this.HoverColor.r,this.HoverColor.g,this.HoverColor.b,this.HoverColor.a),this.OnHoverAction,this.NonHoverAction,this.Textsize,this.PosX,this.PosY,this.Width,this.Height)}
}

// second test menu item.test object
 var EditMenuLabel = { // UI File Menu label and handler 
  Text:"Edit",
  TextSpacing:0,
  Textsize:10,
  Color:{r: 30, g: 30, b: 30, a: 255},
  HoverColor:{r: 86, g: 128, b: 194, a: 255},
  OnHoverAction: function(){var mouseX = ccbGetMousePosX(); var mouseY = ccbGetMousePosY(); if(mouseX > (this.PosX-(this.Textsize/2)) && mouseX < this.Width+(this.Textsize*this.Text.length) && mouseY > this.PosY && mouseY < this.PosY+this.Height) {  /*here goes the command for hover*/ EditMenuPanel.Draw()}}, 	// No Eval Hover Effect
  NonHoverAction: "",
  test:"",
  PosX: 80,
  PosY: 0,
  Width: 90,
  Height: 32, // Tried using this.property name but its not working in the function when calling the pane.draw() inside onframeEvent.
  Draw: function (){return panel_2d(this.Text,this.TextSpacing,color(this.Color.r,this.Color.g,this.Color.b,this.Color.a),color(this.HoverColor.r,this.HoverColor.g,this.HoverColor.b,this.HoverColor.a),this.OnHoverAction,this.test,this.Textsize,this.PosX,this.PosY,this.Width,this.Height), this.OnHoverAction()}
}

var EditMenuPanel = { // UI File Menu label and handler 
  Text:"",
  TextSpacing:0,
  Textsize:0,
  Color:{r: 30, g: 30, b: 30, a: 150},
  HoverColor:{r: 30, g: 30, b: 30, a: 150},
  OnHoverAction: "",
  NonHoverAction: "",
  PosX: 80,
  PosY: 30,
  Width: 360,
  Height: 500, // Tried using this.property name but its not working in the function when calling the pane.draw() inside onframeEvent.
  Draw: function (){return panel_2d(this.Text,this.TextSpacing,color(this.Color.r,this.Color.g,this.Color.b,this.Color.a),color(this.HoverColor.r,this.HoverColor.g,this.HoverColor.b,this.HoverColor.a),this.OnHoverAction,this.NonHoverAction,this.Textsize,this.PosX,this.PosY,this.Width,this.Height)}
}


// register single frame event and draw all the necessary elements.
function onFrameDrawing()
{
 var menubar = ccbDrawColoredRectangle(color(30,30,30,255), 0, 0, scrX, 32);
 var statusbar = ccbDrawColoredRectangle(color(48,48,48,255), 0, scrY-32, scrX, scrY);
 FileMenuLabel.Draw();
 EditMenuLabel.Draw();
}
ccbRegisterOnFrameEvent(onFrameDrawing);




//Functions that deal with drawing of UI elements  and color conversions and all//
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

  
 