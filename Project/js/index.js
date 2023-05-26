
var canvas
var ctx

//
var upKey
var rightKey
var downKey
var leftKey

var gameLoop
var player
var borders = []

const BLOCKSIZE = 150
//once the page has loaded
window.onload = function() {
	canvas = document.getElementById("myCanvas")
	ctx = canvas.getContext("2d")
	
	//setup key listeners
	setupInputs()
	//create the player
	player = new Player(300,200)
	
	//create map
	
	borders.push(new Border(0, 620, 600, BLOCKSIZE, 1))
	borders.push(new Border(0, 470, BLOCKSIZE, BLOCKSIZE, 2))
	borders.push(new Border(600, 420, BLOCKSIZE, BLOCKSIZE, 2))
	borders.push(new Border(900, 420, BLOCKSIZE, BLOCKSIZE, 2))
	
	gameLoop = setInterval(step, 1000/30)
	
	
}

function step(){
	
	player.step()
	
	draw()
}

function draw(){
	
	ctx.fillStyle = "white"
	ctx.fillRect(0,0,1280,720)
	
	player.draw()
	for (let i = 0; i < borders.length; i++) {
		borders[i].draw()
	}
} 

function setupInputs(){
	document.addEventListener("keydown", function(event) {
		if (event.key === "w"){
			upKey = true;
			
		} else if (event.key ==="a") {
			leftKey = true;
			
		} else if (event.key ==="s") {
			downKey = true;
		}
		else if (event.key ==="d") {
			rightKey = true;
		}
	})
	document.addEventListener("keyup", function(event) {
		if (event.key === "w"){
			upKey = false;
		} else if (event.key ==="a") {
			leftKey = false;
		} else if (event.key ==="s") {
			downKey = false;
		}
		else if (event.key ==="d") {
			rightKey = false;
		}
	})
}

function checkIntersection(r1, r2) {
	if (r1.x >= r2.x + r2.width){
		return false
	} else if (r1.x + r1.width <= r2.x){
		return false
	}else if (r1.y >= r2.y + r2.height) {
		return false
	}else if (r1.y + r1.height <= r2.y){
		return false
	} else{
		return true
	}
}
