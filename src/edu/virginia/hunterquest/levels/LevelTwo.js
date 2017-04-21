"use strict";

class LevelTwo extends Level {
	constructor() {
		super();
	}

	initialize() {
		super.initialize();
		var game = Game.getInstance();
		var screenWidth = game.gamescreen.width - 50;
		var screenHeight = game.gamescreen.height - 50;
		
		for (var i = 0; i < 3; i++) {
			this.monsters[i] = new Monster("enemy1", "spritesheet.png", marioSprites, game.gamescreen);
			this.monsters[i].position = (new Point(Math.random() * screenWidth, Math.random() * screenHeight));
		}
	}
}