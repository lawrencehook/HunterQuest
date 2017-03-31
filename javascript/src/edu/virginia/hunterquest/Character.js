// Lawrence Hook

"use strict";

class Character extends Entity {

	constructor(id, spriteSheet, jsonSprites, parentObj=null) {
		super(id, spriteSheet, jsonSprites, parentObj);
		Character.instance = this;

		this.xMinBound = 0;
		this.xMaxBound;
		this.yMinBound = 0;
		this.yMaxBound;

		this.cooldown = 0;

		this.hp = 20;
		this.maxHealth = 20;
	}

	static getInstance() {
		return Character.instance;
	}

	updateCharacter(pressedKeys) {
		// left
		if (pressedKeys.indexOf(65) != -1 && !this.block.left) {
			this.position.x -= this.speed;
			this.movingLeft = true;
		} else {
			this.movingLeft = false;
		}
		// up
		if (pressedKeys.indexOf(87) != -1 && !this.block.up) {
			this.position.y -= this.speed;
			this.movingUp = true;
		} else {
			this.movingUp = false;
		}
		// right
		if (pressedKeys.indexOf(68) != -1 && !this.block.right) {
			this.position.x += this.speed;
			this.movingRight = true;
		} else {
			this.movingRight = false;
		}
		// down
		if (pressedKeys.indexOf(83) != -1 && !this.block.down) {
			this.position.y += this.speed;
			this.movingDown = true;
		} else {
			this.movingDown = false;
		}

		this.moving = this.movingDown || this.movingRight || this.movingUp || this.movingLeft;

		// Left projectile
		if (pressedKeys.indexOf(37) != -1) {
			var center = this.getHitboxCenter();
			// var projectile = new Projectile(this.position.x - 10, center.y - 5, 10, 10, -20, 0, 2, "#2f4d2f", this.parent);
			this.attack1("left");
			//Game.getInstance().projectiles.push(projectile);
		}
		// Up projectile
		if (pressedKeys.indexOf(38) != -1) {
			var center = this.getHitboxCenter();
			this.attack1("up");
		}
		// Right projectile
		if (pressedKeys.indexOf(39) != -1) {
			var center = this.getHitboxCenter();
			this.attack1("right");
		}
		// Down projectile
		if (pressedKeys.indexOf(40) != -1) {
			var center = this.getHitboxCenter();
			this.attack1("down");
		}
		//console.log(this.parent.children.size());
	}

	attack1(direction) {
		var projectileSpeed = 1;
		var projectileSize = 10;
		var projectileDamage = 2;
		var projectileColor = "#ff0000";

		if (this.cooldown <= 0) {
			// ATTACK!
			var center = this.getHitboxCenter();
			switch(direction) {
				case "left":
					var projectile = new Projectile(this.position.x - 10, center.y - 5, 10, 10, -20, 0, 2, "#2f4d2f", true, this.parent);
					break;
				case "right":
					var projectile = new Projectile(this.position.x + this.getUnscaledWidth(), center.y - 5, 10, 10, 20, 0, 2, "#2f4d2f", true, this.parent);
					break;
				case "up":
					var projectile = new Projectile(center.x - 5, this.position.y - 10, 10, 10, 0, -20, 2, "#2f4d2f", true, this.parent);
					break;
				case "down":
					var projectile = new Projectile(center.x - 5, this.position.y + this.getUnscaledHeight(), 10, 10, 0, 20, 2, "#2f4d2f", true, this.parent);
					break;
				default:
					break;
			}
		}
		if(this.cooldown <= 0) {
			this.cooldown = projectileSpeed;
		}
		this.cooldown -= 1;
	}

	checkBounds() {
		if (this.position.x <= this.xMinBound) {
			this.block.left = true;
			this.position.x = this.xMinBound;
		} else {
			this.block.left = false;
		}
		if (this.position.x >= this.xMaxBound - this.getUnscaledWidth()) {
			this.block.right = true;
			this.position.x = this.xMaxBound - this.getUnscaledWidth();
		} else {
			this.block.right = false;
		}
		if (this.position.y <= this.yMinBound) {
			this.block.up = true;
			this.position.y = this.yMinBound;
		} else {
			this.block.up = false;
		}
		if (this.position.y >= this.yMaxBound - this.getUnscaledHeight()) {
			this.block.down = true;
			this.position.y = this.yMaxBound - this.getUnscaledHeight();
			this.jumped = false;
		} else {
			this.block.down = false;
		}
	}

	enemyDefeated(gold, exp) {
		console.log("Gold: " + gold + " | Exp: " + exp);
		this.gold += gold;
		this.exp += exp;
	}

}