/**
 * Class character
 */

/**
 *	@param	string	file
 * 	@param	int		ratio
 *	@param	int		direction		0 to 7, 0 is the north
 *	@param	bool	isRunning		boolean to activate animation
 *	@param	callback
 */
function character(file, direction, isRunning, callback){
	
	/*
	var img = new Image();	
	img.src = file;
	img.onload = callback;
	img.onerror = function() { alert("Error while loading spritesheet: " + img.src); };
	*/
	
	var currentAnimation = null;
	//var point = _pt;
	var direction = direction;
	this.setDirection = function(newDir) {
		direction = newDir;	
		currentAnimation = animation[direction];
	}
	
	var isRunning = isRunning;
	this.setRunning = function(newRun) {
		isRunning = newRun;	
	}

	var animation = new Object();
	animation["N"] = new Animation(file, 282, 80, 1125, 0, 12, 80, 0, 0, 1, callback);
	animation["E"] = new Animation(file, 275, 120, 852, 0, 12, 121, 0, 1, 1, callback);
	animation["W"] = new Animation(file, 275, 120, 852, 0, 12, 121, 0, 0, 1, callback);
	animation["SE"] = new Animation(file, 276, 120, 578, 0, 12, 121, 0, 1, 1, callback);
	animation["S"] = new Animation(file, 285, 85, 292, 0, 12, 85, 0, 0, 1, callback);
	animation["SE"] = new Animation(file, 276, 120, 578, 0, 12, 121, 0, 1, 1, callback);
	animation["SW"] = new Animation(file, 276, 120, 578, 0, 12, 121, 0, 0, 1, callback);
	animation["NW"] = new Animation(file, 290, 111, 1407, 0, 12, 111, 0, 0, 1, callback);
	animation["NE"] = new Animation(file, 290, 111, 1407, 0, 12, 111, 0, 1, 1, callback);

	var positionArret = new Object();
	positionArret["N"] = new Animation(file, 290, 100, 0, 520, 1, 0, 0, 0, 1, callback);
	positionArret["NE"] = new Animation(file, 290, 100, 0, 660, 1, 111, 0, 1, 1, callback);
	positionArret["E"] = new Animation(file, 290, 100, 0, 260, 1, 103, 0, 1, 1, callback);
	positionArret["SE"] = positionArret["E"];
	positionArret["S"] = new Animation(file, 290, 100, 0, 140, 1, 78, 0, 0, 1, callback);
	positionArret["SW"] = new Animation(file, 290, 100, 0, 0, 1, 78, 0, 0, 1, callback);
	positionArret["W"] = positionArret["SW"];
	positionArret["NW"] = new Animation(file, 290, 100, 0, 370, 1, 111, 0, 0, 1, callback);

	if(isRunning){
		currentAnimation = animation[direction];
	}
	else
		currentAnimation = positionArret[direction];

	this.draw = function(context, destX, destY, ratio) {
		currentAnimation.setRatio(ratio);
		currentAnimation.draw(context, destX, destY);
	}

	this.play = function(){
		currentAnimation.play();
	}

	this.getCurrentAnimation = function(){
		return currentAnimation;
	}
}

/**
 * Class animation
 */

/**
 * Contructeor, create an animation of an image
 * @param	string	file					file of an image
 * @param	canvas	_cvs
 * @param	context	_ctx
 * @param	int		sourceHeight			height of a sprite frame
 * @param	int		sourceWidth				widt of a sprite frame
 * @param	int		sourceSpriteSheetX		Vertical offset for the sprite
 * @param	int		sourceSpriteSheetY		Horizontal offset for te sprite
 * @param	ini		nbFrames 				Number of frames composing the animation
 * @param	int		decX					Horizontal offset between 2 frames
 * @param	int		decY					Vertical offset between 2 frames
 * @param	bool 	flip					flip teh sprite.
 */
function Animation(file, sourceHeight, sourceWidth, sourceSpriteSheetY, sourceSpriteSheetX,  nbFrames, decX, decY, flip, ratio, callbackWhenReady) {

	var img = new Image();	
	img.src = file;
	img.onload = callbackWhenReady;
	img.onerror = function() { alert("Error while loading spritesheet: " + img.src); };

	var decX = decX;
	var decY = decY;
	var nbFrames = nbFrames;
	var sourceHeight = sourceHeight;
	var sourceWidth = sourceWidth;
	var sourceSpriteSheetX = sourceSpriteSheetX;
	var sourceSpriteSheetY = sourceSpriteSheetY;
	var flip = flip;
	var state = -1; 					// -1 : stopped, 0, 1, 2, etc. frame 
	var ratio = ratio;						// set the ratio of the currently displayed image
	var destHeight = Math.floor(sourceHeight * ratio);		// destination height
	var destWidth = Math.floor(sourceWidth * ratio);		// source width
	var sourceX = sourceSpriteSheetX
	var sourceY = sourceSpriteSheetY

	/**
	 *	Changes the current coordinates of the displayed picture.
	 */
	this.setXY = function(_x, _y) {
		destX = _x;
		destY = _y;
	}

	/**
	 *	Sets the new ratio for image display.
	 */
	this.setRatio = function(nr) {
		ratio = nr;
		destHeight = Math.floor(sourceHeight * ratio);
		destWidth = Math.floor(sourceWidth * ratio);
	}

	this.draw = function(context, posX, posY) {
        if (flip == 1) {
        	context.save();
        	context.scale(-1,1);	
	        context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, -posX-(sourceWidth*ratio)/2 , posY- sourceHeight*ratio + 40, destWidth, destHeight);
			context.restore();	
        }
        else {
	        context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, posX-(sourceWidth*ratio)/2, posY- sourceHeight*ratio + 40, destWidth, destHeight);
        }
		if (state >= 0) {
			state = (state + 1) % nbFrames;
			sourceX = sourceSpriteSheetX + decX * state;
			sourceY = sourceSpriteSheetY + decY * state;
			/*
			if (ratio < 1) 
				this.setRatio(ratio+0.01);
			*/
		}
	}

	this.reset = function(){
		sourceX = sourceSpriteSheetX;
		sourceY = sourceSpriteSheetY;
	}

	this.play = function() {
		if (state == -1) {
			state = 0;
		}
	}

	this.isPlaying = function() {
		return state >= 0;
	}

	this.stop = function() {
		if (state >= 0) {
			state = -1;
		}
	}
}