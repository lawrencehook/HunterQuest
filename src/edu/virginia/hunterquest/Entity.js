"use strict"

class Entity extends AnimatedSprite {

	constructor(id, spriteSheet, jsonSprites, parentObj=null) {
		super(id, spriteSheet, jsonSprites, parentObj);

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
				if (this.id === "character" ^ projectile.isFriendly) {
					if (this.hitboxActive && this.xCollides(projectile) && this.yCollides(projectile)) {
						// this.eventDispatcher.dispatchEvent(new StatusEvent("DAMAGE_TAKEN", projectile, projectile.damage));
						this.updateHealth(projectile.damage);
						if (this.flinchable) this.flinch(projectile);
						projectile.destroy();
					}
				}
			}
		}
		
	}

	getPercentHealth() {
		//console.log(this.hp, this.maxHealth);
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

		//if (source.getId() === "projectile")
			var angle = Math.atan2(source.getVy(), source.getVx());

		//console.log(angle*180/Math.PI);

		this.hitboxActive = false;

		var tween = new Tween(this);
		TweenJuggler.add(tween);
		tween.displayObject.eventDispatcher.addEventListener(this, "TWEEN_COMPLETE_EVENT");
		tween.animate("x", this.position.x, this.position.x + 50*Math.cos(angle), 100);
		tween.animate("y", this.position.y, this.position.y + 50*Math.sin(angle), 100);
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
			Character.getInstance().reset();
			Game.getInstance().restartLevel();
		}
		else {
			// this.parent.removeChild(this);
			// this.parent = undefined;
			this.destroy();

			Character.getInstance().enemyDefeated(this.gold, this.exp);
		}
	}

	destroy() {
		this.parent.removeChild(this);
		this.parent = undefined;
	}
}
