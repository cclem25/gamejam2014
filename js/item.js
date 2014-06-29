/**
 *	item.js
 *		
 *	Design of items (objects) inside a scene
 */

function Item(_id, _spInScene, _spInInventory) {

	// id of the object
	var id = _id;

	// sprite of the object in the scene
	var spriteInScene = new Image();
	spriteInScene.src = _spInScene; 

	// sprite of the object in the inventory
	var spriteInInventory = new Image();
	spriteInInventory.src = _spInInventory; 	
	
	// check if the object is visible in the scene
	this.isVisible = function() { return true; }
	
	// function to execute when the object is used
	this.onUse = null; 
	
	// function to execute when the object is used with another object
	this.onUseWith = null;
	
	// function to execute when the object is looked in the scene
	this.onLookAtInScene = null;
	
	// function to execute when the object is looked in the inventory
	this.onLookAtInInventory = null;
	
}


function InteractiveArea(_id, _point, _radius) {

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
	
	// function to execute when the object is looked in the inventory
	this.onLookAtInInventory = null;
	
}



function Inventory() {
	
	// Existing items in the inventory
	items = [];
	
	// adds an item to the inventory
	this.addItem(it) {
		items[items.length] = it;	
	}
		
	// update inventory in display
	this.updateInDisplay() {
		for (var i=0; i < 7
		document.getElementById
	}
	
	 	
		
}

