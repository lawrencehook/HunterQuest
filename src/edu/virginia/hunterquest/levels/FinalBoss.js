"use strict";

class FinalBoss extends Level {
	constructor() {
		super();
	}

	initialize() {
		var game = Game.getInstance();
		var finalBoss = new Monster("finalBoss", "monster/boss.png", bossSprites, game.gamescreen, 50)
		finalBoss.hp = 250;
		finalBoss.maxHealth = 250;

		finalBoss.gold = 1000;
		finalBoss.exp = 0;

		finalBoss.projectileSpeed = 20;
		finalBoss.projectileSize = 30;
		finalBoss.projectileDamage = 35;
		finalBoss.projectileColor = "#fb00d4";

		finalBoss.position = (new Point(0.5*game.canvasWidth, 50)).minus(new Point(0.5*finalBoss.getUnscaledWidth(), 0));

		this.monsters = [finalBoss];

		SoundManager.getInstance().setBackgroundMusic("bosslevel");
	}

}