function Player(x, y) {
    // player variables
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.6;
    this.maxSpeed = 10;
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
                this.xspeed++;
            } else if (leftKey) {
                this.xspeed--;
            }
            // vertical movement
			if (upKey) {
				//check player grounded
				
				this.yspeed = -15
				
				
			}
			//gravity
			this.yspeed += 5
			
            // correct speed
			if (this.xspeed >this.maxSpeed) {
				this.xspeed = this.maxSpeed
			}else if (this.xspeed < -this.maxSpeed) {
				this.xspeed = -this.maxSpeed
			}
				if (this.yspeed >this.maxSpeed) {
				this.yspeed = this.maxSpeed
			}else if (this.yspeed < -this.maxSpeed) {
				this.yspeed = -this.maxSpeed
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
			//hori collision
			let horizontalRect = {
				x: this.x + this.xspeed,
				y: this.y,
				width: this.width,
				height: this.height
			}
			
			//vert collision
			
			let verticalRect = {
            x:this.x,
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
				   height: borders[i].height,
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
			  this.yspeed = 0
			   }		
			   
			}
        }
    };

    this.draw = function() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
}
