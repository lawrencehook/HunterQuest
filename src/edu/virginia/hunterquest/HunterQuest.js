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

	restartLevel() {
		this.levels[this.currentLevel].emptyLevel();
		this.levels[this.currentLevel].initialize();
	}

	initialize() {
		// Events
		this.questManager = new QuestManager();

		// Tweens
		this.tweenJuggler = new TweenJuggler();

		// Hunter Quest
		this.gamescreen = new GameScreen("gamescreen", this, this.sidebarWidth, 0, this.canvasWidth - this.sidebarWidth, this.canvasHeight);

		this.sidebar = new Sidebar("sidebar", "", this, this.sidebarWidth, this.canvasHeight);

		this.mario = new Character("character", "spritesheet.png", marioSprites, this.gamescreen);
		this.mario.ischaracter = true;
		this.mario.xMaxBound = this.canvasWidth - this.sidebarWidth;
		this.mario.yMaxBound = this.canvasHeight;
		this.mario.position = this.gamescreen.getCenter();

		this.projectiles = new ArrayList();

		this.levels = new Array();
		this.levels[0] = new LevelOne();
		this.levels[1] = new LevelTwo();
		this.levels[2] = new LevelThree();
		this.levels[3] = new LevelFour();
		// this.levels[4] = new LevelFive();
		// this.levels[5] = new LevelSix();
		// this.levels[6] = new LevelSeven();
		// this.levels[7] = new LevelEight();
		// this.levels[8] = new LevelNine();
		// this.levels[9] = new LevelTen();
		this.currentLevel = 0;
		this.levelComplete = false;
		this.completeMessage = "";
		this.messageDelay = 200;

		this.levels[this.currentLevel].initialize();
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		// TODO bring up a UI to continue/restart/etc.
		//	Tween it up
		if (this.levels[this.currentLevel].isCompleted()) {
			if (this.currentLevel < this.levels.length - 1) {
				this.levelComplete = true;
				console.log("Level " + (this.currentLevel + 1) + " completed!");
				this.completeMessage = "Level " + (this.currentLevel + 1) + " completed!";
				this.currentLevel += 1;
				this.levels[this.currentLevel].initialize();
			} else {
				console.log("You beat Hunter Quest!");
				this.completeMessage = "You beat Hunter Quest!";
				this.levelComplete = true;
				this.pause();
			}
		} else {
			if(this.messageDelay <= 0) {
				this.levelComplete = false;
				this.messageDelay = 200;
			} else {
				this.messageDelay -= 1;
			}
		}

		if(pressedKeys.indexOf(74) !== -1) { //Press key = j
			var rX = Math.random() * this.canvasWidth;
			var rY = Math.random() * this.canvasHeight + 50;
			this.enemy1 = new Monster("enemy1", "spritesheet.png", marioSprites, this.gamescreen);
			this.enemy1.position = (new Point(rX, rY)).minus(new Point(0.5*this.mario.getUnscaledWidth(), 0));
		}

		if(pressedKeys.indexOf(75) !== -1) { //Press key = k
			console.log("Kill");
			this.pause();
		}

		this.tweenJuggler.nextFrame();
	}

	draw(context) {
		context.clearRect(0, 0, this.width, this.height);
		super.draw(context);

		if(this.levelComplete === true) {
			write(context, "black", "20px Georgia", this.completeMessage, 200, 100);
		}

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
