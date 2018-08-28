// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.moveX = 101;  // distance between blocks on x axis
    this.x = x;
    this.y = y + 55;  // off-set from 0 to center in tile
    this.speed = speed;
    this.boundary = this.moveX * 5;  // 5 moves to the right = 1 block off the right edge
    this.resetPos = -this.moveX;  // start 1 block to left of left edge
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < this.boundary) {
        // If enemy is within boundary, move forward.
            this.x += this.speed * dt;
        } else {
        // Else if enemy moves outside boundary, reset position to start to loop thru again.
            this.x = this.resetPos;
        }
    }

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-pink-girl.png';
        this.moveX = 101;  // distance between blocks on x axis
        this.moveY = 83;  // distance between blocks on y axis
        this.startX = this.moveX * 2;  // start the Player 2 blocks to the right (middle block) on the x axis
        this.startY = (this.moveY * 4) + 55;  // aligns with enemy y position to detect collision
        this.x = this.startX;
        this.y = this.startY;
        this.playerWin = false;
    }

    // Draw the player on the screen at current x & y position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Update player's x & y position per keyboard input
    handleInput(keyInput) {
        switch(keyInput) {
            case 'left':
                if (this.x > 0) {  // left edge
                    this.x -= this.moveX;
                }
                break;
            case 'up':
                if (this.y > 0) {  // on water tiles
                    this.y -= this.moveY;
                }
                break;
            case 'right':
                if (this.x < this.moveX * 4) {  // 4 moves to the right = right edge
                    this.x += this.moveX;
                }
                break;
            case 'down':
                if (this.y < this.moveY * 4) {  // 4 moves down; not 5 or else player moves below bottom boundary.
                    this.y += this.moveY;
                }
                break;
        }
    }

    // Update position of Player
    update() {
        // Check for collision, if x & y of Player & Enemy overlap.
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.moveX/1.4 > this.x && enemy.x < this.x + this.moveX/1.4)) {
                this.reset();
            }
        }

        // Win condition, if Player moves to water tile.
        if (this.y === -28) {
            this.playerWin = true;
        }
    }

    // Reset Player to starting point.
    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// (x, y, speed)
// (-101 starts enemy 1 block offscreen of left boundary)
const enemyBug1 = new Enemy(-101, 0, 300);
const enemyBug2 = new Enemy(-101, 83, 200);
const enemyBug3 = new Enemy((-101 * 4), 83, 200);
const enemyBug4 = new Enemy(-101, 166, 50);
const enemyBug5 = new Enemy((-101 * 3.5), 166, 50);

const allEnemies = [];
allEnemies.push(enemyBug1, enemyBug2, enemyBug3, enemyBug4, enemyBug5);

const player = new Player();


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
