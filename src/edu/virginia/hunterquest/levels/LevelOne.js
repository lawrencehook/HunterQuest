
"use strict";

class LevelOne extends Level {
	constructor() {
		super();
	}

	initialize() {
		var game = Game.getInstance();
		this.monsters = [new Monster("enemy1", "spritesheet.png", marioSprites, game.gamescreen)];
		this.monsters[0].position = (new Point(0.5*game.canvasWidth, 50)).minus(new Point(0.5*game.mario.getUnscaledWidth(), 0));
	}

}