var jumpHeight = 45;
var doubleJumpHeight = 40;
var isGrounded = false;
var canDoubleJump = true;
var hasDoubleJump = false;
class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.xspeed = 0;
		this.yspeed = 0;
		this.friction = 0.4;
		this.maxSpeed = 15;
		this.yMaxspeed = 40;
		this.width = 50;
		this.height = 100;
		this.active = true;
	}

	step() {
		if (this.y > 720){
			this.active = false
			this.maxspeed = 0
			obstacleMover = 0
			this.gameOver()
			active = false
			
		}
			
		if (this.active) {
			if (!leftKey && !rightKey) {
				this.xspeed *= this.friction;
			} else if (rightKey) {
				this.xspeed = this.xspeed + 3;
			} else if (leftKey) {
				this.xspeed = this.xspeed - 3;
			}

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

			this.yspeed += 5;
            isGrounded = false
			if (this.xspeed > this.maxSpeed) {
				this.xspeed = this.maxSpeed;
			} else if (this.xspeed < -this.maxSpeed) {
				this.xspeed = -this.maxSpeed;
			}
			if (this.yspeed > this.yMaxspeed) {
				this.yspeed = this.yMaxspeed;
			}

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
				}
			}

			obstacleMover = this.xspeed;
			this.y += this.yspeed;
		}
	}

	draw() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
	gameOver(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 1280, 720)
	ctx.fillStyle = "red"
	ctx.font = "80px impact"
	ctx.fillText("game over", 450, 300)
    }
}
