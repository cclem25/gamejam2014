/**
 *	item.js
 *		
 *	Design of items (objects) inside a scene
 */

function Item(_id, _spInScene, _x, _y, _spInInventory) {

	// id of the object
	var id = _id;
	getId = function() { return id; }

	// sprite of the object in the scene
	this.spriteInScene = new Image();
	if (_spInScene != null) { 
		this.spriteInScene.src = _spInScene; 
	}

	// coordinates
	this.x = _x;
	this.y = _y;


	// sprite of the object in the inventory
	this.spriteInInventory = _spInInventory; 	
	
	// check if the object is visible in the scene
	this.isVisible = function() { return true; }
	

	/**
	 *	Computes the code that displays the image of the object as the pointer
	 */
	this.getCodeToDisplayImageAsCursor = function() {		
		return 'url(' + this.spriteInInventory + ') ' + 47 + ' ' + 10 /* Math.floor((66 - imgInventoryTopMargin)/2) */ + ', auto';	
	}

	
	// function to execute when the object is used
	this.onUseInScene = null; 
	
	// function to execute when the object is used
	this.onUseInInventory = null; 
	
	// function to execute when the object is used with another object
	this.onUseWithInScene = null;
	
	// function to execute when the object is used with another object
	this.onUseWithInInventory = null;
	
	// function to execute when the object is looked in the scene
	this.onLookAtInScene = null;
	
	// function to execute when the object is looked in the inventory
	this.onLookAtInInventory = null;
	
	
}


function InteractiveArea(_id, _point, _radius) {

	this.id = _id;

	// id of the area
	this.isVisible = function() { return true; }
	
	// position of the area
	var position = _point;
	this.getPosition = function() { return position; }
	
	// radius of the area
	var radius = _radius;
	this.getRadius = function() { return radius; }
	
	// function to execute when the object is used
	this.onUse = null; 
	
	// function to execute when the object is used with another object
	this.onUseWith = null;
	
	// function to execute when the object is looked in the scene
	this.onLookAtInScene = null;
		
}



function Inventory() {
	
	// Existing items in the inventory
	var items = [];
	
	// adds an item to the inventory
	this.addItem = function(it) {
		items[items.length] = it;
	}
		
	// returns the ith item
	this.getItem = function(i) {
		return (i < items.length) ? items[i] : null;
	}	
	
	// checks if the inventory contains a given item
	this.containsItem = function(id) {
		for (var i in items) {
			if (items[i].id == id) {
				return true;	
			}	
		}	
		return false;
	} 
		
	// update inventory in display
	this.updateInDisplay = function() {
		for (var i=0; i < 7; i++) {
			var htmlCode = "";
			var b = document.getElementById("bcInv" + i);
			if (i < items.length) {
				htmlCode = "<img src='" + items[i].spriteInInventory + "'>";
				if (items[i] != null) {
					b.style.visibility = "visible";
					if (items[i] == game.getSelectedObject()) {
						b.style.backgroundColor = "#FCBA5F";
					}
					else {
						b.style.backgroundColor = "#FFFFFF";
					}
				}
			}	 
			else {
				b.style.visibility = "hidden";	
			}
			b.innerHTML = htmlCode;
		}
	}
	
	this.updateInDisplay();	
}



function Message(_txt, _color, _x, _y, _duration) {
	
	// Text of the message
	this.text = _txt;
	// Color of the message
	this.color = _color;
	// Duration of the message
	this.duration = _duration;
	// X coordinate of the message
	this.x = _x;
	// Y coordinate of the message
	this.y = _y;
		
}

