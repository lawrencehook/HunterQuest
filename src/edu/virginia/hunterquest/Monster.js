// Lawrence Hook

"use strict";

class Monster extends Entity {

	constructor(id, spriteSheet, jsonSprites, parentObj=null, attackCooldown = 0) {
		super(id, spriteSheet, jsonSprites, parentObj);

		this.frameCounter = 0;
		this.attackSpeed = 50; // Lower is faster

		this.hp = 5;
		this.maxHealth = 5;

		this.gold = 100;
		this.exp = 10;

		this.speed = 2;
		this.attackCooldown = attackCooldown;
		this.maxACooldown = attackCooldown;
		this.attackPhase = true;
		this.phaseChange = false;
		this.attackType = 1;

		this.projectileSpeed = 10;
		this.projectileSize = 10;
		this.projectileDamage = 2;
		this.projectileColor = "#2f4d2f";
		this.projectileTracking = 0;
	}

	attack1() {
		console.log("attack1");
		var projectileX = this.getHitboxCenter().x;
		var projectileY = this.getHitboxCenter().y;

		if (this.attackPhase && this.frameCounter % this.attackSpeed == 0) {
			// ATTACK!
			var character = Character.getInstance();
			var diffPosition = character.getHitboxCenter().minus(this.getHitboxCenter());
			var dx = diffPosition.x;
			var dy = diffPosition.y;
			var angle = Math.atan2(dy,dx);
			// console.log(angle);
			var vx = this.projectileSpeed * Math.cos(angle);
			var vy = this.projectileSpeed * Math.sin(angle);
			new Projectile(projectileX, projectileY, this.projectileSize, this.projectileSize, vx, vy, this.projectileDamage, this.projectileColor, false, "", this.projectileTracking);
		}

		if(this.maxACooldown !== 0 && this.attackCooldown <= 0) {
			this.attackPhase = !this.attackPhase;
			this.attackCooldown = this.maxACooldown;
			if(this.id === "finalBoss") {
				if(this.phaseChange) {
					this.attackType = 2;
					this.phaseChange = false;
				} else {
					this.phaseChange = true;
				}
			}
		} else {
			this.attackCooldown -= 1;
		}
	}

	attack2() {
		console.log("attack2");
		var projectileX = this.getHitboxCenter().x;
		var projectileY = this.getHitboxCenter().y;

		if (this.attackPhase && this.frameCounter % this.attackSpeed == 0) {
			// ATTACK!
			var character = Character.getInstance();
			var diffPosition = character.getHitboxCenter().minus(this.getHitboxCenter());
			var dx = diffPosition.x;
			var dy = diffPosition.y;
			var angle = Math.atan2(dy,dx);
			// console.log(angle);
			for(var i = 0; i < 12; i++) {
				var vx = this.projectileSpeed * Math.cos(angle - 1.571 + (15 * i * Math.PI/180));
				var vy = this.projectileSpeed * Math.sin(angle - 1.571 + (15 * i * Math.PI/180));
				new Projectile(projectileX, projectileY, this.projectileSize, this.projectileSize, vx, vy, this.projectileDamage, this.projectileColor, false, "", this.projectileTracking);
			}
		}

		if(this.maxACooldown !== 0 && this.attackCooldown <= 0) {
			this.attackPhase = !this.attackPhase;
			this.attackCooldown = this.maxACooldown;
			if(this.id === "finalBoss") {
				if(this.phaseChange) {
					this.attackType = 1;
					this.phaseChange = false;
				} else {
					this.phaseChange = true;
				}
			}
		} else {
			this.attackCooldown -= 1;
		}
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		this.frameCounter += 1;

		if (this.id == "enemy1") {
			this.attack1();
		}

		if (this.id == "finalBoss") {
			if(this.attackType == 1) {
				this.attack1();
			} else if(this.attackType == 2) {
				this.attack2();
			} else {
				this.attack1();
			}
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
