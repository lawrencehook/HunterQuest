// Lawrence Hook

"use strict";

class Monster extends AnimatedSprite {

	constructor(id, spriteSheet, jsonSprites, parentObj=null) {
		super(id, spriteSheet, jsonSprites, parentObj);

		this.frameCounter = 0;
		this.attackSpeed = 50; // Lower is faster

		this.hp = 20;
		this.maxHealth = 20;
	}

	attack1() {
		var projectileSpeed = 10;
		var projectileSize = 10;
		var projectileDamage = 2;
		var projectileColor = "#2f4d2f";

		if (this.frameCounter % this.attackSpeed == 0) {
			// ATTACK!
			var character = Character.getInstance();
			var diffPosition = character.position.minus(this.position);
			var dx = diffPosition.x;
			var dy = diffPosition.y;
			var angle = Math.atan(dy/dx);
			// console.log(angle);
			var vx = projectileSpeed * Math.cos(angle);
			var vy = projectileSpeed * Math.sin(angle);
			var projectile = new Projectile(this.position.x, this.position.y, projectileSize, projectileSize, vx, vy, projectileDamage, projectileColor, this.parent);
		}
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		this.frameCounter += 1;

		if (this.id == "enemy1") {
			this.attack1();
		}
	}

	getPercentHealth() {
		return this.hp / this.maxHealth;
	}

}
