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
	var inventory = new Object();
	
	/** Current action */
	var currentAction = 0;
	
	/** selected object */
	var selectedObject = null;
	
	// Disabling of right button 	
	_cvs.oncontextmenu = function(event) {
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
	
	var NO_ACTION = 0;
	var LOOK_AT = 1;
	var USE = 2;
	var USE_WITH = 3;
	
	/**
	 *	Change the current action (moves to the next one). 
	 *	Invoked when the user right-clicks on the board.
	 */
	this.nextAction = function() {
		// update the action kind
		currentAction = (currentAction + 1) % 4;
		if (currentAction == USE_WITH && selectedObject == null) {
			currentAction = 0;	
		}
		// update the cursor shape
		var board = _cvs;
		switch (currentAction) {
			case NO_ACTION:
				board.style.cursor = "url(./images/cursor.png) 12 0, auto";
				break;
			case LOOK_AT: 
				board.style.cursor = "url(./images/yeux.png) 25 16, auto";
				break;
			case USE:
				board.style.cursor = "url(./images/main.png) 3 5, auto";
				break; 	
//			case USE_WITH:			
//				board.style.cursor = selectedObject.getCodeToDisplayImageAsCursor();
//				break;
		}
	}


	
		
}


