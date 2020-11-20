var achtergrondPlaatje;

/**
 * preload
 * deze functie wordt als eerste javascriptfunctie uitgevoerd,
 * dus zelfs nog vóór setup() !
 * Gebruik deze functie om plaatjes van de server te laten laden
 * door de browser die je widget opent
 */
function preload() {
  achtergrondPlaatje = loadImage('images/voorbeeld.jpg');
}


/**
 * setup
 * de code in deze functie wordt eenmaal uitgevoerd,
 * als p5js wordt gestart
 */
function setup() {
  // Maak het canvas van je widget
  createCanvas(480, 200);
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // schrijf hieronder de code van je widget
  // nu wordt slechts een voorbeeld als plaatje getoond
  // verwijder deze achtergrond en creëer je eigen widget

  image(achtergrondPlaatje, 0, 0, 480, 200);
}