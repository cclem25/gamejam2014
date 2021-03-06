/** 
 *	Game data
 *	
 */

var COLOR_JORIS = "#5555FF";
var COLOR_BERNARD = "#BB0000";
var COLOR_ANSEL = "#00BB00";
var COLOR_NARRATEUR = "#FFFFFF";
var COLOR_ALERT = "#FCFC0A";

initGame = function(canvas) {
	
	// game
	game = new Game(canvas);
	
	// scene 1 : map
	map = new Scene("map", canvas, meshMap(), "gamedata/images/map2.jpg", context, callbackWhenReady);
	game.addScene(map);
	map.useSprite = false;
	
	// scene 2 : exterieur aqua
	extAqua = new Scene("exterieurAqua", canvas, meshExterieurAqua(), "gamedata/images/exterieurAqua.jpg", context, callbackWhenReady);
	game.addScene(extAqua);

	// scene 3 : Amphi A
	amphiA = new Scene("amphiA", canvas, meshAmphiA(), "gamedata/images/amphiA.jpg", context, callbackWhenReady);
	game.addScene(amphiA);

	// Scène Aqua
	aqua = new Scene("Aqua", canvas, meshAqua(), "gamedata/images/aqua.jpg", context, callbackWhenReady);
	game.addScene(aqua);

	//Scène scolarité
	scolarite = new Scene("Scolarite", canvas, meshScolarite(), "gamedata/images/scolarite.JPG", context, callbackWhenReady);
	game.addScene(scolarite);

	//Labo math
	laboMaths = new Scene("labo Maths", canvas, meshLaboMath(), "gamedata/images/laboMaths.jpg", context, callbackWhenReady);
	game.addScene(laboMaths);

	//Scène batimentG
	batimentG = new Scene("BatimentG", canvas, meshBatimentG(), "gamedata/images/batimentG.JPG", context, callbackWhenReady);
	game.addScene(batimentG);

	//Scène post batG - salle de TD
	sceneTD = new Scene("Salle TD", canvas, meshSalleTD(), "gamedata/images/salleTD.jpg", context, callbackWhenReady);
	game.addScene(sceneTD);

	//Biochimie
	biochimie = new Scene("Biochimie", canvas, meshBiochimie(), "gamedata/images/biochimie.JPG", context, callbackWhenReady);
	game.addScene(biochimie);

	//Scène labo info
	laboInfo = new Scene("Labo Informatique", canvas, meshLaboInfo(), "gamedata/images/laboInfo.jpg", context, callbackWhenReady);
	game.addScene(laboInfo);

	//Bureau JB
	bureauJulien = new Scene("Bureau JB", canvas, meshBureauJB(), "gamedata/images/bureauJBE.png", context, callbackWhenReady);
	game.addScene(bureauJulien);

	//Scène JP Ansel
	//bureauAnsel = new Scene("Bureau Ansel", canvas, meshBureauAnsel(), "gamedata/images/bureauJBE.png", context, callbackWhenReady);
	//game.addScene(bureauAnsel);


	//--------- passages -----//
	/* Map */
	map.addPassage(new Passage(510, 580, extAqua, new Point(817, 468)));
	map.addPassage(new Passage(310, 155, laboInfo, new Point(557, 569)));
	map.addPassage(new Passage(950,30, batimentG, new Point(785, 525)));
	map.addPassage(new Passage(566, 74, biochimie, new Point(785, 525)));
	//map.addPassage(new Passage(510, 580, extAqua, new Point(817, 468)));	
	//map.addPassage(new Passage(583, 163, extAqua, new Point(817, 468)));
	
	/* Aqua */
	extAqua.addPassage(new Passage(10, 540, map, new Point(410,630)));
	extAqua.addPassage(new Passage(1623, 450, map, new Point(517,662)));
	extAqua.addPassage(new Passage(1478, 402, amphiA, new Point(913, 326, 0.5)));
	extAqua.addPassage(new Passage(805, 391, aqua, new Point(910,540)));
	extAqua.addPassage(new Passage(320, 305, scolarite, new Point(556, 400)));

	/* AmphiA */
	amphiA.addPassage(new Passage(1132, 286, extAqua, new Point(1478, 445)));

	/* Aqua intérieur */
	aqua.addPassage(new Passage(1200, 430, extAqua, new Point(805, 391)));

	/* Scolarité */
	scolarite.addPassage(new Passage(810, 536, extAqua, new Point(320, 305)));
	scolarite.addPassage(new Passage(705, 390, laboMaths, new Point(600, 511)));
	//scolarite.addPassage(new Passage(,, Scol, new Point()));

	/* Labo Maths */
	laboMaths.addPassage(new Passage(255, 455, scolarite, new Point(556, 400)));

	/* BatimentG */
	batimentG.addPassage(new Passage(840, 470, sceneTD, new Point(855, 280)));
	batimentG.addPassage(new Passage(1250, 530, map, new Point(897, 20)));

	/* Salla de TD */
	sceneTD.addPassage(new Passage(855, 280, map, new Point(897, 20)));

	/* Biochimie */
	biochimie.addPassage(new Passage(1246, 492, map, new Point(566, 74)));
	biochimie.addPassage(new Passage(12, 736, map, new Point(566, 74)));

	/* Labo Info */
	laboInfo.addPassage(new Passage(1100, 395, bureauJulien, new Point(365, 510)));
	laboInfo.addPassage(new Passage(155, 400, map, new Point(320, 155)));

	/* Bureau Julien */
	bureauJulien.addPassage(new Passage(100, 440, laboInfo, new Point(557, 569)));

	//---- Items ----
	
	// croissants 
	var croissant = new Item("croissant",null,0,0,"./gamedata/images/croissant.png");
	croissant.onLookAtInInventory = function() { 
		game.removeAllMessages();
		game.messagesToDisplay.push(new Message("C'est un croissant, il a l'air bon.", COLOR_JORIS, 20, 20, 3000));	
		game.displayMessages();
	}
	croissant.onUseInInventory = function() {
		if (game.getCurrentScene().getName() == "amphiA") {
			game.removeAllMessages();
			game.messagesToDisplay.push(new Message("Crunch crunch", COLOR_JORIS, 20, 20, 3000));	
			game.messagesToDisplay.push(new Message("Hummm c'était bon", COLOR_JORIS, 20, 20, 3000));	
			game.messagesToDisplay.push(new Message("Alerte", COLOR_ALERT, 400, 20, 500));	
			game.messagesToDisplay.push(new Message("Alerte", COLOR_ALERT, 300, 200, 500));	
			game.messagesToDisplay.push(new Message("Alerte", COLOR_ALERT, 100, 400, 500));	
			game.messagesToDisplay.push(new Message("Alerte", COLOR_ALERT, 700, 20, 500));	
			game.messagesToDisplay.push(new Message("Quelqu'un mange dans l'amphi !", COLOR_ALERT, 400, 20, 500));	
			game.messagesToDisplay.push(new Message("Quelqu'un mange dans l'amphi !", COLOR_ALERT, 100, 500, 500));	
			game.messagesToDisplay.push(new Message("Oh oh...", COLOR_JORIS, 20, 20, 3000));	
			game.displayMessages();
		}	
		else {
			game.removeAllMessages();
			game.messagesToDisplay.push(new Message("Non, pas maintenant, je préfère le garder pour plus tard", COLOR_JORIS, 20, 20, 3000));	
			game.displayMessages();
		}
	}	
	game.allObjects["croissant"] = croissant;
	
	// cable reseau	
	 // TODO
	 
	 
	// zoneCroissants
	iaCroissants = new InteractiveArea("iaCroissant", new Point(330,285), 30)
	iaCroissants.onLookAtInScene = function() {
		game.removeAllMessages();
		game.messagesToDisplay.push(new Message("Miam, des croissants !", COLOR_JORIS, 20, 20, 3000));	
		game.displayMessages();
	}	
	iaCroissants.onUse = function() {
		if (game.getInventory().containsItem("croissant")) {
			game.removeAllMessages();
			game.messagesToDisplay.push(new Message("J'en ai déjà pris un.", COLOR_JORIS, 20, 20, 3000));	
			game.displayMessages();
			return;
		}	
		game.addItemToInventory("croissant");
		game.removeAllMessages();
		game.messagesToDisplay.push(new Message("Et hop, dans la poche.", COLOR_JORIS, 20, 20, 3000));	
		game.displayMessages();
	}
	aqua.addInteractiveArea(iaCroissants)


	// zone tableau
	iaTableau = new InteractiveArea("iaTableau", new Point(528, 270), 60);
	iaTableau.onLookAtInScene = function() {
		game.removeAllMessages();
		game.messagesToDisplay.push(new Message("C'est le thème de la Game Jam...", COLOR_JORIS, 20, 20, 3000));	
		game.messagesToDisplay.push(new Message("C'est plein de symboles bizarres :-(", COLOR_JORIS, 20, 20, 3000));	
		game.messagesToDisplay.push(new Message("Si seulement j'avais assisté sérieusement aux cours de Maths au lieu d'être tout le temps à l'Aqua...", COLOR_JORIS, 20, 20, 3000));	
		game.messagesToDisplay.push(new Message("Je devrais peut-être trouver un prof de Maths pour m'aider.", COLOR_JORIS, 20, 20, 3000));	
		game.messagesToDisplay.push(new Message("Je crois qu'il sont au 3e étage du batiment B.", COLOR_JORIS, 20, 20, 3000));	
		game.displayMessages();
	}
	aqua.addInteractiveArea(iaTableau);

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

	p19 = new Point(829, 66);
	pBiochimie = new Point(566, 74);
	p20 = new Point(355, 91);
	p21 = new Point(360, 151);

	
	m.addSegment(new Segment(p1, p2));
	m.addSegment(new Segment(p2, p3));
	m.addSegment(new Segment(p3, p4));
	m.addSegment(new Segment(p4, p5));
	m.addSegment(new Segment(p5, p6));
	m.addSegment(new Segment(p6, p7));
	m.addSegment(new Segment(p7, p8));
	m.addSegment(new Segment(p8, p21));
	m.addSegment(new Segment(p21, pEntreeBatC));
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

	m.addSegment(new Segment(p21, p20));
	m.addSegment(new Segment(p20, pBiochimie));
	m.addSegment(new Segment(pBiochimie, p19));
	m.addSegment(new Segment(p19, p10));

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

	var pPorte = new Point(1132, 286); 
	var p0 = new Point(916, 234, 0.3);
	var p1 = new Point(913, 326, 0.5);
	var p2 = new Point(755, 565);
	var p3 = new Point(395, 550);
	var p4 = new Point(138, 341, 0.2);

	m.addSegment(new Segment(pPorte, p1));
	m.addSegment(new Segment(p1, p0));
	m.addSegment(new Segment(p1, p2));
	m.addSegment(new Segment(p2, p3));
	m.addSegment(new Segment(p3, p4, 0.3));

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

	var pEscalier = new Point(705, 390);
	var pScolarite = new Point(300, 350);
	var pSortie = new Point(810, 536);

	m.addSegment(new Segment(pSortie, pEscalier));
	m.addSegment(new Segment(pEscalier, pScolarite));

	return m;
}

meshLaboMath = function(){
	var m = new Mesh();

	var pPorte = new Point(600, 511);
	var pSortie = new Point(255, 455);

	m.addSegment(new Segment(pPorte, pSortie));

	return m;
}

meshBatimentG = function(){
	var m = new Mesh();

	var pos1 = new Point(785, 525);
	var pPorte = new Point(840, 470, 0.8);
	var pSortie = new Point(1250, 530);

	m.addSegment(new Segment(pos1, pPorte));
	m.addSegment(new Segment(pos1, pSortie));

	return m;
}

meshSalleTD = function(){
	var m = new Mesh();

	var pSortie = new Point(855, 280);
	var p1 = new Point(854, 279);

	m.addSegment(new Segment(p1, pSortie));

	return m;
}

meshBiochimie = function(){
	var m = new Mesh();

	var pos1 = new Point(685, 705);
	var p2 = new Point(1032, 500, 0.5);
	var p3 = new Point(946, 450, 0.5);
	var pCendar = new Point(602, 436, 0.5);
	var pSortieDroite = new Point(1246, 492);
	var pSortieGauche = new Point(12, 736);

	m.addSegment(new Segment(pSortieGauche, pos1));
	m.addSegment(new Segment(pos1, p2));
	m.addSegment(new Segment(p2, p3));
	m.addSegment(new Segment(p3, pCendar));
	m.addSegment(new Segment(p3, pSortieDroite));

	return m;
}

meshLaboInfo = function(){
	var m = new Mesh();

	var pBureau = new Point(1100, 395, 0.6);
	var p1 = new Point(1060, 510, 0.8);
	var p2 = new Point(575, 570);
	var p3 = new Point(120, 555, 0.9);
	var pSortie = new Point(155, 400, 0.7);

	m.addSegment(new Segment(pSortie, p3));
	m.addSegment(new Segment(p3, p2));
	m.addSegment(new Segment(p2, p1));
	m.addSegment(new Segment(p1, pBureau));

	return m;
}

meshBureauJB = function(){
	var m = new Mesh();

	var pBureau = new Point(365, 510);
	var pSortie = new Point(100, 440, 0.7);

	m.addSegment(new Segment(pBureau, pSortie));

	return m;
}