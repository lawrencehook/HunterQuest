"use strict";

class LevelThree extends Level {
	constructor() {
		super();
	}

	initialize() {
		super.initialize();
		var game = Game.getInstance();
		var bigMonster = new Monster("enemy1", "spritesheet.png", marioSprites, game.gamescreen)

		bigMonster.position = game.midPoint.minus(bigMonster.getHitboxCenter());

		bigMonster.attackSpeed = 100;
		bigMonster.projectileSpeed = 5;
		bigMonster.projectileSize = 15;
		bigMonster.projectileDamage = 15;
		bigMonster.projectileColor = "#963c2b";
		bigMonster.projectileTracking = 0.035;

		bigMonster.hp = 50;
		bigMonster.maxHealth = 50;

		this.monsters = [bigMonster];

		SoundManager.getInstance().setBackgroundMusic("level2");
	}
}