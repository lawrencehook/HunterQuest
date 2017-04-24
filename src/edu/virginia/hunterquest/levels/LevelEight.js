"use strict";

class LevelEight extends Level {
	constructor() {
		super();
	}

	initialize() {
		super.initialize();
		var game = Game.getInstance();

		var screenWidth = game.gamescreen.width - 50;
		var screenHeight = game.gamescreen.height - 50;

		var bigMonster = new Monster("enemy1", "monster/steve.png", null, game.gamescreen);
		bigMonster.position = game.midPoint.minus(new Point(0, (game.gamescreen.height/2)-75));

		bigMonster.attackSpeed = 100;
		bigMonster.projectileSpeed = 5;
		bigMonster.projectileSize = 15;
		bigMonster.projectileDamage = 15;
		bigMonster.projectileColor = "#963c2b";
		bigMonster.projectileTracking = 0.035;

		bigMonster.hp = 50;
		bigMonster.maxHealth = 50;

		var bigMonster2 = new Monster("enemy1", "monster/steve.png", null, game.gamescreen)

		bigMonster2.position = game.midPoint.minus(new Point(0, -(game.gamescreen.height/2)+75));

		bigMonster2.attackSpeed = 100;
		bigMonster2.projectileSpeed = 5;
		bigMonster2.projectileSize = 15;
		bigMonster2.projectileDamage = 15;
		bigMonster2.projectileColor = "#963c2b";
		bigMonster2.projectileTracking = 0.035;

		bigMonster2.hp = 50;
		bigMonster2.maxHealth = 50;

		for (var i = 0; i < 5; i++) {
			this.monsters[i] = new Monster("enemy1", "monster/wyatt.png", null, game.gamescreen);
			this.monsters[i].position = (new Point(Math.random() * screenWidth, Math.random() * screenHeight));
		}

		this.monsters.push(bigMonster);
		this.monsters.push(bigMonster2);

	}
}