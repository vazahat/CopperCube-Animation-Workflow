ccbSetWorkingDirectory("AW//");
var element2dBuffer = [];
e2dFrameEvent = function(){
	for(var i = 0; i < element2dBuffer.length; i++){
		element2dBuffer[i].draw();
		element2dBuffer[i].isMouseOver();
	}
}

var primaryBtnCol = color(30,30,30,255);
var secondaryBtnCol = color(86,128,194,255)


element2d = function(text, textSpacing, panelColor, onHoverColor, fontSize, X1, Y1, X2, Y2){
	this.text = text;
	this.textSpacing = textSpacing;
	this.fontSize = fontSize;
	this.panelColor = panelColor;
	this.onHoverColor = onHoverColor;
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
	

	if (X2 < X1+(this.text.length*this.fontSize)+this.fontSize){
		X2 += (this.fontSize*this.text.length);
	}
	ccbDrawColoredRectangle(this.panelColor,X1-(this.fontSize/2),Y1,X2,Y1+Y2);
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
	if(mouseX > (this.X1-(this.fontSize/2)) && mouseX < this.X2+(this.fontSize*this.text.length) && mouseY > this.Y1 && mouseY < this.Y1+this.Y2)
	 {  /*here goes the command for hover*/ 
		this.panelColor = secondaryBtnCol;
	 }
	 else{this.panelColor = primaryBtnCol;}

}


// START FUNCTION:
var child = new element2d("File", 0,primaryBtnCol,secondaryBtnCol,10,20,0,30,32);
// child.draw();  // this will print the correct value


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




