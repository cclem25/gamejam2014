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

	// scene 3 : Amphi A
	
	amphiA = new Scene("amphiA", canvas, meshAmphiA(), "gamedata/images/amphiA.jpg", context, callbackWhenReady);
	game.addScene(amphiA);

	// Scène Aqua
	aqua = new Scene("Aqua", canvas, meshAqua(), "gamedata/images/aqua.jpg", context, callbackWhenReady);
	game.addScene(aqua);

	scolarite = new Scene("scolarite", canvas, meshScolarite(), "gamedata/images/IMGP3711.JPG", context, callbackWhenReady);
	game.addScene(scolarite);



	//--------- passages -----//
	/* Map */
	map.addPassage(new Passage(510, 580, extAqua, new Point(817, 468)));	
	map.addPassage(new Passage(583, 163, extAqua, new Point(817, 468)));	
	
	/* Aqua */
	extAqua.addPassage(new Passage(10, 540, map, new Point(410,630)));
	extAqua.addPassage(new Passage(1623, 450, map, new Point(517,662)));
	extAqua.addPassage(new Passage(1478, 402, amphiA, new Point(965, 372, 0.3)));
	extAqua.addPassage(new Passage(805, 391, aqua ,new Point(910,540)));
	extAqua.addPassage(new Passage(320, 305, scolarite ,new Point(1000, 1000)));

	/* AmphiA */
	amphiA.addPassage(new Passage(965, 372, extAqua, new Point(1478, 402)));

	/* Aqua intérieur */
	aqua.addPassage(new Passage(1200, 430, extAqua, new Point(805, 391)));

	/* Scolarité */


	//---- Items ----
	
	// croissants 
	var croissant = new Item("croissant",null,"gamedata/images/croissant.png");
	croissant.onLookAtInInventory =function() { alert("C'est un croissant, il a l'air bon."); }
	croissant.onUseInInventory = function() {
		if (game.getCurrentScene().getName() == "amphiA") {
			alert("Crunch crunch");	
		}	
		else {
			alert("Non, pas maintenant, je préfère le garder pour plus tard");	
		}
	}	
	game.getInventory().addItem(croissant);

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
	p8 = new Point(506, 148);
	// direction parking imprimerie
	p9 = new Point(730, 162);
	// croisement parking imprimerie
	p10 = new Point(841, 95);
	// route bat G
	p11 = new Point(897, 20);
	// bas bat G	
	p13 = new Point(939, 155);
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

meshAmphiA = function(){
	var m = new Mesh();

	var pPorte = new Point(965, 372, 0.3);
	var pHautEscalier = new Point(1230, 460, 0.4);
	var pBasEscaliers = new Point(1218, 805, 0.4);
	var pSiege = new Point(846, 805, 0.4);

	m.addSegment(new Segment(pPorte, pHautEscalier));
	m.addSegment(new Segment(pHautEscalier, pBasEscaliers));
	m.addSegment(new Segment(pBasEscaliers, pSiege));

	return m;
}

meshAqua = function(){
	var m = new Mesh();
	var pPorte = new Point(1200, 430);
	var p0 = new Point(1200, 514);
	var p1 = new Point(910,540);
	var pPaperboard = new Point(484, 488);
	var pCroissants = new Point(268,378);
	
	m.addSegment(new Segment(pPorte,p0));
	m.addSegment(new Segment(p1,p0));
	m.addSegment(new Segment(pPaperboard,p1));
	m.addSegment(new Segment(pPaperboard,pCroissants));
	
	return m;
}

meshScolarite = function(){
	var m = new Mesh();
	var pPorte = new Point(1965, 372);
	return m;
}