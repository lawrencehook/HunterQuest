"use strict"

class Entity extends AnimatedSprite {

	constructor(id, spriteSheet, jsonSprites, parentObj=null) {
		super(id, spriteSheet, jsonSprites, parentObj);

		this.hp;
		this.maxHealth;
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		// Check for projectiles
		var projectiles = Game.getInstance().projectiles;
		if (projectiles) {
			for (var i = projectiles.size()-1; i >= 0; i--) {
				var projectile = projectiles.get(i);
				if (this.id === "character" ^ projectile.isFriendly) {
					if (this.xCollides(projectile)) {
						if (this.yCollides(projectile)) {
							// this.eventDispatcher.dispatchEvent(new StatusEvent("DAMAGE_TAKEN", projectile, projectile.damage));
							this.updateHealth(projectile.damage);
							projectile.destroy();
							
						}
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

	die() {
		if (this.id === "character") {
			// game over
		}
		else {
			this.parent.removeChild(this);
		}
	}
}
