/** 
 *	Game data
 *	
 */

initGame = function(canvas) {
	
	// game
	game = new Game(canvas);
	
	// scene 1 : map
	map = new Scene("map", canvas, meshMap(), "gamedata/images/map2.jpg", context, callbackWhenReady);
	game.addScene(map);	
	
	// scene 2 : exterieur aqua
	extAqua = new Scene("exterieurAqua", canvas, meshExterieurAqua(), "gamedata/images/exterieurAqua.jpg", context, callbackWhenReady);
	game.addScene(extAqua);

	// scene 3
	//game.addScene(new Scene("amphiA", canvas, meshAmphiA(), "gamedata/images/amphiA.jpg", context, callbackWhenReady));



	//--------- passages -----//
	/* Map */
	map.addPassage(new Passage(510, 580, extAqua, new Point(817, 468)));	
	map.addPassage(new Passage(583, 163, extAqua, new Point(817, 468)));	
	
	/* Aqua */
	extAqua.addPassage(new Passage(10, 540, map, new Point(410,630)));
	extAqua.addPassage(new Passage(1623, 450, map, new Point(517,662)));

	return game;	
}





/** Mesh pour la MAP */
meshMap = function() {
	var m = new Mesh();
			
	pEntreeBatC = new Point(310, 155);
		
	pEntreeBatG = new Point(950,30);
	
	// intermédiaire aqua <-> amphi A
	p1 = new Point(510, 580);
	// devant entree UFR 
	p2 = new Point(410, 630);
	// au bout du batiment 
	p3 = new Point(35, 670);
	// au bout en haut du batiment B
	p4 = new Point(50, 440);
	// derrière bat B
	p5 = new Point(603, 381);
	// haut imprimerie
	p6 = new Point(583, 167);
	// décrochment imprimerie
	p7 = new Point(509, 166);
	// décochement imprimerie coté bat C
	p8= new Point(506, 148);
	// direction parking imprimerie
	p9 = new Point(730, 162);
	// croisement parking imprimerie
	p10 = new Point(841, 95);
	// route bat G
	p11 = new Point(897, 20);
	// bas bat G	
	p13= new Point(939, 155);
	// bout EST bat B
	p14 = new Point(850, 345);
	// 
	p15 = new Point(1040, 376);
	p16 = new Point(987, 640);
	p17 = new Point(886, 685);
	p18 = new Point(522, 704);

	
	m.addSegment(new Segment(p1, p2));
	m.addSegment(new Segment(p2, p3));
	m.addSegment(new Segment(p3, p4));
	m.addSegment(new Segment(p4, p5));
	m.addSegment(new Segment(p5, p6));
	m.addSegment(new Segment(p6, p7));
	m.addSegment(new Segment(p7, p8));
	m.addSegment(new Segment(p8, pEntreeBatC));
	m.addSegment(new Segment(p6, p9));
	m.addSegment(new Segment(p9, p10));
	m.addSegment(new Segment(p10, p11));
	m.addSegment(new Segment(p11, pEntreeBatG));
	m.addSegment(new Segment(p10, p13));
	m.addSegment(new Segment(p13, p14));
	m.addSegment(new Segment(p14, p5));
	m.addSegment(new Segment(p14, p15));
	m.addSegment(new Segment(p15, p16));
	m.addSegment(new Segment(p16, p17));
	m.addSegment(new Segment(p17, p18));
	m.addSegment(new Segment(p1, p18));

	return m;
}


// EXTERIEUR AQUA
meshExterieurAqua = function() {

	var m = new Mesh();
	
	var pEntreeUFR = new Point(320, 305, 0.3);
	var pMilieuEscaliers = new Point(326, 362, 0.6);
	var pBasEscaliers = new Point(420, 460);
	var pEnFaceAqua = new Point(817, 468);
	var pEntreeAqua = new Point(805, 391, 0.4);
	var pDroiteAqua = new Point(1320, 500);
	var pAvantSortie = new Point(1478, 445);
	var pAmphiA = new Point(1478, 402, 0.3);
	var pSortieDroite = new Point(1623, 450, 0.7);
	var pSortieGauche = new Point(10, 540, 1.6);
	
	m.addSegment(new Segment(pEntreeUFR, pMilieuEscaliers, 0.3));
	m.addSegment(new Segment(pBasEscaliers, pMilieuEscaliers, 0.6));
	m.addSegment(new Segment(pBasEscaliers, pSortieGauche));
	m.addSegment(new Segment(pBasEscaliers, pEnFaceAqua));
	m.addSegment(new Segment(pDroiteAqua, pEnFaceAqua));
	m.addSegment(new Segment(pEntreeAqua, pEnFaceAqua, 0.3));
	m.addSegment(new Segment(pAvantSortie, pDroiteAqua));
	m.addSegment(new Segment(pAmphiA, pAvantSortie, 0.2));
	m.addSegment(new Segment(pSortieDroite, pAvantSortie));
	
	return m;		
}



