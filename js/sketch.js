let grid;
let mode = 'duplicate'

let cellSize = 40;
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight*0.8);
  canvas.parent('canvas');
  
  // create grid
  let rows = floor(height / cellSize);
  let cols = floor(width / cellSize);
  grid = new Grid(rows, cols, cellSize);
  

  // create input and button for changing cell size    
  const in1 = createInput(cellSize);
  in1.parent('input')
  in1.input(function() {
    cellSize = this.value()
  })
  const change = createButton('Change');
  change.parent('change');
  change.mousePressed(function() {
    let rows = floor(height / cellSize);
    let cols = floor(width / cellSize);
    grid.rows = rows;
    grid.cols = cols;
    grid.cellSize = cellSize;
    grid.reset();
  })  
  

  // reset button
  const reset = createButton('Reset');
  reset.parent('reset');
  reset.mousePressed(function() {
    grid.reset();
  })
  
  // mode selecter
  S = createSelect();
  S.parent('selecter');
  S.option('Duplicate matbles');
  S.option('Invert marbles');
  
  S.changed(function() {
    
    if (mode == 'invert') mode = 'duplicate';
    else mode = 'invert';
      
  });
  
}


function draw() {
  clear()
  grid.show();
}



function mousePressed() {
  
  let col = floor(mouseX / cellSize);
  let row = floor(mouseY / cellSize);
  
  if (mode == 'invert')
  	print(grid.invert(row, col))
  else
    print(grid.duplicate(row, col))
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight*0.8);
  
  let rows = floor(height / cellSize);
  let cols = floor(width / cellSize);
  grid.rows = rows;
  grid.cols = cols;
  grid.reset();

  console.log(grid);
}