
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
//once the page has loaded
window.onload = function() {
	canvas = document.getElementById("myCanvas")
	ctx = canvas.getContext("2d")
	
	//setup key listeners
	setupInputs()
	//create the player
	player = new Player(300,200)
	
	//create map
	for (let i = 0; i < 6; i++) {
		borders.push(new Border(0 + 100* i, 620, 100, 100, 1))
	}
	borders.push(new Border(0, 520, 100, 100, 2))
	for (let i = 0; i < 3; i++){
		borders.push(new Border(600, 420 + 100*i, 100, 100, 2))
	}
	
	gameLoop = setInterval(step, 1000/30)
	
	
}

function step(){
	// console.log("step")
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
