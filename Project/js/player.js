function Player(x, y) {
    // player variables
	var jumpHeight = 45
	var doubleJumpHeight = 40
	var isGrounded = false
	var canDoubleJump = true
	var hasDoubleJump = true
	
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.4;
    this.maxSpeed = 15;
	this.yMaxspeed = 20
    this.width = 50;
    this.height = 100;
    this.active = true; // Add the 'active' property and set it to true

    this.step = function() {
        // movement
        if (this.active) {
            // horizontal movement
            if (!leftKey && !rightKey) {
                // slow down
                this.xspeed *= this.friction;
            } else if (rightKey) {
                this.xspeed = this.xspeed + 3
				
            } else if (leftKey) {
                this.xspeed = this.xspeed - 3
            }
            // vertical movement
			if (upKey) {
				console.log(upKey)
				//check player grounded
				
				if(isGrounded == true){
				    this.yspeed = -jumpHeight
				    isGrounded = false
					upKey = false
				}else if(hasDoubleJump == true){
					if(canDoubleJump == true){
					this.yspeed = -doubleJumpHeight
				    canDoubleJump = false
					}
				}
			
				
				
			}
			//gravity
			this.yspeed += 5
			
            // correct speed
			if (this.xspeed >this.maxSpeed) {
				this.xspeed = this.maxSpeed
			}else if (this.xspeed < -this.maxSpeed) {
				this.xspeed = -this.maxSpeed
			}
				if (this.yspeed >this.yMaxSpeed) {
				this.yspeed = this.yMaxSpeed
			}else if (this.yspeed < -this.yMaxSpeed) {
				this.yspeed = -this.yMaxSpeed
			}
			
			
			if(this.xspeed > 0) {
				this.xspeed = Math.floor(this.xspeed)
			}else {
				this.xspeed = Math.ceil(this.xspeed)
			}
			if(this.yspeed > 0) {
				this.yspeed = Math.floor(this.yspeed)
			}else {
				this.yspeed = Math.ceil(this.yspeed)
			}
			//horizontal collision
			let horizontalRect = {
				
				x: this.x + this.xspeed,
				y: this.y,
				width: this.width,
				height: this.height
			}
			
			//vertiacal collision
			
			let verticalRect = {
            x: this.x,
			y: this.y + this.yspeed,
			width: this.width,
			height: this.height
			}
			
			//check for intersections
			for (let i = 0; i < borders.length; i++) {
			   let	borderRect = {
				   x: borders[i].x,
				   y: borders[i].y,
				   width: borders[i].width,
				   height: borders[i].height
				   type: borders[i].type
				   
			   }
			   
			   if(checkIntersection(horizontalRect, borderRect)){
				   while(checkIntersection(horizontalRect, borderRect)){
					   horizontalRect.x -= Math.sign(this.xspeed);	   
				   }
			     
			   this.x = horizontalRect.x
			   this.xspeed = 0
			   }
			      if(checkIntersection(verticalRect, borderRect)){
				   while(checkIntersection(verticalRect, borderRect)){
					   verticalRect.y -= Math.sign(this.yspeed);
			   }
			   this.y = verticalRect.y
			   isGrounded = true
			   canDoubleJump = true
			   this.yspeed = 0
			 
			  
			   }
			   			   
			   
			}
			obstacleMover = this.xspeed
			this.y += this.yspeed
        }
    };

    this.draw = function() {
		
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
}
