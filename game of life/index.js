let canvas=document.getElementById("canvas")
canvas.width = 400;
canvas.height = 400;
const cellSide = 40;
let ctx = canvas.getContext('2d');
// יצירת גריד
function makeArray(col,row){
let arr = new Array(col)
for(let i =0; i<arr.length; i++){
    arr[i]= new Array(row)
}
return arr;
}
//  מילוי גריד
let col =10;
let row=10;
let grid
let res=10;
function setup(){
    grid=makeArray(col,row);
    for(let i=0; i<col;i++){
        for(let j=0;j<row;j++){
            grid[i][j] = Math.floor(Math.random() * 2);
            console.log(grid);
            console.table(grid);
        }
    }
    draw()
}
function draw(){
    for(let i=0; i<col;i++){
        for(let j=0;j<row;j++){
            let x= i*cellSide;
            let y= j*cellSide;
            cellColor = '#FFFFFF';
            ctx.beginPath();
            ctx.fillStyle = cellColor;
            ctx.fillRect(x, y, cellSide, cellSide);
            if (grid[i][j] ==1) cellColor = '#000000';
            ctx.beginPath();
            ctx.fillStyle = cellColor;
            ctx.fillRect(x, y, cellSide, cellSide);   
        }
    }
// יצירת גריד חדש     
    let next = makeArray(col,row);
    for (let i=0; i<col;i++){
        for(let j=0;j<row;j++){
            let state=grid[i][j]
            // ספירת שכנים
            let sum=0;
            let neighbors = countNeighbors(grid, i, j);
            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
              } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
              } else {
                next[i][j] = state;
        } 
}
}
nextGen()
grid=next;

}
function countNeighbors(grid, x, y){
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          let cols = (x + i + col) % col;
          let rows = (y + j + row) % row;
          sum += grid[cols][rows];
        }
      }
      sum -= grid[x][y];
      return sum;   
}
function nextGen(){
    setInterval(nextGen, 500);
    function nextGen() {
    draw()
    }
}

 setup()



