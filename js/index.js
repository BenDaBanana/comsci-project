//ben graham
//Purpose: run a platformer game
//Date:21/07/23
//version: 13

var canvas;
var ctx;

var upKey;
var rightKey;
var downKey;
var leftKey;

var gameLoop;
var player;
var borders = [];
var spikeCollision = false
var treasureCollision = false
var active = true
var timer = 0

const PLATFORMHEIGHT = 50;
const PLATFORMWIDTH = 150;
const BLOCKHEIGHT = 150;
const BLOCKWIDTH = 600;
const SPIKESIZE = 40;


window.onload = function() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	setupInputs();
	player = new Player(300, 400);
	
	
		//walls
	borders.push(new Border(1000, 100, BLOCKHEIGHT, BLOCKWIDTH, 1));
	borders.push(new Border(2500, 200, BLOCKHEIGHT, BLOCKWIDTH, 1));
	borders.push(new Border(3600, 0, BLOCKHEIGHT, BLOCKWIDTH, 6));
	borders.push(new Border(4800, 250, BLOCKHEIGHT, BLOCKWIDTH, 1));
	borders.push(new Border(5120, -100, BLOCKHEIGHT, BLOCKWIDTH, 1));
	borders.push(new Border(5420, 200, BLOCKHEIGHT, BLOCKWIDTH, 1));
	borders.push(new Border(6300, -250, BLOCKHEIGHT, BLOCKWIDTH, 1));
	borders.push(new Border(6450, 00, BLOCKHEIGHT, BLOCKWIDTH, 6));
	borders.push(new Border(6450, 50, BLOCKHEIGHT, BLOCKWIDTH, 6));
	borders.push(new Border(6950, -100, BLOCKHEIGHT, BLOCKWIDTH, 1));
	
	
	//ground
	borders.push(new Border(0, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(600, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(1200, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(1800, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(2400, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(2650, 200, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(3000, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(3600, 520, BLOCKWIDTH, BLOCKHEIGHT*2, 1));
	borders.push(new Border(4200, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(4800, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(5400, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(5700, 200, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(6000, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	
	borders.push(new Border(7400, 520, BLOCKWIDTH, BLOCKHEIGHT*2, 1));
	
	
	//platforms
	borders.push(new Border(500, 320, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(800, 470, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(800, 170, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(1200, 320, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(1725, 500, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	
	borders.push(new Border(2100, 570, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	//borders.push(new Border(2150, 520, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(2200, 470, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
//	borders.push(new Border(2250, 420, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(2300, 370, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	//borders.push(new Border(2350, 320, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	
	borders.push(new Border(4600, 420, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(5400, 400, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(5440, 400, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(6600, 620, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(7025, 620, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	
	//powerups
	borders.push(new Border(3900, 400, PLATFORMHEIGHT, PLATFORMHEIGHT, 3));
	borders.push(new Border(2700, 500,  	80,		   PLATFORMHEIGHT, 5));
	borders.push(new Border(6000, 50, 		80, 	   PLATFORMHEIGHT, 5));
	borders.push(new Border(7675, 400, PLATFORMHEIGHT, PLATFORMHEIGHT, 7));
	
	//spikes
	borders.push(new Border(1600, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(1650, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(1700, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(1750, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(1800, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(1850, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(1900, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(1950, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(2225, 575, SPIKESIZE, SPIKESIZE, 4));
	
	borders.push(new Border(2725, 155, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(3025, 155, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(2925, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(3200, 575, SPIKESIZE, SPIKESIZE, 4));
	
	borders.push(new Border(4200, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4250, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4300, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4350, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4400, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4450, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4500, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4550, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4600, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4650, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4700, 575, SPIKESIZE, SPIKESIZE, 4));
	borders.push(new Border(4750, 575, SPIKESIZE, SPIKESIZE, 4));
	
	borders.push(new Border(5900, 95, SPIKESIZE, 100, 4));
	borders.push(new Border(6100, 95, SPIKESIZE, 100, 4));
	borders.push(new Border(5570, 575, SPIKESIZE, SPIKESIZE, 8));
	gameLoop = setInterval(step, 1000 / 30);
};

//game loop
function step() {
	
	player.step();
	draw();
	if (active == true){
	timer ++
	}
	
	
}

function draw() {
	if (active == true){
		
	ctx.fillStyle = "grey";
	ctx.fillRect(0, 0, 5000, 850);
	}

	player.draw();
	for (let i = 0; i < borders.length; i++) {
		borders[i].draw();
	}
}



function setupInputs() {
	//key down listener
	document.addEventListener("keydown", function(event) {
		if (event.key === "w"  || event.key === "W"|| event.key === " ") { 
			upKey = true;
		} else if (event.key === "a" || event.key === "A") {
			leftKey = true;
		} else if (event.key === "s" || event.key === "S") {
			downKey = true;
		} else if (event.key === "d" || event.key === "D") {
			rightKey = true;
		}
	});

	//key up listener
	document.addEventListener("keyup", function(event) {
		if (event.key === "w" || event.key === "W" || event.key === " ") {
			upKey = false;
		} else if (event.key === "a" || event.key === "A") {
			leftKey = false;
		} else if (event.key === "s" || event.key === "S") {
			downKey = false;
		} else if (event.key === "d" || event.key === "D") {
			rightKey = false;
		}
	});
}

function checkIntersection(r1, r2) {
	
	
	
	if (r2.typee === 4 || r2.typee === 8){//spikes
		if(
		r1.x <= r2.x + r2.width &&
		r1.x + r1.width >= r2.x&&
	    r1.y <= r2.y + r2.height&&
		r1.y + r1.height >= r2.y
		){
		spikeCollision = true
		console.log("bozo")
		
		} else {
			return false
		}
	
	} else if (r2.typee === 7){//win objective
		if(
		r1.x <= r2.x + r2.width &&
		r1.x + r1.width >= r2.x&&
	    r1.y <= r2.y + r2.height&&
		r1.y + r1.height >= r2.y
		){
		treasureCollision = true
		
		} else {
			return false
		}
	
	}else if (r2.typee === 3){//double jump power up
		if(
		r1.x <= r2.x + r2.width &&
		r1.x + r1.width >= r2.x&&
	    r1.y <= r2.y + r2.height&&
		r1.y + r1.height >= r2.y
		){
		hasDoubleJump = true
		} else {
			return false
		}
	
	}  else if (r2.typee === 5){
		if(
		r1.x <= r2.x + r2.width &&
		r1.x + r1.width >= r2.x&&
	    r1.y <= r2.y + r2.height&&
		r1.y + r1.height >= r2.y
		){
		hasKey = true
		
		} else {
			return false
		}
	
	}else if (hasKey == false){
		if (r1.x >= r2.x + r2.width) {
		// left-hand edge of player, right-hand edge of border
			return false;
		} else if (r1.x + r1.width <= r2.x) {
			// right-hand of player left-hand of border
			return false;
			
		} else if (r1.y >= r2.y + r2.height) {
			// top side of player, bottom side of border
			
			return false;
			 
		} else if (r1.y + r1.height <= r2.y) {
			// bottom edge of player, top edge of border
			return false;
		} else {
			return true;
	}
	} else{
		if(r2.typee != 6){
			if (r1.x >= r2.x + r2.width) {
		// left-hand edge of player, right-hand edge of border
			return false;
		} else if (r1.x + r1.width <= r2.x) {
			// right-hand of player left-hand of border
			return false;
			
		} else if (r1.y >= r2.y + r2.height) {
			// top side of player, bottom side of border
			
			return false;
			 
		} else if (r1.y + r1.height <= r2.y) {
			// bottom edge of player, top edge of border
			return false;
		} else {
			return true;
		}
		} else {
			return false
		}
	}
	
}
``
