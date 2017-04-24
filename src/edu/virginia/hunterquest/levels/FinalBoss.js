"use strict";

class FinalBoss extends Level {
	constructor() {
		super();
		this.finalBossHealth = 250;
	}

	//Special for not resetting final boss health
	emptyLevel() {
		this.finalBossHealth = this.monsters[0].hp;
		this.monsters.forEach(function(monster) {
			//console.log(monster);
			if(monster.parent != undefined) monster.destroy();
		});
		this.monsters = [];
	}

	initialize() {
		var game = Game.getInstance();
		var finalBoss = new Monster("finalBoss", "monster/boss.png", bossSprites, game.gamescreen, 50)
		finalBoss.hp = this.finalBossHealth;
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