
//Board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//Snake Head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 3; // Start right
var velocityY = 0;

var snakeBody = [];

//Food
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //Used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    addMobileControls();
    // update();
    setInterval(update, 1000/10); //100 miliseconds
}

function addMobileControls() {
    var up = document.getElementById("up");
    var down = document.getElementById("down");
    var left = document.getElementById("left");
    var right = document.getElementById("right");

    if (up && down && left && right) {
        up.addEventListener("touchstart", function() {
            changeDirection({code: "KeyW"});
        });
        down.addEventListener("touchstart", function() {
            changeDirection({code: "KeyS"});
        });
        left.addEventListener("touchstart", function() {
            changeDirection({code: "KeyA"});
        });
        right.addEventListener("touchstart", function() {
            changeDirection({code: "KeyD"});
        });
    }
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //Game Over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "KeyW" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "KeyS" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "KeyA" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "KeyD" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

}




