"use strict"

class Entity extends AnimatedSprite {

	constructor(id, spriteSheet, jsonSprites, parentObj=null) {
		super(id, spriteSheet, jsonSprites, parentObj);
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		// Check for projectiles
		var projectiles = Game.getInstance().projectiles;
		if (projectiles != null) {
			for (var i = projectiles.length-1; i >= 0; i--) {
				if (this.xCollides(projectiles[i]) && this.yCollides(projectiles[i])) {
					this.eventDispatcher.dispatchEvent(new StatusEvent("DAMAGE_TAKEN", projectiles[i], projectiles[i].damage));
					projectiles.splice(i, 1);
				}
			}
		}
	}
}