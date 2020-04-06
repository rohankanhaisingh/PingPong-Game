/*
 * PingPong Game by Rohan Kanhaisingh
 * Feel free to play around with the code.
 * See also my github, https://github.com/rohankanhaisingh.
 * 
*/

var canvas = document.querySelector('.game-canvas-main'); // Get the canvas;
var ctx = canvas.getContext("2d"); // Get the context of the canvas.
canvas.width = window.innerWidth; // Set the width of the canvas.
canvas.height = window.innerHeight; // Set the height of the canvas.

class Ball {
    // Ball object
    constructor() {
        this.radius = 10; // The radius of the ball.

        // To spawn the ball in the center of the screen.
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.moveSpeed = 5; // Set the general movespeed;
        this.moveX = this.moveSpeed; // Set the movespeed of the x axis.
        this.moveY = -this.moveSpeed; // Set the movespeed of the y axis.
        this.color = "#e14c4c"; // Lets give it a nice light red color.
    }

    draw() {
        ctx.beginPath(); // Start the draw method.
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); // Draw a circle.
        ctx.fillStyle = this.color; // Define the circle its color.
        ctx.fill(); // Fill the circle.
        ctx.closePath(); // End the draw method.
    }

    update() {
        this.x += this.moveX; // Move the ball its x position.
        this.y += this.moveY; // Move the ball its y position.

        // Logic if the ball hits the corner.
        if (this.x > canvas.width - this.radius) {
            // If the ball hits the right of the canvas, the the ball will change its direction to the left.
            this.moveX = -this.moveSpeed;

            // Summon particles
            for (var i = 0; i < 20; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
        if (this.x < 0 + this.radius) {
            // If the ball hits the left of the canvas, the the ball will change its direction to the right.
            this.moveX = this.moveSpeed;

            // Summon particles
            for (var i = 0; i < 20; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
        if (this.y > canvas.height - this.radius) {
            // If the ball hits the bottom of the canvas, the ball will change its direction to the top.
            this.moveY = -this.moveSpeed;

            // Summon particles
            for (var i = 0; i < 20; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }

        }
        if (this.y < 0 + this.radius) {
            // If the ball hits the top of the canvas, the ball will change its direction to the bottom.
            this.moveY = this.moveSpeed;

            // Summon particles
            for (var i = 0; i < 20; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }

        this.draw();
    }
}

var particles = []; // Empty array.
class Particle {
    // Particle object.

    constructor(x, y, color) {
        // Define the x and the y axis.
        this.x = x;
        this.y = y;

        this.radius = 1; // Set the radius to 1.
        this.color = color; // Give it a nice color.

        // Set a random move direction between a negative and a positve number.
        this.moveY = -Math.random() * (1 - -4.1); 
        this.moveX = Math.random() * (5 - 0.01) - 3;
    }
    draw() {
        ctx.beginPath(); // Start the draw method.
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // Draw the circle.
        ctx.fillStyle = this.color; // Define the circle its color.
        ctx.fill(); // Fill the circle.
    }
    update() {
        if (this.radius > 0.1) {
            // If the radius is more than 0.1, then the code below will be executed.

            this.moveY += 0.3; // Move all the particles to the bottom, to give a gravity effect.
            this.radius -= 0.02; // Make the particles smaller, so it gives a fade-out effect.

            // To update the movements of the particles.
            this.x -= this.moveX; 
            this.y += this.moveY;
        } else {
            // If the radius is below 0.1, then the particle will be removed.
            particles.shift(); // Clear the last index of the array.
        }
        this.draw();
    }
}

var MyBall = new Ball(); // Create a object.

var players = [];
class Player {
    // Player object.
    constructor(x, y, name, color) {
        this.x = x; // Set the x axis position.
        this.y = y; // Set the y axis position.
        this.name = name; // Set the name, because for the fun.
        this.color = color; // Set the player its color.
        this.isMoving = { // Create a movement object.
            toBottom: false,
            toTop: false
        }
        players.push(this);
    }

    draw() {
        ctx.beginPath(); // Start the draw method.
        ctx.rect(this.x, this.y, 10, 60); // Draw the rectangle.
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.isMoving.toTop == true) {
            // The player will go to the top when isMoving.toTop equals to true
            this.y -= 7;
        }
        if (this.isMoving.toBottom == true) {
            // The player will go to the bottom when isMoving.toBottom equals to true
            this.y += 7;
        }

        // Logics for the players when they hit the corners.
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > canvas.height - 60) {
            this.y = canvas.height - 60;
        }


        // Logics for the ball when the ball touches the players.
        if (typeof MyBall !== 'undefined') { // Check if the ball exist.
            if (MyBall.x < canvas.width / 2) {
                // If the ball is in the first half of the canvas width
                if ((MyBall.x > this.x && MyBall.x < this.x + MyBall.radius) && (MyBall.y > this.y - MyBall.radius && MyBall.y < this.y + 60 + MyBall.radius)) {
                    // If the ball gets in touch with the player at the left.
                    MyBall.moveX = MyBall.moveSpeed;

                    // Summon particles
                    for (var i = 0; i < 20; i++) {
                        particles.push(new Particle(this.x, this.y, this.color));
                    }
                }
            }
            // If t
            if (MyBall.x > canvas.width / 2) {
                if ((MyBall.x > this.x - MyBall.radius && MyBall.x < this.x) && (MyBall.y > this.y - MyBall.radius && MyBall.y < this.y + 60 + MyBall.radius)) {
                    MyBall.moveX = -MyBall.moveSpeed;

                    // Summon particles
                    for (var i = 0; i < 20; i++) {
                        particles.push(new Particle(this.x, this.y, this.color));
                    }
                }
            }
        }

        this.draw(); // Update and draw the player.
    }
}

window.addEventListener("keydown", function (event) {
    // Create a a keydown event listener.
    // Check the keycodes at https://keycode.info.


    if (typeof Player1 !== 'undefined') { // Check if the first player exist.
        if (event.keyCode == 87) {
            // If the first player press the W button.
            Player1.isMoving.toTop = true;
        }
        if (event.keyCode == 83) {
            // If the first player press the S button.
            Player1.isMoving.toBottom = true;
        }
    }
    if (typeof Player2 !== 'undefined') {
        if (event.keyCode == 38) {
            // If the second player press the arrow-up button.
            Player2.isMoving.toTop = true;
        }
        if (event.keyCode == 40) {
            // If the second player press the arrow-down button.
            Player2.isMoving.toBottom = true;
        }
    }
});

window.addEventListener("keyup", function (event) {
    // Create a a keyup event listener.
    // Check the keycodes at https://keycode.info.

    if (typeof Player1 !== 'undefined') {// Check if the first player exist.
        if (event.keyCode == 87) {
            Player1.isMoving.toTop = false;
        }
        if (event.keyCode == 83) {
            Player1.isMoving.toBottom = false;
        }
    }
    if (typeof Player2 !== 'undefined') {
        if (event.keyCode == 38) {
            Player2.isMoving.toTop = false;
        }
        if (event.keyCode == 40) {
            Player2.isMoving.toBottom = false;
        }
    }
});

var Player1 = new Player(30, canvas.height / 2 - 30, 'Name of player 1', '#e6e4e1'); // Create and define the first player.
var Player2 = new Player(canvas.width - 40, canvas.height / 2 - 30, 'Name of player 2', '#e6e4e1'); // Create and define the second player.


var requestanim; // Create a empty variable.
function update() {
    requestanim = requestAnimationFrame(update); // Call the global update function every frame.
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas each frame.

    // Draw a line in the middle of the screen.
    ctx.beginPath();
    ctx.rect(canvas.width / 2 - 1, canvas.height / 2 - (canvas.height / 2) / 2, 2, canvas.height / 2);
    ctx.fillStyle = '#618eed';
    ctx.fill();
    ctx.closePath();


    // Track for player one.
    ctx.beginPath();
    ctx.rect(Player1.x, 0, 10, canvas.height);
    ctx.fillStyle = '#2b2b2b';
    ctx.fill();
    ctx.closePath();

    // Track for player two.
    ctx.beginPath();
    ctx.rect(Player2.x, 0, 10, canvas.height);
    ctx.fillStyle = '#2b2b2b';
    ctx.fill();
    ctx.closePath();


    if (typeof MyBall.update !== 'undefined') {
        MyBall.update(); // Update the ball.
    }

    for (var i = 0; i < players.length; i++) {
        // Loop through the players array;
        if (typeof players[i].update !== 'undefined') {
            players[i].update(); // Update the players.
        }
    }

    for (var i = 0; i < particles.length; i++) {
        // Loop through the particles array.
        if (typeof particles[i].update !== 'undefined') {
            particles[i].update(); // Update the particles.
        }
    }
}

update(); // Update the whole process.


/*
 * That is basically the pingpong game. 
 * As I said earlier, feel free to play around with the code and to learn stuff.
 * I hope you enjoyed this one :).
 * 
 * I have some challenges for you if you are up to:
 * 
 * - Create a trail for the ball.
 * - Play sounds when the ball hits the corners.
 * - Create a multiplayer system using NodeJS.
 * - Make a score system.
 * - Do some cool UI stuff.
 * 
 * I already did all these challenges, so you can do it too! Goodluck out there
 * 
*/


// Rohan Kanhaisingh. https://github.com/rohankanhaisingh or https://instagram.com/rohankanhaisingh