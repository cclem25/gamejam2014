/**
 * Class character
 */

/**
 *	@param	string	file
 *	@param	canvas	_cvs
 *	@param	context	_ctx
 *	@param	int		x				point to set the player in the canvas
 *	@param	int 	y
 * 	@param	int		ratio
 *	@param	int		direction		0 to 7, 0 is the north
 *	@param	bool	isRunning		boolean to activate animation
 *	@param	callback
 */
function character(file, _cvs, _ctx, x, y, ratio, direction, isRunning, callbackWhenReady){
	var img = new Image();	
	img.src = file;
	img.onload = callbackWhenReady;
	img.onerror = function() { alert("Error while loading spritesheet: " + img.src); };

	var context = _ctx;
	var canvas = _cvs;
	//var point = _pt;
	var direction = direction;
	var isRunning = isRunning;
	var sourceHeight = 290;
	var sourceWidth = 120;
	var sourceX = 0;
	var sourceY = 0;
	//var destX = point.x;
	//var destY = point.y;
	var destX = x;
	var destY = y;
	var ratio = ratio;
	var destHeight = Math.floor(sourceHeight * ratio);		// destination height
	var destWidth = Math.floor(sourceWidth * ratio);		// source width;

	switch(direction){
		case 0:
			sourceX = 0;
			break;
		case 1:
			sourceX = 120;
			break;
		case 2:
			sourceX = 240;
			break;
		case 3:
			sourceX = 360;
			break;
		case 4:
			sourceX = 520;
			break;
		case 5:
			sourceX = 650;
			break;
		default :
			alert("Attention cas non défini");
	}


	this.draw = function() {
		context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
	}
}