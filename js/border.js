//ben graham
//Purpose: run a platformer game
//Date:21/07/23
//version: 13

var obstacleMover = 0;
var keyReset = false
var spikeSpeed = 5
var spikeCounter = 0
var spikeImage = new Image()
spikeImage.src = "images/Spike.png"
var platformImage = new Image()
platformImage.src = "images/Platform.png"
var doubleJumpImage = new Image()
doubleJumpImage.src = "images/DoubleJump.png"
var keyImage = new Image()
keyImage.src = "images/Key.png"
var keyDoorImage = new Image()
keyDoorImage.src = "images/Keydoor.png"
var groundImage = new Image()
groundImage.src = "images/Ground.png"
var wallImage = new Image()
wallImage.src = "images/Wall.png"
var heartImage = new Image()
heartImage.src = "images/Heart.png"


function Border(x, y, width, height, typee) {
	
	this.x = x;
	this.y = y+100;
	this.width = width;
	this.height = height;
	this.typee = typee;

	


	this.draw = function() {// draw all borders
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
		
		
		if(this.typee == 5){ // if the player has moved far enough away from the first key, reset it so the second key is visible
			if(this.x < -2000){
				if(keyReset == false){
				hasKey = false
				keyReset = true
				}
			}
		}
		
		
		this.x -= obstacleMover;//move obstacles instead of the player
		
		
		
		if(active == true){
			
			//draw borders
			if (this.typee == 7){
				ctx.drawImage(heartImage, this.x, this.y, this.width, this.height);
			
			}
			if (this.typee == 1){
				if(this.width>300){
					ctx.drawImage(groundImage, this.x, this.y, this.width, this.height);
				} else{
					ctx.drawImage(wallImage, this.x, this.y, this.width, this.height);
				}
			
			}
			
			if (this.typee == 2){
				ctx.drawImage(platformImage, this.x, this.y, this.width, this.height);
			
			}
			
			
			if (this.typee == 4 || this.typee == 8){
				//ctx.strokeStyle = "rgb(0,255,0)"
				//ctx.strokeRect(this.x, this.y, this.width, this.height);
				ctx.drawImage(spikeImage, this.x - 5, this.y - 5, this.width + 10, this.height+10);
			
			}
			
			if (this.typee == 3){
				if (hasDoubleJump == false){
					ctx.drawImage(doubleJumpImage, this.x, this.y, this.width, this.height);
				}
				
			}
			
			if (hasKey == false){
				if (this.typee == 5){
					ctx.drawImage(keyImage, this.x, this.y, this.width, this.height);
					
					
				}
			}
			
			if (hasKey == false){
				if (this.typee == 6){
					ctx.drawImage(keyDoorImage, this.x, this.y, this.width, this.height);
				}
			}
		
		
		};
		
	};
}
