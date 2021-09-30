import { Game }  from '../src/scripts/Game';

//Pinta cada celda que este viva.
const paintLiveCells = () => {
    for(let i=0;i<TILES_X;i++) {
        for(let j=0;j<TILES_Y;j++) {
            if (!testGame.cellIsAlive(i, j)) {
                continue;
            }
            ctx.fillRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}

//Dibuja los bordes de la grilla
const drawBorders = () => {
    for(let i=0;i<TILES_X;i++) {
        ctx.beginPath();
        ctx.moveTo(i * TILE_SIZE - 0.5, 0);
        ctx.lineTo(i * TILE_SIZE - 0.5, height);
        ctx.stroke();
    }
    for(let j=0;j<TILES_Y;j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * TILE_SIZE - 0.5);
        ctx.lineTo(width, j * TILE_SIZE - 0.5);
        ctx.stroke();
    }
}

//Limpia todo el tablero.
const clear = () => {
    ctx.clearRect(0,0,width,height)
}

//LLAMA A las funciones de arriba.
const drawAll = () => {
    clear();
    paintLiveCells();
    drawBorders();
}

const autoGame = () => {
    if(!isGamePaused){
        drawAll();
        testGame.nextIteration(); //Calcula la siguiente generacion
        setTimeout(autoGame, 100);//Repite el proceso a una velocidad de speed
    }
}



//Obten el canvas.
const canvas = document.getElementById("game")
//Obten el tamaño del canvas
const width = canvas.width;
const height = canvas.height;
const TILE_SIZE = 20;//Tamaño de un cuadro.
const TILES_X = width / TILE_SIZE;//40
const TILES_Y = height / TILE_SIZE;//30
console.log("X, Y = ", TILES_X, TILES_Y);
//Obten el contexto del canvas XD
const ctx = canvas.getContext("2d");
//Define los colores y el tamaño de pincel.
ctx.fillStyle = "rgb(100, 240, 150)";
ctx.strokeStyle = "rgb(90, 90, 90)";
ctx.lineWidth = 1;

//Front end Vars ? 

let isClickPressed = false;
let isGamePaused = true;
let staticSpeed = 100;
//document.getElementById('speedInput').value = 100;
let speed = staticSpeed;
console.log("Velocidad Inicio: ",speed);

//Crea un nuevo juego.
let testGame: Game = new Game(40, 30);
drawBorders();//Pinta los bordes.
paintLiveCells();//Pinta las celdas vivas.


//Buttons Events

//Pausa / Play Button
document.getElementById('stopbutton').addEventListener('click', e => {
    let but = document.getElementById('stopbutton');
    if(isGamePaused){//Si el juego ta pausao
        //Inicialo.
        but.innerHTML = '<i class="fas fa-pause"></i>'
        isGamePaused = false;
        autoGame();
    }else{//Si el juego ta corriendo
        //Pausalo.
        but.innerHTML = '<i class="fas fa-play"></i>'
        isGamePaused = true;
    }
})


//Next Step Button
document.getElementById('nextStepButton').addEventListener('click', e=> {
    testGame.nextIteration();
    drawAll();
})

//Prev Step Button
document.getElementById('prevStepButton').addEventListener('click', e=> {
    testGame.prevIteration();
    drawAll();
})

//Restart Game Button
document.getElementById('restartGame').addEventListener('click', e=> {
    let but = document.getElementById('stopbutton');
    but.innerHTML = '<i class="fas fa-play"></i>'
    isGamePaused = true;
    testGame = new Game(40,30);
    drawAll();
})

//Random Game Button
document.getElementById('randomGame').addEventListener('click', e=> {
    testGame.generateRandom();
    drawAll();
})


//Canvas Mouse Events.

canvas.addEventListener("click", e => {
    isClickPressed = !isClickPressed;//Informa que se hizo click
    //Calcula la posicion del mouse
    const x = Math.floor((e.clientX - canvas.offsetLeft) /TILE_SIZE)
    const y = Math.floor((e.clientY - canvas.offsetTop) /TILE_SIZE)
    testGame.changeStateOfCell(x,y);
    drawAll();
})


/*






const clear = () => {//Limpia todo el tabler.
    ctx.clearRect(0,0,width,height)
}

const drawAll = () => {//Dibuja todo entonces.
    clear()//Limpia todo el tablero
    drawBoard()//Dibuja el tablero 
    drawBorders()//Dibuja los bordes.
}

const nextGen = () => {//Para la siguiente generacion.
    drawBoard()//Dibuja la tabla
    drawBorders()//Dibuja los bordes.
    if(!isGamePaused){//Si el juego no esta pausado.
        BOARD = computeNextGeneration()//Actualiza el estado de la tabla.
        drawAll()//Dibuja todo nuevamente.
    }
}

const nextGenLoop = () => {//Mantiene el loop todo el juego
    nextGen()//Calcula la siguiente generacion
    setTimeout(nextGenLoop, speed);//Repite el proceso a una velocidad de speed
}

let BOARD = prepareBoard()

BOARD[1][0] = true;
BOARD[2][1] = true;
BOARD[0][2] = true;
BOARD[1][2] = true;
BOARD[2][2] = true;

nextGenLoop();


canvas.addEventListener("mousedown", e => {
    isClickPressed = !isClickPressed;
    console.log(isClickPressed)
    const x = Math.floor((e.clientX - canvas.offsetLeft) /TILE_SIZE)
    const y = Math.floor((e.clientY - canvas.offsetTop) /TILE_SIZE)
    BOARD[x][y] = !BOARD[x][y]
    drawAll()
    console.log(x, y)
})

canvas.addEventListener("mouseup", e => {
    isClickPressed = !isClickPressed;
})

canvas.addEventListener('mousemove', e => {
    if(isClickPressed){
        const x = Math.floor((e.clientX - canvas.offsetLeft) /TILE_SIZE)
        const y = Math.floor((e.clientY - canvas.offsetTop) /TILE_SIZE)
        BOARD[x][y] = !BOARD[x][y]
        drawAll()
        console.log(x, y)
    }
})

//Buttons Events
document.getElementById('stopbutton').addEventListener('click', e => {
    let but = document.getElementById('stopbutton');
    if(isGamePaused){//Si el juego ta pausao
        but.innerHTML = '<i class="fas fa-pause"></i>'
        isGamePaused = !isGamePaused;
    }else{//Si el juego ta corriendo
        but.innerHTML = '<i class="fas fa-play"></i>'
        isGamePaused = !isGamePaused;
    }
})

document.getElementById('buttonSetSpeed').addEventListener('click', e => {
    speed = 1/parseInt(document.getElementById('speedInput').value)
})

document.getElementById('moreSpeedButton').addEventListener('click', e => {
    document.getElementById('speedInput').value = parseInt(document.getElementById('speedInput').value) + 5;
    speed = document.getElementById('speedInput').value;
    console.log("Speed +5 - Speed : ",speed);
})

document.getElementById('lessSpeedButton').addEventListener('click', e => {
    document.getElementById('speedInput').value = parseInt(document.getElementById('speedInput').value) - 5;
    speed = document.getElementById('speedInput').value;
    console.log("Speed -5 - Speed : ",speed);
})

document.getElementById('restartGame').addEventListener('click', e => {
    for(let i=0;i<TILES_X;i++) {
        for(let j=0;j<TILES_Y;j++) {
            BOARD[i][j] = false;
        }
    }
})

document.getElementById('readCSV').addEventListener('click', e=> {
    console.log(document.getElementById('inputGroupFile01'))
    console.log("VALUE \N",document.getElementById('inputGroupFile01').value)
})


*/