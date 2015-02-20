//Score and numbers of lives
var gameStats = {
    "score": 0,
    "lives": 5,
};

//Reset the game to default beginning
function gameOver() {
    gameStats.score = 0;
    gameStats.lives = 5;
    enemySpeed = 1;
    document.getElementById('score').innerHTML = gameStats.score;
} 


// Draw the enemy on the screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Object.prototype.reset = function() {
    player.x = 200;
    player.y = 380;
}

var enemySpeed = 1;

/****************************
ENEMIES our player must avoid
****************************/
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100); 
}

/****************************
Update the enemy's position, required method for game:

When the enemy reaches the right side of the screen
it then returns to the left.
****************************/
Enemy.prototype.update = function(dt) {
    i = 1;
    while(enemySpeed !== i) {
        i = i + .2;
    } 
    if(this.x <= 550) {
        this.x += (this.speed * i) * dt;
    } else {
        this.x = -30 + (this.speed * i) * dt;
    }


/*If the player is within 30px of the enemy 
    - reset player to start
    - substract a life
    - if out of lives
        -reset score
        -refill lives to 5
        -display score and lives
*/
    if(player.x >= this.x - 30 && player.x <= this.x + 30) {
        if(player.y >= this.y - 30 && player.y <= this.y + 30) {
            this.reset();
            gameStats.lives -= 1;
            if (gameStats.lives < 1) {
                gameOver();
            };
            document.getElementById('lives').innerHTML = gameStats.lives;
        }
    }
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**************
PLAYER
**************/
var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 380;
}

/*Controls for the player*/
Player.prototype.update = function() {
    if(this.pressKey === "left" && this.x > 0) {
        this.x = this.x -100;
    } else if (this.pressKey === "right" && this.x < 500) {
        this.x = this.x + 100;
    } else if (this.pressKey === "up") {
        this.y = this.y - 85;
    } else if (this.pressKey === "down" && this.y < 400) {
        this.y = this.y + 85;
    }
    this.pressKey = null;

/*If the player crosses the street
    - reset position
    - add 1 to the score
    - display score on the screen
*/ 
    if(this.y < 25) {
        this.reset();
        enemySpeed = enemySpeed + .2;
        console.log(enemySpeed);
        gameStats.score += 1;
        document.getElementById('score').innerHTML = gameStats.score;
    }
}

//HANDLER FOR PLAYER TO MOVE CHARACTER
Player.prototype.handleInput = function(e){
    this.pressKey = e;    
}

//Randomize when enemies begin movement and place them within an array
var allEnemies = [];
(function setEnemies(){
    setTimeout(function(){allEnemies.push(new Enemy(-2, 60))}, Math.floor((Math.random() * 4000)));
    setTimeout(function(){allEnemies.push(new Enemy(-2, 140))}, Math.floor((Math.random() * 4000)));
    setTimeout(function(){allEnemies.push(new Enemy(-2, 230))}, Math.floor((Math.random() * 4000)));
    setTimeout(function(){allEnemies.push(new Enemy(-2, 310))}, Math.floor((Math.random() * 4000)));
})();

//Initaite New Player
var player = new Player(); 



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
