/**
 *	Scene.js
 *		
 *	Design of a scene of the game
 */

var imgPOI = new Image();
imgPOI.src = "./images/poi.png";


/**
 * Constructor, creates a scene, with a given mesh associated to the main character.
 * 	@param 	_mesh		The mesh to consider
 *	@param	_bg			The background image to use
 */
function Scene(_name, _cvs, _mesh, _bg, _ctx, callback) {
	
	// scene name
	var name = _name;
	this.getName = function() { return name; }
	
	// canvas object
	var canvas = _cvs;
	var CVS_WIDTH = canvas.width;
	var CVS_HEIGHT = canvas.height;
		
	// associated mesh
	var mesh = _mesh;

	// background image properties
	var BG_WIDTH = 0;
	var BG_HEIGHT = 0; 	
	
	// callback function 
	var callbackWhenReady = callback;

	// targets points (define the path to follow when the character is moving)
	var targetPoint = [];
	var actionWhenPointIsReached = null;
	
	// offset used to manage scrolling
	var OFFSET_X = 0;
	this.getOFFSET_X = function() { return OFFSET_X; }
	var OFFSET_Y = 0;
	this.getOFFSET_Y = function() { return OFFSET_Y; }
	
	// context used for drawing.
	var context = _ctx;
	
	// current point for the character position
	var currentPoint = null;

	// movement speed
	var SPEED = 8;

	var passages = [];


	/**
	 *	@param startingPoint 
	 */
	this.loadWithLocation = function(startingPoint) {
		var imgBG = new Image();	
		imgBG.src = _bg;
		imgBG.onload = function() {
			// background image 
			canvas.style.backgroundImage = "url(" + imgBG.src + ")";
			BG_WIDTH = imgBG.width;
			BG_HEIGHT = imgBG.height; 	
			callbackWhenReady();
		};
		imgBG.onerror = function() { console.log("Error while loading background: " + imgBG.src); };
		currentPoint = startingPoint;	
	}
	
	
	
	/** 
	 *	Redraws the scene 
	 */
	this.redraw = function() {
		
		// clears context
		context.clearRect(0, 0, CVS_WIDTH, CVS_HEIGHT);
		
		// update offsets
		OFFSET_X = CVS_WIDTH / 2 - currentPoint.x;
		if (OFFSET_X > 0) {
			OFFSET_X = 0;	
		}	
		if (OFFSET_X < CVS_WIDTH - BG_WIDTH) {
			OFFSET_X = CVS_WIDTH - BG_WIDTH;	
		}
		
		OFFSET_Y = CVS_HEIGHT / 2 - currentPoint.y;
		if (OFFSET_Y > 0) {
			OFFSET_Y = 0;	
		}
		if (OFFSET_Y < CVS_HEIGHT - BG_HEIGHT) {
			OFFSET_Y = CVS_HEIGHT - BG_HEIGHT;	
		}
		
		context.fillStyle = "#FFFFFF";
		context.strokeStyle = "#FFFFFF";
		context.lineWidth = 2;
		
		// display of the mesh (comment to remove)
		mesh.display(context, OFFSET_X, OFFSET_Y);
		
		// positionning of the background
		canvas.style.backgroundPosition = "" + OFFSET_X + "px " + OFFSET_Y + "px";
		
		// display the passages :
		for (var i in passages) {
			if (passages[i].visible) {
				context.drawImage(imgPOI, passages[i].point.x + OFFSET_X - imgPOI.width/2, passages[i].point.y + OFFSET_Y - imgPOI.height/2);
			}
		}
				
		// display of the character
		context.beginPath();
		context.arc(currentPoint.x + OFFSET_X, currentPoint.y + OFFSET_Y, 10*currentPoint.zoom, 0, 2*Math.PI);		
		context.fill();
		context.fillText("c_p (" + currentPoint + ")", currentPoint.x - 10 + OFFSET_X, currentPoint.y + 20 + OFFSET_Y);
	
	/*
		if (targetPoint.length > 0) {
			context.fillStyle = "#FFFFFF";
			// display target point
			context.beginPath();
			context.arc(targetPoint[targetPoint.length-1].x + OFFSET_X, targetPoint[targetPoint.length-1].y + OFFSET_Y, targetPoint[targetPoint.length-1].zoom*10, 0, 2*Math.PI);		
			context.fill();
			for (var i=0; i < targetPoint.length; i++) {
				context.fillText(targetPoint[i].zoom, targetPoint[i].x + OFFSET_X, targetPoint[i].y + 20 + OFFSET_Y);
			}
			context.fillStyle = "#FFFFFF";
		}
		
	*/			
	}
	

	
	/**
	 *	Called when the scene is clicked
	 *	@param 	clickedPoint	the point that has just been clicked
	 */
	this.click = function(clickedPoint) {
		
		if (game.currentAction == game.LOOK_AT) {
			// TODO check if something can be seen in the scene (huhuhu)
			return;	
		}		
		
		var closest = mesh.getClosestPointAndSegment(clickedPoint);
		var pDest = closest.point;
		var segDest = closest.segment;
		pDest.zoom = this.getZoom(pDest, segDest.getPoint1(), segDest.getPoint2());
		var segSource = mesh.getClosestPointAndSegment(currentPoint).segment;
		var pathToTarget = mesh.getPathFromTo(currentPoint, segSource, pDest, segDest);
		targetPoint = [];
		for (var i=1; i < pathToTarget.length; i++) {
			targetPoint.push(new Point(pathToTarget[pathToTarget.length - 1 - i].x, 
									   pathToTarget[pathToTarget.length - 1 - i].y, 
									   pathToTarget[pathToTarget.length - 1 - i].zoom));
		}

		if (game.currentAction == game.NO_ACTION) {
			// clicked on a POI --> change scene
			for (var i in passages) {
				if (clickedPoint.distanceTo(passages[i].point) < 18) {
					actionWhenPointIsReached = new Passage(passages[i].point.x,passages[i].point.y, passages[i].toScene, passages[i].startingPoint);
					return;	
				}
			}
		}		
		if (game.currentAction == game.USE) {
			// TODO check if we match a given area	
		}
	}


	/**
	 *	Computes the zoom factor for the point p on segment p1, p2
	 *	@param	p 	the point for which the ratio is computed
	 *	@param 	p1	one extremity of the segment
	 *	@param 	p2	the other extremity of the segment
	 */
	this.getZoom = function(p, p1, p2) {
	
		if (p1.zoom == p2.zoom)
			return p1.zoom;
		
		var distanceP1P2 = p1.distanceTo(p2);
		var distancePP1 = p.distanceTo(p1);
		
		// ratio distance w.r.t. P1
		var ratio = distancePP1 / distanceP1P2;
		return p1.zoom + (ratio * (p2.zoom - p1.zoom));		
	}


	/**
	 *	Computes the next point if the character is moving. 
	 */
	this.nextPoint = function() {
		
		if (targetPoint.length == 0) {
			return false;
		}
		
		var norme = currentPoint.distanceTo(targetPoint[0]);
		
		// TODO optimize segment detection
		var realSpeed = mesh.getClosestPointAndSegment(currentPoint).segment.getSpeedFactor() * SPEED;
		
		// compute new position relateed to the direction to the target point.
		if (norme < realSpeed) {
			currentPoint.x = targetPoint.x;
			currentPoint.y = targetPoint.y;
			currentPoint.zoom = targetPoint.zoom;
			if (targetPoint.length > 0) {
				// remaining target points
				currentPoint = targetPoint.shift();
			}
			
			if (targetPoint.length == 0) {
				// target reached
				if (actionWhenPointIsReached != null) {
					game.setCurrentScene(actionWhenPointIsReached.toScene.getName());
					game.getCurrentScene().loadWithLocation(actionWhenPointIsReached.startingPoint);
					actionWhenPointIsReached = null;
				}	
			}
			return;
		}
		
		var vecX = targetPoint[0].x - currentPoint.x;
		var vecY = targetPoint[0].y - currentPoint.y;
		
		var oldDistance = norme;
		
		currentPoint.x = currentPoint.x + (vecX * realSpeed / norme);	
		currentPoint.y = currentPoint.y + (vecY * realSpeed / norme);
		
		var newDistance = currentPoint.distanceTo(targetPoint[0]);
		currentPoint.zoom += ((oldDistance - newDistance) / oldDistance) * (targetPoint[0].zoom - currentPoint.zoom);		
	
		return true;
	}
	
	
	/**
	 *	Adds a passage to another scene
	 *	@param p	Passage		the passage to add
	 */
	this.addPassage = function(p) {
		passages[passages.length] = p;	
	}

}


/**
 *	Class encapsulating passages from a scene to another
 */
function Passage(_x, _y, _toScene, _startingPoint) {
	
	/** Point coords */
	this.point = new Point(_x, _y);
	
	/** visibility */
	this.visible = true;

	/** destination scene */
	this.toScene = _toScene;
	
	/** starting point of the next scene */
	this.startingPoint = new Point(_startingPoint.x, _startingPoint.y);	
	
	this.toString = function() {
		return "Point = " + this.point + 
				"\nVisible = " + this.visible + 
				"\ntoScene = " + this.toScene.getName() + 
				"\nstartingPoint = " + this.startingPoint;  	
	}
		
}
