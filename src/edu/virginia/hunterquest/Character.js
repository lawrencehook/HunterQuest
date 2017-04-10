// Lawrence Hook

"use strict";

class Character extends Entity {

	constructor(id, spriteSheet, jsonSprites, parentObj=null) {
		super(id, spriteSheet, jsonSprites, parentObj);
		Character.instance = this;

		this.sword = new Sprite("sword", "sword.png", this);

		this.xMinBound = 0;
		this.xMaxBound;
		this.yMinBound = 0;
		this.yMaxBound;

		this.cooldown = 0;

		this.hp = 20;
		this.level = 1;
		this.maxHealth = 20;

		this.flinchable = true;
		this.weapon = 1;


		this.projectileSpeed 	= 5;
		this.projectileSize 	= 10;
		this.projectileDamage 	= 2;
		this.projectileColor 	= "#ff0000";
		this.projectileWidth 	= 10;
		this.projectileHeight	= 10;
		this.projectileDamage 	= 2;
		this.projectileColor	= "#2f4d2f";
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

		if(this.cooldown <= 0) {
			this.cooldown = this.projectileSpeed;
		} else {
			this.cooldown -= 1;
		}
	}

	attack1(direction) {
		// var projectileSpeed = this.projectileSpeed;
		// var projectileSize 	= this.projectileSize;
		// var projectileDamage = this.projectileDamage;
		// var projectileColor = this.projectileColor;

		var x, y, vx, vy, badDirection=false;

		if (this.cooldown <= 0) {
			// ATTACK!
			var center = this.getHitboxCenter();
			switch(direction) {
				case "left":
					x = this.position.x - 10;
					y = center.y - 5;
					vx = -20;
					vy = 0;
					break;
				case "right":
					x = this.position.x + this.getUnscaledWidth();
					y = center.y - 5;
					vx = 20;
					vy = 0;
					break;
				case "up":
					x = center.x - 5;
					y = this.position.y - 10;
					vx = -20;
					vy = 0;
					break;
				case "down":
					x = center.x - 5;
					y = this.position.y + this.getUnscaledHeight();
					vx = 0;
					vy = 20;
					break;
				default:
					console.log("Bad projectile direction" + direction);
					badDirection = true;
			}

			if (!badDirection) {
				new Projectile(x, y, this.projectileWidth, this.projectileHeight, vx, vy, this.projectileDamage, this.projectileColor, true, this.parent);
			}
		}

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