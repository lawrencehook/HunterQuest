"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class LabSixGame extends Game {
	
	constructor(canvas) {
		var canvasWidth = 700,
			canvasHeight = 500;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		super("Hunter Quest", canvasWidth, canvasHeight, canvas);

		this.windowWidth = utils.getWidth(),
		this.windowHeight = utils.getHeight(),
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.midPoint = new Point(0.5*this.canvasWidth, 0.5*this.canvasHeight);

		// Lab 5
		this.mario = new PhysicsSprite("mario", "spritesheet.png", marioSprites, this);
		this.mario.ischaracter = true;
		this.mario.dynamic = true;
		this.mario.xBound = this.canvasWidth;
		this.mario.yBound = this.canvasHeight;
		this.mario.position = (new Point(this.midPoint.x, this.canvasHeight - 100)).minus(this.mario.getCenter());

		this.coin = new AnimatedSprite("coin", "coin_sprites.png", coinSprites, this);
		this.coin.position = new Point(
			(this.canvasWidth - 60),
			30
		);

		// Add collidable objects last to make collision checking ~slightly~ easier
		this.platforms = new Array(3);
		for (var i = 0; i < this.platforms.length; i++) {
			this.platforms[i] = new Platform(50 + 200*i, 450 - 150*i, 100, 20, "#435d7c", this);
		}
		this.platforms.push(new Platform(-10, canvasHeight-15, canvasWidth+10, 10, "#3c8002", this));

		// Events
		this.questManager = new QuestManager();
		this.coin.eventDispatcher.addEventListener(this.questManager, "COIN_PICKED_UP");

		// Sound effects
		this.soundManager = new SoundManager();
		this.soundManager.addSound("jump", new Audio("resources/audio/jump.mp3"));
		this.soundManager.addSound("bell", new Audio("resources/audio/bell.mp3"));
		this.soundManager.addSound("background", new Audio("resources/audio/06-worlds-2-4-and-6.mp3"));
		// this.soundManager.loopSound("background");

		// Tweens
		this.marioTween = new Tween(this.mario);
		this.marioTween.animate("alpha", 0, 1, 1000);

		this.tweenJuggler = new TweenJuggler();
		TweenJuggler.add(this.marioTween);

		// Mouse clicks
		window.addEventListener("click", onClick, true);
		this.mouse = utils.captureMouse(canvas);
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		this.tweenJuggler.nextFrame();

		// Mario got the coin!
		if (this.mario.loaded && utils.intersects(this.coin.getHitbox(), this.mario.getHitbox())) {
			this.coin.eventDispatcher.dispatchEvent({
				eventType: "COIN_PICKED_UP",
				source: this.coin
			});
		}
	}

	draw(context) {
		context.clearRect(0, 0, this.width, this.height);
		super.draw(context);

		if (this.questManager.coinPickedUp) {
			write(context, "black", "20px Georgia", "You picked up a coin!", 15, 25);
		}
	}
}

/**
 * THIS IS THE BEGINNING OF THE PROGRAM
 * YOU NEED TO COPY THIS VERBATIM ANYTIME YOU CREATE A GAME
 */
function tick() {
	game.nextFrame();
}


/* Get the drawing canvas */
var drawingCanvas = document.getElementById('game');
if(drawingCanvas.getContext) {
	var game = new LabSixGame(drawingCanvas);
	game.start();
}

// Necessary for proper "this" object
function onClick(e) {}

function write(context, style, font, text, x, y) {
	context.fillStyle = style;
	context.font = font;
	context.fillText(text, x, y);
}
