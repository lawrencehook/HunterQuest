"use strict";

class LevelSeven extends Level {
	constructor() {
		super();
	}

	initialize() {
		super.initialize();
		var game = Game.getInstance();
		var simon1 = new Monster("enemy1", "monster/simon.png", null, game.gamescreen, 100);

		var screenWidth = game.gamescreen.width - 50;
		var screenHeight = game.gamescreen.height - 50;

		simon1.position = game.midPoint.minus(new Point(75, 0));

		simon1.attackSpeed = 1;
		simon1.projectileSpeed = 5;
		simon1.projectileSize = 5;
		simon1.projectileDamage = 1;
		simon1.projectileColor = "#130951";

		simon1.hp = 25;
		simon1.maxHealth = 25;

		var simon2 = new Monster("enemy1", "monster/simon.png", null, game.gamescreen, 100)

		simon2.position = game.midPoint.plus(new Point(75, 0));

		simon2.attackSpeed = 1;
		simon2.projectileSpeed = 5;
		simon2.projectileSize = 5;
		simon2.projectileDamage = 1;
		simon2.projectileColor = "#130951";

		simon2.hp = 25;
		simon2.maxHealth = 25;

		for (var i = 0; i < 3; i++) {
			this.monsters[i] = new Monster("enemy1", "monster/wyatt.png", null, game.gamescreen);
			this.monsters[i].position = (new Point(Math.random() * screenWidth, Math.random() * screenHeight));
		}

		this.monsters.push(simon1);
		this.monsters.push(simon2);

	}
}