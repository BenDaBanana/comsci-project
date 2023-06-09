var obstacleMover = 0;

function Border(x, y, width, height, typee) {
	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.typee = typee;




	this.draw = function() {
		if (this.typee === 1) {
			ctx.fillStyle = "blue";
		} else if (this.typee === 2) {
			ctx.fillStyle = "red";
		} else if (this.typee === 3) {
			ctx.fillStyle = "orange";
			
		}
		this.x -= obstacleMover;
		if (hasDoubleJump == true){
				if (this.typee != 3){
					if (active == true){
					ctx.fillRect(this.x, this.y, this.width, this.height);
					}
				
				}
			
		}else{
			if (active == true){
			ctx.fillRect(this.x, this.y, this.width, this.height)
			}
			
		}
		
	};
}
