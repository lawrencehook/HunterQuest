"use strict"

class Entity extends AnimatedSprite {

	constructor(id, filename, jsonSprites, parentObj=null) {
		super(id, filename, jsonSprites, parentObj);

		this.hp;
		this.maxHealth;

		this.gold = 0;
		this.exp = 0;

		this.flinchable = false;
		this.hitboxActive = true;
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		// Check for projectiles
		var projectiles = Game.getInstance().projectiles;
		if (projectiles) {
			for (var i = projectiles.size()-1; i >= 0; i--) {
				var projectile = projectiles.get(i);
				if (projectile != undefined && this.id === "character" ^ projectile.isFriendly) {
					if (this.hitboxActive && this.xCollides(projectile) && this.yCollides(projectile)) {
						this.updateHealth(projectile.damage);
						
						// Only the character is flinchable (so far)
						if (this.flinchable) {
							this.flinch(projectile);
							SoundManager.getInstance().playSound("grunt");
						} else {
							// a monster was hit by the character
							// Implement lifesteal & poisoning
							var char = Character.getInstance();
							char.regainHealth(char.lifeSteal * projectile.damage);
							if (char.poisonDamage > 0) {
								this.poisoned = true;
								this.poisonDamage = char.poisonDamage;
								this.poisonRemaining = char.poisonDuration;
							}
						}
						projectile.destroy();
					}
				}
			}
		}
		
	}

	getPercentHealth() {
		return this.hp / this.maxHealth;
	}

	updateHealth(damage) {
		this.hp -= damage;

		// Entity dies
		if (this.hp <= 0) {
			this.hp = 0;

			this.die();
		}
		// Full health
		if (this.hp > this.maxHealth) {
			this.hp = this.maxHealth;
		}
	}

	flinch(source) {
		var p1 = this.getHitboxCenter();
		var p2 = source.getHitboxCenter();

		var angle = Math.atan2(source.getVy(), source.getVx());

		this.hitboxActive = false;

		var tween = new Tween(this);
		TweenJuggler.add(tween);
		tween.displayObject.eventDispatcher.addEventListener(this, "TWEEN_COMPLETE_EVENT");
		tween.animate("x", this.position.x, this.position.x + 40*Math.cos(angle), 250);
		tween.animate("y", this.position.y, this.position.y + 40*Math.sin(angle), 250);
		this.hitboxActive = false;

	}

	handleEvent(event) {
		if (event.getEventType() === "TWEEN_COMPLETE_EVENT" && !this.hitboxActive) {
			this.hitboxActive = true;
		}
	}

	die() {
		if (this.id === "character") {
			// game over - reset level
			SoundManager.getInstance().playSound("death");
			Character.getInstance().reset();
			this.deaths += 1;
			Game.getInstance().restartLevel();
		}
		else {
			if (this.parent) {	// to prevent destroying twice in one frame, check if parent is still defined
				this.destroy();
				Character.getInstance().enemyDefeated(this.gold, this.exp);
			}
		}
	}

	destroy() {
		if (this.parent) {
			this.parent.removeChild(this);
			this.parent = undefined;
		}
	}
}
