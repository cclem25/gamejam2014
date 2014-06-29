/**
 *	Game.js
 *		
 *	Design of a game
 */


function Game(_cvs) {

	/** Internal variables */
	var variables = new Object();

	/** Scenes of the game */
	var scenes =  new Object();
	
	/** Current scene of the game */
	var currentScene = null;
	
	/** Inventory */
	var inventory = new Inventory();
	this.getInventory = function() { return inventory; }
	
	/** Current action */
	this.currentAction = 4;
	
	/** selected object */
	var selectedObject = null;
	
	// Disabling of right button
	document.getElementById("gamearea").oncontextmenu = function(event) {
		if (event.button == 2) {
			game.nextAction();	
		}
		return false;
	}
	
	
	//---- GAME VARIABLES ---- 
	
	/**
	 *	Retrieves a variable value.	
	 *	@param	n	String		name of the variable
	 *	@return		the variable value
	 */	
	this.getVariableValue = function(n) {
		
	}
	
	/**
	 *	Sets a variable value
	 *	@param 	n	String		name of the variable
	 *	@param	v	Object  	value of the variable
	 */
	this.setVariableValue = function(n, v) {
		variables[n] = v;	
	}
	
	
	//---- GAME SCENES ----
	
	/**
	 *	Add a scene to the game
	 */
	this.addScene = function(sc) {
		scenes[sc.getName()] = sc;
	}
	
	/**
	 *	Retrieves an existing scene by its name
	 *	@param 	n	String		name of the scene 
	 *	@return		Scene		the scene, null is not existing
	 */
	this.getScene = function(n) {
		return (scenes[n]) ? scenes[n] : null;	
	}
	
	
	//----- current scene ----
	
	/**
	 *	retrieves the current scene
	 */
	this.getCurrentScene = function() {
		return currentScene;
	}
	
	/**
	 *	Sets the current scene
	 *	@param scName 	String 	Name of the scene
	 */
	this.setCurrentScene = function(scName) {
		currentScene = (this.getScene(scName) != null) ? this.getScene(scName) : currentScene;
	} 
	
		
	// ----------------------------------- //
	// ------ Management of actions ------ //
	// ----------------------------------- //
	
	this.NO_ACTION = 0;
	this.LOOK_AT = 1;
	this.USE = 2;
	this.USE_WITH = 3;
	
	/**
	 *	Change the current action (moves to the next one). 
	 *	Invoked when the user right-clicks on the board.
	 */
	this.nextAction = function() {
		// update the action kind
		this.currentAction = (this.currentAction + 1) % 4;
		if (this.currentAction == this.USE_WITH && selectedObject == null) {
			this.currentAction = 0;	
		}
		this.updateCursor();
	}
	
	this.updateCursor = function() {
		// update the cursor shape
		var board = document.getElementById("gamearea");
		switch (this.currentAction) {
			case this.NO_ACTION:
				board.style.cursor = "url(./images/cursor.png) 12 0, auto";
				break;
			case this.LOOK_AT: 
				board.style.cursor = "url(./images/yeux.png) 25 16, auto";
				break;
			case this.USE:
				board.style.cursor = "url(./images/main.png) 3 5, auto";
				break; 	
			case this.USE_WITH:			
				board.style.cursor = selectedObject.getCodeToDisplayImageAsCursor();
				break;
		}
	}



	/** 
	 *	Update the inventory display
	 */
	this.updateInventoryDisplay = function() {
		inventory.updateInDisplay();
	} 

	/**
	 *	Sets the selected object
	 */
	this.setSelectedObject = function(o) {
		selectedObject = o;
	}	
	
	/**
	 *	Retrieves the currently selected object
	 */
	this.getSelectedObject = function() {
		return selectedObject;	
	}
		
}


