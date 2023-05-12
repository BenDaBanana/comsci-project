

var canvas;
var ctx;


var gameLoop;
var player;

window.onload = function() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	
	
	player = new Player(100,400);
	
	gameLoop = setInterval(step, 1000/30);
	
	
}

function step(){
	// console.log("step")
	player.step();
	
	draw();
}

function draw(){
	
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,1280,720)
	
	player.draw();
} 