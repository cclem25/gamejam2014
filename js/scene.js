/**
 *	Scene.js
 *		
 *	Design of a scene of the game
 */


/**
 * Constructor, creates a scene, with a given mesh associated to the main character.
 * 	@param 	_mesh		The mesh to consider
 *	@param	_bg			The background image to use
 */
function Scene(_cvs, _mesh, _bg, _ctx, callback) {
	
	// canvas object
	var canvas = _cvs;
	var CVS_WIDTH = canvas.width;
	var CVS_HEIGHT = canvas.height;
		
	// associated mesh
	var mesh = _mesh;

	// background image properties
	var BG_WIDTH = 0;
	var BG_HEIGHT = 0; 	
	
	var imgBG = new Image();	
	imgBG.src = _bg;
	imgBG.onload = function() {
		// background image 
		canvas.style.backgroundImage = "url(" + imgBG.src + ")";
		BG_WIDTH = imgBG.width;
		BG_HEIGHT = imgBG.height; 	
		callback();
	};
	imgBG.onerror = function() { console.log("Error while loading background: " + imgBG.src); };

	// targets points (define the path to follow when the character is moving)
	var targetPoint = [];
	
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


	/**
	 *	@param startingPoint 
	 */
	this.loadWithLocation = function(startingPoint) {
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
				
		// display of the character
		context.beginPath();
		context.arc(currentPoint.x + OFFSET_X, currentPoint.y + OFFSET_Y, 10*currentPoint.zoom, 0, 2*Math.PI);		
		context.fill();
		context.fillText("c_p (" + currentPoint.zoom + ")", currentPoint.x - 10 + OFFSET_X, currentPoint.y + 20 + OFFSET_Y);
	
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
		var closest = mesh.getClosestPointAndSegment(clickedPoint);
		var pDest = closest.point;
		var segDest = closest.segment;
		pDest.zoom = this.getZoom(pDest, segDest.getPoint1(), segDest.getPoint2());
		var segSource = mesh.getClosestPointAndSegment(currentPoint).segment;
		var pathToTarget = mesh.getPathFromTo(currentPoint, segSource, pDest, segDest);
		targetPoint = [];
		for (i=1; i < pathToTarget.length; i++) {
			targetPoint.push(new Point(pathToTarget[pathToTarget.length - 1 - i].x, 
									   pathToTarget[pathToTarget.length - 1 - i].y, 
									   pathToTarget[pathToTarget.length - 1 - i].zoom));
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
				currentPoint = targetPoint.shift();
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

	
}