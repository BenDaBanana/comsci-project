var canvas;
var ctx;

var upKey;
var rightKey;
var downKey;
var leftKey;

var gameLoop;
var player;
var borders = [];

var active = true

const PLATFORMHEIGHT = 50;
const PLATFORMWIDTH = 150;
const BLOCKHEIGHT = 150;
const BLOCKWIDTH = 600;

window.onload = function() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	setupInputs();
	player = new Player(300, 200);
	//ground
	borders.push(new Border(0, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(600, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(1200, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	borders.push(new Border(2550, 620, BLOCKWIDTH, BLOCKHEIGHT, 1));
	//walls
	borders.push(new Border(1000, 100, BLOCKHEIGHT, BLOCKWIDTH, 1));
	//platforms
	borders.push(new Border(800, 470, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(500, 320, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(800, 170, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(1200, 320, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	borders.push(new Border(2100, 520, PLATFORMWIDTH, PLATFORMHEIGHT, 2));
	//powerups
	borders.push(new Border(1500, 500, 50, 50, 3));

	gameLoop = setInterval(step, 1000 / 30);
};

function step() {
	player.step();
	draw();
	
}

function draw() {
	if (active == true){
		
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 1280, 720);
	}

	player.draw();
	for (let i = 0; i < borders.length; i++) {
		borders[i].draw();
	}
}



function setupInputs() {
	document.addEventListener("keydown", function(event) {
		if (event.key === "w") {
			upKey = true;
		} else if (event.key === "a") {
			leftKey = true;
		} else if (event.key === "s") {
			downKey = true;
		} else if (event.key === "d") {
			rightKey = true;
		}
	});

	document.addEventListener("keyup", function(event) {
		if (event.key === "w") {
			upKey = false;
		} else if (event.key === "a") {
			leftKey = false;
		} else if (event.key === "s") {
			downKey = false;
		} else if (event.key === "d") {
			rightKey = false;
		}
	});
}

function checkIntersection(r1, r2) {
	if (r2.typee === 3){
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
	
	} else if (r1.x >= r2.x + r2.width) {
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
}
``
