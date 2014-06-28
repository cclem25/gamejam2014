/**
 *	item.js
 *		
 *	Design of items (objects) inside a scene
 */

function item(_id, _sp) {

	// id of the object
	var id = _id;

	// sprite of the object in the scene
	var spriteInScene = _spInScene; 

	// sprite of the object in the inventory
	var spriteInScene = _spInScene; 	
	
	// 
	this.isVisible = function() { return true; }
	
	this.onUse = null; 
	
	this.onUseWith = null;
	
}