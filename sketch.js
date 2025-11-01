let alfaTable, bravoTable, charlieTable;
let alfaZ = [];
let bravoZ = [];
let charlieZ = [];

let alfaTimestamp = [];
let bravoTimestamp = [];
let charlieTimestamp = [];

// ----------------------- caricamento CSV ---------------------
function preload() {
  alfaTable = loadTable("drone_alfa_data.csv", "csv", "header");
  bravoTable = loadTable ("drone_bravo_data.csv", "csv", "header");
  charlieTable = loadTable ("drone_charlie_data.csv", "csv", "header");
}

function setup() {
  let w = windowWidth - 100;
  let h = 600; 
  
  createCanvas(w, h);

  // Estrazione della colonna z_pos

  alfaZ = alfaTable.getColumn("z_pos").map(Number);
  bravoZ = bravoTable.getColumn("z_pos").map(Number);
  charlieZ = charlieTable.getColumn("z_pos").map(Number);

  // Estrazione della colonna timestamp
  alfaTimestamp = alfaTable.getColumn("timestamp").map(Number);
  bravoTimestamp = bravoTable.getColumn("timestamp").map(Number);
  charlieTimestamp = charlieTable.getColumn("timestamp").map(Number);

  //console.log("ALFA Z:", alfaZ);
  //console.log("BRAVO Z:", bravoZ);
  //console.log("CHARLIE Z:", charlieZ);


}

function draw() {
  //background(0);

  stroke('white');
  strokeWeight(2);
  
  /// Bordo grafico
  let left = 40;
  let right = width - 20;
  let top = 20;
  let bottom = height - 40;

  // ------------- Assi -------------
  line(left, bottom, right, bottom);  // X
  line(left, bottom, left, top);      // Y


  // Asse X
  line(right, bottom, right - 10, bottom - 5);
  line(right, bottom, right - 10, bottom + 5);

  // Asse Y
  line(left, top, left - 5, top + 10);
  line(left, top, left + 5, top + 10);

  // --- Etichette ---
  noStroke();
  fill('white');
  textSize(14);
  text("tempo", width - 50, height - 15);
  text("posizione z", 25, 10);

  // --- Range tempo e z ---
  let timeRange = getMinMax([alfaTimestamp, bravoTimestamp, charlieTimestamp]);
  let zRange = getMinMax([alfaZ, bravoZ, charlieZ]);


  // --- Disegno delle curve ---
  drawSeries(alfaTimestamp, alfaZ, '#E7EB90', left, right, top, bottom, timeRange, zRange);
  drawSeries(bravoTimestamp, bravoZ, '#A31621', left, right, top, bottom, timeRange, zRange);
  drawSeries(charlieTimestamp, charlieZ, '#B9D6F2', left, right, top, bottom, timeRange, zRange);
  drawLegend();

}

function getMinMax(arrays) {
  let merged = arrays.flat().filter(n => !isNaN(n));
  return {
    min: Math.min(...merged),
    max: Math.max(...merged)
    
  };
}

function drawSeries(timeArr, zArr, colorStroke, left, right, top, bottom, timeRange, zRange) {
  stroke(colorStroke);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let i = 0; i < timeArr.length; i++) {
    let t = timeArr[i];
    let z = zArr[i];

    let x = map(t, timeRange.min, timeRange.max, left, right);
    let y = map(z, zRange.min, zRange.max, bottom, top);

    vertex(x, y);
  }
  endShape();
}

function drawLegend() {
  let legendX = 1200;          
  let legendY = height - 600; 
  let boxSize = 15;          
  let spacing = 25;          

  noStroke();
  
  // Alfa
  fill('#E7EB90');
  rect(legendX, legendY, boxSize, boxSize);
  fill("white");
  textSize(14);
  text("Alfa", legendX + boxSize + 5, legendY + boxSize / 2 + 4);

  // Bravo
  fill('#A31621');
  rect(legendX, legendY + spacing, boxSize, boxSize);
  fill("white");
  text("Bravo", legendX + boxSize + 5, legendY + spacing + boxSize / 2 + 4);

  // Charlie
  fill('#B9D6F2');
  rect(legendX, legendY + 2 * spacing, boxSize, boxSize);
  fill("white");
  text("Charlie", legendX + boxSize + 5, legendY + 2 * spacing + boxSize / 2 + 4);
}