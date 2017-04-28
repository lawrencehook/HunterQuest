// Lawrence Hook

"use strict";

class Monster extends Entity {

	constructor(id, filename, jsonSprites, parentObj=null, attackCooldown = 0) {
		super(id, filename, jsonSprites, parentObj);

		this.frameCounter = 0;
		this.attackSpeed = 50; // Lower is faster

		this.hp = 5;
		this.maxHealth = 5;

		this.gold = 100;
		this.exp = 50;

		this.speed = 2;
		this.attackCooldown = attackCooldown;
		this.maxACooldown = attackCooldown;
		this.attackPhase = false;
		this.phaseChange = false;
		this.attackType = 1;

		this.projectileSpeed = 5;
		this.projectileSize = 10;
		this.projectileDamage = 2;
		this.projectileColor = "#2f4d2f";
		this.projectileTracking = 0;
		if (id == "finalBoss")
			this.projectileFilename = "weapon/superfireball.png";
		else if (id == "enemy2")
			this.projectileFilename = "weapon/redball.png";
		else if (id == "enemy3")
			this.projectileFilename = "weapon/darkball.png";
		else
			this.projectileFilename = "weapon/fireball.png"

		this.poisoned = false;
		this.poisonDamage;
		this.poisonRemaining;
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		this.frameCounter += 1;

		if (this.id == "enemy1") {
			this.attack1();
		} else if(this.id == "enemy2") {
			this.attack1();
		} else if(this.id == "enemy3") {
			this.attack3();
		} else if (this.id == "finalBoss") {
			if(this.attackType == 1) {
				this.attack1();
			} else if(this.attackType == 2) {
				this.attack2();
			} else {
				this.attack3();
			}
		}

		if (this.poisoned) {
			this.hp -= this.poisonDamage;
			this.poisonRemaining -= 1;
			if (this.poisonRemaining <= 0) {
				this.poisoned = false;
			}
		}

		if (this.hp <= 0) {
			this.die();
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


	/*
	 * Attacks
	 */
	attack1() {
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
			new Projectile(projectileX, projectileY, this.projectileSize, this.projectileSize, vx, vy, this.projectileDamage, this.projectileColor, false, this.projectileFilename, this.projectileTracking);
		}

		if(this.maxACooldown !== 0 && this.attackCooldown <= 0) {
			this.attackPhase = !this.attackPhase;
			this.attackCooldown = this.maxACooldown;
			if(this.id === "finalBoss") {
				if(this.phaseChange) {
					this.attackType = 2;
					this.phaseChange = false;
					// this.tweenMove(Math.random()*Game.getInstance().canvasWidth, Math.random()*Game.getInstance().canvasHeight);
					this.tweenMoveRandom();
				} else {
					this.phaseChange = true;
				}
			}
		} else if(this.maxACooldown === 0) {
			this.attackPhase = true;
		} else {
			this.attackCooldown -= 1;
		}
	}

	attack2() {
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
				new Projectile(projectileX, projectileY, this.projectileSize, this.projectileSize, vx, vy, this.projectileDamage, this.projectileColor, false, this.projectileFilename, this.projectileTracking);
			}
		}

		if(this.maxACooldown !== 0 && this.attackCooldown <= 0) {
			this.attackPhase = !this.attackPhase;
			this.attackCooldown = this.maxACooldown;
			if(this.id === "finalBoss") {
				if(this.phaseChange) {
					this.attackType = 3;
					this.phaseChange = false;
					// this.tweenMove(Math.random()*Game.getInstance().canvasWidth, Math.random()*Game.getInstance().canvasHeight);
					this.tweenMoveRandom();
				} else {
					this.phaseChange = true;
				}
			}
		} else {
			this.attackCooldown -= 1;
		}
	}

	attack3() {
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
			for(var i = 0; i < 24; i++) {
				var vx = this.projectileSpeed * Math.cos(angle - 1.571 + (15 * i * Math.PI/180));
				var vy = this.projectileSpeed * Math.sin(angle - 1.571 + (15 * i * Math.PI/180));
				new Projectile(projectileX, projectileY, this.projectileSize, this.projectileSize, vx, vy, this.projectileDamage, this.projectileColor, false, this.projectileFilename, this.projectileTracking);
			}
		}

		if(this.maxACooldown !== 0 && this.attackCooldown <= 0) {
			this.attackPhase = !this.attackPhase;
			this.attackCooldown = this.maxACooldown;
			if(this.id === "finalBoss") {
				if(this.phaseChange) {
					this.attackType = 1;
					this.phaseChange = false;
					this.tweenMove(0.5*Game.getInstance().canvasWidth - 0.5*this.getUnscaledWidth(), 50);
					//this.position = (new Point(0.5*Game.getInstance().canvasWidth, 50)).minus(new Point(0.5*this.getUnscaledWidth(), 0));
				} else {
					this.phaseChange = true;
				}
			} else if (this.id === "enemy3") {
				this.tweenMoveRandomSpeed(500);
			}
		} else {
			this.attackCooldown -= 1;
		}
	}

	tweenMove(x, y) {
		var tween = new Tween(this);
		TweenJuggler.add(tween);
		tween.displayObject.eventDispatcher.addEventListener(this, "TWEEN_COMPLETE_EVENT");
		tween.animate("x", this.position.x, x, 100);
		tween.animate("y", this.position.y, y, 100);
	}

	tweenMoveRandom() {
		var gamescreen = Game.getInstance().gamescreen;
		var tween = new Tween(this);
		var x = Math.random() * (gamescreen.width*0.8 - this.getUnscaledWidth());
		var y = Math.random() * (gamescreen.height*0.8 - this.getUnscaledHeight());
		TweenJuggler.add(tween);
		tween.displayObject.eventDispatcher.addEventListener(this, "TWEEN_COMPLETE_EVENT");
		tween.animate("x", this.position.x, x, 100);
		tween.animate("y", this.position.y, y, 100);
	}

	tweenMoveRandomSpeed(tweenTime) {
		var gamescreen = Game.getInstance().gamescreen;
		var tween = new Tween(this);
		var x = Math.random() * (gamescreen.width*0.8 - this.getUnscaledWidth());
		var y = Math.random() * (gamescreen.height*0.8 - this.getUnscaledHeight());
		TweenJuggler.add(tween);
		tween.displayObject.eventDispatcher.addEventListener(this, "TWEEN_COMPLETE_EVENT");
		tween.animate("x", this.position.x, x, tweenTime);
		tween.animate("y", this.position.y, y, tweenTime);
	}
}
