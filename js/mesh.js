/**
 *	Class representing a mesh - a set of segments that defines the paths for the characters.
 */
function Mesh() {
	
	/** List of segments composing the mesh */
	var segments = [];
	
	/** List of points composing the mesh */
	var points = [];
	
		
	/**
	 *	Adds a segment to the current mesh.
	 *	@param 	Segment		s 		the segment to add.
	 *	@return the object. 
	 */
	this.addSegment = function(s) {
		segments[segments.length] = s;
		var found_p1 = false;
		var found_p2 = false;
		var i = 0;
		while (i < points.length && !(found_p1 && found_p2)) {
			if (points[i].equals(s.getPoint1())) {
				found_p1 = true;	
			}	
			if (points[i].equals(s.getPoint2())) {
				found_p2 = true;
			}
			i++;
		}
		if (! found_p1) {
			points[points.length] = s.getPoint1();	
		}
		if (! found_p2) {
			points[points.length] = s.getPoint2();	
		}
		return this;
	}
	
	
	/**
	 *	Computes the closest point and the segment from the point.
	 *	@param 	Point 							p	the reference point
	 *	@return	{ "point" : p, "segment" : s }		an object encapsulating point p and segment s.
	 */
	this.getClosestPointAndSegment = function(p) {
		var minDist = 10000;
		var minPoint = new Point(0,0);
		var minSegment = null;
		
		// for each segment, find shortest distance and evaluate it
		for (var i in segments) {
			s = segments[i];
			r = pDistance(p.x, p.y, s.getPoint1().x, s.getPoint1().y, s.getPoint2().x, s.getPoint2().y);	
			if (r.dist < minDist) {
				minDist = r.dist;
				minPoint.x = r.x;
				minPoint.y = r.y;
				minSegment = s;	
			}
		}		
		return { "point" : minPoint, "segment" : minSegment };
	}
		
	
	/**
	 *	Computes the closest point and distance from one point to a given segment.
	 *	Source : http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
	 *	@param	int		x	X-coordinate of the distant point
	 *	@param	int		y	Y-coordinate of the distant point
	 *	@param	int		x1	X-coordinate of the first point of the segment
	 *	@param	int		y1	Y-coordinate of the first point of the segment
	 *	@param	int		x2	X-coordinate of the second point of the segment
	 *	@param	int		y2	Y-coordinate of the second point of the segment
	 *	@return	{ "x" : x, "y" : y, "dist" : d } 	point (x,y) is the solution at the shortest distance d
	 */
	function pDistance(x, y, x1, y1, x2, y2) {	
	  var A = x - x1;
	  var B = y - y1;
	  var C = x2 - x1;
	  var D = y2 - y1;
	
	  var dot = A * C + B * D;
	  var len_sq = C * C + D * D;
	  var param = dot / len_sq;
	
	  var xx, yy;
	
	  if (param < 0 || (x1 == x2 && y1 == y2)) {
	    xx = x1;
	    yy = y1;
	  }
	  else if (param > 1) {
	    xx = x2;
	    yy = y2;
	  }
	  else {
	    xx = x1 + param * C;
	    yy = y1 + param * D;
	  }
	
	  var dx = x - xx;
	  var dy = y - yy;
	  
	  return { "x" : Math.floor(xx), "y" : Math.floor(yy), "dist" : Math.sqrt(dx * dx + dy * dy) };
	}
	
	
	
	/**
	 *	Comptes the shortest path between the source point and its destination.
	 *	Uses an A* algorithm. 
	 *	@param 	Point	s_pt	Source point
	 *	@param	Segment	s_seg	Source point segment
	 *	@param 	Point	d_pt	Destination point
	 *	@param 	Segment	d_seg	Destination segment
	 */
	this.getPathFromTo = function(s_pt, s_seg, d_pt, d_seg) {
		
		// the two points are on the same segment => easy case
		if (s_seg == d_seg) {
			return [d_pt, s_pt];	
		}
		
		// two points are on different segments => hard case
		
		// memo on arrays
		// 	- array.shift() = removes first element
		// 	- array.splice(index,howmany,item1,.....,itemX) = adds new items at index and removes howmany items 

		// initialization of data [current path (array of points), distance explored, evaluated distance to the target]
		var d1 = s_pt.distanceTo(s_seg.getPoint1());
		var ed1 = s_seg.getPoint1().distanceTo(d_pt);
		var d2 = s_pt.distanceTo(s_seg.getPoint2());
		var ed2 = s_seg.getPoint2().distanceTo(d_pt);
		
		var queue = (d1 < d2 || d1 == d2 && ed1 < ed2) ? 
						[ { "path" : [ s_seg.getPoint1(), s_pt ], "dist" : d1, "eval" : ed1 } , 
				 		  { "path" : [ s_seg.getPoint2(), s_pt ], "dist" : d2, "eval" : ed2 } ] :
						[ { "path" : [ s_seg.getPoint2(), s_pt ], "dist" : d2, "eval" : ed2 } , 
						  { "path" : [ s_seg.getPoint1(), s_pt ], "dist" : d1, "eval" : ed1 } ] ;
		// here we go
		var found = queue[0].path[0].equals(d_pt) || queue[0].path[0].equals(d_seg.getPoint1()) || queue[0].path[0].equals(d_seg.getPoint2());
		while (! found) {
			// take the best solution so far (current path)
			var bestSol = queue.shift();
			// compute the next steps
			var nextSolutions = getNextStepsFrom(bestSol, d_pt);	
			// console.log("[DEBUG] next solutions from " + JSON.stringify(bestSol) + " = " + JSON.stringify(nextSolutions));			
			for (var i in nextSolutions) {
				// insert at the right place in the queue
				var ns = nextSolutions[i];
				// console.log("[DEBUG] inserting " + JSON.stringify(ns) + " into " + JSON.stringify(queue));
				for (var j=0; j < queue.length; j++) {
					if (nextSolutions[i].eval < queue[j].eval) {
						queue.splice(j, 0, nextSolutions[i]);
						j = queue.length + 1;
					}	
				}
				if (j == queue.length) {
					queue.splice(j, 0, nextSolutions[i]);
				}
				// console.log("[DEBUG] ==> new queue = " + JSON.stringify(queue));
			}
			// check if a solution has been found (in this case, return it)
			found = queue[0].path[0].equals(d_pt) || queue[0].path[0].equals(d_seg.getPoint1()) || queue[0].path[0].equals(d_seg.getPoint2());
		}
		var result = queue[0].path;
		if (! result[0].equals(d_pt)) { 
			result.splice(0, 0, d_pt);
		} 
		DEBUG && console.log("[DEBUG] found : " + JSON.stringify(result));
		return result ; 
	}
	
	
	/**  
	 * Computes the next step from a given step 
	 * [ Internal function used for the A* algorithm ]
	 *	@param 	{ "path" : array of Points, "dist" : distance to origin, "eval" : distance to destination } 	bestSol  best solution so far
	 *	@param 	Point	d_pt	Destination point 
	 */
	var getNextStepsFrom = function(bestSol, d_pt) {
		var tPath = bestSol.path;
		// console.log("getNextSteps from " + JSON.stringify(tPath));
		var p = tPath[0];
		var result = [];
		for (var i in segments) {
			var nextP = null;
			if (segments[i].getPoint1().equals(p)) {
				nextP = segments[i].getPoint2(); 	
			}
			else {
				if (segments[i].getPoint2().equals(p)) {
					nextP = segments[i].getPoint1();	
				}				
			}
			if (nextP != null) {
				// check if next point already belongs to the current path
				var found = false;
				for (var j in tPath) {
					if (tPath[j].equals(nextP)) {
						found = true;	
					}	
				}	
				if (! found) {
					result[result.length] = { "path" : [nextP].concat(tPath), 
											  "dist" : bestSol.dist + p.distanceTo(nextP), 
											  "eval" : nextP.distanceTo(d_pt) };						
				}
			}
		}
		return result;
	}
		

	/**
	 *	Displays the mesh in the canvas. 
	 */
	this.display = function(context, OFFSET_X, OFFSET_Y) {
		// display points

	/*
		for (var i in points) {
			var size = points[i].zoom * 10;
			context.fillRect(points[i].x-size/2 + OFFSET_X, points[i].y-size/2 + OFFSET_Y, size, size);	
		}
	*/	
		// draw segments 
		for (var i in segments) {
			context.beginPath();
//			context.fillText(segments[i].getPoint1().toString(), segments[i].getPoint1().x - 15 + OFFSET_X, segments[i].getPoint1().y - 15 + OFFSET_Y);
//			context.fillText(segments[i].getPoint2().toString(), segments[i].getPoint2().x - 15 + OFFSET_X, segments[i].getPoint2().y - 15 + OFFSET_Y);
			context.moveTo(segments[i].getPoint1().x + OFFSET_X, segments[i].getPoint1().y + OFFSET_Y);
			context.lineTo(segments[i].getPoint2().x + OFFSET_X, segments[i].getPoint2().y + OFFSET_Y);
			context.stroke();
		}
	}
	
		
	

	/**
	 *	Displays the mesh in the console log. 
	 */
	this.displayInConsole = function() {
		console.log("Mesh :");			
		console.log("Points : ");
		for (var i in points) {
			console.log("\t(" + points[i].x + "," + points[i].y + ") "); 	
		}
		console.log("Segments :");
		for (var i in segments) {
			console.log("\t(" + segments[i].getPoint1().x + "," + segments[i].getPoint1().y + ") -- (" + segments[i].getPoint2().x + "," + segments[i].getPoint2().y + ") "); 	
		}
		
	}
		
}



/**
 *	Class representing a segment (i.e. a non-oriented arc defined by two points)
 */
function Segment(p1, p2, _sf) {
	
	/** First point of the segment */
	var point1 = p1;
	
	/** Second point of the segment */
	var point2 = p2;
		
	/** Speed factor on the segment */	
	var speedFactor = (_sf === undefined) ? 1 : _sf;
	
	/**
	 *	Retrieves the first point of the segment.
	 *	@return		Point	the first point of the segment.
	 */	
	this.getPoint1 = function() {
		return point1;	
	}
		
	/**
	 *	Retrieves the second point of the segment.
	 *	@return		Point	the second point of the segment.
	 */	
	this.getPoint2 = function() {
		return point2;	
	}
		
	/**
	 *	Retrieves the speed factor associated to the segment.
	 *	@return 	float	the speed factor associated to the segment.
	 */	
	this.getSpeedFactor = function() {
		return speedFactor;	
	}
		
		
	/**
	 *	Computes the lengths of the segment.
	 *	@return		float	the length of the segment
	 */
	this.getLength = function() {
		return point1.distanceTo(point2); 
	}
	
	/**
	 *	Computes and creates a point representing the middle of the segment.
	 *	@return 	Point 	the middle of the segment
	 */	
	this.getMiddle = function() {
		var x1 = point1.x;
		var x2 = point2.x;
		var y1 = point1.y;
		var y2 = point2.y;
		return new Point(Math.floor((x1+x2)/2), Math.floor((y1+y2)/2));	
	}	
}



/** 
 *	Class representing a point (pair of X and Y coordinates).
 */
function Point(_x, _y, _zoom) {
	
	/** X coordinate */
	this.x = _x;
	/** Y coordinate */
	this.y = _y;	
	
	this.zoom = (_zoom === undefined) ? 1 : _zoom;

	/**
	 *	Tests if two points are equal.
	 *	@param 	Point	p 	The point to compare with
	 *	@return	boolean		True if the two points are equal, false otherwise.
	 */
	this.equals = function(p) {
		return p != null && p.x == this.x && p.y == this.y;	
	}

	
	/**
	 *	Computes the distance between to the point in parameter
	 *	@param 	Point	p	the distant point
	 *	@return	float		the distance between this point and the one in parameter 
	 */
	this.distanceTo = function(p) {
		return Math.round(Math.sqrt( (this.x - p.x)*(this.x - p.x) + (this.y - p.y)*(this.y - p.y) )); 
	}
	
	
	/**
	 *	Produces a String that can be displayed
	 */
	this.toString = function() {
		return "(" + this.x + "," + this.y + " ; " + this.zoom + ")";	
	}

}
