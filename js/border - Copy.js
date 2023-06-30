var obstacleMover = 0;
var keyReset = false
var spikeSpeed = 5
var spikeCounter = 0


function Border(x, y, width, height, typee) {
	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.typee = typee;

	

	this.draw = function() {
		if(this.typee == 8){
			if (spikeCounter < 150){
				
			this.x += spikeSpeed
			spikeCounter++
			
			
			}else if (spikeCounter <300){
				
			this.x -= spikeSpeed
			spikeCounter++
			
			
			}else{
				spikeCounter = 0
			}
		}
		
		
		if(this.typee == 5){
			if(this.x < -2000){
				if(keyReset == false){
				hasKey = false
				keyReset = true
				}
			}
		}
		
		
		if (this.typee === 1) {
			ctx.fillStyle = "blue";
		} else if (this.typee === 2) {
			ctx.fillStyle = "red";
		} else if (this.typee === 3) {
			ctx.fillStyle = "orange";	
		} else if (this.typee === 4 || this.typee === 8) {
			ctx.fillStyle = "silver";
		} else if (this.typee === 5) {
			ctx.fillStyle = "orange";	
		} else if (this.typee === 6) {
			ctx.fillStyle = "blue";
		} else if (this.typee === 7) {
			ctx.fillStyle = "gold";
		}
		this.x -= obstacleMover;
		if(active == true){
			if (this.typee == 1 || this.typee == 2 || this.typee == 4 || this.typee == 8 || this.typee == 7){
				ctx.fillRect(this.x, this.y, this.width, this.height);
			
		}
		
		if (this.typee == 3){
			if (hasDoubleJump == false){
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
			
		}
		
		if (hasKey == false){
			if (this.typee == 5){
				ctx.fillRect(this.x, this.y, this.width, this.height);
				console.log("bingus")
			}
		}
		
		if (hasKey == false){
			if (this.typee == 6){
				console.log("keydoor")
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}
		
		
	};
}
}
