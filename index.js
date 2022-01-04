const canvas = document.getElementById("game");
const context = canvas.getContext("2d");


window.addEventListener('keyup',
    function(e){
        keys[e.code] = false;
    },
false);
class SnakeElement{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let score = 0;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeElements = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVelocity=0;

const mniamSound = new Audio("gulp.wav")
function drawGame(){
    changeSnakePosition();

    let result = GameOver();
    if(result){
        return;
    }
    cleanScreen();
    
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    setTimeout(drawGame, 1000 / speed);
}

function GameOver(){
    let gameOver = false;

    if(yVelocity == 0 && xVelocity == 0){
        return false;
    }

    if(headX < 0){
        gameOver = true;
    }
    else if(headX == tileCount){
        gameOver = true;
    }

    else if (headY == tileCount || headY < 0){
        gameOver = true;
    }
    
    for(let i = 0;  i < snakeElements.length; i++){
        let element = snakeElements[i];
        if(element.x == headX && element.y == headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver){
        context.fillStyle = "white";
        context.font = "50px Verdana";
        context.fillText("GAME OVER!", canvas.width / 9, canvas.height / 2);
    }
    return gameOver;
}

function drawScore(){
context.fillStyle = "white";
context.font = "10px Verdana";
context.fillText("Score: " + score, canvas.width - 60, 10);
}

function checkAppleCollision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        mniamSound.play();
    }
}

function cleanScreen(){
    context.fillStyle = "black";
    context.fillRect(0,0, canvas.width, canvas.height);

}
function drawApple(){
    context.fillStyle = "red";
    context.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
    
}

function drawSnake(){
    context.fillStyle = "orange";
    context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    context.fillStyle =  "green";
    for(let i = 0; i < snakeElements.length; i++){
        let element = snakeElements[i];
        context.fillRect(element.x * tileCount, element.y * tileCount, tileSize, tileSize);
    }
    
    snakeElements.push(new SnakeElement(headX, headY));
    if(snakeElements.length > tailLength){
        snakeElements.shift();
    }
    context.fillStyle = "orange";
    context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if (yVelocity == 1)
            return
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if(event.keyCode == 40){
        if (yVelocity == -1)
            return
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return
        yVelocity = 0;
        xVelocity = 1;
    }
}
function changeSnakePosition(){
    headX += xVelocity;
    headY += yVelocity;
}

window.onload = function(){
    let button = document.getElementById("btn");
    button.addEventListener("click", () =>{
        window.location.reload();
})}


drawGame();