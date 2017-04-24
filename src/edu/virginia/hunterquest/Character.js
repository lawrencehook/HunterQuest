// Lawrence Hook

"use strict";

class Character extends Entity {

	constructor(id, filename, jsonSprites, parentObj=null) {

		super(id, filename, jsonSprites, parentObj);
		Character.instance = this;

		// preload projectile images
		this.loadImage("weapon/energyball.png");
		this.loadImage("weapon/fireball.png");
		this.loadImage("weapon/superfireball.png");
		this.loadImage("weapon/darkball.png");
		this.loadImage("weapon/redball.png");
		// Set proper character image
		this.loadImage(filename);

		this.xMinBound = 0;
		this.xMaxBound;
		this.yMinBound = 0;
		this.yMaxBound;


		this.hp = 30;
		this.deaths = 0;

		this.flinchable = true;
		this.weapon = 1;
		this.attackType = "attack1";
		this.weaponChangeCooldown = false;

		this.projectileWidth 	= 10;
		this.projectileHeight	= 10;
		this.projectileSpeed 	= 5;

		this.burstCount;
		this.recentlyShot = false;

		/*
		 * Store upgrades
		 */
		this.level = 1;
		this.maxHealth = 30;
		this.cooldown = 0;
		this.projectileSize 	= 10;
		this.projectileDamage 	= 0.5;
		this.projectileColor	= "#2f4d2f";
		this.projectileFilename = "weapon/energyball.png";

		this.singleShot = true;
		this.burstShot = false;
		this.machineShot = false;
		this.burst = 3;

		this.poisonDamage = 0;
		this.poisonDuration = 300;

		this.lifeSteal = 0;

		this.skillPoints = 1;
		this.spSpent = [0,0,0,0,0];
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
				if(this.weapon > 4) {
					this.weapon = 1;
				}
				this.attackType = "attack" + this.weapon;
				this.weaponChangeCooldown = true;
			}
		} else {
			this.weaponChangeCooldown = false;
		}


		/*
		 * Movement
		 */
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

		//this.moving = this.movingDown || this.movingRight || this.movingUp || this.movingLeft;
		this.moving = pressedKeys.indexOf(65) != -1 || pressedKeys.indexOf(87) != -1 || pressedKeys.indexOf(68) != -1 || pressedKeys.indexOf(83) != -1;

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
			this.skillPoints += 1;
			this.maxHealth += 5;
			SoundManager.getInstance().playSound("levelup");
		}
	}

	regainHealth(amount) {
		if (this.hp + amount > this.maxHealth) {
			this.hp = this.maxHealth;
		} else {
			this.hp = this.hp + amount;
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
				new Projectile(x, y, this.projectileWidth, this.projectileHeight, vx, vy, this.projectileDamage, this.projectileColor, true, this.projectileFilename);
				SoundManager.getInstance().playSound("laser");
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
						new Projectile(x, y, this.projectileWidth, this.projectileHeight, vx, -vy, this.projectileDamage, this.projectileColor, true, this.projectileFilename);
						new Projectile(x, y, this.projectileWidth, this.projectileHeight, vx, vy, this.projectileDamage, this.projectileColor, true, this.projectileFilename);
						SoundManager.getInstance().playSound("laser");
						break;
					case "up":
					case "down":
						new Projectile(x, y, this.projectileWidth, this.projectileHeight, -vx, vy, this.projectileDamage, this.projectileColor, true, this.projectileFilename);
						new Projectile(x, y, this.projectileWidth, this.projectileHeight, vx, vy, this.projectileDamage, this.projectileColor, true, this.projectileFilename);
						SoundManager.getInstance().playSound("laser");
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
				new SplitProjectile(x, y, this.projectileWidth, this.projectileHeight, vx, vy, this.projectileDamage, this.projectileColor, true, this.projectileFilename);
				SoundManager.getInstance().playSound("laser");
			}
		}
	}

	attack4() {
		var noise = Math.random();
		for(var i = 0; i < 24; i++) {
				var vx = this.projectileSpeed * Math.cos(noise*1.571 + (15 * i * Math.PI/180));
				var vy = this.projectileSpeed * Math.sin(noise*1.571 + (15 * i * Math.PI/180));
				new Projectile(this.getHitboxCenter().x, this.getHitboxCenter().y, this.projectileSize, this.projectileSize, vx, vy, this.projectileDamage, this.projectileColor, true, "weapons/fireball.png");
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
		this.position = Game.getInstance().midPoint.clone();
	}

	enemyDefeated(gold, exp) {
		console.log("Exp gained: " + exp);
		this.exp += exp;
		if(this.exp >= 100 + ((this.level-1) * 50)) {
			this.exp = 0;
			this.level += 1;
			this.skillPoints += 1;
			this.maxHealth += 5;
			SoundManager.getInstance().playSound("levelup");
		}
	}

	regainHealth(amount) {
		if (this.hp + amount > this.maxHealth) {
			this.hp = this.maxHealth;
		} else {
			this.hp = this.hp + amount;
		}
	}

}