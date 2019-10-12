/**
 * Matrix v1.0
 * Copyright 2019 Pavel Smith
 * Written while drinking cofe and listening to rock-n-roll
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

let fps = 60,
    el = document.getElementById("canvas"),
    canvas = el.getContext("2d");

el.width = window.innerWidth;
el.height = window.innerHeight;

canvas.fillStyle = "black";
canvas.fillRect(0, 0, window.innerWidth, window.innerHeight);

let backLayer = new Layer({
	alfa: 0.5,
	fontSize: 10,
	maxSpeed: 0.1
});

let midLayer = new Layer({
	alfa: 0.7,
	fontSize: 14,
	maxSpeed: 0.3
});

let frontLayer = new Layer({
	fontSize: 18,
	maxSpeed: 0.5
});

backLayer.generate();
midLayer.generate();
frontLayer.generate();

animate();

function animate() {
	setTimeout(function() {
		requestAnimationFrame(animate);
		
		clear();
		
		backLayer.draw(canvas);
		midLayer.draw(canvas);
		frontLayer.draw(canvas);

		backLayer.step();
		midLayer.step();
		frontLayer.step();
	}, 3600 / fps);
}

function clear() {
	canvas.fillStyle = "rgba(0, 0, 0, 0.15)";
	canvas.fillRect(0, 0, window.innerWidth, window.innerHeight);
}