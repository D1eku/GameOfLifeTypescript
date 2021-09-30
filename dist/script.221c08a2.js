// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/Cell.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = void 0;

var Cell =
/** @class */
function () {
  function Cell(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.isLive = false;
  }

  return Cell;
}();

exports.Cell = Cell;
},{}],"scripts/GameState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameState = void 0;

var GameState =
/** @class */
function () {
  function GameState(grillState, iteration) {
    this.grill = grillState;
    this.iterationLevel = iteration;
  }

  return GameState;
}();

exports.GameState = GameState;
},{}],"scripts/Game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var Cell_1 = require("../scripts/Cell");

var GameState_1 = require("./GameState");

var Game =
/** @class */
function () {
  function Game(sizeX, sizeY) {
    var _this = this; //Save state of before iterations.


    this.gameStates = Array(99999);
    this.cantStates = 0;

    this.newIteration = function () {
      //Guarda el anterior estado.
      _this.gameStates[_this.cantStates] = new GameState_1.GameState(_this.grill, _this.iterationLevel);
      _this.cantStates += 1; //Empieza los calculos del siguiente estado
      //this.iterationLevel += 1;//Aumenta en 1 la iteracion.

      var newBoard = _this.createNewGrill();

      for (var i = 0; i < _this.sizeX; i++) {
        for (var j = 0; j < _this.sizeY; j++) {
          //Para cada celda
          //Revisa si esta viva la celda.
          if (!_this.cellIsAliveNumber(i, j)) {
            //Si no esta viva
            if (_this.neighboursCount(i, j) === 3) {
              //Cuenta si tiene 3 vecinos
              newBoard[i][j].isLive = true; //Entonces esa posicion vive 
            }
          } else {
            //Si esta viva.
            var count = _this.neighboursCount(i, j); //Cuenta los vecinos


            if (count == 2 || count == 3) {
              //Si tiene 2 o 3 vecinos
              newBoard[i][j].isLive = true; //La celda igual vive.
            }
          }
        }
      }

      _this.grill = newBoard; //Asina el nuevo estado.
    };

    this.viewStateGame = function () {
      for (var i = 0; i < _this.sizeX; i++) {
        for (var j = 0; j < _this.sizeY; j++) {
          console.log(_this.grill[i][j].isLive);
        }
      }
    }; //Cuenta los vecinos (vivos) al rededor de una posicion de celda.


    this.neighboursCount = function (x, y) {
      var count = 0; //Empieza a contar de 0

      for (var _i = 0, _a = [-1, 0, 1]; _i < _a.length; _i++) {
        // i puede tomar 3 valores -1, 0, 1
        var i = _a[_i];

        for (var _b = 0, _c = [-1, 0, 1]; _b < _c.length; _b++) {
          // j puede tomar 3 valores -1, 0, 1
          var j = _c[_b];

          if (!(i === 0 && j === 0)) {
            count += _this.cellIsAliveNumber(x + i, y + j); //Suma 1 si la celda vecina esta viva o 0 si no esta viva.
          }
        }
      }

      return count; //Retorna la cantidad de celdas vivas.
    };

    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.iterationLevel = 1;
    this.grill = [];

    for (var i = 0; i < sizeX; i++) {
      this.grill[i] = [];

      for (var j = 0; j < sizeY; j++) {
        this.grill[i][j] = new Cell_1.Cell(i, j);
      }
    }

    this.gameStates[this.cantStates] = new GameState_1.GameState(this.grill, this.iterationLevel); //Guarda el primer estado.

    this.cantStates += 1;
    console.log(this.grill);
  }

  Game.prototype.nextIteration = function () {
    this.iterationLevel += 1;

    if (this.iterationLevel > this.cantStates) {
      //Si el siguiente paso es una iteracion mayor a la cantidad de estados.
      //Realizamos una nueva iteracion.
      this.newIteration();
    } else {
      //Si es menor quiere decir que estamos atras en las iteraciones de la cantidad de estados que hemos tenido o la cantidad de iteraciones totales realizadas.
      this.grill = this.gameStates[this.iterationLevel].grill;
    }
  };

  Game.prototype.prevIteration = function () {
    this.iterationLevel -= 1;

    if (this.iterationLevel >= 0 && this.iterationLevel < this.cantStates) {
      this.grill = this.gameStates[this.iterationLevel].grill;
    } else {
      this.iterationLevel += 1;
    }
  };

  Game.prototype.cellIsAlive = function (x, y) {
    return this.grill[x][y].isLive;
  }; //Revisa si la celda de la posicion dada, esta viva o no. 
  //Retornara 1 si esta viva la celda.
  //Retornara 0 si la pos esta fuera de rango o si la celda esta muerta.


  Game.prototype.cellIsAliveNumber = function (x, y) {
    return x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY ? 0 : this.grill[x][y].isLive ? 1 : 0;
  };

  Game.prototype.createNewGrill = function () {
    var auxGrill = [];

    for (var i = 0; i < this.sizeX; i++) {
      auxGrill[i] = [];

      for (var j = 0; j < this.sizeY; j++) {
        auxGrill[i][j] = new Cell_1.Cell(i, j);
      }
    }

    return auxGrill;
  };

  Game.prototype.changeStateOfCell = function (x, y) {
    this.grill[x][y].isLive = !this.grill[x][y].isLive;
  };

  Game.prototype.generateRandom = function () {
    var auxGrill = this.createNewGrill();

    for (var i = 0; i < this.sizeX; i++) {
      for (var j = 0; j < this.sizeY; j++) {
        auxGrill[i][j].isLive = Math.random() > 0.9;
      }
    }

    this.grill = auxGrill;
  };

  return Game;
}();

exports.Game = Game;
},{"../scripts/Cell":"scripts/Cell.ts","./GameState":"scripts/GameState.ts"}],"script.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game_1 = require("../src/scripts/Game"); //Pinta cada celda que este viva.


var paintLiveCells = function paintLiveCells() {
  for (var i = 0; i < TILES_X; i++) {
    for (var j = 0; j < TILES_Y; j++) {
      if (!testGame.cellIsAlive(i, j)) {
        continue;
      }

      ctx.fillRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}; //Dibuja los bordes de la grilla


var drawBorders = function drawBorders() {
  for (var i = 0; i < TILES_X; i++) {
    ctx.beginPath();
    ctx.moveTo(i * TILE_SIZE - 0.5, 0);
    ctx.lineTo(i * TILE_SIZE - 0.5, height);
    ctx.stroke();
  }

  for (var j = 0; j < TILES_Y; j++) {
    ctx.beginPath();
    ctx.moveTo(0, j * TILE_SIZE - 0.5);
    ctx.lineTo(width, j * TILE_SIZE - 0.5);
    ctx.stroke();
  }
}; //Limpia todo el tablero.


var clear = function clear() {
  ctx.clearRect(0, 0, width, height);
}; //LLAMA A las funciones de arriba.


var drawAll = function drawAll() {
  clear();
  paintLiveCells();
  drawBorders();
};

var autoGame = function autoGame() {
  if (!isGamePaused) {
    drawAll();
    testGame.nextIteration(); //Calcula la siguiente generacion

    setTimeout(autoGame, 100); //Repite el proceso a una velocidad de speed
  }
}; //Obten el canvas.


var canvas = document.getElementById("game"); //Obten el tamaño del canvas

var width = canvas.width;
var height = canvas.height;
var TILE_SIZE = 20; //Tamaño de un cuadro.

var TILES_X = width / TILE_SIZE; //40

var TILES_Y = height / TILE_SIZE; //30

console.log("X, Y = ", TILES_X, TILES_Y); //Obten el contexto del canvas XD

var ctx = canvas.getContext("2d"); //Define los colores y el tamaño de pincel.

ctx.fillStyle = "rgb(100, 240, 150)";
ctx.strokeStyle = "rgb(90, 90, 90)";
ctx.lineWidth = 1; //Front end Vars ? 

var isClickPressed = false;
var isGamePaused = true;
var staticSpeed = 100; //document.getElementById('speedInput').value = 100;

var speed = staticSpeed;
console.log("Velocidad Inicio: ", speed); //Crea un nuevo juego.

var testGame = new Game_1.Game(40, 30);
drawBorders(); //Pinta los bordes.

paintLiveCells(); //Pinta las celdas vivas.
//Buttons Events
//Pausa / Play Button

document.getElementById('stopbutton').addEventListener('click', function (e) {
  var but = document.getElementById('stopbutton');

  if (isGamePaused) {
    //Si el juego ta pausao
    //Inicialo.
    but.innerHTML = '<i class="fas fa-pause"></i>';
    isGamePaused = false;
    autoGame();
  } else {
    //Si el juego ta corriendo
    //Pausalo.
    but.innerHTML = '<i class="fas fa-play"></i>';
    isGamePaused = true;
  }
}); //Next Step Button

document.getElementById('nextStepButton').addEventListener('click', function (e) {
  testGame.nextIteration();
  drawAll();
}); //Prev Step Button

document.getElementById('prevStepButton').addEventListener('click', function (e) {
  testGame.prevIteration();
  drawAll();
}); //Restart Game Button

document.getElementById('restartGame').addEventListener('click', function (e) {
  var but = document.getElementById('stopbutton');
  but.innerHTML = '<i class="fas fa-play"></i>';
  isGamePaused = true;
  testGame = new Game_1.Game(40, 30);
  drawAll();
}); //Random Game Button

document.getElementById('randomGame').addEventListener('click', function (e) {
  testGame.generateRandom();
  drawAll();
}); //Canvas Mouse Events.

canvas.addEventListener("click", function (e) {
  isClickPressed = !isClickPressed; //Informa que se hizo click
  //Calcula la posicion del mouse

  var x = Math.floor((e.clientX - canvas.offsetLeft) / TILE_SIZE);
  var y = Math.floor((e.clientY - canvas.offsetTop) / TILE_SIZE);
  testGame.changeStateOfCell(x, y);
  drawAll();
});
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
},{"../src/scripts/Game":"scripts/Game.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57180" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.ts"], null)
//# sourceMappingURL=/script.221c08a2.js.map