"use strict";

class LevelSix extends Level {
	constructor() {
		super();
	}

	initialize() {
		super.initialize();
		var game = Game.getInstance();
		var simon1 = new Monster("enemy3", "monster/simon.png", null, game.gamescreen, 100);

		var screenWidth = game.gamescreen.width - 50;
		var screenHeight = game.gamescreen.height - 50;

		simon1.position = game.midPoint.minus(new Point(75, 0));

		simon1.attackSpeed = 30;
		simon1.projectileSpeed = 5;
		simon1.projectileSize = 5;
		simon1.projectileDamage = 5;
		simon1.projectileColor = "#130951";

		simon1.hp = 25;
		simon1.maxHealth = 25;

		this.monsters.push(simon1);

	}
}