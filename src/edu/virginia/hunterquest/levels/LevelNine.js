"use strict";

class LevelNine extends Level {
	constructor() {
		super();
	}

	initialize() {
		super.initialize();
		var game = Game.getInstance();
		var simon1 = new Monster("enemy2", "monster/laserdude.png", null, game.gamescreen, 100);

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

		var simon2 = new Monster("enemy2", "monster/laserdude.png", null, game.gamescreen, 100)

		simon2.position = game.midPoint.plus(new Point(75, 0));

		simon2.attackSpeed = 1;
		simon2.projectileSpeed = 5;
		simon2.projectileSize = 5;
		simon2.projectileDamage = 1;
		simon2.projectileColor = "#130951";

		simon2.hp = 25;
		simon2.maxHealth = 25;

		var movingMonster1 = new Monster("enemy3", "monster/simon.png", null, game.gamescreen, 100);

		var screenWidth = game.gamescreen.width - 50;
		var screenHeight = game.gamescreen.height - 50;

		movingMonster1.position = game.midPoint.minus(new Point(125, 0));

		movingMonster1.attackSpeed = 30;
		movingMonster1.projectileSpeed = 5;
		movingMonster1.projectileSize = 5;
		movingMonster1.projectileDamage = 5;
		movingMonster1.projectileColor = "#130951";

		movingMonster1.hp = 25;
		movingMonster1.maxHealth = 25;

		var movingMonster2 = new Monster("enemy3", "monster/simon.png", null, game.gamescreen, 100);

		movingMonster2.position = game.midPoint.plus(new Point(125, 0));

		movingMonster2.attackSpeed = 30;
		movingMonster2.projectileSpeed = 5;
		movingMonster2.projectileSize = 5;
		movingMonster2.projectileDamage =5;
		movingMonster2.projectileColor = "#130951";

		movingMonster2.hp = 25;
		movingMonster2.maxHealth = 25;

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

		for (var i = 0; i < 3; i++) {
			this.monsters[i] = new Monster("enemy1", "monster/wyatt.png", null, game.gamescreen);
			this.monsters[i].position = (new Point(Math.random() * screenWidth, Math.random() * screenHeight));
		}

		this.monsters.push(bigMonster);
		this.monsters.push(bigMonster2);
		this.monsters.push(simon1);
		this.monsters.push(simon2);
		this.monsters.push(movingMonster1);
		this.monsters.push(movingMonster2);

	}
}