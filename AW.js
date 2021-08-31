ccbSetWorkingDirectory("AW//");
var scrX = ccbGetScreenWidth();
var scrY = ccbGetScreenHeight();
mouseDownL = null;
mouseDownR = null;
var element2dBuffer = [];
e2dFrameEvent = function(){
	for(var i = 0; i < element2dBuffer.length; i++){
		element2dBuffer[i].draw();
		element2dBuffer[i].isMouseOver();
	}
}

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
var FileMenuPanel = undefined;
var FileMenuItem1 = undefined;
//mouseDownFunction
ccbRegisterMouseDownEvent("functionMouseDown");
ccbRegisterMouseUpEvent("functionMouseUp");
function functionMouseDown (click){
	// print(click);
	if(click == 0){
		mouseDownL = true;
		if(FileMenuLabel.isMouseOver() || FileMenuPanel.isMouseOver() )
		{
		if( FileMenuPanel == undefined){ FileMenuPanel = new element2d("", 0,primaryPanelCol,primaryPanelCol,10,20,33,300,500);}
		if( FileMenuItem1 == undefined){ FileMenuItem1 = new element2d("About", 1,primaryBtnCol,secondaryBtnCol,10,(FileMenuPanel.X2/2)-FileMenuPanel.X1,FileMenuPanel.Y2/10,(FileMenuPanel.X2/2)-FileMenuPanel.X1+10,32);}

		}
		else { var index = element2dBuffer.indexOf(FileMenuPanel); if(index > -1){element2dBuffer.splice(index); FileMenuPanel = undefined; FileMenuItem1 = undefined} }
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

// START FUNCTION: Drawing elements//
//element2d = function(text, textSpacing, panelColor, onHoverColor, fontSize, X1, Y1, X2, Y2){
var Menubar = new element2d("", 0,color(30,30,30,255),color(30,30,30,255),10,0,0,scrX,32);
var Statusbar = new element2d("", 0,color(48,48,48,255),color(48,48,48,255),10,0,scrY-32,scrX,scrY);
var FileMenuLabel = new element2d("File", 0,primaryBtnCol,secondaryBtnCol,10,20,0,30,32);




// Draw Function

ccbRegisterOnFrameEvent(e2dFrameEvent);

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




