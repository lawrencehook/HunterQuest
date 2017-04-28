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

		this.startTime = null;
		this.elapsedTime = 0;
		this.gameOver = false;

		this.initialize();
	}

	onClick(e) {
		this.sidebar.onClick(e);
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

		// Sounds
		this.soundManager = new SoundManager();
		this.soundManager.addSound("laser", new Audio("resources/sound/laser.wav"));
		this.soundManager.addSound("levelup", new Audio("resources/sound/levelup.wav"));
		this.soundManager.addSound("purchase", new Audio("resources/sound/purchase.wav"));
		this.soundManager.addSound("grunt", new Audio("resources/sound/grunt.ogg"));
		this.soundManager.addSound("death", new Audio("resources/sound/death.ogg"));
		this.soundManager.addSound("level0", new Audio("resources/music/level1_basic.wav"));
		this.soundManager.addSound("level1", new Audio("resources/music/level1.wav"));
		this.soundManager.addSound("level2", new Audio("resources/music/level2.wav"));
		this.soundManager.addSound("level3", new Audio("resources/music/level3.wav"));
		this.soundManager.addSound("minibosslevel", new Audio("resources/music/miniboss.wav"));
		this.soundManager.addSound("bosslevel", new Audio("resources/music/boss.wav"));

		// Hunter Quest
		this.gamescreen = new GameScreen("gamescreen", this, this.sidebarWidth, 0, this.canvasWidth - this.sidebarWidth, this.canvasHeight);
		this.sidebar = new Sidebar("sidebar", "", this, this.sidebarWidth, this.canvasHeight);

		this.hunter = new Character("character", "hunter/hunter.png", hunterSprites, this.gamescreen);
		this.hunter.ischaracter = true;
		this.hunter.xMaxBound = this.canvasWidth - this.sidebarWidth - 8;
		this.hunter.yMaxBound = this.canvasHeight - 8;
		this.hunter.position = this.gamescreen.getCenter();

		this.projectiles = new ArrayList();

		this.levels = [];
		this.levels.push(new EmptyLevel());
		this.levels.push(new LevelOne());
		this.levels.push(new LevelTwo());
		this.levels.push(new LevelThree());
		this.levels.push(new LevelFour());
		this.levels.push(new LevelFive());
		this.levels.push(new LevelSix());
		this.levels.push(new LevelSeven());
		this.levels.push(new LevelEight());
		this.levels.push(new LevelNine());
		this.levels.push(new FinalBoss());

		// empty level at the end
		this.levels.push(new EmptyLevel());

		this.currentLevel = 0;
		this.levelComplete = false;
		this.completeMessage = "";
		this.messageDelay = 200;

		this.levels[this.currentLevel].initialize();

		// Pausing
		this.paused = false;
		this.pauseCD = false;
		this.pausWritten = false;
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		// TODO bring up a UI to continue/restart/etc.
		//	Tween it up
		if (this.levels[this.currentLevel].isCompleted()) {
			if (this.currentLevel < this.levels.length - 1) {
				this.levelComplete = true;
				console.log("Level " + (this.currentLevel) + " completed!");
				this.completeMessage = "Level " + (this.currentLevel) + " completed!";
				this.currentLevel += 1;
				this.levels[this.currentLevel].initialize();
			} else {
				console.log("You beat Hunter Quest!");
				this.completeMessage = "You beat Hunter Quest!";
				this.levelComplete = true;
				this.pause();
			}
		} else {
			if (!this.paused) {
				if(this.messageDelay <= 0) {
					this.levelComplete = false;
					this.messageDelay = 200;
				} else {
					this.messageDelay -= 1;
				}
			}
		}

		this.tweenJuggler.nextFrame();

		/*
		 * Debugging utilities
		 */
		if(pressedKeys.indexOf(74) !== -1) { //Press key = j
			var rX = Math.random() * this.canvasWidth;
			var rY = Math.random() * this.canvasHeight + 50;
			this.enemy1 = new Monster("enemy1", "spritesheet.png", marioSprites, this.gamescreen);
			this.enemy1.position = (new Point(rX, rY)).minus(new Point(0.5*this.hunter.getUnscaledWidth(), 0));
		}

		if(pressedKeys.indexOf(75) !== -1) { //Press key = k
			console.log("Kill");
			this.pause();
		}

		// Advance from the first level
		if (pressedKeys.indexOf(13) != -1) {
			if (this.currentLevel == 0) {
				this.startTime = this.clock.getElapsedTime();
			}

			if (this.levels[this.currentLevel].empty) this.levels[this.currentLevel].completed = true;
		}

		if (pressedKeys.indexOf(32) != -1) {
			if (!this.pauseCD) {
				this.paused = !this.paused;
				this.pauseCD = true;
				if (this.paused) {
					this.pauseWritten = false;
					this.removeChild(this.gamescreen);
				} else {
					if (!this.contains(this.gamescreen)) {
						this.addChild(this.gamescreen);
					}
				}
			}
		} else {
			this.pauseCD = false;
		}


		// Elapsed time
		if (this.startTime && !this.gameOver) {
			this.elapsedTime = this.clock.getElapsedTime() - this.startTime;
		}
	}

	draw(context) {
		if (this.paused) {
			context.clearRect(0, 0, this.sidebar.width, this.sidebar.height);
		} else {
			context.clearRect(0, 0, this.width, this.height);
		}

		super.draw(context);

		if (!this.paused) {
			if (this.levelComplete === true) {
				write(context, "black", "20px Macondo", this.completeMessage, 200, 100);
				if (this.currentLevel == 11) {
					this.gameOver = true;
				}
			}		
			else if (this.currentLevel == 0) {
				write(context, "black", "20px Macondo", "Press Enter to Begin Your Quest", 200, 100);
			} else if (this.currentLevel == 11) {
				var finishMessage = "You defeated the demon!  Congratulations!\nYou beat HunterQuest!";
				write(context, "black", "20px Macondo", finishMessage, 200, 100);
			}
		} else {
			if (!this.pauseWritten) {
				write(context, "black", "20px Macondo", "Paused!", this.width - 200, 100);
				this.pauseWritten = true;
			}
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
function onClick(e) {
	game.onClick(e);
}

function write(context, style, font, text, x, y) {
	context.fillStyle = style;
	context.font = font;
	context.fillText(text, x, y);
}
