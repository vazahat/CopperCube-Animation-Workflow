
//do all the editor related stuff here.
ccbSetWorkingDirectory("AW//");
ccbSetCursorVisible(true); // set mouse cursor always visible


// define constant variables with full scope//
var scrX = ccbGetScreenWidth();
var scrY = ccbGetScreenHeight();
var tempMouseX =  undefined;
var tempMouseY = undefined;
mouseDownL = null;
mouseDownR = null;

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
function toHexcol(rgb) 
{
  var hexColor = rgb.toString(16);
  while (hexColor.length < 2) {hexColor = "0" + hexColor; }
  return hexColor;
}
//
//define Themes color schemes //
var primaryBtnCol = color(30,30,30,0);
var primaryPanelCol = color(30,30,30,150);
var secondaryBtnCol = color(86,128,194,255);
var testColor = color(30,30,30,255);
var shadowCol = color(10,10,10,150);
var selectionCol   = color(255,255,255,5);


// main 
var element2dBuffer = [];
e2dFrameEvent = function()
{
	for(var i = 0; i < element2dBuffer.length; i++)
	{
		element2dBuffer[i].onFrameEvent();
	}
}

// constructor
element2d = function(object)
{
	//properties of object
	this.text = (object.text) ? object.text : ""; //label
	this.type = (object.type) ? object.type :"panel"; //panel
	this.status = (object.status) ? object.status : "";// status bar info
	this.textSpacing = (object.textSpacing) ? object.textSpacing : 0; //text spacing
	this.fontSize = (object.fontSize) ? object.fontSize : 10; // text size
	this.btn1 = (object.btn1) ? object.btn1 :  "Yes"; //box btn1
	this.btn2 = (object.btn2) ? object.btn2 :  "No"; //box btn2
	this.btn3 = (object.btn3) ? object.btn3 :  "Ok"; //box btn3
	this.btn4 = (object.btn4) ? object.btn4 :  "Cancel"; //box btn4
	this.imageSource = (object.ImageSource) ? object.ImageSource : "icon.png" // image
	//Color props
	this.panelColor = (object.panelColor) ? object.panelColor : primaryBtnCol; //color 
	this.onHoverColor = (object.onHoverColor) ? object.onHoverColor : secondaryBtnCol;// color btn
	this.NormalColor = (object.panelColor) ? object.panelColor : primaryPanelCol; //color 2
	this.testColor =(object.testColor) ? object.testColor : testColor;
	// Position and allignment props
	this.X = (object.X) ? object.X : 0 ; //pos X
	this.width = (object.width) ? object.width : this.X+50; // Width
	this.Y = (object.Y) ? object.Y : 0;
	this.height = (object.height) ? object.height :this.Y+32;
	//shadow portion
	this.Shadow = (object.Shadow) ? object.Shadow : false;
	this.ShadowPosition = (object.ShadowPosition) ? object.ShadowPosition : "bottomleft";
	this.ShadowColor = (object.ShadowColor) ? object.ShadowColor  : shadowCol;
	this.ShadowSize = (object.ShadowSize) ? object.ShadowSize : 5;
	//
	this.bufferIndex = element2dBuffer.push(this) - 1;
	// functions
	this.onClick = (object.onClick) ? object.onClick: function(){};
	this.CustomDraw = (object.CustomDraw) ? object.CustomDraw: function(){};
	this.onMouseOver = (object.onMouseOver) ? object.onMouseOver: function(){};
	this.isMouseOver = (object.isMouseOver) ? object.isMouseOver: function()
	{
		var mouseX = ccbGetMousePosX();
		var mouseY = ccbGetMousePosY();
		var bool   = null;
	
		if(mouseX > (this.X-(this.fontSize/2)) && mouseX < this.width+(this.fontSize*this.text.length) && mouseY > this.Y-(this.fontSize/2) && mouseY < this.Y+this.height)
		 {  
		 	 this.NormalColor = this.onHoverColor;
		 	 bool= true;
		 	 if (this.status != ""){status.text = this.status}; // setting status on cursor over
		 }
		 else{this.NormalColor = this.panelColor; bool = false;if(this.status){status.text = "CC Animation Workflow"}} // setting status to original when no cursor over
		 
		 return bool;
	}

	this.onOutsideClick = (object.onOutsideClick) ? object.onOutsideClick: function()
	{
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
	
}

element2d.prototype.onFrameEvent = function()
{
	//for frame events
	this.draw();
	this.CustomDraw();
	
	//for  mouse events
	if(this.isMouseOver())
	{
		this.onMouseOver();

		if(mouseDownL && this.clickdown )
		{
			this.clickdown = false;
			this.onClick();
		}
	}
	else
	{
		if(mouseDownL)
		{
			this.clickdown = false;
			this.onOutsideClick();
		}
		else {this.clickdown = true}
	}
	 
}

element2d.prototype.draw = function()
{
	// rendering code here / ccbDraw calls
	var X = this.X;
	var width = this.width;
	var Y = this.Y;
	var height = this.height;
	color = this.NormalColor;
	//Auto adjusting the panel width. width
	if (width < X+(this.text.length*this.fontSize)+this.fontSize)
	{
		width += (this.fontSize*this.text.length);
	}
	// Draw BG color or Panel
	if(this.type == "panel" || this.type == "panelWithText")
	{
		ccbDrawColoredRectangle(color,X-(this.fontSize/2),Y,width,Y+height);
	}
	//draw shadows
	if(this.Shadow)
	{
		if (this.ShadowPosition == "left" || this.ShadowPosition == "bottomleft")
		{
			ccbDrawColoredRectangle(this.ShadowColor,width,Y,width+this.ShadowSize,Y+height);
		}
		if (this.ShadowPosition == "bottom" || this.ShadowPosition == "bottomleft")
		{
			ccbDrawColoredRectangle(this.ShadowColor,X,Y+height,width+this.ShadowSize,Y+height+this.ShadowSize);
		}
	}
	
	Y = Y+(this.fontSize/2);
	//draw texture according to the string//
	
	for(var i =0;i < this.text.length; i++)
	{
	
		if(isLowerCase(this.text.charAt(i))) // check for letter case
		{
			var strCase = "L_"
		}
    	else{ strCase = ""};
		if(this.type == "label" || this.type == "panelWithText")
		{
			ccbDrawTextureRectangleWithAlpha("font//"+strCase+this.text.charAt(i)+".png", X+(i*this.fontSize)+this.textSpacing, Y, X+(i*this.fontSize)+this.fontSize, Y+this.fontSize+(this.fontSize/1.5));
		}	
	}
	// draw image	
	if( this.type == "image" || this.type == "icon")
	{
		ccbDrawTextureRectangleWithAlpha(this.imageSource,this.X,this.Y,this.X+this.width,this.Y+this.height);
	}
	return;
}

//mouseDownFunction

ccbRegisterMouseDownEvent("functionMouseDown");
ccbRegisterMouseUpEvent("functionMouseUp");

function functionMouseDown (click)
{
	// print(click);
	if(click == 0)
	{
		mouseDownL = true;
		tempMouseX = ccbGetMousePosX();
		tempMouseY = ccbGetMousePosY();
	}
		

	if(click == 1)
	{
		mouseDownR = true;
	}
}
function functionMouseUp (click)
{
	if(click == 0)
	{
		mouseDownL = false;
	}

	if(click == 1)
	{
		mouseDownR = false;
	}
}


// Draw Function
ccbRegisterOnFrameEvent(e2dFrameEvent);

// START FUNCTION: Drawing elements//
//element2d = function(text, textSpacing, panelColor, onHoverColor, fontSize, X, Y, width, height){
var Menubar = new element2d({type: "panel", width:scrX, panelColor: color(30,30,30,255), onHoverColor: color(30,30,30,255), onClick : function(){ if (tempMouseY < 32){tempMouseY = 32+10}} });
var Statusbar = new element2d({panelColor: color(48,48,48,255), onHoverColor: color(48,48,48,255), Y: scrY-32, width: scrX, height: scrY,  onClick : function(){ if (tempMouseY > scrY-32){tempMouseY = scrY-32-10}} });
var status = new element2d({type: "label",text: "CC Animation workflow", X:10, Y: scrY-30, height:scrY, fontSize:8});
var versionInfo = new element2d({type: "label",text: "V 0.1", X:scrX-100, Y: scrY-30, height:scrY, fontSize:8});
// creating a menu item
var FileMenuLabel = new element2d({status:"Open File menu",type: "panelWithText", text: "File", X: 20, Y: 0, width: 30, height: 32}); // Define menu label first
//setting all the items in the menu and menu panel to undefine.
var FileMenuPanel = undefined;
var FileMenuItem1 = undefined;
var FileMenuItem2 = undefined;
var FileMenuItem3 = undefined;
var FileMenuItem4 = undefined;
var FileMenuItem5 = undefined;
var FileMenuItem6 = undefined;
var FileMenuItem7 = undefined;
var FileMenuItem8 = undefined;
var FileMenuItem9 = undefined;
var FileMenuItem10 = undefined;
var ConfirmBoxBG = undefined;
var ConfirmBoxL = undefined;
var ConfirmBoxB1 = undefined;
var ConfirmBoxB2 = undefined;
var ConfirmBoxB3 = undefined;
var ConfirmBoxB4 = undefined;
var ConfirmBoxI = undefined;
var Whatever = undefined;

FileMenuLabel.onClick  = function()
{
	
		if( FileMenuPanel == undefined){ FileMenuPanel = new element2d({Shadow: true, panelColor: primaryPanelCol, onHoverColor: primaryPanelCol, X: 20, Y: 33, width: 300, height: 500});}
		if( FileMenuItem1 == undefined){ FileMenuItem1 = new element2d({ type: "panelWithText", text: "New",X: (FileMenuPanel.width/2)-FileMenuPanel.X, Y: FileMenuPanel.height/10, width: (FileMenuPanel.width/2)-FileMenuPanel.X+10,height: 32});}
		//create only first item with manual values and then simply use it to allign all other menu items
		var itemindex = FileMenuItem1.bufferIndex;
		if( FileMenuItem2 == undefined){ FileMenuItem2 = new element2d({ type: "panelWithText", text: "Open", X: element2dBuffer[itemindex].X, Y: element2dBuffer[itemindex].Y+element2dBuffer[itemindex].height+element2dBuffer[itemindex].fontSize, width: element2dBuffer[itemindex].width, height: 32});itemindex += 1;}
		if( FileMenuItem3 == undefined){ FileMenuItem3 = new element2d({ type: "panelWithText", text: "Save", X: element2dBuffer[itemindex].X, Y: element2dBuffer[itemindex].Y+element2dBuffer[itemindex].height+element2dBuffer[itemindex].fontSize, width: element2dBuffer[itemindex].width, height: 32});itemindex += 1;}
		if( FileMenuItem4 == undefined){ FileMenuItem4 = new element2d({ type: "panelWithText", text: "Save as", X: element2dBuffer[itemindex].X, Y: element2dBuffer[itemindex].Y+element2dBuffer[itemindex].height+element2dBuffer[itemindex].fontSize, width: element2dBuffer[itemindex].width, height: 32});itemindex += 1;}
		if( FileMenuItem5 == undefined){ FileMenuItem5 = new element2d({ type: "panelWithText", text: "Import ccb model", X: element2dBuffer[itemindex].X, Y: element2dBuffer[itemindex].Y+element2dBuffer[itemindex].height+element2dBuffer[itemindex].fontSize, width: element2dBuffer[itemindex].width, height: 32});itemindex += 1;}
		if( FileMenuItem6 == undefined){ FileMenuItem6 = new element2d({ type: "panelWithText", text: "Export action", X: element2dBuffer[itemindex].X, Y: element2dBuffer[itemindex].Y+element2dBuffer[itemindex].height+element2dBuffer[itemindex].fontSize, width: element2dBuffer[itemindex].width, height: 32});itemindex += 1;}
		if( FileMenuItem7 == undefined){ FileMenuItem7 = new element2d({ type: "panelWithText", text: "Whatever", X: element2dBuffer[itemindex].X, Y: element2dBuffer[itemindex].Y+element2dBuffer[itemindex].height+element2dBuffer[itemindex].fontSize, width: element2dBuffer[itemindex].width, height: 32});itemindex += 1;}
		if( FileMenuItem8 == undefined){ FileMenuItem8 = new element2d({ type: "panelWithText", text: "test item", X: element2dBuffer[itemindex].X, Y: element2dBuffer[itemindex].Y+element2dBuffer[itemindex].height+element2dBuffer[itemindex].fontSize, width: element2dBuffer[itemindex].width, height: 32});itemindex += 1;}
		if( FileMenuItem9 == undefined){ FileMenuItem9 = new element2d({ type: "panelWithText", text: "About", X: element2dBuffer[itemindex].X, Y: element2dBuffer[itemindex].Y+element2dBuffer[itemindex].height+element2dBuffer[itemindex].fontSize, width: element2dBuffer[itemindex].width, height: 32});itemindex += 1;}
		if( FileMenuItem10 == undefined){ FileMenuItem10 = new element2d({ type: "panelWithText", text: "Quit", X: element2dBuffer[itemindex].X, Y: element2dBuffer[itemindex].Y+element2dBuffer[itemindex].height+element2dBuffer[itemindex].fontSize, width: element2dBuffer[itemindex].width, height: 32});itemindex += 1;}

		FileMenuItem2.onClick = function()
		{
			function replaceAll(str, find, replace)
			{
			var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
			return str.replace(new RegExp(escapedFind, 'g'), replace);
			}

			system("opener.bat",true);
			var filename = ccbReadFileContent("opener.txt");
			system("del /f opener.txt",true);
			var filename  = replaceAll(filename,"\\","/");
			var Filename = filename.substring(0, filename.length - 2);
			Menubar.CustomDraw = function()
			{
				ccbSwitchToCCBFile(Filename);
				var root = ccbGetRootSceneNode();
				ccbSetSceneNodeProperty(root,"BackgroundColor",60,60,60);
			}
		
			
		}
		FileMenuItem10.onClick = function()
		{
			if(ConfirmBoxBG == undefined){ConfirmBoxBG = new element2d({type: "panel", Shadow: true, panelColor:  primaryPanelCol, onHoverColor:  primaryPanelCol,  X: scrX/2-scrX/4,width: scrX/2+scrX/4, Y:scrY/2-scrY/4,height:scrY/4})}
			if(ConfirmBoxL == undefined){ConfirmBoxL = new element2d({type: "label", text: "Are you sure you want to Quit the application this is just a test to check the gradient",panelColor:  primaryPanelCol, onHoverColor:  primaryPanelCol,  X: scrX/2-scrX/4,width: scrX/2+scrX/4, Y:scrY/2-scrY/4,height:scrY/4})}
			if(ConfirmBoxI == undefined){ConfirmBoxI = new element2d({type: "image", panelColor:  primaryPanelCol, onHoverColor:  primaryPanelCol,  X: (scrX/2-scrX/4), Y:ConfirmBoxBG.height+100, width: 100, height: 100})}
			if(ConfirmBoxB1 == undefined){ConfirmBoxB1 = new element2d({type: "panelWithText",text: "Yes",X: ConfirmBoxBG.X+200, Y: ConfirmBoxBG.Y +200 ,height: 30})};
		}
		

		FileMenuItem7.onClick = function()
		{
			if(Whatever == undefined){Whatever = new element2d({ type: "panel", text: "this is a simple demo still in testing", X: 500, Y:200, width: 600,height:500,panelColor:  primaryPanelCol, onHoverColor: testCol })};
			//if(alertBoX1 == undefined){alertBoX1 = new element2d({type: "image", text: "This tool has been created by Vazahat pathan",panelColor:  primaryPanelCol, onHoverColor:  primaryPanelCol,  X: scrX/2-scrX/4,width: scrX/2+scrX/4, Y:scrY/2-scrY/4,height:scrY/4})}	
		}
	
	}
		
		
// Destroy and recreaated menu panels on click
FileMenuLabel.onOutsideClick = function() 
{	// destroy the panel and all menu items when clicked outside the clickable elements.
	//for testing purpose we are not recreating the last menu item "Quit" it will be created only once and then destroyed for forever.
	// undefine all the elements which should be recreated on menu recreation//
	if(!FileMenuPanel.isMouseOver())
	{
		
		{
			var index = FileMenuPanel.bufferIndex; if(index > -1){element2dBuffer.splice(index,11); FileMenuPanel = undefined; FileMenuItem1 = undefined; FileMenuItem2 = undefined; FileMenuItem3 = undefined; FileMenuItem4 = undefined;  FileMenuItem5 = undefined; FileMenuItem6 = undefined; FileMenuItem7 = undefined; FileMenuItem8 = undefined;   FileMenuItem9 = undefined;  FileMenuItem10 = undefined; }
		}
	}
}
