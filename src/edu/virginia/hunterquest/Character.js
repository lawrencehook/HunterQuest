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

		this.flinchable = true;
		this.weapon = 1;
		this.attackType = "attack1";
		this.weaponChangeCooldown = false;


		this.projectileSpeed 	= 5;
		this.projectileSize 	= 10;
		this.projectileWidth 	= 10;
		this.projectileHeight	= 10;
		this.projectileDamage 	= 2;
		this.projectileColor	= "#2f4d2f";

		this.singleShot = false;
		this.burstShot = true;
		this.machineShot = false;

		this.burst = 3;
		this.burstCount;
		this.recentlyShot = false;
	}

	static getInstance() {
		return Character.instance;
	}

	updateCharacter(pressedKeys) {
		var oldPosition = this.position.clone();

		// Weapon cycling
		if(pressedKeys.indexOf(81) != -1) { //Press Q
			if(!this.weaponChangeCooldown) {
				this.weapon -= 1;
				if(this.weapon <= 0) {
					this.weapon = 3;
				}
				this.attackType = "attack" + this.weapon;
				this.weaponChangeCooldown = true;
			}
		} else if(pressedKeys.indexOf(69) != -1) { //Press E
			if(!this.weaponChangeCooldown) {
				this.weapon += 1;
				if(this.weapon >= 4) {
					this.weapon = 1;
				}
				this.attackType = "attack" + this.weapon;
				this.weaponChangeCooldown = true;
			}
		} else {
			this.weaponChangeCooldown = false;
		}


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

		/*
		 * Shooting projectiles
		 */
		var direction = "";
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

		/*
		 * Shooting modes: single shot, burst shot, machine
		 */
		if (this.singleShot) {
			if (direction != "") {
				if (!this.recentlyShot) {
					Character.getInstance()[this.attackType](direction);
					this.recentlyShot = true;
				}
			} else {
				this.recentlyShot = false;
			}
		} else if (this.burstShot) {
			if (direction != "") {
				if (!this.recentlyShot) {
					this.burstCount = this.burst;
					this.recentlyShot = true;
				}
				if (this.burstCount > 0) {
					Character.getInstance()[this.attackType](direction);
					this.burstCount -= 1;
				}
			} else {
				this.recentlyShot = false;
			}
		} else if (this.machineShot) {
			if (direction != "") {
				Character.getInstance()[this.attackType](direction);
			}

			if(this.cooldown <= 0) {
				this.cooldown = this.projectileSpeed;
			} else {
				this.cooldown -= 1;
			}
		}

		/*
		 * Rotate to moving direction
		 */
		if (direction) {
			this.setAngle(Math.PI / 2 - utils.parseDirection(direction));
		} else if (!this.position.equals(oldPosition)) {
			this.setAngle(utils.upAngle + this.position.getAngle(oldPosition));
		}

	}

	attack1(direction) {
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
					vx = 0;
					vy = -20;
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
				new Projectile(x, y, this.projectileWidth, this.projectileHeight, vx, vy, this.projectileDamage, this.projectileColor, true);
			}
		}
	}

	attack2(direction) {
		var x, y, vx, vy, angle=Math.PI/6, badDirection=false;

		if (this.cooldown <= 0) {
			// ATTACK!
			var center = this.getHitboxCenter();
			switch(direction) {
				case "left":
					x = this.position.x - 10;
					y = center.y - 5;
					vx = -20 * Math.cos(angle);
					vy = 20 * Math.sin(angle);
					break;
				case "right":
					x = this.position.x + this.getUnscaledWidth();
					y = center.y - 5;
					vx = 20 * Math.cos(angle);
					vy = 20 * Math.sin(angle);
					break;
				case "up":
					x = center.x - 5;
					y = this.position.y - 10;
					vx = 20 * Math.sin(angle);
					vy = -20 * Math.cos(angle);
					break;
				case "down":
					x = center.x - 5;
					y = this.position.y + this.getUnscaledHeight();
					vx = 20 * Math.sin(angle);
					vy = 20 * Math.cos(angle);
					break;
				default:
					console.log("Bad projectile direction " + direction);
					badDirection = true;
			}

			if (!badDirection) {
				switch(direction) {
					case "left":
					case "right":
						new Projectile(x, y, this.projectileWidth, this.projectileHeight, vx, -vy, this.projectileDamage, this.projectileColor, true);
						new Projectile(x, y, this.projectileWidth, this.projectileHeight, vx, vy, this.projectileDamage, this.projectileColor, true);
						break;
					case "up":
					case "down":
						new Projectile(x, y, this.projectileWidth, this.projectileHeight, -vx, vy, this.projectileDamage, this.projectileColor, true);
						new Projectile(x, y, this.projectileWidth, this.projectileHeight, vx, vy, this.projectileDamage, this.projectileColor, true);
						break;
					default:
				}
			}
		}
	}

	attack3(direction) {
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
					vx = 0;
					vy = -20;
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
				new SplitProjectile(x, y, this.projectileWidth, this.projectileHeight, vx, vy, this.projectileDamage, this.projectileColor, true);
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