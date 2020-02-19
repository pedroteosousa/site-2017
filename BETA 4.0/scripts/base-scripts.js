//Global variabes
var canvas;
var ctx;
var squareCount
var squares = []

//Classes
function Square(x, y, size, xVelocity, yVelocity, ang) {
  this.x = x
  this.y = y
  this.size = size
  this.xVelocity = xVelocity
  this.yVelocity = yVelocity

  this.cache = document.createElement("canvas")
  this.cacheCtx = this.cache.getContext("2d")

  this.cache.height = 3 * this.size
  this.cache.width = 3 * this.size

  this.cacheCtx.fillStyle = "rgba(64, 196, 355, 0.5)"
  this.cacheCtx.translate(this.size, 0)
  this.cacheCtx.rotate(ang * Math.PI / 180);
  this.cacheCtx.fillRect(0, 0, this.size, this.size)
}

//Events
function animationFrameRequested() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const square of squares) {
    setSquarePosition(square);
    drawSquare(square)
  }
  
  requestAnimationFrame(animationFrameRequested);  
}

function windowLoaded(event) {
  canvas = document.getElementById("back-canvas");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  squareCount = Math.ceil(window.innerWidth * window.innerHeight / 13500);

  for (var i = 0; i < squareCount; i++) {
    squares.push(generateSquare())
  }

  requestAnimationFrame(animationFrameRequested);
}

function windowResized(event) {
  var newSquareCount = Math.ceil(window.innerWidth * window.innerHeight / 13500);

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  if (newSquareCount < squareCount)
    squares.splice(0, squareCount - newSquareCount);

  while (newSquareCount > squareCount++)
    squares.push(generateSquare());
    
  squareCount = newSquareCount;
}

//Methods
function drawSquare(square) {
  ctx.drawImage(
    square.cache,
    square.x - square.cache.width / 2,
    square.y - square.cache.height / 2
  )
}

function setSquarePosition(square) {
  var offset = 200;

  square.x += square.xVelocity
  square.y += square.yVelocity

  if (square.x < 0 - offset) square.x += canvas.offsetWidth + offset;
  else if (square.x > canvas.offsetWidth + offset) square.x -= canvas.offsetWidth + offset;
  if (square.y < 0 - offset) square.y += canvas.offsetHeight + offset;
  else if (square.y > canvas.offsetHeight + offset) square.y -= canvas.offsetHeight + offset;
}

function generateSquare() {
  return new Square(
    randomInterval(0, canvas.width),
    randomInterval(0, canvas.height),
    randomInterval(5, 30),
    randomInterval(.5, 1) * (randomInteger(2) == 0 ? -1 : 1),
    randomInterval(.5, 1) * (randomInteger(2) == 0 ? -1 : 1),
    randomInterval(0, 90)
  )
}

function randomInteger(n) {
  return Math.floor(Math.random() *n);
}

function randomInterval(a, b) {
  return a + Math.random() * (b - a);
}


//Settings
window.addEventListener("load", windowLoaded);
window.addEventListener("resize", windowResized);