class Grid {
	
	constructor(rows, cols, cellSize) {
		
		this.rows = rows;
		this.cols = cols;
		this.cellSize = cellSize;
    
		this.reset();

    
	}
  
  reset() {
    this.table = make2DArray(this.rows, this.cols)
		for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.table[i][j] = {
          isMarble: false,
          isOdd: i%2 != j%2  // to alternate cell colors
        }
      }
    }
    console.log(this.rows)
    
    // 3 corner marbles
    this.table[this.rows-1][0].isMarble = true;
    this.table[this.rows-1][1].isMarble = true;
    this.table[this.rows-2][0].isMarble = true;
    
  }
	
  
  duplicate(row, col) {
    if (col >= this.cols-1 || row >= this.rows) {
      return 'Out of bounds';
    }
    
    if (!this.table[row][col].isMarble)
      return 'No marble to duplicate'
    
    if (this.table[row-1][col].isMarble ||
        this.table[row][col+1].isMarble)
      return 'blocked';
    
    this.table[row-1][col].isMarble = true;
    this.table[row][col+1].isMarble = true;
    
    this.table[row][col].isMarble = false;
    
    return 'Duplicated'
    
  }
  
  
  invert(row, col) {
    
    if (col >= this.cols-1 || row >= this.rows)
      return 'Out of bounds';
    
    
    this.table[row][col].isMarble = 
      !this.table[row][col].isMarble;
    return 'Inverted'
    
  }
  
	show() {
    
		for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let CS = this.cellSize;
        let x = CS * col;
        let y = CS * row;
        
        // alternating colors
        if (this.table[row][col].isOdd) fill(220)
        else fill(255)
        
        stroke(220)
        rect(x, y, CS, CS);
        
        // draw marble
        if (this.table[row][col].isMarble) {
          let centerX = round(x + CS/2);
          let centerY = round(y + CS/2);
          
          fill(66, 134, 244);
          strokeWeight(2);
          stroke(0);
          
          ellipse(centerX, centerY, round(CS * 0.6));
          
          
        }
        
      }
		}
    
  }
}

function make2DArray(rows, cols) {
  let arr = new Array(rows)
  
  for (let row = 0; row < arr.length; row++) {
  	arr[row] = new Array(cols)
  }
  
  return arr
}