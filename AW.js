ccbSetWorkingDirectory("AW//");
var scrX = ccbGetScreenWidth();
var scrY = ccbGetScreenHeight();
mouseDownL = null;
mouseDownR = null;
var element2dBuffer = [];
e2dFrameEvent = function(){
	for(var i = 0; i < element2dBuffer.length; i++){
		element2dBuffer[i].onFrameEvent();
	}
}

// string case checker
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

//define Themes color schemes //
var primaryBtnCol = color(30,30,30,0);
var primaryPanelCol = color(30,30,30,150);
var secondaryBtnCol = color(86,128,194,255);


element2d = function(text, textSpacing, panelColor, onHoverColor, fontSize, X1, Y1, X2, Y2){
	this.text = text;
	this.textSpacing = textSpacing;
	this.fontSize = fontSize;
	this.panelColor = panelColor;
	this.onHoverColor = onHoverColor;
	this.NormalColor = panelColor;
	this.X1 = X1;
	this.X2 = X2;
	this.Y1 = Y1;
	this.Y2 = Y2;
	this.bufferIndex = element2dBuffer.push(this) - 1;
}
element2d.prototype.onFrameEvent = function(){
	this.draw();
	if(this.isMouseOver()){
		this.onMouseOver();

		if(mouseDownL){
			this.onClick();
		}
	}else{
		if(mouseDownL){
			this.onOutsideClick();
		}
	}
}

element2d.prototype.draw = function(){
	// rendering code here / ccbDraw calls
	var X1 = this.X1;
	var X2 = this.X2;
	var Y1 = this.Y1;
	var Y2 = this.Y2;
	color = this.NormalColor;

	if (X2 < X1+(this.text.length*this.fontSize)+this.fontSize){
		X2 += (this.fontSize*this.text.length);
	}
	ccbDrawColoredRectangle(color,X1-(this.fontSize/2),Y1,X2,Y1+Y2);
	Y1 = Y1+(this.fontSize/2);
	//draw texture according to the string//
	
	for(var i =0;i < this.text.length; i++)
	{
	
	if(isLowerCase(this.text.charAt(i))){
		var strCase = "L_"
	}
    else{ strCase = ""};
	
	ccbDrawTextureRectangleWithAlpha("font//"+strCase+this.text.charAt(i)+".png", X1+(i*this.fontSize)+this.textSpacing, Y1, X1+(i*this.fontSize)+this.fontSize, Y1+this.fontSize+(this.fontSize/2));

	}	
	return;
}



element2d.prototype.isMouseOver = function(){
	// checks if the mouse is over this objects and returns true if it is, otherwise returns false
	
	var mouseX = ccbGetMousePosX();
	var mouseY = ccbGetMousePosY();
	var bool   = null;

	if(mouseX > (this.X1-(this.fontSize/2)) && mouseX < this.X2+(this.fontSize*this.text.length) && mouseY > this.Y1 && mouseY < this.Y1+this.Y2)
	 {  
	  this.NormalColor = this.onHoverColor;
	  bool= true;
	
	 }
	 else{this.NormalColor = this.panelColor; bool = false; }
	 
	 return bool;

}

element2d.prototype.onMouseOver = function(){};
element2d.prototype.onClick = function(){};
element2d.prototype.onOutsideClick = function(){};
//mouseDownFunction

ccbRegisterMouseDownEvent("functionMouseDown");
ccbRegisterMouseUpEvent("functionMouseUp");

function functionMouseDown (click){
	// print(click);
	if(click == 0){
		mouseDownL = true;
		}

	if(click == 1){
		mouseDownR = true;
	}
}
function functionMouseUp (click){
	if(click == 0) {
		mouseDownL = false;
	}

	if(click == 1){
		mouseDownR = false;
	}
}

// Draw Function
ccbRegisterOnFrameEvent(e2dFrameEvent);

// START FUNCTION: Drawing elements//
//element2d = function(text, textSpacing, panelColor, onHoverColor, fontSize, X1, Y1, X2, Y2){
var Menubar = new element2d("", 0,color(30,30,30,255),color(30,30,30,255),10,0,0,scrX,32);
var Statusbar = new element2d("", 0,color(48,48,48,255),color(48,48,48,255),10,0,scrY-32,scrX,scrY);
var StatusText = new element2d("CC-Animation Workflow", 0,color(48,48,48,0),color(48,48,48,0),10,10,Statusbar.Y1+8,scrX,scrY);
// creating a menu item
var FileMenuLabel = new element2d("File", 0,primaryBtnCol,secondaryBtnCol,10,20,0,30,32); // Define menu label first
//setting all the items in the menu and menu panel to undefine.
var FileMenuPanel = undefined;
var FileMenuItem1 = undefined;
var FileMenuItem2 = undefined;
var FileMenuItem3 = undefined;
var FileMenuItem4 = undefined;
var FileMenuItem5 = undefined;
var FileMenuItem6 = undefined;
// Destroy and recreaated menu panels on click
FileMenuLabel.onClick  = function(){
	
		if( FileMenuPanel == undefined){ FileMenuPanel = new element2d("", 0,primaryPanelCol,primaryPanelCol,10,20,33,300,500);}
		if( FileMenuItem1 == undefined){ FileMenuItem1 = new element2d("New", 1,primaryBtnCol,secondaryBtnCol,10,(FileMenuPanel.X2/2)-FileMenuPanel.X1,FileMenuPanel.Y2/10,(FileMenuPanel.X2/2)-FileMenuPanel.X1+10,32);}
		//create only first item with manual values and then simply use it to allign all other menu items
		var itemindex = FileMenuItem1.bufferIndex;
		
		if( FileMenuItem2 == undefined){ FileMenuItem2 = new element2d("Open", 1,primaryBtnCol,secondaryBtnCol,10,element2dBuffer[itemindex].X1,element2dBuffer[itemindex].Y1+element2dBuffer[itemindex].Y2+element2dBuffer[itemindex].fontSize,element2dBuffer[itemindex].X2,32);itemindex += 1;}
		if( FileMenuItem3 == undefined){ FileMenuItem3 = new element2d("Save", 1,primaryBtnCol,secondaryBtnCol,10,element2dBuffer[itemindex].X1,element2dBuffer[itemindex].Y1+element2dBuffer[itemindex].Y2+element2dBuffer[itemindex].fontSize,element2dBuffer[itemindex].X2,32);itemindex += 1;}
		if( FileMenuItem4 == undefined){ FileMenuItem4 = new element2d("Delete", 1,primaryBtnCol,secondaryBtnCol,10,element2dBuffer[itemindex].X1,element2dBuffer[itemindex].Y1+element2dBuffer[itemindex].Y2+element2dBuffer[itemindex].fontSize,element2dBuffer[itemindex].X2,32);itemindex += 1;}
		if( FileMenuItem5 == undefined){ FileMenuItem5 = new element2d("About", 1,primaryBtnCol,secondaryBtnCol,10,element2dBuffer[itemindex].X1,element2dBuffer[itemindex].Y1+element2dBuffer[itemindex].Y2+element2dBuffer[itemindex].fontSize,element2dBuffer[itemindex].X2,32);itemindex += 1;}
		if( FileMenuItem6 == undefined){ FileMenuItem6 = new element2d("Quit", 1,primaryBtnCol,secondaryBtnCol,10,element2dBuffer[itemindex].X1,element2dBuffer[itemindex].Y1+element2dBuffer[itemindex].Y2+element2dBuffer[itemindex].fontSize,element2dBuffer[itemindex].X2,32);itemindex += 1;}
		}
		// destroy the panel and all menu items when clicked outside the clickable elements.
		//for testing purpose we are not recreating the last menu item "Quit" it will be created only once and then destroyed for forever.

FileMenuLabel.onOutsideClick = function() {
	if(!FileMenuPanel.isMouseOver()){
	var index = FileMenuPanel.bufferIndex; if(index > -1){element2dBuffer.splice(index); FileMenuPanel = undefined; FileMenuItem1 = undefined; FileMenuItem2 = undefined; FileMenuItem3 = undefined; FileMenuItem4 = undefined;  FileMenuItem5 = undefined;}
 }}// undefine all the elements which should be recreated on menu recreation//
	










