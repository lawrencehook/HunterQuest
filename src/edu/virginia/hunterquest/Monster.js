// Lawrence Hook

"use strict";

class Monster extends Entity {

	constructor(id, spriteSheet, jsonSprites, parentObj=null) {
		super(id, spriteSheet, jsonSprites, parentObj);

		this.frameCounter = 0;
		this.attackSpeed = 50; // Lower is faster

		this.hp = 5;
		this.maxHealth = 5;

		this.gold = 100;
		this.exp = 10;

		this.speed = 2;

		this.projectileSpeed = 10;
		this.projectileSize = 10;
		this.projectileDamage = 2;
		this.projectileColor = "#2f4d2f";
		this.projectileTracking = 0;
	}

	attack1() {
		var projectileX = this.getHitboxCenter().x;
		var projectileY = this.getHitboxCenter().y;

		if (this.frameCounter % this.attackSpeed == 0) {
			// ATTACK!
			var character = Character.getInstance();
			var diffPosition = character.getHitboxCenter().minus(this.getHitboxCenter());
			var dx = diffPosition.x;
			var dy = diffPosition.y;
			var angle = Math.atan2(dy,dx);
			// console.log(angle);
			var vx = this.projectileSpeed * Math.cos(angle);
			var vy = this.projectileSpeed * Math.sin(angle);
			var projectile = new Projectile(projectileX, projectileY, this.projectileSize, this.projectileSize, vx, vy, this.projectileDamage, this.projectileColor, false, this.projectileTracking);
		}
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		this.frameCounter += 1;

		if (this.id == "enemy1") {
			this.attack1();
			// var character = Character.getInstance();
			// var diffPosition = character.getHitboxCenter().minus(this.getHitboxCenter());
			// var dx = diffPosition.x;
			// var dy = diffPosition.y;
			// var angle = Math.atan2(dy,dx);
			// var vx = this.speed * Math.cos(angle);
			// var vy = this.speed * Math.sin(angle);
			// this.position.x += vx;
			// this.position.y += vy;
		}
	}

	draw(context) {
		super.draw(context);

		this.applyTransformations(context);

		// Health bar
		context.fillStyle = "#fc0008";
		context.fillRect(0, -20, this.getUnscaledWidth(), 5);
		context.fillStyle = "#00ff08";
		context.fillRect(0, -20, this.getPercentHealth() * this.getUnscaledWidth(), 5);
		//context.fillStyle = "#000000";
		//context.font = "15px Times New Roman";
		//context.fillText("Health", 5, 15);

		this.reverseTransformations(context);
	}

}
