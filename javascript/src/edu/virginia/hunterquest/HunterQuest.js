"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class HunterQuest extends Game {
	
	constructor(canvas) {
		var	windowWidth = utils.getWidth(),
			windowHeight = utils.getHeight(),
			canvasWidth = windowWidth - 15,
			canvasHeight = windowHeight - 100;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;


		super("Hunter Quest", canvasWidth, canvasHeight, canvas);

		this.sidebarWidth = 150;
		this.windowWidth = utils.getWidth();
		this.windowHeight = utils.getHeight();
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.midPoint = new Point(0.5*this.canvasWidth, 0.5*this.canvasHeight);

		// Mouse clicks
		window.addEventListener("click", onClick, true);
		this.mouse = utils.captureMouse(canvas);

		this.initialize();
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		this.tweenJuggler.nextFrame();
	}

	draw(context) {
		context.clearRect(0, 0, this.width, this.height);
		super.draw(context);

		if (this.questManager.coinPickedUp) {
			write(context, "black", "20px Georgia", "You picked up a coin!", 15, 25);
		}
	}

	restart() {
		// Remove all children from Game.
		this.removeAll();

		this.initialize();
	}

	initialize() {
		// Events
		this.questManager = new QuestManager();

		// Tweens
		this.tweenJuggler = new TweenJuggler();

		// Hunter Quest
		this.gamescreen = new GameScreen("gamescreen", this, this.sidebarWidth, 0, this.canvasWidth - this.sidebarWidth, this.canvasHeight);

		this.mario = new Character("character", "spritesheet.png", marioSprites, this.gamescreen);
		this.mario.ischaracter = true;
		this.mario.xMaxBound = this.canvasWidth - this.sidebarWidth;
		this.mario.yMaxBound = this.canvasHeight;
		this.mario.position = this.gamescreen.getCenter();

		this.enemy1 = new Monster("enemy1", "spritesheet.png", marioSprites, this.gamescreen);
		this.enemy1.position = (new Point(0.5*this.canvasWidth, 50)).minus(new Point(0.5*this.mario.getUnscaledWidth(), 0));

		this.sidebar = new Sidebar("sidebar", "", this, this.sidebarWidth, this.canvasHeight);
		// this.opponent = new PhysicsSprite

		this.projectiles = new ArrayList();
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		if(pressedKeys.indexOf(74) !== -1) { //Press key = j
			var rX = Math.random() * this.canvasWidth + 50;
			var rY = Math.random() * this.canvasHeight + 50;
			this.enemy1 = new Monster("enemy1", "spritesheet.png", marioSprites, this.gamescreen);
			this.enemy1.position = (new Point(rX, rY)).minus(new Point(0.5*this.mario.getUnscaledWidth(), 0));
		}

		this.tweenJuggler.nextFrame();
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
	var game = new HunterQuest(drawingCanvas);
	game.start();
}

// Necessary for proper "this" object
function onClick(e) {}

function write(context, style, font, text, x, y) {
	context.fillStyle = style;
	context.font = font;
	context.fillText(text, x, y);
}
