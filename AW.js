ccbSetWorkingDirectory("AW//");
ccbSetCursorVisible(true);
var scrX = ccbGetScreenWidth();
var scrY = ccbGetScreenHeight();
var tempMouseX =  undefined;
var tempMouseY = undefined;
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
var shadowCol = color(10,10,10,150);
var selectionCol   = color(255,255,255,5);


element2d = function(object){
	this.text = (object.text) ? object.text : "";
	this.textSpacing = (object.textSpacing) ? object.textSpacing : 0;
	this.fontSize = (object.fontSize) ? object.fontSize : 10;
	this.panelColor = (object.panelColor) ? object.panelColor : primaryBtnCol;
	this.onHoverColor = (object.onHoverColor) ? object.onHoverColor : secondaryBtnCol;
	this.NormalColor = (object.panelColor) ? object.panelColor : primaryPanelCol;
	this.X1 = (object.X1) ? object.X1 : 0 ;
	this.X2 = (object.X2) ? object.X2 : 50;
	this.onClick = (object.onClick) ? object.onClick: function(){};
	this.CustomDraw = (object.CustomDraw) ? object.CustomDraw: function(){};
	this.onMouseOver = (object.onMouseOver) ? object.onMouseOver: function(){};
	this.isMouseOver = (object.isMouseOver) ? object.isMouseOver: function(){
		var mouseX = ccbGetMousePosX();
		var mouseY = ccbGetMousePosY();
		var bool   = null;
	
		if(mouseX > (this.X1-(this.fontSize/2)) && mouseX < this.X2+(this.fontSize*this.text.length) && mouseY > this.Y1-(this.fontSize/2) && mouseY < this.Y1+this.Y2)
		 {  
		  this.NormalColor = this.onHoverColor;
		  bool= true;
		
		 }
		 else{this.NormalColor = this.panelColor; bool = false; }
		 
		 return bool;};
	this.onOutsideClick = (object.onOutsideClick) ? object.onOutsideClick: function(){
		var mouseX = ccbGetMousePosX();
		var mouseY = ccbGetMousePosY();
		if(mouseY > scrY-32){mouseY = scrY-32-10};
		if(mouseY < 32){mouseY = 32+10};
		if (tempMouseX<=mouseX && tempMouseY<=mouseY )
		{
		ccbDrawColoredRectangle(selectionCol, tempMouseX, tempMouseY, mouseX, mouseY);
		}
		if (tempMouseX<=mouseX && tempMouseY>=mouseY )
		{
		ccbDrawColoredRectangle(selectionCol, tempMouseX, mouseY, mouseX, tempMouseY);
		}
		if (tempMouseX>=mouseX && tempMouseY<=mouseY )
		{
		ccbDrawColoredRectangle(selectionCol, mouseX,tempMouseY, tempMouseX, mouseY);
		}
		if (tempMouseX>=mouseX && tempMouseY>=mouseY )
		{
		ccbDrawColoredRectangle(selectionCol, mouseX, mouseY,tempMouseX,tempMouseY);
		}
	};
	this.Y1 = (object.Y1) ? object.Y1 : 0;
	this.Y2 = (object.Y2) ? object.Y2 : 32;
	this.Shadow = (object.Shadow) ? object.Shadow : false;
	this.ShadowPosition = (object.ShadowPosition) ? object.ShadowPosition : "bottomleft";
	this.ShadowColor = (object.ShadowColor) ? object.ShadowColor  : shadowCol;
	this.bufferIndex = element2dBuffer.push(this) - 1;
}
element2d.prototype.onFrameEvent = function(){
	//for frame events
	this.draw();
	this.CustomDraw();
	
	//for  mouse events
	if(this.isMouseOver()){
		this.onMouseOver();

		if(mouseDownL && this.clickdown ){
			this.onClick();
		
		}
	}else{
		if(mouseDownL){
			this.clickdown = false;
			this.onOutsideClick();
		}
		else {this.clickdown = true}
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
	if(this.Shadow){
		if (this.ShadowPosition == "left" || this.ShadowPosition == "bottomleft"){
	ccbDrawColoredRectangle(this.ShadowColor,X2,Y1,X2+5,Y1+Y2);}
	if (this.ShadowPosition == "bottom" || this.ShadowPosition == "bottomleft"){
		ccbDrawColoredRectangle(this.ShadowColor,X1,Y1+Y2,X2+5,Y1+Y2+5);}
}
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

//mouseDownFunction

ccbRegisterMouseDownEvent("functionMouseDown");
ccbRegisterMouseUpEvent("functionMouseUp");

function functionMouseDown (click){
	// print(click);
	if(click == 0){
		mouseDownL = true;
		tempMouseX = ccbGetMousePosX();
		tempMouseY = ccbGetMousePosY();
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
var Menubar = new element2d({X2:scrX, panelColor: color(30,30,30,255), onHoverColor: color(30,30,30,255), onClick : function(){ if (tempMouseY < 32){tempMouseY = 32+10}} });
var Statusbar = new element2d({panelColor: color(48,48,48,255), onHoverColor: color(48,48,48,255), Y1: scrY-32, X2: scrX, Y2: scrY,  onClick : function(){ if (tempMouseY > scrY-32){tempMouseY = scrY-32-10}} });

// creating a menu item
var FileMenuLabel = new element2d({text: "File", X1: 20, Y1: 0, X2: 30, Y2: 32}); // Define menu label first
//setting all the items in the menu and menu panel to undefine.
var FileMenuPanel = undefined;
var FileMenuItem1 = undefined;
var FileMenuItem2 = undefined;
var FileMenuItem3 = undefined;
var FileMenuItem4 = undefined;
var FileMenuItem5 = undefined;
var FileMenuItem6 = undefined;

FileMenuLabel.onClick  = function(){
	
		if( FileMenuPanel == undefined){ FileMenuPanel = new element2d({Shadow: true, panelColor: primaryPanelCol, onHoverColor: primaryPanelCol, X1: 20, Y1: 33, X2: 300, Y2: 500});}
		if( FileMenuItem1 == undefined){ FileMenuItem1 = new element2d({ text: "New",X1: (FileMenuPanel.X2/2)-FileMenuPanel.X1, Y1: FileMenuPanel.Y2/10, X2: (FileMenuPanel.X2/2)-FileMenuPanel.X1+10,Y2: 32});}
		//create only first item with manual values and then simply use it to allign all other menu items
		var itemindex = FileMenuItem1.bufferIndex;
		if( FileMenuItem2 == undefined){ FileMenuItem2 = new element2d({ text: "Open", X1: element2dBuffer[itemindex].X1, Y1: element2dBuffer[itemindex].Y1+element2dBuffer[itemindex].Y2+element2dBuffer[itemindex].fontSize, X2: element2dBuffer[itemindex].X2, Y2: 32});itemindex += 1;}
		if( FileMenuItem3 == undefined){ FileMenuItem3 = new element2d({ text: "Save", X1: element2dBuffer[itemindex].X1, Y1: element2dBuffer[itemindex].Y1+element2dBuffer[itemindex].Y2+element2dBuffer[itemindex].fontSize, X2: element2dBuffer[itemindex].X2, Y2: 32});itemindex += 1;}
		if( FileMenuItem4 == undefined){ FileMenuItem4 = new element2d({ text: "Delete", X1: element2dBuffer[itemindex].X1, Y1: element2dBuffer[itemindex].Y1+element2dBuffer[itemindex].Y2+element2dBuffer[itemindex].fontSize, X2: element2dBuffer[itemindex].X2, Y2: 32});itemindex += 1;}
		if( FileMenuItem5 == undefined){ FileMenuItem5 = new element2d({ text: "About", X1: element2dBuffer[itemindex].X1, Y1: element2dBuffer[itemindex].Y1+element2dBuffer[itemindex].Y2+element2dBuffer[itemindex].fontSize, X2: element2dBuffer[itemindex].X2, Y2: 32});itemindex += 1;}
		if( FileMenuItem6 == undefined){ FileMenuItem6 = new element2d({ text: "Quit", X1: element2dBuffer[itemindex].X1, Y1: element2dBuffer[itemindex].Y1+element2dBuffer[itemindex].Y2+element2dBuffer[itemindex].fontSize, X2: element2dBuffer[itemindex].X2, Y2: 32});itemindex += 1;}

		
	
		FileMenuItem2.onClick = function(){
			ccbSwitchToCCBFile("test.ccb");
			
		}
	
	}
		
		
// Destroy and recreaated menu panels on click
FileMenuLabel.onOutsideClick = function() {// destroy the panel and all menu items when clicked outside the clickable elements.
	//for testing purpose we are not recreating the last menu item "Quit" it will be created only once and then destroyed for forever.
	if(!FileMenuPanel.isMouseOver()){
	var index = FileMenuPanel.bufferIndex; if(index > -1){element2dBuffer.splice(index); FileMenuPanel = undefined; FileMenuItem1 = undefined; FileMenuItem2 = undefined; FileMenuItem3 = undefined; FileMenuItem4 = undefined;  FileMenuItem5 = undefined;}
 }}// undefine all the elements which should be recreated on menu recreation//
