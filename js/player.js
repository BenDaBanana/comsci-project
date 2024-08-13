//ben graham
//Purpose: run a platformer game
//Date:21/07/23
//version: 13


var jumpHeight = 45;
var doubleJumpHeight = 40;
var isGrounded = false;
var canDoubleJump = true;
var hasDoubleJump = false;
var hasKey = false
var collisionCheck = 0
var skellyRightImage = new Image()
skellyRightImage.src = "images/SkellyRight.png"
var skellyLeftImage = new Image()
skellyLeftImage.src = "images/skellyLeft.png"

class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.xspeed = 0;
		this.yspeed = 0;
		this.friction = 0.8;
		this.maxSpeed = 15;
		this.yMaxspeed = 40;
		this.width = 50;
		this.height = 100;
		this.active = true;
	}
		
		
	//game loop
	step() {
		if (spikeCollision == true || this.y > 720){
			this.gameOver()
			
		}
		if (treasureCollision == true){
			this.gameWon()
			
		}
		
			
		if (this.active) {
			if (!leftKey && !rightKey) {
				this.xspeed *= this.friction;
			} else if (rightKey) {
				this.xspeed = this.xspeed + 3;
			} else if (leftKey) {
				this.xspeed = this.xspeed - 3;
			}
			
			
			//jumping
			if (upKey) {
				if (isGrounded === true) {
					this.yspeed = -jumpHeight;
					isGrounded = false;
					upKey = false;
				} else if (hasDoubleJump === true) {
					if (canDoubleJump === true) {
						this.yspeed = -doubleJumpHeight;
						canDoubleJump = false;
					}
				}
			}
			
			
			//gravity
			this.yspeed += 5;
            isGrounded = false
			
			//prevents player goinfg faster than max speed, no block prenting -yMaxspeed as that blocks the jump.
			if (this.xspeed > this.maxSpeed) {
				this.xspeed = this.maxSpeed;
			} else if (this.xspeed < -this.maxSpeed) {
				this.xspeed = -this.maxSpeed;
			}
			if (this.yspeed > this.yMaxspeed) {
				this.yspeed = this.yMaxspeed;
			}



			//this block of code rounds up player speed to reduce errors in collision.
			if (this.xspeed > 0) {
				this.xspeed = Math.floor(this.xspeed);
			} else {
				this.xspeed = Math.ceil(this.xspeed);
			}
			if (this.yspeed > 0) {
				this.yspeed = Math.floor(this.yspeed);
			} else {
				this.yspeed = Math.ceil(this.yspeed);
			}
			
			

			let horizontalRect = {
				x: this.x + this.xspeed,
				y: this.y,
				width: this.width,
				height: this.height,
			};

			let verticalRect = {
				x: this.x,
				y: this.y + this.yspeed,
				width: this.width,
				height: this.height,
			};

			for (let i = 0; i < borders.length; i++) {
				

				if (checkIntersection(horizontalRect, borders[i])) {
					while (checkIntersection(horizontalRect, borders[i])) {
						horizontalRect.x -= Math.sign(this.xspeed);
					}
					this.x = horizontalRect.x;
					this.xspeed = 0;
					
				}

				if (checkIntersection(verticalRect, borders[i])) {
					while (checkIntersection(verticalRect, borders[i])) {
						
						verticalRect.y -= Math.sign(this.yspeed);
					}
					this.y = verticalRect.y;
					isGrounded = true;
					
					canDoubleJump = true;
					this.yspeed = 0;
					collisionCheck += 1
					console.log(collisionCheck)
					if(collisionCheck >= 5){
						this.y += this.yMaxspeed
					}
				}else{
					collisionCheck = 0
				}
			}
			//obstactleMover applies the x speed of the player to the borders, instead of the player, creating a scrolling effect.
			obstacleMover = this.xspeed;
			this.y += this.yspeed;
		}
	}

	draw() {
		if(this.active == true){
			ctx.fillStyle = "green";
			if(this.xspeed < 0){
				ctx.drawImage(skellyLeftImage, this.x, this.y, this.width, this.height);
			} else if(this.xspeed > 0){
				ctx.drawImage(skellyRightImage, this.x, this.y, this.width, this.height);
			} else{
				ctx.drawImage(skellyRightImage, this.x, this.y, this.width, this.height);
			}
		}
	}
	
	gameOver(){
		this.active = false
		this.maxspeed = 0
		obstacleMover = 0
		active = false
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 1280, 720)
		ctx.fillStyle = "red"
		ctx.font = "80px impact"
		ctx.fillText("game over", 450, 300)
		
		
		
    }
	
	gameWon(){
		this.active = false
		this.maxspeed = 0
		obstacleMover = 0
		active = false
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 1280, 720)
		ctx.fillStyle = "Green"
		ctx.font = "80px impact"
		ctx.fillText("You have winner, congragulation", 50, 300)
		var afterDiv = timer/30
		ctx.fillText("It took "+afterDiv.toFixed(2)+" seconds", 450, 400)
    }
}
