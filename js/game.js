/**
 *	Game.js
 *		
 *	Design of a game
 */


function Game() {

	/** Internal variables */
	var variables = new Object();

	/** Scenes of the game */
	var scenes =  new Object();
	
	/** Current scene of the game */
	var currentScene = null;
	
	/** Inventory */
	var inventory = new Object();
	
	
		
	
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
	
}


