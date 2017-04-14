"use strict";

class LevelFour extends Level {
	constructor() {
		super();
	}

	initialize() {
		var game = Game.getInstance();
		var bigMonster = new Monster("enemy1", "spritesheet.png", marioSprites, game.gamescreen, 100)

		bigMonster.position = game.midPoint.minus(new Point(75, 0));

		bigMonster.attackSpeed = 1;
		bigMonster.projectileSpeed = 5;
		bigMonster.projectileSize = 5;
		bigMonster.projectileDamage = 1;
		bigMonster.projectileColor = "#f4df42";

		bigMonster.hp = 25;
		bigMonster.maxHealth = 25;

		var bigMonster2 = new Monster("enemy1", "spritesheet.png", marioSprites, game.gamescreen, 100)

		bigMonster2.position = game.midPoint.plus(new Point(75, 0));

		bigMonster2.attackSpeed = 1;
		bigMonster2.projectileSpeed = 5;
		bigMonster2.projectileSize = 5;
		bigMonster2.projectileDamage = 1;
		bigMonster2.projectileColor = "#f4df42";

		bigMonster2.hp = 25;
		bigMonster2.maxHealth = 25;

		this.monsters = [bigMonster, bigMonster2];
	}
}