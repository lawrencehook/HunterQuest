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
		this.level = 1;
		this.maxHealth = 20;
		this.attackType = 1;

		this.flinchable = true;
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

		var direction;
		for (var i = pressedKeys.size(); i >= 0; i--) {
			// Left projectile
			if (pressedKeys.get(i) == 37) {
				direction = "left";
				break;
			}
			// Up projectile
			else if (pressedKeys.get(i) == 38) {
				direction = "up";
				break;
			}
			// Right projectile
			else if (pressedKeys.get(i) == 39) {
				direction = "right";
				break;
			}
			// Down projectile
			else if (pressedKeys.get(i) == 40) {
				direction = "down";
				break;
			}
		}
		if (direction) {
			this.attack1(direction);
			// TODO: implement support for attack2, attack3, etc.
		}
	}

	attack1(direction) {
		var speed = 20;
		var size = 10;
		var damage = 2;
		//var color = "#ff0000";
		var color = "#2f4d2f";

		if (this.cooldown <= 0) {
			// ATTACK!
			var center = this.getHitboxCenter();
			switch(direction) {
				case "left":
					var projectile = new Projectile(this.position.x - size, center.y - size/2, size, size, -speed, 0, damage, color, true);
					break;
				case "right":
					var projectile = new Projectile(this.position.x + this.getUnscaledWidth(), center.y - size/2, size, size, speed, 0, damage, color, true);
					break;
				case "up":
					var projectile = new Projectile(center.x - size/2, this.position.y - size, size, size, 0, -speed, damage, color, true);
					break;
				case "down":
					var projectile = new Projectile(center.x - size/2, this.position.y + this.getUnscaledHeight(), size, size, 0, speed, damage, color, true);
					break;
				default:
					break;
			}
		}

		if(this.cooldown <= 0) {
			this.cooldown = 5;
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

	reset() {
		this.hp = this.maxHealth;
		this.position.y = 500;
		this.position.x = 500;
	}

	enemyDefeated(gold, exp) {
		console.log("Gold: " + gold + " | Exp: " + exp);
		this.gold += gold;
		this.exp += exp;
		if(this.exp >= 100) {
			this.exp -= 100;
			this.level += 1;
			this.maxHealth += 5;
		}
	}

}